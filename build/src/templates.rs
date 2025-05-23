use core::str;
use std::borrow::Cow;
use std::collections::HashMap;
use std::sync::Arc;

use eyre::{Context, Result};
use icu::locale::LanguageIdentifier;
use itertools::Itertools;
use maud::{html, Markup, DOCTYPE};
use regex::Regex;
use time::macros::format_description;
use url::Url;
use url_escape::percent_encoding::AsciiSet;
use url_escape::FRAGMENT;

use crate::intl::INTL;
use crate::{bib_render::RenderedBibliography, Aka, ArticleNode};

pub struct Templater {
    site_url: Url,
}

pub struct OutputFile {
    pub title: Markup,
    pub url_path: Cow<'static, str>,
    pub content: Vec<u8>,
    pub write_to_disk: bool,
    pub last_modified: Option<time::Date>,
}

impl OutputFile {
    pub fn new(
        url_path: impl Into<Cow<'static, str>>,
        content: impl Into<Vec<u8>>,
        last_modified: Option<time::Date>,
        title: Markup,
    ) -> Self {
        Self {
            url_path: url_path.into(),
            content: content.into(),
            write_to_disk: true,
            last_modified,
            title,
        }
    }
}

pub trait BaseMetadata {
    fn title_markup(&self) -> &Markup;
    fn title_string(&self) -> &str;

    fn title_lang(&self) -> Option<&str> {
        None
    }

    fn original_title(&self) -> Option<&Markup> {
        None
    }

    fn og_type(&self) -> Option<&str> {
        None
    }

    fn url_path(&self) -> &str;

    fn is_draft(&self) -> bool;

    fn modification_date(&self) -> Option<time::Date>;
}

struct SimplePage {
    title_string: String,
    title_markup: Markup,
    url_path: Cow<'static, str>,
    last_modified: Option<time::Date>,
}

impl SimplePage {
    pub fn new(
        title: String,
        url_path: Cow<'static, str>,
        last_modified: Option<time::Date>,
    ) -> Self {
        Self {
            title_string: title.to_string(),
            title_markup: html! { (title) },
            url_path,
            last_modified,
        }
    }
}

impl BaseMetadata for SimplePage {
    fn title_markup(&self) -> &Markup {
        &self.title_markup
    }

    fn title_string(&self) -> &str {
        &self.title_string
    }

    fn url_path(&self) -> &str {
        &self.url_path
    }

    fn is_draft(&self) -> bool {
        false
    }

    fn modification_date(&self) -> Option<time::Date> {
        self.last_modified
    }
}

pub trait ArticleMetadata {
    fn date_modified(&self) -> Option<time::Date>;
}

pub trait GameMetadata {
    fn countries(&self) -> &[celes::Country];
    fn players(&self) -> Option<&str>;
    fn equipment(&self) -> Option<&str>;
}

impl Templater {
    pub fn new(site_url: Url) -> Self {
        Self { site_url }
    }

