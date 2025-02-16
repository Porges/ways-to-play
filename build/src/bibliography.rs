use std::{collections::BTreeMap, convert::Infallible, str::FromStr};

use icu::locid::LanguageIdentifier;
use num_format::ToFormattedString;
use serde::{
    de::{self, Visitor},
    Deserialize, Deserializer,
};
use serde_with::serde_as;
use time::Month;

use crate::bib_render::ordinal;

#[derive(Deserialize, Debug, Default)]
#[serde(transparent)]
pub struct Bibliography {
    pub references: BTreeMap<String, Reference>,
}

#[derive(Deserialize, Debug)]
#[serde(tag = "type")]
pub enum Reference {
    #[serde(rename = "article-journal")]
    JournalArticle(JournalArticle),

    #[serde(rename = "article-newspaper")]
    NewspaperArticle(NewspaperArticle),

    #[serde(rename = "article-magazine")]
    MagazineArticle(MagazineArticle),

    #[serde(rename = "book")]
    Book(Book),

    #[serde(rename = "chapter")]
    Chapter(Chapter),

    #[serde(rename = "document")]
    Document(Document),

    #[serde(rename = "webpage")]
    WebPage(WebPage),

    #[serde(rename = "thesis")]
    Thesis(Thesis),

    #[serde(rename = "paper-conference")]
    ConferencePaper(ConferencePaper),

    #[serde(rename = "patent")]
    Patent(Patent),
}

impl Reference {
    pub fn common(&self) -> &Common {
        match self {
            Reference::JournalArticle(x) => &x.common,
            Reference::NewspaperArticle(x) => &x.common,
            Reference::MagazineArticle(x) => &x.common,
            Reference::Book(x) => &x.common,
            Reference::Chapter(x) => &x.common,
            Reference::Document(x) => &x.common,
            Reference::WebPage(x) => &x.common,
            Reference::Thesis(x) => &x.common,
            Reference::ConferencePaper(x) => &x.common,
            Reference::Patent(x) => &x.common,
        }
    }

    pub fn authors(&self) -> &[Person] {
        &self.common().author
    }

    pub fn publisher(&self) -> Option<&LString> {
        match self {
            Reference::Book(book) => book.publisher.as_ref(),
            Reference::WebPage(web_page) => web_page.publisher.as_ref(),
            Reference::Thesis(thesis) => thesis.publisher.as_ref(),
            Reference::Document(doc) => doc.publisher.as_ref(),
            _ => None,
        }
        // TODO: periodical publishers shouldn’t be here, but should others?
    }

    pub fn editors(&self) -> &[Person] {
        match self {
            Reference::Book(book) => &book.editor,
            Reference::WebPage(web_page) => &web_page.editor,
            _ => &[],
        }
        // TODO: periodical editors shouldn’t be here, but should others?
    }

    pub fn iso_date(&self) -> Option<String> {
        match self {
            Reference::JournalArticle(JournalArticle { periodical, .. })
            | Reference::NewspaperArticle(NewspaperArticle { periodical, .. })
            | Reference::MagazineArticle(MagazineArticle { periodical, .. }) => {
                Some(periodical.issued.to_iso())
            }
            Reference::Book(Book { issued, .. })
            | Reference::Document(Document { issued, .. })
            | Reference::WebPage(WebPage { issued, .. })
            | Reference::ConferencePaper(ConferencePaper {
                book: Book { issued, .. },
                ..
            })
            | Reference::Chapter(Chapter {
                book: Book { issued, .. },
                ..
            }) => issued.as_ref().map(|d| d.to_iso()),
            Reference::Thesis(Thesis { issued, .. }) => Some(issued.to_iso()),
            Reference::Patent(patent) => {
                Some(patent.issued.as_ref().unwrap_or(&patent.filed).to_iso())
            }
        }
    }
}

#[serde_as]
#[derive(Deserialize, Debug, Clone)]
#[serde(deny_unknown_fields)]
pub struct Common {
    #[serde(default)]
    #[serde_with(deserialize_as = "serde_with::OneOrMany")]
    pub author: Vec<Person>,

