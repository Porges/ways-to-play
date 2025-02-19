#![recursion_limit = "512"]

use std::{
    borrow::{Borrow, Cow},
    collections::{BTreeMap, HashMap, HashSet},
    ffi::OsStr,
    io::Write,
    path::{Path, PathBuf},
    process::{self},
    str::FromStr,
    sync::{Arc, LazyLock, Mutex},
    time::Duration,
};

use bib_render::RenderedBibliography;
use clap::Parser;
use eyre::{bail, eyre, Context, ContextCompat, OptionExt, Result};
use icu::locid::LanguageIdentifier;
use itertools::Itertools;
use markdown::{mdast, Constructs, ParseOptions};
use maud::Markup;
use notify::{
    event::{CreateKind, RemoveKind},
    EventKind,
};
use notify_debouncer_full::{new_debouncer, DebounceEventResult};
use rayon::iter::{IntoParallelRefIterator, ParallelIterator};
use serde::Deserialize;
use templates::{ArticleMetadata, BaseMetadata, GameMetadata, OutputFile, Templater};
use time::UtcOffset;
use tracing::{debug, error, info, warn};
use tracing_subscriber::{fmt::format::FmtSpan, EnvFilter};
use url::Url;
use walkdir::WalkDir;

mod bib_render;
mod bib_to_csl;
mod bibliography;
mod intl;
mod mdast_to_html;
mod nvec;
mod templates;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    #[arg(short, long, value_name = "INPUT_DIR")]
    input: PathBuf,

    #[arg(short, long, value_name = "OUTPUT_DIR")]
    output: PathBuf,

    #[arg(short, long)]
    image_manifest: PathBuf,

    #[arg(short, long)]
    draft: bool,

    #[arg(short, long)]
    watch: bool,
}

struct File<M> {
    file_path: PathBuf,
    url_path: Cow<'static, str>,
    content: mdast::Node,
    metadata: M,
}

type Header = BTreeMap<String, saphyr::Yaml>;

trait YamlHeader: Sized {
    fn from_header(header: &mut Header) -> Result<Self>;
}

fn take_header(header: &mut Header, key: &str) -> saphyr::Yaml {
    header.remove(key).unwrap_or(saphyr::Yaml::BadValue)
}

fn sanitized_html(value: &str) -> Markup {
    static AMMONIA: LazyLock<ammonia::Builder> = LazyLock::new(|| {
        let mut builder = ammonia::Builder::new();
        builder.tags(["cite", "span", "sup", "i", "em", "a"].into());
        builder.add_allowed_classes("span", ["noun", "rnum"]);
        builder.add_allowed_classes("sup", ["ordinal"]);
        builder
    });

    maud::PreEscaped(AMMONIA.clean(value).to_string())
}

fn string_value_of_html(value: &str) -> String {
    static AMMONIA: LazyLock<ammonia::Builder> = LazyLock::new(|| {
        let mut builder = ammonia::Builder::new();
        builder.tags(HashSet::new()); // strip all tags
        builder
    });

    AMMONIA.clean(value).to_string()
}

#[cfg(test)]
mod sanitization_tests {
    use super::*;

    #[test]
    pub fn test_sanitized_html() {
        assert_eq!(
            sanitized_html("simple <a href='something'>link</a>").0,
            "simple <a href='something'>link</a>"
        );
    }

    #[test]
    pub fn test_string_value_of_html() {
        assert_eq!(
            string_value_of_html("simple <a href='something'>link</a>"),
            "simple link"
        );
    }
}

