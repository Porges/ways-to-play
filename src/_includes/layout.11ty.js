const { ifSet, asAttr, purify } = require('../../helpers');
const path = require('path');
const Image = require('@11ty/eleventy-img');

exports.data = {
  title: "Ways to Play"
};

const tagStripper = /<[^>]*?>/g;
const bracketStripper = /\[[^\]]*?\]/g;
const parenStripper = / \([^)]*?\)/g;
const newlineStripper = /\r\n|\n/g;

function striptags(excerpt) {
  return purify(excerpt
    .replaceAll(tagStripper, "")
    .replaceAll(bracketStripper, "")
    .replaceAll(parenStripper, "")
    .replaceAll(newlineStripper, " ")
    .trim());
}

const footnoteStripper = /\{%fn%\}.*?\{%endfn%\}/gs;
const citeStripper = /\[@.*?\]/gs;

exports.render = async function (data) {
  let excerpt = "";
  if (data.page.excerpt) {
    const stripped = data.page.excerpt.replaceAll(footnoteStripper, "").replaceAll(citeStripper, "");
    excerpt = striptags(await this.renderTemplate(stripped, "md"));
  }

  const title = purify(data.title);

  let ogImage = '';
  if (data.mainImage) {
    const basedSrc = path.join(path.dirname(data.page.inputPath), data.mainImage);
    const metadata = await Image(basedSrc, {
      widths: [1600],
      formats: [null],
      outputDir: "public/img",
    });

    // TODO: this should come from a variable
    ogImage = "https://games.porg.es" + metadata[Object.keys(metadata)[0]][0].url;
  }

  return `<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" prefix="og: http://ogp.me/ns#">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="/css/index.css" type="text/css" />
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@1,300;1,500&family=Vollkorn:wght@500&family=Noto+Emoji&family=Nabla&display=swap" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="generator" content="Eleventy" />
    <meta name="theme-color" content="#000000" />
    <title>${title} · Ways To Play</title>
    <meta property="og:site_name" content="Ways To Play" />
    <meta property="og:title" content="${title}"${asAttr('lang', data.titleLang)} />
    <meta property="og:url" content="${data.page.url}" />
    ${ifSet(data.ogType, `<meta property="og:type" content="${data.ogType}" />`)}
    ${ifSet(ogImage, `<meta property="og:image" content="${ogImage}" />`)}
    ${ifSet(excerpt, `<meta property="og:description" content="${excerpt}" />`)}
  </head>
  <body itemscope itemtype="http://schema.org/WebPage">
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
      <span class="ms-auto navbar-text me-2">
      ©
      ${this.person({
    name: { given: "George", family: "Pollard" },
    url: "https://porg.es",
    sameAs: "https://twitter.com/porges",
    itemprop: "copyrightHolder author publisher",
    id: "author-outer",
    innerId: "author"
  })}
      ${this.license({
    leading: true,
    rel: "license",
    license: "cc-by-nc-sa",
    version: "4.0"
  })}
      · Feedback? Let <a href="https://twitter.com/porges">@porges</a> know or <a href="https://github.com/Porges/ways-to-play/discussions/new">leave a note</a>.
      </span>
    </footer>
  </body>
</html>`;
}
