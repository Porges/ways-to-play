const { renderExplicitDate, formatNumberString, asAttr, isolate, ifSet } = require('./helpers');

const ISBN = require('isbn3');
const { string } = require('prop-types');

/**
 * @typedef {import('./types').Reference} Reference
 * @typedef {import('./types').Author} Author
 */

module.exports = {

    /**
     * @param {Reference} ref
     */
    renderReference: function (ref) {
        const { id, type } = ref;

        return `<p itemscope itemtype="${itemtypes[type]}" id="ref-${id}" itemprop="citation">
${renderAuthors(ref)}
${renderDate(ref)}
${renderTitle(ref)}
${renderPatentBits(ref)}
${renderContainer(ref)}
${renderPublisher(ref)}
${renderISBN(ref)}
${renderWarnings(ref)}
</p>`;
    }
}

const itemtypes = {
    'article-journal': 'http://schema.org/ScholarlyArticle',
    'book': 'http://schema.org/Book',
    'thesis': 'http://schema.org/Thesis',
    'webpage': 'http://schema.org/WebPage',
    'paper-conference': 'http://schema.org/ScholarlyArticle',
    'article': 'http://schema.org/Article',
    'manuscript': 'http://schema.org/Manuscript',
    'pamphlet': 'http://schema.org/Article', //TODO
    'article-newspaper': 'http://schema.org/Article', //TODO
    'article-magazine': 'http://schema.org/Article', //TODO
    'chapter': 'http://schema.org/Article', //TODO
    'patent': 'http://schema.org/CreativeWork',
};

/** 
 * @param {Reference} ref
 */
function renderWarnings(reference) {
    if (!reference.warnings) return '';
    return `<span className="reference-warning"><abbr title="warning">⚠</abbr>&nbsp;${reference.warnings}</span>`;
};

/**
 * @param {Reference} ref
 */
