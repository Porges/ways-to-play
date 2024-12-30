use serde_json::Value;

use crate::bibliography::{Bibliography, Reference};

// Downlevels my fancy bibliography to something vaguely CSL-compatible.
pub fn to_csl(bib: &Bibliography) -> Value {
    let mut result: Vec<Value> = Vec::new();

    for (key, entry) in bib.references.iter() {
        let mut obj = serde_json::Map::new();
        obj.insert("id".to_string(), key.as_str().into());
        obj.insert(
            "title".to_string(),
            entry.common().title.value.as_str().into(),
        );
        obj.insert(
            "author".to_string(),
            entry
                .common()
                .author
                .iter()
                .map(|a| {
                    let mut obj = serde_json::Map::new();
                    obj.insert("family".to_string(), a.family.clone().into());
                    obj.insert("given".to_string(), a.given.clone().into());
                    obj
                })
                .collect::<Vec<_>>()
                .into(),
        );

        match entry {
            Reference::JournalArticle(journal_article) => {
                obj.insert("type".to_string(), "article-journal".into());
                obj.insert(
                    "issued".to_string(),
                    journal_article.periodical.issued.to_iso().into(),
                );
            }
            Reference::NewspaperArticle(newspaper_article) => {
                obj.insert("type".to_string(), "article-newspaper".into());
                obj.insert(
                    "issued".to_string(),
                    newspaper_article.periodical.issued.to_iso().into(),
                );
            }
            Reference::MagazineArticle(magazine_article) => {
                obj.insert("type".to_string(), "article-magazine".into());
                obj.insert(
                    "issued".to_string(),
                    magazine_article.periodical.issued.to_iso().into(),
                );
            }
            Reference::Book(book) => {
                obj.insert("type".to_string(), "book".into());
                obj.insert(
                    "issued".to_string(),
                    book.issued.as_ref().map(|d| d.to_iso()).into(),
                );
            }
            Reference::Chapter(chapter) => {
                obj.insert("type".to_string(), "chapter".into());
                obj.insert(
                    "issued".to_string(),
                    chapter.book.issued.as_ref().map(|d| d.to_iso()).into(),
                );
            }
            Reference::Document(document) => {
                obj.insert("type".to_string(), "document".into());
            }
            Reference::WebPage(web_page) => {
                obj.insert("type".to_string(), "webpage".into());
            }
            Reference::Thesis(thesis) => {
                obj.insert("type".to_string(), "thesis".into());
            }
            Reference::ConferencePaper(conference_paper) => {
                obj.insert("type".to_string(), "paper-conference".into());
                obj.insert(
                    "issued".to_string(),
                    conference_paper
                        .book
                        .issued
                        .as_ref()
                        .map(|d| d.to_iso())
                        .into(),
                );
            }
            Reference::Patent(patent) => {
                obj.insert("type".to_string(), "patent".into());
            }
        }

        result.push(obj.into());
    }

    result.into()
}
