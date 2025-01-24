use std::collections::BTreeMap;

use maud::{html, Markup};
use num_format::{Locale, ToFormattedString};
use time::macros::format_description;

use crate::{
    bibliography::{
        Bibliography, Book, Chapter, Common, ConferencePaper, Date, Document, JournalArticle,
        LString, MagazineArticle, NewspaperArticle, NumberOrString, Pagination, Periodical, Person,
        Reference, Thesis, WebPage,
    },
    nvec::OneOrMore,
};

pub struct RenderedEntry {
    pub iso_date: Option<String>,
    pub name_key: String,

    pub reference: Markup,
    pub inline_cite: Option<Markup>,
    pub url: Option<String>,
}

pub type RenderedBibliography = BTreeMap<String, RenderedEntry>;

pub fn to_rendered(bib: &Bibliography) -> RenderedBibliography {
    let mut result = BTreeMap::new();
    for (key, reference) in &bib.references {
        let inline_cite = inline_cite(reference);
        let url = reference.common().url.clone();
        let iso_date = reference.iso_date();

        // generate name sort key
        let name_key = reference
            .authors()
            .first()
            .map(|a| format!("{} {}", a.family.as_deref().unwrap_or_default(), a.given))
            .or_else(|| {
                reference
                    .editors()
                    .first()
                    .map(|a| format!("{} {}", a.family.as_deref().unwrap_or_default(), a.given))
            })
            .or_else(|| reference.publisher().map(|l| l.value.clone()))
            .unwrap_or_default();

        let reference = render_ref(key, reference);

        result.insert(
            key.clone(),
            RenderedEntry {
                iso_date,
                name_key,
                reference,
                inline_cite,
                url,
            },
        );
    }

    result
}

fn inline_cite(reference: &Reference) -> Option<Markup> {
    match &reference {
        Reference::Book(book) => Some(render_lstr_cite(&book.common.title, None, None, None)),
        Reference::JournalArticle(JournalArticle {
            common: Common { author, .. },
            periodical: Periodical { issued, .. },
            ..
        })
        | Reference::Thesis(Thesis {
            common: Common { author, .. },
            issued,
            ..
        })
        | Reference::Chapter(Chapter {
            common: Common { author, .. },
            book: Book {
                issued: Some(issued),
                ..
            },
            ..
        })
        | Reference::ConferencePaper(ConferencePaper {
            common: Common { author, .. },
            book: Book {
                issued: Some(issued),
                ..
            },
            ..
        }) if !author.is_empty() => {
            let a = author.first().unwrap();
            Some(html! {
                (a.family.as_deref().unwrap_or(&a.given))
                " (" (issued.year()) ")"
            })
        }
        _ => None,
    }
}

fn format_num(num: u64) -> String {
    num.to_formatted_string(&Locale::en)
}

fn book_item_type(book: &Book) -> &'static str {
    if book.volume.is_none() {
        "https://schema.org/Book"
    } else {
        "https://schema.org/Book https://schema.org/PublicationVolume"
    }
}

fn item_type(reference: &Reference) -> &'static str {
    match reference {
        Reference::ConferencePaper(_) | Reference::JournalArticle(_) => {
            "https://schema.org/ScholarlyArticle"
        }
        Reference::NewspaperArticle(_) | Reference::MagazineArticle(_) => {
            "https://schema.org/Article"
        }
        Reference::Book(b) => book_item_type(b),
        Reference::Chapter(_) => "https://schema.org/Chapter",
        Reference::Patent(_) | Reference::Document(_) => "https://schema.org/CreativeWork",
        Reference::WebPage(_) => "https://schema.org/WebPage",
        Reference::Thesis(_) => "https://schema.org/Thesis",
    }
}

fn render_ref(key: &str, reference: &Reference) -> Markup {
    html! {
        (render_warnings_and_notes(reference))
        p #{"ref-" (key)} itemscope itemtype=(item_type(reference)) itemprop="citation" {
            (render_authors(reference))
            " (" (render_date(reference)) "). "
            (render_title(reference))
            (render_editor(reference))
            (render_translator(reference))
            (render_series(reference))
            ". "
            (render_patent_bits(reference))
            (render_container(key, reference))
            (render_genre(reference))
            (render_publisher(key, reference))
            (render_isbn(reference))
            (render_original(reference))
        }
    }
}

