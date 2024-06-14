import { ifSet } from "../helpers";
import { Context, Data } from "../types";

export const data = {
    permalink: "/atom.xml",
    eleventyExcludeFromCollections: true,
};

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
${all.map((p: any) =>
`<entry>
    <title ${ifSet(p.data.titleLang, `xml:lang="${p.data.titleLang}"`)} type="html">${p.data.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</title>
    <id>${data.site.url}${p.url}</id>
    <updated>${p.date.toISOString()}</updated>
    ${p.data.tags.map((tag: string) => `<category term="${tag}" />`).join("")}
    <content type="text/html" src="${data.site.url}${p.url}" />
</entry>`
).join("\n")}
</feed>`;
}
