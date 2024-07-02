const { ifSet, asAttr, purify } = require('../../helpers');
const path = require('path');
const Image = require('@11ty/eleventy-img');
const { JSDOM } = require('jsdom');

import { IS_PRODUCTION } from '../../helpers';

exports.data = {
  title: "Ways to Play"
};

const leadMatcher = /<p class="lead">(.*?)<\/p>/s;

exports.render = async function (data) {

  let excerpt = data.content.match(leadMatcher)?.[1];
  if (excerpt) {
    const frag = JSDOM.fragment(excerpt);
    frag.childNodes.forEach(n => {
      if (n.className === "citation" || n.className === "footnote") {
        n.remove();
      }
    });

    excerpt = frag.textContent.trim();
  }

  const title = JSDOM.fragment(data.title).textContent.trim();

  let ogImage = '';
  if (data.mainImage || data.hero) {
    const basedSrc = path.join(path.dirname(data.page.inputPath), data.mainImage || data.hero.image);
    const metadata = await Image(basedSrc, {
      widths: [1600],
      formats: [null],
      outputDir: "public/img",
    });

    ogImage = data.site.url + metadata[Object.keys(metadata)[0]][0].url;
  }

  const breadcrumbs = makeBreadCrumbs(this, data);

  return `<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" prefix="og: http://ogp.me/ns#">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
    <link rel="preload" href="/fonts/sourceserif4/SourceSerif4Variable-Latin-Roman.ttf.woff2" as="font" type="font/woff2" crossorigin/>
    <link rel="preload" href="/fonts/sourceserif4/SourceSerif4Variable-Latin-Italic.ttf.woff2" as="font" type="font/woff2" crossorigin/>
    <link rel="stylesheet" href="/fonts/sourceserif4.css" type="text/css" />
    <link rel="stylesheet" href="/fonts/charis.css" type="text/css" />
    <link rel="stylesheet" href="/css/main.css" type="text/css" />
    <link rel="stylesheet" href="/css/text.css" type="text/css" />
    <link rel="canonical" href="${data.site.url}${data.page.url}" />
    <link rel="alternate" type="application/atom+xml" title="Ways To Play Atom feed" href="/atom.xml" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="generator" content="Eleventy" />
    <meta name="theme-color" content="#000000" />
    <meta name="robots" content="noai,noimageai" />
    <title>${title} · Ways To Play</title>
    <meta property="og:site_name" content="Ways To Play" />
    <meta property="og:title" content="${title}"${asAttr('lang', data.titleLang)} />
    <meta property="og:url" content="${data.page.url}" />
    ${ifSet(data.ogType, ogt => `<meta property="og:type" content="${ogt}" />`)}
    ${ifSet(ogImage, i => `<meta property="og:image" content="${i}" />`)}
    ${ifSet(excerpt, e => `<meta property="og:description" content="${e}" /><meta name="description" content="${e}" />`)}
    <script type="module">
      function doHashPopup({newURL, oldURL}) {
        if (oldURL) {
          const oldHash = new URL(oldURL).hash;
          if (oldHash) {
            const old = document.getElementById(oldHash.substring(1));
            if (old.close) {
              old.close('navigated');
            }
          }
        }

        const newHash = new URL(newURL).hash;
        if (newHash) {
          const target = document.getElementById(newHash.substring(1));
          if (target.showModal) {
            target.showModal();
          }
        }
      }

      addEventListener('DOMContentLoaded', () => {
        const now = new Date();
        const relTimeFormatter = new Intl.RelativeTimeFormat('en');
        for (const time of document.getElementsByClassName('relative')) {
          const t = new Date(time.getAttribute("datetime"));
          const diff = Math.trunc((t - now) / (24*60*60*1000));
          time.replaceChildren(relTimeFormatter.format(diff, 'day'));
        }
      });

      addEventListener('DOMContentLoaded', () => {
        for (const lb of document.getElementsByClassName('lightbox')) {
          lb.firstChild.addEventListener('click', () => lb.close('clicked'));
          lb.addEventListener('close', () => {
            if (lb.returnValue !== 'navigated') {
              history.replaceState("", document.title, window.location.pathname + window.location.search);
            }

            lb.returnValue = '';
          });
        }

        window.addEventListener('hashchange', doHashPopup);
        doHashPopup({newURL: window.location.href});
      });
    </script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z0CH5J6QX3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Z0CH5J6QX3');
    </script>
    <script type="text/javascript">
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "gzk1ekbi1n");
    </script>
  </head>
  <body itemscope itemtype="http://schema.org/WebPage"${data.tags?.includes('article') ? ' itemref="breadcrumbs"' : ''}>
    <div itemprop="isPartOf" itemscope itemtype="https://schema.org/WebSite">
        <meta itemprop="url" content="https://games.porg.es/"/>
        <meta itemprop="name" content="Ways To Play"/>
    </div>
    <header>
      ${breadcrumbs}
      <nav class="site">
        <div>
          <a href="/" class="brand">Ways to Play</a>
          <ul class="under-brand">
            <li><a href="/articles/">Articles</a></li>
            <li><a href="/games/">Games</a></li>
          </ul>
        </div>
        <h1 class="page-title"${this.asAttr('lang', data.titleLang)}>${ifSet(data.originalTitle, () => `${data.originalTitle} · `)}<span class="simple">${data.title}</simple></h1>
        <form id="search-box" role="search" method="get" action="https://duckduckgo.com/" target="_top">
          <input type="search" role="searchbox" name="q" required placeholder="Search this site" aria-label="Search this site" /><button type="submit">&#x1F50D;&#xFE0E;</button>
          <input type="hidden" name="sites" value="games.porg.es" />
        </form>
      </nav>
    </header>
    <main>
      ${data.content}
    </main>
    <footer id="site-footer">
      <span>
        <a href="https://neocities.org/site/waystoplay"><img width="135" height="40" class="inline-img big" src="/small-images/Hosted_by_Neocities.svg" alt="Hosted by Neocities" /></a>
      </span>
      <span>
      ©
      ${this.person({
    name: { given: "George", family: "Pollard" },
    url: "https://porg.es",
    sameAs: "https://porges.bsky.social",
    itemprop: "copyrightHolder author publisher",
    id: "author-outer",
    innerId: "author"
  })}
      ${this.license("cc-by-nc-sa", "4.0", "license", true)}
      · Feedback? Contact me on <a href="https://toot.cafe/@porges" rel="me">Mastodon</a>/<a href="https://bsky.app/profile/porg.es" rel="me">Bluesky</a>,
      <a href="mailto:porges@porg.es?subject=Ways%20To%20Play" target="_blank" rel="me">email me</a>,
      or <a href="https://github.com/Porges/ways-to-play/discussions/new">leave a note on GitHub</a>.
      </span>
    </footer>
  </body>
</html>`;
}

function makeBreadCrumbs(me, data) {
  if (data.eleventyNavigation) {
    const crumbs = me.eleventyNavigationBreadcrumb(data.collections.all, data.eleventyNavigation.key);
    return '<nav class="breadcrumbs" aria-label="breadcrumb">'
      + '<ol itemscope itemtype="https://schema.org/BreadcrumbList" itemprop="breadcrumb">'
      + crumbs.map((page, ix) => {
        return (`<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">`
          + `<meta itemProp="position" content="${ix + 1}" />`
          + ((!IS_PRODUCTION || !page.draft) ? `<a href="${page.url}" itemprop="item">` : '<span itemprop="item">')
          + `<span itemprop="name"${asAttr('lang', page.titleLang)}>`
          + `${page.title}`
          + `</span>`
          + ((!IS_PRODUCTION || !page.draft) ? '</a>' : '</span>')
          + '</li>');
      }).join('')
      + `<li class="active" aria-current="page"${asAttr('lang', data.titleLang)} itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">`
      + `<meta itemProp="position" content="${crumbs.length + 1}" />`
      + `<span itemProp="name">${data.title}</span>`
      + `</li>`
      + '</ol>'
      + '</nav>';
  } else {
    return '';
  }
}
