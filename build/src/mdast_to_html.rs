use std::{
    borrow::Cow,
    cell::RefCell,
    collections::{BTreeMap, HashSet},
    fmt::Write,
    path::Path,
    sync::LazyLock,
};

use eyre::{bail, eyre, Context, OptionExt, Result};
use icu::locale::{langid, LanguageIdentifier};
use indexmap::IndexMap;
use itertools::Itertools;
use markdown::mdast::{
    AttributeContent, AttributeValue, Blockquote, MdxJsxFlowElement, MdxJsxTextElement, Node, Text,
    Yaml,
};
use maud::{html, Markup};
use serde::Deserialize;
use url::Url;
use uuid::{uuid, Uuid};

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

pub type HtmlRender = (
    Markup,
    Vec<(LanguageIdentifier, Markup)>,
    Vec<(String, String)>,
);

pub fn to_html(
    content_root: &Path,
    file_path: &Path,
    node: &Node,
    bibliography: &RenderedBibliography,
    images: &ImageManifest,
    url_lookup: &BTreeMap<String, Option<String>>,
) -> Result<HtmlRender> {
    let (fndefs, linkdefs) = locate_defs(node);
    let mut converter = Converter {
        content_root,
        file_path,
        fndefs,
        linkdefs,
        bibliography,
        img_manifest: images,
        used_bib: Default::default(),
        cite_count: 0,
        noted: Default::default(),
        cite_mode: CiteMode::Note,
        in_footnote: false,
        note_count: 0,
        popover_only_depth: 0,
        hoisted_notes: None,
        prev_note: None,
        note_cites: None,
        header_stack: Vec::new(),
        url_lookup,
        collected_akas: Vec::new(),
        collected_cites: Vec::new(),
        lightboxes: Default::default(),
    };
    let html = converter.convert_whole(node)?;
    Ok((html, converter.collected_akas, converter.collected_cites))
}

/// How parenthetical citations are rendered in the current context.
#[derive(Clone, Copy, PartialEq, Eq)]
enum CiteMode {
    /// Each group of citations becomes a numbered note.
    Note,
    /// Citations are written into the surrounding text: used inside notes,
    /// captions, and headings, where a numbered note cannot go.
    Inline,
}

/// Whether a rendered citation group already ends with a full stop: in the
/// margin, where “ibid.” can be used, and in a popover, where it cannot.
#[derive(Clone, Copy)]
struct EndsWithPeriod {
    margin: bool,
    popover: bool,
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
    noted: HashSet<String>, // works already cited in full on this page
    cite_mode: CiteMode,
    in_footnote: bool,
    note_count: usize,
    /// Notes in tables and multi-column blocks appear only as popovers, so
    /// they take no part in “ibid.” runs or in deciding where a work is
    /// first cited in full.
    popover_only_depth: usize,
    /// Notes collected from a side-by-side block, to be placed before it:
    /// a note floated from within one of its columns would land beside
    /// that column rather than in the margin.
    hoisted_notes: Option<Vec<Markup>>,
    /// The single work (and locator) cited by the previous note, for “ibid.”
    prev_note: Option<(String, Option<String>)>,
    /// Citations made so far in the note being rendered, if any.
    note_cites: Option<Vec<(String, Option<String>)>>,
    header_stack: Vec<usize>,
    url_lookup: &'a BTreeMap<String, Option<String>>,
    collected_akas: Vec<(LanguageIdentifier, Markup)>,
    collected_cites: Vec<(String, String)>,
    lightboxes: RefCell<HashSet<String>>, // only want to emit one lightbox per image
}

const CITE: &str = r"\[@(?:_|[^\s\p{P}])+(?:\s+[^\]]+)?\]";

static CITE_GROUP_AT_END: LazyLock<regex::Regex> =
    LazyLock::new(|| regex::Regex::new(&format!(r"{CITE}(?:\s*{CITE})*\s*$")).unwrap());

static CITE_GROUP_AT_START: LazyLock<regex::Regex> =
    LazyLock::new(|| regex::Regex::new(&format!(r"^\s*{CITE}(?:\s*{CITE})*")).unwrap());

static NORM_WHITESPACE: LazyLock<regex::Regex> =
    LazyLock::new(|| regex::Regex::new(r"[ \t\r\n]+").unwrap());

/// Escapes text for direct inclusion in HTML.
fn pre_escape(text: &str) -> String {
    text.replace('&', "&amp;").replace('<', "&lt;")
}

/// Splits a run of parenthetical citations into (id, locator) pairs.
fn parse_cites(group: &str) -> Vec<(&str, Option<&str>)> {
    static ONE: LazyLock<regex::Regex> = LazyLock::new(|| {
        regex::Regex::new(r"\[@(?<id>(_|[^\s\p{P}])+)(\s+(?<what>[^\]]+))?\]").unwrap()
    });

    ONE.captures_iter(group)
        .map(|m| {
            (
                m.name("id").unwrap().as_str(),
                m.name("what").map(|w| w.as_str()),
            )
        })
        .collect()
}

/// Generates a direct link to the cited page, where the source supports it.
fn direct_link(entry: &RenderedEntry, what: Option<&str>) -> Option<String> {
    static ARCHIVE_URL: LazyLock<regex::Regex> =
        LazyLock::new(|| regex::Regex::new(r"^https?://archive\.org/details/[^/]+").unwrap());

    static GOOGLE_URL: LazyLock<regex::Regex> = LazyLock::new(|| {
        regex::Regex::new(r"^https?://books\.google(\.com|\.co\.nz|\.com\.au)/books\?id=\w+")
            .unwrap()
    });

    let (Some(what), Some(url)) = (what, &entry.url) else {
        return None;
    };

    let what = bare_locator(what)?;
    if what.chars().all(|c| c.is_ascii_digit()) {
        if let Some(m) = ARCHIVE_URL.find(url) {
            return Some(format!("{}/page/{what}", m.as_str()));
        }

        if let Some(m) = GOOGLE_URL.find(url) {
            return Some(format!("{}&pg=PA{what}", m.as_str()));
        }
    }

    None
}

/// Appends a parenthetical citation to running text. A citation that follows
/// the end of a sentence moves inside it: “Text. [cite]” → “Text (cite).”
fn append_parenthetical(out: &mut String, group: &str, punct: &str) {
    out.truncate(out.trim_end().len());
    let moved = out
        .ends_with(['.', '!', '?'])
        .then(|| out.pop().unwrap());
    // the text may start mid-paragraph (after an inline element), so always space
    if !out.ends_with(['(', '[']) {
        out.push(' ');
    }
    out.push('(');
    out.push_str(group);
    out.push(')');
    if let Some(moved) = moved {
        out.push(moved);
        if !matches!(punct, "." | "!" | "?") {
            out.push_str(punct);
        }
    } else {
        out.push_str(punct);
    }
}

