const { renderArticleList } = require('../helpers');

exports.data = {
    title: "Articles",
    layout: "columned",
    eleventyNavigation: {
        title: "Articles",
        key: 'articles'
    }
};

exports.render = function (data) {
    const roots = this.eleventyNavigation(data.collections.all);
    return renderArticleList(roots[0].children)
}
