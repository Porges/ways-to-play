import * as React from 'react';
import { renderReference } from '../References';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { PronunciationProvider, PronunciationContext, CitationContext, CitationProvider } from 'ui';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
  import: React.LazyExoticComponent<React.FC>,
  hero?: ResponsiveImageOutput,
}>

const ReferenceSummary: React.FC = () => {
  let { references } = React.useContext(CitationContext);
  if (references.length === 0) {
    return null;
  }

  return (
    <Section title="References">
      <ol className="reference-list" type="a">
        {references.map((c, i) => <li key={i}>{renderReference(c)}</li>)}
      </ol>
    </Section>
  );
};

const PronunciationSummary: React.FC = () => {
  let { pronunciations } = React.useContext(PronunciationContext);
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

  const comparer = new Intl.Collator('en');

  return (
    <Section title="Audio Credits">
      <p>All audio is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC-BY-NC-SA 3.0</a>.
       Pronunciations are by:</p>
      <ul>
        {Array
          .from(groupedProns, ([author, words]) => ({ author, words }))
          .sort((x, y) => comparer.compare(x.author, y.author))
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

  const title = (
    <h1 itemProp="headline" lang={content.titleLang}>
      <Link itemProp="mainEntityOfPage" to={url}>{content.title}</Link> {content.draft && <Badge variant="warning">Draft</Badge>}
    </h1>
  );

  const heroStyle: React.CSSProperties = 
    {
      backgroundImage: content.hero && `url('${content.hero.images[content.hero.images.length - 1].path}')`,
    };

  return (<>
    <Helmet>
      <title lang={content.titleLang}>{content.title}</title>
      <body itemScope itemType="http://schema.org/WebPage" />

      {/* OpenGraph stuff */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta lang={content.titleLang} property="og:title" content={content.title} />
      <meta property="og:site_name" content="Ways to Play" />
    </Helmet>
    <article itemScope itemType="http://schema.org/Article" itemProp="mainEntity" itemRef="author-outer">
      <div className={`jumbotron jumbotron-fluid ${content.hero && 'hero'}`} style={heroStyle}>
        <Container>
          <Row>
            <Col lg="1" />
            <Col lg="10">
              { title }
            </Col>
            <Col lg="1" style={{ zIndex: -1 }} />
          </Row>
        </Container>
      </div>
      { /*
            <Row>
                <Col>
                { infoBox }
                </Col>
            </Row>
            */ }
            <Container>
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
                <ReferenceSummary />
                <PronunciationSummary />
              </SectionContext.Provider>
            </CitationProvider>
          </PronunciationProvider>
        </Col>
        <Col lg="1" style={{ zIndex: -1 }} />
      </Row>
      </Container>
    </article>
  </>);
}
