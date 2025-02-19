use std::{borrow::Cow, collections::BTreeMap, fmt::Write, path::Path, sync::LazyLock};

use eyre::{bail, eyre, Context, OptionExt, Result};
use icu::locid::{langid, LanguageIdentifier};
use indexmap::IndexMap;
use itertools::Itertools;
use markdown::mdast::{
    AttributeContent, AttributeValue, Blockquote, MdxJsxFlowElement, MdxJsxTextElement, Node, Text,
    Yaml,
};
use maud::{html, Markup};
use regex::Captures;
use serde::Deserialize;
use serde_json::Map;
use url::Url;

use crate::{
    bib_render::{RenderedBibliography, RenderedEntry},
    intl::INTL,
    ImageManifest, ImageManifestEntry,
};

pub fn get_header(node: &Node) -> Option<&Yaml> {
    match node {
        Node::Yaml(yaml) => Some(yaml),
        n => n
            .children()
            .and_then(|c| c.iter().filter_map(get_header).next()),
    }
}

pub fn locate_defs(node: &Node) -> (BTreeMap<String, Vec<Node>>, BTreeMap<String, String>) {
    let mut fndefs = BTreeMap::new();
    let mut linkdefs = BTreeMap::new();
    match node {
        Node::Definition(def) => _ = linkdefs.insert(def.identifier.clone(), def.url.clone()),
        Node::FootnoteDefinition(def) => {
            _ = fndefs.insert(def.identifier.clone(), def.children.clone())
        }
        n => {
            if let Some(children) = n.children() {
                for child in children {
                    let (mut fndefs2, mut linkdefs2) = locate_defs(child);
                    fndefs.append(&mut fndefs2);
                    linkdefs.append(&mut linkdefs2);
                }
            }
        }
    }

    (fndefs, linkdefs)
}

pub fn to_html(
    content_root: &Path,
    file_path: &Path,
    node: &Node,
    bibliography: &RenderedBibliography,
    images: &ImageManifest,
    url_lookup: &BTreeMap<String, Option<&str>>,
    mut aka_handler: impl FnMut(LanguageIdentifier, Markup),
    mut cite_handler: impl FnMut(&str, &str),
) -> Result<Markup> {
    let (fndefs, linkdefs) = locate_defs(node);
    Converter {
        content_root,
        file_path,
        fndefs,
        linkdefs,
        bibliography,
        img_manifest: images,
        used_bib: Default::default(),
        cite_count: 0,
        header_stack: Vec::new(),
        url_lookup,
        aka_handler: &mut aka_handler,
        cite_handler: &mut cite_handler,
    }
    .convert_whole(node)
}

struct Converter<'a> {
    content_root: &'a Path,
    file_path: &'a Path,
    img_manifest: &'a ImageManifest,
    fndefs: BTreeMap<String, Vec<Node>>,
    linkdefs: BTreeMap<String, String>,
    bibliography: &'a RenderedBibliography,
    used_bib: IndexMap<String, Vec<String>>, // need to preserve insertion order
    cite_count: usize,
    header_stack: Vec<usize>,
    url_lookup: &'a BTreeMap<String, Option<&'a str>>,
    aka_handler: &'a mut dyn FnMut(LanguageIdentifier, Markup),
    cite_handler: &'a mut dyn FnMut(&str, &str),
}

fn index_to_string(mut index: u32) -> String {
    let mut result = String::new();
    while index > 0 {
        let num = (index - 1) % 26;
        result = String::from(char::from_u32('A' as u32 + num).unwrap()) + &result;
        index = (index - num) / 26;
    }

    result
}