impl YamlHeader for ArticleHeader {
    fn from_header(header: &mut Header) -> Result<Self> {
        let ymd = time::macros::format_description!("[year]-[month]-[day]");

        let raw_title = take_header(header, "title")
            .into_string()
            .ok_or_eyre("missing title")?;

        let mut title = sanitized_html(&raw_title);
        let mut title_lang = take_header(header, "titleLang").into_string();
        let mut original_title = take_header(header, "originalTitle")
            .into_string()
            .map(|s| sanitized_html(&s));

        // title can instead contain · to separate original and latinized titles
        if let Some((orig, latn)) = title.0.split_once("·") {
            original_title = Some(maud::PreEscaped(orig.trim().to_string()));

            title = maud::PreEscaped(latn.trim().to_string());
        }

        // see if latnized title is in another language
        // this is needed to provide a language for the title_string value
        // which is used in metadata
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

        let title_string = string_value_of_html(&title.0);

        let date_created = take_header(header, "date created")
            .as_str()
            .map(|s| time::Date::parse(s, ymd))
            .transpose()
            .wrap_err("parsing 'date created'")?;

        let date_modified = take_header(header, "date modified")
            .as_str()
            .map(|s| time::Date::parse(s, ymd))
            .transpose()
            .wrap_err("parsing 'date modified'")?;

        let draft = take_header(header, "draft").into_bool().unwrap_or_default();

        let order = take_header(header, "order");

        let _aliases = take_header(header, "aliases"); // Obsidian-specific

        Ok(ArticleHeader {
            title,
            title_string,
            title_lang,
            original_title,
            date_modified,
            date_created,
            draft,
            order: order
                .as_i64()
                .map(|i| i.to_string())
                .or_else(|| order.into_string()),
        })
    }
}

impl YamlHeader for GameHeader {
    fn from_header(header: &mut Header) -> Result<Self> {
        let article_meta = ArticleHeader::from_header(header)?;
        let countries = take_header(header, "countries")
            .into_string()
            .unwrap_or_default()
            .split(',')
            .filter(|s| !s.is_empty())
            .map(celes::Country::from_str)
            .collect::<Result<Vec<celes::Country>, &'static str>>()
            .map_err(|e| eyre!("error parsing countries: {e}"))?;

        let equipment = take_header(header, "equipment").into_string();
        let players = take_header(header, "players").into_string();

        Ok(GameHeader {
            article_meta,
            countries,
            equipment,
            players,
        })
    }
}

pub struct ArticleHeader {
    title: Markup,
    title_string: String,
    title_lang: Option<String>,
    original_title: Option<Markup>,
    date_modified: Option<time::Date>,
    draft: bool,
    order: Option<String>,
    date_created: Option<time::Date>, // unused as of yet
}

impl<T: Borrow<ArticleHeader>> BaseMetadata for File<T> {
    fn title_markup(&self) -> &Markup {
        &self.metadata.borrow().title
    }

    fn title_string(&self) -> &str {
        &self.metadata.borrow().title_string
    }

    fn title_lang(&self) -> Option<&str> {
        self.metadata.borrow().title_lang.as_deref()
    }

    fn original_title(&self) -> Option<&Markup> {
        self.metadata.borrow().original_title.as_ref()
    }

    fn og_type(&self) -> Option<&str> {
        Some("article")
    }

    fn url_path(&self) -> &str {
        &self.url_path
    }

    fn is_draft(&self) -> bool {
        self.metadata.borrow().draft
    }

    fn modification_date(&self) -> Option<time::Date> {
        self.metadata.borrow().date_modified
    }
}

impl<T: Borrow<ArticleHeader>> ArticleMetadata for File<T> {
    fn date_modified(&self) -> Option<time::Date> {
        self.metadata.borrow().date_modified
    }
}

impl GameMetadata for File<GameHeader> {
    fn countries(&self) -> &[celes::Country] {
        &self.metadata.countries
    }

    fn equipment(&self) -> Option<&str> {
        self.metadata.equipment.as_deref()
    }

    fn players(&self) -> Option<&str> {
        self.metadata.players.as_deref()
    }
}

pub struct GameHeader {
    article_meta: ArticleHeader,
    countries: Vec<celes::Country>,
    equipment: Option<String>,
    players: Option<String>,
}

impl std::borrow::Borrow<ArticleHeader> for GameHeader {
    fn borrow(&self) -> &ArticleHeader {
        &self.article_meta
    }
}

#[derive(Default, Debug)]
struct ArticleNode<'a> {
    name: Option<&'a Markup>,
    original_name: Option<&'a Markup>,
    order: &'a str,
    url_path: &'a str,
    children: ArticleTree<'a>,
    draft: bool,
}

