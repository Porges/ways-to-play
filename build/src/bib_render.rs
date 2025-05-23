use std::{borrow::Cow, collections::BTreeMap};

use maud::{html, Markup};
use time::macros::format_description;

use crate::{
    bibliography::{
        identifier_info, Bibliography, Book, Chapter, Common, ConferencePaper, Date, Document,
        JournalArticle, LString, MagazineArticle, NewspaperArticle, NumberOrString, Pagination,
        Periodical, Person, Reference, Thesis, WebPage,
    },
    intl::INTL,
    nvec::OneOrMore,
};

pub struct RenderedEntry {
    pub iso_date: Option<String>,
    pub name_key: String,

    pub reference: Markup,
    pub inline_cite: Option<InlineCiteRenderer>,
    pub url: Option<String>,
}

// takes the reference ID (for href) and the optional info (page number etc)
pub type InlineCiteRenderer = Box<dyn Fn(&str, Option<Markup>) -> Markup + Send + Sync>;

pub type RenderedBibliography = BTreeMap<String, RenderedEntry>;

fn backfill_isbn(reference: &Reference) -> Cow<'_, Reference> {
    match reference {
        Reference::Book(Book {
            isbn: Some(isbn), ..
        }) => {
            let mut result = reference.clone();
            result
                .common_mut()
                .identifiers
                .insert(format!("isbn:{}", isbn.0));
            return Cow::Owned(result);
        }
        _ => {}
    }

    Cow::Borrowed(reference)
}

fn backfill_doi(reference: &Reference) -> Cow<'_, Reference> {
    if reference.identifier("doi:").is_none() {
        if let Some(url) = reference.common().url.as_deref() {
            if let Some(doi) = url.strip_prefix("https://doi.org/") {
                let mut r = reference.clone();
                r.common_mut().identifiers.insert(format!("doi:{doi}"));
                return Cow::Owned(r);
            }
        }
    }

    Cow::Borrowed(reference)
}

fn backfill_handle(reference: &Reference) -> Cow<'_, Reference> {
    if reference.identifier("hdl:").is_none() {
        if let Some(url) = reference.common().url.as_deref() {
            if let Some(hdl) = url.strip_prefix("https://hdl.handle.net/") {
                // n2t doesn't handle handles with query strings
                if !hdl.contains('?') {
                    let mut r = reference.clone();
                    if let Some((_, ark)) = hdl.split_once("ark:") {
                        r.common_mut().identifiers.insert(format!("ark:{ark}"));
                    } else {
                        r.common_mut().identifiers.insert(format!("hdl:{hdl}"));
                    }
                    return Cow::Owned(r);
                }
            }
        }
    }

    Cow::Borrowed(reference)
}

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

        let reference = backfill_doi(reference);
        let reference = backfill_isbn(&reference);
        let reference = backfill_handle(&reference);
        let reference = render_ref(key, &reference);

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

fn inline_cite(reference: &Reference) -> Option<InlineCiteRenderer> {
    match &reference {
        Reference::Book(Book { common, .. }) | Reference::Thesis(Thesis { common, .. }) => {
            // render only title, not subtitle
            let before = render_lstr_cite(&common.title, None, None, None);
            Some(Box::new(
                move |ref_id: &str, info: Option<Markup>| -> Markup {
                    html! {
                        a href=(ref_id) {
                            (before)
                        }
                        @if let Some(info) = info {
                            " (" (info) ")"
                        }
                    }
                },
            ))
        }
        Reference::JournalArticle(JournalArticle {
            common: Common { author, .. },
            periodical: Periodical { issued, .. },
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
            let author_summary = html! {
                (a.family.as_deref().unwrap_or(&a.given))
            };
            let year = issued.year();
            Some(Box::new(move |ref_id: &str, info: Option<Markup>| {
                html! {
                    a property="" href=(ref_id) {
                        (author_summary)
                    }
                    " ("
                    (year)
                    @if let Some(info) = info {
                        ", " (info)
                    }
                    ")"
                }
            }))
        }
        _ => None,
    }
}

fn book_item_type(book: &Book) -> &'static str {
    if book.volume.is_none() {
        "Book bibo:Book fabio:Book"
    } else {
        "Book PublicationVolume bibo:Book fabio:Book"
    }
}

