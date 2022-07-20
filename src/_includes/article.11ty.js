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
        breadCrumbs = makeBreadCrumbs(this, data);

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
                + '<div class="col-xs-12 col-md-6">'
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
            childArticles = '<div class="container">'
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
    return `<article itemscope itemtype="http://schema.org/Article" itemprop="mainEntity" itemref="author-outer">
    <div class="jumbotron jumbotron-fluid ${heroImage ? 'hero' : ''}" style="${heroImage ? `background-image: url('${heroImage}')` : ''}">
        <div class="container">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10">
                    <h1 itemprop="headline"${this.asAttr('lang', data.titleLang)}>
                        <a href="${data.page.url}" itemprop="mainEntityOfPage">${data.title}
                        ${ifSet(data.originalTitle, () => `<br>` + data.originalTitle)}
                        </a>
                        ${data.draft ? '<br/><span class="badge bg-warning text-dark">Draft</span>' : ''}
                    </h1>
                </div>
                <div class="col-lg-1" style="z-index: -1"></div>
            </div>
        </div>
        ${heroSource}
    </div>
    <div class="container-fluid mb-5">
       <nav class="border-bottom border-top border-light row" aria-label="Breadcrumbs">
        <div class="col">
          <div class="container">
            ${breadCrumbs}
          </div>
        </div>
        </nav>
    </div>
    <div class="container">
        <p class="text-secondary small col-lg-7 offset-lg-1 border-bottom border-light">◦ last updated: <time itemprop="dateModified">${new Date(Date.parse(data.page.date)).toISOString().split('T')[0]}</time></p>
        <div class="row">
            <div class="col-lg-7 offset-lg-1">
                ${data.content}
            </div>
        </div>
    </div>
</article>`
        + ifSet(childArticles, childArticles)
        + '<div class="container-fluid mt-5">'
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

function makeBreadCrumbs(me, data) {
    const crumbs = me.eleventyNavigationBreadcrumb(data.collections.all, data.eleventyNavigation.key);
    return '<nav aria-label="breadcrumb">'
        + '<ol class="breadcrumb m-1 p-1" itemprop="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">'
        + crumbs.map((page, ix) => {
            return (`<li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">`
                + `<meta itemProp="position" content="${ix + 1}" />`
                + ((!IS_PRODUCTION || !page.draft) ? `<a href="${page.url}" itemprop="item">` : '<span itemprop="item">')
                + `<span itemprop="name"${asAttr('lang', page.titleLang)}>`
                + `${page.title}`
                + `</span>`
                + ((!IS_PRODUCTION || !page.draft) ? '</a>' : '</span>')
                + '</li>');
        }).join('')
        + `<li class="breadcrumb-item active" aria-current="page"${asAttr('lang', data.titleLang)} itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">`
        + `<meta itemProp="position" content="${crumbs.length + 1}" />`
        + `<span itemProp="name">${data.title}</span>`
        + `</li>`
        + '</ol>'
        + '</nav>';

}
