const path = require('path');
const Image = require('@11ty/eleventy-img');

const { renderSource } = require('../../images');
const { ifSet, asAttr, renderArticleList, IS_PRODUCTION } = require('../../helpers');

exports.data = {
    layout: "layout.11ty.js",
    ogType: "article",
};

exports.render = async function (data) {
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

    let breadCrumbs = '';
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
                '<div class="col-xs-12 col-md-6">'
                + ifSet(prevArticle, () =>
                    `<a href="${prevArticle.url}" class="nav-link" rel="prev">`
                    + '<p class="text-start m-2">'
                    + '<span class="prevNextArticle">← Previous Article</span><br />'
                    + '<span class="prevNextArticle invisible">← </span>'
                    + `<span${asAttr('lang', prevArticle.titleLang)}>${prevArticle.title}</span>`
                    + '</p>'
                    + '</a>')
                + '</div>'
                + '<div class="col-xs-12 col-md-6 content">'
                + ifSet(nextArticle, () =>
                    `<a href="${nextArticle.url}" class="nav-link" rel="next">`
                    + '<p class="text-end m-2">'
                    + '<span class="prevNextArticle">Next Article →</span><br />'
                    + `<span${asAttr('lang', nextArticle.titleLang)}>${nextArticle.title}</span>`
                    + '<span class="prevNextArticle invisible"> →</span>'
                    + '</p>'
                    + '</a>')
                + '</div>';
        }

        const children = this.eleventyNavigation(data.collections.all, data.eleventyNavigation.key);
        if (children && children.length > 0) {
            childArticles = '<div class="container other-articles-container">'
                + '<div class="row">'
                + '<div class="col-lg-1"></div>'
                + '<div class="col-lg-10">'
                + '<hr/>'
                + '<p class="articlesInThisSection text-center">Other articles in this section</p>'
                + renderArticleList(children)
                + '</div>'
                + '<div class="col-lg-1"></div>'
                + '</div>'
                + '</div>';
        }
    }

    // console.log(data);
    return `
    <article itemscope itemtype="http://schema.org/Article" itemprop="mainEntity" itemref="author-outer">
    <div class="jumbotron jumbotron-fluid ${heroImage ? 'hero' : ''}" style="${heroImage ? `background-image: url('${heroImage}')` : ''}">
        <div class="container">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10">
                    <h1 itemprop="headline"${this.asAttr('lang', data.titleLang)}>
                        <a href="${data.page.url}" itemprop="mainEntityOfPage">${data.title}
                        ${ifSet(data.originalTitle, () => `<br>` + data.originalTitle)}
                        </a>
                        ${data.draft ? '<br/><span class="draft">Draft</span>' : ''}
                    </h1>
                </div>
                <div class="col-lg-1" style="z-index: -1"></div>
            </div>
        </div>
        ${heroSource}
    </div>
    <p class="text-secondary small col-lg-7 offset-lg-1 border-bottom border-light">◦ last updated: <time itemprop="dateModified">${new Date(Date.parse(data.page.date)).toISOString().split('T')[0]}</time></p>
    ${data.content}
</article>`
        + giscusCode
        + ifSet(childArticles, childArticles)
        + '<div class="container-fluid mt-5 prev-next-container">'
        + '<nav aria-label="Nearby Articles" class="border-bottom border-top border-light row">'
        + '<div class="col">'
        + '<div class="container">'
        + '<div class="row">'
        + ifSet(prevNext, prevNext)
        + '</div>'
        + '</div>'
        + '</div>'
        + '</nav>'
        + '</div>';
}

const giscusCode = `<div class="container">
<div class="col">
<div class="row">
<div class="col-lg-7 offset-lg-1">
<h2>Comments</h2>
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
</details>
</div>
</div>
</div>
</div>`;