    pub fn base(
        &self,
        metadata: &dyn BaseMetadata,
        breadcrumbs: &[(&str, Option<&Markup>)],
        content: Markup,
    ) -> Result<OutputFile> {
        let url = self
            .site_url
            .join(metadata.url_path())
            .wrap_err("building canonical url")?;

        let content = html! {
            (DOCTYPE)
            html lang="en" typeof="schema:WebPage" prefix="og: https://ogp.me/ns# schema: http://schema.org/ cc: http://creativecommons.org/ns# dcterms: http://purl.org/dc/terms/ bibo: http://purl.org/ontology/bibo/ fabio: http://purl.org/spar/fabio/ pro: http://purl.org/spar/pro/ frbr: http://purl.org/vocab/frbr/core# biro: http://purl.org/spar/biro/ co: http://purl.org/co/ datacite: http://purl.org/spar/datacite/" {
                head {
                    meta charset="utf-8";
                    base href=(url);
                    link rel="shortcut icon" type="image/png" href="/favicon.png" ;
                    link rel="preload" href="/fonts/sourceserif4/SourceSerif4Variable-Latin-Roman.ttf.woff2" as="font" type="font/woff2" crossorigin;
                    link rel="preload" href="/fonts/sourceserif4/SourceSerif4Variable-Latin-Italic.ttf.woff2" as="font" type="font/woff2" crossorigin;
                    link rel="stylesheet" href="/fonts/sourceserif4.css" type="text/css" ;
                    link rel="stylesheet" href="/fonts/charis.css" type="text/css" ;
                    link rel="stylesheet" href="/css/main.css" type="text/css" ;
                    link rel="stylesheet" href="/css/text.css" type="text/css" ;
                    link rel="canonical" href=(url);
                    link rel="alternate" type="application/atom+xml" title="Ways To Play Atom feed" href="/atom.xml" ;
                    meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no";
                    //meta name="generator" content="Eleventy";
                    meta name="theme-color" content="#000000";
                    meta name="robots" content="noai,noimageai";
                    title { (metadata.title_string()) " · Ways To Play" }
                    meta property="og:site_name" content="Ways To Play";
                    meta property="og:title" content=(metadata.title_string()) lang=[metadata.title_lang()];
                    meta property="og:url" content=(url);
                    @if let Some(og_type) = metadata.og_type() {
                        meta property="og:type" content=(og_type);
                    }
                    // ${ifSet(ogImage, i => `<meta property="og:image" content="${i}" />`)}
                    // ${ifSet(excerpt, e => `<meta property="og:description" content="${e}" /><meta name="description" content="${e}" />`)}
                    script type="module" src="/js/main.js" {}
                    //<!-- Google tag (gtag.js) -->
                    script async src="https://www.googletagmanager.com/gtag/js?id=G-Z0CH5J6QX3" {}
                    script {
                      "window.dataLayer = window.dataLayer || [];"
                      "function gtag(){dataLayer.push(arguments);}"
                      "gtag('js', new Date());"
                      "gtag('config', 'G-Z0CH5J6QX3');"
                    }
                    script {
                      "(function(c,l,a,r,i,t,y){"
                      "c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};"
                      "t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;"
                      "y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);"
                      "})(window, document, 'clarity', 'script', 'gzk1ekbi1n');"
                    }
                }
                body vocab="http://schema.org/" {
                    header {
                        nav.site {
                            div {
                              span property="isPartOf" typeof="WebSite" resource=(self.site_url) {
                                a.brand property="url" href=(self.site_url) {
                                    span property="name" { "Ways to Play" }
                                }
                              }
                              ul.under-brand {
                                li { a href="/articles/" { "Articles" } }
                                li { a href="/games/" { "Games" } }
                              }
                            }
                            form #search-box role="search" method="get" action="https://duckduckgo.com/" target="_top" {
                              span.simple {
                                  input type="search" name="q" required placeholder="Search this site" aria-label="Search this site";
                                  button type="submit" { "\u{1F50D}\u{FE0E}" }
                              }
                              input type="hidden" name="sites" value="games.porg.es";
                            }
                        }

                        @if !breadcrumbs.is_empty() {
                            nav.breadcrumbs aria-label="breadcrumb" {
                                ol property="breadcrumb" typeof="BreadcrumbList" {
                                    @for (ix, (url, name)) in breadcrumbs.iter().enumerate() {
                                        li property="itemListElement" typeof="ListItem" {
                                            meta property="position" content=(ix + 1);
                                            a property="item" typeof="WebPage" href=(url) {
                                                @if let Some(name) = name {
                                                    span property="name" { (name) }
                                                } @else {
                                                    span property="name" { "…" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    main {
                        (content)
                    }
                    footer #site-footer {
                        span {
                            a href="https://neocities.org/site/waystoplay" {
                                img.inline-img.big width="135" height="40" src="/small-images/Hosted_by_Neocities.svg" alt="Hosted by Neocities";
                            }
                        }
                        " "
                        span {
                            "© "
                            span resource="#me"
                                property="copyrightHolder author publisher"
                                typeof="Person" {
                                span {
                                    span property="name" {
                                        span property="givenName" { "George" }
                                        " "
                                        span property="familyName" { "Pollard" }
                                    }
                                }
                                link property="url sameAs" href="https://porg.es";
                                link property="sameAs" href="https://bsky.app/profile/porg.es";
                                meta property="email" content="porges@porg.es";
                            }

                            " "

                            a href="https://creativecommons.org/licenses/by-nc-sa/4.0" rel="license"
                                title="Licensed under the Creative Commons Attribution Non-Commercial Share-Alike license, 4.0" {
                                "🅭🅯🄏🄎"
                            }

                            " · Feedback? Contact me on "
                            span vocab="" {
                                a rel="me" href="https://bsky.app/profile/porg.es" { "Bluesky" }
                            }
                            "/"
                            span vocab="" {
                                a rel="me" href="https://toot.cafe/@porges" { "Mastodon" }
                            }
                            ", "
                            span vocab="" {
                                a rel="me" href="mailto:porges@porg.es?subject=Ways%20To%20Play" target="_blank" { "email me" }
                            }
                            ", or "
                            a href="https://github.com/Porges/ways-to-play/discussions/new" { "leave a note on GitHub" }
                            "."
                        }
                    }
                }
            }
        };

        Ok(OutputFile::new(
            metadata.url_path().to_owned(),
            content.into_string(),
            metadata.modification_date(),
            metadata.title_markup().clone(),
        ))
    }

    pub fn article<T: ArticleMetadata + BaseMetadata>(
        &self,
        article: &T,
        content: &Markup,
        breadcrumbs: &[(&str, Option<&Markup>)],
        children: Option<Markup>,
        prev_next: Option<Markup>,
    ) -> Result<OutputFile> {
        self.base(
            article,
            breadcrumbs,
            html! {
                article property="mainEntity" typeof="http://schema.org/Article" {
                    link property="copyrightHolder author publisher" href="#me";
                    h1.page-title property="headline" {
                        @if let Some(original_title) = article.original_title() {
                            (original_title) " · "
                        }
                        span.simple property="name" { (article.title_markup()) }
                        @if article.is_draft() {
                            " 🚧"
                        }
                    }
                    @if let Some(mod_date) = article.date_modified() {
                        p.last-updated {
                            "Last updated: "
                            time property="dateModified" datetime=(mod_date) {
                                (mod_date.format(&format_description!("[weekday repr:long], [day padding:none] [month repr:long] [year]"))?)
                            }
                            "."
                        }
                    }
                    (content)
                }
                @if children.is_some() || prev_next.is_some() {
                    div #after-article {
                        @if let Some(children) = children {
                            @if !content.0.is_empty() {
                                hr;
                                p.articlesInThisSection {
                                    "Other articles under “" (article.title_markup()) "”:"
                                }
                            }
                            (children)
                        }
                        @if let Some(prev_next) = prev_next {
                            hr;
                            (prev_next)
                        }
                    }
                }
            },
        )
    }

    pub fn bibliography(
        &self,
        bib: &RenderedBibliography,
        mut cites: HashMap<String, Vec<(Arc<Markup>, String)>>,
    ) -> Result<OutputFile> {
        let content = html! {
            h1.page-title { span.simple property="name" { "A Bibliography of Traditional Games" } }
            form.tidy {
                label {
                    "Sort by:"
                    select #sort-selector {
                        option value="name,year" selected { "default" }
                        option value="year asc" { "year (oldest first)" }
                        option value="year desc" { "year (newest first)" }
                        option value="refs desc" { "references (most first)" }
                        option value="refs asc" { "references (least first)" }
                    }
                }
            }
            hr;
            p.informational {
                (bib.len()) " works"
            }
            ul.reference-list #ref-list {
                @for (key, reference) in bib {
                    @let cites = cites.remove(key);
                    li typeof="biro:BibliographicReference"
                        data-year=[&reference.iso_date]
                        data-name=(reference.name_key)
                        data-refs=(cites.as_ref().map(|cs| cs.len()).unwrap_or_default())
                    {
                        (reference.reference)
                        @if let Some(cites) = cites {
                            ul.backreferences {
                                @for it in cites.into_iter().sorted_by_cached_key(|x| x.0.0.clone()) {
                                    li {
                                        a href=(it.1) { (it.0) }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        self.base(
            &SimplePage::new(
                "A Bibliography of Traditional Games".to_string(),
                "/bibliography/".into(),
                None, // TODO - bibliography modification date
            ),
            &[],
            content,
        )
    }

    pub fn welcome(&self, all_files: &[OutputFile]) -> Result<OutputFile> {
        let recently_updated = all_files
            .iter()
            .sorted_by_key(|f| f.last_modified)
            .rev()
            .take(30);

        let regex = Regex::new("(<header.*?</header>|<footer.*?</footer>|<dialog.*?</dialog>|<h2 id=\"references\">.*$)").unwrap();
        let word_break_invariant_options = Default::default();
        let segmenter = icu::segmenter::WordSegmenter::new_auto(word_break_invariant_options);
        let long_pages = all_files
            .iter()
            .sorted_by_key(|f| f.content.len())
            .rev()
            .take(30)
            .map(|f| {
                let string_content = str::from_utf8(&f.content).unwrap();
                let without_dialogs_and_references = regex.replace_all(string_content, "");
                let text_value = crate::string_value_of_html(&without_dialogs_and_references);
                let mut word_count = 0;
                let mut iter = segmenter.segment_str(&text_value);
                while iter.next().is_some() {
                    word_count += iter.is_word_like() as u64;
                }
                (f, word_count)
            })
            .sorted_by_key(|(_, wc)| *wc)
            .rev()
            .take(20);

        let content = html! {
            h1.page-title property="name" {
                "Welcome to Ways To Play"
            }

            p {
                "This is a site about games, traditional and modern, that are played around the world."
            }

            p {
                "There are two main areas on this site, of " strong { a href="/articles/" { "Articles" } }
                " about games or families of games, and " strong { a href="/games" { "Games" } }
                " themselves. There is also an index of " strong { a href="/game-names-index/" { "game names by language" } }
                ", if you are trying to locate a game. Every page on this website should be considered a work in progress:"
                " nothing is definite, and everything is subject to revision!"
                " "
                "You might also be interested in the " strong { a href="/about/" { "About" } } " page or perhaps"
                " the site-wide " strong { a href="/bibliography/" { "Bibliography" } } "."
            }

            p {
                "For other sites about games, please visit the " strong { a href="/see-also/" { "See Also" } } " page."
            }

            p.george {
                "— George"
            }

            h2 { "Recently updated" }
            ul.columnar-large {
                @let format = format_description!("[year]-[month]-[day]");
                @for file in recently_updated {
                    @let date = file.last_modified.unwrap().format(format)?;
                    li {
                        a href=(file.url_path) { (file.title) }
                        span.recently-updated-time {
                            " (" time.relative datetime=(date) { (date) } ")"
                        }
                    }
                }
            }

            h2 { "Longest pages" }
            ul.columnar-large {
                @for (file, words) in long_pages {
                    li {
                        a href=(file.url_path) { (file.title) }
                        span.recently-updated-time {
                            " (" (INTL.format_number(words)) " words)"
                        }
                    }
                }
            }
        };

        self.base(
            &SimplePage::new("Welcome".to_string(), "/".into(), None),
            &[],
            content,
        )
    }

    pub fn games<'a, T: BaseMetadata + ArticleMetadata + GameMetadata + 'a>(
        &self,
        games: impl Iterator<Item = &'a T>,
    ) -> Result<OutputFile> {
        let games_all = Vec::from_iter(games.sorted_by_key(|g| g.title_string()));
        let modification_date = games_all.iter().filter_map(|g| g.modification_date()).max();

        let player_options = games_all
            .iter()
            .filter_map(|g| g.players())
            .unique()
            .sorted();

        let country_options = games_all
            .iter()
            .flat_map(|g| g.countries())
            .sorted()
            .unique();

        let equipment_options = games_all
            .iter()
            .filter_map(|g| g.equipment())
            .sorted()
            .unique();

        let content = html! {
            h1.page-title { span.simple property="name" { "Games Index" } }
            form.tidy #game-form {
                div {
                    label {
                        "Players: "
                        select name="players" {
                            option value="" { "any" }
                            @for players in player_options {
                                option value=(players) { (players) }
                            }
                        }
                    }
                }
                div {
                    label {
                        "Country: "
                        select name="countries" data-contains="true" {
                            option value="" { "any" }
                            @for country in country_options {
                                option value=(country.alpha2) { (country.long_name) }
                            }
                        }
                    }
                }
                div {
                    label {
                        "Type/equipment: "
                        select name="equipment" {
                            option value="" { "any" }
                            @for equipment in equipment_options {
                                option value=(equipment) { (equipment) }
                            }
                        }
                    }
                }
            }
            hr;
            p.informational {
                span #games-count { (games_all.len()) } " games found"
            }
            ul.columnar #games-list {
                @for game in games_all {
                    li
                        data-name=(game.title_string())
                        data-countries=(game.countries().iter().map(|c| c.alpha2).join(","))
                        data-players=[game.players()]
                        data-equipment=[game.equipment()]
                    {
                        a href=(game.url_path()) {
                            @if game.is_draft() {
                                "🚧"
                            }

                            span.noun lang=[game.title_lang()] {
                                (game.title_markup())
                            }

                            @if let Some(original_title) = game.original_title() {
                                " · " (original_title)
                            }
                        }

                        @if let Some(e) = game.equipment() {
                            " "
                            @if e.contains("Hanafuda") {
                                span title="Hanafuda game" { "🎴" }
                            } @else if e.starts_with("Card") {
                                span title="Card game" { "🃏" }
                            } @else if e.starts_with("Dice") {
                                span title="Dice game" { "🎲" }
                            } @else if e.starts_with("Board") {
                                span title="Board game" { "♟️" }
                            } @else if e.starts_with("Hand") {
                                span title="Hand game" { "🖐️" }
                            } @else if e.starts_with("Pen") {
                                span title="Pen & paper game" { "✏️" }
                            }
                        }
                    }
                }
            }
        };

        self.base(
            &SimplePage::new("Games".to_string(), "/games/".into(), modification_date),
            &[],
            content,
        )
    }

    pub fn names_index(&self, akas: impl Iterator<Item = Aka>) -> Result<OutputFile> {
        let name_of = |lang: &LanguageIdentifier| -> Result<Markup> {
            match INTL.english_name(lang) {
                Some(name) => {
                    if let Some(auto_name) = INTL.autonym(lang) {
                        if auto_name != name {
                            return Ok(
                                html! { (name) " · " span.noun lang=(lang) { (auto_name) } },
                            );
                        }
                    }

                    Ok(html! { (name) })
                }
                None => {
                    eyre::bail!("Unknown language: {}", lang)
                }
            }
        };

        struct LangGroup {
            lang_name: Markup,
            lang_link: String,
            lang_tag: LanguageIdentifier,
            game_names: Vec<GameName>,
        }

        struct GameName {
            lang_id: LanguageIdentifier,
            aka: Markup,
            url: Arc<String>,
        }

        let mut lang_groups: Vec<LangGroup> = akas
            .map(|aka| {
                Ok((
                    INTL.language_without_script(&aka.lang_id),
                    GameName {
                        lang_id: aka.lang_id,
                        aka: aka.word,
                        url: aka.url_path,
                    },
                ))
            })
            .collect::<Result<Vec<_>>>()?
            .into_iter()
            .into_group_map()
            .into_iter()
            .map(|(lang_tag, game_names)| {
                Ok(LangGroup {
                    lang_name: name_of(&lang_tag)?,
                    lang_link: format!(
                        "https://en.wikipedia.org/wiki/ISO_639:{}",
                        lang_tag.language
                    ),
                    lang_tag,
                    game_names,
                })
            })
            .collect::<Result<_>>()?;

        let collator = INTL.collator_english();
        lang_groups.sort_by(|a, b| collator.compare(&a.lang_name.0, &b.lang_name.0));

        // in addition to the default fragment escaping we also need to escape `-`,
        // see: https://developer.mozilla.org/en-US/docs/Web/URI/Fragment/Text_fragments
        const FRAGMENT_TEXT: &AsciiSet = &FRAGMENT.add(b'-');

        let content = html! {
            h1.page-title { span.simple property="name" { "Game Names Index" } }
            p {
                "This page lists all game names by language, as an index to the articles where they are discussed."
            }
            h2 { "Languages" }
            ul.columnar {
                @for group in &lang_groups {
                    li {
                        a href={"#" (group.lang_tag)} {
                            (group.lang_name)
                        }
                    }
                }
            }
            hr;
            @for group in lang_groups {
                h3 #(group.lang_tag) { a href=(group.lang_link) { (group.lang_name) } }
                ul.columnarr {
                    @let collator = INTL.collator_for(group.lang_tag.language);
                    @for game_name in group.game_names.into_iter().sorted_by(|a, b| collator.compare(&a.aka.0, &b.aka.0)) {
                        li {
                            a href={(game_name.url) "#:~:text=" (url_escape::encode(&game_name.aka.0, FRAGMENT_TEXT))}
                              lang=(game_name.lang_id) {
                                // assuming that titlecase doesn't introduce HTML injection
                                (maud::PreEscaped(INTL.titlecase(game_name.lang_id.language, &game_name.aka.0)))
                            }
                        }
                    }
                }
            }
        };

        self.base(
            &SimplePage::new(
                "Game Names Index".to_string(),
                "/game-names-index/".into(),
                None, // TODO modification date?
            ),
            &[],
            content,
        )
    }
}

pub fn render_article_tree(root: &str, tree: &ArticleNode, render_drafts: bool) -> Option<Markup> {
    if tree.children.is_empty() {
        return None;
    }

    Some(html! {
        ul.article-list {
            @for (name, value) in tree.children.iter().sorted_by_key(|(_, c)| c.order) {
                @if !value.draft || render_drafts {
                    @let path = root.to_string() + name + "/";
                    li {
                        @if let Some(name) = value.name {
                            a href=(path) {
                                (name)
                                @if let Some(orig_name) = value.original_name {
                                    " (" (orig_name) ")"
                                }
                                @if value.draft {
                                    " 🚧"
                                }
                            }
                        }

                        (render_article_tree(&path, value, render_drafts).unwrap_or_default())
                    }
                }
            }
        }
    })
}

pub fn render_prev_next(prev: Option<&ArticleNode>, next: Option<&ArticleNode>) -> Option<Markup> {
    if prev.is_none() && next.is_none() {
        return None;
    }

    Some(html! {
        nav.prev-next aria-label="Nearby Articles" {
            @if let Some(prev) = prev {
                @if let Some(name) = prev.name {
                    a rel="prev" href=(prev.url_path) {
                        span.prevNextArticle { "Previous Article" }
                        br;
                        (name)
                    }
                }
            }

            @if let Some(next) = next {
                @if let Some(name) = next.name {
                    a rel="next" href=(next.url_path){
                        span.prevNextArticle { "Next Article" }
                        br;
                        (name)
                    }
                }
            }
        }
    })
}
