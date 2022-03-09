const { env } = require('process');
const IS_PRODUCTION = env.NODE_ENV === 'production';

module.exports = { ifSet, asAttr, formatNumberString, renderExplicitDate, isolate, purify, renderArticleList, IS_PRODUCTION };

/**
 * @param {string=} x 
 * @param {string | () => string} y 
 * @returns {string}
 */
function ifSet(x, y) {
  if (typeof y === "function") {
    return x ? y() : '';
  }

  return x ? y : '';
}

/**
 * @param {string} name 
 * @param {string=} value 
 * @returns {string}
 */
function asAttr(name, value) {
  return ifSet(value, ` ${name}="${value}"`);
}

const numberFormatter = new Intl.NumberFormat('en');
/**
 * @param {string|nubmer} it
 * @returns {string}
 */
function formatNumberString(it) {
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

/**
 * @param {import('./types').Date} date 
 * @param {boolean} omitIfJustYear 
 * @returns {string}
 */
function renderExplicitDate(date, omitIfJustYear) {
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

/**
 * @param {string} value
 * @returns {string}
 */
function isolate(value) {
  return `&#x2068;${value}&#x2069;`;
}

function purify(str) {
  return str.replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\'', '&#039;')
    .replaceAll('"', '&quot;');
}

function renderArticle(article) {
  if (!IS_PRODUCTION || !article.draft) {
    return `<li><a href="${article.url}"${asAttr("lang", article.titleLang)}>${article.title}</a>`
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

function renderArticleList(articles) {
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