    #[serde(default)]
    #[serde_with(deserialize_as = "serde_with::OneOrMany")]
    pub translator: Vec<Person>,

    pub title: LString,

    #[serde(rename = "URL")]
    pub url: Option<String>,
    #[serde(rename = "archive-URL")]
    pub archive_url: Option<String>,

    pub language: Option<LanguageIdentifier>,

    pub notes: Option<String>,
    pub warnings: Option<String>,
}

#[serde_as]
#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct JournalArticle {
    #[serde(flatten)]
    pub common: Common,

    pub page: Option<Pagination>,

    #[serde(rename = "in")]
    pub periodical: Periodical,
}

#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct NewspaperArticle {
    #[serde(flatten)]
    pub common: Common,
    pub page: Option<Pagination>,

    #[serde(rename = "in")]
    pub periodical: Periodical,
}

#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct MagazineArticle {
    #[serde(flatten)]
    pub common: Common,
    pub page: Option<Pagination>,

    #[serde(rename = "in")]
    pub periodical: Periodical,
}

#[serde_as]
#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct Periodical {
    pub title: LString,
    pub volume: Option<NumberOrString>,
    pub issue: Option<u32>,
    pub issued: Date,

    #[serde(default)]
    #[serde_with(deserialize_as = "serde_with::OneOrMany")]
    pub editor: Vec<Person>,

    pub publisher: Option<LString>,

    #[serde(rename = "publisher-place")]
    pub publisher_place: Option<LString>,

    #[serde(rename = "ISSN")]
    pub issn: Option<NumberOrString>,
}

#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
#[serde(untagged)]
pub enum Pagination {
    Str(String),
    Num(u32),
}

#[serde_as]
#[derive(Deserialize, Debug, Clone)]
#[serde(deny_unknown_fields)]
pub struct Book {
    #[allow(unused)] // for back-compat
    pub r#type: Option<String>,

    #[serde(flatten)]
    pub common: Common,

    pub subtitle: Option<String>,

    pub issued: Option<Date>,

    pub edition: Option<NumberOrString>,
    pub volume: Option<NumberOrString>,

    #[serde(rename = "volume-title")]
    pub volume_title: Option<LString>,

    pub publisher: Option<LString>,

    #[serde(rename = "publisher-place")]
    pub publisher_place: Option<LString>,

    #[serde(rename = "original-publisher")]
    pub original_publisher: Option<LString>,

    #[serde(rename = "original-date")]
    pub original_date: Option<Date>,

    #[serde(rename = "original-title")]
    pub original_title: Option<LString>,

    #[serde(rename = "ISBN")]
    pub isbn: Option<Isbn>,

    pub series: Option<Series>,

    #[serde(default)]
    #[serde_with(deserialize_as = "serde_with::OneOrMany")]
    pub editor: Vec<Person>,
}

#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct Chapter {
    #[serde(flatten)]
    pub common: Common,

    #[serde(rename = "in")]
    pub book: Book,

    pub page: Option<Pagination>,
}

#[serde_as]
#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct WebPage {
    #[serde(flatten)]
    pub common: Common,

    #[serde(default)]
    #[serde_with(deserialize_as = "serde_with::OneOrMany")]
    pub editor: Vec<Person>,

    #[serde(rename = "container-title")]
    pub container_title: Option<LString>,

    pub edition: Option<u32>,

    pub issued: Option<Date>,

    pub publisher: Option<LString>,
    #[serde(rename = "publisher-place")]
    pub publisher_place: Option<LString>,
}

#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct ConferencePaper {
    #[serde(flatten)]
    pub common: Common,

    pub page: Option<Pagination>,

    #[serde(rename = "in")]
    pub book: Book,
    // TODO: conference date?
}

#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct Patent {
    #[serde(flatten)]
    pub common: Common,

    pub filed: Date,
    pub issued: Option<Date>,

    #[serde(rename = "patentNumber")]
    pub patent_number: Option<NumberOrString>,

    #[serde(rename = "applicationNumber")]
    pub application_number: Option<NumberOrString>,
}

