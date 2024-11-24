import { renderArticleList } from '../helpers';
import { Context, Data } from '../types';

export const data = {
    title: "Articles",
    layout: "layout.11ty.js",
    eleventyNavigation: {
        title: "Articles",
        key: 'articles'
    },
    eleventyImport: {
        collections: ['article']
    }
};

export function render(this: Context, data: Data) {
    const roots = this.eleventyNavigation(data.collections.all);
    return renderArticleList(roots[0].children)
}