type ArticleTree<'a> = BTreeMap<String, ArticleNode<'a>>;

type ImageManifest = BTreeMap<String, ImageManifestEntry>;

#[derive(Deserialize)]
struct ImageManifestEntry {
    hash: String,
    height: usize,
    width: usize,
    url: String,
    // size (width) → URL
    sizes: Option<BTreeMap<usize, String>>,
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

pub struct Aka {
    pub lang_id: LanguageIdentifier,
    pub word: Markup,
    pub url_path: Arc<String>,
}

struct Builder {
    base_path: PathBuf,
    output_path: PathBuf,
    output_drafts: bool, // output drafts?

    templater: Templater,

    rendered_bibliography: RenderedBibliography,

    articles: Vec<File<ArticleHeader>>,
    games: Vec<File<GameHeader>>,
    images: ImageManifest,
    output_files: Vec<OutputFile>,

    markdown_constructs: Constructs,
}

impl Builder {
    fn new(
        base_path: PathBuf,
        output_path: PathBuf,
        image_manifest: PathBuf,
        output_drafts: bool,
    ) -> Result<Self> {
        let manifest =
            std::fs::read_to_string(image_manifest).wrap_err("loading image manifest")?;
        let images = serde_json::de::from_str(&manifest).wrap_err("parsing image manifest")?;

        let constructs = Constructs {
            frontmatter: true,
            gfm_strikethrough: true,
            gfm_table: true,
            gfm_footnote_definition: true,
            gfm_label_start_footnote: true,
            html_flow: false,
            html_text: false,
            mdx_jsx_flow: true,
            mdx_jsx_text: true,
            code_indented: false, // easier to indent mdx
            ..Constructs::default()
        };

        Ok(Self {
            base_path,
            output_path,
            templater: Templater::new(Url::parse("https://games.porg.es/").unwrap()),
            articles: Vec::new(),
            games: Vec::new(),
            output_files: Vec::new(),
            rendered_bibliography: RenderedBibliography::default(),
            images,
            markdown_constructs: constructs,
            output_drafts,
        })
    }

    fn load(&mut self) -> Result<()> {
        self.load_bib()?;

        self.articles = self.load_files("articles")?;
        self.games = self.load_files("games")?;

        info!(
            "Loaded {} articles, {} games",
            self.articles.len(),
            self.games.len()
        );

        Ok(())
    }

    fn load_bib(&mut self) -> Result<()> {
        let target_bib = self.base_path.join("bibliography.yaml");

        let converted_bib = process::Command::new("yq")
            .args([OsStr::new("-o"), OsStr::new("json"), target_bib.as_os_str()])
            .output()
            .context("Running `yq` to convert bibliography")?;

        let bibliography = serde_json::from_slice(&converted_bib.stdout)?;
        self.rendered_bibliography = bib_render::to_rendered(&bibliography);

        info!(
            "Loaded bibliography ({} entries)",
            bibliography.references.len()
        );

        let csl = bib_to_csl::to_csl(&bibliography);

        info!("Writing CSL for Obsidian plugin");
        std::fs::write(self.base_path.join("../bib.json"), csl.to_string())?;
        Ok(())
    }

    fn load_files<M: YamlHeader>(&self, rel: &str) -> Result<Vec<File<M>>> {
        let mut result = Vec::new();
        let md_ext = Some(OsStr::new("md"));
        for entry in WalkDir::new(self.base_path.join(rel)) {
            let entry = entry?;
            if entry.file_type().is_file() && entry.path().extension() == md_ext {
                result.push(self.load_file(entry.into_path())?);
            }
        }

        Ok(result)
    }

    fn file_created(&mut self, file_path: PathBuf) -> Result<()> {
        let relative = file_path.strip_prefix(&self.base_path)?;
        if relative.starts_with("articles") {
            let new_article = self.load_file::<ArticleHeader>(file_path)?;
            self.articles.push(new_article);
        } else if relative.starts_with("games") {
            let new_article = self.load_file::<GameHeader>(file_path)?;
            self.games.push(new_article);
        } else {
            info!(
                "Created file was not an article/game: {}",
                file_path.display()
            );
        }

        Ok(())
    }

