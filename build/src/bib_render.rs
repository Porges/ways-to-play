use maud::{html, Markup};
use num_format::{Locale, ToFormattedString};

use crate::{
    bibliography::{
        Bibliography, Book, Date, JournalArticle, LString, MagazineArticle, NewspaperArticle,
        Pagination, Periodical, Person, Reference, Thesis,
    },
    nvec::OneOrMore,
};

pub fn render_bib(bib: &Bibliography) -> Markup {
    html! {
        ul {
            @for (key, reference) in &bib.references {
                li {
                    (render_ref(key, reference))
                }
            }
        }
    }
}

fn format_num(num: u64) -> String {
    num.to_formatted_string(&Locale::en)
}

fn item_type(reference: &Reference) -> &'static str {
    match reference {
        Reference::ConferencePaper(_) | Reference::JournalArticle(_) => {
            "https://schema.org/ScholarlyArticle"
        }
        Reference::NewspaperArticle(_) | Reference::MagazineArticle(_) => {
            "https://schema.org/Article"
        }
        Reference::Book(_) => "https://schema.org/Book",
        Reference::Chapter(_) => "https://schema.org/Chapter",
        Reference::Patent(_) | Reference::Document(_) => "https://schema.org/CreativeWork",
        Reference::WebPage(_) => "https://schema.org/WebPage",
        Reference::Thesis(_) => "https://schema.org/Thesis",
    }
}

fn render_ref(key: &str, reference: &Reference) -> Markup {
    html! {
        span #{"ref-" (key)} itemscope itemtype=(item_type(reference)) itemprop="citation" {
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
            (render_publisher(reference))
            (render_isbn(reference))
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
            @let is_latn = person.lang.as_ref().is_none_or(|l| l.ends_with("-Latn"));
            @let family_last = person.lang.as_ref().is_none_or(|l| {
                !l.starts_with("zh")
                    && !l.starts_with("ja")
                    && !l.starts_with("cmn")
                    && !l.starts_with("yue")
            });
            @let is_first = ix == 0;
            @let is_last = ix == total - 1;
            @let name_sep = if is_latn && family.is_some() { " " } else { "" };

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

    if matches!(r, Reference::Book(_) | Reference::Thesis(_)) {
        html! {
            (render_lstr_cite(&r.common().title, None, Some("name"), Some("alternateName")))
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
                    span itemprop="bookEdition" { (ordinal(*edition)) }
                    " edition)"
                }
            }
        }
    } else {
        html! {
            "‘"
            (render_lstr(&r.common().title, None, Some("name headline"), Some("alternateName")))
            "’"
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
        span class=[class] itemprop=[item_prop] lang=[lstr.lang.as_deref()] {
            (maud::PreEscaped(&lstr.value))
        }

        @if let Some(alt) = &lstr.alt {
            " ["
            span itemprop=[alt_item_prop] {
                (maud::PreEscaped(&alt))
            }
            "]"
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
        cite class=[class] itemprop=[item_prop] lang=[lstr.lang.as_deref()] {
            (maud::PreEscaped(&lstr.value))
        }

        @if let Some(alt) = &lstr.alt {
            " ["
            span itemprop=[alt_item_prop] {
                (maud::PreEscaped(alt))
            }
            "]"
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
                @if editors.len() > 1 { "s " } else { " " }
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
                    ". "
                }

                @if let Ok(editor) = r.editors().try_into() {
                    "Edited by " (render_people(editor, false, "editor")) ". "
                }

                span itemid={(key)"-publisher"} itemtype="https://schema.org/Organization" itemscope {
                    (render_publisher_periodical(periodical))
                }
            }
        }
        Reference::Chapter(_) | Reference::WebPage(_) | Reference::ConferencePaper(_) => {
            Markup::default() // TODO: finish
        }
        Reference::Patent(_)
        | Reference::Book(_)
        | Reference::Document(_)
        | Reference::Thesis(_) => Markup::default(),
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

fn render_publisher(r: &Reference) -> Markup {
    html! {
        "TODO: publisher"
    }
}

fn render_publisher_periodical(p: &Periodical) -> Markup {
    html! {
        @if let Some(p) = &p.publisher {
            (render_lstr(p, Some("noun"), Some("name"), Some("alternateName")))
        }

        @if let Some(publisher_place) = &p.publisher_place {
            @if p.publisher.is_some() {
                ": "
            }
            span itemprop="location" { (render_lstr(publisher_place, Some("noun"), None, None)) }
            ". "
        }
        @else if p.publisher.as_ref().is_some_and(|p| p.alt.is_some() || !p.value.ends_with('.')) {
            ". "
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
            @let isbn = isbn.0.hyphenate().unwrap();
            abbr.initialism { "ISBN" } ": "
            a href={"https://www.worldcat.org/isbn/"(isbn)} {
                span itemprop="isbn" { (isbn) }
            }
            ". "
        }
    }
}
