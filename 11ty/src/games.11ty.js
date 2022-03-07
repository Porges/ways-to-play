const { slug } = require('../helpers');

exports.data = {
    title: "Games",
    layout: "columned"
};

exports.render = function (data) {
    const games = [...data.collections.game];

    const expandedGames = games.flatMap(g =>
        [
            { title: g.data.title, titleLang: g.data.titleLang, url: g.url },
            ...(g.data.subgames || []).map(sg => ({
                title: sg.title,
                titleLang: sg.titleLang,
                url: g.url + "#" + (sg.slug || slug(sg.title)),
                variant: true,
            }))
        ]);

    expandedGames.sort((x, y) => x.title.localeCompare(y.title, 'en'));

    return '<ul>'
        + expandedGames.map(post => {
            // console.log(post);
            return `<li${(post.variant ? ' class="game-variant"' : '')}><a href="${post.url}"${this.asAttr("lang", post.titleLang)}>${post.title}</a></li>`;
        }).join("\n")
        + '</ul>';
}
