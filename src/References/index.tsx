import * as React from 'react';

type Author = { readonly family?: string, readonly given: (readonly string[] | string), readonly lang?: string }

export type Reference = Readonly<{
  type: string,
  id: string,
  title: string,
  ['title-lang']?: string,
  author?: readonly Author[],
  editor?: readonly Author[],
  URL?: string,
  ISBN?: string | number,
  ['container-title']?: string,
  ['container-title-lang']?: string,
  volume?: string | number,
  issue?: string | number,
  ['original-date']?: { year: number },
  issued?: { year: number } | { year: number, month: number } | { year: number, month: number, day: number } | { year: number, season: string },
  ['publisher-place']?: string,
  publisher?: string,
  ['publisher-lang']?: string,
  page?: string | number,
  warnings?: string,

  filed?: { year: number, month: number, day: number }, // for patents
  applicationNumber?: string|number,
  patentNumber?: string|number,
}>

const itemTypes: Record<string, string> = {
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

const numberFormatter = new Intl.NumberFormat('en');
function formatNumberString(it : string|number): string {
  if (typeof it === 'number') {
    return numberFormatter.format(it);
  }

  return it;
}

const renderAuthors = (reference: Reference) => {
  if (reference.author) {
    return <>{renderPeople(reference.author, true, false, 'author')} </>;
  } else if ('publisher' in reference) {
    return (<><span itemScope itemType="http://schema.org/Organization" itemProp="author">
      <span itemProp="name" lang={reference['publisher-lang']}>{reference.publisher}</span></span> </>);
  } else if ('editor' in reference && reference.editor) {
    return <>{renderPeople(reference.editor, true, false, 'editor')}, (<abbr title="editor">ed.</abbr>) </>;
  } else {
    return <><i>Anonymous</i> </>;
  }
}

function renderTitle(reference: Reference): JSX.Element {
  const html = { __html: reference.title };

  const lang = reference["title-lang"];

  const linked =
    reference.URL
      ? <a itemProp="url" href={reference.URL} dangerouslySetInnerHTML={html} />
      : <span dangerouslySetInnerHTML={html} />;

  return reference.type === 'book'
    ? <><cite itemProp="name" lang={lang}>{linked}</cite>{reference.volume && <> (volume {formatNumberString(reference.volume)})</>}. </>
    : <>‘<span itemProp="name headline" lang={lang}>{linked}</span>’. </>;
}

const renderDate = (reference: Reference) => {

  if (reference.issued) {
    const original =
      reference['original-date']
        ? <>, originally published {reference['original-date'].year}</>
        : null;

    const { issued } = reference;

    let monthDay =
      'day' in issued
        ? `-${issued.month}-${issued.day}`
        : 'month' in issued
          ? `-${issued.month}`
          : '';

    return <>(<time itemProp="datePublished" dateTime={`${issued.year}${monthDay}`}>{issued.year}</time>{original}). </>;
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

    return <>(<time itemProp="datePublished" dateTime={`${filed.year}${monthDay}`}>{filed.year}</time>). </>;
  }

  return 'n.d. ';
}

const renderPublisher = (reference: Reference) => (<>
  {reference['publisher-place'] && (reference['publisher-place'] + (reference.publisher ? ': ' : '. '))}
  {reference.publisher && <><span lang={reference['publisher-lang']}>{reference.publisher}</span>{reference.publisher.endsWith('.') ? ' ' : '. '}</>}
</>);

const renderISBN = (reference: Reference) => (
  reference.ISBN &&
  <><abbr className="initialism">ISBN</abbr>: <a itemProp="isbn" href={`https://www.worldcat.org/isbn/${reference.ISBN}`}>{reference.ISBN}</a>. </>
);

const renderPeople = (as: readonly Author[], reverseFirst: boolean, period: boolean, itemProp: string) => {
  const renderFamily = (a: Author, ix: number) => a.family && <><span itemProp="familyName">{a.family}</span>{period && ix > 0 && ix === (as.length - 1) && (a.family.endsWith('.') || '.')}</>;
  const renderGiven = (a: Author, ix: number) =>
  (typeof a.given === 'string'
    ? <><span itemProp="givenName">{a.given}</span>{period && reverseFirst && ix === 0 && ix === (as.length - 1) && (a.given.endsWith('.') || '.')}</>
    : <><span itemProp="givenName">{a.given[0]}</span>
      {(a.given.length > 1) && <> <span itemProp="additionalName">{a.given.slice(1).join(' ')}</span></>}
      {period && reverseFirst && ix === 0 && ix === (as.length - 1) && (a.given[a.given.length - 1].endsWith('.') || '.')}
    </>);

  const reverseName = (a: Author) => a.lang === undefined ? false : (a.lang.startsWith('zh') || a.lang.startsWith('ja'));

  const hiddenName = (a: Author) => <meta itemProp="name" content={reverseName(a) ? `${a.family}${a.given}` : `${a.given} ${a.family}`} />

  return as.map((a, ix) => (
    <React.Fragment key={ix}>
      {ix > 0 && (ix === as.length - 1 ? <>{(as.length > 2) && ','} and </> : ", ")}
      <span itemScope itemType="http://schema.org/Person" itemProp={itemProp} lang={a.lang} className="proper-noun">
        {hiddenName(a)}
        {reverseFirst && ix === 0
          ? <>{a.family && <>{renderFamily(a, ix)}, </>}{renderGiven(a, ix)}</>
          : <>{renderGiven(a, ix)}{a.family && <> {renderFamily(a, ix)}</>}</>}
      </span>
    </React.Fragment>))
};

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
  ] as const;

