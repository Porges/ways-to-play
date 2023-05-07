import { renderExplicitDate, formatNumberString, asAttr, isolate, ifSet } from './helpers';
import { BiblioRef, Reference, Date, Author, LStr, Periodical, referenceValidator, Book } from './references-schema';

import ordinal from 'ordinal';
import ISBN from 'isbn3';

export function renderReference(ref: BiblioRef): string {
    const { id, type } = ref;

    let extraItemTypes = "";
    if ('volume' in ref) {
        extraItemTypes += ' https://schema.org/PublicationVolume';
    }

    return `<p itemscope itemtype="${itemtypes[type]}${extraItemTypes}" id="ref-${id}" itemprop="citation">`
        + renderAuthors(ref)
        + renderDate(ref)
        + renderTitle(ref)
        + ('series' in ref ? renderSeries(ref, '; ', '') : '')
        + '. '
        + renderPatentBits(ref)
        + renderContainer(ref)
        + (ref.type === 'thesis' ? ` ${ref.genre}, ` : '')
        + (('publisher' in ref || 'publisher-place' in ref)
            ? `<span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">${renderPublisher(ref)}</span>`
            : '')
        + renderISBN(ref)
        + renderWarningsAndNotes(ref)
        + '</p>';
}

const itemtypes = {
    'article-journal': 'https://schema.org/ScholarlyArticle',
    'paper-conference': 'https://schema.org/ScholarlyArticle',
    'book': 'https://schema.org/Book',
    'thesis': 'https://schema.org/Thesis',
    'webpage': 'https://schema.org/WebPage',
    'manuscript': 'https://schema.org/Manuscript',
    'document': 'https://schema.org/CreativeWork',
    'article-newspaper': 'https://schema.org/Article',
    'article-magazine': 'https://schema.org/Article',
    'chapter': 'https://schema.org/Chapter',
    'patent': 'https://schema.org/CreativeWork',
} as const;


function renderWarningsAndNotes(reference: Reference) {
    let result = '';

    if (reference.warnings) {
        result += `<span class="reference-warning"><abbr title="warning">⚠</abbr>&nbsp;${reference.warnings}</span>`;
    }

    if (reference.notes) {
        result += `<span class="reference-note"><abbr title="note">&#x2139;</abbr>&nbsp;${reference.notes}</span>`;
    }

    return result;
};

