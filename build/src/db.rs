use std::{
    collections::{BTreeMap, HashMap, HashSet},
    path::{Path, PathBuf},
    str::FromStr,
    sync::{Arc, LazyLock},
};

use icu::locale::LanguageIdentifier;
use itertools::Itertools;
use markdown::{Constructs, ParseOptions};
use maud::Markup;
use salsa::Accumulator;
use url::Url;

use saphyr::LoadableYamlNode;

use crate::{
    bib_render::{self, RenderedBibliography},
    mdast_to_html,
    templates::{self, ArticleMetadata, BaseMetadata, GameMetadata, OutputFile, Templater},
};

#[derive(Clone)]
pub struct RenderedBib(pub Arc<RenderedBibliography>);

impl std::fmt::Debug for RenderedBib {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("RenderedBib").finish_non_exhaustive()
    }
}

impl PartialEq for RenderedBib {
    fn eq(&self, other: &Self) -> bool {
        Arc::ptr_eq(&self.0, &other.0)
    }
}

impl Eq for RenderedBib {}

impl std::ops::Deref for RenderedBib {
    type Target = RenderedBibliography;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(serde::Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct ImageManifestEntry {
    pub hash: String,
    pub height: usize,
    pub width: usize,
    pub url: String,
    // size (width) → URL
    pub sizes: Option<BTreeMap<usize, String>>,
}

impl ImageManifestEntry {
    pub fn srcset(&self) -> Option<String> {
        let Some(sizes) = &self.sizes else {
            return None;
        };

        if sizes.is_empty() {
            return None;
        }

        Some(sizes.iter().map(|(s, u)| format!("{u} {s}w")).join(", "))
    }

    pub fn url_for_width(&self, size: usize) -> (usize, &str) {
        self.sizes
            .as_ref()
            .and_then(|sizes| sizes.range(..=size).last().map(|(s, u)| (*s, u.as_str())))
            .unwrap_or((self.width, &self.url))
    }
}

pub type ImageManifest = BTreeMap<String, ImageManifestEntry>;

#[salsa::db]
pub trait Db: salsa::Database {}

#[salsa::db]
#[derive(Default, Clone)]
pub struct Database {
    pub storage: salsa::Storage<Self>,
}

impl salsa::Database for Database {}

#[salsa::db]
impl Db for Database {}

#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug)]
pub enum FileKind {
    Article,
    Game,
    About,
    SeeAlso,
}

#[salsa::input]
pub struct SourceFile {
    pub path: PathBuf,
    pub kind: FileKind,
    pub text: String,
}

#[salsa::input]
pub struct SourceSet {
    pub files: Vec<SourceFile>,
}

#[salsa::input]
pub struct BibliographySource {
    pub text: String,
}

#[salsa::input]
pub struct ImageManifestSource {
    pub json: String,
}

#[salsa::input]
pub struct BuildConfig {
    pub base_path: PathBuf,
    pub output_path: PathBuf,
    pub output_drafts: bool,
    pub base_url: String,
}

#[salsa::accumulator]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Aka(pub LanguageIdentifier, pub String, pub String);

#[salsa::accumulator]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Cite(pub String, pub String, pub String);

#[derive(Clone, PartialEq, Eq, Hash, Debug, salsa::Update)]
pub struct UrlMeta {
    pub url_path: String,
    pub title: String,
    pub title_no_tags: String,
    pub title_lang: Option<String>,
    pub original_title: Option<String>,
    pub order: String,
    pub draft: bool,
}

#[derive(Clone, PartialEq, Eq, Debug, salsa::Update)]
pub struct ArticleMeta {
    pub url_meta: UrlMeta,
    pub date_modified: Option<time::Date>,
    pub date_created: Option<time::Date>,
}

#[derive(Clone, PartialEq, Eq, Debug, salsa::Update)]
pub struct GameMeta {
    pub article_meta: ArticleMeta,
    pub countries: Vec<celes::Country>,
    pub equipment: Option<String>,
    pub players: Option<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, salsa::Update)]
pub struct ArticleNode {
    pub name: Option<String>,
    pub original_name: Option<String>,
    pub order: String,
    pub url_path: String,
    pub children: BTreeMap<String, ArticleNode>,
    pub draft: bool,
}

#[derive(Clone, PartialEq, Eq, Debug, salsa::Update)]
pub struct OutputPage {
    pub title: String,
    pub url_path: String,
    pub content: Vec<u8>,
    pub last_modified: Option<time::Date>,
}

impl OutputPage {
    pub fn to_output_file(&self) -> OutputFile {
        OutputFile {
            title: maud::PreEscaped(self.title.clone()),
            url_path: self.url_path.clone().into(),
            content: self.content.clone(),
            write_to_disk: true,
            last_modified: self.last_modified,
        }
    }
}

pub type Header<'a> = BTreeMap<String, saphyr::Yaml<'a>>;

pub fn take_header<'a>(header: &mut Header<'a>, key: &str) -> saphyr::Yaml<'a> {
    header.remove(key).unwrap_or(saphyr::Yaml::BadValue)
}

