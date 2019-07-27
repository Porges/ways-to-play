import * as React from 'react';
import { Reference, renderReference } from '../References';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

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
        pages?: (number|[number, number]|[number, number, string])[],
        options?: {inline: boolean} ) => React.ReactNode
}

export type ArticleContent = Readonly<{
    title: string,
    titleLang?: string,
    draft?: boolean,
    import: React.LazyExoticComponent<React.FC<ArticleContentProps>>
}>

export const Article : React.FC<Props> = ({url, content, infoBox}) => {

    const [state, setState] = React.useState({ url, cited: [] as Reference[]});

    // scroll to top when navigating to a new game
    React.useEffect(() =>{
        // TODO: a better way to save/restore scroll state
        window.scrollTo(0, 0);
    }, [url]);

    const cite = (ref: Reference, pages?: (number|[number, number]|[number, number, string])[], options?: { inline: boolean }) => {

        let index = state.cited.findIndex(x => x === ref);
        if (index === -1) {
            index = state.cited.length;
            // this will trigger re-render but next time around we won't
            setState(s => {
                // we switched page, need to clear out old ones
                if (url !== s.url) {
                    return { url, cited: [ref] };
                }

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
                : pages.map(p => typeof p === 'number' ? p : `${p.length > 2 ? p[2] : ''}${p[0]}–${p[1]}`).join(', ');

        return options && options.inline 
            ? <span className="citation">[<a href={`#ref-${ref.id}`}>{index+1}</a>]{suffix && <> ({suffix})</>}</span>
            : <sup className="citation">[<a href={`#ref-${ref.id}`}>{index+1}</a>{suffix && <>: {suffix}</>}]</sup>;
    };

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
            <Row>
                <Col lg="3" xl="2">
                    { infoBox }
                </Col>
                <Col lg="8" xl="7">
                    <section itemProp="articleBody">
                        <React.Suspense fallback={<p>Loading content...</p>}>
                            <Import cite={cite} />
                        </React.Suspense>
                    </section>
                    <section className="text-left">
                        <h2>References</h2>
                        <ol className="reference-list">
                        { state.cited.map((c, i) => <li key={i}>{renderReference(c)}</li>) }
                        </ol>
                    </section>
                </Col>
            </Row>
        </article>
    );
}