fn item_type(reference: &Reference) -> &'static str {
    match reference {
        Reference::ConferencePaper(_) => "ScholarlyArticle bibo:AcademicArticle",
        Reference::JournalArticle(_) => "ScholarlyArticle bibo:AcademicArticle",
        Reference::NewspaperArticle(_) => "Article bibo:Article fabio:NewspaperArticle",
        Reference::MagazineArticle(_) => "Article bibo:Article fabio:MagazineArticle",
        Reference::Book(b) => {
            if b.volume.is_none() {
                "Book bibo:Book fabio:Book"
            } else {
                "Book PublicationVolume bibo:Book fabio:Book"
            }
        }
        Reference::Thesis(t) => {
            if t.volume.is_none() {
                "Thesis bibo:Thesis fabio:Thesis"
            } else {
                "Thesis PublicationVolume bibo:Thesis fabio:Thesis"
            }
        }
        Reference::Chapter(_) => "Chapter bibo:Chapter fabio:BookChapter",
        Reference::Patent(p) => {
            if p.issued.is_some() {
                "CreativeWork bibo:Patent fabio:Patent"
            } else {
                "CreativeWork bibo:Patent fabio:PatentApplication"
            }
        }
        Reference::Document(_) => "CreativeWork bibo:Document fabio:Work",
        Reference::WebPage(_) => "WebPage bibo:Webpage fabio:WebPage",
    }
}

fn item_resource(reference: &Reference) -> Option<String> {
    match reference {
        // Reference books with ISBNs via URN
        Reference::Book(Book {
            isbn: Some(isbn), ..
        }) => return Some(format!("urn:isbn:{}", isbn.0)),
        Reference::JournalArticle(JournalArticle {
            common: Common { url: Some(url), .. },
            ..
        }) => {
            // use a stable URI as resource identifier
            if url.starts_with("https://jstor.org/stable/") {
                return Some(url.clone());
            }
        }
        _ => {}
    }

    None
}

