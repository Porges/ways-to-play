import { renderArticleList } from '../helpers';
import { Context, Data } from '../types';

export const data = {
    title: "Articles",
    layout: "columned",
    eleventyNavigation: {
        title: "Articles",
        key: 'articles'
    }
};

export function render(this: Context, data: Data) {
    const roots = this.eleventyNavigation(data.collections.all);
    return renderArticleList(roots[0].children)
}