fn render_warnings_and_notes(reference: &Reference) -> Markup {
    html! {
        @if let Some(warns) = &reference.common().warnings {
            aside.reference-warning.footnote {
                (maud::PreEscaped(warns))
            }
        }
        @if let Some(notes) = &reference.common().notes {
            aside.reference-note.footnote {
                (maud::PreEscaped(notes))
            }
        }
    }
}

fn render_authors(r: &Reference) -> Markup {
    html! {
        @if let Ok(authors) = r.authors().try_into() {
            (render_people(authors, true, "author"))
        }
        @else if let Ok(editors) = r.editors().try_into() {
            (render_people(editors, true, "editor"))
        }
        @else if let Some(publisher) = r.publisher() {
            span itemscope itemtype="https://schema.org/Organization" itemprop="author" {
                (render_lstr(publisher, Some("noun"), Some("name"), Some("alternateName")))
            }
        }
        @else {
            em { "Anonymous" }
        }
    }
}

pub fn family_last(lang: Option<&str>) -> bool {
    lang.is_none_or(|l| {
        !l.starts_with("zh")
            && !l.starts_with("ja")
            && !l.starts_with("cmn")
            && !l.starts_with("yue")
    })
}

pub fn needs_space(lang: Option<&str>) -> bool {
    let Some(lang) = lang else {
        return true; // English
    };

    // should really use langtag script property
    // but I cannot find any crate which has the information
    if lang.starts_with("zh")
        || lang.starts_with("ja")
        || lang.starts_with("cmn")
        || lang.starts_with("yue")
    {
        lang.contains("-Latn")
    } else {
        true
    }
}

fn render_people(
    people: OneOrMore<Person>,
    reverse_first: bool,
    item_prop: &'static str,
) -> Markup {
    let total = people.len();
    html! {
        @for (ix, person) in people.into_iter().enumerate() {
            @let given = html! { span itemProp="givenName" { (person.given) } };
            @let family = person.family.as_deref().map(|f| html! { span itemProp="familyName" { (f) } });
            @let needs_space = needs_space(person.lang.as_deref());
            @let family_last = family_last(person.lang.as_deref());
            @let is_first = ix == 0;
            @let is_last = ix == total - 1;
            @let name_sep = if needs_space && family.is_some() { " " } else { "" };

            // separator
            @if !is_first {
                @if !is_last { ", " }
                @else if total > 2 { ", and " }
                @else { " and " }
            }

            span.noun
                itemscope itemprop=(item_prop) itemtype="https://schema.org/Person"
                lang=[person.lang.as_deref()] {

                // hidden name
                meta itemprop="name" content={
                    @let given_str = person.given.as_str();
                    @let family_str = person.family.as_deref().unwrap_or("");
                    @let (first, second) = if family_last {
                        (given_str, family_str)
                    } else {
                        (family_str, given_str)
                    };
                    (first)(name_sep)(second)
                };

                @let full_name = if let Some(family) = family {
                    if reverse_first && is_first {
                        html! { bdi { (family) } ", " bdi { (given) } }
                    } else if family_last {
                        html!{ bdi { (given) (name_sep) (family) } }
                    } else {
                        html!{ bdi { (family) (name_sep) (given) } }
                    }
                } else {
                    html!{ bdi { (given) } }
                };

                // (linked) name
                @if let Some(url) = &person.url {
                    a href=(url) itemprop="sameAs" { (full_name) }
                } @else {
                    (full_name)
                }

                // alt name
                @if let Some(alt) = &person.alt {
                    " [" (render_lstr(alt, Some("noun"), Some("alternateName"), None)) "]"
                }
            }
        }
    }
}

