import * as React from 'react';

import { references } from  './bibliography';

export * from './bibliography';

const getReference = (ix: number) => references[ix];
const getReferenceId = (ix: number) => references[ix].id;
const getReferenceType = (ix: number) => references[ix].type;

type Reference = ReturnType<typeof getReference>
type ReferenceType = ReturnType<typeof getReferenceType>
export type ReferenceId = ReturnType<typeof getReferenceId>

type Author = { readonly family?: string, readonly given: (readonly string[] | string) }

export const renderReference = (id: string) => {
    const reference  = references.find(ref => ref.id === id);
    if (!reference) {
        throw new Error(`Undefined reference: ${id}`)
    }

    return renderActualReference(reference);
}

const getItemType = (type: ReferenceType) => {
    switch (type) {
        case 'article-journal': return 'http://schema.org/ScholarlyArticle';
        case 'book': return 'http://schema.org/Book';
        case 'thesis': return 'http://schema.org/Thesis';
        case 'webpage': return 'http://schema.org/WebPage';
        case 'paper-conference': return 'http://schema.org/ScholarlyArticle';
        case 'article': return 'http://schema.org/Article';
        case 'manuscript': return 'http://schema.org/Article'; //TODO
        case 'pamphlet': return 'http://schema.org/Article'; //TODO
        case 'article-newspaper': return 'http://schema.org/Article'; //TODO
        case 'article-magazine': return 'http://schema.org/Article'; //TODO
        case 'chapter': return 'http://schema.org/Article'; //TODO
        default: 
            const r: never = type;
            return r; // make sure all cases handled
    }
}

const renderAuthors = (reference: Reference) => {
    if ('author' in reference) {
        return <>{renderPeople(reference.author, true, true, 'author')} </>;
    } else if ('publisher' in reference) {
        return <><span itemScope itemType="http://schema.org/Organization" itemProp="author"><span itemProp="name">{reference.publisher}</span></span>. </>;
    } else {
        return 'TODO';
    }
}

const renderTitle = (reference: Reference) => {
    const html = {__html: reference.title};

    const linked =
        'URL' in reference
        ? <a itemProp="url" href={reference.URL} dangerouslySetInnerHTML={html} />
        : <span dangerouslySetInnerHTML={html} />;

    return reference.type === 'book'
        ? <><cite itemProp="name">{linked}</cite>. </>
        : <><span itemProp="name headline">‘{linked}’</span>. </>;
}

const renderDate = (reference: Reference) => {

    if ('issued' in reference) {
        const original =
            'original-date' in reference
            ? <>({reference['original-date'].year}) </>
            : null;

        const { issued } = reference;

        let monthDay = 
            'day' in issued
            ? `-${issued.month}-${issued.day}`
            : 'month' in issued 
                ? `-${issued.month}`
                : '';

        return <>{original}<time itemProp="datePublished" dateTime={`${issued.year}${monthDay}`}>{issued.year}</time>. </>;
    }

    return 'n.d. ';
}

const renderPublisher = (reference: Reference) => (<>
        {'publisher-place' in reference && (reference['publisher-place'] + ': ') }
        {'publisher' in reference && (reference.publisher + (reference.publisher.endsWith('.') ? ' ' : '. ')) }
    </>);

const renderISBN = (reference: Reference) => (
    'ISBN' in reference &&
     <><abbr className="initialism">ISBN</abbr>: <a itemProp="isbn" href={`https://www.worldcat.org/isbn/${reference.ISBN}`}>{reference.ISBN}</a>. </>
);

const renderPeople = (as: readonly Author[], reverseFirst: boolean, period: boolean, itemProp: string) => {
    const renderFirst = (a: Author, ix: number) => a.family && <><span itemProp="familyName">{a.family}</span>{ period && ix > 0 && ix === (as.length-1) && (a.family.endsWith('.') || '.') }</>;
    const renderLast = (a: Author, ix: number) => 
            ( typeof a.given === 'string'
                ? <><span itemProp="givenName">{a.given}</span>{ period && reverseFirst && ix === 0 && ix === (as.length-1) && (a.given.endsWith('.') || '.') }</> 
                : <><span itemProp="givenName">{a.given[0]}</span>
                    { (a.given.length > 1) && <> <span itemProp="additionalName">{a.given.slice(1).join(' ')}</span></> }
                    { period && reverseFirst && ix === 0 && ix === (as.length-1) && (a.given[a.given.length-1].endsWith('.') || '.') }
                    </> );

    return as.map((a, ix) => (
        <React.Fragment key={ix}>
            { ix > 0 && (ix === as.length - 1 ? <>{(as.length > 2) && ','} and </> : ", ") }
            <span itemScope itemType="http://schema.org/Person" itemProp={itemProp}>
                { reverseFirst && ix === 0 
                  ? <>{renderFirst(a, ix)}, {renderLast(a, ix)}</>
                  : <>{renderLast(a, ix)} {renderFirst(a, ix)}</> }
            </span>
        </React.Fragment>))
};

