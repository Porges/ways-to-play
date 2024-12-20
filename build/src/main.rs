#![recursion_limit = "512"]

use std::{error::Error, ffi::OsStr, path::PathBuf, process, vec};

use bibliography::Bibliography;
use clap::Parser;
use clio::ClioPath;
use markdown::{mdast, ParseOptions};

mod bib_render;
mod bibliography;
mod mdast_to_html;
mod nvec;
mod templates;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    #[arg(
        value_name = "INPUT_DIR",
        value_parser = clap::value_parser!(ClioPath).exists().is_dir(),
        default_value = "src",
    )]
    input_path: ClioPath,

    #[arg(
        value_name = "OUTPUT_DIR",
        value_parser = clap::value_parser!(ClioPath).is_dir(),
        default_value = "public",
    )]
    output_path: ClioPath,
}

struct File {
    url_path: String,
    content: mdast::Node,
    header: saphyr::Yaml,
}

struct Builder {
    base_path: PathBuf,
    output_path: PathBuf,

    bibliography: Bibliography,
    articles: Vec<File>,
    games: Vec<File>,
}

impl Builder {
    fn new(base_path: PathBuf, output_path: PathBuf) -> Self {
        Self {
            base_path,
            output_path,
            articles: Vec::new(),
            games: Vec::new(),
            bibliography: Bibliography::default(),
        }
    }

    fn load(&mut self) -> Result<(), Box<dyn Error>> {
        let target_bib = self.base_path.join("bibliography.yaml");

        let converted_bib = process::Command::new("yq")
            .args([OsStr::new("-o"), OsStr::new("json"), target_bib.as_os_str()])
            .output()?;

        self.bibliography = serde_json::from_slice(&converted_bib.stdout)?;

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
                        println!("{:?}", yaml_header);
                        result.push(File {
                            url_path: entry_path
                                .strip_prefix(&self.base_path)?
                                .with_extension("")
                                .to_string_lossy()
                                .replace('\\', "/")
                                + "/",
                            content,
                            header: yaml_header,
                        });
                    }
                }
            }
        }

        Ok(result)
    }

    fn generate(self) -> Result<(), Box<dyn Error>> {
        println!("Generating outputs in {}", self.output_path.display());

        for article in self.articles.into_iter().chain(self.games.into_iter()) {
            let content = mdast_to_html::to_html(article.content);
            // let html = templates::article(&content);
            //
            let mut path = self.output_path.join(&article.url_path);
            if path.file_name() != Some(OsStr::new("index")) {
                path.push("index.htm");
            } else {
                path.set_extension("htm");
            }

            let templated = templates::base(
                article.header["title"].as_str().unwrap_or_default(),
                article.header["titleLang"].as_str(),
                article.header["originalTitle"].as_str(),
                "https://games.porg.es/",
                &article.url_path,
                content,
            );

            let content = templated.into_string();
            std::fs::create_dir_all(path.parent().unwrap())?;
            std::fs::write(path, &content)?;
        }

        Ok(())
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let args = Args::parse();

    std::fs::create_dir(args.output_path.path())?;

    let mut builder = Builder::new(
        args.input_path.path().canonicalize()?,
        args.output_path.path().canonicalize()?,
    );

    builder.load()?;
    builder.generate()?;

    Ok(())
}
