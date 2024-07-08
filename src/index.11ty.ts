import { Context, Data } from "../types";

export const data = {
    layout: "columned",
    title: "Welcome",
    eleventyImport: {
        collections: ["game", "article"]
    }
};

export function render(this: Context, data: Data) {

    const pages = [...data.collections.game,...data.collections.article]
        .filter((p: any) => /*!IS_PRODUCTION ||*/ p.data.draft !== true);

    pages.sort((x, y) => y.date - x.date);

    const recentPages = pages
        .slice(0, 30)
        .map((p: any) => {
            const iso = p.date.toISOString();
            return `<li><a href="${p.url}">${p.data.title}</a> <span class="recently-updated-time">(<time datetime="${iso}" class="relative">${iso}</time>)</a></li>`;})
        .join("\n");

    pages.sort((x, y) => y.content.length - x.content.length);

    const longPages = pages
        .slice(0, 20)
        .map(p => {
            return `<li><a href="${p.url}">${p.data.title}</a></li>`;})
        .join("\n");

    return `
    <p class="lead">
    This is a site about games, traditional and modern, that are played around the world.
    </p>

    <p>
    There are two main areas on this site, of <strong><a href="/articles/">Articles</a></strong> about
    games or families of games, and <strong><a href="/games">Games</a></strong> for rules of the games
    themselves. There is also an index of <strong><a href="/game-names-index/">game names by language</a></strong>, if you are trying to locate a game.
    Every page on this website should be considered a work in progress: nothing is definite, and everything is subject to revision!
    You might also be interested in the <strong><a href="/about/">About</a></strong> page or perhaps
    the site-wide <strong><a href="/bibliography/">Bibliography</a></strong>.
    </p>
    <p>For other sites about games, please visit the <strong><a href="/see-also/">See Also</a></strong> page.</p>

    <h2>Recently updated pages</h2>
    <ul class="columnar-large">
    ${recentPages}
    </ul>

    <h2>Longest pages</h2>
    <ul class="columnar-large">
    ${longPages}
    </ul>
    `;
}