type Date
  = { year: number, month: number, day: number }
  | { year: number, month: number }
  | { year: number, season: string }
  | { year: number };

function renderExplicitDate(date: Date, omitIfJustYear: boolean): JSX.Element | null {
  if ('month' in date) {
    return <>{months[date.month - 1]}{'day' in date && <> {date.day}</>}, {date.year}</>;
  }

  if ('season' in date) {
    return <>{date.season} {date.year}</>;
  }

  if (omitIfJustYear) {
    return null;
  }

  return null
}

const renderContainer = (reference: Reference) => {

  if (!('container-title' in reference)) {
    return null;
  }

  const containerTitle = reference['container-title'];
  const { id } = reference;

  const pageSuffix =
    reference.page !== undefined
      ? `: ${isNaN(+reference.page) ? "pages" : "page"} ${reference.page}. `.replace('-', '–') // promote hyphen to en-dash
      : '. ';

  switch (reference.type) {
    case 'webpage':
      return (<>
        {' '}
        <span itemScope itemType="http://schema.org/WebSite" itemProp="isPartOf">
          <i><span itemProp="name" lang={reference['container-title-lang']}>{containerTitle}</span></i>.
        </span>
      </>);

    case 'chapter':
    case 'paper-conference':
      return (<>
        {' '}
        In <cite lang={reference['container-title-lang']}>{containerTitle}</cite>
        {reference.editor && <>, edited by {renderPeople(reference.editor, false, false, 'editor')}</>}
        {pageSuffix}
      </>);

    case 'article-magazine':
    case 'article-newspaper':
      const { issued } = reference;
      if (!issued) throw new Error('Magazine/newspaper citations must have issued date');

      const issue = reference.issue ? <> ({formatNumberString(reference.issue)})</> : null;
      const volume = reference.volume ? <> <abbr title="volume">vol.</abbr>&nbsp;{formatNumberString(reference.volume)}</> : null;

      const title = <cite itemProp="name" lang={reference['container-title-lang']}>{containerTitle}</cite>;

      // TODO: metadata
      const dateString = renderExplicitDate(issued, true);
      const date = dateString !== null ? <>, {dateString}</> : null;
      return <>{title}{volume}{issue}{date}{pageSuffix}</>;

    case 'article-journal':
      if (reference.issue && reference.volume) {
        const { issue, volume } = reference;
        return (<>
          <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
            <cite itemProp="name" lang={reference['container-title-lang']}>{containerTitle}</cite>
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
          </span>
          {pageSuffix}
        </>);
      }

      if (reference.issue) {
        const { issue } = reference;
        return (<>
          <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
            <cite itemProp="name" lang={reference['container-title-lang']}>{containerTitle}</cite>
          </span>
          {' '}
          <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationIssue">
            <link itemProp="isPartOf" href={`#${id}-periodical`} />
            (<span itemProp="issueNumber">{formatNumberString(issue)}</span>)
          </span>
          {pageSuffix}
        </>);
      }

      if (reference.volume) {
        const { volume } = reference;
        return (<>
          <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
            <cite itemProp="name" lang={reference['container-title-lang']}>{containerTitle}</cite>
          </span>
          {' '}
          <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationVolume">
            <link itemProp="isPartOf" href={`#${id}-periodical`} />
            <abbr title="volume">vol.</abbr>&nbsp;
            <span itemProp="volumeNumber">{formatNumberString(volume)}</span>
          </span>
          {pageSuffix}
        </>);
      }

  }
}

function renderPatentBits(reference: Reference): JSX.Element | null {
  if (reference.type !== 'patent') return null;

  const filed = reference.filed ? renderExplicitDate(reference.filed, false) : null;
  const issued = reference.issued ? renderExplicitDate(reference.issued, false) : null;

  return (<>
    {reference.patentNumber 
      ? <>Patent {formatNumberString(reference.patentNumber)}{reference.applicationNumber && <> (application {formatNumberString(reference.applicationNumber)})</>}.</>
      : reference.applicationNumber && <>Application {formatNumberString(reference.applicationNumber)}.</> }
    {filed && <> Filed {filed}.</>}
    {issued && <> Issued {issued}.</>}
  </>);
}

function renderWarnings(reference: Reference): JSX.Element | null {
  if (!reference.warnings) return null;

  return <span className="reference-warning"><abbr title="warning">⚠</abbr>&nbsp;{reference.warnings}</span>
};

export const renderReference = (reference: Reference) => {
  const { id, type } = reference;

  return (
    <p itemScope itemType={itemTypes[type]} id={`ref-${id}`} itemProp="citation">
      {renderAuthors(reference)}
      {renderDate(reference)}
      {renderTitle(reference)}
      {renderPatentBits(reference)}
      {renderContainer(reference)}
      {renderPublisher(reference)}
      {renderISBN(reference)}
      {renderWarnings(reference)}
    </p>
  );
}
