use std::borrow::Cow;

use eyre::{Context, Result};
use itertools::Itertools;
use maud::{html, Markup, DOCTYPE};
use time::macros::format_description;
use url::Url;

use crate::{bib_render, bibliography::Bibliography};

pub struct Templater {
    site_url: Url,
}
pub struct OutputFile {
    pub url_path: Cow<'static, str>,
    pub content: Markup,
}

pub trait BaseMetadata {
    fn title(&self) -> &str;

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
}

struct SimplePage {
    title: Cow<'static, str>,
    url_path: Cow<'static, str>,
}

impl BaseMetadata for SimplePage {
    fn title(&self) -> &str {
        &self.title
    }

    fn url_path(&self) -> &str {
        &self.url_path
    }
}

pub trait ArticleMetadata {
    fn date_modified(&self) -> Option<time::Date>;
}

pub trait GameMetadata {
    fn countries(&self) -> &[String];
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
        breadcrumbs: &[(&str, Option<&str>)],
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
                    title { (metadata.title()) " · Ways To Play" }
                    meta property="og:site_name" content="Ways To Play";
                    meta property="og:title" content=(metadata.title()) lang=[metadata.title_lang()];
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
                      "window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-Z0CH5J6QX3');"
                    }
                    script type="text/javascript" {
                      "(function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, 'clarity', 'script', 'gzk1ekbi1n');"
                    }
                }
                body itemscope itemtype="https://schema.org/WebPage" {
                    div itemprop="isPartOf" itemscope itemtype="https://schema.org/WebSite" {
                        meta itemprop="url" content=(self.site_url);
                        meta itemprop="name" content="Ways To Play";
                    }
                    header {
                        @if !breadcrumbs.is_empty() {
                            nav.breadcrumbs aria-label="breadcrumb" {
                                ol itemscope itemtype="https://schema.org/BreadcrumbList" itemprop="breadcrumb" {
                                    @let mut url_so_far = "/".to_string();
                                    @for (ix, (part, name)) in breadcrumbs.iter().enumerate() {
                                        li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" {
                                            meta itemprop="position" content=(ix + 1);
                                            a href=({url_so_far.push_str(part); url_so_far.push('/'); &url_so_far}) itemprop="item" {
                                                span itemprop="name" { (name.unwrap_or(part)) }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        nav.site {
                            div {
                              a.brand href="/" { "Ways to Play" }
                              ul.under-brand {
                                li { a href="/articles/" { "Articles" } }
                                li { a href="/games/" { "Games" } }
                              }
                            }
                            h1.page-title lang=[metadata.title_lang()] {
                                @if let Some(original_title) = metadata.original_title() {
                                    (original_title) " · "
                                }
                                span.simple itemprop="name" { (metadata.title()) }
                            }
                            form #search-box role="search" method="get" action="https://duckduckgo.com/" target="_top" {
                              span.simple {
                                  input type="search" role="searchbox" name="q" required placeholder="Search this site" aria-label="Search this site";
                                  button type="submit" { "\u{1F50D}\u{FE0E}" }
                              }
                              input type="hidden" name="sites" value="games.porg.es";
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

        Ok(OutputFile {
            url_path: metadata.url_path().to_owned().into(),
            content,
        })
    }

    pub fn article<T: ArticleMetadata + BaseMetadata>(
        &self,
        article: &T,
        content: Markup,
        breadcrumbs: &[(&str, Option<&str>)],
    ) -> Result<OutputFile> {
        self.base(
            article,
            breadcrumbs,
            html! {
                article itemprop="mainEntity" itemscope itemtype="https://schema.org/Article" itemref="author-outer" {
                    div.article-meta {
                        meta itemprop="headline" content=(article.title());
                        @if let Some(mod_date) = article.date_modified() {
                            p.last-updated {
                                "Last updated: "
                                time itemprop="dateModified" datetime=(mod_date) {
                                    (mod_date.format(&format_description!("[weekday repr:long], [day padding:none] [month repr:long] [year]"))?)
                                }
                                "."
                            }
                        }
                    }
                    (content)
                }
            },
        )
    }

    pub fn bibliography(&self, bib: &Bibliography) -> Result<OutputFile> {
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
            (bib_render::render_whole_bib(bib))
        };

        self.base(
            &SimplePage {
                title: "Bibliography of Traditional Games".into(),
                url_path: "/bibliography/".into(),
            },
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
            &SimplePage {
                title: "Welcome".into(),
                url_path: "/".into(),
            },
            &[],
            content,
        )
    }

    pub fn games<T: BaseMetadata + ArticleMetadata + GameMetadata>(
        &self,
        games: &[T],
    ) -> Result<OutputFile> {
        let games_all = games.iter().sorted_by_key(|g| g.title());

        let content = html! {
            form #game-form {
                div {
                    label {
                        "Players: "
                        select name="players" {
                            option value="" { "any" }
                        }
                    }
                }
                div {
                    label {
                        "Country: "
                        select name="countries" {
                            option value="" { "any" }
                        }
                    }
                }
                div {
                    label {
                        "Type/equipment: "
                        select name="equipment" {
                            option value="" { "any" }
                        }
                    }
                }
            }
            ul {
                @for game in games_all {
                    li data-name=(game.title()) data-countries=(game.countries().join(",")) data-players=[game.players()] data-equipment=[game.equipment()] {
                        a href=(game.url_path()) {
                            span lang=[game.title_lang()] {
                                (game.title())
                            }
                        }
                    }
                }
            }
        };

        self.base(
            &SimplePage {
                title: "Games".into(),
                url_path: "/games/".into(),
            },
            &[],
            content,
        )
    }
}
