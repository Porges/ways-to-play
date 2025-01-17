#![recursion_limit = "512"]

use std::{collections::BTreeMap, error::Error, ffi::OsStr, path::PathBuf, process, vec};

use bib_render::RenderedBibliography;
use bibliography::Bibliography;
use clap::Parser;
use eyre::{bail, eyre, Context, ContextCompat, Result};
use markdown::{mdast, ParseOptions};
use maud::Markup;
use serde::Deserialize;

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
}

struct File {
    file_path: PathBuf,
    url_path: String,
    content: mdast::Node,
    header: saphyr::Yaml,
}

struct OtherFile {
    url_path: String,
    content: Markup,
    header: saphyr::Yaml,
}

#[derive(Default, Debug)]
struct ArticleNode {
    name: Option<String>,
    children: ArticleTree,
}

type ArticleTree = BTreeMap<String, ArticleNode>;

type ImageManifest = BTreeMap<String, ImageManifestEntry>;

#[derive(Deserialize)]
struct ImageManifestEntry {
    hash: String,
    height: usize,
    width: usize,
    url: String,
}

struct Builder {
    base_path: PathBuf,
    output_path: PathBuf,

    bibliography: Bibliography,
    articles: Vec<File>,
    games: Vec<File>,
    images: ImageManifest,
    other_files: Vec<OtherFile>,
}

impl Builder {
    fn new(base_path: PathBuf, output_path: PathBuf, image_manifest: PathBuf) -> Result<Self> {
        let manifest =
            std::fs::read_to_string(image_manifest).wrap_err("loading image manifest")?;
        let images = serde_json::de::from_str(&manifest).wrap_err("parsing image manifest")?;
        Ok(Self {
            base_path,
            output_path,
            articles: Vec::new(),
            games: Vec::new(),
            other_files: Vec::new(),
            bibliography: Bibliography::default(),
            images,
        })
    }

    fn load(&mut self) -> Result<(), Box<dyn Error>> {
        let target_bib = self.base_path.join("bibliography.yaml");

        let converted_bib = process::Command::new("yq")
            .args([OsStr::new("-o"), OsStr::new("json"), target_bib.as_os_str()])
            .output()?;

        self.bibliography = serde_json::from_slice(&converted_bib.stdout)?;

        let csl = bib_to_csl::to_csl(&self.bibliography);
        std::fs::write(self.base_path.join("../bib.json"), csl.to_string())?;

        self.articles = self.load_files("articles")?;
        self.games = self.load_files("games")?;

        Ok(())
    }

    fn load_files(&self, rel: &str) -> Result<Vec<File>, Box<dyn Error>> {
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
                        let data = std::fs::read_to_string(&entry_path)?;
                        // normal markdown cannot cause syntax errors
                        let content = markdown::to_mdast(&data, &parse_options)
                            .map_err(|e| format!("couldn't parse {}: {e}", entry_path.display()))
                            .unwrap();
                        let header = mdast_to_html::get_header(&content).unwrap();
                        let yaml_header = saphyr::Yaml::load_from_str(&header.value)
                            .unwrap()
                            .into_iter()
                            .next()
                            .unwrap();

                        if yaml_header["draft"].as_bool().unwrap_or(false) {
                            continue;
                        }

                        let rel_path = entry_path.strip_prefix(&self.base_path)?;

                        let mut url_path = rel_path.with_extension("");

                        // folder note handling:
                        if url_path.file_name() == url_path.parent().and_then(|p| p.file_name()) {
                            url_path.pop();
                        }

                        let url_path = url_path.to_string_lossy().replace('\\', "/") + "/";

                        result.push(File {
                            file_path: entry_path,
                            url_path,
                            content,
                            header: yaml_header,
                        });
                    }
                }
            }
        }

        Ok(result)
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

            node.name = article.header["title"].as_str().map(|s| s.to_string());
        }

        Ok(tree)
    }

    fn prepare_other_files(&mut self) -> Result<(), Box<dyn Error>> {
        self.other_files.extend([
            OtherFile {
                url_path: "about".to_string(),
                content: templates::about("about"),
                header: saphyr::Yaml::Null,
            },
            OtherFile {
                url_path: "bibliography".to_string(),
                content: templates::bibliography("bibliography", &self.bibliography),
                header: saphyr::Yaml::Null,
            },
            OtherFile {
                url_path: "".to_string(),
                content: templates::welcome(""),
                header: saphyr::Yaml::Null,
            },
        ]);

        Ok(())
    }

    fn export_article(
        &self,
        article: File,
        rendered_bib: &RenderedBibliography,
        article_tree: Option<&ArticleNode>,
    ) -> Result<()> {
        let content = mdast_to_html::to_html(
            &self.base_path,
            &article.file_path,
            article.content,
            rendered_bib,
            &self.images,
        )
        .wrap_err("rendering HTML")?;

        let mut output_path = self.output_path.join(&article.url_path);
        if output_path.file_name() != Some(OsStr::new("index")) {
            output_path.push("index.html");
        } else {
            output_path.set_extension("html");
        }

        let mut breadcrumbs = Vec::new();
        if let Some(mut tree) = article_tree {
            for part in article.url_path.trim_matches('/').split('/') {
                tree = tree
                    .children
                    .get(part)
                    .wrap_err_with(|| eyre!("missing parent article `{part}`"))?;

                breadcrumbs.push((part, tree.name.as_deref()));
            }
        }

        let templated = templates::article(
            article.header["title"].as_str().unwrap_or_default(),
            article.header["titleLang"].as_str(),
            article.header["originalTitle"].as_str(),
            "https://games.porg.es/",
            &article.url_path,
            &breadcrumbs,
            content,
            article.header["date modified"]
                .as_str()
                .map(|s| {
                    time::Date::parse(s, time::macros::format_description!("[year]-[month]-[day]"))
                })
                .transpose()
                .wrap_err("parsing 'date modified'")?,
        );

        let content = templated.wrap_err("templating content")?.into_string();
        std::fs::create_dir_all(output_path.parent().unwrap())?;
        std::fs::write(output_path, &content)?;
        Ok(())
    }

    fn generate(mut self) -> Result<(), Box<dyn Error>> {
        println!("Generating outputs in {}", self.output_path.display());

        let article_tree = self.build_article_tree()?;
        let rendered_bib = bib_render::to_rendered(&self.bibliography);

        for article in std::mem::take(&mut self.articles) {
            let path = article.file_path.clone();
            self.export_article(article, &rendered_bib, Some(&article_tree))
                .wrap_err_with(|| eyre!("couldn’t export {}", path.display()))?;
        }

        for article in std::mem::take(&mut self.games) {
            let path = article.file_path.clone();
            self.export_article(article, &rendered_bib, None)
                .wrap_err_with(|| eyre!("couldn’t export {}", path.display()))?;
        }

        for other_file in self.other_files {
            let output_path = self
                .output_path
                .join(&other_file.url_path)
                .join("index.html");
            let content = other_file.content.into_string();
            std::fs::create_dir_all(output_path.parent().unwrap())?;
            std::fs::write(output_path, &content)?;
        }

        Ok(())
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let args = Args::parse();

    if let Err(e) = std::fs::create_dir_all(&args.output) {
        if e.kind() != std::io::ErrorKind::AlreadyExists {
            return Err(e.into());
        }
    }

    let mut builder = Builder::new(
        args.input.canonicalize()?,
        args.output.canonicalize()?,
        args.image_manifest.canonicalize()?,
    )?;

    builder.load()?;
    builder.prepare_other_files()?;
    builder.generate()?;

    Ok(())
}
