use json::JsonValue;

use crate::bibliography::{Bibliography, Reference};

// Downlevels my fancy bibliography to something vaguely CSL-compatible.
pub fn to_csl(bib: &Bibliography) -> JsonValue {
    let mut result = json::Array::new();

    for (key, entry) in bib.references.iter() {
        let mut obj = json::object::Object::new();
        obj["id"] = key.as_str().into();
        obj["title"] = entry.common().title.value.as_str().into();
        obj["author"] = entry
            .common()
            .author
            .iter()
            .map(|a| {
                json::object! {
                    "given": a.given.clone(),
                    "family": a.family.clone(),
                }
            })
            .collect::<json::Array>()
            .into();

        match entry {
            Reference::JournalArticle(journal_article) => {
                obj["type"] = "article-journal".into();
                obj["issued"] = journal_article.periodical.issued.to_iso().into();
            }
            Reference::NewspaperArticle(newspaper_article) => {
                obj["type"] = "article-newspaper".into();
                obj["issued"] = newspaper_article.periodical.issued.to_iso().into();
            }
            Reference::MagazineArticle(magazine_article) => {
                obj["type"] = "article-magazine".into();
                obj["issued"] = magazine_article.periodical.issued.to_iso().into();
            }
            Reference::Book(book) => {
                obj["type"] = "book".into();
                obj["issued"] = book.issued.as_ref().map(|d| d.to_iso()).into();
            }
            Reference::Chapter(chapter) => {
                obj["type"] = "chapter".into();
                obj["issued"] = chapter.book.issued.as_ref().map(|d| d.to_iso()).into();
            }
            Reference::Document(document) => {
                obj["type"] = "document".into();
            }
            Reference::WebPage(web_page) => {
                obj["type"] = "webpage".into();
            }
            Reference::Thesis(thesis) => {
                obj["type"] = "thesis".into();
            }
            Reference::ConferencePaper(conference_paper) => {
                obj["type"] = "paper-conference".into();
                obj["issued"] = conference_paper
                    .book
                    .issued
                    .as_ref()
                    .map(|d| d.to_iso())
                    .into();
            }
            Reference::Patent(patent) => {
                obj["type"] = "patent".into();
            }
        }

        result.push(obj.into());
    }

    result.into()
}
