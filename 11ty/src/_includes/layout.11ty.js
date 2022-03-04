exports.data = {
    title: "Ways to Play"
};

const tagStripper = /<[^>]*?>/g;
const bracketStripper = /\[[^\]]*?\]/g;
const parenStripper = / \([^)]*?\)/g;

function striptags(excerpt) {
  return excerpt
    .replaceAll(tagStripper, "")
    .replaceAll(bracketStripper, "")
    .replaceAll(parenStripper, "")
    .trim();
}

exports.render = function (data) {
  let excerpt = "";
  if (data.page.excerpt) {
    excerpt = striptags(data.page.excerpt);
  }

    return `<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" prefix="og: http://ogp.me/ns#">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="/css/index.css" type="text/css" />
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@1,300;1,500&family=Vollkorn:wght@500&display=swap" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000" />
    <title>${data.title} · Ways To Play</title>
    ${ excerpt ? `<meta name="description" content="${excerpt}" />` : '' }
  </head>
  <body>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-primary">
        <div class="container">
          <a href="/" class="navbar-brand">Ways to Play</a>
          <ul class="navbar-nav">
            <li><a href="/articles" class="nav-link"><span aria-label="" role="img">🧾</span> Articles</a></li>
            <li><a href="/games" class="nav-link"><span aria-label="" role="img">🎲</span> Games</a></li>
          </ul>
        </div>
      </nav>
    </header>
    <main>
      ${data.content}
    </main>
    <footer class="navbar navbar-expand navbar-dark bg-primary">
      <span class="ml-auto navbar-text">
      ©
      ${this.person({
        name: {given: "George", family: "Pollard"},
        url:"https://porg.es",
        sameAs:"https://twitter.com/porges",
        itemProp:"copyrightHolder author publisher",
        id:"author-outer",
        innerId:"author"
      })}
      ${this.license({
        leading: true,
        rel: "license",
        license: "cc-by-nc-sa",
        version: "4.0" })}
      · Feedback? Let <a href="https://twitter.com/porges">@porges</a> know or <a href="https://github.com/Porges/ways-to-play/issues/new">open an issue</a>.
      </span>
    </footer>
  </body>
</html>`;
}
