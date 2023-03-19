import { renderExplicitDate, formatNumberString, asAttr, isolate, ifSet } from './helpers';
import { Author, Date } from './types';

import ordinal from 'ordinal';
import ISBN from 'isbn3';

export function renderReference(ref: Reference): string {
    const { id, type } = ref;

    // fixup
    if (typeof ref.issued === 'number') {
        ref.issued = { year: ref.issued };
    }

    let extraItemTypes = "";
    if ('volume' in ref) {
        extraItemTypes += ' https://schema.org/PublicationVolume';
    }

    return `<p itemscope itemtype="${itemtypes[type]}${extraItemTypes}" id="ref-${id}" itemprop="citation">`
        + renderAuthors(ref)
        + renderDate(ref)
        + renderTitle(ref)
        + renderPatentBits(ref)
        + renderContainer(ref)
        + renderPublisher(ref)
        + renderISBN(ref)
        + renderWarningsAndNotes(ref)
        + '</p>';
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

export type Reference = {
  type: keyof typeof itemtypes,
  id: string,
  title: string,
  ['title-lang']?: string,
  'title-alt'?: string,
  author?: readonly Author[],
  editor?: readonly Author[],
  URL?: string,
  ['archive-URL']?: string,
  ISBN?: string | number,
  ['container-title']?: string,
  ['container-title-lang']?: string,
  edition?: number,
  volume?: string | number,
  ['volume-title']?: string,
  issue?: string | number,
  ['original-date']?: { year: number },
  issued?: { year: number } | { year: number, month: number } | { year: number, month: number, day: number } | { year: number, season: string },
  ['publisher-place']?: string,
  publisher?: string,
  ['publisher-lang']?: string,
  page?: string | number,
  warnings?: string,
  notes?: string,

  ['series-title']?: string,
  ['series-volume']?: number,
  ['series-number']?: number,

  genre?: string, // for theses

  filed?: { year: number, month: number, day: number }, // for patents
  applicationNumber?: string | number,
  patentNumber?: string | number,
};


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

function renderTitle(reference: Reference) {
    const lang = reference["title-lang"];

    const linked =
        reference.URL
            ? `<a itemprop="url" href="${reference.URL}">${reference.title}</a>`
            : `<span>${reference.title}</span>`;

    const archiveURL = 
        reference['archive-URL']
        ? ` [<a href="${reference['archive-URL']}">archived</a>]`
        : '';

    if (reference.type === 'book' || reference.type === 'thesis') {
        return `<cite itemprop="name"${asAttr('lang', lang)}>${isolate(linked)}</cite>`
            + ifSet(reference['title-alt'], t => ` [${t}]`)
            + ifSet(reference.edition, e => ` (${ordinal(e)} edition)`)
            + ifSet(reference.volume, v => ` (volume <span itemprop="volumeNumber">${formatNumberString(v)}</span>${ifSet(reference['volume-title'], vt => `: ${vt}`)})`)
            + ifSet(reference['series-title'], st => {
                return `; ${st}${ifSet(reference['series-volume'], v => `: volume ${v}`)}${ifSet(reference['series-number'], n => `, number ${n}`)}` 
            })
            + archiveURL
            + `. `;
    } else {
        return `‘<span itemprop="name headline"${asAttr('lang', lang)}>${isolate(linked)}</span>’${archiveURL}. `;
    }
}

const renderAuthors = (reference: Reference) => {
    if (reference.author) {
        return `${renderPeople(reference.author, true, false, 'author')} `;
    } else if ('editor' in reference && reference.editor) {
        const plural = reference.editor.length > 1 ? 's' : '';
        return `${renderPeople(reference.editor, true, false, 'editor')} (editor${plural}) `;
    } else if ('publisher' in reference) {
        return (`<span itemscope itemtype="http://schema.org/Organization" itemprop="author">`
            + `<span class="noun" itemprop="name"${asAttr('lang', reference['publisher-lang'])}>${reference.publisher}</span></span> `);
    } else {
        return `<i>Anonymous</i> `;
    }
}

const renderPeople = (as: readonly Author[], reverseFirst: boolean, period: boolean, itemprop: string) => {
    const renderFamily = (a: Author, ix: number) =>
        `<span itemprop="familyName">${a.family}</span>${ifSet(period && ix > 0 && ix === (as.length - 1) && !a.family?.endsWith('.'), '.')}`;

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
            return "";
        }

        return ` [<span class="noun"${ifSet(a['alt-lang'], ` lang='${a['alt-lang']}'`)}>${a.alt}</span>]`;
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
    if (!reference.ISBN) {
        return '';
    }

    const parsed = ISBN.audit(reference.ISBN.toString());
    if (!parsed.validIsbn) {
        console.error(parsed);
        throw new Error("Invalid ISBN: " + reference.ISBN);
    }

    const formattedISBN = ISBN.hyphenate(reference.ISBN.toString());

    return `<abbr class="initialism">ISBN</abbr>: <a itemprop="isbn" href="https://www.worldcat.org/isbn/${formattedISBN}">${formattedISBN}</a>. `;
};

