import { Context, Data } from "../types";

export const data = {
    permalink: "/robots.txt",
    eleventyExcludeFromCollections: true,
};

export function render(this: Context, data: Data) {
    return `Sitemap: ${data.site.url}/sitemap.xml`;
}
