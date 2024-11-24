import { renderExplicitDate, formatNumberString, ifSet } from './helpers.jsx';
import { BiblioRef, Reference, Date, Author, LStr, Periodical, Book } from './references-schema.js';
import * as React from 'react';

import ordinal from 'ordinal';
import ISBN from 'isbn3';
import { Isolated } from './helpers.jsx';

export function renderReference(ref: BiblioRef): React.JSX.Element {
    const { id, type } = ref;

    let extraItemTypes = "";
    if ('volume' in ref) {
        extraItemTypes += ' https://schema.org/PublicationVolume';
    }

    return (<>
        {renderWarningsAndNotes(ref)}
        <p itemScope itemType={itemtypes[type] + extraItemTypes} id={`ref-${id}`} itemProp="citation">
            {renderAuthors(ref)}
            {renderDate(ref)}
            {renderTitle(ref)}
            {renderEditor(ref)}
            {renderTranslator(ref)}
            {renderSeries(ref, '; ', '')}
            {'. '}
            {renderPatentBits(ref)}
            {renderContainer(ref)}
            {(ref.type === 'thesis') && <> {ref.genre}, </>}
            {(('publisher' in ref || 'publisher-place' in ref)
                && <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                    {renderPublisher(ref)}
                </span>)}
            {renderISBN(ref)}
        </p>
    </>);
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


function renderWarningsAndNotes(reference: Reference): React.JSX.Element {
    let warns = null;
    if (reference.warnings) {
        warns = <aside className="reference-warning footnote" dangerouslySetInnerHTML={safeHTML(reference.warnings)} />;
    }

    let notes = null;
    if (reference.notes) {
        notes = <aside className="reference-note footnote" dangerouslySetInnerHTML={safeHTML(reference.notes)} />;
    }

    return <>{warns}{notes}</>;
};

function renderPatentBits(reference: Reference): React.JSX.Element | null {
    if (reference.type !== 'patent') return null;

    const filed = reference.filed ? renderExplicitDate(reference.filed, false) : null;
    const issued = reference.issued ? renderExplicitDate(reference.issued, false) : null;

    return (<>
        {reference.patentNumber
            ? <>Patent {formatNumberString(reference.patentNumber)}
                {reference.applicationNumber && <> (application {formatNumberString(reference.applicationNumber || "")}).</>}
            </>
            : <>{reference.applicationNumber && <>Patent application {formatNumberString(reference.applicationNumber || "")}.</>}</>}
        {filed && <> Filed {filed}.</>}
        {issued && <> Issued {issued}.</>}
    </>);
}

function renderSeries(ref: Reference, lead: string, trail: string): React.JSX.Element | null {
    if (!('series' in ref) || !ref.series) {
        return null;
    }

    const s = ref.series;

    let title = renderLStr(s.title, 'span', { itemProp: 'name' }, { itemProp: 'alternateName' });

    if (s.URL) {
        title = <a href={s.URL} itemProp="url">{title}</a>;
    }

    return (<>
        {lead}
        <span itemScope itemType="https://schema.org/BookSeries" itemProp="isPartOf">
            {title}
            {s.ISSN && <> (<abbr className="initialism">ISSN</abbr> <span itemProp="issn">{s.ISSN}</span>)</>}
            {[ifSet(s.volume, v => ` volume ${v}`), ifSet(s.number, n => ` number ${n}`)].filter(x => x).join(', ')}
            {s.editor && <>, series editor${s.editor.length > 1 ? 's' : ''} {renderPeople(s.editor, false, false, 'editor')}</>}
        </span>
        {trail}
    </>);
}

// TODO: used trustedTypes when available
// the source for this is always trusted (it's me) but
// we still only want to permit a subset here so things don't get weird
export function safeHTML(s: string): { __html: string } {
    return { __html: s.replace(/<(?!\/?(b|i|em|sup( class="ordinal")?|cite( lang=("[-a-zA-Z]+"|'[-a-zA-Z]+'))?|span( lang=("[-a-zA-Z]+"|'[-a-zA-Z]+'))?( class="noun")?|a( href=("https?:\/\/[^"]+"|'https?:\/\/[^']+'))?)>)/g, '&lt;') };
}

function renderTitle(reference: Reference): React.JSX.Element {
    const archiveURL =
        'archive-URL' in reference
            ? <> [<a itemProp="archivedAt" href={reference['archive-URL']}>archived</a>]</>
            : null;

    // normalize title
    let title: LStr =
        (typeof reference.title === 'string')
            ?
            { value: reference.title }
            : reference.title;

    // if there is a URL, link the title
    // also we allow some HTML to exist in the title
    if (reference.URL) {
        title = {
            value: (typeof title.value === 'string')
                ? <a itemProp="url" href={reference.URL} dangerouslySetInnerHTML={safeHTML(title.value)} />
                : <a itemProp="url" href={reference.URL}>{title.value}</a>,
            lang: title.lang,
            alt: title.alt,
        };
    }

    if (reference.type === 'book' || reference.type === 'thesis') {
        return (<>
            {renderLStr(title, 'cite', { itemProp: 'name' }, { itemProp: 'alternateName' })}
            {archiveURL}
            {reference.volume && <>
                {' volume '}
                <span itemProp="volumeNumber">{formatNumberString(reference.volume)}</span>
                {('volume-title' in reference && reference['volume-title']) &&
                    <>: ‘{renderLStr(reference['volume-title'], 'span', {})}’</>}
            </>}
            {('edition' in reference && reference['edition']) &&
                <> (<span itemProp="bookEdition">{ordinal(reference['edition'])} edition</span>)</>}
        </>);
    } else {
        return (<>
            {'‘'}
            {renderLStr(title, 'span', { itemProp: 'name headline' }, { itemProp: 'alternateName' })}
            {'’'}
            {archiveURL}
        </>);
    }
}

function renderBook(book: Book, itemprop: string): React.JSX.Element {
    const extraItemTypes = 'volume' in book ? ' https://schema.org/PublicationVolume' : ''
    return (<span itemScope itemType={itemtypes.book + extraItemTypes} itemProp={itemprop}>
        {renderTitle(book)}
        {('author' in book && book.author) && <>, {renderPeople(book.author, false, false, 'author')}</>}
        {('editor' in book && book.editor) && <>, edited by {renderPeople(book.editor, false, false, 'editor')}</>}
        {renderSeries(book, '; ', '')}
        {'. '}
        <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">{renderPublisher(book)}</span>
        {renderISBN(book)}
    </span>);
}

export function renderLStr<T extends 'span' | 'cite'>(
    lStr: LStr,
    tag: T,
    attributes: T extends 'span' ? React.HTMLAttributes<HTMLSpanElement> : React.HTMLAttributes<HTMLElement>,
    altAttributes?: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element {

    // normalize
    lStr = typeof lStr == 'string' ? { value: lStr } : lStr;

    const Tag = tag;
    const result =
        (typeof lStr.value == 'string')
            ? <Isolated><Tag {...attributes} lang={lStr.lang} dangerouslySetInnerHTML={safeHTML(lStr.value)} /></Isolated>
            : <Isolated><Tag {...attributes} lang={lStr.lang}>{lStr.value}</Tag></Isolated>;

    if (lStr.alt) {
        return <>{result} [<span {...altAttributes} dangerouslySetInnerHTML={safeHTML(lStr.alt)} />]</>;
    }

    return result;
}

function renderAuthors(reference: Reference): React.JSX.Element {
    if (reference.author) {
        return <>{renderPeople(reference.author, true, false, 'author')} </>;
    } else if ('editor' in reference && reference.editor) {
        const plural = reference.editor.length > 1 ? 's' : '';
        return <>{renderPeople(reference.editor, true, false, 'editor')} (editor{plural}) </>;
    } else if ('publisher' in reference && reference.publisher) {
        return (<>
            <span itemScope itemType="https://schema.org/Organization" itemProp="author">
                {renderLStr(reference.publisher, 'span', { itemProp: 'name', className: 'noun' }, { itemProp: 'alternateName' })}
            </span> (publisher) </>);
        /*
        } else if ('in' in reference && 'publisher' in reference.in && reference.in.publisher) {
            return `<span itemscope itemtype="https://schema.org/Organization" itemprop="author">`
            + renderLStr(reference.in.publisher, 'span', {itemprop: 'name', class: 'noun'})
            + '</span> ';
        */
    } else {
        return <><i>Anonymous</i> </>;
    }
}

function renderTranslator(reference: Reference): React.JSX.Element | null {
    if ('translator' in reference && reference.translator) {
        return <>, translated by {renderPeople(reference.translator, false, false, 'translator')}</>;
    }

    return null;
}

function renderEditor(reference: Reference): React.JSX.Element | null {
    if (reference.author !== undefined) {
        // if author was not present we would have shown editor as author
        if ('editor' in reference && reference.editor) {
            return <>, edited by {renderPeople(reference.editor, false, false, 'editor')}</>;
        }
    }

    return null;
}

function renderPeople(as: readonly Author[], reverseFirst: boolean, period: boolean, itemprop: string): React.JSX.Element {
    const renderFamily = (a: Author, ix: number) =>
        <><span itemProp="familyName">{a.family}</span>{ifSet(period && ix === (as.length - 1) && !a.family?.endsWith('.'), '.')}</>;

    const renderGiven = (a: Author, ix: number) =>
        <><span itemProp="givenName">{a.given}</span>{ifSet(period && reverseFirst && ix === 0 && ix === (as.length - 1) && !a.given.endsWith('.'), '.')}</>;

    // Japanese and Chinese names should be last-name first
    const reverseName = (a: Author) => a.lang === undefined ? false : (a.lang.startsWith('zh') || a.lang.startsWith('ja'));

    // if using Latin script we still need a space between, otherwise we don’t
    const isLatn = (a: Author) => a.lang === undefined || a.lang.endsWith("-Latn");

    const hiddenName = (a: Author) =>
        <meta
            itemProp="name"
            content={reverseName(a) ? `${a.family || ''}${isLatn(a) ? ' ' : ''}${a.given}` : `${a.given} ${a.family || ''}`} />;

    const altName = (a: Author) => {
        if (!a.alt) {
            return null;
        }

        return <> [{renderLStr(a.alt, 'span', { className: 'noun', itemProp: 'alternateName' })}]</>;
    }

    function surroundUrl(content: React.JSX.Element | undefined, url: string | undefined) {
        if (url) {
            return <a href={url} itemProp="sameAs">{content}</a>;
        }

        return content;
    }

    return (<>
        {as.map((a, ix) => (
            <React.Fragment key={ix}>
                {(ix > 0) && ((ix === as.length - 1) ? (`${ifSet(as.length > 2, ',')} and `) : ", ")}
                <span itemScope itemType="http://schema.org/Person" itemProp={itemprop} lang={a.lang} className="noun">
                    {hiddenName(a)}
                    {surroundUrl(
                        (reverseFirst && ix === 0)
                            ? (
                                <>
                                    {a.family && <><Isolated>{renderFamily(a, ix)}</Isolated>, </>}
                                    <Isolated>{renderGiven(a, ix)}</Isolated>
                                </>
                            )
                            : (
                                <Isolated>
                                    {reverseName(a)
                                        ? <>{a.family && <>{renderFamily(a, ix)}{isLatn(a) ? ' ' : ''}</>}{renderGiven(a, ix)}</>
                                        : <>{renderGiven(a, ix)} {a.family && renderFamily(a, ix)}</>
                                    }
                                </Isolated>
                            )
                        , a.url)}
                    {altName(a)}
                </span>
            </React.Fragment>
        ))}
    </>);
};

function renderISBN(reference: Reference): React.JSX.Element | null {
    const isbn = 'ISBN' in reference ? reference.ISBN : undefined;
    if (!isbn) {
        return null;
    }

    const parsed = ISBN.audit(isbn);
    if (!parsed.validIsbn) {
        console.error(parsed);
        throw new Error("Invalid ISBN: " + isbn);
    }

    const formattedISBN = ISBN.hyphenate(isbn.toString());
    return <><abbr className="initialism">ISBN</abbr>: <a href={`https://www.worldcat.org/isbn/${formattedISBN}`}><span itemProp="isbn">{formattedISBN}</span></a>. </>;
};

function renderDate(reference: Reference): React.JSX.Element {
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
        const circa = (typeof issued !== 'number' && issued.circa) && <><abbr title="circa">c.</abbr> </>;
        const oldStyle = (typeof issued !== 'number' && issued.OS) && <> [<abbr title="old-style">OS</abbr>]</>;

        return (
            <>
                {'('}
                <time itemProp="datePublished" dateTime={toIsoDate(issued)}>
                    {circa}
                    {year}
                </time>
                {oldStyle}
                {original}
                {'). '}
            </>
        );
    }

    // patents might only have been filed
    if ('filed' in reference) {
        const { filed } = reference;
        const year = typeof filed === 'number' ? filed : filed.year;
        return <>(<time itemProp="datePublished" dateTime={toIsoDate(filed)}>{year}</time>). </>;
    }

    return <>(n.d.). </>;
}

function toIsoDate(ymd: Date): string {
    // TODO: this should use ymd.OS to convert to Gregorian dates

    if (typeof ymd == "number") {
        return ymd.toString();
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

function lstrValue(l: LStr): string {
    if (typeof l === 'string') {
        return l;
    }

    return l.value;
}

function renderPublisher(reference: { publisher?: LStr, ['publisher-place']?: string }): React.JSX.Element | null {
    let result = null;

    const publisher = 'publisher' in reference ? reference.publisher : undefined;
    if (publisher) {
        result = renderLStr(publisher, 'span', { itemProp: 'name', className: 'noun' }, { itemProp: 'alternateName' });
    }

    // (p) => `<span className="noun" ${asAttr('lang', reference['publisher-lang'])}>${p}</span>${reference['publisher-place'] ? ': ' : (p.endsWith('.') ? ' ' : '. ')}`)

    const publisherPlace = 'publisher-place' in reference ? reference['publisher-place'] : undefined;
    if (publisherPlace) {
        const prefix = result !== null ? ': ' : '';
        result = <>{result}{prefix}<span itemProp="location">{publisherPlace}</span>. </>;
    } else {
        if (publisher && !lstrValue(publisher).endsWith('.')) {
            result = <>{result}. </>;
        }
    }

    return result;
};

function renderPeriodical(id: string, p: Periodical): React.JSX.Element {
    // if date is more specific than a year, show it
    let datePart = null;
    if (typeof p.issued === 'object' && 'month' in p.issued) {
        const date = renderExplicitDate(p.issued, true);
        if (date) {
            datePart = <>, <time itemProp="datePublished" dateTime={toIsoDate(p.issued)}>{date}</time></>;
        }
    }


    if (p.issue && p.volume) {
        const { issue, volume } = p;
        return (<>
            <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
                <link itemProp="publisher" href={`#${id}-publisher`} />
                {renderLStr(p.title, 'cite', { itemProp: 'name' }, { itemProp: 'alternateName' })}
            </span>
            {' '}
            <span itemScope itemType="http://schema.org/PublicationVolume" itemID={`#${id}-volume`}>
                <link itemProp="isPartOf" href={`#${id}-periodical`} />
                <abbr title="volume">vol.</abbr>&nbsp;
                <span itemProp="volumeNumber">{formatNumberString(volume)}</span>
            </span>
            {' '}
            <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationIssue">
                <link itemProp="isPartOf" href={`#${id}-volume`} />
                (<span itemProp="issueNumber">{formatNumberString(issue)}</span>)
                {datePart}
            </span>
        </>);
    }

    if (p.issue) {
        const { issue } = p;
        return (<>
            <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
                <link itemProp="publisher" href={`#${id}-publisher`} />
                {renderLStr(p.title, 'cite', { itemProp: 'name' }, { itemProp: 'alternateName' })}
            </span>
            {' '}
            <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationIssue">
                <link itemProp="isPartOf" href={`#${id}-periodical`} />
                (<span itemProp="issueNumber">{formatNumberString(issue)}</span>)
                {datePart}
            </span>
        </>);
    }

    if (p.volume) {
        const { volume } = p;
        return (<>
            <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
                <link itemProp="publisher" href={`#${id}-publisher`} />
                {renderLStr(p.title, 'cite', { itemProp: 'name' }, { itemProp: 'alternateName' })}
            </span>
            {' '}
            <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationVolume" itemID={`#${id}-volume`}>
                <link itemProp="isPartOf" href={`#${id}-periodical`} />
                <abbr title="volume">vol.</abbr>&nbsp;
                <span itemProp="volumeNumber">{formatNumberString(volume)}</span>
                {datePart}
            </span>
        </>);
    }

    // neither volume nor issue
    return (<>
        <span itemProp="isPartOf" itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
            <link itemProp="publisher" href={`#${id}-publisher`} />
            {renderLStr(p.title, 'cite', { itemProp: 'name' }, { itemProp: 'alternateName' })}
            {datePart}
        </span>
    </>);
}

function renderContainer(reference: BiblioRef): React.JSX.Element | null {
    const { id } = reference;

    switch (reference.type) {
        case 'webpage':
            if ('container-title' in reference && reference['container-title']) {
                return (<>
                    {' '}
                    <span itemScope itemType="http://schema.org/WebSite" itemProp="isPartOf">
                        <i>
                            {renderLStr(reference['container-title'], 'span', { itemProp: 'name' }, { itemProp: 'alternateName' })}
                        </i>
                    </span>
                    {'. '}
                </>);
            }

            return null;

        case 'chapter':
        case 'paper-conference':
            const prefix =
                ('page' in reference && reference.page)
                    ? <>
                        {isNaN(+reference.page) ? "Pages " : "Page "}
                        <span itemProp="pagination">{reference.page.replace('-', '–')}</span>
                        {' in '}
                    </>
                    : <>In </>;

            return <>{prefix}{renderBook(reference.in, 'isPartOf')}</>;

        case 'article-magazine':
        case 'article-newspaper':
        case 'article-journal':
            const pageSuffix =
                ('page' in reference && reference.page)
                    ? <>
                        {': '}
                        {isNaN(+reference.page) ? "pages " : "page "}
                        <span itemProp="pagination">{reference.page.replace('-', '–')}</span>
                        {'. '}
                    </>
                    : <>. </>;

            const editor =
                ('editor' in reference.in && reference.in.editor) &&
                <>Edited by {renderPeople(reference.in.editor, false, false, 'editor')}. </>;

            return (<>
                {renderPeriodical(id, reference.in)}
                {pageSuffix}
                {editor}
                <span itemScope itemType="https://schema.org/Organization" itemID={`#${id}-publisher`}>
                    {renderPublisher(reference.in)}
                </span>
            </>);

        default:
            return null;
    }
}
