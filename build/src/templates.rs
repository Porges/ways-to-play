use std::borrow::Cow;

use eyre::{Context, Result};
use itertools::Itertools;
use maud::{html, Markup, DOCTYPE};
use time::macros::format_description;
use url::Url;

use crate::{bib_render::RenderedBibliography, ArticleNode};

pub struct Templater {
    site_url: Url,
}
pub struct OutputFile {
    pub url_path: Cow<'static, str>,
    pub content: Markup,
    pub write_to_disk: bool,
}

impl OutputFile {
    pub fn new(url_path: Cow<'static, str>, content: Markup) -> Self {
        Self {
            url_path,
            content,
            write_to_disk: true,
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
}

struct SimplePage {
    title_string: String,
    title_markup: Markup,
    url_path: Cow<'static, str>,
}

impl SimplePage {
    pub fn new(title: String, url_path: Cow<'static, str>) -> Self {
        Self {
            title_string: title.to_string(),
            title_markup: html! { (title) },
            url_path,
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
            html lang="en" prefix="og: https://ogp.me/ns#" {
                head {
                    meta charset="utf-8";
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
                body itemscope itemtype="https://schema.org/WebPage" {
                    div itemprop="isPartOf" itemscope itemtype="https://schema.org/WebSite" {
                        meta itemprop="url" content=(self.site_url);
                        meta itemprop="name" content="Ways To Play";
                    }
                    header {
                        nav.site {
                            div {
                              a.brand href="/" { "Ways to Play" }
                              ul.under-brand {
                                li { a href="/articles/" { "Articles" } }
                                li { a href="/games/" { "Games" } }
                              }
                            }
                            form #search-box role="search" method="get" action="https://duckduckgo.com/" target="_top" {
                              span.simple {
                                  input type="search" role="searchbox" name="q" required placeholder="Search this site" aria-label="Search this site";
                                  button type="submit" { "\u{1F50D}\u{FE0E}" }
                              }
                              input type="hidden" name="sites" value="games.porg.es";
                            }
                        }

                        @if !breadcrumbs.is_empty() {
                            nav.breadcrumbs aria-label="breadcrumb" {
                                ol itemscope itemtype="https://schema.org/BreadcrumbList" itemprop="breadcrumb" {
                                    @for (ix, (url, name)) in breadcrumbs.iter().enumerate() {
                                        li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" {
                                            meta itemprop="position" content=(ix + 1);
                                            a href=(url) itemprop="item" {
                                                @if let Some(name) = name {
                                                    span itemprop="name" { (name) }
                                                } @else {
                                                    span itemprop="name" { "…" }
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
                            span #author-outer
                                itemscope
                                itemprop="copyrightHolder author publisher"
                                itemtype="https://schema.org/Person" {
                                link href="https://porg.es" itemprop="url";
                                link href="https://bsky.app/profile/porg.es" itemprop="sameAs";
                                span #author {
                                    span itemprop="name" {
                                        span itemprop="givenName" { "George" }
                                        " "
                                        span itemprop="familyName" { "Pollard" }
                                    }
                                }
                            }

                            " "

                            a href="https://creativecommons.org/licenses/by-nc-sa/4.0" itemprop="license" rel="license"
                                title="Licensed under the Creative Commons Attribution Non-Commercial Share-Alike license, 4.0" {
                                "🅭🅯🄏🄎"
                            }

                            " · Feedback? Contact me on "
                            a href="https://toot.cafe/@porges" rel="me" { "Mastodon" }
                            "/"
                            a href="https://bsky.app/profile/porg.es" rel="me" { "Bluesky" }
                            ", "
                            a href="mailto:porges@porg.es?subject=Ways%20To%20Play" rel="me" target="_blank" { "email me" }
                            ", or "
                            a href="https://github.com/Porges/ways-to-play/discussions/new" { "leave a note on GitHub" }
                            "."
                        }
                    }
                }
            }
        };

        Ok(OutputFile::new(
            metadata.url_path().to_owned().into(),
            content,
        ))
    }

    pub fn article<T: ArticleMetadata + BaseMetadata>(
        &self,
        article: &T,
        content: Markup,
        breadcrumbs: &[(&str, Option<&Markup>)],
        children: Option<Markup>,
        prev_next: Option<Markup>,
    ) -> Result<OutputFile> {
        self.base(
            article,
            breadcrumbs,
            html! {
                article itemprop="mainEntity" itemscope itemtype="https://schema.org/Article" itemref="author-outer" {
                    h1.page-title lang=[article.title_lang()] itemprop="headline" {
                        @if let Some(original_title) = article.original_title() {
                            (original_title) " · "
                        }
                        span.simple itemprop="name" { (article.title_markup()) }
                        @if article.is_draft() {
                            " 🚧"
                        }
                    }
                    @if let Some(mod_date) = article.date_modified() {
                        p.last-updated {
                            "Last updated: "
                            time itemprop="dateModified" datetime=(mod_date) {
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

    pub fn bibliography(&self, bib: &RenderedBibliography) -> Result<OutputFile> {
        let content = html! {
            form {
                label for="sort-selector" { "Sort by:" }
                select #sort-selector {
                    option value="name,year" selected { "default" }
                    option value="year asc" { "year (oldest first)" }
                    option value="year desc" { "year (newest first)" }
                    option value="refs desc" { "number of references (most first)" }
                    option value="refs asc" { "number of references (least first)" }
                }
            }
            p.informational {
                (bib.len()) " works"
            }
            ul.reference-list #ref-list {
                @for reference in bib.values() {
                    @let refs = 0; // TODO
                    li data-year=[&reference.iso_date] data-name=(reference.name_key) data-refs=(refs) {
                        (reference.reference)
                    }
                }
            }
        };

        self.base(
            &SimplePage::new(
                "Bibliography of Traditional Games".to_string(),
                "/bibliography/".into(),
            ),
            &[],
            content,
        )
    }

    pub fn welcome(&self) -> Result<OutputFile> {
        let content = html! {
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
        };

        // TODO: recently updated/longest pages

        self.base(
            &SimplePage::new("Welcome".to_string(), "/".into()),
            &[],
            content,
        )
    }

    pub fn games<'a, T: BaseMetadata + ArticleMetadata + GameMetadata + 'a>(
        &self,
        games: impl Iterator<Item = &'a T>,
    ) -> Result<OutputFile> {
        let games_all = Vec::from_iter(games.sorted_by_key(|g| g.title_string()));

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
            form #game-form {
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
                    li data-name=(game.title_string()) data-countries=(game.countries().iter().map(|c| c.alpha2).join(",")) data-players=[game.players()] data-equipment=[game.equipment()] {
                        a href=(game.url_path()) {
                            span.noun lang=[game.title_lang()] {
                                (game.title_markup())
                            }

                            @if let Some(original_title) = game.original_title() {
                                " (" (original_title) ")"
                            }

                            @if game.is_draft() {
                                " 🚧"
                            }
                        }
                    }
                }
            }
        };

        self.base(
            &SimplePage::new("Games".to_string(), "/games/".into()),
            &[],
            content,
        )
    }
}

pub fn render_article_tree(root: &str, tree: &ArticleNode) -> Option<Markup> {
    if tree.children.is_empty() {
        return None;
    }

    Some(html! {
        ul.article-list {
            @for (name, value) in tree.children.iter().sorted_by_key(|(_, c)| c.order) {
                @let path = root.to_string() + name + "/";
                li {
                    @if let Some(name) = value.name {
                        a href=(path) {
                            (name)
                            @if value.draft {
                                " 🚧"
                            }
                        }
                    }

                    (render_article_tree(&path, value).unwrap_or_default())
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
                    a href=(prev.url_path) rel="prev" {
                        span.prevNextArticle { "Previous Article" }
                        br;
                        (name)
                    }
                }
            }

            @if let Some(next) = next {
                @if let Some(name) = next.name {
                    a href=(next.url_path) rel="next" {
                        span.prevNextArticle { "Next Article" }
                        br;
                        (name)
                    }
                }
            }
        }
    })
}
