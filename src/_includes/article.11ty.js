import path from 'path';
import Image from '@11ty/eleventy-img';
import { JSDOM } from 'jsdom';

import { renderSource } from '../../images';
import { ifSet, asAttr, renderArticleList, IS_PRODUCTION } from '../../helpers';

export const data = {
    layout: "layout.11ty.js",
    ogType: "article",
};

export async function render(data) {
    /*
    let heroImage = '';
    let heroSource = '';
    if (data.hero) {
        const basedSrc = path.join(path.dirname(data.page.inputPath), data.hero.image);
        const metadata = await Image(basedSrc, {
            widths: [1600],
            formats: [null],
            outputDir: "public/img",
        });

        heroImage = metadata[Object.keys(metadata)[0]][0].url;
        if (data.hero.license) {
            heroSource =
                '<span class="text-end heroSource" itemprop="image" itemtype="http://schema.org/ImageObject" itemscope>'
                + `<meta itemprop="url contentUrl" content="${heroImage}" />`
                + 'Image '
                + renderSource(data.hero, true)
                + '</span>';
        }
    }
    */

    let prevNext = '';
    let childArticles = '';
    if (data.tags.includes('article')) {
        let parent = this.eleventyNavigation(data.collections.all, data.eleventyNavigation.parent);
        parent = parent.filter(x => !IS_PRODUCTION || !x.draft);
        const myIndex = parent.findIndex(p => p.key === data.eleventyNavigation.key);
        const prevArticle = parent[myIndex - 1];
        const nextArticle = parent[myIndex + 1];

        if (prevArticle || nextArticle) {
            prevNext =
                ifSet(prevArticle, () =>
                    `<a href="${prevArticle.url}" class="nav-link" rel="prev">`
                    + '<span class="prevNextArticle">Previous Article</span><br />'
                    + `<span${asAttr('lang', prevArticle.titleLang)}>${prevArticle.title}</span>`
                    + '</a>')
                + ifSet(nextArticle, () =>
                    `<a href="${nextArticle.url}" class="nav-link" rel="next">`
                    + '<span class="prevNextArticle">Next Article</span><br />'
                    + `<span${asAttr('lang', nextArticle.titleLang)}>${nextArticle.title}</span>`
                    + '</a>');
        }

        const children = this.eleventyNavigation(data.collections.all, data.eleventyNavigation.key);
        if (children && children.length > 0) {
            childArticles = 
                '<p class="articlesInThisSection">Other articles in this section</p>'
                + renderArticleList(children);
        }
    }

    const metaTitle = JSDOM.fragment(data.title).textContent.trim();

    // console.log(data);
    return `
    <article itemscope itemtype="http://schema.org/Article" itemprop="mainEntity" itemref="author-outer">
    <meta itemprop="headline" content="${metaTitle}"${this.asAttr('lang', data.titleLang)}/>
    <p class="last-updated">Last updated: <time itemprop="dateModified">${new Date(Date.parse(data.page.date)).toISOString().split('T')[0]}</time>.</p>
    ${data.content}
    </article>
    <div id="after-article">`
    + ifSet(childArticles || prevNext, '<hr/>')
    + ifSet(childArticles, childArticles)
    + ifSet(prevNext, pn => `<nav aria-label="Nearby Articles" class="prev-next">${pn}</nav>`)
    + '</div>';
}

const giscusCode = `<h2>Comments</h2>
<details>
<summary>Expand to show comments</summary>
<script src="https://giscus.app/client.js"
    data-repo="Porges/ways-to-play"
    data-repo-id="MDEwOlJlcG9zaXRvcnk3NjgyOTIyMQ=="
    data-category="General"
    data-category-id="DIC_kwDOBJRSJc4B_EcS"
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="0"
    data-emit-metadata="0"
    data-input-position="top"
    data-theme="light"
    data-lang="en"
    data-loading="lazy"
    crossorigin="anonymous"
    async>
</script>
</details>`;