pub fn sanitized_html(value: &str) -> Markup {
    static AMMONIA: LazyLock<ammonia::Builder> = LazyLock::new(|| {
        let mut builder = ammonia::Builder::new();
        builder.tags(["cite", "span", "sup", "i", "em", "a"].into());
        builder.add_allowed_classes("span", ["noun", "rnum"]);
        builder.add_allowed_classes("sup", ["ordinal"]);
        builder
    });

    maud::PreEscaped(AMMONIA.clean(value).to_string())
}

pub fn html_without_tags(value: &str) -> Markup {
    static AMMONIA: LazyLock<ammonia::Builder> = LazyLock::new(|| {
        let mut builder = ammonia::Builder::new();
        builder.tags(HashSet::new()); // strip all tags
        builder
    });

    maud::PreEscaped(AMMONIA.clean(value).to_string())
}

pub fn compute_url_path(rel_path: &Path) -> String {
    let mut url_path = rel_path.with_extension("");
    if url_path.file_name() == url_path.parent().and_then(|p| p.file_name()) {
        url_path.pop();
    }
    let mut s = url_path.to_string_lossy().replace('\\', "/");
    s.insert(0, '/');
    s.push('/');
    s
}

pub fn markdown_constructs() -> Constructs {
    Constructs {
        frontmatter: true,
        gfm_strikethrough: true,
        gfm_table: true,
        gfm_footnote_definition: true,
        gfm_label_start_footnote: true,
        html_flow: false,
        html_text: false,
        mdx_jsx_flow: true,
        mdx_jsx_text: true,
        code_indented: false,
        ..Constructs::default()
    }
}

#[salsa::tracked]
pub fn parsed(db: &dyn Db, file: SourceFile) -> Result<Arc<markdown::mdast::Node>, String> {
    let parse_options = ParseOptions {
        constructs: markdown_constructs(),
        ..ParseOptions::default()
    };
    let text = file.text(db);
    markdown::to_mdast(&text, &parse_options)
        .map(Arc::new)
        .map_err(|e| format!("couldn't parse {}: {e}", file.path(db).display()))
}

#[salsa::tracked]
pub fn rendered_bibliography(db: &dyn Db, bib: BibliographySource) -> Result<RenderedBib, String> {
    let text = bib.text(db);
    let bibliography: crate::bibliography::Bibliography =
        serde_saphyr::from_str(&text).map_err(|e| format!("parsing bibliography.yaml: {e}"))?;
    Ok(RenderedBib(Arc::new(bib_render::to_rendered(
        &bibliography,
    ))))
}

#[salsa::tracked]
pub fn image_lookup(
    db: &dyn Db,
    manifest: ImageManifestSource,
) -> Result<Arc<ImageManifest>, String> {
    let text = manifest.json(db);
    serde_json::from_str(&text)
        .map(Arc::new)
        .map_err(|e| format!("parsing image manifest: {e}"))
}

fn parse_yaml_header(ast: &markdown::mdast::Node) -> Result<Header<'static>, String> {
    let header_node =
        mdast_to_html::get_header(ast).ok_or_else(|| "missing YAML header in file".to_string())?;
    let yaml = saphyr::Yaml::load_from_str(&header_node.value)
        .map_err(|e| format!("parsing YAML header: {e:?}"))?;
    let mapping = yaml
        .into_iter()
        .next()
        .ok_or_else(|| "empty YAML header".to_string())?
        .into_mapping()
        .ok_or_else(|| "YAML header wasn't a mapping".to_string())?;
    mapping
        .into_iter()
        .map(|(k, v)| {
            k.into_string()
                .map(|key| (key, v))
                .ok_or_else(|| "YAML header key wasn't a string".to_string())
        })
        .collect::<Result<_, _>>()
}

