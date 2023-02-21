import { Context, Data } from "../types";

export const data = {
    permalink: "/sitemap.xml",
    eleventyExcludeFromCollections: true,
};

export function render(this: Context, data: Data) {
    return `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${
    data.collections.all.filter((p: any) => p.data.draft !== true).map((p: any) =>
        `<url><loc>${data.site.url}${p.url}</loc><lastmod>${p.date.toISOString()}</lastmod></url>`
    ).join("\n")}
</urlset>`;
}
