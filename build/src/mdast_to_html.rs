use std::{collections::BTreeMap, ffi::OsStr, io::Write, process, sync::LazyLock};

use eyre::{eyre, Context, OptionExt, Result};
use markdown::mdast::{
    AttributeContent, AttributeValue, Blockquote, MdxJsxFlowElement, MdxJsxTextElement, Node, Text,
    Yaml,
};
use maud::{html, Markup};
use regex::Captures;
use serde::Deserialize;

pub fn get_header(node: &Node) -> Option<Yaml> {
    match node {
        Node::Yaml(yaml) => Some(yaml.clone()),
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

pub fn to_html(node: Node, bibliography: &BTreeMap<String, Markup>) -> Result<Markup> {
    let (fndefs, linkdefs) = locate_defs(&node);
    Converter {
        fndefs,
        linkdefs,
        bibliography,
        used_bib: Vec::new(),
    }
    .convert(false, node)
}

struct Converter<'a> {
    fndefs: BTreeMap<String, Vec<Node>>,
    linkdefs: BTreeMap<String, String>,
    bibliography: &'a BTreeMap<String, Markup>,
    used_bib: Vec<String>,
}

impl Converter<'_> {
    fn expand(&mut self, n: Vec<Node>) -> Result<Markup> {
        Ok(html! {
            @for child in n {
                (self.convert(false, child)?)
            }
        })
    }

    fn convert_refs(&mut self, text: String) -> Markup {
        static RE1: LazyLock<regex::Regex> = LazyLock::new(|| {
            regex::Regex::new(r"\[@(?<id>(_|[^\s\p{P}])+)(\s+(?<what>[^\]]+))?\]").unwrap()
        });

        let t1 = RE1.replace_all(&text, |m: &Captures<'_>| {
            let id = m.name("id").unwrap().as_str();
            self.used_bib.push(id.to_owned());

            html! {
                sup.citation {
                    a href={"#ref-" (id)} {
                        "A CITATION"
                        @if let Some(what) = m.name("what") {
                            " (" (what.as_str()) ")"
                        }
                    }
                }
            }
            .into_string()
        });

        static RE2: LazyLock<regex::Regex> = LazyLock::new(|| {
            regex::Regex::new(r"@(?<id>(_|[^\s\p{P}])+)(\s+\[(?<what>[^\]]+)\])?").unwrap()
        });

        let t2 = RE2.replace_all(&t1, |m: &Captures<'_>| {
            let id = m.name("id").unwrap().as_str();
            self.used_bib.push(id.to_owned());

            html! {
                a href={"#ref-" (id)} {
                    "A CITATION"
                    @if let Some(what) = m.name("what") {
                        " (" (what.as_str()) ")"
                    }
                }
            }
            .into_string()
        });

        maud::PreEscaped(t2.into_owned())
    }

    fn convert(&mut self, table_head: bool, node: Node) -> Result<Markup> {
        let result = match node {
            Node::Root(root) => self.expand(root.children)?,
            Node::Break(_) => html! { br; },
            Node::ThematicBreak(_) => html! { hr; },
            Node::Blockquote(blockquote) => self.handle_blockquote(blockquote)?,
            Node::List(list) => {
                if list.ordered {
                    html! { ol start=[list.start] { (self.expand(list.children)?) } }
                } else {
                    html! { ul { (self.expand(list.children)?) } }
                }
            }
            Node::InlineCode(inline_code) => {
                html! { code { (inline_code.value) } }
            }
            Node::InlineMath(inline_math) => {
                html! { code{ (inline_math.value) } }
            }
            Node::Delete(delete) => {
                html! { del { (self.expand(delete.children)?) } }
            }
            Node::Emphasis(emphasis) => {
                html! { em { (self.expand(emphasis.children)?) } }
            }
            Node::Strong(strong) => {
                html! { strong { (self.expand(strong.children)?) } }
            }
            Node::Html(html) => maud::PreEscaped(html.value),
            Node::Image(image) => {
                html! { img src=(image.url) alt=(image.alt) title=[image.title]; }
            }
            Node::ImageReference(image_reference) => Markup::default(),
            Node::Link(link) => {
                html! {
                    a href=(link.url) title=[link.title] {
                        (self.expand(link.children)?)
                    }
                }
            }
            Node::LinkReference(link_reference) => {
                todo!()
            }
            Node::Text(text) => {
                html! { (self.convert_refs(text.value)) }
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
            Node::Math(math) => {
                todo!()
            }
            Node::Heading(heading) => {
                let children = self.expand(heading.children)?;
                match heading.depth {
                    1 => {
                        html! { h1 { (children) } }
                    }
                    2 => {
                        html! { h2 { (children) } }
                    }
                    3 => {
                        html! { h3 { (children) } }
                    }
                    4 => {
                        html! { h4 { (children) } }
                    }
                    5 => {
                        html! { h5 { (children) } }
                    }
                    6 => {
                        html! { h6 { (children) } }
                    }
                    _ => unreachable!(),
                }
            }
            Node::Table(table) => {
                html! {
                    @let mut children = table.children.into_iter();
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
                        @for child in table_row.children {
                            (self.convert(table_head, child)?)
                        }
                    }
                }
            }
            Node::TableCell(table_cell) => {
                html! {
                    @if table_head {
                        th { (self.expand(table_cell.children)?) }
                    } @else {
                        td { (self.expand(table_cell.children)?) }
                    }
                }
            }
            Node::ListItem(list_item) => {
                html! { li { (self.expand(list_item.children)?) } }
            }
            Node::Paragraph(paragraph) => {
                html! { p { (self.expand(paragraph.children)?) } }
            }
            Node::MdxJsxFlowElement(mdx_jsx_flow_element) => {
                self.handle_component_flow(mdx_jsx_flow_element)?
            }
            Node::MdxJsxTextElement(mdx_jsx_text_element) => {
                self.handle_component_text(mdx_jsx_text_element)?
            }
            Node::MdxTextExpression(mdx_text_expression) => todo!(),
            Node::MdxFlowExpression(mdx_flow_expression) => todo!(),
            Node::MdxjsEsm(mdxjs_esm) => todo!(),
            Node::Definition(_) => Markup::default(), // already handled
            Node::FootnoteDefinition(_) => Markup::default(), // already handled
            Node::FootnoteReference(footnote_reference) => {
                if let Some(children) = self.fndefs.get(&footnote_reference.identifier) {
                    html! {
                        span.footnote { (self.expand(children.clone())?) }
                    }
                } else {
                    panic!(
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

    fn handle_component_text(&mut self, flow: MdxJsxTextElement) -> Result<Markup> {
        // Some preloaded abbreviations for ease of use
        if flow.name.as_deref() == Some("abbr") {
            if let [Node::Text(t)] = flow.children.as_slice() {
                if let Some(known) = match t.value.as_str() {
                    "BCE" => Some("before common era"),
                    "CE" => Some("common era"),
                    "c." => Some("circa"),
                    _ => None,
                } {
                    let class = if t.value.chars().all(|c| c.is_ascii_uppercase()) {
                        Some("initialism")
                    } else {
                        None
                    };

                    return Ok(html! {
                        abbr class=[class] title=(known) { (t.value) }
                    });
                }
            }
        }

        let result = match flow.name.as_deref() {
            Some(x) if x.chars().next().unwrap().is_ascii_lowercase() => {
                // TODO: ugly
                html! {
                    @if let Some(name) = &flow.name {
                        (maud::PreEscaped(format!("<{}", name)))
                    }
                    @for attr in flow.attributes {
                        @match attr {
                            markdown::mdast::AttributeContent::Expression(mdx_jsx_expression_attribute) => (todo!()),
                            markdown::mdast::AttributeContent::Property(mdx_jsx_attribute) =>  {
                                (maud::PreEscaped(format!(" {}", mdx_jsx_attribute.name)))
                                @if let Some(value) = mdx_jsx_attribute.value {
                                    @match value {
                                        markdown::mdast::AttributeValue::Expression(attribute_value_expression) => (todo!("{}", attribute_value_expression.value)),
                                        markdown::mdast::AttributeValue::Literal(s) => (maud::PreEscaped(format!("=\"{}\"", s))),
                                    }
                                }
                            },

                        }
                    }
                    (maud::PreEscaped(">"))
                    (self.expand(flow.children)?)
                    @if let Some(name) = flow.name {
                        (maud::PreEscaped(format!("</{}>", name)))
                    }
                }
            }
            Some("Pronounce") => {
                // TODO: complete this
                let lang = find_attribute(&flow.attributes, "lang")
                    .ok_or_eyre("lang attribute is required on <Pronounce>")?;

                let pronouncer = find_attribute(&flow.attributes, "pronouncer")
                    .ok_or_eyre("pronouncer attribute is required on <Pronounce>")?;

                let noun = find_attribute(&flow.attributes, "noun")
                    .map(|_| " noun")
                    .unwrap_or_default();

                let file = find_attribute(&flow.attributes, "file")
                    .map(|v| Ok(v.to_string()))
                    .unwrap_or_else(|| {
                        let word = match flow.children.as_slice() {
                            [Node::Text(Text { value, .. })] => value,
                            _ => eyre::bail!("<Pronounce> must have a single text child"),
                        };

                        Ok(format!("pronunciation_{lang}_{word}.mp3"))
                    })?;

                let title = format!(
                    "Pronunciation © ‘{pronouncer}’ CC-BY-NC-SA 3.0, courtesy of Forvo.com."
                );

                html! {
                    audio preload="none" src={"/audio/" (file)};
                    span class={"pronunciation" (noun)} lang=(lang) title=(title) onclick="this.previousSibling.play()" {
                        (self.expand(flow.children)?)
                    }
                }
            }
            Some("Cards") => {
                // TODO: complete this
                html! {
                    span.cards { (self.expand(flow.children)?) }
                }
            }
            Some("Dice") => {
                // TODO: complete this
                html! {
                    span.dice { (self.expand(flow.children)?) }
                }
            }
            _ => return Err(eyre!("unknown component: {:?}", flow.name)),
        };

        Ok(result)
    }

    fn handle_component_flow(&mut self, flow: MdxJsxFlowElement) -> Result<Markup> {
        let result = match flow.name.as_deref() {
            Some(x) if x.chars().next().unwrap().is_ascii_lowercase() => {
                // TODO: ugly
                html! {
                    @if let Some(name) = &flow.name {
                        (maud::PreEscaped(format!("<{}", name)))
                    }
                    @for attr in flow.attributes {
                        @match attr {
                            markdown::mdast::AttributeContent::Expression(mdx_jsx_expression_attribute) => (todo!()),
                            markdown::mdast::AttributeContent::Property(mdx_jsx_attribute) =>  {
                                (maud::PreEscaped(format!(" {}", mdx_jsx_attribute.name)))
                                @if let Some(value) = mdx_jsx_attribute.value {
                                    @match value {
                                        markdown::mdast::AttributeValue::Expression(attribute_value_expression) => (todo!()),
                                        markdown::mdast::AttributeValue::Literal(s) => (maud::PreEscaped(format!("=\"{}\"", s))),
                                    }
                                }
                            },

                        }
                    }
                    (maud::PreEscaped(">"))
                    (self.expand(flow.children)?)
                    @if let Some(name) = flow.name {
                        (maud::PreEscaped(format!("</{}>", name)))
                    }
                }
            }
            _ => return Err(eyre!("unknown component: {:?}", flow.name)),
        };

        Ok(result)
    }

    fn handle_blockquote(&mut self, blockquote: Blockquote) -> Result<Markup> {
        if let Some(Node::Paragraph(p)) = blockquote.children.first() {
            if let Some(Node::Text(t)) = p.children.first() {
                let trimmed = t.value.trim();
                if trimmed == "[!aside]" {
                    return Ok(html! {
                        aside role="note" class="footnote" {
                            (self.expand(blockquote.children.into_iter().skip(1).collect())?)
                        }
                    });
                } else if trimmed.starts_with("[!todo]") {
                    // not rendered
                    return Ok(Markup::default());
                } else if trimmed == "[!figure]" {
                    let mut iter = blockquote.children.into_iter().skip(1).peekable();

                    let mut images = Vec::new();
                    let p = match iter.next() {
                        Some(Node::Paragraph(p)) => p,
                        e => {
                            eyre::bail!(
                                "figure callout should contain paragraph as first child, got: {e:?}",
                            );
                        }
                    };

                    for child in p.children {
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

                        let as_json = process::Command::new("yq")
                            .args([OsStr::new("-o"), OsStr::new("json")])
                            .stdin(process::Stdio::piped())
                            .stdout(process::Stdio::piped())
                            .spawn()
                            .wrap_err("spawning yq")?;

                        as_json
                            .stdin
                            .as_ref()
                            .expect("stdout was piped")
                            .write_all(yaml.value.as_bytes())?;

                        let output = as_json.wait_with_output().wrap_err("waiting for yq")?;

                        if !output.status.success() {
                            eyre::bail!("yq failed to parse:\n{}", yaml.value);
                        }

                        serde_json::from_slice(&output.stdout)?
                    } else {
                        ImageMetadata {
                            ..Default::default()
                        }
                    };

                    let mut caption = Vec::new();
                    for next in iter {
                        if let Node::Paragraph(p) = next {
                            caption.push(Node::Paragraph(p));
                        } else {
                            eyre::bail!("figure callout should only contain paragraphs after images/metadata: {:?}", next);
                        }
                    }

                    return Ok(html! {
                        figure {
                            @for img in images {
                                img src=(img.url) alt=(img.alt) title=[img.title];
                            }

                            figcaption {
                                (self.expand(caption)?)
                            }
                        }
                    });
                } else if trimmed == "[!epigraph]" {
                    return Ok(html! {
                        blockquote.epigraph {
                            (self.expand(blockquote.children.into_iter().skip(1).collect())?)
                        }
                    });
                } else if trimmed == "[!multi]" {
                    return Ok(html! {
                        div.multi {
                            (self.expand(blockquote.children.into_iter().skip(1).collect())?)
                        }
                    });
                } else if trimmed == "[!multi-equal]" {
                    return Ok(html! {
                        div.multi.equal {
                            (self.expand(blockquote.children.into_iter().skip(1).collect())?)
                        }
                    });
                } else if trimmed == "[!multi-wide]" {
                    return Ok(html! {
                        div.multi.wide {
                            (self.expand(blockquote.children.into_iter().skip(1).collect())?)
                        }
                    });
                } else if trimmed == "[!multi-extra-wide]" {
                    return Ok(html! {
                        div.multi.extra-wide {
                            (self.expand(blockquote.children.into_iter().skip(1).collect())?)
                        }
                    });
                } else if trimmed.starts_with("[!") {
                    return Err(eyre!(
                        "unknown callout: {}",
                        trimmed.split_once("]").unwrap().0
                    ));
                }
            }
        }

        Ok(html! {
            blockquote {
                (self.expand(blockquote.children)?)
            }
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
    position: Option<ImagePositions>,
    size: Option<ImageSizes>,
    copyright_year: Option<u32>,
    license: Option<License>,
    license_version: Option<String>, // TODO
    original_url: Option<String>,
    identifier: Option<String>,

    #[serde(default)]
    noborder: bool,

    #[serde(default)] // TODO - remove
    author_family_first: bool,

    #[serde(default)] // TODO - remove?
    cram: bool,

    #[serde(default)] // TODO - remove?
    equalheight: bool,

    #[serde(default)] // TODO - remove?
    hidden: bool,

    justify: Option<String>, // TODO remove?

    per_row: Option<u32>,

    author: Option<String>,
    author_given: Option<String>,
    author_family: Option<String>,
    author_lang: Option<String>,

    org_name: Option<String>,
    org_abbr: Option<String>,
    org_url: Option<String>,
    org_lang: Option<String>,
}

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
}