fn render_title(r: &Reference) -> Markup {
    let archive_url = html! {
        @if let Some(archive_url) = &r.common().archive_url {
            " ["
            a href=(archive_url) itemprop="archivedAt" { "archived" }
            "]"
        }
    };

    let additional_prefix = r.common().language.as_ref().map(|lang| {
            html! {
                "in " (lang.to_name())
                meta itemprop="inLanguage" content=(lang.to_639_1().unwrap_or_else(|| lang.to_639_3())) ;
            }
        });

    let rest = render_lstr_alt(
        &r.common().title,
        " [",
        "]",
        additional_prefix,
        Some("alternateName"),
    );

    if matches!(r, Reference::Book(_) | Reference::Thesis(_)) {
        let title = render_lstr_just_cite(&r.common().title, None, Some("name"));

        html! {
            @if let Some(url) = &r.common().url {
                a href=(url) itemprop="url" { (title) }
            } @else {
                (title)
            }
            (rest)
            (archive_url)
            @if let Reference::Book(b) = r {
                @if let Some(vol) = &b.volume {
                    " volume "
                    span itemProp="volumeNumber" { (vol.to_string(true)) }
                    @if let Some(vol_title) = &b.volume_title {
                        ": ‘" (render_lstr(vol_title, None, None, None)) "’"
                    }
                }

                @if let Some(edition) = &b.edition {
                    " ("
                    span itemprop="bookEdition" {
                        @match edition {
                            NumberOrString::Num(n) => {
                                (ordinal(*n)) " edition"
                            },
                            NumberOrString::Str(s) => {
                                (s)
                            },
                        }
                    }
                    ")"
                }
            }
        }
    } else {
        let title = render_lstr_just_span(&r.common().title, Some("noun"), Some("name headline"));

        html! {
            "‘"
            @if let Some(url) = &r.common().url {
                a href=(url) itemprop="url" { (title) }
            } @else {
                (title)
            }
            "’"
            (rest)
            (archive_url)
        }
    }
}

fn render_date(reference: &Reference) -> Markup {
    let date = match reference {
        Reference::MagazineArticle(MagazineArticle { periodical, .. })
        | Reference::NewspaperArticle(NewspaperArticle { periodical, .. })
        | Reference::JournalArticle(JournalArticle { periodical, .. }) => Some(&periodical.issued),
        Reference::Book(book) => book.issued.as_ref(),
        Reference::Chapter(chapter) => chapter.book.issued.as_ref(),
        Reference::Document(document) => document.issued.as_ref(),
        Reference::WebPage(web_page) => web_page.issued.as_ref(),
        Reference::Thesis(thesis) => Some(&thesis.issued),
        Reference::ConferencePaper(conference_paper) => conference_paper.book.issued.as_ref(),
        Reference::Patent(patent) => patent.issued.as_ref().or(Some(&patent.filed)),
    };

    html! {
        @if let Some(date) = date {
            time itemprop="datePublished" datetime=(date.to_iso()) {
                @if date.attr().circa {
                    abbr title="circa" { "c." }
                    " "
                }
                (date.year().to_string())
                @if date.attr().old_style {
                    " ["
                    abbr title="old-style" { "OS" }
                    "]"
                }
            }
        } @else {
           "n. d."
        }
    }
}

pub fn ordinal(n: u64) -> String {
    let mut num = n.to_string();
    num.push_str(if num.ends_with("1") && !num.ends_with("11") {
        "st"
    } else if num.ends_with("2") && !num.ends_with("12") {
        "nd"
    } else if num.ends_with("3") && !num.ends_with("13") {
        "rd"
    } else {
        "th"
    });

    num
}

fn render_lstr(
    lstr: &LString,
    class: Option<&'static str>,
    item_prop: Option<&'static str>,
    alt_item_prop: Option<&'static str>,
) -> Markup {
    html! {
        (render_lstr_just_span(lstr, class, item_prop))
        (render_lstr_alt(lstr, " [", "]", None, alt_item_prop))
    }
}

fn render_lstr_just_span(
    lstr: &LString,
    class: Option<&'static str>,
    item_prop: Option<&'static str>,
) -> Markup {
    html! {
        span class=[class] itemprop=[item_prop] lang=[lstr.lang.as_deref()] {
            (maud::PreEscaped(&lstr.value))
        }
    }
}

fn render_lstr_alt(
    lstr: &LString,
    prefix: &str,
    suffix: &str,
    additional_prefix: Option<Markup>,
    alt_item_prop: Option<&'static str>,
) -> Markup {
    html! {
        @if let Some(alt) = &lstr.alt {
            (prefix)
            @if let Some(pref) = additional_prefix {
                (pref) ": "
            }
            span itemprop=[alt_item_prop] {
                (maud::PreEscaped(&alt))
            }
            (suffix)
        } @else if let Some(pref) = additional_prefix {
            (prefix) (pref) (suffix)
        }
    }
}