#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct Thesis {
    #[serde(flatten)]
    pub common: Common,
    pub genre: Option<String>,
    pub issued: Date,
    pub volume: Option<u32>,
    pub publisher: Option<LString>,
    #[serde(rename = "publisher-place")]
    pub publisher_place: Option<LString>,
}

#[derive(Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct Document {
    #[serde(flatten)]
    pub common: Common,

    pub issued: Option<Date>,

    pub publisher: Option<LString>,
    #[serde(rename = "publisher-place")]
    pub publisher_place: Option<LString>,
}

#[serde_as]
#[derive(Deserialize, Debug, Clone)]
#[serde(deny_unknown_fields)]
pub struct Series {
    pub title: LString,
    pub volume: Option<u32>,
    pub number: Option<u32>,

    #[serde(rename = "URL")]
    pub url: Option<String>,

    #[serde(rename = "ISSN")]
    pub issn: Option<NumberOrString>,

    #[serde(default)]
    #[serde_with(deserialize_as = "serde_with::OneOrMany")]
    pub editor: Vec<Person>,
}

#[derive(Deserialize, Debug, Clone)]
#[serde(deny_unknown_fields)]
pub struct Person {
    pub family: Option<String>,
    pub given: String,
    pub lang: Option<String>,

    pub alt: Option<LString>,
    pub suffix: Option<String>,
    pub url: Option<String>,
}

#[derive(Deserialize, Debug, Default, Clone, Copy)]
#[serde(deny_unknown_fields)]
pub struct DateAttributes {
    #[serde(default)]
    pub circa: bool,

    #[serde(default, rename = "OS")]
    pub old_style: bool,
}

#[derive(Deserialize, Debug, Clone)]
#[serde(untagged, deny_unknown_fields)]
pub enum Date {
    YearSeason {
        year: u32,
        season: String,
        #[serde(flatten, default)]
        attr: DateAttributes,
    },
    YearMonthDay {
        year: u32,
        month: u8,
        day: u8,
        #[serde(flatten, default)]
        attr: DateAttributes,
    },
    YearMonth {
        year: u32,
        month: u8,
        #[serde(flatten, default)]
        attr: DateAttributes,
    },
    Year {
        year: u32,
        #[serde(flatten, default)]
        attr: DateAttributes,
    },
    JustYear(u32),
}

impl Date {
    pub fn attr(&self) -> DateAttributes {
        match self {
            Date::YearSeason { attr, .. }
            | Date::YearMonthDay { attr, .. }
            | Date::YearMonth { attr, .. }
            | Date::Year { attr, .. } => *attr,
            Date::JustYear(_) => DateAttributes::default(),
        }
    }

    pub fn year(&self) -> u32 {
        match self {
            Date::YearSeason { year, .. }
            | Date::YearMonthDay { year, .. }
            | Date::YearMonth { year, .. }
            | Date::Year { year, .. }
            | Date::JustYear(year) => *year,
        }
    }

    pub fn to_iso(&self) -> String {
        match self {
            Date::JustYear(year) | Date::Year { year, .. } | Date::YearSeason { year, .. } => {
                format!("{year:04}")
            }
            Date::YearMonth { year, month, .. } => format!("{year}-{month:02}"),
            Date::YearMonthDay {
                year, month, day, ..
            } => format!("{year:04}-{month:02}-{day:02}"),
        }
    }

