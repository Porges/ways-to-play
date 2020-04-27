import * as React from 'react';
import { Reference, renderReference } from '../References';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Pronunciation } from './Pronunciation';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { SectionContext, Section } from './Section';

type Props = {
  content: ArticleContent,
  infoBox?: React.ReactNode,
  url: string,
}

export type ArticleContent = Readonly<{
  title: string,
  titleLang?: string,
  draft?: boolean,
  import: React.LazyExoticComponent<React.FC>
}>

// For a Forvo pronunciation
type Pronunciation = { pronouncer: string, word: string, lang: string }
const PronunciationContext = React.createContext<{ pronunciations: Pronunciation[], addPronunciation: (p: Pronunciation) => void}>({ pronunciations: [], addPronunciation: () => {} });
const PronunciationProvider: React.FC = ({children}) => {
  const [pronunciations, setPronunciations] = React.useState<Pronunciation[]>([]);
  const addPronunciation = React.useCallback((p: Pronunciation) => {
    setPronunciations(s => {
      if (s.find(x => x.word === p.word)) return s;
      return [...s, p];
    });
  }, []);

  return (
    <PronunciationContext.Provider value={{pronunciations, addPronunciation}}>
      {children}
    </PronunciationContext.Provider>
  );
};

type PronounceProps = Pronunciation & { file: string, noun?: boolean }
export const Pronounce: React.FC<PronounceProps> = ({pronouncer, word, lang, file, noun}) => {
  const { addPronunciation } = React.useContext(PronunciationContext);
  React.useEffect(() => addPronunciation({word, pronouncer, lang}), [word, pronouncer, lang, addPronunciation])
  return <Pronunciation src={file} lang={lang} noun={noun}>{word}</Pronunciation>;
};


// For citations:
const CitationContext = React.createContext<{ references: Reference[], addReference: (ref: Reference) => number}>({ references: [], addReference: () => 0});
const CitationProvider: React.FC = ({children}) => {

  const [references, setReferences] = React.useState<Reference[]>([]);

  const addReference = React.useCallback((ref: Reference) => {
    let index = references.findIndex(x => x === ref);
    if (index === -1) {
      index = references.length;
      // this will trigger re-render but next time around we won't
      setReferences(s => {
        // need to re-check so it doesn't get added twice - 
        // this can be called "in parallel"
        if (s.find(x => x === ref)) return s;
        return [ ...s,  ref];
      });
    }

    return index;
  }, [references]);

  return (
    <CitationContext.Provider value={{references, addReference}}>
      {children}
    </CitationContext.Provider>
  );
}
type CiteProps = {
  r: Reference,
  page?: number | (number | [number, number])[],
  pageType?: string,
  inline?: boolean,
}
export const Cite: React.FC<CiteProps> = ({pageType, page, inline, r}) => {

  const { addReference }  = React.useContext(CitationContext);

  const [index, setIndex] = React.useState(-1);

  React.useEffect(() => setIndex(addReference(r)), [r, addReference]);

  const suffix =
    page === undefined
      ? null
      : typeof page === 'number'
        ? page
        : page.map(p => typeof p === 'number' ? p : `${p[0]}–${p[1]}`).join(', ');

  const pageTypeS = pageType ? pageType + ' ' : '';
  if (inline) {
    switch (r.type) {
      case 'book':
        return <><a href={`#ref-${r.id}`}><cite lang={r["title-lang"]} dangerouslySetInnerHTML={{__html:r.title}} /></a>{suffix && <> ({pageTypeS}{suffix})</>}</>;
      case 'article-journal':
        return <><a href={`#ref-${r.id}`}>{r.author && r.author[0].family}</a> ({r.issued && r.issued.year}{suffix && <>, {pageTypeS}{suffix}</>})</>;
      default:
        return <span className="citation">[<a href={`#ref-${r.id}`}>{index + 1}</a>]{suffix && <> ({pageTypeS}{suffix})</>}</span>
    }
  } else {
    return <sup className="citation">[<a href={`#ref-${r.id}`}>{index + 1}</a>{suffix && <>: {pageTypeS}{suffix}</>}]</sup>;
  }
};


// done with boilerplatey stuff

const ReferenceSummary: React.FC = () => {
  let {references} = React.useContext(CitationContext);
  if (references.length === 0) {
    return null;
  }

  return (
    <Section title="References">
      <ol className="reference-list">
        {references.map((c, i) => <li key={i}>{renderReference(c)}</li>)}
      </ol>
    </Section>
  );
};

const PronunciationSummary: React.FC = () => {
  let {pronunciations} = React.useContext(PronunciationContext);
  if (pronunciations.length === 0) {
    return null;
  }

  const groupedProns = new Map<string, [string, string][]>();
  for (const { word, pronouncer, lang } of pronunciations) {
    let current = groupedProns.get(pronouncer);
    if (current === undefined) {
      current = [];
      groupedProns.set(pronouncer, current);
    }

    current.push([word, lang]);
    current.sort();
  }

  return (
    <Section title="Audio Credits">
      <p>All audio is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC-BY-NC-SA 3.0</a>.
       Pronunciations are by:</p>
      <ul>
        {Array
          .from(groupedProns, ([author, words]) => ({ author, words }))
          .sort((x, y) => y.words.length - x.words.length)
          .map(({ author, words }, i) =>
            <li key={i}>{words.map(([word, lang], i) =>
               <React.Fragment key={i}>{i > 0 && ", "}<span lang={lang}>{word}</span></React.Fragment>)} © <a href={`https://forvo.com/user/${author}/`}>{author}</a>.</li>
          )}
      </ul>
    </Section>
  );
}

export const Article: React.FC<Props> = ({ url, content, infoBox }) => {

  const Import = content.import;
  return (
    <article itemScope itemType="http://schema.org/Article" itemProp="mainEntity" itemRef="author">
      <Helmet>
        <title lang={content.titleLang}>{content.title}</title>
        <body itemScope itemType="http://schema.org/WebPage" />
      </Helmet>
      <Row>
        <Col>
          <h1 itemProp="headline" lang={content.titleLang}>
            <Link itemProp="mainEntityOfPage" to={url}>{content.title}</Link> {content.draft && <Badge variant="warning">Draft</Badge>}
          </h1>
        </Col>
      </Row>
      { /*
            <Row>
                <Col>
                { infoBox }
                </Col>
            </Row>
            */ }
      <Row>
        <Col lg="1" />
        <Col lg="7">
          <PronunciationProvider>
            <CitationProvider>
              <SectionContext.Provider value={2}>
                <section itemProp="articleBody">
                  <React.Suspense fallback={<p>Loading content...</p>}>
                    <Import />
                  </React.Suspense>
                </section>
              </SectionContext.Provider>
              <ReferenceSummary />
            </CitationProvider>
            <PronunciationSummary />
          </PronunciationProvider>
        </Col>
        <Col lg="1" style={{ zIndex: -1 }} />
      </Row>
    </article>
  );
}