/// Normalises a locator for display: Chicago omits “p.”/“pp.” before page
/// numbers. An empty locator is dropped.
fn bare_locator(what: &str) -> Option<&str> {
    static PAGES: LazyLock<regex::Regex> =
        LazyLock::new(|| regex::Regex::new(r"^pp?\.\s*").unwrap());
    let what = what.trim();
    let what = PAGES.find(what).map_or(what, |m| &what[m.end()..]);
    (!what.is_empty()).then_some(what)
}

/// Ends a citation group in note form with a full stop, unless its margin
/// or popover form (which differ for “ibid.”) already ends with one.
fn note_sentence(group: Markup, ends: EndsWithPeriod) -> Markup {
    html! {
        (group)
        @if !ends.margin && !ends.popover { "." }
        @else if !ends.popover { span.ibid-expanded hidden { "." } }
        @else if !ends.margin { span.ibid { "." } }
    }
}

fn linked_what(entry: &RenderedEntry, what: &str) -> Markup {
    let what_html = maud::PreEscaped(what.to_string());
    match direct_link(entry, Some(what)) {
        Some(link) => html! { a href=(link) { (what_html) } },
        None => what_html,
    }
}

impl Converter<'_> {
    fn expand<'a>(&mut self, n: impl IntoIterator<Item = &'a Node>) -> Result<Markup> {
        let nodes: Vec<&Node> = n.into_iter().collect();

        // Citations written directly against a footnote reference are moved
        // into that footnote, rather than getting a note of their own.
        let mut texts: BTreeMap<usize, String> = BTreeMap::new();
        let mut extras: BTreeMap<usize, (String, String)> = BTreeMap::new();
        if self.cite_mode == CiteMode::Note {
            for (ix, node) in nodes.iter().enumerate() {
                if !matches!(node, Node::FootnoteReference(_)) {
                    continue;
                }

                let (mut leading, mut trailing) = (String::new(), String::new());
                if let Some(Node::Text(before)) = ix.checked_sub(1).map(|i| nodes[i]) {
                    let value = texts.get(&(ix - 1)).unwrap_or(&before.value).clone();
                    if let Some(m) = CITE_GROUP_AT_END.find(&value) {
                        leading.push_str(m.as_str());
                        texts.insert(ix - 1, value[..m.start()].to_string());
                    }
                }

                if let Some(Node::Text(after)) = nodes.get(ix + 1) {
                    if let Some(m) = CITE_GROUP_AT_START.find(&after.value) {
                        trailing.push_str(m.as_str());
                        texts.insert(ix + 1, after.value[m.end()..].to_string());
                    }
                }

                if !leading.is_empty() || !trailing.is_empty() {
                    extras.insert(ix, (leading, trailing));
                }
            }
        }

        Ok(html! {
            @for (ix, child) in nodes.iter().enumerate() {
                @if let (Node::Text(text), Some(value)) = (child, texts.get(&ix)) {
                    (self.convert(false, &Node::Text(Text { value: value.clone(), position: text.position.clone() }))?)
                } @else if let Node::FootnoteReference(fr) = child {
                    (self.render_footnote(&fr.identifier, extras.get(&ix))?)
                } @else {
                    (self.convert(false, child)?)
                }
            }
        })
    }

    fn with_cite_mode<T>(
        &mut self,
        mode: CiteMode,
        f: impl FnOnce(&mut Self) -> Result<T>,
    ) -> Result<T> {
        let prev = std::mem::replace(&mut self.cite_mode, mode);
        let result = f(self);
        self.cite_mode = prev;
        result
    }

    fn render_footnote(&mut self, id: &str, adjacent_cites: Option<&(String, String)>) -> Result<Markup> {
        if self.in_footnote {
            bail!("footnotes cannot be nested: {id}");
        }

        let Some(children) = self.fndefs.get(id) else {
            bail!("unknown footnote reference: {id}");
        };

        let [Node::Paragraph(p)] = children.as_slice() else {
            bail!("unexpected footnote content (should be one paragraph): {children:?}");
        };

        let children = p.children.clone();
        let parse = |raw: &str| {
            let escaped = pre_escape(&NORM_WHITESPACE.replace_all(raw, " "));
            parse_cites(&escaped).into_iter().map(|(id, what)| (id.to_owned(), what.map(str::to_owned))).collect::<Vec<_>>()
        };
        let (leading, trailing) = adjacent_cites.map_or((vec![], vec![]), |(l, t)| (parse(l), parse(t)));
        fn borrowed(cites: &[(String, Option<String>)]) -> Vec<(&str, Option<&str>)> {
            cites.iter().map(|(id, what)| (id.as_str(), what.as_deref())).collect()
        }

        self.in_footnote = true;
        self.begin_note();
        let body = self.with_cite_mode(CiteMode::Inline, |s| {
            // citations written before the marker open the note, in note form
            let mut body = if leading.is_empty() {
                String::new()
            } else {
                let (group, ends) = s.render_cite_group(&borrowed(&leading), true)?;
                format!("{} ", note_sentence(group, ends).into_string())
            };
            body.push_str(&s.expand(&children)?.into_string());
            // those written after it close the note, as a parenthetical
            if !trailing.is_empty() {
                let (group, _) = s.render_cite_group(&borrowed(&trailing), false)?;
                append_parenthetical(&mut body, &group.into_string(), "");
            }
            Ok(maud::PreEscaped(body))
        });
        self.end_note();
        self.in_footnote = false;

        Ok(self.note(body?))
    }

    /// Wraps a note’s body with its marker. The note is a popover, which
    /// wide screens instead show in the margin unless it is in a table.
    fn note(&mut self, body: Markup) -> Markup {
        self.note_count += 1;
        let n = self.note_count;
        let id = format!("note-{n}");
        let note = html! {
            span.footnote #(id) role="note" popover data-n=(n) { (body) }
        };
        let note = match &mut self.hoisted_notes {
            // notes in tables stay as popovers where they are
            Some(hoisted) if self.popover_only_depth == 0 => {
                hoisted.push(note);
                Markup::default()
            }
            _ => note,
        };
        html! {
            button.footnote-indicator type="button" popovertarget=(id) aria-label={"Note " (n)} { (n) }
            (note)
        }
    }

    /// Renders the content of a side-by-side block, returning it along with
    /// the notes that should be placed before the block.
    fn expand_hoisting_notes(&mut self, nodes: &[Node]) -> Result<(Markup, Markup)> {
        let outer = self.hoisted_notes.replace(Vec::new());
        let body = self.expand(nodes);
        let notes = std::mem::replace(&mut self.hoisted_notes, outer).unwrap_or_default();
        // a nested block’s notes go before the outermost block
        if let Some(outer) = &mut self.hoisted_notes {
            outer.extend(notes);
            return Ok((body?, Markup::default()));
        }
        Ok((body?, html! { @for note in notes { (note) } }))
    }

    /// Records a citation, returning its anchor and whether the work has
    /// already been cited in full in this page’s notes.
    fn insert_ref(&mut self, id: &str) -> String {
        self.cite_count += 1;
        let cite_anchor = format!("cite-{}", self.cite_count);
        self.used_bib
            .entry(id.to_owned())
            .or_default()
            .push(cite_anchor.clone());
        cite_anchor
    }

    fn begin_note(&mut self) {
        self.note_cites = Some(Vec::new());
    }

    /// Finishes a note, remembering its work if it cited exactly one.
    fn end_note(&mut self) {
        let cites = self.note_cites.take().unwrap_or_default();
        if self.popover_only_depth > 0 {
            return;
        }
        self.prev_note = match cites.as_slice() {
            [first, ..] if cites.iter().all(|(id, _)| *id == first.0) => cites.last().cloned(),
            _ => None,
        };
    }

    /// Renders a run of citations in note form, separated by semicolons.
    /// The first citation in a note becomes “ibid.” when the previous note
    /// cited only the same work; `capitalise` gives “Ibid.” instead. As a
    /// popover has no visible previous note, “ibid.” is accompanied by a
    /// short form for popovers to show instead.
    fn render_cite_group(
        &mut self,
        cites: &[(&str, Option<&str>)],
        capitalise: bool,
    ) -> Result<(Markup, EndsWithPeriod)> {
        let missing: Vec<&str> = cites
            .iter()
            .map(|(id, _)| *id)
            .filter(|id| !self.bibliography.contains_key(*id))
            .collect();
        if !missing.is_empty() {
            bail!("missing bibliography entry: {:?}", missing);
        }

        let popover_only = self.popover_only_depth > 0;
        let mut rendered = Vec::new();
        let mut ends = EndsWithPeriod {
            margin: false,
            popover: false,
        };
        for (id, what) in cites {
            let what = &what.and_then(bare_locator);
            let anchor = self.insert_ref(id);
            let entry = self.bibliography.get(*id).unwrap();
            let ibid = !popover_only
                && self.note_cites.as_ref().is_some_and(|c| c.is_empty())
                && self.prev_note.as_ref().is_some_and(|(prev, _)| prev == id);
            let first = if popover_only {
                !self.noted.contains(*id)
            } else {
                self.noted.insert(id.to_string())
            };
            let what_ends = what.is_some_and(|w| w.ends_with('.'));
            let cite = if ibid {
                let same_place = self.prev_note.as_ref().unwrap().1.as_deref() == *what;
                let ibid_what = what.filter(|_| !same_place);
                ends = EndsWithPeriod {
                    margin: ibid_what.is_none_or(|w| w.ends_with('.')),
                    popover: what_ends,
                };
                html! {
                    span.citation #(anchor) {
                        span.ibid {
                            a href={"#ref-" (id)} lang="la" { @if capitalise { "Ibid." } @else { "ibid." } }
                            @if let Some(what) = ibid_what {
                                ", " (linked_what(entry, what))
                            }
                        }
                        span.ibid-expanded hidden {
                            (entry.note_short)
                            @if let Some(what) = what {
                                ", " (linked_what(entry, what))
                            }
                        }
                    }
                }
            } else {
                ends = EndsWithPeriod {
                    margin: what_ends,
                    popover: what_ends,
                };
                html! {
                    span.citation #(anchor) {
                        @if first { (entry.note_full) } @else { (entry.note_short) }
                        @if let Some(what) = what {
                            ", " (linked_what(entry, what))
                        }
                    }
                }
            };
            if let Some(note_cites) = &mut self.note_cites {
                note_cites.push((id.to_string(), what.map(str::to_string)));
            }
            rendered.push(cite);
        }

        Ok((
            html! {
                @for (ix, cite) in rendered.into_iter().enumerate() {
                    @if ix > 0 { "; " }
                    (cite)
                }
            },
            ends,
        ))
    }

    fn convert_refs(&mut self, text: &str) -> Result<Markup> {
        static RE: LazyLock<regex::Regex> = LazyLock::new(|| {
            regex::Regex::new(&format!(
                r"(?<group>{CITE}(?:\s*{CITE})*)(?<punct>[.,;:!?]?)|@(?<id>(_|[^\s\p{{P}}])+)(\s+\[(?<what>[^\]]+)\])?"
            ))
            .unwrap()
        });

        let text = pre_escape(text);
        let mut out = String::new();
        let mut last = 0;
        for m in RE.captures_iter(&text) {
            let whole = m.get(0).unwrap();
            out.push_str(&text[last..whole.start()]);
            last = whole.end();

            if let Some(group) = m.name("group") {
                let punct = m.name("punct").unwrap().as_str();
                let cites = parse_cites(group.as_str());
                match self.cite_mode {
                    CiteMode::Note => {
                        self.begin_note();
                        let result = self.render_cite_group(&cites, true);
                        self.end_note();
                        let (group, ends) = result?;
                        // the note marker follows any punctuation (Chicago 14.26)
                        out.truncate(out.trim_end().len());
                        out.push_str(punct);
                        let body = note_sentence(group, ends);
                        out.push_str(&self.note(body).into_string());
                    }
                    CiteMode::Inline => {
                        let (group, _) = self.render_cite_group(&cites, false)?;
                        append_parenthetical(&mut out, &group.into_string(), punct);
                    }
                }
            } else {
                // inline citation, as part of the text
                let id = m.name("id").unwrap().as_str();
                let Some(entry) = self.bibliography.get(id) else {
                    bail!("missing bibliography entry: {:?}", [id]);
                };

                let cite_anchor = self.insert_ref(id);
                let what = m
                    .name("what")
                    .and_then(|w| bare_locator(w.as_str()))
                    .map(|w| linked_what(entry, w));
                let cite = html! {
                    span.citation.inline #(cite_anchor) {
                        @if let Some(inline_cite) = &entry.inline_cite {
                            (inline_cite(&format!("#ref-{id}"), what))
                        } @else {
                            (entry.note_short)
                            @if let Some(what) = what {
                                " (" (what) ")"
                            }
                        }
                    }
                };
                out.push_str(&cite.into_string());
            }
        }
        out.push_str(&text[last..]);

        Ok(maud::PreEscaped(out))
    }

    fn convert_whole(&mut self, root: &Node) -> Result<Markup> {
        let bibliography = self.bibliography;
        let result = html! {
            (self.convert(false, root)?)
            (self.do_sections(0))
            @if !self.used_bib.is_empty() {
                h2 #references { "References" }
                ul.reference-list {
                    @for id in self.used_bib.keys().sorted_by_cached_key(|id| {
                        let entry = bibliography.get(*id).unwrap();
                        (entry.name_key.to_lowercase(), entry.iso_date.clone())
                    }) {
                        li {
                            (bibliography.get(id).unwrap().reference)
                        }
                    }
                }
            }
        };

        for (id, cites) in &self.used_bib {
            self.collected_cites
                .push((id.to_string(), cites[0].clone()));
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
                                dest.as_deref().map(Cow::Borrowed)
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
                let children =
                    self.with_cite_mode(CiteMode::Inline, |s| s.expand(&heading.children))?;
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
                self.popover_only_depth += 1;
                let mut children = table.children.iter();
                let head = children.next().map(|c| self.convert(true, c)).transpose();
                let body: Result<Vec<Markup>> = children.map(|c| self.convert(false, c)).collect();
                self.popover_only_depth -= 1;
                html! {
                    table {
                        thead { @if let Some(head) = head? { (head) } }
                        tbody { @for row in body? { (row) } }
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
                self.render_footnote(&footnote_reference.identifier, None)?
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
            metadata.author_given = Some("George".into());
            metadata.author_family = Some("Pollard".into());
            metadata.author_resource = Some("#me".into());
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
        // Borderless images are mounted on a white plate; a row of them shares one.
        let plated = metadata.noborder;
        let copyright_notice = metadata.copyright_notice(true);
        // Hidden notices carry metadata only, so get no visible credit line.
        let show_credit = !metadata.hidden;

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
            metadata.caption_beside.then_some("caption-beside"),
            metadata.lineart.then_some("line-art"),
        ]
        .into_iter()
        .flatten()
        .join(" ");

        let intended_width = match (&metadata.position, &metadata.size) {
            (None, Some(ImageSizes::ExtraWide)) => 1200,
            (None, Some(ImageSizes::Wide)) => 800,
            (None, None) => 600,
            (None, Some(ImageSizes::Small)) => 300,
            _ => 300,
        };

        let caption = self.with_cite_mode(CiteMode::Inline, |s| s.expand(caption))?;

        let lightbox = |id: &str,
                        meta: &ImageManifestEntry,
                        alt: &str,
                        title: Option<&str>|
         -> Markup {
            if !self.lightboxes.borrow_mut().insert(id.to_string()) {
                return Markup::default();
            }

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
                        p { }
                        form method="dialog" {
                            a href=(meta.url) role="button" target="_blank" { "Full Size (" (meta.width) " × " (meta.height) " pixels)" }
                            button.lightbox-close { "Close" }
                        }
                    }
                }
            }
        };

        static LB_NAMESPACE: Uuid = uuid!("cf4e05ba-49cd-4a99-98e8-cb1acfcf9f93");

        if images.len() == 1 {
            let img = &images[0];
            let meta = self.resolve_image(&img.url)?;
            let (_imgsize, imgurl) = meta.url_for_width(intended_width);
            let srcset = meta.srcset();
            let sizes = srcset
                .is_some()
                .then(|| image_sizes(&metadata, None, &[aspect_ratio(meta)], 0));
            let lb_id = format!(
                "lb-{}",
                Uuid::new_v5(&LB_NAMESPACE, meta.url.as_bytes()).simple()
            );
            Ok(html! {
                figure class=(figure_classes) property="image" typeof="ImageObject cc:Work" {
                    (lightbox(&lb_id, meta, &img.alt, img.title.as_deref()))
                    div.plate {
                        a.mount.plated[plated] property="" href={"#" (lb_id)} {
                            img class={"figure-img" (noborder)}
                                property="contentUrl"
                                src=(imgurl) alt=(&img.alt)
                                width=(meta.width) height=(meta.height)
                                srcset=[srcset] sizes=[sizes];
                        }
                        @if show_credit {
                            p.credit { (copyright_notice) }
                        } @else {
                            (copyright_notice)
                        }
                    }
                    figcaption property="caption" {
                        (caption)
                    }
                }
            })
        } else {
            let metas = images
                .iter()
                .map(|img| Ok((img, self.resolve_image(&img.url)?)))
                .collect::<Result<Vec<_>>>()?;

            Ok(html! {
                figure class=(figure_classes) {
                    div.plate {
                        @for row in metas.chunks(metadata.per_row.unwrap_or(usize::MAX)) {
                            @let row_ars = row.iter().map(|(_, meta)| aspect_ratio(meta)).collect_vec();
                            div.multi.plated[plated] class=(multi_classes) {
                                @for (ix, (img, meta)) in row.iter().enumerate() {
                                    @let srcset = meta.srcset();
                                    @let sizes = srcset.is_some().then(|| image_sizes(&metadata, Some(&multi_classes), &row_ars, ix));
                                    @let lb_id = format!("lb-{}", Uuid::new_v5(&LB_NAMESPACE, meta.url.as_bytes()).simple());
                                    div property="image" typeof="ImageObject cc:Work" {
                                        (lightbox(&lb_id, meta, &img.alt, img.title.as_deref()))
                                        a.mount property="" href={"#" (lb_id)} {
                                            img class={"figure-img" (noborder)}
                                                property="contentUrl"
                                                src=(meta.url) alt=(&img.alt) title=[&img.title]
                                                srcset=[srcset] sizes=[sizes]
                                                width=(meta.width) height=(meta.height);
                                        }
                                        // TODO: try to reduce repetition,
                                        // but Google doesn't appear to support rdfa:copy
                                        span hidden="hidden" {
                                            (copyright_notice)
                                        }
                                    }
                                }
                            }
                        }
                        // Each image above carries its own (hidden) notice; this
                        // visible copy is presentation only, so carries no RDFa.
                        @if show_credit {
                            p.credit { (metadata.copyright_notice(false)) }
                        }
                    }
                    figcaption {
                        (caption)
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
                        .unwrap_or(langid!("en"));

                    let markup = self.expand(&text.children)?;
                    self.collected_akas.push((lang_attr, markup));
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
                    self.collected_akas
                        .push((langid, rendered_children.clone()));
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
                        @for c in Itertools::intersperse(children.into_iter(), html! { "\u{2009}" }) {
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
                let popover_only = el_name == "table"
                    || attributes
                        .iter()
                        .any(|(k, v)| *k == "class" && v.split_whitespace().any(|c| c.starts_with("columnar")));
                self.popover_only_depth += usize::from(popover_only);
                let children = self.expand(&flow.children);
                self.popover_only_depth -= usize::from(popover_only);
                html! {
                    (maud::PreEscaped(format!("<{}", el_name)))
                    @for attr in attributes {
                        " " (attr.0) (maud::PreEscaped("=\"")) (attr.1) (maud::PreEscaped("\""))
                    }
                    (maud::PreEscaped(">"))
                    (children?)
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
                    let body = self.with_cite_mode(CiteMode::Inline, |s| {
                        s.expand(&blockquote.children[1..])
                    })?;
                    return Ok(html! {
                        aside role="note" class="footnote" {
                            (body)
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

                        serde_saphyr::from_str(&yaml.value).wrap_err("parsing yaml")?
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
                } else if let Some(class) = match trimmed {
                    "[!multi]" => Some(None),
                    "[!multi-equal]" => Some(Some("equal")),
                    "[!multi-wide]" => Some(Some("wide")),
                    "[!multi-extra-wide]" => Some(Some("extra-wide")),
                    _ => None,
                } {
                    let (body, notes) = self.expand_hoisting_notes(&blockquote.children[1..])?;
                    return Ok(html! {
                        (notes)
                        div.multi class=[class] {
                            (body)
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

fn aspect_ratio(meta: &ImageManifestEntry) -> f64 {
    meta.width as f64 / meta.height.max(1) as f64
}

// Layout constants mirroring `site_root/css/main.css`. If the figure layout
// there changes, these must be updated to match.
const NARROW_MAX: &str = "701.98px";
const MEDIUM_MAX: &str = "1160.98px";
const NARROW_BREAKPOINT: f64 = 702.0;
/// `main` grid gutters below the narrow breakpoint (.5rlh either side).
const NARROW_GUTTERS: f64 = 27.0;
const MULTI_GAP: f64 = 13.5;
const CRAM_GAP: f64 = 1.0;
const MAX_HEIGHT: f64 = 450.0;
const SMALL_MAX_HEIGHT: f64 = 200.0;

/// Computes the `sizes` attribute for image `ix` within a row of images
/// whose aspect ratios are `row_ars`. `multi_classes` is `None` for a
/// single-image figure, otherwise the classes applied to the `div.multi` row.
///
/// Widths assume footnotes are present (which widens wide figures at the
/// largest breakpoint), so they are upper bounds rather than exact.
fn image_sizes(
    metadata: &ImageMetadata,
    multi_classes: Option<&str>,
    row_ars: &[f64],
    ix: usize,
) -> String {
    let wide = matches!(metadata.size, Some(ImageSizes::Wide));
    let extra_wide = matches!(metadata.size, Some(ImageSizes::ExtraWide));
    let small = matches!(metadata.size, Some(ImageSizes::Small));
    let side = matches!(
        metadata.position,
        Some(ImagePositions::Left | ImagePositions::Right)
    );
    let aside = matches!(metadata.position, Some(ImagePositions::Aside));
    let has_multi_class =
        |c: &str| multi_classes.is_some_and(|m| m.split_whitespace().any(|x| x == c));
    let multi_wide = has_multi_class("wide");
    let multi_extra_wide = has_multi_class("extra-wide");

    let ar = row_ars[ix];
    let n = row_ars.len() as f64;
    let (gap, fraction) = match multi_classes {
        None => (0.0, 1.0),
        Some(_) => (
            if has_multi_class("cram") {
                CRAM_GAP
            } else {
                MULTI_GAP
            },
            if has_multi_class("equal-height") {
                ar / row_ars.iter().sum::<f64>()
            } else {
                1.0 / n
            },
        ),
    };
    let total_gap = (n - 1.0) * gap;
    let height_cap = ar * if small { SMALL_MAX_HEIGHT } else { MAX_HEIGHT };
    // single wide images are only constrained by width above the narrow breakpoint
    let uncapped = multi_classes.is_none() && (wide || extra_wide);
    let width_in = |content: f64| {
        let w = (content - total_gap) * fraction;
        if uncapped {
            w
        } else {
            w.min(height_cap)
        }
    };

    let medium_content: f64 = if wide || extra_wide {
        648.0
    } else if side {
        621.0
    } else {
        594.0
    };
    let medium_content = if multi_wide || multi_extra_wide {
        medium_content.max(648.0)
    } else {
        medium_content
    };

    let large_content: f64 = if wide {
        837.0
    } else if extra_wide {
        1107.0
    } else if aside {
        405.0
    } else if side {
        675.0
    } else {
        594.0
    };
    let large_content = large_content.max(if multi_extra_wide {
        1107.0
    } else if multi_wide {
        756.0
    } else {
        0.0
    });

    let mut result = String::new();

    // below the narrow breakpoint, the content column is the viewport minus gutters
    let fixed = NARROW_GUTTERS + total_gap;
    let fraction_rounded = (fraction * 10_000.0).ceil() / 10_000.0;
    let fluid = if fraction_rounded >= 1.0 {
        format!("calc(100vw - {fixed}px)")
    } else {
        format!("calc((100vw - {fixed}px) * {fraction_rounded})")
    };
    // viewport width at which the height cap starts to apply
    let cap_viewport = (height_cap / fraction + fixed).ceil();
    if cap_viewport < NARROW_BREAKPOINT {
        _ = write!(
            result,
            "(max-width: {cap_viewport}px) {fluid}, (max-width: {NARROW_MAX}) {}px, ",
            height_cap.ceil()
        );
    } else {
        _ = write!(result, "(max-width: {NARROW_MAX}) {fluid}, ");
    }

    let medium = width_in(medium_content).ceil();
    let large = width_in(large_content).ceil();
    if medium != large {
        _ = write!(result, "(max-width: {MEDIUM_MAX}) {medium}px, ");
    }
    _ = write!(result, "{large}px");

    result
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

    // black-and-white line art: dark ink on a light ground
    #[serde(default)]
    lineart: bool,

    #[serde(default)]
    cram: bool,

    #[serde(default)]
    equalheight: bool,

    #[serde(default)]
    hidden: bool, // this means to hide the copyright display

    // set the caption beside the image when there is room
    #[serde(default)]
    caption_beside: bool,

    justify: Option<String>,

    per_row: Option<usize>,

    author_resource: Option<Cow<'static, str>>,
    author: Option<String>,
    author_given: Option<Cow<'static, str>>,
    author_family: Option<Cow<'static, str>>,
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
    fn copyright_notice(&self, rdfa: bool) -> Markup {
        let hidden = if self.hidden { Some("hidden") } else { None };
        let license = self.license_info(rdfa);
        html! {
            span property=[rdfa.then_some("copyrightNotice")] hidden=[hidden] {
                span.image-attribution {
                    @if !matches!(self.license, Some(License::Cc0)) {
                        "© "
                    }
                    @if let Some(copyright_year) = self.copyright_year {
                        span property=[rdfa.then_some("copyrightYear")] { (copyright_year) }
                        " "
                    }
                    @if let Some(copyright_holder) = self.copyright_holder(rdfa) {
                        @if let Some(original_url) = &self.original_url {
                            a property=[rdfa.then_some("cc:attributionURL")] href=(original_url) { (copyright_holder) }
                        } @else {
                            (copyright_holder)
                        }
                    }
                    @if let Some(identifier) = &self.identifier {
                        " " span.image-identifier { (identifier) }
                    }
                }
                @if !license.0.is_empty() {
                    span.image-license { (license) }
                }
            }
        }
    }

    fn copyright_holder(&self, rdfa: bool) -> Option<Markup> {
        if self.org_name.is_some() {
            if self.author.is_some() || self.author_given.is_some() {
                Some(self.person("creator", rdfa))
            } else {
                Some(self.organization("copyrightHolder", rdfa))
            }
        } else if self.author.is_some() || self.author_given.is_some() {
            Some(self.person("copyrightHolder creator", rdfa))
        } else {
            None
        }
    }

    fn organization(&self, prop: &str, rdfa: bool) -> Markup {
        if let Some(org_name) = &self.org_name {
            let content = if let Some(org_abbr) = &self.org_abbr {
                html! {
                    @if rdfa { meta property="name" content=(org_name); }
                    abbr title=(org_name) { (org_abbr) }
                }
            } else {
                html! { span property=[rdfa.then_some("name")] { (org_name) } }
            };
            html! {
                span property=[rdfa.then_some(prop)] typeof=[rdfa.then_some("Organization")] lang=[&self.org_lang] {
                    @if let Some(url) = &self.org_url {
                        a property=[rdfa.then_some("")] href=(url) { (content) }
                    } @else {
                        (content)
                    }
                }
            }
        } else {
            todo!("huh")
        }
    }

    fn person(&self, prop: &str, rdfa: bool) -> Markup {
        html! {
            span property=[rdfa.then_some(prop)] typeof=[rdfa.then_some("Person")] resource=[self.author_resource.as_ref().filter(|_| rdfa)] {
                @if self.org_name.is_some() {
                    (self.organization("worksFor", rdfa)) "/"
                }
                span property=[rdfa.then_some("name")] lang=[&self.author_lang] {
                    @if let Some(name) = &self.author {
                        (name)
                    }

                    @if crate::bib_render::family_last(self.author_lang.as_deref()) {
                        @if let Some(given) = &self.author_given {
                            span property=[rdfa.then_some("givenName")] { (given) }
                        }
                        " "
                        @if let Some(family) = &self.author_family {
                            span property=[rdfa.then_some("familyName")] { (family) }
                        }
                    } @else {
                        @if let Some(family) = &self.author_family {
                            span property=[rdfa.then_some("familyName")] { (family) }
                        }
                        @if let Some(given) = &self.author_given {
                            span property=[rdfa.then_some("givenName")] { (given) }
                        }
                    }
                }
            }
        }
    }

    fn license_info(&self, rdfa: bool) -> Markup {
        let cc = |name: &str, title: &str, content: Markup| -> Markup {
            let version = self.license_version.as_deref().unwrap_or("4.0");
            let url = format!("https://creativecommons.org/licenses/{name}/{version}/");
            html! {
                a property=[rdfa.then_some("license cc:license")]
                  href=(url)
                  aria-label={"Creative Commons " (title) " " (version)}
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
                        a property=[rdfa.then_some("license")] href=[&self.terms_url] { "terms" }
                    }
                }
            }
            License::Cc0 => {
                html! {
                    a property=[rdfa.then_some("license")] href="https://creativecommons.org/publicdomain/mark/1.0/" title="Public Domain" aria-label="Public Domain" {
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

#[cfg(test)]
mod test {
    use super::*;

    const BIBLIOGRAPHY: &str = r#"
ShiningPrince:
  type: book
  author:
    - family: Morris
      given: Ivan
  title: The World of the Shining Prince
  subtitle: Court Life in Ancient Japan
  issued:
    year: 1979
Brocade:
  type: book
  author:
    - family: McCullough
      given: Helen Craig
  title: "Brocade by Night: ‘Kokin Wakashū’ and the Court Style"
  issued:
    year: 1985
"#;

    fn render(markdown: &str) -> Result<String> {
        let bib: crate::bibliography::Bibliography = serde_saphyr::from_str(BIBLIOGRAPHY)?;
        let bib = crate::bib_render::to_rendered(&bib);
        let options = markdown::ParseOptions {
            constructs: markdown::Constructs {
                gfm_footnote_definition: true,
                gfm_label_start_footnote: true,
                gfm_table: true,
                html_flow: false,
                html_text: false,
                mdx_jsx_flow: true,
                mdx_jsx_text: true,
                ..markdown::Constructs::default()
            },
            ..markdown::ParseOptions::default()
        };
        let node = markdown::to_mdast(markdown, &options).map_err(|e| eyre!("{e}"))?;
        let html = to_html(
            Path::new("."),
            Path::new("test.md"),
            &node,
            &bib,
            &ImageManifest::default(),
            &BTreeMap::new(),
        )?;
        Ok(html.0.into_string())
    }

    const SHINING_PRINCE_FULL: &str = r##"<bdi>Ivan Morris</bdi>, <a href="#ref-ShiningPrince"><cite>The World of the Shining Prince</cite></a> (1979)"##;
    const SHINING_PRINCE_SHORT: &str = r##"<bdi>Morris</bdi>, <a href="#ref-ShiningPrince"><cite>World of the Shining Prince</cite></a>"##;
    const BROCADE_FULL: &str = r##"<bdi>Helen Craig McCullough</bdi>, <a href="#ref-Brocade"><cite>Brocade by Night: ‘Kokin Wakashū’ and the Court Style</cite></a> (1985)"##;
    const BROCADE_SHORT: &str = r##"<bdi>McCullough</bdi>, <a href="#ref-Brocade"><cite>Brocade by Night</cite></a>"##;

    /// The marker and opening of note `n`.
    fn note(n: usize) -> String {
        format!(
            r#"<button class="footnote-indicator" type="button" popovertarget="note-{n}" aria-label="Note {n}">{n}</button><span class="footnote" id="note-{n}" role="note" popover data-n="{n}">"#
        )
    }

    #[test]
    fn citations_in_text_become_notes_full_then_short() {
        let html = render(
            "Cards were played[@ShiningPrince 165]. Poems[@Brocade 10]. Later[@ShiningPrince 170] [@Brocade 242], too.",
        )
        .unwrap();

        assert_eq!(html.matches(r#"class="footnote-indicator""#).count(), 3);
        assert!(html.contains(&format!(
            r#"played.{}<span class="citation" id="cite-1">{SHINING_PRINCE_FULL}, 165</span>.</span>"#,
            note(1)
        )));
        assert!(html.contains(&format!(
            r#"Later,{}<span class="citation" id="cite-3">{SHINING_PRINCE_SHORT}, 170</span>; <span class="citation" id="cite-4">{BROCADE_SHORT}, 242</span>.</span> too."#,
            note(3)
        )));
    }

    #[test]
    fn citations_in_footnotes_are_inline_and_adjacent_citations_merge() {
        let html = render(concat!(
            "Awase contests.[^a][@Brocade 242]\n\n",
            "[^a]: Also cock-fighting.[@ShiningPrince 165] See[@ShiningPrince 170] too.\n",
        ))
        .unwrap();

        assert_eq!(html.matches(r#"class="footnote-indicator""#).count(), 1);
        assert!(html.contains(&format!(
            r#"Also cock-fighting (<span class="citation" id="cite-1">{SHINING_PRINCE_FULL}, 165</span>). See (<span class="citation" id="cite-2">{SHINING_PRINCE_SHORT}, 170</span>) too (<span class="citation" id="cite-3">{BROCADE_FULL}, 242</span>).</span>"#
        )));
    }

    #[test]
    fn citations_before_a_footnote_marker_open_the_note() {
        let html = render(concat!(
            "Awase contests.[@Brocade 242][^a]\n\n",
            "[^a]: Also cock-fighting.[@ShiningPrince 165]\n",
        ))
        .unwrap();

        assert_eq!(html.matches(r#"class="footnote-indicator""#).count(), 1);
        assert!(html.contains(&format!(
            r#"data-n="1"><span class="citation" id="cite-1">{BROCADE_FULL}, 242</span>. Also cock-fighting (<span class="citation" id="cite-2">{SHINING_PRINCE_FULL}, 165</span>).</span>"#
        )), "{html}");
    }

    #[test]
    fn repeated_work_in_consecutive_notes_becomes_ibid() {
        let html = render(concat!(
            "A[@ShiningPrince 165]. B[@ShiningPrince 165]. C[@ShiningPrince 170]. ",
            "D[@ShiningPrince 170] [@Brocade 242]. E[@Brocade 242]. F.[^a]\n\n",
            "[^a]: Compare[@Brocade 250] here. *Brocade*.[@Brocade 251]\n",
        ))
        .unwrap();

        let ibid = |n: usize, id: &str, text: &str| {
            format!(r##"<span class="citation" id="cite-{n}"><span class="ibid"><a href="#ref-{id}" lang="la">{text}</a>"##)
        };
        let expanded = |what: &str| format!(r#"<span class="ibid-expanded" hidden>{what}</span>"#);
        // same place: no locator, but popovers give the short form and full stop
        assert!(html.contains(&format!(
            "{}</span>{}</span>{}</span>",
            ibid(2, "ShiningPrince", "Ibid."),
            expanded(&format!("{SHINING_PRINCE_SHORT}, 165")),
            expanded(".")
        )));
        // different place: locator kept
        assert!(html.contains(&format!(
            "{}, 170</span>{}</span>.</span>",
            ibid(3, "ShiningPrince", "Ibid."),
            expanded(&format!("{SHINING_PRINCE_SHORT}, 170"))
        )));
        // the first citation of a group can be ibid.
        assert!(html.contains(&format!(
            "{}</span>{}</span>; ",
            ibid(4, "ShiningPrince", "Ibid."),
            expanded(&format!("{SHINING_PRINCE_SHORT}, 170"))
        )));
        // but not after a note citing two works
        assert!(html.contains(&format!(
            r#"<span class="citation" id="cite-6">{BROCADE_SHORT}, 242</span>"#
        )));
        // lower-case mid-sentence inside a footnote
        assert!(html.contains(&format!(
            "Compare ({}, 250</span>{}</span>) here.",
            ibid(7, "Brocade", "ibid."),
            expanded(&format!("{BROCADE_SHORT}, 250"))
        )));
        // moved inside the sentence, spaced after an inline element
        assert!(html.contains(&format!(
            r#"<em>Brocade</em> (<span class="citation" id="cite-8">{BROCADE_SHORT}, 251</span>).</span>"#
        )));
    }

    #[test]
    fn page_prefixes_are_stripped_from_locators() {
        assert_eq!(bare_locator("p. 165"), Some("165"));
        assert_eq!(bare_locator("pp.  3–4"), Some("3–4"));
        assert_eq!(bare_locator("p. "), None);
        assert_eq!(bare_locator("pl. VII"), Some("pl. VII"));
        assert_eq!(bare_locator("plate 3"), Some("plate 3"));

        let html = render("A[@ShiningPrince p. 165]. B[@ShiningPrince p. ].").unwrap();
        assert!(html.contains(&format!("{SHINING_PRINCE_FULL}, 165</span>.</span>")));
        assert!(html.contains(&format!(
            r#"lang="la">Ibid.</a></span><span class="ibid-expanded" hidden>{SHINING_PRINCE_SHORT}</span></span>"#
        )), "{html}");
    }

    #[test]
    fn notes_in_tables_skip_ibid_and_first_citations() {
        let html = render(concat!(
            "A[@ShiningPrince 165].\n\n",
            "<table><tr><td>\n\n",
            "X[@ShiningPrince 165]. Y[@Brocade 1].\n\n",
            "</td></tr></table>\n\n",
            "B[@ShiningPrince 165]. C[@Brocade 2].\n\n",
            "| Roll | Name |\n|---|---|\n| 1 | Z[@Brocade 3] |\n",
        ))
        .unwrap();

        // not ibid. after the note before the table
        assert!(html.contains(&format!(
            r#"<span class="citation" id="cite-2">{SHINING_PRINCE_SHORT}, 165</span>"#
        )));
        // in full, as the first citation…
        assert!(html.contains(&format!(r#"<span class="citation" id="cite-3">{BROCADE_FULL}, 1</span>"#)));
        // …but the table note neither breaks an ibid. run…
        assert!(html.contains(r#"<span class="citation" id="cite-4"><span class="ibid">"#), "{html}");
        // …nor counts as the first citation outside the table
        assert!(html.contains(&format!(r#"<span class="citation" id="cite-5">{BROCADE_FULL}, 2</span>"#)));
        // Markdown tables don’t use ibid. either
        assert!(html.contains(&format!(r#"<span class="citation" id="cite-6">{BROCADE_SHORT}, 3</span>"#)), "{html}");
    }

    #[test]
    fn notes_in_columnar_blocks_skip_ibid() {
        let html = render(concat!(
            "A[@ShiningPrince 165].\n\n",
            "<div class=\"columnar\">\n\n",
            "- X[@ShiningPrince 165]\n",
            "</div>\n",
        ))
        .unwrap();

        assert!(html.contains(&format!(
            r#"<span class="citation" id="cite-2">{SHINING_PRINCE_SHORT}, 165</span>"#
        )), "{html}");
    }

    #[test]
    fn notes_in_side_by_side_blocks_are_placed_before_the_block() {
        let html = render(concat!(
            "> [!multi]\n",
            ">\n",
            "> Left.[^a]\n",
            ">\n",
            "> > [!multi]\n",
            "> >\n",
            "> > Inner.[^b]\n",
            "\n",
            "[^a]: First.\n\n",
            "[^b]: Second.\n",
        ))
        .unwrap();

        let first = html.find(r#"<span class="footnote" id="note-1""#).expect(&html);
        let second = html.find(r#"<span class="footnote" id="note-2""#).expect(&html);
        let block = html.find(r#"<div class="multi">"#).expect(&html);
        assert!(first < second && second < block, "{html}");
        assert!(html.contains(r#"Left.<button class="footnote-indicator" type="button" popovertarget="note-1""#), "{html}");
    }

    #[test]
    fn nested_footnotes_are_rejected() {
        let err = render("Text.[^a]\n\n[^a]: Note.[^b]\n\n[^b]: Inner.\n").unwrap_err();
        assert!(err.to_string().contains("nested"), "{err}");
    }

    #[test]
    fn references_are_unnumbered_and_sorted_by_name() {
        let html = render("First[@ShiningPrince]. Second[@Brocade].").unwrap();
        let list = &html[html.find(r#"<ul class="reference-list">"#).unwrap()..];
        assert!(list.find("ref-Brocade").unwrap() < list.find("ref-ShiningPrince").unwrap());
    }

    #[test]
    fn image_notice_separates_attribution_and_license() {
        let metadata = ImageMetadata {
            author: Some("Image creator".into()),
            identifier: Some("Catalogue identifier".into()),
            license: Some(License::CcByNcSa),
            ..ImageMetadata::default()
        };
        let notice = metadata.copyright_notice(true).into_string();
        let attribution_end = notice.find("Catalogue identifier</span></span>").unwrap();
        let license_start = notice.find("<span class=\"image-license\">").unwrap();
        assert!(attribution_end < license_start);
        assert!(notice
            .contains("aria-label=\"Creative Commons Attribution-NonCommercial-ShareAlike 4.0\""));
        assert!(notice.contains("property=\"license cc:license\""));
        assert!(!notice.contains(", "));
    }

    #[test]
    fn image_notice_without_rdfa_has_no_rdfa_attributes() {
        let metadata = ImageMetadata {
            org_name: Some("Archive".into()),
            org_abbr: Some("A".into()),
            org_url: Some("https://example.org/".into()),
            author_given: Some("Given".into()),
            author_family: Some("Family".into()),
            author_resource: Some("#author".into()),
            original_url: Some("https://example.org/original".into()),
            copyright_year: Some(1900),
            license: Some(License::CcBy),
            ..ImageMetadata::default()
        };
        let notice = metadata.copyright_notice(false).into_string();
        for attr in ["property=", "typeof=", "resource=", "<meta"] {
            assert!(!notice.contains(attr), "{attr} in {notice}");
        }
        assert!(notice.contains("Family"));
        assert!(notice.contains("aria-label=\"Creative Commons Attribution 4.0\""));
    }

    #[test]
    fn image_notice_keeps_permission_and_hidden_metadata() {
        let metadata = ImageMetadata {
            license: Some(License::WithPermission),
            hidden: true,
            ..ImageMetadata::default()
        };
        let notice = metadata.copyright_notice(true).into_string();
        assert!(notice.contains("property=\"copyrightNotice\" hidden"));
        assert!(notice.contains("<span class=\"image-license\">used with permission</span>"));
    }

    #[test]
    fn sizes_single_portrait() {
        // 450px height cap → 300px wide; capped once viewport ≥ 327px
        let m = ImageMetadata::default();
        assert_eq!(
            image_sizes(&m, None, &[2.0 / 3.0], 0),
            "(max-width: 327px) calc(100vw - 27px), (max-width: 701.98px) 300px, 300px"
        );
    }

    #[test]
    fn sizes_single_landscape() {
        let m = ImageMetadata::default();
        assert_eq!(
            image_sizes(&m, None, &[2.0], 0),
            "(max-width: 701.98px) calc(100vw - 27px), 594px"
        );
    }

    #[test]
    fn sizes_single_wide_is_uncapped() {
        let m = ImageMetadata {
            size: Some(ImageSizes::Wide),
            ..Default::default()
        };
        assert_eq!(
            image_sizes(&m, None, &[1.0], 0),
            "(max-width: 477px) calc(100vw - 27px), (max-width: 701.98px) 450px, (max-width: 1160.98px) 648px, 837px"
        );
    }

    #[test]
    fn sizes_multi_row() {
        let m = ImageMetadata::default();
        assert_eq!(
            image_sizes(&m, Some(""), &[2.0, 2.0, 2.0], 1),
            "(max-width: 701.98px) calc((100vw - 54px) * 0.3334), 189px"
        );
    }

    #[test]
    fn sizes_multi_equal_height() {
        let m = ImageMetadata::default();
        assert_eq!(
            image_sizes(&m, Some("cram equal-height"), &[1.0, 3.0], 1),
            "(max-width: 701.98px) calc((100vw - 28px) * 0.75), 445px"
        );
    }

    #[test]
    fn sizes_aside_small() {
        let m = ImageMetadata {
            size: Some(ImageSizes::Small),
            position: Some(ImagePositions::Aside),
            ..Default::default()
        };
        assert_eq!(
            image_sizes(&m, Some(""), &[1.0, 1.0], 0),
            "(max-width: 441px) calc((100vw - 40.5px) * 0.5), (max-width: 701.98px) 200px, (max-width: 1160.98px) 200px, 196px"
        );
    }
}
