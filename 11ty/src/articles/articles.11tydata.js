module.exports = {
    "layout": "article",
    "tags": "article",
    eleventyComputed: {
        // idea from: https://github.com/adamduncan/eleventy-auto-navigation/blob/main/src/_data/eleventyComputed.js
        eleventyNavigation: {
            key: data => {
                if (!data.page.url) {
                    // no URL, due to draft:true
                    return undefined;
                }

                const urlParts = data.page.url.split('/');
                const key = urlParts.slice(1, -1).join('/');
                return data.key || key;
            },
            title: data => data.title,
            titleLang: data => data.titleLang,
            parent: data => {
                if (!data.page.url) {
                    // no URL, due to draft:true
                    return undefined;
                }
                
                const urlParts = data.page.url.split('/');
                const parentKey = urlParts.slice(1, -2).join('/');
                return data.parent || parentKey;
            },
            order: data => data.order,
        }
    }
}
