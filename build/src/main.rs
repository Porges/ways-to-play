#![recursion_limit = "512"]

use std::{
    collections::{BTreeMap, HashMap},
    ffi::OsStr,
    io::Write,
    path::{Path, PathBuf},
    sync::Arc,
    time::Duration,
};

use clap::Parser;
use eyre::{eyre, Context, Result};
use jiff::{civil::Time, tz::TimeZone};
use notify::EventKind;
use notify_debouncer_full::{new_debouncer, DebounceEventResult};
use salsa::Setter;
use tracing::{debug, error, info, warn};
use tracing_subscriber::{fmt::format::FmtSpan, EnvFilter};
use url::Url;
use walkdir::WalkDir;

mod bib_render;
mod bib_to_csl;
mod bibliography;
pub mod db;
mod intl;
mod mdast_to_html;
mod nvec;
pub mod templates;

use db::{
    all_articles, bibliography_page, games_index, names_index, sitemap, welcome,
    BibliographySource, BuildConfig, Database, FileKind, ImageManifestSource, OutputPage,
    SourceFile, SourceSet,
};
pub use db::{html_without_tags, sanitized_html, ImageManifest, ImageManifestEntry};

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    #[arg(short, long, value_name = "INPUT_DIR")]
    input: PathBuf,

    #[arg(short, long, value_name = "OUTPUT_DIR")]
    output: PathBuf,

    #[arg(long, value_name = "IMAGE_MANIFEST")]
    image_manifest: PathBuf,

    #[arg(short, long)]
    draft: bool,

    #[arg(short, long)]
    watch: bool,
}

fn classify_path(rel_path: &Path) -> Option<FileKind> {
    if rel_path.starts_with("articles") {
        Some(FileKind::Article)
    } else if rel_path.starts_with("games") {
        Some(FileKind::Game)
    } else if rel_path == Path::new("about.md") {
        Some(FileKind::About)
    } else if rel_path == Path::new("see-also.md") {
        Some(FileKind::SeeAlso)
    } else {
        None
    }
}

fn load_source_files(db: &Database, base_path: &Path) -> Result<BTreeMap<PathBuf, SourceFile>> {
    let mut files = BTreeMap::new();
    let md_ext = Some(OsStr::new("md"));

    for entry in WalkDir::new(base_path) {
        let entry = entry?;
        if entry.file_type().is_file() && entry.path().extension() == md_ext {
            let abs_path = entry.into_path();
            let Ok(rel_path) = abs_path.strip_prefix(base_path) else {
                continue;
            };

            if let Some(kind) = classify_path(rel_path) {
                let text = std::fs::read_to_string(&abs_path)
                    .wrap_err_with(|| eyre!("reading {}", abs_path.display()))?;
                let file = SourceFile::new(db, rel_path.to_path_buf(), kind, text);
                files.insert(rel_path.to_path_buf(), file);
            }
        }
    }

    Ok(files)
}

fn make_ordered_file_list(db: &Database, files: &BTreeMap<PathBuf, SourceFile>) -> Vec<SourceFile> {
    let mut article_files = Vec::new();
    let mut game_files = Vec::new();
    let mut other_files = Vec::new();

    for file in files.values() {
        match file.kind(db) {
            FileKind::Article => article_files.push(*file),
            FileKind::Game => game_files.push(*file),
            FileKind::About | FileKind::SeeAlso => other_files.push(*file),
        }
    }

    let mut ordered = article_files;
    ordered.extend(game_files);
    ordered.extend(other_files);
    ordered
}