fn render_lstr_cite(
    lstr: &LString,
    class: Option<&'static str>,
    item_prop: Option<&'static str>,
    alt_item_prop: Option<&'static str>,
) -> Markup {
    html! {
        (render_lstr_just_cite(lstr, class, item_prop))
        (render_lstr_alt(lstr, " [", "]", None, alt_item_prop))
    }
}

fn render_lstr_just_cite(
    lstr: &LString,
    class: Option<&'static str>,
    item_prop: Option<&'static str>,
) -> Markup {
    html! {
        cite class=[class] itemprop=[item_prop] lang=[lstr.lang.as_deref()] {
            (maud::PreEscaped(&lstr.value))
        }
    }
}

fn render_editor(r: &Reference) -> Markup {
    html! {
        @if !r.authors().is_empty() {
            // if author was not present we would have shown the editor as the author
            @if let Ok(editors) = r.editors().try_into() {
                ", edited by "
                (render_people(editors, false, "editor"))
            }
        }
    }
}

fn render_translator(r: &Reference) -> Markup {
    html! {
        @if let Ok(translators) = r.common().translator.as_slice().try_into() {
            ", translated by "
            (render_people(translators, false, "translator"))
        }
    }
}

fn render_series(r: &Reference) -> Markup {
    let Reference::Book(Book {
        series: Some(series),
        ..
    }) = r
    else {
        return Markup::default();
    };

    html! {
        "; "
        span itemscope itemtype="https://schema.org/BookSeries" itemprop="isPartOf" {
            @let title = render_lstr(&series.title, None, Some("name"), Some("alternateName"));
            @if let Some(url) = &series.url {
                a href=(url) itemprop="url" { (title) }
            } @else {
                (title)
            }
            @if let Some(issn) = &series.issn {
                " ("
                abbr.initialism { "ISSN" }
                " "
                span itemprop="issn" { (issn.to_string(false)) }
                ")"
            }
            @if let Some(volume) = &series.volume {
                " volume " (volume)
            }
            @if let Some(number) = &series.number {
                @if series.volume.is_some() { "," }
                " number " (number)
            }

            @if let Ok(editors) = series.editor.as_slice().try_into() {
                @let editors: OneOrMore<_> = editors;
                ", series editor"
                @if editors.len() > 1 { "s " } @else { " " }
                (render_people(editors, false, "editor"))
            }
        }
    }
}

fn render_patent_bits(r: &Reference) -> Markup {
    html! {
        @if let Reference::Patent(p) = r {
            @if let Some(patent_number) = &p.patent_number {
                "Patent " (patent_number.to_string(true))
                @if let Some(application_num) = &p.application_number {
                    " (application " (application_num.to_string(true)) ")"
                }
                "."
            }
            @else if let Some(application_num) = &p.application_number {
                "Patent application " (application_num.to_string(true)) "."
            }

            " Filed " (p.filed.explicit(false)) "."

            @if let Some(issued) = &p.issued {
                " Issued " (issued.explicit(false)) "."
            }
        }
    }
}