    fn file_removed(&mut self, file_path: &Path) -> Result<()> {
        let relative = file_path.strip_prefix(&self.base_path)?;
        if relative.starts_with("articles") {
            self.articles.retain(|a| a.file_path != file_path);
        } else if relative.starts_with("games") {
            self.games.retain(|a| a.file_path != file_path);
        } else {
            info!("Removed file was not loaded: {}", file_path.display());
        }

        Ok(())
    }

    fn file_modified(&mut self, file_path: PathBuf) -> Result<()> {
        self.file_removed(&file_path)?;
        self.file_created(file_path)?;

        Ok(())
    }

    fn load_file<M: YamlHeader>(&self, file_path: PathBuf) -> Result<File<M>> {
        let data = std::fs::read_to_string(&file_path)?;
        let parse_options = ParseOptions {
            constructs: self.markdown_constructs.clone(),
            ..ParseOptions::default()
        };

        let content = markdown::to_mdast(&data, &parse_options)
            .map_err(|e| eyre!("couldn't parse {}: {e}", file_path.display()))?;

        let header =
            mdast_to_html::get_header(&content).ok_or_eyre("missing YAML header in file")?;

        let header = saphyr::Yaml::load_from_str(&header.value)
            .wrap_err("parsing YAML header")?
            .into_iter()
            .next()
            .ok_or_eyre("empty YAML header")?
            .into_hash()
            .ok_or_eyre("YAML header wasn't a hash")?;

        let mut header = header
            .into_iter()
            .map(|(k, v)| (k.into_string().unwrap(), v))
            .collect::<Header>();

        let metadata = M::from_header(&mut header)
            .wrap_err_with(|| eyre!("parsing metadata in {}", file_path.display()))?;

        if let Some(k) = header.keys().next() {
            // warn about one unused key per file
            warn!(
                "unused YAML metadata key `{}` in {}",
                k,
                file_path.display()
            );
        }

        let rel_path = file_path.strip_prefix(&self.base_path)?;

        let mut url_path = rel_path.with_extension("");

        // folder note handling:
        // a file 'xyz' in a folder 'xyz' should be served at /xyz/ not /xyz/xyz/
        if url_path.file_name() == url_path.parent().and_then(|p| p.file_name()) {
            url_path.pop();
        }

        let mut url_path = url_path.to_string_lossy().replace('\\', "/");
        url_path.insert(0, '/');
        url_path.push('/');

        Ok(File {
            file_path,
            url_path: url_path.into(),
            content,
            metadata,
        })
    }

    fn build_article_tree(&self) -> Result<ArticleNode> {
        let mut tree = ArticleNode::default();
        for article in &self.articles {
            let mut node = &mut tree;
            for part in article.url_path.trim_matches('/').split('/') {
                node = node.children.entry(part.to_string()).or_default();
            }

            if node.name.is_some() {
                bail!("duplicate articles for path: {}", article.url_path);
            }

            node.name = Some(&article.metadata.title);
            node.original_name = article.metadata.original_title.as_ref();
            node.order = article
                .metadata
                .order
                .as_deref()
                .unwrap_or(&article.metadata.title_string);

            node.url_path = &article.url_path;
            node.draft = article.metadata.draft;
        }

        Ok(tree)
    }

    fn build_url_lookup(&self) -> Result<BTreeMap<String, Option<&str>>> {
        let mut lookup: BTreeMap<String, Option<&str>> = BTreeMap::new();

        // this generates Obsidian-style "vault-relative" paths
        // i.e. articles/some/path.md
        let make_rel = |path: &Path| -> Result<String> {
            let rel = path.strip_prefix(&self.base_path)?.to_string_lossy();
            Ok(rel.replace('\\', "/"))
        };

        for art in &self.articles {
            lookup.insert(
                make_rel(&art.file_path)?,
                (!art.is_draft() || self.output_drafts).then_some(art.url_path.as_ref()),
            );
        }

        for game in &self.games {
            lookup.insert(
                make_rel(&game.file_path)?,
                (!game.is_draft() || self.output_drafts).then_some(game.url_path.as_ref()),
            );
        }

        Ok(lookup)
    }

