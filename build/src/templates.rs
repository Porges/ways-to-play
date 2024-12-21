use maud::{html, Markup, DOCTYPE};

pub fn base(
    title: &str,
    title_lang: Option<&str>,
    original_title: Option<&str>,
    site_url: &str,
    page_url: &str,
    content: Markup,
    og_type: Option<&str>,
) -> Markup {
    html! {
        (DOCTYPE)
        html lang="en" prefix="og: http://ogp.me/ns#" {
            head {
                meta charset="utf-8";
                link rel="shortcut icon" type="image/png" href="/favicon.png" ;
                link rel="preload" href="/fonts/sourceserif4/SourceSerif4Variable-Latin-Roman.ttf.woff2" as="font" type="font/woff2" crossorigin;
                link rel="preload" href="/fonts/sourceserif4/SourceSerif4Variable-Latin-Italic.ttf.woff2" as="font" type="font/woff2" crossorigin;
                link rel="stylesheet" href="/fonts/sourceserif4.css" type="text/css" ;
                link rel="stylesheet" href="/fonts/charis.css" type="text/css" ;
                link rel="stylesheet" href="/css/main.css" type="text/css" ;
                link rel="stylesheet" href="/css/text.css" type="text/css" ;
                link rel="canonical" href={(site_url)(page_url)} ;
                link rel="alternate" type="application/atom+xml" title="Ways To Play Atom feed" href="/atom.xml" ;
                meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no";
                //meta name="generator" content="Eleventy";
                meta name="theme-color" content="#000000";
                meta name="robots" content="noai,noimageai";
                title { (title) " · Ways To Play" }
                meta property="og:site_name" content="Ways To Play";
                meta property="og:title" content=(title) lang=[title_lang];
                meta property="og:url" content={"/"(page_url)};
                @if let Some(og_type) = og_type {
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
                    meta itemprop="url" content="https://games.porg.es";
                    meta itemprop="name" content="Ways To Play";
                }
                header {
                    // TODO: breadcrumbs

                    nav."site" {
                        div {
                          a.brand href="/" { "Ways to Play" }
                          ul.under-brand {
                            li { a href="/articles/" { "Articles" } }
                            li { a href="/games/" { "Games" } }
                          }
                        }
                        h1.page-title lang=[title_lang] {
                            @if let Some(original_title) = original_title {
                                (original_title) " · "
                            }
                            span.simple { (title) }
                        }
                        form #search-box role="search" method="get" action="https://duckduckgo.com/" target="_top" {
                          input type="search" role="searchbox" name="q" required placeholder="Search this site" aria-label="Search this site";
                          button type="submit" { "&#x1F50D;&#xFE0E;" }
                          input type="hidden" name="sites" value="games.porg.es";
                        }
                    }
                }
                main {
                    (content)
                }
                footer {

                }
            }
        }
    }
}

pub fn article(
    title: &str,
    title_lang: Option<&str>,
    original_title: Option<&str>,
    site_url: &str,
    page_url: &str,
    content: Markup,
    mod_date: Option<time::Date>,
) -> Markup {
    base(
        title,
        title_lang,
        original_title,
        site_url,
        page_url,
        html! {
            article itemprop="mainEntity" itemscope itemtype="https://schema.org/Article" itemref="author-outer" {
                meta itemprop="headline" content=(title);
                @if let Some(mod_date) = mod_date {
                    p.last-updated {
                        "Last updated: " time itemprop="dateModified" { (mod_date) } "."
                    }
                }
                (content)
            }
        },
        Some("article"),
    )
}