fn render_container(key: &str, r: &Reference) -> Markup {
    match r {
        Reference::JournalArticle(JournalArticle {
            page, periodical, ..
        })
        | Reference::NewspaperArticle(NewspaperArticle {
            page, periodical, ..
        })
        | Reference::MagazineArticle(MagazineArticle {
            page, periodical, ..
        }) => {
            html! {
                (render_periodical(key, periodical))
                @if let Some(page) = page {
                    @if matches!(page, Pagination::Num(_)) {
                        ": page "
                    } @else {
                        ": pages "
                    }

                    @let pagination = match page {
                        Pagination::Str(s) => s.replace('-', "–"),
                        Pagination::Num(n) => n.to_string(),
                    };

                    span itemprop="pagination" { (pagination) }
                }

                ". "

                @if let Ok(editor) = periodical.editor.as_slice().try_into() {
                    "Edited by " (render_people(editor, false, "editor")) ". "
                }
            }
        }
        Reference::Chapter(Chapter { book, page, .. })
        | Reference::ConferencePaper(ConferencePaper { book, page, .. }) => {
            html! {
                @if let Some(page) = page {
                    @if matches!(page, Pagination::Num(_)) {
                        "Page "
                    } @else {
                        "Pages "
                    }

                    @let pagination = match page {
                        Pagination::Str(s) => s.replace('-', "–"),
                        Pagination::Num(n) => n.to_string(),
                    };

                    span itemprop="pagination" { (pagination) }
                    " in "
                } @else {
                    "In "
                }

                (render_book(key, book, "isPartOf"))
            }
        }
        Reference::WebPage(WebPage {
            container_title, ..
        }) => html! {
            @if let Some(title) = container_title {
                "On the website "
                span itemscope itemtype="https://schema.org/WebSite" itemprop="isPartOf" {
                    (render_lstr_cite(title, None, Some("name"), Some("alternateName")))
                }

                @if let Some(archive_url) = r.common().archive_url.as_ref()
                    .and_then(|u| u.strip_prefix("https://web.archive.org/web/"))
                    .and_then(|u| u.split_once('/'))
                    .map(|(pref, _)| &pref[..8]) {
                    @let access_date = time::Date::parse(archive_url, format_description!("[year][month][day]")).unwrap();
                    @let iso_date = access_date.format(format_description!("[year]-[month]-[day]")).unwrap();
                    @let nice_date = format!("{}, {} {} {}", access_date.weekday(), ordinal(access_date.day() as u64), access_date.month(), access_date.year());
                    " (accessed "
                    time itemprop="lastReviewed" datetime=(iso_date) { (nice_date) }
                    ")"
                }

                ". "
            }
        },
        Reference::Patent(_)
        | Reference::Book(_)
        | Reference::Document(_)
        | Reference::Thesis(_) => Markup::default(),
    }
}

// inline rendering of books
fn render_book(key: &str, book: &Book, item_prop: &str) -> Markup {
    let bookr = &Reference::Book(book.clone());
    let key = key.to_string() + "-book";
    html! {
        span itemscope itemtype=(book_item_type(book)) itemprop=(item_prop) {
            (render_title(bookr))
            @if let Ok(authors) = bookr.authors().try_into() {
                ", " (render_people(authors, false, "author"))
            }
            @if let Ok(editors) = bookr.editors().try_into() {
                ", edited by " (render_people(editors, false, "editor"))
            }
            (render_series(bookr))
            ". "
            (render_publisher(&key, bookr))
            (render_isbn(bookr))
        }
    }
}

fn render_periodical(key: &str, p: &Periodical) -> Markup {
    let date_part = if matches!(p.issued, Date::YearMonthDay { .. } | Date::YearMonth { .. }) {
        html! {
            ", "
            time itemprop="datePublished" datetime=(p.issued.to_iso()) {
                (p.issued.explicit(true))
            }
        }
    } else {
        Markup::default()
    };

    html! {
        @match (p.issue, &p.volume) {
            (Some(issue), Some(volume)) => {
                span itemscope itemtype="https://schema.org/Periodical" itemid={"#"(key)"-periodical"} {
                    link itemprop="publisher" href={"#"(key)"-publisher"};
                    (render_lstr_cite(&p.title, None, Some("name"), Some("alternateName")))
                }
                " "
                span itemscope itemtype="https://schema.org/PublicationVolume" itemid={"#"(key)"-volume"} {
                    link itemprop="isPartOf" href={"#"(key)"-periodical"};
                    abbr title="volume" { "vol." }
                    " "
                    span itemprop="volumeNumber" { (volume.to_string(true)) }
                }
                " "
                span itemscope itemtype="https://schema.org/PublicationIssue" itemprop="isPartOf" {
                    link itemprop="isPartOf" href={"#"(key)"-volume"};
                    "(" span itemprop="issueNumber" { (format_num(issue as u64)) } ")"
                    (date_part)
                }
            }
            (Some(issue), None) => {
                span itemscope itemtype="https://schema.org/Periodical" itemid={"#"(key)"-periodical"} {
                    link itemprop="publisher" href={"#"(key)"-publisher"};
                    (render_lstr_cite(&p.title, None, Some("name"), Some("alternateName")))
                }
                " "
                span itemscope itemtype="https://schema.org/PublicationIssue" itemprop="isPartOf" {
                    link itemprop="isPartOf" href={"#"(key)"-periodical"};
                    "(" span itemprop="issueNumber" { (format_num(issue as u64)) } ")"
                    (date_part)
                }
            }
            (None, Some(volume)) => {
                span itemscope itemtype="https://schema.org/Periodical" itemid={"#"(key)"-periodical"} {
                    link itemprop="publisher" href={"#"(key)"-publisher"};
                    (render_lstr_cite(&p.title, None, Some("name"), Some("alternateName")))
                }
                " "
                span itemscope itemtype="https://schema.org/PublicationVolume" itemprop="isPartOf" {
                    link itemprop="isPartOf" href={"#"(key)"-periodical"};
                    abbr title="volume" { "vol." }
                    " "
                    span itemprop="volumeNumber" { (volume.to_string(true)) }
                    (date_part)
                }
            }
            (None, None) => {
                span itemscope itemtype="https://schema.org/Periodical" itemprop="isPartOf" {
                    link itemprop="publisher" href={"#"(key)"-publisher"};
                    (render_lstr_cite(&p.title, None, Some("name"), Some("alternateName")))
                    (date_part)
                }
            }
        }
    }
}