    fn generate_other_files(
        &self,
        output_files: &mut Vec<OutputFile>,
        url_lookup: &BTreeMap<String, Option<&str>>,
        akas: Vec<Aka>,
        cites: HashMap<String, Vec<(Arc<Markup>, String)>>,
    ) -> Result<()> {
        output_files.extend([
            self.generate_article(
                &self.load_file::<ArticleHeader>(self.base_path.join("about.md"))?,
                url_lookup,
                None,
                |_, _| {},
                |_, _| {},
            )?,
            self.generate_article(
                &self.load_file::<ArticleHeader>(self.base_path.join("see-also.md"))?,
                url_lookup,
                None,
                |_, _| {},
                |_, _| {},
            )?,
            self.templater
                .bibliography(&self.rendered_bibliography, cites)
                .wrap_err("generating bibliography")?,
            self.templater
                .welcome()
                .wrap_err("generating welcome page")?,
            self.templater
                .games(
                    self.games
                        .iter()
                        .filter(|g| !g.is_draft() || self.output_drafts),
                )
                .wrap_err("generating games page")?,
            self.templater
                .names_index(akas.into_iter())
                .wrap_err("generating names index")?,
        ]);

        output_files.push(self.sitemap(output_files).wrap_err("generating sitemap")?);

        Ok(())
    }