fn render_ref(key: &str, reference: &Reference) -> Markup {
    html! {
        (render_warnings_and_notes(reference))
        p property="citation" #{"ref-" (key)} resource=[item_resource(reference)] typeof=(item_type(reference)) {
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
            (render_identifiers(reference))
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
            (render_people(&authors, true, "author dcterms:creator"))
        }
        @else if let Ok(editors) = r.editors().try_into() {
            (render_people(&editors, true, "editor bibo:editor"))
            @if editors.len() > 1 {
                " (" abbr title="editors" { "eds." } ")"
            } @else {
                " (" abbr title="editor" { "ed." } ")"
            }
        }
        @else if let Some(publisher) = r.publisher() {
            span property="author" typeof="Organization"  {
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

fn person_resource(person: &Person) -> Option<String> {
    // use Wikipedia page or ORCID, etc
    if let Some(url) = person.url.as_deref() {
        return Some(url.to_string());
    }

    None
}

fn render_people(people: &OneOrMore<Person>, reverse_first: bool, prop: &'static str) -> Markup {
    let total = people.len();
    html! {
        @for (ix, person) in people.into_iter().enumerate() {
            @let given = html! { span property="givenName foaf:givenName" { (person.given) } };
            @let family = person.family.as_deref().map(|f| html! { span property="familyName foaf:familyName" { (f) } });
            @let needs_space = needs_space(person.lang.as_deref());
            @let family_last = family_last(person.lang.as_deref());
            @let is_first = ix == 0;
            @let is_last = ix == total - 1;
            @let name_sep = if needs_space && family.is_some() { " " } else { "" };
            @let resource = person_resource(person);

            // separator
            @if !is_first {
                @if !is_last { ", " }
                @else if total > 2 { ", and " }
                @else { " and " }
            }

            span.noun
                property=(prop)
                resource=[resource]
                typeof="Person foaf:Person"
                lang=[person.lang.as_deref()] {

                // hidden name
                meta property="name foaf:name" content={
                    @let given_str = person.given.as_str();
                    @let family_str = person.family.as_deref().unwrap_or("");
                    @let (first, second) = if family_last {
                        (given_str, family_str)
                    } else {
                        (family_str, given_str)
                    };
                    (first)(name_sep)(second)
                    @if let Some(suffix) = &person.suffix {
                        (name_sep)(suffix)
                    }
                };

                @let full_name = if let Some(family) = family {
                    if reverse_first && is_first {
                        html! {
                            bdi { (family) }
                            ", "
                            bdi { (given) }
                            @if let Some(suffix) = &person.suffix {
                                ", " (suffix)
                            }
                        }
                    } else if family_last {
                        html!{
                            bdi {
                                (given) (name_sep) (family)
                                @if let Some(suffix) = &person.suffix {
                                    (name_sep) (suffix)
                                }
                            }
                        }
                    } else {
                        html!{
                            bdi {
                                (family) (name_sep) (given)
                                @if let Some(suffix) = &person.suffix {
                                    (name_sep) (suffix)
                                }
                            }
                        }
                    }
                } else {
                    html!{ bdi { (given) } }
                };

                // (linked) name
                @if let Some(url) = &person.url {
                    a property="sameAs" href=(url) { (full_name) }
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
            a property="archivedAt" href=(archive_url) { "archived" }
            "]"
        }
    };

    let additional_suffix = r.common().language.as_ref().map(|lang| {
        html! {
            "text in " (INTL.english_name(lang).unwrap())
            meta property="inLanguage dcterms:language" content=(lang);
        }
    });

    let title_alt = render_lstr_alt(
        &r.common().title,
        " [",
        "]",
        additional_suffix,
        Some("alternateName dcterms:alternative"),
    );

    if matches!(r, Reference::Book(_) | Reference::Thesis(_)) {
        let mut title_lstr = Cow::Borrowed(&r.common().title);

        // Attach subtitle, if any
        match r {
            Reference::Book(Book {
                subtitle: Some(subtitle),
                ..
            })
            | Reference::Thesis(Thesis {
                subtitle: Some(subtitle),
                ..
            }) => {
                let prefixed: Cow<'_, str> =
                    if subtitle.starts_with(|x: char| x.is_ascii_punctuation()) {
                        subtitle.into()
                    } else {
                        format!(": {}", subtitle).into()
                    };

                title_lstr = Cow::Owned(LString {
                    value: format!("{}{}", title_lstr.value, prefixed),
                    lang: title_lstr.lang.clone(),
                    alt: title_lstr.alt.clone(),
                });
            }
            _ => {}
        }

        let title = render_lstr_just_cite(&title_lstr, None, Some("name"));

        html! {
            @if let Some(url) = &r.common().url {
                a property="url" href=(url) {
                    (title)
                }
            } @else {
                (title)
            }
            (title_alt)
            (archive_url)
            @if let Reference::Book(Book { volume: Some(vol), volume_title, ..}) |
                Reference::Thesis(Thesis { volume: Some(vol), volume_title, .. }) = r {
                " volume "
                span property="volumeNumber bibo:volume" { (vol.to_string(true)) }
                @if let Some(vol_title) = &volume_title {
                    ": ‘" (render_lstr(vol_title, None, None, None)) "’"
                }
            }
            @if let Reference::Book(b) = r {
                @if let Some(edition) = &b.edition {
                    " ("
                    span property="bookEdition bibo:edition" {
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
        let title = render_lstr_just_span(
            &r.common().title,
            Some("noun"),
            Some("name headline"),
        );

        html! {
            "‘"
            @if let Some(url) = &r.common().url {
                a property="url" href=(url) { (title) }
            } @else {
                (title)
            }
            "’"
            (title_alt)
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
            time property="datePublished dcterms:issued" datetime=(date.to_iso()) {
                @if date.attr().circa {
                    abbr title="circa" { "c." }
                    " "
                }
                span property="fabio:hasPublicationYear" { (date.year().to_string()) }
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
    prop: Option<&'static str>,
) -> Markup {
    html! {
        span class=[class] property=[prop] lang=[lstr.lang.as_ref()] {
            (maud::PreEscaped(&lstr.value))
        }
    }
}

fn render_lstr_alt(
    lstr: &LString,
    prefix: &str,
    suffix: &str,
    additional_suffix: Option<Markup>,
    alt_prop: Option<&'static str>,
) -> Markup {
    html! {
        @if let Some(alt) = &lstr.alt {
            (prefix)
            span property=[alt_prop] {
                (maud::PreEscaped(&alt))
            }
            @if let Some(suff) = additional_suffix {
                 "; " (suff)
            }
            (suffix)
        } @else if let Some(suff) = additional_suffix {
            (prefix) (suff) (suffix)
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
    prop: Option<&'static str>,
) -> Markup {
    html! {
        cite class=[class] property=[prop] lang=[lstr.lang.as_ref()] {
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
                (render_people(&editors, false, "editor"))
            }
        }
    }
}

fn render_translator(r: &Reference) -> Markup {
    html! {
        @if let Ok(translators) = r.common().translator.as_slice().try_into() {
            ", translated by "
            (render_people(&translators, false, "translator"))
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
        span property="isPartOf dcterms:isPartOf frbr:partOf" typeof="BookSeries bibo:Series fabio:BookSeries" {
            @let title = render_lstr(&series.title, None, Some("name"), Some("alternateName"));
            @if let Some(url) = &series.url {
                a property="url" href=(url) { (title) }
            } @else {
                (title)
            }
            @if let Some(issn) = &series.issn {
                " ("
                abbr.initialism { "ISSN" }
                " "
                span property="issn bibo:issn" { (issn.to_string(false)) }
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
                (render_people(&editors, false, "editor"))
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
            let pt = if matches!(r, Reference::JournalArticle(_)) {
                PeriodicalType::Journal
            } else if matches!(r, Reference::NewspaperArticle(_)) {
                PeriodicalType::NewsPaper
            } else {
                PeriodicalType::Magazine
            };

            html! {
                (render_periodical(key, periodical, pt))
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

                    span property="pagination bibo:pages" { (pagination) }
                }

                ". "

                @if let Ok(editor) = periodical.editor.as_slice().try_into() {
                    "Edited by " (render_people(&editor, false, "editor")) ". "
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

                    span property="pagination bibo:pages" { (pagination) }
                    " in "
                } @else {
                    "In "
                }

                (render_book(key, book, "isPartOf dcterms:isPartOf"))
            }
        }
        Reference::WebPage(WebPage {
            container_title, ..
        }) => html! {
            @if let Some(title) = container_title {
                "On the website "
                span property="isPartOf dcterms:isPartOf frbr:partOf" typeof="WebSite bibo:Website fabio:WebSite"{
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
                    time property="lastReviewed fabio:hasDepositDate" datetime=(iso_date) { (nice_date) }
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
        span property=(item_prop) typeof=(book_item_type(book)) resource=[bookr.common().resource_id()] {
            (render_title(bookr))
            @if let Ok(authors) = bookr.authors().try_into() {
                ", " (render_people(&authors, false, "author"))
            }
            @if let Ok(editors) = bookr.editors().try_into() {
                ", edited by " (render_people(&editors, false, "editor"))
            }
            (render_series(bookr))
            ". "
            (render_publisher(&key, bookr))
            (render_isbn(bookr))
        }
    }
}

enum PeriodicalType {
    Journal,
    NewsPaper,
    Magazine,
}

fn render_periodical(key: &str, p: &Periodical, pt: PeriodicalType) -> Markup {
    let date_part = if matches!(p.issued, Date::YearMonthDay { .. } | Date::YearMonth { .. }) {
        html! {
            ", "
            time property="datePublished" datetime=(p.issued.to_iso()) {
                (p.issued.explicit(true))
            }
        }
    } else {
        Markup::default()
    };

    let periodical_resource = if let Some(issn) = &p.issn {
        format!("urn:issn:{}", issn.to_string(false))
    } else {
        format!("#{key}-periodical")
    };

    let periodical_type = match pt {
        PeriodicalType::Journal => "Periodical bibo:Journal fabio:Journal",
        PeriodicalType::NewsPaper => "Periodical bibo:Newspaper fabio:Newspaper",
        PeriodicalType::Magazine => "Periodical bibo:Magazine fabio:Magazine",
    };

    let volume_type = match pt {
        PeriodicalType::Journal => "PublicationVolume bibo:CollectedDocument fabio:JournalVolume",
        PeriodicalType::NewsPaper => {
            "PublicationVolume bibo:CollectedDocument fabio:NewspaperVolume"
        }
        PeriodicalType::Magazine => "PublicationVolume bibo:CollectedDocument fabio:MagazineVolume",
    };

    let issue_type = match pt {
        PeriodicalType::Journal => "PublicationIssue bibo:Issue fabio:JournalIssue",
        PeriodicalType::NewsPaper => "PublicationIssue bibo:Issue fabio:NewspaperIssue",
        PeriodicalType::Magazine => "PublicationIssue bibo:Issue fabio:MagazineIssue",
    };

    html! {
        @match (p.issue, &p.volume) {
            (Some(issue), Some(volume)) => {
                span typeof=(periodical_type) resource=(periodical_resource) {
                    link property="publisher dc:publisher" href={"#"(key)"-publisher"};
                    (render_lstr_cite(&p.title, None, Some("name"), Some("alternateName")))
                }
                " "
                span typeof=(volume_type) resource={"#"(key)"-volume"} {
                    link property="isPartOf frbr:partOf" href=(periodical_resource);
                    abbr title="volume" { "vol." }
                    " "
                    span property="volumeNumber bibo:volume" { (volume.to_string(true)) }
                }
                " "
                span typeof=(issue_type) property="isPartOf frbr:partOf" {
                    link property="isPartOf frbr:partOf" href={"#"(key)"-volume"};
                    "(" span property="issueNumber bibo:issue" { (INTL.format_number(issue)) } ")"
                    (date_part)
                }
            }
            (Some(issue), None) => {
                span typeof=(periodical_type) resource=(periodical_resource) {
                    link property="publisher dc:publisher" href={"#"(key)"-publisher"};
                    (render_lstr_cite(&p.title, None, Some("name"), Some("alternateName")))
                }
                " "
                span typeof=(issue_type) property="isPartOf frbr:partOf" {
                    link property="isPartOf frbr:partOf" href=(periodical_resource);
                    "(" span property="issueNumber bibo:issue" { (INTL.format_number(issue)) } ")"
                    (date_part)
                }
            }
            (None, Some(volume)) => {
                span typeof=(periodical_type) resource=(periodical_resource) {
                    link property="publisher dc:publisher" href={"#"(key)"-publisher"};
                    (render_lstr_cite(&p.title, None, Some("name"), Some("alternateName")))
                }
                " "
                span typeof=(volume_type) property="isPartOf frbr:partOf" {
                    link property="isPartOf" href=(periodical_resource);
                    abbr title="volume" { "vol." }
                    " "
                    span property="volumeNumber bibo:volume" { (volume.to_string(true)) }
                    (date_part)
                }
            }
            (None, None) => {
                span typeof=(periodical_type) resource=(periodical_resource) property="isPartOf frbr:partOf" {
                    link property="publisher dc:publisher" href={"#"(key)"-publisher"};
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
        span property="publisher dcterms:publisher" typeof="Organization foaf:Organization" resource={"#"(key)"-publisher"} {
            @if let Some(publisher) = publisher {
                (render_lstr(publisher, Some("noun foaf:name"), Some("name"), Some("alternateName")))
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
            span property="inSupportOf" {
                span property="bibo:degree" typeof="bibo:ThesisDegree" { 
                    span property="dcterms:title" { (g) }
                }
            } ", "
        }
    }
}

fn render_isbn(r: &Reference) -> Markup {
    html! {
        @if let Reference::Book(Book{isbn: Some(isbn), ..}) = r {
            " "
            @let nice_isbn = isbn.0.hyphenate().unwrap();
            abbr.initialism { "ISBN" } ": "
            a.isbn property="sameAs" href={"https://www.worldcat.org/isbn/"(isbn.0)} {
                span property="isbn bibo:isbn" { (nice_isbn) }
            }
            ". "
        }
    }
}

fn render_identifiers(r: &Reference) -> Markup {
    html! {
        @for id in &r.common().identifiers {
            @let info = identifier_info(id);
            " "
            @if info.digital {
                span.id {
                    a property="sameAs" href=(info.url) {
                        span property=(info.property) { (info.presentation_form.as_deref().unwrap_or(id)) }
                    }
                }
            } @else {
                @let (prefix, suffix) = id.split_once(':').unwrap();
                abbr.initialism { (prefix.to_ascii_uppercase()) } ": "
                a.isbn property="sameAs" href=(info.url) {
                    span property=(info.property) { (info.presentation_form.as_deref().unwrap_or(suffix)) }
                }
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
