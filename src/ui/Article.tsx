import * as React from 'react';
import { Reference, renderReference } from '../References';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Pronunciation } from './Pronunciation';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

type Props = {
  content: ArticleContent,
  infoBox?: React.ReactNode,
  url: string,
}

export type ArticleContentProps = {
  readonly cite: (
    reference: Reference,
    pages?: (number | [number, number])[],
    options?: { inline?: boolean, page?: string }) => React.ReactNode;

  readonly pronounce: (
    pronouncer: string,
    word: string,
    lang: string,
    file: string,
    noun?: boolean,
  ) => React.ReactNode;
}

export type ArticleContent = Readonly<{
  title: string,
  titleLang?: string,
  draft?: boolean,
  import: React.LazyExoticComponent<React.FC<ArticleContentProps>>
}>

// For a Forvo pronunciation
type Pronunciation = { pronouncer: string, word: string, lang: string }

export const Article: React.FC<Props> = ({ url, content, infoBox }) => {

  const [state, setState] = React.useState({ url, cited: [] as Reference[], pronunciation: [] as Pronunciation[] });

  // switched page, need to re-render
  if (url !== state.url) {
    setState({ url, cited: [], pronunciation: [] });
  }

  const pronunciation = (pronouncer: string, word: string, lang: string, file: string, noun: boolean = false) => {
    let index = state.pronunciation.findIndex(x => x.word === word);
    if (index === -1) {
      index = state.pronunciation.length;

      setState(s => {
        if (s.pronunciation.find(x => x.word === word)) return s;
        return { ...s, pronunciation: [...s.pronunciation, { word, pronouncer, lang }] };
      })
    }

    return <Pronunciation src={file} lang={lang} noun={noun}>{word}</Pronunciation>;
  };

  const cite = (ref: Reference, pages?: (number | [number, number])[], options?: { inline?: boolean, page?: string }) => {

    let index = state.cited.findIndex(x => x === ref);
    if (index === -1) {
      index = state.cited.length;
      // this will trigger re-render but next time around we won't
      setState(s => {
        // need to re-check so it doesn't get added twice - 
        // this can be called "in parallel"
        if (s.cited.find(x => x === ref)) return s;
        return { ...s, cited: [...s.cited, ref] };
      });
    }

    const suffix =
      pages === undefined
        ? null
        : typeof pages === 'number'
          ? pages
          : pages.map(p => typeof p === 'number' ? p : `${p[0]}–${p[1]}`).join(', ');

    const pageType = options && options.page ? options.page + ' ' : '';

    if (options && options.inline) {
      switch (ref.type) {
        case 'book':
          return <><a href={`#ref-${ref.id}`}><cite dangerouslySetInnerHTML={{__html:ref.title}} /></a>{suffix && <> ({pageType}{suffix})</>}</>;
        case 'article-journal':
          return <><a href={`#ref-${ref.id}`}>{ref.author && ref.author[0].family}</a> ({ref.issued && ref.issued.year}{suffix && <>, {pageType}{suffix}</>})</>;
        default:
          return <span className="citation">[<a href={`#ref-${ref.id}`}>{index + 1}</a>]{suffix && <> ({pageType}{suffix})</>}</span>
      }
    } else {
      return <sup className="citation">[<a href={`#ref-${ref.id}`}>{index + 1}</a>{suffix && <>: {pageType}{suffix}</>}]</sup>;
    }
  };

  const groupedProns = new Map<string, [string, string][]>();
  for (const { word, pronouncer, lang } of state.pronunciation) {
    let current = groupedProns.get(pronouncer);
    if (current === undefined) {
      current = [];
      groupedProns.set(pronouncer, current);
    }

    current.push([word, lang]);
    current.sort();
  }

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
          <section itemProp="articleBody">
            <React.Suspense fallback={<p>Loading content...</p>}>
              <Import cite={cite} pronounce={pronunciation} />
            </React.Suspense>
          </section>
          {state.cited.length > 0 &&
            <section id="references">
              <h2>References</h2>
              <ol className="reference-list">
                {state.cited.map((c, i) => <li key={i}>{renderReference(c)}</li>)}
              </ol>
            </section>
          }
          {groupedProns.size > 0 &&
            <section id="credits-pronunciation">
              <h2>Audio Credits</h2>
              <p>All audio is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC-BY-NC-SA 3.0</a>. Pronunciations are by:</p>
              <ul>
                {Array
                  .from(groupedProns, ([author, words]) => ({ author, words }))
                  .sort((x, y) => y.words.length - x.words.length)
                  .map(({ author, words }, i) =>
                    <li key={i}>{words.map(([word, lang], i) => <React.Fragment key={i}>{i > 0 && ", "}<span lang={lang}>{word}</span></React.Fragment>)} © <a href={`https://forvo.com/user/${author}/`}>{author}</a>.</li>
                  )}
              </ul>
            </section>
          }
        </Col>
        <Col lg="1" style={{ zIndex: -1 }} />
      </Row>
    </article>
  );
}