fn generate_and_output(
    db: &Database,
    source_set: SourceSet,
    bib_source: BibliographySource,
    manifest_source: ImageManifestSource,
    config: BuildConfig,
    output_path: &Path,
    previous_outputs: &mut HashMap<String, Vec<u8>>,
) -> Result<()> {
    let articles =
        all_articles(db, source_set, bib_source, manifest_source, config).map_err(|e| eyre!(e))?;
    let bib_page = bibliography_page(db, source_set, bib_source, manifest_source, config)
        .map_err(|e| eyre!(e))?;
    let welcome_page =
        welcome(db, source_set, bib_source, manifest_source, config).map_err(|e| eyre!(e))?;
    let games_page = games_index(db, source_set, config).map_err(|e| eyre!(e))?;
    let names_page =
        names_index(db, source_set, bib_source, manifest_source, config).map_err(|e| eyre!(e))?;
    let sitemap_page =
        sitemap(db, source_set, bib_source, manifest_source, config).map_err(|e| eyre!(e))?;

    let mut all_pages: Vec<Arc<OutputPage>> = Vec::new();
    all_pages.extend(articles.iter().cloned());
    all_pages.push(bib_page);
    all_pages.push(welcome_page);
    all_pages.push(games_page);
    all_pages.push(names_page);
    all_pages.push(sitemap_page);

    info!(
        "Generating {} outputs in {}",
        all_pages.len(),
        dunce::simplified(output_path).display()
    );

    let mut skipped = 0;
    for page in &all_pages {
        if let Some(old_content) = previous_outputs.get(&page.url_path) {
            if old_content == &page.content {
                skipped += 1;
                continue;
            }
        }

        let out_file_path = if page.url_path.ends_with('/') {
            output_path
                .join(page.url_path.trim_start_matches('/'))
                .join("index.html")
        } else {
            output_path.join(page.url_path.trim_start_matches('/'))
        };

        if let Some(parent) = out_file_path.parent() {
            std::fs::create_dir_all(parent)?;
        }

        // Also check if file on disk already has identical content
        if let Ok(existing) = std::fs::read(&out_file_path) {
            if existing == page.content {
                previous_outputs.insert(page.url_path.clone(), page.content.clone());
                skipped += 1;
                continue;
            }
        }

        debug!("Writing to {}", dunce::simplified(&out_file_path).display());
        let mut f = std::fs::File::create(&out_file_path)
            .wrap_err_with(|| eyre!("creating file {}", out_file_path.display()))?;
        f.write_all(&page.content)?;
        if let Some(mod_date) = page.last_modified {
            let datetime = mod_date
                .to_datetime(Time::midnight())
                .to_zoned(TimeZone::UTC)
                .unwrap();
            f.set_modified(datetime.into())?;
        }

        previous_outputs.insert(page.url_path.clone(), page.content.clone());
    }

    info!("Skipped {} unchanged files", skipped);
    Ok(())
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

    let base_path = dunce::canonicalize(&args.input).wrap_err("resolving input dir")?;
    let output_path = dunce::canonicalize(&args.output).wrap_err("resolving output dir")?;
    let manifest_path =
        dunce::canonicalize(&args.image_manifest).wrap_err("resolving image manifest")?;

    let bib_target = base_path.join("bibliography.yaml");
    let bib_text = std::fs::read_to_string(&bib_target).wrap_err("opening bibliography.yaml")?;
    let bib_parsed: bibliography::Bibliography =
        serde_saphyr::from_str(&bib_text).wrap_err("parsing bibliography.yaml")?;
    info!(
        "Loaded bibliography ({} entries)",
        bib_parsed.references.len()
    );

    let csl = bib_to_csl::to_csl(&bib_parsed);
    info!("Writing CSL for Obsidian plugin");
    std::fs::write(base_path.join("../bib.json"), csl.to_string())?;

    let manifest_json =
        std::fs::read_to_string(&manifest_path).wrap_err("loading image manifest")?;

    let url = if !args.draft {
        "https://games.porg.es/"
    } else {
        "http://127.0.0.1:8080/"
    };

    let mut db = Database::default();
    let bib_source = BibliographySource::new(&db, bib_text);
    let manifest_source = ImageManifestSource::new(&db, manifest_json);
    let config = BuildConfig::new(
        &db,
        base_path.clone(),
        output_path.clone(),
        args.draft,
        Url::parse(url).unwrap(),
    );

    let mut files_map = load_source_files(&db, &base_path)?;
    let ordered_files = make_ordered_file_list(&db, &files_map);
    let source_set = SourceSet::new(&db, ordered_files);

    let mut previous_outputs = HashMap::new();
    generate_and_output(
        &db,
        source_set,
        bib_source,
        manifest_source,
        config,
        &output_path,
        &mut previous_outputs,
    )?;

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

        debouncer.watch(&base_path, notify::RecursiveMode::Recursive)?;
        debouncer.watch(&manifest_path, notify::RecursiveMode::NonRecursive)?;

        for res in rx {
            let update = || -> Result<()> {
                let evs = res.map_err(|e| eyre!("watch error: {e:#?}"))?;
                let mut source_set_changed = false;

                for ev in evs {
                    let kind = ev.event.kind;
                    let Some(raw_path) = ev.event.paths.into_iter().next() else {
                        warn!("watch event {:?} had no paths", kind);
                        continue;
                    };
                    let path = dunce::canonicalize(&raw_path).unwrap_or(raw_path);
                    info!("File {:?}: {}", kind, path.display());

                    if path.extension() == Some(OsStr::new("md")) {
                        let Ok(rel_path) = path.strip_prefix(&base_path) else {
                            continue;
                        };
                        match kind {
                            EventKind::Create(_) => {
                                if let Some(file_kind) = classify_path(rel_path) {
                                    let text = std::fs::read_to_string(&path)
                                        .wrap_err_with(|| eyre!("reading {}", path.display()))?;
                                    let source_file = SourceFile::new(
                                        &db,
                                        rel_path.to_path_buf(),
                                        file_kind,
                                        text,
                                    );
                                    files_map.insert(rel_path.to_path_buf(), source_file);
                                    source_set_changed = true;
                                }
                            }
                            EventKind::Modify(_) => {
                                if let Some(source_file) = files_map.get(rel_path) {
                                    let text = std::fs::read_to_string(&path)
                                        .wrap_err_with(|| eyre!("reading {}", path.display()))?;
                                    source_file.set_text(&mut db).to(text);
                                } else if let Some(file_kind) = classify_path(rel_path) {
                                    let text = std::fs::read_to_string(&path)
                                        .wrap_err_with(|| eyre!("reading {}", path.display()))?;
                                    let source_file = SourceFile::new(
                                        &db,
                                        rel_path.to_path_buf(),
                                        file_kind,
                                        text,
                                    );
                                    files_map.insert(rel_path.to_path_buf(), source_file);
                                    source_set_changed = true;
                                }
                            }
                            EventKind::Remove(_) => {
                                if files_map.remove(rel_path).is_some() {
                                    source_set_changed = true;
                                }
                            }
                            EventKind::Access(_) => {}
                            other => warn!("unhandled event: {:?}", other),
                        }
                    } else if path.file_name() == Some(OsStr::new("bibliography.yaml")) {
                        let text = std::fs::read_to_string(&path)
                            .wrap_err_with(|| eyre!("reading {}", path.display()))?;
                        bib_source.set_text(&mut db).to(text.clone());
                        if let Ok(bib_parsed) =
                            serde_saphyr::from_str::<bibliography::Bibliography>(&text)
                        {
                            let csl = bib_to_csl::to_csl(&bib_parsed);
                            std::fs::write(base_path.join("../bib.json"), csl.to_string())?;
                        }
                    } else if path == manifest_path {
                        let json = std::fs::read_to_string(&path)
                            .wrap_err_with(|| eyre!("reading {}", path.display()))?;
                        manifest_source.set_json(&mut db).to(json);
                    }
                }

                if source_set_changed {
                    let ordered = make_ordered_file_list(&db, &files_map);
                    source_set.set_files(&mut db).to(ordered);
                }

                generate_and_output(
                    &db,
                    source_set,
                    bib_source,
                    manifest_source,
                    config,
                    &output_path,
                    &mut previous_outputs,
                )?;
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

#[cfg(test)]
mod sanitization_tests {
    use super::*;

    #[test]
    pub fn test_sanitized_html() {
        assert_eq!(
            sanitized_html("simple <a href='something'>link</a>").0,
            "simple <a href=\"something\" rel=\"noopener noreferrer\">link</a>"
        );
    }

    #[test]
    pub fn test_html_without_tags() {
        assert_eq!(
            html_without_tags("simple <a href='something'>link</a>").0,
            "simple link"
        );
    }
}
