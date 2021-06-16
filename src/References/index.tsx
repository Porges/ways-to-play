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
  volume?: string | number,
  issue?: string | number,
  ['original-date']?: { year: number },
  issued?: { year: number } | { year: number, month: number } | { year: number, month: number, day: number } | { year: number, season: string },
  ['publisher-place']?: string,
  publisher?: string,
  ['publisher-lang']?: string,
  page?: string | number,
}>

const itemTypes: { [key: string]: string } = {
  'article-journal': 'http://schema.org/ScholarlyArticle',
  'book': 'http://schema.org/Book',
  'thesis': 'http://schema.org/Thesis',
  'webpage': 'http://schema.org/WebPage',
  'paper-conference': 'http://schema.org/ScholarlyArticle',
  'article': 'http://schema.org/Article',
  'manuscript': 'http://schema.org/Article', //TODO
  'pamphlet': 'http://schema.org/Article', //TODO
  'article-newspaper': 'http://schema.org/Article', //TODO
  'article-magazine': 'http://schema.org/Article', //TODO
  'chapter': 'http://schema.org/Article', //TODO
};

const renderAuthors = (reference: Reference) => {
  if (reference.author) {
    return <>{renderPeople(reference.author, true, true, 'author')} </>;
  } else if ('publisher' in reference) {
    return (<><span itemScope itemType="http://schema.org/Organization" itemProp="author">
      <span itemProp="name" lang={reference['publisher-lang']}>{reference.publisher}</span></span>. </>);
  } else if ('editor' in reference && reference.editor) {
    return <>{renderPeople(reference.editor, true, true, 'editor')}, (<abbr title="editor">ed.</abbr>) </>;
  } else {
    return "Unknown, ";
  }
}

const renderTitle = (reference: Reference) => {
  const html = { __html: reference.title };

  const lang = reference["title-lang"];

  const linked =
    reference.URL
      ? <a itemProp="url" href={reference.URL} dangerouslySetInnerHTML={html} />
      : <span dangerouslySetInnerHTML={html} />;

  return reference.type === 'book'
    ? <><cite itemProp="name" lang={lang}>{linked}</cite>{reference.volume && <> (volume {reference.volume})</>}. </>
    : <>‘<span itemProp="name headline" lang={lang}>{linked}</span>’. </>;
}

const renderDate = (reference: Reference) => {

  if (reference.issued) {
    const original =
      reference['original-date']
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
  {reference['publisher-place'] && (reference['publisher-place'] + ': ')}
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
          <i><span itemProp="name">{containerTitle}</span></i>.
                </span>
      </>);

    case 'chapter':
    case 'paper-conference':
      return (<>
        {' '}
                In <i>{containerTitle}</i>
        {reference.editor && <>, edited by {renderPeople(reference.editor, false, false, 'editor')}</>}
        {pageSuffix}
      </>);

    case 'article-magazine':
    case 'article-newspaper':
      const { issued } = reference;
      if (!issued || !('month' in issued || 'season' in issued)) throw new Error('Magazine/newspaper citations must have issued date (including month or season)');

      const issue = 'issue' in reference ? <> ({reference.issue})</> : null;
      const volume = 'volume' in reference ? <> {reference.volume}</> : null;

      // TODO: metadata
      if ('month' in issued) {
        return (<>
            <cite itemProp="name">{containerTitle}</cite>{volume}{issue}, {months[issued.month - 1]}{'day' in issued && <> {issued.day}</>}, {issued.year}.{' '}
          </>);
      } else {
        return (<>
              <cite itemProp="name">{containerTitle}</cite>{volume}{issue}, {issued.season}, {issued.year}.{' '} 
          </>);
      }

    case 'article-journal':
      if (reference.issue && reference.volume) {
        const { issue, volume } = reference;
        return (<>
          <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
            <cite itemProp="name">{containerTitle}</cite>
          </span>
          {' '}
          <span itemScope itemType="http://schema.org/PublicationVolume" itemID={`#${id}-volume`}>
            <link itemProp="isPartOf" href={`#${id}-periodical`} />
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

      if (reference.issue) {
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

      if (reference.volume) {
        const { volume } = reference;
        return (<>
          <span itemScope itemType="http://schema.org/Periodical" itemID={`#${id}-periodical`}>
            <cite itemProp="name">{containerTitle}</cite>
          </span>
          {' '}
          <span itemProp="isPartOf" itemScope itemType="http://schema.org/PublicationVolume">
            <link itemProp="isPartOf" href={`#${id}-periodical`} />
            <span itemProp="volumeNumber">{volume}</span>
          </span>
          {pageSuffix}
        </>);
      }

  }
}

export const renderReference = (reference: Reference) => {
  const { id, type } = reference;

  return (
    <p itemScope itemType={itemTypes[type]} id={`ref-${id}`} itemProp="citation">
      {renderAuthors(reference)}
      {renderDate(reference)}
      {renderTitle(reference)}
      {renderContainer(reference)}
      {renderPublisher(reference)}
      {renderISBN(reference)}
    </p>
  );
}
