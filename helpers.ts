import { env } from 'process';
import { Date, Article } from './types';

export const IS_PRODUCTION = env.NODE_ENV === 'production';
export const IS_PRINT = env.IS_PRINT === 'print';

export function ifSet<T>(x: T, y: string | ((value: NonNullable<T>) => string)): string {
  if (typeof y === "function") {
    return x ? y(x) : '';
  }

  return x ? y : '';
}

export function asAttr(name: string, value: string | undefined): string {
  return ifSet(value, ` ${name}="${value}"`);
}

const numberFormatter = new Intl.NumberFormat('en');

export function formatNumberString(it: string | number): string {
  if (typeof it === 'number') {
    return numberFormatter.format(it);
  }

  return it;
}

const months =
  ["January"
    , "February"
    , "March"
    , "April"
    , "May"
    , "June"
    , "July"
    , "August"
    , "September"
    , "October"
    , "November"
    , "December"
  ];

export function renderExplicitDate(date: Date, omitIfJustYear: boolean): string | null {
  if ('month' in date) {
    return `${months[date.month - 1]}${ifSet(date.day, ` ${date.day}`)}, ${date.year}`;
  }

  if ('season' in date) {
    return `${date.season} ${date.year}`;
  }

  if (omitIfJustYear) {
    return null;
  }

  return null;
}

export function isolate(value: string): string {
  return `&#x2068;${value}&#x2069;`;
}

export function purify(str: string): string {
  return str.replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\'', '&#039;')
    .replaceAll('"', '&quot;');
}

export function renderArticle(article: Article) {
  if (!IS_PRODUCTION || !article.draft) {
    return `<li><a href="${article.url}"${asAttr("lang", article.titleLang)}>${article.title}</a>`
      + ifSet(article.draft, ' <span class="badge bg-warning text-dark">Draft</span>')
      + (article.children ? renderArticleList(article.children) : '')
      + `</li>`;
  }

  // render draft article names if they have children
  if (article.children?.length) {
    return `<li><span${asAttr("lang", article.titleLang)}>${article.title}</span>`
      + (article.children ? renderArticleList(article.children) : '')
      + `</li>`;
  }

  return '';
}

export function renderArticleList(articles: readonly Article[]) {
  if (articles.length === 0) {
    return '';
  }

  let result = '<ul class="article-list">';
  for (const article of articles) {
    result += renderArticle(article);
  }

  result += "</ul>";
  return result;
}