function renderPatentBits(reference: Reference) {
    if (reference.type !== 'patent') return '';

    const filed = reference.filed ? renderExplicitDate(reference.filed, false) : '';
    const issued = reference.issued ? renderExplicitDate(reference.issued, false) : '';

    return (
        (reference.patentNumber
            ? `Patent ${formatNumberString(reference.patentNumber)}${ifSet(reference.applicationNumber, ` (application ${formatNumberString(reference.applicationNumber || "")}`)}.`
            : ifSet(reference.applicationNumber, `Patent application ${formatNumberString(reference.applicationNumber || "")}.`))
        + ifSet(filed, ` Filed ${filed}.`)
        + ifSet(issued, ` Issued ${issued}.`)
    );
}

function renderSeries(ref: Reference, lead: string, trail: string) {
    if (!('series' in ref) || !ref.series) {
        return '';
    }

    const s = ref.series;

    let title = renderLStr(s.title, 'span', {itemprop: 'name'});
    
    if (s.URL) {
        title = `<a href="${s.URL}" itemprop="url">${title}</a>`;
    }

    return lead
        + `<span itemscope itemtype="https://schema.org/BookSeries" itemprop="isPartOf">`
        + title
        + ifSet(s.ISSN, i => ` (<abbr class="initialism">ISSN</abbr> <span itemprop="issn">${i}</span>)`)
        + [
         ifSet(s.volume, v => ` volume ${v}`),
         ifSet(s.number, n => ` number ${n}`)
        ].filter(x => x).join(', ') 
        + ifSet(s.editor, e => `, series editor${e.length > 1 ? 's' : ''} ${renderPeople(e, false, false, 'editor')}`)
        + '</span>'
        + trail;
}

function renderTitle(reference: Reference) {
    const archiveURL =
        'archive-URL' in reference
            ? ` [<a href="${reference['archive-URL']}">archived</a>]`
            : '';

    let linkedTitle: LStr = '';
    if (reference.URL) {
        if (typeof reference.title === 'string') {
            linkedTitle = `<a itemprop="url" href="${reference.URL}">${reference.title}</a>`;
        } else {
            linkedTitle = {
                value: `<a itemprop="url" href="${reference.URL}">${reference.title.value}</a>`,
                lang: reference.title.lang,
                alt: reference.title.alt,
            };
        }
    } else {
        linkedTitle = reference.title;
    }

    if (reference.type === 'book' || reference.type === 'thesis') {
        return renderLStr(linkedTitle, 'cite', {itemprop: 'name'})
            + archiveURL
            + ifSet(reference.volume, v =>
                ` volume <span itemprop="volumeNumber">${formatNumberString(v)}</span>`
                + (('volume-title' in reference && reference['volume-title']) ? `: ‘${renderLStr(reference['volume-title'], 'span', {})}’` : '')
                )
            + ('edition' in reference && reference['edition'] ? ` (<span itemprop="bookEdition">${ordinal(reference['edition'])} edition</span>)` : '');
    } else {
        return '‘'
            + renderLStr(linkedTitle, 'span', { itemprop: 'name headline' })
            + '’'
            + archiveURL;
    }
}

function renderBook(book: Book, itemprop: string) {
    const extraItemTypes = 'volume' in book ? ' https://schema.org/PublicationVolume' : ''
    return `<span itemscope itemtype="${itemtypes.book}${extraItemTypes}" itemprop="${itemprop}">`
        + renderTitle(book)
        + ('author' in book && book.author ? ', ' + renderPeople(book.author, false, false, 'author') : '')
        + ('editor' in book && book.editor ? ', edited by ' + renderPeople(book.editor, false, false, 'editor') : '')
        + renderSeries(book, '; ', '')
        + '. '
        + `<span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">${renderPublisher(book)}</span>`
        + renderISBN(book)
        + '</span>';
}

export function renderLStr(lStr: LStr, tag: string, attributes: Record<string, string|undefined>) {
    const value = typeof lStr == 'string' ? lStr : lStr.value;
    const lang = typeof lStr == 'string' ? undefined : lStr.lang;

    const atts = Object.entries(attributes).map(([k, v]) => asAttr(k, v)).join('');

    const result = isolate(`<${tag}${atts}${asAttr('lang', lang)}>${value}</${tag}>`);
    if (typeof lStr == 'object' && lStr.alt) {
        return result + ` [${lStr.alt}]`;
    }

    return result;
}

const renderAuthors = (reference: Reference) => {
    if (reference.author) {
        return `${renderPeople(reference.author, true, false, 'author')} `;
    } else if ('editor' in reference && reference.editor) {
        const plural = reference.editor.length > 1 ? 's' : '';
        return `${renderPeople(reference.editor, true, false, 'editor')} (editor${plural}) `;
    } else if ('publisher' in reference && reference.publisher) {
        return `<span itemscope itemtype="https://schema.org/Organization" itemprop="author">`
            + renderLStr(reference.publisher, 'span', {itemprop: 'name', class: 'noun'})
            + '</span> ';
    } else if ('in' in reference && 'publisher' in reference.in && reference.in.publisher) {
        return `<span itemscope itemtype="https://schema.org/Organization" itemprop="author">`
            + renderLStr(reference.in.publisher, 'span', {itemprop: 'name', class: 'noun'})
            + '</span> ';
    } else {
        return `<i>Anonymous</i> `;
    }
}

const renderPeople = (as: readonly Author[], reverseFirst: boolean, period: boolean, itemprop: string) => {
    const renderFamily = (a: Author, ix: number) =>
        `<span itemprop="familyName">${a.family}</span>${ifSet(period && ix === (as.length - 1) && !a.family?.endsWith('.'), '.')}`;

    const renderGiven = (a: Author, ix: number) => {
        if (typeof a.given === 'string') {
            return `<span itemprop="givenName">${a.given}</span>${ifSet(period && reverseFirst && ix === 0 && ix === (as.length - 1) && !a.given.endsWith('.'), '.')}`;
        } else {
            return `<span itemprop="givenName">${a.given[0]}</span>`
                + ifSet(a.given.length > 1, ` <span itemprop="additionalName">${a.given.slice(1).join(' ')}</span>`)
                + ifSet(period && reverseFirst && ix === 0 && ix === (as.length - 1) && !a.given[a.given.length - 1].endsWith('.'), '.');
        }
    };

    const reverseName = (a: Author) => a.lang === undefined ? false : (a.lang.startsWith('zh') || a.lang.startsWith('ja'));
    const hiddenName = (a: Author) => `<meta itemprop="name" content="${reverseName(a) ? `${a.family}${a.given}` : `${a.given} ${a.family}`}" />`;

    const altName = (a: Author) => {
        if (!a.alt) {
            return '';
        }

        return ' [' + renderLStr(a.alt, 'span', {class: 'noun'}) + ']';
    }

    return as.map((a, ix) => (
        ifSet(ix > 0, (ix === as.length - 1) ? `${ifSet(as.length > 2, ',')} and ` : ", ")
        + `<span itemscope itemtype="http://schema.org/Person"${asAttr('itemprop', itemprop)}${asAttr('lang', a.lang)} class="noun">`
        + hiddenName(a)
        + ((reverseFirst && ix === 0)
            ? ifSet(a.family, () => `${isolate(renderFamily(a, ix))}, `) + isolate(renderGiven(a, ix))
            : isolate(
                reverseName(a)
                    ? `${ifSet(a.family, () => `${renderFamily(a, ix)}`)}${renderGiven(a, ix)}`
                    : `${renderGiven(a, ix)}${ifSet(a.family, () => ` ${renderFamily(a, ix)}`)}`))
        + `</span>`
        + altName(a))).join('');
};

const renderISBN = (reference: Reference) => {
    const isbn = 'ISBN' in reference ? reference.ISBN : undefined;
    if (!isbn) {
        return '';
    }

    const parsed = ISBN.audit(isbn);
    if (!parsed.validIsbn) {
        console.error(parsed);
        throw new Error("Invalid ISBN: " + isbn);
    }

    const formattedISBN = ISBN.hyphenate(isbn.toString());

    return `<abbr class="initialism">ISBN</abbr>: <a href="https://www.worldcat.org/isbn/${formattedISBN}"><span itemprop="isbn">${formattedISBN}</span></a>. `;
};

const renderDate = (reference: Reference) => {
    const issued =
        'issued' in reference
            ? reference.issued
            : 'in' in reference
                ? reference.in.issued
                : undefined;

    if (issued) {
        const originalDate =
            'original-date' in reference && reference['original-date']
            ? reference['original-date']
            : 'in' in reference && 'original-date' in reference.in && reference.in['original-date']
                ? reference.in['original-date']
                : undefined;

        const original =
            originalDate
            ? `, originally published ${typeof originalDate === 'number' ? originalDate : originalDate.year}`
            : '';

        const year = typeof issued === 'number' ? issued : issued.year;

        const circa = typeof issued === 'number' ? '' : (issued.circa ? '<abbr title="circa">c.</abbr> ' : '');

        return `(<time itemprop="datePublished" dateTime="${toIsoDate(issued)}">${circa}${year}</time>${original}). `;
    }

    // patents might only have been filed
    if ('filed' in reference) {
        const { filed } = reference;
        const year = typeof filed === 'number' ? filed : filed.year;
        return `(<time itemprop="datePublished" dateTime="${toIsoDate(filed)}">${year}</time>). `;
    }

    return '(n.d.). ';
}

function toIsoDate(ymd: Date) {
    if (typeof ymd == "number") {
        return ymd;
    }

    let result = `${ymd.year}`;
    if ('month' in ymd) {
        result += `-${ymd.month.toString().padStart(2, '0')}`;

        if ('day' in ymd) {
            result += `-${ymd.day.toString().padStart(2, '0')}`;
        }
    }

    return result;
}

function lstrValue(l: LStr) {
    if (typeof l === 'string') {
        return l;
    }

    return l.value;
}

const renderPublisher = (reference: { publisher?: LStr, ['publisher-place']?: string}) => {
    let result = '';

    const publisher = 'publisher' in reference ? reference.publisher : undefined;
    if (publisher) {
        result = renderLStr(publisher, 'span', {itemprop: 'name'});
    }

    // (p) => `<span class="noun"${asAttr('lang', reference['publisher-lang'])}>${p}</span>${reference['publisher-place'] ? ': ' : (p.endsWith('.') ? ' ' : '. ')}`)

    const publisherPlace = 'publisher-place' in reference ? reference['publisher-place'] : undefined;
    if (publisherPlace) {
        const prefix = result != '' ? ': ' : '';
        result += `${prefix}<span itemprop="location">${publisherPlace}</span>. `;
    } else {
        if (publisher && !lstrValue(publisher).endsWith('.')) {
            result += '. ';
        }
    }

    return result;
};

function renderPeriodical(id: string, p: Periodical): string {
    // if date is more specific than a year, show it
    let datePart = '';
    if (typeof p.issued === 'object' && 'month' in p.issued) {
        const dateString = renderExplicitDate(p.issued, true);
        datePart = ifSet(dateString, `, <time itemprop="datePublished" dateTime="${toIsoDate(p.issued)}">${dateString}</time>`);
    }

    if (p.issue && p.volume) {
        const { issue, volume } = p;
        return (
            `<span itemscope itemtype="http://schema.org/Periodical" itemid="${`#${id}-periodical`}">`
            + `<link itemprop="publisher" href="${`#${id}-publisher`}" />`
            + renderLStr(p.title, 'cite', {itemprop: 'name'})
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
            + datePart
            + `</span>`
        );
    }

    if (p.issue) {
        const { issue } = p;
        return (
            `<span itemscope itemtype="http://schema.org/Periodical" itemid="${`#${id}-periodical`}">`
            + `<link itemprop="publisher" href="${`#${id}-publisher`}" />`
            + renderLStr(p.title, 'cite', {itemprop: 'name'})
            + `</span>`
            + ' '
            + `<span itemprop="isPartOf" itemscope itemtype="http://schema.org/PublicationIssue">`
            + `<link itemprop="isPartOf" href="${`#${id}-periodical`}" />`
            + `(<span itemprop="issueNumber">${formatNumberString(issue)}</span>)`
            + datePart
            + `</span>`
        );
    }

    if (p.volume) {
        const { volume } = p;
        return (
            `<span itemscope itemtype="http://schema.org/Periodical" itemid="${`#${id}-periodical`}">`
            + `<link itemprop="publisher" href="${`#${id}-publisher`}" />`
            + renderLStr(p.title, 'cite', {itemprop: 'name'})
            + `</span>`
            + ' '
            + `<span itemprop="isPartOf" itemscope itemtype="http://schema.org/PublicationVolume">`
            + `<link itemprop="isPartOf" href="${`#${id}-periodical`}" />`
            + `<abbr title="volume">vol.</abbr>&nbsp;`
            + `<span itemprop="volumeNumber">${formatNumberString(volume)}</span>`
            + datePart
            + `</span>`
        );
    }

    // neither volume nor issue
    return (
        `<span itemprop="isPartOf" itemscope itemtype="http://schema.org/Periodical">`
        + `<link itemprop="publisher" href="${`#${id}-publisher`}" />`
        + renderLStr(p.title, 'cite', {itemprop: 'name'})
        + datePart
        + `</span>`
    );
}

function renderContainer(reference: BiblioRef) {
    const { id } = reference;

    switch (reference.type) {
        case 'webpage':
            if ('container-title' in reference && reference['container-title']) {
                return ` <span itemscope itemtype="http://schema.org/WebSite" itemprop="isPartOf">`
                    + '<i>'
                    + renderLStr(reference['container-title'], 'span', {itemprop: 'name'})
                    + '</i>'
                    + `</span>. `;
            }

            return '';

        case 'chapter':
        case 'paper-conference':
            const prefix = 'page' in reference && reference.page
                ? `${isNaN(+reference.page) ? "Pages" : "Page"}  <span itemprop="pagination">${reference.page}</span> in `.replace('-', '–')
                : " In ";

            return prefix + renderBook(reference.in, 'isPartOf');

        case 'article-magazine':
        case 'article-newspaper':
        case 'article-journal':
            const pageSuffix =
                ('page' in reference && reference.page)
                    ? `: ${isNaN(+reference.page) ? "pages" : "page"} <span itemprop="pagination">${reference.page}</span>. `.replace('-', '–') // promote hyphen to en-dash
                    : '. ';

            const publisher = renderPublisher(reference.in);

            return renderPeriodical(id, reference.in) + pageSuffix + `<span itemscope itemtype="https://schema.org/Organization" itemid="#${id}-publisher">${publisher}</span>`;

        default:
            return '';
    }
}