#[salsa::tracked]
pub fn url_meta(db: &dyn Db, file: SourceFile) -> Result<UrlMeta, String> {
    let ast = parsed(db, file)?;
    let mut header = parse_yaml_header(&ast)?;

    let raw_title = take_header(&mut header, "title")
        .into_string()
        .ok_or_else(|| format!("missing title in {}", file.path(db).display()))?;
    let mut title = sanitized_html(&raw_title);
    let mut title_lang = take_header(&mut header, "titleLang").into_string();
    let mut original_title = take_header(&mut header, "originalTitle")
        .into_string()
        .map(|s| sanitized_html(&s));

    if let Some((orig, latn)) = title.0.split_once("·") {
        original_title = Some(maud::PreEscaped(orig.trim().to_string()));
        title = maud::PreEscaped(latn.trim().to_string());
    }

    static LANG_GETTER: LazyLock<regex::Regex> =
        LazyLock::new(|| regex::Regex::new(r#"lang=("[^"]+"|'[^']+')"#).unwrap());

    if let Some(m) = LANG_GETTER.captures(&title.0) {
        title_lang = Some(
            m.get(1)
                .unwrap()
                .as_str()
                .trim_matches(['\'', '"'])
                .to_string(),
        );
    }

    let title_no_tags = html_without_tags(&title.0);
    let draft = take_header(&mut header, "draft")
        .into_bool()
        .unwrap_or_default();
    let order_val = take_header(&mut header, "order");
    let order = order_val
        .as_integer()
        .map(|i| i.to_string())
        .or_else(|| order_val.into_string())
        .unwrap_or_else(|| title_no_tags.0.clone());

    let url_path = compute_url_path(&file.path(db));

    Ok(UrlMeta {
        url_path,
        title: title.0,
        title_no_tags: title_no_tags.0,
        title_lang,
        original_title: original_title.map(|t| t.0),
        order,
        draft,
    })
}

#[salsa::tracked]
pub fn article_meta(db: &dyn Db, file: SourceFile) -> Result<ArticleMeta, String> {
    let ast = parsed(db, file)?;
    let mut header = parse_yaml_header(&ast)?;
    let u_meta = url_meta(db, file)?;

    let ymd = time::macros::format_description!("[year]-[month]-[day]");
    let date_created = take_header(&mut header, "date created")
        .as_str()
        .map(|s| time::Date::parse(s, ymd))
        .transpose()
        .map_err(|e| format!("parsing 'date created': {e}"))?;
    let date_modified = take_header(&mut header, "date modified")
        .as_str()
        .map(|s| time::Date::parse(s, ymd))
        .transpose()
        .map_err(|e| format!("parsing 'date modified': {e}"))?;

    Ok(ArticleMeta {
        url_meta: u_meta,
        date_modified,
        date_created,
    })
}

#[salsa::tracked]
pub fn game_meta(db: &dyn Db, file: SourceFile) -> Result<GameMeta, String> {
    let art_meta = article_meta(db, file)?;
    let ast = parsed(db, file)?;
    let mut header = parse_yaml_header(&ast)?;

    let countries = take_header(&mut header, "countries")
        .into_string()
        .unwrap_or_default()
        .split(',')
        .filter(|s| !s.is_empty())
        .map(celes::Country::from_str)
        .collect::<Result<Vec<celes::Country>, &'static str>>()
        .map_err(|e| format!("error parsing countries: {e}"))?;

    let equipment = take_header(&mut header, "equipment").into_string();
    let players = take_header(&mut header, "players").into_string();

    Ok(GameMeta {
        article_meta: art_meta,
        countries,
        equipment,
        players,
    })
}

#[salsa::tracked]
pub fn url_lookup(
    db: &dyn Db,
    source_set: SourceSet,
    config: BuildConfig,
) -> Result<BTreeMap<String, Option<String>>, String> {
    let mut lookup = BTreeMap::new();
    let output_drafts = config.output_drafts(db);
    for file in source_set.files(db) {
        let kind = file.kind(db);
        if kind == FileKind::Article || kind == FileKind::Game {
            let meta = url_meta(db, file)?;
            let key = file.path(db).to_string_lossy().replace('\\', "/");
            let val = if !meta.draft || output_drafts {
                Some(meta.url_path.clone())
            } else {
                None
            };
            lookup.insert(key, val);
        }
    }
    Ok(lookup)
}

#[salsa::tracked]
pub fn article_tree(db: &dyn Db, source_set: SourceSet) -> Result<ArticleNode, String> {
    let mut tree = ArticleNode::default();
    for file in source_set.files(db) {
        if file.kind(db) == FileKind::Article {
            let meta = url_meta(db, file)?;
            let mut node = &mut tree;
            for part in meta.url_path.trim_matches('/').split('/') {
                node = node.children.entry(part.to_string()).or_default();
            }

            if node.name.is_some() {
                return Err(format!("duplicate articles for path: {}", meta.url_path));
            }

            node.name = Some(meta.title.clone());
            node.original_name = meta.original_title.clone();
            node.order = meta.order.clone();
            node.url_path = meta.url_path.clone();
            node.draft = meta.draft;
        }
    }
    Ok(tree)
}

pub struct ArticleView {
    pub title: Markup,
    pub title_no_tags: Markup,
    pub title_lang: Option<String>,
    pub original_title: Option<Markup>,
    pub url_path: String,
    pub draft: bool,
    pub date_modified: Option<time::Date>,
}

impl BaseMetadata for ArticleView {
    fn title_markup(&self) -> &Markup {
        &self.title
    }
    fn title_without_tags(&self) -> &Markup {
        &self.title_no_tags
    }
    fn title_lang(&self) -> Option<&str> {
        self.title_lang.as_deref()
    }
    fn original_title(&self) -> Option<&Markup> {
        self.original_title.as_ref()
    }
    fn og_type(&self) -> Option<&str> {
        Some("article")
    }
    fn url_path(&self) -> &str {
        &self.url_path
    }
    fn is_draft(&self) -> bool {
        self.draft
    }
    fn modification_date(&self) -> Option<time::Date> {
        self.date_modified
    }
}

impl ArticleMetadata for ArticleView {
    fn date_modified(&self) -> Option<time::Date> {
        self.date_modified
    }
}

pub struct GameView {
    pub base: ArticleView,
    pub countries: Vec<celes::Country>,
    pub equipment: Option<String>,
    pub players: Option<String>,
}

impl BaseMetadata for GameView {
    fn title_markup(&self) -> &Markup {
        self.base.title_markup()
    }
    fn title_without_tags(&self) -> &Markup {
        self.base.title_without_tags()
    }
    fn title_lang(&self) -> Option<&str> {
        self.base.title_lang()
    }
    fn original_title(&self) -> Option<&Markup> {
        self.base.original_title()
    }
    fn og_type(&self) -> Option<&str> {
        self.base.og_type()
    }
    fn url_path(&self) -> &str {
        self.base.url_path()
    }
    fn is_draft(&self) -> bool {
        self.base.is_draft()
    }
    fn modification_date(&self) -> Option<time::Date> {
        self.base.modification_date()
    }
}

impl ArticleMetadata for GameView {
    fn date_modified(&self) -> Option<time::Date> {
        self.base.date_modified()
    }
}

impl GameMetadata for GameView {
    fn countries(&self) -> &[celes::Country] {
        &self.countries
    }
    fn equipment(&self) -> Option<&str> {
        self.equipment.as_deref()
    }
    fn players(&self) -> Option<&str> {
        self.players.as_deref()
    }
}

#[salsa::tracked]
pub fn render_article(
    db: &dyn Db,
    file: SourceFile,
    source_set: SourceSet,
    bib: BibliographySource,
    manifest: ImageManifestSource,
    config: BuildConfig,
) -> Result<Arc<OutputPage>, String> {
    let base_path = config.base_path(db);
    let output_drafts = config.output_drafts(db);
    let full_path = base_path.join(file.path(db));
    let ast = parsed(db, file)?;
    let bib_rendered = rendered_bibliography(db, bib)?;
    let img = image_lookup(db, manifest)?;
    let lookup = url_lookup(db, source_set, config)?;

    let (content, akas, cites) =
        mdast_to_html::to_html(&base_path, &full_path, &ast, &bib_rendered, &img, &lookup)
            .map_err(|e| format!("rendering HTML for {}: {e}", full_path.display()))?;

    let kind = file.kind(db);
    let u_meta = url_meta(db, file)?;

    // Push accumulators (only for articles and games, matching pre-migration behaviour)
    if kind == FileKind::Article || kind == FileKind::Game {
        for (lang, word) in akas {
            Aka(lang, word.0, u_meta.url_path.clone()).accumulate(db);
        }
        for (ref_id, cite_id) in cites {
            Cite(
                ref_id,
                u_meta.title.clone(),
                format!("{}#{}", u_meta.url_path, cite_id),
            )
            .accumulate(db);
        }
    }

    let mut breadcrumbs_data: Vec<(String, Option<String>)> = Vec::new();
    let mut children = None;
    let mut prev_next = None;

    if kind == FileKind::Article {
        let tree = article_tree(db, source_set)?;
        let parts = Vec::from_iter(u_meta.url_path.trim_matches('/').split('/'));
        let part_count = parts.len();

        let mut prev_sibling = None;
        let mut next_sibling = None;
        let mut curr_tree = &tree;

        for (ix, part) in parts.into_iter().enumerate() {
            if ix == part_count - 1 {
                let sorted_sibs = Vec::from_iter(
                    curr_tree
                        .children
                        .iter()
                        .filter(|(_, c)| !c.draft || output_drafts)
                        .sorted_by_key(|(_, c)| &c.order),
                );

                let me = sorted_sibs
                    .iter()
                    .find_position(|(n, _)| n == &part)
                    .ok_or_else(|| format!("could not find {part} in siblings"))?
                    .0;

                if let Some(prev_ix) = me.checked_sub(1) {
                    prev_sibling = sorted_sibs.get(prev_ix).map(|s| s.1);
                }

                if let Some(next_ix) = me.checked_add(1) {
                    next_sibling = sorted_sibs.get(next_ix).map(|s| s.1);
                }
            }

            curr_tree = curr_tree
                .children
                .get(part)
                .ok_or_else(|| format!("missing parent article `{part}`"))?;

            breadcrumbs_data.push((curr_tree.url_path.clone(), curr_tree.name.clone()));
        }

        children = templates::render_article_tree(&u_meta.url_path, curr_tree, output_drafts);
        prev_next = templates::render_prev_next(prev_sibling, next_sibling);
    }

    let breadcrumbs_temp: Vec<(String, Option<Markup>)> = breadcrumbs_data
        .iter()
        .map(|(u, n)| (u.clone(), n.as_ref().map(|s| maud::PreEscaped(s.clone()))))
        .collect();
    let breadcrumbs_slice: Vec<(&str, Option<&Markup>)> = breadcrumbs_temp
        .iter()
        .map(|(u, n)| (u.as_str(), n.as_ref()))
        .collect();

    let templater = Templater::new(Url::parse(&config.base_url(db)).unwrap());
    let output_file = if kind == FileKind::Game {
        let g_meta = game_meta(db, file)?;
        let view = GameView {
            base: ArticleView {
                title: maud::PreEscaped(g_meta.article_meta.url_meta.title.clone()),
                title_no_tags: maud::PreEscaped(g_meta.article_meta.url_meta.title_no_tags.clone()),
                title_lang: g_meta.article_meta.url_meta.title_lang.clone(),
                original_title: g_meta
                    .article_meta
                    .url_meta
                    .original_title
                    .as_ref()
                    .map(|s| maud::PreEscaped(s.clone())),
                url_path: g_meta.article_meta.url_meta.url_path.clone(),
                draft: g_meta.article_meta.url_meta.draft,
                date_modified: g_meta.article_meta.date_modified,
            },
            countries: g_meta.countries.clone(),
            equipment: g_meta.equipment.clone(),
            players: g_meta.players.clone(),
        };
        templater
            .article(&view, &content, &breadcrumbs_slice, children, prev_next)
            .map_err(|e| format!("templating game article: {e}"))?
    } else {
        let a_meta = article_meta(db, file)?;
        let view = ArticleView {
            title: maud::PreEscaped(a_meta.url_meta.title.clone()),
            title_no_tags: maud::PreEscaped(a_meta.url_meta.title_no_tags.clone()),
            title_lang: a_meta.url_meta.title_lang.clone(),
            original_title: a_meta
                .url_meta
                .original_title
                .as_ref()
                .map(|s| maud::PreEscaped(s.clone())),
            url_path: a_meta.url_meta.url_path.clone(),
            draft: a_meta.url_meta.draft,
            date_modified: a_meta.date_modified,
        };
        templater
            .article(&view, &content, &breadcrumbs_slice, children, prev_next)
            .map_err(|e| format!("templating article: {e}"))?
    };

    Ok(Arc::new(OutputPage {
        title: output_file.title.0,
        url_path: output_file.url_path.into_owned(),
        content: output_file.content,
        last_modified: output_file.last_modified,
    }))
}

#[salsa::tracked]
pub fn all_articles(
    db: &dyn Db,
    source_set: SourceSet,
    bib: BibliographySource,
    manifest: ImageManifestSource,
    config: BuildConfig,
) -> Result<Arc<Vec<Arc<OutputPage>>>, String> {
    let output_drafts = config.output_drafts(db);
    let mut pages = Vec::new();

    for file in source_set.files(db) {
        let meta = url_meta(db, file)?;
        if meta.draft && !output_drafts {
            continue;
        }
        let page = render_article(db, file, source_set, bib, manifest, config)?;
        pages.push(page);
    }

    Ok(Arc::new(pages))
}

#[salsa::tracked]
pub fn bibliography_page(
    db: &dyn Db,
    source_set: SourceSet,
    bib: BibliographySource,
    manifest: ImageManifestSource,
    config: BuildConfig,
) -> Result<Arc<OutputPage>, String> {
    let _ = all_articles(db, source_set, bib, manifest, config)?;
    let cites_accumulated =
        all_articles::accumulated::<Cite>(db, source_set, bib, manifest, config);

    let mut cites_map: HashMap<String, Vec<(Arc<Markup>, String)>> = HashMap::new();
    for cite in cites_accumulated {
        let title = Arc::new(maud::PreEscaped(cite.1.clone()));
        cites_map
            .entry(cite.0.clone())
            .or_default()
            .push((title, cite.2.clone()));
    }

    let rendered_bib = rendered_bibliography(db, bib)?;
    let templater = Templater::new(Url::parse(&config.base_url(db)).unwrap());
    let output_file = templater
        .bibliography(&rendered_bib, cites_map)
        .map_err(|e| format!("generating bibliography: {e}"))?;

    Ok(Arc::new(OutputPage {
        title: output_file.title.0,
        url_path: output_file.url_path.into_owned(),
        content: output_file.content,
        last_modified: output_file.last_modified,
    }))
}

#[salsa::tracked]
pub fn names_index(
    db: &dyn Db,
    source_set: SourceSet,
    bib: BibliographySource,
    manifest: ImageManifestSource,
    config: BuildConfig,
) -> Result<Arc<OutputPage>, String> {
    let _ = all_articles(db, source_set, bib, manifest, config)?;
    let akas_accumulated = all_articles::accumulated::<Aka>(db, source_set, bib, manifest, config);

    let akas_iter = akas_accumulated.into_iter().map(|aka| templates::Aka {
        lang_id: aka.0.clone(),
        word: maud::PreEscaped(aka.1.clone()),
        url_path: Arc::new(aka.2.clone()),
    });

    let templater = Templater::new(Url::parse(&config.base_url(db)).unwrap());
    let output_file = templater
        .names_index(akas_iter)
        .map_err(|e| format!("generating names index: {e}"))?;

    Ok(Arc::new(OutputPage {
        title: output_file.title.0,
        url_path: output_file.url_path.into_owned(),
        content: output_file.content,
        last_modified: output_file.last_modified,
    }))
}

#[salsa::tracked]
pub fn games_index(
    db: &dyn Db,
    source_set: SourceSet,
    config: BuildConfig,
) -> Result<Arc<OutputPage>, String> {
    let output_drafts = config.output_drafts(db);
    let mut games = Vec::new();

    for file in source_set.files(db) {
        if file.kind(db) == FileKind::Game {
            let meta = game_meta(db, file)?;
            if !meta.article_meta.url_meta.draft || output_drafts {
                let view = GameView {
                    base: ArticleView {
                        title: maud::PreEscaped(meta.article_meta.url_meta.title.clone()),
                        title_no_tags: maud::PreEscaped(
                            meta.article_meta.url_meta.title_no_tags.clone(),
                        ),
                        title_lang: meta.article_meta.url_meta.title_lang.clone(),
                        original_title: meta
                            .article_meta
                            .url_meta
                            .original_title
                            .as_ref()
                            .map(|s| maud::PreEscaped(s.clone())),
                        url_path: meta.article_meta.url_meta.url_path.clone(),
                        draft: meta.article_meta.url_meta.draft,
                        date_modified: meta.article_meta.date_modified,
                    },
                    countries: meta.countries.clone(),
                    equipment: meta.equipment.clone(),
                    players: meta.players.clone(),
                };
                games.push(view);
            }
        }
    }

    let templater = Templater::new(Url::parse(&config.base_url(db)).unwrap());
    let output_file = templater
        .games(games.iter())
        .map_err(|e| format!("generating games index: {e}"))?;

    Ok(Arc::new(OutputPage {
        title: output_file.title.0,
        url_path: output_file.url_path.into_owned(),
        content: output_file.content,
        last_modified: output_file.last_modified,
    }))
}

#[salsa::tracked]
pub fn welcome(
    db: &dyn Db,
    source_set: SourceSet,
    bib: BibliographySource,
    manifest: ImageManifestSource,
    config: BuildConfig,
) -> Result<Arc<OutputPage>, String> {
    let articles = all_articles(db, source_set, bib, manifest, config)?;
    let mut output_files = Vec::new();
    for page in articles.iter() {
        if page.url_path != "/about/" && page.url_path != "/see-also/" {
            output_files.push(page.to_output_file());
        }
    }

    let templater = Templater::new(Url::parse(&config.base_url(db)).unwrap());
    let output_file = templater
        .welcome(&output_files)
        .map_err(|e| format!("generating welcome page: {e}"))?;

    Ok(Arc::new(OutputPage {
        title: output_file.title.0,
        url_path: output_file.url_path.into_owned(),
        content: output_file.content,
        last_modified: output_file.last_modified,
    }))
}

#[salsa::tracked]
pub fn sitemap(
    db: &dyn Db,
    source_set: SourceSet,
    bib: BibliographySource,
    manifest: ImageManifestSource,
    config: BuildConfig,
) -> Result<Arc<OutputPage>, String> {
    let articles = all_articles(db, source_set, bib, manifest, config)?;
    let bib_page = bibliography_page(db, source_set, bib, manifest, config)?;
    let welcome_page = welcome(db, source_set, bib, manifest, config)?;
    let games_page = games_index(db, source_set, config)?;
    let names_page = names_index(db, source_set, bib, manifest, config)?;

    let mut files_for_sitemap = Vec::new();
    for p in articles.iter() {
        if p.url_path != "/about/" && p.url_path != "/see-also/" {
            files_for_sitemap.push(p.to_output_file());
        }
    }
    for p in articles.iter() {
        if p.url_path == "/about/" {
            files_for_sitemap.push(p.to_output_file());
        }
    }
    for p in articles.iter() {
        if p.url_path == "/see-also/" {
            files_for_sitemap.push(p.to_output_file());
        }
    }
    files_for_sitemap.push(bib_page.to_output_file());
    files_for_sitemap.push(welcome_page.to_output_file());
    files_for_sitemap.push(games_page.to_output_file());
    files_for_sitemap.push(names_page.to_output_file());

    let iso_format = time::macros::format_description!("[year]-[month]-[day]");
    let mut most_recent = None;
    let mut result = String::new();
    result.push_str("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
    result.push_str("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
    for file in &files_for_sitemap {
        result.push_str("<url>");
        result.push_str("<loc>https://games.porg.es");
        result.push_str(&file.url_path);
        result.push_str("</loc>");
        if let Some(last_mod) = file.last_modified {
            result.push_str("<lastmod>");
            result.push_str(
                &last_mod
                    .format(&iso_format)
                    .map_err(|e| format!("formatting sitemap date: {e}"))?,
            );
            result.push_str("</lastmod>");
        }
        result.push_str("</url>\n");
        most_recent = most_recent.max(file.last_modified);
    }
    result.push_str("</urlset>\n");

    Ok(Arc::new(OutputPage {
        title: "Sitemap".to_string(),
        url_path: "/sitemap.xml".to_string(),
        content: result.into_bytes(),
        last_modified: most_recent,
    }))
}