    pub fn explicit(&self, omit_if_just_year: bool) -> String {
        match self.clone() {
            Date::Year { year, .. } | Date::JustYear(year) => {
                if omit_if_just_year {
                    String::new()
                } else {
                    year.to_string()
                }
            }
            Date::YearSeason { year, season, .. } => format!("{season} {year}"),
            Date::YearMonthDay {
                year,
                month,
                day,
                attr,
            } => {
                let date = time::Date::from_calendar_date(
                    year as i32,
                    Month::try_from(month).unwrap(),
                    day,
                )
                .map_err(|_| format!("invalid date: {year}-{month:02}-{day:02}"))
                .unwrap();

                // NB: this only handles old-style English dates
                let weekday = if attr.old_style {
                    let year = if month < 3 || month == 3 && day < 25 {
                        year + 1
                    } else {
                        year
                    };

                    time::Date::from_calendar_date(
                        year as i32,
                        Month::try_from(month).unwrap(),
                        day,
                    )
                    .unwrap()
                    .weekday()
                    .nth_next(11)
                } else {
                    date.weekday()
                };

                format!(
                    "{}, {} {} {}{}",
                    weekday,
                    ordinal(date.day() as u64),
                    date.month(),
                    date.year(),
                    if attr.old_style { " [OS]" } else { "" } // TODO: HTML
                )
            }
            Date::YearMonth { year, month, .. } => {
                let month = Month::try_from(month).unwrap();
                format!("{month} {year}")
            }
        }
    }
}

#[derive(Debug, Clone)]
pub struct LString {
    pub value: String,
    pub lang: Option<LanguageIdentifier>,
    pub alt: Option<String>,
}

impl From<String> for LString {
    fn from(value: String) -> Self {
        LString {
            value,
            lang: None,
            alt: None,
        }
    }
}

impl FromStr for LString {
    type Err = Infallible;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(s.to_string().into())
    }
}

impl<'de> Deserialize<'de> for LString {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct V;

        impl<'de> Visitor<'de> for V {
            type Value = LString;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str(
                    "a string or an object with a `value` and optionally a `lang` and `alt`",
                )
            }

            fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
            where
                E: de::Error,
            {
                Ok(LString::from(v.to_string()))
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: de::MapAccess<'de>,
            {
                let mut value: Option<String> = None;
                let mut lang = None;
                let mut alt = None;

                while let Some((k, v)) = map.next_entry()? {
                    match k {
                        "value" => {
                            if value.is_some() {
                                return Err(de::Error::duplicate_field("value"));
                            }

                            value = Some(v);
                        }
                        "lang" => {
                            if lang.is_some() {
                                return Err(de::Error::duplicate_field("lang"));
                            }

                            lang = match LanguageIdentifier::try_from_bytes(v.as_bytes()) {
                                Ok(l) => Some(l),
                                Err(e) => return Err(de::Error::custom(e)),
                            };
                        }
                        "alt" => {
                            if alt.is_some() {
                                return Err(de::Error::duplicate_field("alt"));
                            }

                            alt = Some(v);
                        }
                        _ => return Err(de::Error::unknown_field(k, &["value", "lang", "alt"])),
                    }
                }

                let Some(value) = value else {
                    return Err(de::Error::missing_field("value"));
                };

                Ok(LString { value, lang, alt })
            }
        }

        deserializer.deserialize_any(V)
    }
}

#[derive(Debug, Clone)]
pub struct Isbn(pub isbn::Isbn);

impl<'de> Deserialize<'de> for Isbn {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct V;

        impl Visitor<'_> for V {
            type Value = Isbn;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string or number in ISBN format")
            }

            fn visit_u64<E>(self, v: u64) -> Result<Self::Value, E>
            where
                E: de::Error,
            {
                self.visit_str(&v.to_string())
            }

            fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
            where
                E: de::Error,
            {
                match isbn::Isbn::from_str(v) {
                    Ok(x) => Ok(Isbn(x)),
                    Err(e) => Err(de::Error::custom(e)),
                }
            }
        }

        deserializer.deserialize_any(V)
    }
}

#[derive(Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum NumberOrString {
    Str(String),
    Num(u64),
}

impl NumberOrString {
    pub fn to_string(&self, locale: bool) -> String {
        match self {
            NumberOrString::Str(s) => s.clone(),
            NumberOrString::Num(n) => {
                if locale {
                    n.to_formatted_string(&num_format::Locale::en)
                } else {
                    n.to_string()
                }
            }
        }
    }
}