const renderDate = (reference: Reference) => {
    if (reference.issued) {
        const original =
            reference['original-date']
                ? `, originally published ${reference['original-date'].year}`
                : '';

        const { issued } = reference;

        return `(<time itemprop="datePublished" dateTime="${toIsoDate(issued)}">${issued.year}</time>${original}). `;
    }

    // patents might only have been filed
    if (reference.filed) {
        const { filed } = reference;

        return `(<time itemprop="datePublished" dateTime="${toIsoDate(filed)}">${filed.year}</time>). `;
    }

    return 'n.d. ';
}

function toIsoDate(ymd: Date) {
    let result = `${ymd.year}`;
    if ('month' in ymd) {
        result += `-${ymd.month.toString().padStart(2, '0')}`;

        if (ymd.day) {
            result += `-${ymd.day.toString().padStart(2, '0')}`;
        }
    }

    return result;
}

const renderPublisher = (reference: Reference) => {
    const publisher =
        ifSet(reference.publisher,
            (p) => `<span class="noun"${asAttr('lang', reference['publisher-lang'])}>${p}</span>${reference['publisher-place'] ? ': ' : (p.endsWith('.') ? ' ' : '. ')}`)
        + ifSet(reference['publisher-place'], pp => `${pp}. `);

    if (reference.type === 'thesis') {
        return ifSet(reference['genre'], g => ` ${g}, `) + publisher;
    }

    return publisher;
};

function renderContainer(reference: Reference) {
    if (!('container-title' in reference)) {
        return '';
    }

    const containerTitle = reference['container-title'];
    const { id } = reference;

    const pageSuffix =
        reference.page !== undefined
            ? `: ${isNaN(+reference.page) ? "pages" : "page"} <span itemprop="pagination">${reference.page}</span>. `.replace('-', '–') // promote hyphen to en-dash
            : '. ';

    switch (reference.type) {
        case 'webpage':
            return ` <span itemscope itemtype="http://schema.org/WebSite" itemprop="isPartOf">`
                + `<i><span itemprop="name"${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</span></i>`
                + `</span>. `;

        case 'chapter':
        case 'paper-conference':
            return ` In <cite${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</cite>`
                + ifSet(reference['series-title'], st => ` (${st}${ifSet(reference['series-volume'], v => `: volume ${v}`)}${ifSet(reference['series-number'], n => `, number ${n}`)})`)
                + ifSet(reference.editor, e => `, edited by ${renderPeople(e, false, false, 'editor')}`)
                + pageSuffix;

        case 'article-magazine':
        case 'article-newspaper':
            const { issued } = reference;
            if (!issued) throw new Error('Magazine/newspaper citations must have issued date');

            const title = '<span itemprop="isPartOf" itemscope itemtype="https://schema.org/Periodical">'
                + `<cite itemprop="name"${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</cite>`
                + '</span>';

            let result = title;
            if (reference.volume) {
                result += ' <span itemprop="isPartOf" itemscope itemtype="https://schema.org/PublicationVolume">'
                    + `<abbr title="volume">vol.</abbr>&nbsp;<span itemprop="volumeNumber">${formatNumberString(reference.volume)}</span>`
                    + '</span>';
            }

            const dateString = renderExplicitDate(issued, true);
            const date = ifSet(dateString, `, ${dateString}`);

            if (reference.issue) {
                // note that datePublished is already on the top-level item. we
                // will add to the issue as well.
                const dataDate = `<time itemprop="datePublished" dateTime="${toIsoDate(issued)}">`
                    + date
                    + '</time>';
                result += ' <span itemprop="isPartOf" itemscope itemtype="https://schema.org/PublicationIssue">'
                    + `(<span itemprop="issueNumber">${formatNumberString(reference.issue)}</span>)`
                    + dataDate
                    + '</span>';
            } else {
                result += date;
            }

            return result + pageSuffix;

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

            // neither volume nor issue
            return (
                `<span itemprop="isPartOf" itemscope itemtype="http://schema.org/Periodical">`
                + `<cite itemprop="name"${asAttr('lang', reference['container-title-lang'])}>${containerTitle}</cite>`
                + `</span>`
                + pageSuffix
            );

        default:
            return '';
    }
}