fn render_publisher(key: &str, r: &Reference) -> Markup {
    let (publisher, place) = match r {
        Reference::JournalArticle(JournalArticle {
            periodical:
                Periodical {
                    publisher,
                    publisher_place,
                    ..
                },
            ..
        })
        | Reference::NewspaperArticle(NewspaperArticle {
            periodical:
                Periodical {
                    publisher,
                    publisher_place,
                    ..
                },
            ..
        })
        | Reference::MagazineArticle(MagazineArticle {
            periodical:
                Periodical {
                    publisher,
                    publisher_place,
                    ..
                },
            ..
        })
        | Reference::Book(Book {
            publisher,
            publisher_place,
            ..
        })
        | Reference::Document(Document {
            publisher,
            publisher_place,
            ..
        })
        | Reference::WebPage(WebPage {
            publisher,
            publisher_place,
            ..
        })
        | Reference::Thesis(Thesis {
            publisher,
            publisher_place,
            ..
        })
        | Reference::ConferencePaper(ConferencePaper {
            book:
                Book {
                    publisher,
                    publisher_place,
                    ..
                },
            ..
        }) => (publisher, publisher_place),
        Reference::Chapter(_) | // publisher rendered as part of inner Book
         Reference::Patent(_) => (&None, &None),
    };

    if publisher.is_none() && place.is_none() {
        return Markup::default();
    }

    html! {
        span itemprop="publisher" itemscope itemtype="https://schema.org/Organization" itemid={"#"(key)"-publisher"} {
            @if let Some(publisher) = publisher {
                (render_lstr(publisher, Some("noun"), Some("name"), Some("alternateName")))
                @if place.is_none() {
                    @if !publisher.value.ends_with('.') {
                        ". "
                    }
                } @else {
                    ": "
                }
            }
            @if let Some(place) = place {
                (render_lstr(place, Some("noun"), Some("location"), None))
                @if !place.value.ends_with('.') {
                    ". "
                }
            }
        }
    }
}

fn render_genre(r: &Reference) -> Markup {
    html! {
        @if let Reference::Thesis(Thesis{genre: Some(g), ..}) = r {
            (g) ", "
        }
    }
}

fn render_isbn(r: &Reference) -> Markup {
    html! {
        @if let Reference::Book(Book{isbn: Some(isbn), ..}) = r {
            " "
            @let isbn = isbn.0.hyphenate().unwrap();
            abbr.initialism { "ISBN" } ": "
            a href={"https://www.worldcat.org/isbn/"(isbn)} {
                span itemprop="isbn" { (isbn) }
            }
            ". "
        }
    }
}

fn render_original(r: &Reference) -> Markup {
    let Reference::Book(book) = r else {
        return Markup::default();
    };

    html! {
        @if let Some(original) = &book.original_date {
            " First published in " (original.explicit(false))
            @if book.original_title.is_some() || book.original_publisher.is_some() {
                " "
            }
            @if let Some(original_title) = &book.original_title {
                "as " (render_lstr_cite(original_title, None, None, None))
                @if book.original_publisher.is_some() {
                    " "
                }
            }
            @if let Some(original_publisher) = &book.original_publisher {
                "by " (render_lstr(original_publisher, None, None, None))
            }
            "."
        }
    }
}