function renderPatentBits(reference) {
    if (reference.type !== 'patent') return '';

    const filed = reference.filed ? renderExplicitDate(reference.filed, false) : '';
    const issued = reference.issued ? renderExplicitDate(reference.issued, false) : '';

    return (
        (reference.patentNumber
            ? `Patent ${formatNumberString(reference.patentNumber)}${ifSet(reference.applicationNumber, ` (application ${formatNumberString(reference.applicationNumber)}`)}`
            : ifSet(reference.applicationNumber, `Application ${formatNumberString(reference.applicationNumber)}.`))
        + ifSet(filed, ` Filed ${filed}.`)
        + ifSet(issued, ` Issued ${issued}.`)
    );
}

/**
 * @param {Reference} reference
 * @returns {string}
 */
function renderTitle(reference) {
    const lang = reference["title-lang"];

    const linked =
        reference.URL
            ? `<a itemprop="url" href="${reference.URL}">${reference.title}</a>`
            : `<span>${reference.title}</span>`;

    return reference.type === 'book'
        ? `<cite itemprop="name"${asAttr('lang', lang)}>${isolate(linked)}</cite>${ifSet(reference.volume, ` (volume ${formatNumberString(reference.volume)})`)}. `
        : `‘<span itemprop="name headline"${asAttr('lang', lang)}>${isolate(linked)}</span>’. `;
}

/**
 * @param {Reference} reference 
 * @returns {string}
 */
const renderAuthors = (reference) => {
    if (reference.author) {
        return `${renderPeople(reference.author, true, false, 'author')} `;
    } else if ('publisher' in reference) {
        return (`<span itemscope itemtype="http://schema.org/Organization" itemprop="author">
      <span itemprop="name"${asAttr('lang', reference['publisher-lang'])}>${reference.publisher}</span></span> `);
    } else if ('editor' in reference && reference.editor) {
        return `${renderPeople(reference.editor, true, false, 'editor')}, (<abbr title="editor">ed.</abbr>) `;
    } else {
        return `<i>Anonymous</i> `;
    }
}

/**
 * @param {readonly Author[]} as
 * @param {boolean} reverseFirst
 * @param {boolean} period
 * @param {string} itemprop
 * @returns {string}
 */
const renderPeople = (as, reverseFirst, period, itemprop) => {
    const renderFamily = (/** @type {Author} */ a, /** @type {number} */ ix) => a.family &&
        `<span itemprop="familyName">${a.family}</span>${ifSet(period && ix > 0 && ix === (as.length - 1) && !a.family.endsWith('.'), '.')}`;

    const renderGiven = (/** @type {Author} */ a, /** @type {number} */ ix) => {
        if (typeof a.given === 'string') {
            return `<span itemprop="givenName">${a.given}</span>${ifSet(period && reverseFirst && ix === 0 && ix === (as.length - 1) && !a.given.endsWith('.'), '.')}`;
        } else {
            return `<span itemprop="givenName">${a.given[0]}</span>`
                + ifSet(a.given.length > 1, ` <span itemprop="additionalName">${a.given.slice(1).join(' ')}</span>`)
                + ifSet(period && reverseFirst && ix === 0 && ix === (as.length - 1) && !a.given[a.given.length - 1].endsWith('.'), '.');
        }
    };

    const reverseName = (/** @type {Author} */ a) => a.lang === undefined ? false : (a.lang.startsWith('zh') || a.lang.startsWith('ja'));
    const hiddenName = (/** @type {Author} */ a) => `<meta itemprop="name" content="${reverseName(a) ? `${a.family}${a.given}` : `${a.given} ${a.family}`}" />`;

    return as.map((a, ix) => (
        ifSet(ix > 0, (ix === as.length - 1 ? `${ifSet(as.length > 2, ',')} and ` : ", "))
        + `<span itemscope itemtype="http://schema.org/Person"${asAttr('itemprop', itemprop)}${asAttr('lang', a.lang)} className="proper-noun">`
        + hiddenName(a)
        + ((reverseFirst && ix === 0)
            ? `${ifSet(a.family, `${isolate(renderFamily(a, ix))}, ${isolate(renderGiven(a, ix))}`)}`
            : isolate(`${renderGiven(a, ix)}${ifSet(a.family, ` ${renderFamily(a, ix)}`)}`))
        + `</span>`));
};


/**
 * @param {Reference} reference
 * @returns {string}
 */
const renderISBN = (reference) => {
    if (!reference.ISBN) {
        return '';
    }

    const parsed = ISBN.audit(reference.ISBN.toString());
    if (!parsed.validIsbn) {
        console.error(parsed);
        throw new Error("Invalid ISBN: " + reference.ISBN);
    }

    const formattedISBN = ISBN.hyphenate(reference.ISBN.toString());

    return `<abbr className="initialism">ISBN</abbr>: <a itemprop="isbn" href="https://www.worldcat.org/isbn/${formattedISBN}">${formattedISBN}</a>. `;
};

/**
 * @param {Reference} reference
 * @returns {string}
 */
const renderDate = (reference) => {
    if (reference.issued) {
        const original =
            reference['original-date']
                ? `, originally published ${reference['original-date'].year}`
                : '';

        const { issued } = reference;

        let monthDay =
            'day' in issued
                ? `-${issued.month}-${issued.day}`
                : 'month' in issued
                    ? `-${issued.month}`
                    : '';

        return `(<time itemprop="datePublished" dateTime="${issued.year}${monthDay}">${issued.year}</time>${original}). `;
    }

    // patents might only have been filed
    if (reference.filed) {
        const { filed } = reference;

        let monthDay =
            'day' in filed
                ? `-${filed.month}-${filed.day}`
                : 'month' in filed
                    ? `-${filed.month}`
                    : '';

        return `(<time itemprop="datePublished" dateTime="${filed.year}${monthDay}">${filed.year}</time>). `;
    }

    return 'n.d. ';
}

/**
 * @param {Reference} reference
 * @returns {string}
 */
const renderPublisher = (reference) => (
    ifSet(reference['publisher-place'], reference['publisher-place'] + (reference.publisher ? ': ' : '. '))
    + ifSet(reference.publisher, () => `<span${asAttr('lang', reference['publisher-lang'])}>${reference.publisher}</span>${reference.publisher.endsWith('.') ? ' ' : '. '}`)
);

/**
 * @param {Reference} reference
 * @returns {string}
 */
const renderContainer = (reference) => {
    if (!('container-title' in reference)) {
        return '';
    }

    const containerTitle = reference['container-title'];
    const { id } = reference;

    const pageSuffix =
        reference.page !== undefined
            ? `: ${isNaN(+reference.page) ? "pages" : "page"} ${reference.page}. `.replace('-', '–') // promote hyphen to en-dash
            : '. ';

    switch (reference.type) {
        case 'webpage':
            return ` <span itemscope itemtype="http://schema.org/WebSite" itemprop="isPartOf">`
                + `<i><span itemprop="name"${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</span></i>.`
                + `</span>`;

        case 'chapter':
        case 'paper-conference':
            return ` In <cite${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</cite>`
                + `${ifSet(reference.editor, `, edited by ${renderPeople(reference.editor, false, false, 'editor')}`)}`
                + pageSuffix;

        case 'article-magazine':
        case 'article-newspaper':
            const { issued } = reference;
            if (!issued) throw new Error('Magazine/newspaper citations must have issued date');

            const issue = reference.issue ? ` ${formatNumberString(reference.issue)})` : '';
            const volume = reference.volume ? ` <abbr title="volume">vol.</abbr>&nbsp;${formatNumberString(reference.volume)}` : '';

            const title = `<cite itemprop="name"${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</cite>`;

            // TODO: metadata
            const dateString = renderExplicitDate(issued, true);
            const date = dateString !== null ? `, ${dateString}` : '';
            return title + volume + issue + date + pageSuffix;

        case 'article-journal':
            if (reference.issue && reference.volume) {
                const { issue, volume } = reference;
                return (
                    `<span itemscope itemtype="http://schema.org/Periodical" itemid="${`#${id}-periodical`}">`
                    + `<cite itemprop="name"${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</cite>`
                    + `</span>`
                    + ' '
                    + `<span itemscope itemtype="http://schema.org/PublicationVolume" itemid="${`#${id}-volume`}">`
                    + `<link itemprop="isPartOf" href="${`#${id}-periodical`}" />`
                    + `<abbr title="volume">vol.</abbr>&nbsp;`
                    + `<span itemprop="volumeNumber">${formatNumberString(volume)}</span>`
                    + `</span>`
                    + ' '
                    + `<span itemprop="isPartOf" itemscope itemtype="http://schema.org/PublicationIssue">`
                    + `<link itemprop="isPartOf" href="${`#${id}-volume`}" />`
                    + `(<span itemprop="issueNumber">${formatNumberString(issue)}</span>)`
                    + `</span>`
                    + pageSuffix
                );
            }

            if (reference.issue) {
                const { issue } = reference;
                return (
                    `<span itemscope itemtype="http://schema.org/Periodical" itemid="${`#${id}-periodical`}">`
                    + `<cite itemprop="name"${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</cite>`
                    + `</span>`
                    + ' '
                    + `<span itemprop="isPartOf" itemscope itemtype="http://schema.org/PublicationIssue">`
                    + `<link itemprop="isPartOf" href="${`#${id}-periodical`}" />`
                    + `(<span itemprop="issueNumber">${formatNumberString(issue)}</span>)`
                    + `</span>`
                    + pageSuffix
                );
            }

            if (reference.volume) {
                const { volume } = reference;
                return (
                    `<span itemscope itemtype="http://schema.org/Periodical" itemid="${`#${id}-periodical`}">`
                    + `<cite itemprop="name"${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</cite>`
                    + `</span>`
                    + ' '
                    + `<span itemprop="isPartOf" itemscope itemtype="http://schema.org/PublicationVolume">`
                    + `<link itemprop="isPartOf" href="${`#${id}-periodical`}" />`
                    + `<abbr title="volume">vol.</abbr>&nbsp;`
                    + `<span itemprop="volumeNumber">${formatNumberString(volume)}</span>`
                    + `</span>`
                    + pageSuffix
                );
            }

            return '';
        default:
            return '';
    }
}