impl Converter<'_> {
    fn expand<'a>(&mut self, n: impl IntoIterator<Item = &'a Node>) -> Result<Markup> {
        Ok(html! {
            @for child in n {
                (self.convert(false, child)?)
            }
        })
    }

    fn convert_refs(&mut self, text: &str) -> Result<Markup> {
        static QUICKRE: LazyLock<regex::Regex> =
            LazyLock::new(|| regex::Regex::new(r"[&<]").unwrap());

        // first, pre-escape any HTML special chars
        let text = QUICKRE.replace_all(text, |m: &regex::Captures<'_>| {
            match m.get(0).unwrap().as_str() {
                "&" => "&amp;",
                "<" => "&lt;",
                _ => unreachable!(),
            }
        });

        static ARCHIVE_URL: LazyLock<regex::Regex> =
            LazyLock::new(|| regex::Regex::new(r"^https?://archive\.org/details/[^/]+").unwrap());

        static GOOGLE_URL: LazyLock<regex::Regex> = LazyLock::new(|| {
            regex::Regex::new(r"^https?://books\.google(\.com|\.co\.nz|\.com\.au)/books\?id=\w+")
                .unwrap()
        });

        let mut insert_ref = |id: &str| -> (String, String) {
            self.cite_count += 1;
            let cite_anchor = format!("cite-{}", self.cite_count);
            let entry = self.used_bib.entry(id.to_owned());
            let ix = entry.index() + 1;
            entry.or_default().push(cite_anchor.clone());
            let ref_indicator = index_to_string(ix as u32);
            (cite_anchor, ref_indicator)
        };

        // generate a direct link to the page
        let direct_link = |entry: &RenderedEntry, what: Option<&str>| -> Option<String> {
            let (Some(what), Some(url)) = (what, &entry.url) else {
                return None;
            };

            let what = what.strip_prefix("p. ").unwrap_or(what);
            if what.chars().all(|c| c.is_ascii_digit()) {
                if let Some(m) = ARCHIVE_URL.find(url) {
                    let mut link = m.as_str().to_string();
                    link.push_str("/page/");
                    link.push_str(what);
                    return Some(link);
                }

                if let Some(m) = GOOGLE_URL.find(url) {
                    let mut link = m.as_str().to_string();
                    link.push_str("&pg=PA");
                    link.push_str(what);
                    return Some(link);
                }
            }

            None
        };

        let mut missing = Vec::new();

        // parenthesized citations
        static RE1: LazyLock<regex::Regex> = LazyLock::new(|| {
            regex::Regex::new(r"\[@(?<id>(_|[^\s\p{P}])+)(\s+(?<what>[^\]]+))?\]").unwrap()
        });

        let t1 = RE1.replace_all(&text, |m: &Captures<'_>| {
            let id = m.name("id").unwrap().as_str();
            if let Some(entry) = self.bibliography.get(id) {
                let (cite_anchor, ref_indicator) = insert_ref(id);
                let what = m.name("what").map(|m| m.as_str());
                let direct_link = direct_link(entry, what);
                html! {
                    sup.citation #(cite_anchor) {
                        a.index href={"#ref-" (id)} {
                            (ref_indicator)
                        }

                        @if let Some(what) = what {
                            "\u{202f}("
                            @if let Some(direct_link) = direct_link {
                                a href=(direct_link) { (what) }
                            } @else {
                                (what)
                            }
                            ")"
                        }
                    }
                }
                .into_string()
            } else {
                missing.push(id.to_owned());
                String::new()
            }
        });

        // inline citations
        static RE2: LazyLock<regex::Regex> = LazyLock::new(|| {
            regex::Regex::new(r"@(?<id>(_|[^\s\p{P}])+)(\s+\[(?<what>[^\]]+)\])?").unwrap()
        });

        let t2 = RE2.replace_all(&t1, |m: &Captures<'_>| {
            let id = m.name("id").unwrap().as_str();
            if let Some(entry) = self.bibliography.get(id) {
                let (cite_anchor, ref_indicator) = insert_ref(id);
                let what = m.name("what").map(|m| m.as_str());
                let direct_link = direct_link(entry, what);

                let linked_what = what.map(|what| {
                    if let Some(direct_link) = direct_link {
                        html! {
                            a href=(direct_link) { (what) }
                        }
                    } else {
                        html! { (what) }
                    }
                });

                html! {
                    span.citation.inline #(cite_anchor) {
                        @if let Some(inline_cite) = &entry.inline_cite {
                            (inline_cite(&format!("#ref-{id}"), linked_what))
                        } @else {
                            a.index href={"#ref-" (id)} {
                                "[" (ref_indicator) "]"
                            }
                            @if let Some(linked_what) = linked_what {
                                " (" (linked_what) ")"
                            }
                        }
                    }
                }
                .into_string()
            } else {
                missing.push(id.to_owned());
                String::new()
            }
        });

        if missing.is_empty() {
            Ok(maud::PreEscaped(t2.into_owned()))
        } else {
            bail!("missing bibliography entry: {:?}", missing)
        }
    }

    fn convert_whole(&mut self, root: &Node) -> Result<Markup> {
        let result = html! {
            (self.convert(false, root)?)
            (self.do_sections(0))
            @if !self.used_bib.is_empty() {
                h2 #references { "References" }
                ol.reference-list type="A" {
                    @for (id, _cites) in &self.used_bib {
                        li {
                            (self.bibliography.get(id).unwrap().reference)
                        }
                    }
                }
            }
        };

        for (id, cites) in &self.used_bib {
            (self.cite_handler)(id, &cites[0]);
        }

        Ok(result)
    }

    fn convert(&mut self, table_head: bool, node: &Node) -> Result<Markup> {
        let result = match node {
            Node::Root(root) => self.expand(&root.children)?,
            Node::Break(_) => html! { br; },
            Node::ThematicBreak(_) => html! { hr; },
            Node::Blockquote(blockquote) => self.handle_blockquote(blockquote)?,
            Node::List(list) => {
                if list.ordered {
                    html! { ol start=[list.start] { (self.expand(&list.children)?) } }
                } else {
                    html! { ul { (self.expand(&list.children)?) } }
                }
            }
            Node::InlineCode(inline_code) => {
                html! { code { (inline_code.value) } }
            }
            Node::InlineMath(inline_math) => {
                html! { code{ (inline_math.value) } }
            }
            Node::Delete(delete) => {
                html! { del { (self.expand(&delete.children)?) } }
            }
            Node::Emphasis(emphasis) => {
                html! { em { (self.expand(&emphasis.children)?) } }
            }
            Node::Strong(strong) => {
                html! { strong { (self.expand(&strong.children)?) } }
            }
            Node::Html(html) => maud::PreEscaped(html.value.to_string()),
            Node::Image(image) => {
                html! { img src=(image.url) alt=(image.alt) title=[&image.title]; }
            }
            Node::Link(link) => {
                let (path, hash) = link
                    .url
                    .split_once("#")
                    .map(|(p, h)| (p, Some(h)))
                    .unwrap_or((link.url.as_str(), None));

                let href: Option<Cow<str>> = if path.is_empty() {
                    Some(Cow::Borrowed(""))
                } else {
                    match Url::parse(path) {
                        Ok(abs) => Some(Cow::Owned(abs.into())),
                        Err(url::ParseError::RelativeUrlWithoutBase) => {
                            if let Some(dest) = self.url_lookup.get(path) {
                                // if dest is None it's a draft and we don't want to link to it
                                dest.map(Cow::Borrowed)
                            } else {
                                bail!("unknown relative URL: {}", path);
                            }
                        }
                        Err(err) => {
                            bail!("invalid URL: {}, {err}", path);
                        }
                    }
                };

                html! {
                    @if let Some(href) = href {
                        @let href = if let Some(hash) = hash {
                            Cow::Owned(format!("{}#{}", href, hash))
                        } else {
                            href
                        };

                        a href=(href) title=[&link.title] {
                            (self.expand(&link.children)?)
                        }
                    } @else {
                        (self.expand(&link.children)?)
                    }
                }
            }
            Node::LinkReference(_link_reference) => bail!("link reference not implemented"),
            Node::ImageReference(_image_reference) => bail!("image reference not implemented"),
            Node::Text(text) => {
                // normalize whitespace
                static NORM_REGEX: std::sync::LazyLock<regex::Regex> =
                    std::sync::LazyLock::new(|| regex::Regex::new(r"[ \t\r\n]+").unwrap());

                let normed = NORM_REGEX.replace_all(&text.value, " ");

                html! { (self.convert_refs(&normed)?) }
            }
            Node::Code(code) => {
                html! {
                    pre {
                        code {
                            (code.value)
                        }
                    }
                }
            }
            Node::Math(_math) => {
                todo!()
            }
            Node::Heading(heading) => {
                let children = self.expand(&heading.children)?;
                match heading.depth {
                    1 => {
                        // we will synthesize the h1 later
                        Markup::default()
                    }
                    2 => {
                        html! {
                            (self.do_sections(2))
                            h2 { (children) }
                        }
                    }
                    3 => {
                        html! {
                            (self.do_sections(3))
                            h3 { (children) }
                        }
                    }
                    4 => {
                        html! {
                            (self.do_sections(4))
                            h4 { (children) }
                        }
                    }
                    5 => {
                        html! {
                            (self.do_sections(5))
                            h5 { (children) }
                        }
                    }
                    6 => {
                        html! {
                            (self.do_sections(6))
                            h6 { (children) }
                        }
                    }
                    _ => unreachable!(),
                }
            }
            Node::Table(table) => {
                html! {
                    @let mut children = table.children.iter();
                    table {
                        thead {
                            @if let Some(c) = children.next() {
                                (self.convert(true, c)?)
                            }
                        }
                        tbody {
                            @for c in children {
                                (self.convert(false, c)?)
                            }
                        }
                    }
                }
            }
            Node::TableRow(table_row) => {
                html! {
                    tr {
                        @for child in &table_row.children {
                            (self.convert(table_head, child)?)
                        }
                    }
                }
            }
            Node::TableCell(table_cell) => {
                html! {
                    @if table_head {
                        th { (self.expand(&table_cell.children)?) }
                    } @else {
                        td { (self.expand(&table_cell.children)?) }
                    }
                }
            }
            Node::ListItem(list_item) => {
                html! { li { (self.expand(&list_item.children)?) } }
            }
            Node::Paragraph(paragraph) => {
                if paragraph.children.is_empty() {
                    return Ok(Markup::default());
                }

                html! { p { (self.expand(&paragraph.children)?) } }
            }
            Node::MdxJsxFlowElement(mdx_jsx_flow_element) => {
                self.handle_component_flow(mdx_jsx_flow_element)?
            }
            Node::MdxJsxTextElement(mdx_jsx_text_element) => {
                self.handle_component_text(mdx_jsx_text_element)?
            }
            Node::MdxTextExpression(_mdx_text_expression) => {
                unreachable!("Markdown construct not enabled")
            }
            Node::MdxFlowExpression(_mdx_flow_expression) => {
                unreachable!("Markdown construct not enabled")
            }
            Node::MdxjsEsm(_mdxjs_esm) => unreachable!("Markdown construct not enabled"),
            Node::Definition(_) => Markup::default(), // already handled
            Node::FootnoteDefinition(_) => Markup::default(), // already handled
            Node::FootnoteReference(footnote_reference) => {
                if let Some(children) = self.fndefs.get(&footnote_reference.identifier) {
                    match children.as_slice() {
                        [Node::Paragraph(p)] => html! {
                            span.footnote-indicator { }
                            span.footnote role="note" { (self.expand(&p.children.clone())?) }
                        },
                        _ => bail!(
                            "unexpected footnote content (should be one paragraph): {:?}",
                            children
                        ),
                    }
                } else {
                    bail!(
                        "unknown footnote reference: {}",
                        footnote_reference.identifier
                    )
                }
            }
            // These should be handled by higher-level methods
            Node::Toml(_toml) => Markup::default(),
            Node::Yaml(_yaml) => Markup::default(),
        };

        Ok(result)
    }

    fn render_figure<'a>(
        &mut self,
        mut metadata: ImageMetadata,
        images: &[&markdown::mdast::Image],
        caption: impl IntoIterator<Item = &'a Node>,
    ) -> Result<Markup> {
        if metadata.license.is_none() {
            // check for a mistake
            if metadata.author.is_some()
                || metadata.author_given.is_some()
                || metadata.org_name.is_some()
            {
                bail!("missing license in image metadata");
            }

            // otherwise it's defaulting to me
            metadata.license = Some(License::CcByNcSa);
            metadata.license_version = Some("4.0".to_string());
            metadata.author_given = Some("George".to_string());
            metadata.author_family = Some("Pollard".to_string());
        }

        let multi_classes = [
            metadata.justify.as_deref(),
            metadata.cram.then_some("cram"),
            metadata.equalheight.then_some("equal-height"),
        ]
        .into_iter()
        .flatten()
        .join(" ");

        let noborder = if metadata.noborder { " border-0" } else { "" };
        let copyright_notice = metadata.copyright_notice();

        let figure_classes = [
            metadata.position.as_ref().map(|p| match p {
                ImagePositions::Left => "left",
                ImagePositions::Right => "right",
                ImagePositions::Aside => "aside",
            }),
            metadata.size.as_ref().map(|s| match s {
                ImageSizes::Small => "small",
                ImageSizes::Wide => "wide",
                ImageSizes::ExtraWide => "extra-wide",
            }),
        ]
        .into_iter()
        .flatten()
        .join(" ");

        // TODO: these need reviewing, at the moment this is copied from old code
        // they should be divided by number of images in a row, for example
        let sizes = match metadata.size {
            Some(ImageSizes::Wide) =>  "(max-width: 575.98px) 300px, (max-width: 991.98px) 600px, 800px",
            Some(ImageSizes::ExtraWide) => "(max-width: 575.98px) 300px, (max-width: 991.98px) 600px, (max-width: 1199.98px) 800px, 1000px",
            Some(ImageSizes::Small) |
            None => "(max-width: 575.98px) 300px, 600px",
        };

        let intended_width = match (&metadata.position, &metadata.size) {
            (None, Some(ImageSizes::ExtraWide)) => 1200,
            (None, Some(ImageSizes::Wide)) => 800,
            (None, None) => 600,
            (None, Some(ImageSizes::Small)) => 300,
            _ => 300,
        };

        let lightbox = |id: &str,
                        meta: &ImageManifestEntry,
                        alt: &str,
                        title: Option<&str>|
         -> Markup {
            // placeholder URL
            let (_, lightbox_url) = meta.url_for_width(1200);
            // actual srcset/sizes:
            let srcset = meta.srcset();
            let sizes = if srcset.is_some() {
                match &meta.sizes {
                    Some(sizes) => {
                        let mut result = String::new();
                        let last = sizes.len() - 1;
                        for (ix, size) in sizes.keys().enumerate() {
                            if ix == last {
                                _ = write!(result, "{size}px");
                            } else {
                                _ = write!(result, "(max-width: {size}px) {size}px, ");
                            }
                        }

                        Some(result)
                    }
                    None => None,
                }
            } else {
                None
            };

            html! {
                dialog.lightbox id=(id) {
                    img src=(lightbox_url) srcset=[srcset] sizes=[sizes]
                        width=(meta.width) height=(meta.height) loading="lazy"
                        alt=(alt) title=[title];
                    div.lightbox-under {
                        p itemscope {
                            (copyright_notice)
                        }
                        form method="dialog" {
                            a href=(meta.url) role="button" target="_blank" { "Full Size (" (meta.width) " × " (meta.height) " pixels)" }
                            button.lightbox-close { "Close" }
                        }
                    }
                }
            }
        };

        if images.len() == 1 {
            let img = &images[0];
            let meta = self.resolve_image(&img.url)?;
            let (_imgsize, imgurl) = meta.url_for_width(intended_width);
            let srcset = meta.srcset();
            let sizes = if srcset.is_some() { Some(sizes) } else { None };
            let lb_id = format!("lb-{}", uuid::Uuid::new_v4().simple());
            Ok(html! {
                figure class=(figure_classes) itemprop="image" itemscope itemtype="https://schema.org/ImageObject" {
                    (lightbox(&lb_id, meta, &img.alt, img.title.as_deref()))
                    a href={"#" (lb_id)} {
                        img class={"figure-img" (noborder)}
                            itemprop="contentUrl"
                            src=(imgurl) alt=(&img.alt)
                            width=(meta.width) height=(meta.height)
                            srcset=[srcset] sizes=[sizes];
                    }
                    figcaption {
                        div itemprop="caption" {
                            (self.expand(caption)?)
                        }
                        p {
                            (copyright_notice)
                        }
                    }
                }
            })
        } else {
            let metas = images
                .iter()
                .map(|img| Ok((img, self.resolve_image(&img.url)?)))
                .collect::<Result<Vec<_>>>()?;

            let copyright_hash = metas[0].1.hash.to_string();

            Ok(html! {
                figure class=(figure_classes) {
                    @for row in metas.chunks(metadata.per_row.unwrap_or(usize::MAX)) {
                        div class={"multi " (multi_classes)} {
                            @for (img, meta) in row {
                                @let srcset = meta.srcset();
                                @let sizes = if srcset.is_some() { Some(sizes) } else { None };
                                @let lb_id = format!("lb-{}", uuid::Uuid::new_v4().simple());
                                div itemscope itemtype="https://schema.org/ImageObject" itemprop="image" itemref=(copyright_hash) {
                                    (lightbox(&lb_id, meta, &img.alt, img.title.as_deref()))
                                    a href={"#" (lb_id)} {
                                        img class={"figure-img" (noborder)}
                                            src=(meta.url) alt=(&img.alt) title=[&img.title]
                                            srcset=[srcset] sizes=[sizes]
                                            width=(meta.width) height=(meta.height);
                                    }
                                }
                            }
                        }
                    }
                    figcaption {
                        div itemprop="caption" {
                            (self.expand(caption)?)
                        }
                        p #(copyright_hash) {
                            (copyright_notice)
                        }
                    }
                }
            })
        }
    }

    fn do_sections(&mut self, new_header: usize) -> Markup {
        let mut result = String::new();
        while let Some(last_header) = self.header_stack.last() {
            if new_header > *last_header {
                break;
            }

            result.push_str("</section>");
            self.header_stack.pop();
        }

        if new_header > 0 {
            self.header_stack.push(new_header);
            result.push_str("<section>");
        }

        maud::PreEscaped(result)
    }

    fn handle_component_text(&mut self, text: &MdxJsxTextElement) -> Result<Markup> {
        // Some preloaded abbreviations for ease of use
        if text.name.as_deref() == Some("abbr") {
            if let [Node::Text(t)] = text.children.as_slice() {
                if let Some(known) = match t.value.as_str() {
                    "BCE" => Some("before common era"),
                    "CE" => Some("common era"),
                    "c." => Some("circa"),
                    _ => None,
                } {
                    let class = t
                        .value
                        .chars()
                        .all(|c| c.is_ascii_uppercase())
                        .then_some("initialism");

                    return Ok(html! {
                        abbr class=[class] title=(known) { (t.value) }
                    });
                }
            }
        }

        let result = match text.name.as_deref() {
            Some(el_name) if el_name.starts_with(|c: char| c.is_ascii_lowercase()) => {
                let attributes = extract_attributes(&text.attributes)?;
                let empty = el_name == "br" || el_name == "img";
                if el_name == "span"
                    && attributes
                        .iter()
                        .any(|(name, value)| *name == "class" && value.contains("aka"))
                {
                    let lang_attr = find_attribute(&text.attributes, "lang")
                        .map(|l| INTL.parse_lang_tag(l))
                        .transpose()?
                        .unwrap_or_else(|| langid!("en"));

                    let markup = self.expand(&text.children)?;
                    (self.aka_handler)(lang_attr, markup);
                }

                html! {
                    (maud::PreEscaped(format!("<{}", el_name)))
                    @for attr in &attributes {
                        " " (attr.0) (maud::PreEscaped("=\"")) (attr.1) (maud::PreEscaped("\""))
                    }
                    (maud::PreEscaped(">"))
                    (self.expand(&text.children)?)
                    @if !empty {
                        (maud::PreEscaped(format!("</{}>", el_name)))
                    }
                }
            }
            Some("Pronounce") => {
                // TODO: complete this
                let lang = find_attribute(&text.attributes, "lang")
                    .ok_or_eyre("lang attribute is required on <Pronounce>")?;

                let pronouncer = find_attribute(&text.attributes, "pronouncer")
                    .ok_or_eyre("pronouncer attribute is required on <Pronounce>")?;

                let noun = find_attribute(&text.attributes, "noun")
                    .map(|_| " noun")
                    .unwrap_or_default();

                let class = find_attribute(&text.attributes, "class")
                    .map(|c| format!(" {}", c))
                    .unwrap_or_default();

                let rendered_children = self.expand(&text.children)?;

                if class.contains("aka") {
                    let langid = INTL.parse_lang_tag(lang)?;
                    (self.aka_handler)(langid, rendered_children.clone());
                }

                let file = find_attribute(&text.attributes, "file")
                    .map(|v| Ok(v.to_string()))
                    .unwrap_or_else(|| {
                        let word = match text.children.as_slice() {
                            [Node::Text(Text { value, .. })] => value,
                            _ => eyre::bail!("<Pronounce> must have a single text child"),
                        };

                        let word = url_escape::encode_path(&word);

                        Ok(format!("pronunciation_{lang}_{word}.mp3"))
                    })?;

                let title = format!(
                    "Pronunciation © ‘{pronouncer}’ CC-BY-NC-SA 3.0, courtesy of Forvo.com."
                );

                html! {
                    audio preload="none" src={"/audio/" (file)} {}
                    span class={"pronunciation" (noun) (class)} lang=(lang) title=(title) onclick="this.previousSibling.play()" {
                        (rendered_children)
                    }
                }
            }
            Some("Cards") => {
                let [Node::Text(text)] = text.children.as_slice() else {
                    bail!("<Cards> must have a single text child");
                };

                let children = text
                    .value
                    .chars()
                    .map(|c| {
                        Ok(match c {
                            'c' => {
                                html! { "♣" }
                            }
                            's' => {
                                html! { "♠" }
                            }
                            'd' => {
                                html! { span.red { "♦" } }
                            }
                            'h' => {
                                html! { span.red { "♥" } }
                            }
                            c => {
                                html! { (c) }
                            }
                        })
                    })
                    .collect::<Result<Vec<Markup>>>()?;

                html! {
                    span.playing-cards {
                        @for c in children {
                            (c)
                        }
                    }
                }
            }
            Some("Dice") => {
                let dice_type = find_attribute(&text.attributes, "type");
                if let Some(ty) = dice_type {
                    if ty != "chinese" && ty != "japanese" {
                        bail!("unknown dice type: {ty}");
                    }
                }

                let [Node::Text(text)] = text.children.as_slice() else {
                    bail!("<Dice> must have a single text child");
                };

                let ty = dice_type.map(|c| "_".to_string() + c).unwrap_or_default();

                let children =
                    text.value
                    .chars()
                    .map(|d| {
                        Ok(match d {
                            '1' => html! { img.inline-img alt="⚀" src={"/small-images/d6" (ty) "/d6_1.svg"}; },
                            '2' => html! { img.inline-img alt="⚁" src={"/small-images/d6" (ty) "/d6_2.svg"}; },
                            '3' => html! { img.inline-img alt="⚂" src={"/small-images/d6" (ty) "/d6_3.svg"}; },
                            '4' => html! { img.inline-img alt="⚃" src={"/small-images/d6" (ty) "/d6_4.svg"}; },
                            '5' => html! { img.inline-img alt="⚄" src={"/small-images/d6" (ty) "/d6_5.svg"}; },
                            '6' => html! { img.inline-img alt="⚅" src={"/small-images/d6" (ty) "/d6_6.svg"}; },
                            '?' | 'q' => html! { img.inline-img alt="any" src={"/small-images/d6" (ty) "/d6_q.svg"}; },
                            '=' => html! { img.inline-img alt="equal" src={"/small-images/d6" (ty) "/d6_=.svg"}; },
                            o => bail!("invalid dice character: {}", o),
                        })
                    })
                    .collect::<Result<Vec<Markup>>>()?;

                html! {
                    span.dice {
                        @for c in children.into_iter().intersperse(html! { "\u{2009}" }) {
                            (c)
                        }
                    }
                }
            }
            _ => return Err(eyre!("unknown component: {:?}", text.name)),
        };

        Ok(result)
    }

    fn handle_component_flow(&mut self, flow: &MdxJsxFlowElement) -> Result<Markup> {
        let result = match flow.name.as_deref() {
            Some(el_name) if el_name.starts_with(|c: char| c.is_ascii_lowercase()) => {
                let attributes = extract_attributes(&flow.attributes)?;
                let empty = el_name == "br" || el_name == "img";
                html! {
                    (maud::PreEscaped(format!("<{}", el_name)))
                    @for attr in attributes {
                        " " (attr.0) (maud::PreEscaped("=\"")) (attr.1) (maud::PreEscaped("\""))
                    }
                    (maud::PreEscaped(">"))
                    (self.expand(&flow.children)?)
                    @if !empty {
                        (maud::PreEscaped(format!("</{}>", el_name)))
                    }
                }
            }
            _ => return Err(eyre!("unknown component: {:?}", flow.name)),
        };

        Ok(result)
    }

    fn handle_blockquote(&mut self, blockquote: &Blockquote) -> Result<Markup> {
        if let Some(Node::Paragraph(p)) = blockquote.children.first() {
            if let Some(Node::Text(t)) = p.children.first() {
                let trimmed = t.value.trim();
                if trimmed == "[!aside]" {
                    return Ok(html! {
                        aside role="note" class="footnote" {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if trimmed.starts_with("[!todo]") {
                    // not rendered
                    return Ok(Markup::default());
                } else if trimmed == "[!figure]" {
                    let mut iter = blockquote.children.iter().skip(1).peekable();

                    let mut images = Vec::new();
                    let p = match iter.next() {
                        Some(Node::Paragraph(p)) => p,
                        e => {
                            eyre::bail!(
                                "figure callout should contain paragraph as first child, got: {e:?}",
                            );
                        }
                    };

                    for child in &p.children {
                        match child {
                            Node::Image(img) => {
                                images.push(img);
                            }
                            Node::Text(t) if t.value.trim().is_empty() => { /* skip */ }
                            _ => {
                                eyre::bail!("figure callout should only contain images in first child, got: {:?}", child);
                            }
                        }
                    }

                    let metadata: ImageMetadata = if matches!(iter.peek(), Some(Node::Code(_))) {
                        let Some(Node::Code(yaml)) = iter.next() else {
                            unreachable!()
                        };

                        if yaml.lang.as_deref() != Some("yaml") {
                            eyre::bail!("figure callout code block must be 'yaml'");
                        }

                        let yaml =
                            saphyr::Yaml::load_from_str(&yaml.value).wrap_err("parsing yaml")?;

                        serde_json::from_value(yaml_to_json(yaml)?)?
                    } else {
                        Default::default()
                    };

                    let mut caption: Vec<&Node> = Vec::new();
                    for next in iter {
                        if let p @ Node::Paragraph(_) = next {
                            caption.push(p);
                        } else {
                            eyre::bail!("figure callout should only contain paragraphs after images/metadata: {:?}", next);
                        }
                    }

                    return self.render_figure(metadata, &images, caption);
                } else if trimmed == "[!epigraph]" {
                    return Ok(html! {
                        blockquote.epigraph {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if trimmed == "[!multi]" {
                    return Ok(html! {
                        div.multi {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if trimmed == "[!multi-equal]" {
                    return Ok(html! {
                        div.multi.equal {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if trimmed == "[!multi-wide]" {
                    return Ok(html! {
                        div.multi.wide {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if trimmed == "[!multi-extra-wide]" {
                    return Ok(html! {
                        div.multi.extra-wide {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if trimmed == "[!game]" {
                    return Ok(html! {
                        div.aside.game-meta {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if let Some(lang) = trimmed.strip_prefix("[!lang]") {
                    return Ok(html! {
                        div lang=(lang.trim()) {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if let Some(lang) = trimmed.strip_prefix("[!langv]") {
                    return Ok(html! {
                        div.vertical-rl lang=(lang.trim()) {
                            (self.expand(&blockquote.children[1..])?)
                        }
                    });
                } else if trimmed.starts_with("[!") {
                    return Err(eyre!(
                        "unknown callout: {}]",
                        trimmed.split_once("]").unwrap().0
                    ));
                }
            }
        }

        Ok(html! {
            blockquote {
                (self.expand(&blockquote.children)?)
            }
        })
    }

    fn resolve_image(&self, url: &str) -> Result<&ImageManifestEntry> {
        self.img_manifest
            // first try obsidian vault-relative URL
            .get(url)
            .or_else(|| {
                let content_root = url::Url::from_directory_path(self.content_root).unwrap();
                let url_file = url::Url::from_file_path(self.file_path)
                    .unwrap()
                    .join(url)
                    .unwrap();
                let rel_path = content_root.make_relative(&url_file).unwrap();

                // file-relative URL
                self.img_manifest.get(&rel_path)
            })
            .ok_or_else(|| {
                eyre!(
                    "unknown image: {} (self: {})",
                    &url,
                    self.file_path.display()
                )
            })
    }
}

fn find_attribute<'a>(atts: &'a [AttributeContent], name: &'static str) -> Option<&'a str> {
    atts.iter().find_map(|att| match att {
        AttributeContent::Property(mdx_jsx_attribute) if mdx_jsx_attribute.name == name => {
            mdx_jsx_attribute.value.as_ref().and_then(|v| match v {
                AttributeValue::Literal(s) => Some(s.as_str()),
                _ => None,
            })
        }
        _ => None,
    })
}

#[derive(Deserialize, Default)]
#[serde(deny_unknown_fields, rename_all = "camelCase")]
struct ImageMetadata {
    license: Option<License>,

    position: Option<ImagePositions>,
    size: Option<ImageSizes>,
    copyright_year: Option<u32>,
    license_version: Option<String>, // TODO
    original_url: Option<String>,
    identifier: Option<String>,

    #[serde(default)]
    noborder: bool,

    #[serde(default)]
    cram: bool,

    #[serde(default)]
    equalheight: bool,

    #[serde(default)]
    hidden: bool, // this means to hide the copyright display

    justify: Option<String>,

    per_row: Option<usize>,

    author: Option<String>,
    author_given: Option<String>,
    author_family: Option<String>,
    author_lang: Option<String>,

    org_name: Option<String>,
    org_abbr: Option<String>,
    org_url: Option<String>,
    org_lang: Option<String>,

    terms_url: Option<String>,
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields, rename_all = "camelCase")]
struct GameMetadata {}

#[derive(Deserialize)]
#[serde(rename_all = "kebab-case")]
enum ImagePositions {
    Left,
    Right,
    Aside,
}

#[derive(Deserialize)]
#[serde(rename_all = "kebab-case")]
enum ImageSizes {
    Small,
    Wide,
    ExtraWide,
}

#[derive(Deserialize)]
#[serde(rename_all = "kebab-case")]
enum License {
    WithPermission,
    StockImage,
    Cc0,
    CcBy,
    CcBySa,
    CcByNc,
    CcByNd,
    CcByNcNd,
    CcByNcSa,
    UsFairUse,
    Terms,
}

const CC: char = '\u{1f16d}';
const CC0: char = '\u{1f16e}';
const BY: char = '\u{1f16f}';
const SA: char = '\u{1f10e}';
const NC: char = '\u{1f10f}';
const ND: char = '⊜';

impl ImageMetadata {
    fn copyright_notice(&self) -> Markup {
        let hidden = if self.hidden { Some("hidden") } else { None };
        let license = self.license_info();
        html! {
            span itemprop="copyrightNotice" hidden=[hidden] {
                @if !matches!(self.license, Some(License::Cc0)) {
                    "© "
                }
                @if let Some(copyright_year) = self.copyright_year {
                    span itemprop="copyrightYear" { (copyright_year) }
                    " "
                }
                @if let Some(copyright_holder) = self.copyright_holder() {
                    @if let Some(original_url) = &self.original_url {
                        a href=(original_url) { (copyright_holder) }
                    } @else {
                        (copyright_holder)
                    }

                    @if !license.0.is_empty() {
                        ", "
                    }
                }
                (license)
                @if let Some(identifier) = &self.identifier {
                    ": " span.image-identifier { (identifier) }
                }
            }
        }
    }

    fn copyright_holder(&self) -> Option<Markup> {
        if self.org_name.is_some() {
            if self.author.is_some() || self.author_given.is_some() {
                Some(self.person("creator"))
            } else {
                Some(self.organization("copyrightHolder"))
            }
        } else if self.author.is_some() || self.author_given.is_some() {
            Some(self.person("copyrightHolder creator"))
        } else {
            None
        }
    }

    fn organization(&self, itemprop: &str) -> Markup {
        if let Some(org_name) = &self.org_name {
            let content = if let Some(org_abbr) = &self.org_abbr {
                html! {
                    meta itemprop="name" content=(org_name);
                    abbr title=(org_name) { (org_abbr) }
                }
            } else {
                html! { span itemprop="name" { (org_name) } }
            };
            html! {
                span itemscope itemtype="https://schema.org/Organization" lang=[&self.org_lang] itemprop=(itemprop) {
                    @if let Some(url) = &self.org_url {
                        a href=(url) { (content) }
                    } @else {
                        (content)
                    }
                }
            }
        } else {
            todo!("huh")
        }
    }

    fn person(&self, itemprop: &str) -> Markup {
        html! {
            span itemscope itemtype="https://schema.org/Person" itemprop=(itemprop) {
                @if self.org_name.is_some() {
                    (self.organization("worksFor")) "/"
                }
                span itemprop="name" lang=[&self.author_lang] {
                    @if let Some(name) = &self.author {
                        (name)
                    }

                    @if crate::bib_render::family_last(self.author_lang.as_deref()) {
                        @if let Some(given) = &self.author_given {
                            span itemprop="givenName" { (given) }
                        }
                        " "
                        @if let Some(family) = &self.author_family {
                            span itemprop="familyName" { (family) }
                        }
                    } @else {
                        @if let Some(family) = &self.author_family {
                            span itemprop="familyName" { (family) }
                        }
                        @if let Some(given) = &self.author_given {
                            span itemprop="givenName" { (given) }
                        }
                    }
                }
            }
        }
    }

    fn license_info(&self) -> Markup {
        let cc = |name: &str, title: &str, content: Markup| -> Markup {
            let version = self.license_version.as_deref().unwrap_or("4.0");
            html! {
                a itemprop="license" href={"https://creativecommons.org/licenses/" (name) "/" (version) "/"}
                title={"Licensed under the Creative Commons " (title) " license " (version)} {
                    (content)
                }
            }
        };

        match self.license.as_ref().unwrap() {
            License::StockImage => Markup::default(),
            License::WithPermission => {
                html! { "used with permission" }
            }
            License::UsFairUse => {
                html! { "under US fair use" }
            }
            License::Terms => {
                html! {
                    span {
                        "used in accordance with "
                        a href=[&self.terms_url] itemprop="license" { "terms" }
                    }
                }
            }
            License::Cc0 => {
                html! {
                    a itemprop="license" href="https://creativecommons.org/publicdomain/mark/1.0/" title="Public Domain" {
                        (CC0)
                    }
                }
            }
            License::CcBy => cc("by", "Attribution", html! { (CC) (BY) }),
            License::CcBySa => cc("by-sa", "Attribution-ShareAlike", html! { (CC) (BY) (SA) }),
            License::CcByNc => cc(
                "by-nc",
                "Attribution-NonCommercial",
                html! { (CC) (BY) (NC) },
            ),
            License::CcByNd => cc(
                "by-nd",
                "Attribution-NoDerivatives",
                html! { (CC) (BY) (ND) },
            ),
            License::CcByNcNd => cc(
                "by-nc-nd",
                "Attribution-NonCommercial-NoDerivatives",
                html! { (CC) (BY) (NC) (ND) },
            ),
            License::CcByNcSa => cc(
                "by-nc-sa",
                "Attribution-NonCommercial-ShareAlike",
                html! { (CC) (BY) (NC) (SA) },
            ),
        }
    }
}

fn extract_attributes(attributes: &[AttributeContent]) -> Result<Vec<(&str, &str)>> {
    attributes
        .iter()
        .map(|attr| match attr {
            AttributeContent::Expression(mdx_jsx_expression_attribute) => bail!(
                "MDX expressions not supported: {:?}",
                mdx_jsx_expression_attribute
            ),
            AttributeContent::Property(mdx_jsx_attribute) => match &mdx_jsx_attribute.value {
                Some(value) => match value {
                    AttributeValue::Expression(attribute_value_expression) => {
                        bail!(
                            "MDX expressions not supported: {:?}",
                            attribute_value_expression
                        )
                    }
                    AttributeValue::Literal(s) => Ok((mdx_jsx_attribute.name.as_str(), s.as_str())),
                },
                None => bail!("attribute value required: {:?}", mdx_jsx_attribute),
            },
        })
        .collect::<Result<Vec<_>>>()
}

fn yaml_to_json(input: Vec<saphyr::Yaml>) -> Result<serde_json::Value> {
    if input.len() == 1 {
        yaml_node_to_json(input.into_iter().next().unwrap())
    } else {
        eyre::bail!("expected exactly one yaml node")
    }
}

fn yaml_node_to_string(yaml: saphyr::Yaml) -> Result<String> {
    let result = match yaml {
        saphyr::Yaml::String(x) => x,
        saphyr::Yaml::Real(x) => x,
        saphyr::Yaml::Integer(x) => x.to_string(),
        saphyr::Yaml::Boolean(x) => x.to_string(),
        saphyr::Yaml::Array(_) => bail!("unexpected array as key value"),
        saphyr::Yaml::Hash(_) => bail!("unexpected hash as key value"),
        saphyr::Yaml::Alias(_) => bail!("unexpected alias as key value"),
        saphyr::Yaml::Null => bail!("unexpected null as key value"),
        saphyr::Yaml::BadValue => bail!("bad value"),
    };

    Ok(result)
}

fn yaml_node_to_json(yaml: saphyr::Yaml) -> Result<serde_json::Value> {
    let result: serde_json::Value = match yaml {
        saphyr::Yaml::Real(x) => str::parse::<f64>(&x)?.into(),
        saphyr::Yaml::Integer(x) => x.into(),
        saphyr::Yaml::String(x) => x.into(),
        saphyr::Yaml::Boolean(x) => x.into(),
        saphyr::Yaml::Array(vec) => vec
            .into_iter()
            .map(yaml_node_to_json)
            .collect::<Result<Vec<_>>>()?
            .into(),
        saphyr::Yaml::Hash(linked_hash_map) => linked_hash_map
            .into_iter()
            .map(|(k, v)| Ok((yaml_node_to_string(k)?, yaml_node_to_json(v)?)))
            .collect::<Result<Map<_, _>>>()?
            .into(),
        saphyr::Yaml::Alias(_) => todo!(),
        saphyr::Yaml::Null => serde_json::Value::Null,
        saphyr::Yaml::BadValue => eyre::bail!("bad value"),
    };

    Ok(result)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn indicator() {
        assert_eq!(index_to_string(0), "");
        assert_eq!(index_to_string(1), "A");
        assert_eq!(index_to_string(26), "Z");
        assert_eq!(index_to_string(27), "AA");
    }
}
