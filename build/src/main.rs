#![recursion_limit = "512"]

use std::{
    borrow::{Borrow, Cow},
    collections::{BTreeMap, HashSet},
    ffi::OsStr,
    path::{Path, PathBuf},
    process::{self},
    str::FromStr,
    sync::LazyLock,
    time::Duration,
};

use bib_render::RenderedBibliography;
use clap::Parser;
use eyre::{bail, eyre, Context, ContextCompat, OptionExt, Result};
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
use tracing::{debug, error, info, warn};
use tracing_subscriber::{fmt::format::FmtSpan, EnvFilter};
use url::Url;
use walkdir::WalkDir;

mod bib_render;
mod bib_to_csl;
mod bibliography;
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
        builder.add_allowed_classes("span", ["noun"]);
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

        let title = sanitized_html(&raw_title);
        let title_string = string_value_of_html(&raw_title);

        let title_lang = take_header(header, "titleLang").into_string();

        let original_title = take_header(header, "originalTitle")
            .into_string()
            .map(maud::PreEscaped); // TODO: html sanitization

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
    date_created: Option<time::Date>,
    draft: bool,
    order: Option<String>,
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
    // size → URL
    sizes: Option<BTreeMap<usize, String>>,
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

        self.articles = self.load_files("articles")?;
        self.games = self.load_files("games")?;

        info!(
            "Loaded {} articles, {} games",
            self.articles.len(),
            self.games.len()
        );

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
            Ok(rel.replace("\\", "/"))
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
    ) -> Result<()> {
        output_files.extend([
            self.generate_article(
                &self.load_file::<ArticleHeader>(self.base_path.join("about.md"))?,
                url_lookup,
                None,
            )?,
            self.generate_article(
                &self.load_file::<ArticleHeader>(self.base_path.join("see-also.md"))?,
                url_lookup,
                None,
            )?,
            self.templater
                .bibliography(&self.rendered_bibliography)
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
        ]);

        Ok(())
    }

    fn generate_article<T>(
        &self,
        article: &File<T>,
        url_lookup: &BTreeMap<String, Option<&str>>,
        article_tree: Option<&ArticleNode>,
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

            children = templates::render_article_tree(&article.url_path, tree);
            prev_next = templates::render_prev_next(prev_sibling, next_sibling);
        }

        self.templater
            .article(article, content, &breadcrumbs, children, prev_next)
            .wrap_err("templating article")
    }

    fn generate(&mut self) -> Result<()> {
        let old_outputs = std::mem::take(&mut self.output_files);
        let url_lookup = self.build_url_lookup()?;
        let old_outputs_map: BTreeMap<Cow<'static, str>, Markup> = old_outputs
            .into_iter()
            .map(|o| (o.url_path, o.content))
            .collect();

        let article_tree = self.build_article_tree()?;

        let articles = self
            .articles
            .par_iter()
            .filter(|a| !a.is_draft() || self.output_drafts)
            .map(|article| {
                self.generate_article(article, &url_lookup, Some(&article_tree))
                    .wrap_err_with(|| eyre!("couldn’t export {}", article.file_path.display()))
            });

        let games = self
            .games
            .par_iter()
            .filter(|a| !a.is_draft() || self.output_drafts)
            .map(|game| {
                self.generate_article(game, &url_lookup, None)
                    .wrap_err_with(|| eyre!("couldn’t export {}", game.file_path.display()))
            });

        let mut output_files = articles.chain(games).collect::<Result<Vec<_>>>()?;

        self.generate_other_files(&mut output_files, &url_lookup)?;
        self.output_files.extend(output_files);

        for file in &mut self.output_files {
            if let Some(old) = old_outputs_map.get(&file.url_path) {
                if old.0 == file.content.0 {
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

            let output_path = self
                .output_path
                .join(output_file.url_path.trim_start_matches('/'))
                .join("index.html");

            let content = &output_file.content;
            std::fs::create_dir_all(output_path.parent().unwrap())?;
            debug!("Writing to {}", dunce::simplified(&output_path).display());
            std::fs::write(output_path, &content.0)?;
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
            match res {
                Ok(evs) => {
                    for ev in evs {
                        info!("Event: {:?}", ev);
                        let kind = ev.event.kind;
                        let path = ev.event.paths.into_iter().next().unwrap();
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
                    }
                }
                Err(errs) => {
                    for e in errs {
                        error!("watch error: {e:#}");
                    }
                }
            }

            builder.generate()?;
            builder.output()?;
        }
    } else {
        info!("Done!");
    }

    Ok(())
}