    fn sitemap(&self, output_files: &[OutputFile]) -> Result<OutputFile> {
        let iso_format = time::macros::format_description!("[year]-[month]-[day]");

        let mut most_recent = None;

        let mut result = String::new();
        result.push_str("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
        result.push_str("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
        for file in output_files {
            result.push_str("<url>");
            result.push_str("<loc>https://games.porg.es");
            result.push_str(&file.url_path);
            result.push_str("</loc>");
            if let Some(last_mod) = file.last_modified {
                result.push_str("<lastmod>");
                result.push_str(&last_mod.format(&iso_format)?);
                result.push_str("</lastmod>");
            }
            result.push_str("</url>\n");

            most_recent = most_recent.max(file.last_modified);
        }
        result.push_str("</urlset>\n");

        Ok(OutputFile::new("/sitemap.xml", result, most_recent))
    }

    fn generate_article<T>(
        &self,
        article: &File<T>,
        url_lookup: &BTreeMap<String, Option<&str>>,
        article_tree: Option<&ArticleNode>,
        aka_handler: impl FnMut(LanguageIdentifier, Markup),
        cite_handler: impl FnMut(&str, &str),
    ) -> Result<OutputFile>
    where
        File<T>: ArticleMetadata + BaseMetadata,
    {
        let content = mdast_to_html::to_html(
            &self.base_path,
            &article.file_path,
            &article.content,
            &self.rendered_bibliography,
            &self.images,
            url_lookup,
            aka_handler,
            cite_handler,
        )
        .wrap_err("rendering HTML")?;

        let mut breadcrumbs = Vec::new();
        let mut children = None;
        let mut prev_next = None;
        if let Some(mut tree) = article_tree {
            let parts = Vec::from_iter(article.url_path.trim_matches('/').split('/'));
            let part_count = parts.len();

            let mut prev_sibling = None;
            let mut next_sibling = None;
            for (ix, part) in parts.into_iter().enumerate() {
                if ix == part_count - 1 {
                    // last part – store siblings
                    let sorted_sibs = Vec::from_iter(
                        tree.children
                            .iter()
                            .filter(|(_, c)| !c.draft || self.output_drafts)
                            .sorted_by_key(|(_, c)| c.order),
                    );

                    let me = sorted_sibs
                        .iter()
                        .find_position(|(n, _)| n == &part)
                        .unwrap()
                        .0;

                    if let Some(prev_ix) = me.checked_sub(1) {
                        prev_sibling = sorted_sibs.get(prev_ix).map(|s| s.1);
                    }

                    if let Some(next_ix) = me.checked_add(1) {
                        next_sibling = sorted_sibs.get(next_ix).map(|s| s.1);
                    }
                }

                tree = tree
                    .children
                    .get(part)
                    .wrap_err_with(|| eyre!("missing parent article `{part}`"))?;

                breadcrumbs.push((tree.url_path, tree.name));
            }

            children = templates::render_article_tree(&article.url_path, tree, self.output_drafts);
            prev_next = templates::render_prev_next(prev_sibling, next_sibling);
        }

        let output_file = self
            .templater
            .article(article, &content, &breadcrumbs, children, prev_next)
            .wrap_err("templating article")?;

        Ok(output_file)
    }

    fn generate(&mut self) -> Result<()> {
        let old_outputs = std::mem::take(&mut self.output_files);
        let url_lookup = self.build_url_lookup()?;
        let old_outputs_map: BTreeMap<Cow<'static, str>, Vec<u8>> = old_outputs
            .into_iter()
            .map(|o| (o.url_path, o.content))
            .collect();

        let article_tree = self.build_article_tree()?;

        let akas = Mutex::new(Vec::new());
        let cites: Mutex<HashMap<String, Vec<(Arc<Markup>, String)>>> = Default::default();

        let articles = self
            .articles
            .par_iter()
            .filter(|a| !a.is_draft() || self.output_drafts)
            .map(|article| {
                let mut my_akas = Vec::new();
                let push_aka = |language: LanguageIdentifier, word: Markup| {
                    my_akas.push((language, word));
                };

                let mut my_cites: HashMap<String, String> = Default::default();
                let push_cite = |ref_id: &str, cite_id: &str| {
                    my_cites.insert(ref_id.to_string(), cite_id.to_string());
                };

                let result = self
                    .generate_article(
                        article,
                        &url_lookup,
                        Some(&article_tree),
                        push_aka,
                        push_cite,
                    )
                    .wrap_err_with(|| eyre!("couldn’t export {}", article.file_path.display()))?;

                let my_title = Arc::new(article.metadata.title.clone());
                let my_path = Arc::new(article.url_path.to_string());
                akas.lock()
                    .unwrap()
                    .extend(my_akas.into_iter().map(|(lang, word)| Aka {
                        lang_id: lang,
                        word,
                        url_path: my_path.clone(),
                    }));

                let mut cites = cites.lock().unwrap();
                for (ref_id, cite_id) in my_cites {
                    let cite = (my_title.clone(), format!("{}#{}", my_path, cite_id));
                    cites.entry(ref_id).or_default().push(cite);
                }

                Ok(result)
            });

        let games = self
            .games
            .par_iter()
            .filter(|a| !a.is_draft() || self.output_drafts)
            .map(|game| {
                let mut my_akas = Vec::new();
                let push_aka = |language: LanguageIdentifier, word: Markup| {
                    my_akas.push((language, word));
                };

                let mut my_cites: HashMap<String, String> = Default::default();
                let push_cite = |ref_id: &str, cite_id: &str| {
                    my_cites.insert(ref_id.to_string(), cite_id.to_string());
                };

                let result = self
                    .generate_article(game, &url_lookup, None, push_aka, push_cite)
                    .wrap_err_with(|| eyre!("couldn’t export {}", game.file_path.display()))?;

                let my_title = Arc::new(game.metadata.article_meta.title.clone());
                let my_path = Arc::new(game.url_path.to_string());
                akas.lock()
                    .unwrap()
                    .extend(my_akas.into_iter().map(|(lang, word)| Aka {
                        lang_id: lang,
                        word,
                        url_path: my_path.clone(),
                    }));

                let cite_ref = Arc::new((
                    game.metadata.article_meta.title.clone(),
                    game.url_path.to_string(),
                ));
                let mut cites = cites.lock().unwrap();
                for (ref_id, cite_id) in my_cites {
                    let cite = (my_title.clone(), format!("{}#{}", my_path, cite_id));
                    cites.entry(ref_id).or_default().push(cite);
                }

                Ok(result)
            });

        let mut output_files = articles.chain(games).collect::<Result<Vec<_>>>()?;

        self.generate_other_files(
            &mut output_files,
            &url_lookup,
            akas.into_inner()?,
            cites.into_inner()?,
        )?;
        self.output_files.extend(output_files);

        for file in &mut self.output_files {
            if let Some(old) = old_outputs_map.get(&file.url_path) {
                if *old == file.content {
                    file.write_to_disk = false;
                }
            }
        }

        Ok(())
    }

    fn output(&self) -> Result<()> {
        info!(
            "Generating {} outputs in {}",
            self.output_files.len(),
            dunce::simplified(&self.output_path).display()
        );

        let mut skipped = 0;
        for output_file in &self.output_files {
            if !output_file.write_to_disk {
                skipped += 1;
                continue;
            }

            let output_path = if output_file.url_path.ends_with('/') {
                // directory
                self.output_path
                    .join(output_file.url_path.trim_start_matches('/'))
                    .join("index.html")
            } else {
                // file
                self.output_path
                    .join(output_file.url_path.trim_start_matches('/'))
            };

            let content = &output_file.content;
            std::fs::create_dir_all(output_path.parent().unwrap())?;
            debug!("Writing to {}", dunce::simplified(&output_path).display());

            {
                let mut file = std::fs::File::create(&output_path)
                    .wrap_err_with(|| eyre!("creating file {}", output_path.display()))?;
                file.write_all(content)?;
                if let Some(mod_date) = output_file.last_modified {
                    let datetime = time::OffsetDateTime::new_in_offset(
                        mod_date,
                        time::Time::from_hms(0, 0, 0)?,
                        UtcOffset::UTC,
                    );
                    file.set_modified(datetime.into())?;
                }
            }
        }

        info!("Skipped {} unchanged files", skipped);

        Ok(())
    }
}

fn main() -> Result<()> {
    tracing_subscriber::fmt::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .with_span_events(FmtSpan::CLOSE | FmtSpan::ENTER)
        .init();

    let args = Args::parse();

    if let Err(e) = std::fs::create_dir_all(&args.output) {
        if e.kind() != std::io::ErrorKind::AlreadyExists {
            return Err(e.into());
        }
    }

    let mut builder = Builder::new(
        dunce::canonicalize(&args.input).wrap_err("resolving input dir")?,
        dunce::canonicalize(args.output).wrap_err("resolving output dir")?,
        dunce::canonicalize(args.image_manifest).wrap_err("resolving image manifest")?,
        args.draft,
    )?;

    builder.load()?;
    builder.generate()?;
    builder.output()?;

    if args.watch {
        info!("Watching for changes... ");
        let (tx, rx) = std::sync::mpsc::channel();
        let mut debouncer = new_debouncer(
            Duration::from_millis(500),
            None,
            move |result: DebounceEventResult| {
                _ = tx.send(result);
            },
        )?;

        debouncer.watch(&args.input, notify::RecursiveMode::Recursive)?;

        for res in rx {
            let update = || -> Result<()> {
                let evs = res.map_err(|e| eyre!("watch error: {e:#?}"))?;
                for ev in evs {
                    info!("File {:?}: {}", ev.event.kind, ev.event.paths[0].display());
                    let kind = ev.event.kind;
                    let path = ev.event.paths.into_iter().next().unwrap();

                    if path.extension() == Some(OsStr::new("md")) {
                        match kind {
                            EventKind::Create(CreateKind::File) => {
                                builder.file_created(path)?;
                            }
                            EventKind::Modify(_) => {
                                builder.file_modified(path)?;
                            }
                            EventKind::Remove(RemoveKind::File) => {
                                builder.file_removed(&path)?;
                            }
                            EventKind::Access(_) | EventKind::Create(_) | EventKind::Remove(_) => {}
                            other => warn!("unhandled event: {:?}", other),
                        }
                    } else if path.file_name() == Some(OsStr::new("bibliography.yaml")) {
                        builder.load_bib()?;
                    }
                }

                builder.generate()?;
                builder.output()?;
                Ok(())
            };

            if let Err(e) = update() {
                error!("Error (will continue): {e:#}");
            }
        }
    } else {
        info!("Done!");
    }

    Ok(())
}
