const { IS_PRODUCTION } = require("../../helpers");

let data = {
    "layout": "article",
    "tags": "article",
    eleventyComputed: {
        // idea from: https://github.com/adamduncan/eleventy-auto-navigation/blob/main/src/_data/eleventyComputed.js
        eleventyNavigation: {
            key: data => {
                const urlParts = data.page.url.split('/');
                const key = urlParts.slice(1, -1).join('/');
                return data.key || key;
            },
            parent: data => {
                const urlParts = data.page.url.split('/');
                const parentKey = urlParts.slice(1, -2).join('/');
                return data.parent || parentKey;
            },
            order: data => data.order,
            title: data => data.title,
            /* copy across our own attributes */
            titleLang: data => data.titleLang,
            draft: data => data.draft,
        }
    }
}

if (IS_PRODUCTION) {
    data.date = "git Last Modified";
}

module.exports = data;
