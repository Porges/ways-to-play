import { IS_PRODUCTION } from "../helpers";
import { Context, Data } from "../types";

export const data = {
    layout: "columned",
    title: "Ways to Play",
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
            return `<li><a href="${p.url}">${p.data.title}</a> (<time datetime="${iso}" class="relative">${iso}</time>)</li>`;})
        .join("\n");

    return `
    <p>
    Welcome to <cite>Ways to Play</cite>.  This is a site about games, traditional and modern, that are played around the world. There are two main areas on this site, of <a href="/articles/"><span role="img" aria-label="">🧾</span>&#8239;Articles</a> about games or families of games, and <a href="/games"><span role="img" aria-label="">🎲</span>&#8239;Games</a> for rules of the games themselves. There is also an index of <a href="/games-names-index/">game names by language</a>, if you are trying to locate a game.
    </p>

    <p>
    That said, every page on this website should be considered a work in progress: nothing is definite, and everything is subject to revision!
    </p>

    <p>
    You might also be interested in the <a href="/about/"><span role="img" aria-label="">📣</span>&#8239;About</a> page or perhaps the site-wide <a href="/bibliography/"><span role="img" aria-label="">📚</span>&#8239;Bibliography</a>.
    </p>

    <h2>Recently updated pages</h2>

    <ul class="columnar">
    ${recentPages}
    </ul>
    `;
}