const months = 
    [ "January"
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
    ] as const;

const renderContainer = (reference: Reference) => {

    if (!('container-title' in reference)) {
        return null;
    }

    const containerTitle = reference['container-title'];
    const { id } = reference;

    const pageSuffix = 
        'page' in reference
        ? `: ${reference.page}. `.replace('-', '–') // promote hyphen to en-dash
        : '. ';

    switch (reference.type) {
        case 'webpage':
            return (<>
                {' '}
                <span itemScope itemType="http://schema.org/WebSite" itemProp="isPartOf">
                    <span itemProp="name">{containerTitle}</span>
                </span>
            </>);

        case 'chapter':
        case 'paper-conference':
            return (<>
                {' '}
                In <i>{containerTitle}</i>
                { 'editor' in reference && <>, edited by {renderPeople(reference.editor, false, false, 'editor')}</> }
                {pageSuffix}
            </>);

        case 'article-magazine':
        case 'article-newspaper':
            const { issued } = reference; 
            return <><cite>{containerTitle}</cite>, {months[issued.month-1]}{'day' in issued && <> {issued.day}</>}, {issued.year}. </>;

        case 'article-journal':
            if ('issue' in reference && 'volume' in reference) {
                const { issue, volume } = reference;
                return (<>
                    <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
                        <cite itemProp="name">{containerTitle}</cite>
                    </span>
                    {' '}
                    <span itemScope itemType="http://schema.org/PublicationVolume" itemID={`#${id}-volume`}>
                        <link itemProp="isPartOf" href={`#${id}-periodical`}/>
                        <span itemProp="volumeNumber">{volume}</span>
                    </span>
                    {' '}
                    <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationIssue">
                        <link itemProp="isPartOf" href={`#${id}-volume`} />
                        (<span itemProp="issueNumber">{issue}</span>)
                    </span> 
                    {pageSuffix}
                    </>);
            }

            if ('issue' in reference) {
                const { issue } = reference;
                return (<>
                    <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
                        <cite itemProp="name">{containerTitle}</cite>
                    </span>
                    {' '}
                    <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationIssue">
                        <link itemProp="isPartOf" href={`#${id}-periodical`} />
                        (<span itemProp="issueNumber">{issue}</span>)
                    </span>
                    {pageSuffix}
                    </>);
            }

            if ('volume' in reference) {
                const { volume } = reference;
                return (<>
                    <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
                        <cite itemProp="name">{containerTitle}</cite>
                    </span>
                    {' '}
                    <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationVolume">
                        <link itemProp="isPartOf" href={`#${id}-periodical`}/>
                        <span itemProp="volumeNumber">{volume}</span>
                    </span>
                    {pageSuffix}
                    </>);
            }

    }
}

export const renderActualReference = (reference: Reference) => {


    const { id, type } = reference;
    return (
        <span itemScope itemType={getItemType(type)} id={`ref-${id}`} itemProp="citation">
            { renderAuthors(reference) }
            { renderDate(reference) }
            { renderTitle(reference) }
            { renderContainer(reference) }
            { renderPublisher(reference) }
            { renderISBN(reference) }
            {/* 
            { renderContainer(reference) }
            { page && <>: <span itemProp="pagination">{page}</span>.</> }
            { genre && <> <span itemProp="inSupportOf">{genre}</span>, </>}
            { publisherPlace && ` ${publisherPlace}:` }{ publisher && ` ${publisher}.` }
            { ISSN && <> <abbr className="initialism">ISSN</abbr>: <a href={`https://www.worldcat.org/issn/${ISSN}`}>{ISSN}</a>.</> } */}
        </span>
    );
}
