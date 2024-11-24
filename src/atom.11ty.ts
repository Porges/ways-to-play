import { ifSet } from "../helpers.jsx";
import { Context, Data } from "../types.js";
import { JSDOM } from 'jsdom';

export const data = {
    permalink: "/atom.xml",
    eleventyExcludeFromCollections: true,
    eleventyImport: {
        collections: ["article", "game"]
    }
};

function escape(str: string): string {
    return str.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
}

export function render(this: Context, data: Data) {
    const all = [...data.collections.article, ...data.collections.game].filter((p: any) => p.data.draft !== true);
    all.sort((a: any, b: any) => -(a.date.toISOString().localeCompare(b.date.toISOString())));
    const latestUpdated = all[0].date.toISOString();
    
    return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>Ways to Play</title>
<link href="https://games.porg.es/atom.xml" rel="self" />
<id>https://games.porg.es/</id>
<author>
    <name>George Pollard</name>
    <email>porges@porg.es</email>
</author>
<updated>${latestUpdated}</updated>
${all.slice(0, 10).map((p: any) =>
`<entry>
    <title ${ifSet(p.data.titleLang, `xml:lang="${p.data.titleLang}"`)} type="html">${escape(p.data.title)}</title>
    <id>${data.site.url}${p.url}</id>
    <updated>${p.date.toISOString()}</updated>
    ${p.data.tags.map((tag: string) => `<category term="${tag}" />`).join("")}
    <link href="${data.site.url}${p.url}" />
    ${summarize(`${data.site.url}${p.url}`, p.content)}
</entry>`
).join("\n")}
</feed>`;
}

function summarize(baseUrl: string, content: string): string {
    const leadMatcher = /<p class="lead">(.*?)<\/p>/s;
    let excerpt = content.match(leadMatcher)?.[1];
    if (excerpt) {
        const frag = new JSDOM(excerpt);
        const body = frag.window.document.firstChild.lastChild;
        
        removeAll(body.getElementsByClassName("footnote"));
        removeAll(body.getElementsByClassName("citation"));
        removeAll(body.getElementsByTagName("audio"));
        const ps: HTMLCollection = body.getElementsByClassName("pronunciation");
        for (let i = 0; i < ps.length; ++i) {
            let p = ps.item(i)!;
            p.removeAttribute("onclick");
            p.removeAttribute("title");
        }
        
        return `<summary type="html" xml:base="${baseUrl}">${escape(body.innerHTML)}</summary>`;
    } else {
        return `<content type="html" xml:base="${baseUrl}">${escape(content)}</content>`;
    }
}

function removeAll(coll: HTMLCollection): void {
    for (let i = coll.length-1; i >= 0; --i) {
        coll.item(i)!.remove();
    }
}
