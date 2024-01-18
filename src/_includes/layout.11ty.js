const { ifSet, asAttr, purify } = require('../../helpers');
const path = require('path');
const Image = require('@11ty/eleventy-img');
const { JSDOM } = require('jsdom');

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

  return `<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" prefix="og: http://ogp.me/ns#">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="/css/index.css" type="text/css" />
    <link rel="stylesheet" href="/css/print.css" type="text/css" media="print" />
    <link rel="canonical" href="${data.site.url}${data.page.url}" />
    <link rel="preload" crossorigin="anonymous" href="/fonts/CharisSIL-Regular.woff2" as="font" type="font/woff2" />
    <link rel="preload" crossorigin="anonymous" href="/fonts/CharisSIL-Italic.woff2" as="font" type="font/woff2" />
    <link rel="preload" crossorigin="anonymous" href="/fonts/CharisSIL-Bold.woff2" as="font" type="font/woff2" />
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
  </head>
  <body itemscope itemtype="http://schema.org/WebPage"${data.tags?.includes('article')? ' itemref="breadcrumbs"' : ''}>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-primary">
        <div class="container">
          <a href="/" class="navbar-brand">Ways to Play</a>
          <ul class="navbar-nav">
            <li><a href="/articles/" class="nav-link"><span aria-label="" role="img">🧾</span> Articles</a></li>
            <li><a href="/games/" class="nav-link"><span aria-label="" role="img">🎲</span> Games</a></li>
          </ul>
        </div>
      </nav>
    </header>
    <main>
      ${data.content}
    </main>
    <footer class="navbar navbar-expand navbar-dark bg-primary">
      <span class="ms-lg-auto ms-2 navbar-text me-2">
      ©
      ${this.person({
    name: { given: "George", family: "Pollard" },
    url: "https://porg.es",
    sameAs: "https://toot.cafe/@porges",
    itemprop: "copyrightHolder author publisher",
    id: "author-outer",
    innerId: "author"
  })}
      ${this.license("cc-by-nc-sa", "4.0", "license", true)}
      · Feedback? Contact me on <a href="https://toot.cafe/@porges" rel="me">Mastodon</a>/<a href="https://bsky.app/profile/porges.bsky.social" rel="me">Bluesky</a>,
      <a href="mailto:porges@porg.es?subject=Ways%20To%20Play" target="_blank" rel="me">email me</a>,
      or <a href="https://github.com/Porges/ways-to-play/discussions/new">leave a note on GitHub</a>.
      </span>
    </footer>
  </body>
</html>`;
}
