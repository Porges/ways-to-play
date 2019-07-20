import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { renderReference } from '../../References';

import * as Meta from './Meta';

const renderGames = () => {
    return (
        <ul>
        { Object.entries(Meta.Games).sort().map(([path, game]) =>
             <li key={path}><Link to={`/games/${path}`} lang={game.nameLang}>{game.name}</Link></li>) }
        </ul>
    );
}

const GameArticle : React.FC<RouteComponentProps<{gameId: string}>> = ({match}) => {

    const [cited, setCited] = React.useState([] as string[]);

    const game: Meta.GameMeta | undefined = Meta.getGameMeta(match.params.gameId);
    if (!game) {
        return null;
    }

    const cite = (id: string, ...pages: (number|[number, number])[]) => {

        let index = cited.findIndex(x => x === id);
        if (index === -1) {
            index = cited.length;
            // this will trigger re-render but next time around we won't
            setCited(s => {
                // need to re-check so it doesn't get added twice - 
                // this can be called "in parallel"
                if (s.find(x => x === id)) return s;
                return [...s, id];
            });
        }

        const suffix = pages.map(p => typeof p === 'number' ? `, ${p}` : `, ${p[0]}–${p[1]}`).join();
        return <sup className="citation">[<a href={`#ref-${id}`}>{index+1}</a>{suffix}]</sup>;
    };

    
    const Import = game.import;
    return (
        <article itemScope itemType="http://schema.org/Article" itemProp="mainEntity" itemRef="author">
            <Helmet>
                <body itemScope itemType="http://schema.org/WebPage" />
            </Helmet>
            <Row>
                <Col>
                    <h1 itemProp="headline" lang={game.nameLang}>
                        <Link itemProp="mainEntityOfPage" to={match.url}>{game.name}</Link>
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    { renderInfoBox(game) }
                </Col>
                <Col lg="7">
                    <section itemProp="articleBody">
                        <React.Suspense fallback={<p>Loading content...</p>}>
                            <Import cite={cite} />
                        </React.Suspense>
                    </section>
                    <section className="text-left">
                        <h2>References</h2>
                        <ol className="reference-list">
                        { cited.map(c => <li key={c}>{renderReference(c)}</li>) }
                        </ol>
                    </section>
                </Col>
                <Col>
                </Col>
            </Row>
        </article>
    );
}

const renderInfoBox = (game: Meta.GameMeta) => {
    return (
        <section className="infobox">
            <h4>Game info</h4>
            <div className="info">
                <span itemProp="about" itemScope itemType="http://schema.org/Game">
                    <meta itemProp="name" lang={game.nameLang} content={game.name} />
                    <span
                        itemScope
                        itemProp="numberOfPlayers"
                        itemType="http://schema.org/QuantitativeValue">
                        <span itemProp="unitText">Players</span>: <span itemProp="value"><a href="/tags/players/2.html">2</a></span>
                    </span>
                    <br />
                    <span
                        itemScope
                        itemProp="gameLocation"
                        itemType="http://schema.org/Country">
                        Country:
                        <span itemProp="name"><a href="/tags/country/South Africa.html">South Africa</a></span>
                    </span>
                    <br />
                </span>
                <h4>Categories</h4>
                <ul className="tags" itemProp="keywords">
                    <li><a href="/tags/perfect-information.html" rel="tag">perfect-information</a></li>
                    <li><a href="/tags/boards/large%20mill.html" rel="tag">boards/large mill</a></li>
                </ul>
            </div>
        </section>
    );
}

export const Games: React.FC<RouteComponentProps> = ({match}) => {
    return (
        <Switch>
            <Route path={match.path} exact render={renderGames} />
            <Route path={`${match.path}:gameId`} component={GameArticle} />
        </Switch>
    );
};
