#![recursion_limit = "512"]

use std::{
    borrow::{Borrow, Cow},
    collections::{BTreeMap, HashSet},
    ffi::OsStr,
    path::{Path, PathBuf},
    process::{self},
    str::FromStr,
    vec,
};

use bib_render::RenderedBibliography;
use clap::Parser;
use eyre::{bail, eyre, Context, ContextCompat, OptionExt, Result};
use markdown::{mdast, ParseOptions};
use maud::Markup;
use serde::Deserialize;
use templates::{ArticleMetadata, BaseMetadata, GameMetadata, OutputFile, Templater};
use tracing::{debug, info, warn};
use tracing_subscriber::{fmt::format::FmtSpan, EnvFilter};
use url::Url;

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

impl YamlHeader for ArticleHeader {
    fn from_header(header: &mut Header) -> Result<Self> {
        let ymd = time::macros::format_description!("[year]-[month]-[day]");

        let title = take_header(header, "title")
            .into_string()
            .ok_or_eyre("missing title")?;

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

        Ok(ArticleHeader {
            title,
            title_lang,
            original_title,
            date_modified,
            date_created,
            draft,
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
    title: String,
    title_lang: Option<String>,
    original_title: Option<Markup>,
    date_modified: Option<time::Date>,
    date_created: Option<time::Date>,
    draft: bool,
}

impl<T: Borrow<ArticleHeader>> BaseMetadata for File<T> {
    fn title(&self) -> &str {
        &self.metadata.borrow().title
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
    name: Option<&'a str>,
    children: ArticleTree<'a>,
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

    templater: Templater,

    rendered_bibliography: RenderedBibliography,

    articles: Vec<File<ArticleHeader>>,
    games: Vec<File<GameHeader>>,
    images: ImageManifest,
    output_files: Vec<OutputFile>,

    parse_options: ParseOptions,
}

impl Builder {
    fn new(base_path: PathBuf, output_path: PathBuf, image_manifest: PathBuf) -> Result<Self> {
        let manifest =
            std::fs::read_to_string(image_manifest).wrap_err("loading image manifest")?;
        let images = serde_json::de::from_str(&manifest).wrap_err("parsing image manifest")?;

        let mut parse_options = ParseOptions::default();
        parse_options.constructs.frontmatter = true;
        parse_options.constructs.gfm_strikethrough = true;
        parse_options.constructs.gfm_table = true;
        parse_options.constructs.gfm_footnote_definition = true;
        parse_options.constructs.gfm_label_start_footnote = true;
        parse_options.constructs.html_flow = false;
        parse_options.constructs.html_text = false;
        parse_options.constructs.mdx_jsx_flow = true;
        parse_options.constructs.mdx_jsx_text = true;

        Ok(Self {
            base_path,
            output_path,
            templater: Templater::new(Url::parse("https://games.porg.es/").unwrap()),
            articles: Vec::new(),
            games: Vec::new(),
            output_files: Vec::new(),
            rendered_bibliography: RenderedBibliography::default(),
            images,
            parse_options,
        })
    }

    fn load(&mut self, drafts: bool, file_filter: &dyn Fn(&Path) -> bool) -> Result<()> {
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

        self.articles = self.load_files("articles", drafts, file_filter)?;
        self.games = self.load_files("games", drafts, file_filter)?;

        info!(
            "Loaded {} articles, {} games",
            self.articles.len(),
            self.games.len()
        );

        Ok(())
    }

    fn load_files<M: YamlHeader>(
        &self,
        rel: &str,
        drafts: bool,
        filter: &dyn Fn(&Path) -> bool,
    ) -> Result<Vec<File<M>>> {
        let mut to_visit = vec![self.base_path.join(rel)];

        let mut result = Vec::new();

        while let Some(dir) = to_visit.pop() {
            let dir = std::fs::read_dir(dir)?;
            for entry in dir {
                let entry = entry?;
                if entry.file_type()?.is_dir() {
                    to_visit.push(entry.path());
                } else {
                    let entry_path = entry.path();
                    if entry_path.extension() == Some(OsStr::new("md")) {
                        if !filter(&entry_path) {
                            debug!("Skipping non-modified file {}", entry_path.display());
                            continue;
                        }

                        result.push(self.load_file(entry_path)?);
                    }
                }
            }
        }

        Ok(result)
    }

    fn load_file<M: YamlHeader>(&self, file_path: PathBuf) -> Result<File<M>> {
        let data = std::fs::read_to_string(&file_path)?;
        // normal markdown cannot cause syntax errors
        let content = markdown::to_mdast(&data, &self.parse_options)
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
        }

        Ok(tree)
    }

    fn generate_other_files(&mut self) -> Result<()> {
        self.output_files.extend([
            self.generate_article(
                &self.load_file::<ArticleHeader>(self.base_path.join("about.md"))?,
                None,
            )?,
            self.templater
                .bibliography(&self.rendered_bibliography)
                .wrap_err("generating bibliography")?,
            self.templater
                .welcome()
                .wrap_err("generating welcome page")?,
            self.templater
                .games(&self.games)
                .wrap_err("generating games page")?,
        ]);

        Ok(())
    }

    fn generate_article<T>(
        &self,
        article: &File<T>,
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
        )
        .wrap_err("rendering HTML")?;

        let mut breadcrumbs = Vec::new();
        if let Some(mut tree) = article_tree {
            for part in article.url_path.trim_matches('/').split('/') {
                tree = tree
                    .children
                    .get(part)
                    .wrap_err_with(|| eyre!("missing parent article `{part}`"))?;

                breadcrumbs.push((part, tree.name));
            }
        }

        self.templater
            .article(article, content, &breadcrumbs)
            .wrap_err("templating article")
    }

    fn generate(&mut self) -> Result<()> {
        let mut output_files = Vec::new();
        let article_tree = self.build_article_tree()?;

        for article in &self.articles {
            let output = self
                .generate_article(article, Some(&article_tree))
                .wrap_err_with(|| eyre!("couldn’t export {}", article.file_path.display()))?;

            output_files.push(output);
        }

        for game in &self.games {
            let output = self
                .generate_article(game, None)
                .wrap_err_with(|| eyre!("couldn’t export {}", game.file_path.display()))?;

            output_files.push(output);
        }

        self.output_files.extend(output_files);
        self.generate_other_files()?;
        Ok(())
    }

    fn output(self) -> Result<()> {
        info!(
            "Generating {} outputs in {}",
            self.output_files.len(),
            dunce::simplified(&self.output_path).display()
        );

        for output_file in self.output_files {
            let output_path = self
                .output_path
                .join(output_file.url_path.trim_start_matches('/'))
                .join("index.html");
            let content = output_file.content.into_string();

            std::fs::create_dir_all(output_path.parent().unwrap())?;

            debug!("Writing to {}", dunce::simplified(&output_path).display());
            std::fs::write(output_path, &content)?;
        }

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
        dunce::canonicalize(args.input)?,
        dunce::canonicalize(args.output)?,
        dunce::canonicalize(args.image_manifest)?,
    )?;

    let file_filter: Box<dyn Fn(&Path) -> bool> =
        if let Ok(events_path) = std::env::var("WATCHEXEC_EVENTS_FILE") {
            debug!("Reading changed files: {}", events_path);

            let hash_set: HashSet<PathBuf> = std::fs::read_to_string(events_path)?
                .lines()
                .filter_map(|l| Some(PathBuf::from(l.split_once(':')?.1)))
                .collect();

            if !hash_set.is_empty() {
                info!(
                    "Rebuilding {} modified files: {:?}",
                    hash_set.len(),
                    hash_set
                );

                Box::new(move |p: &Path| hash_set.contains(p))
            } else {
                info!("No modified files, exiting");
                return Ok(());
            }
        } else {
            Box::new(|_: &Path| true)
        };

    builder.load(args.draft, &file_filter)?;
    builder.generate()?;
    builder.output()?;

    info!("Done!");

    Ok(())
}
