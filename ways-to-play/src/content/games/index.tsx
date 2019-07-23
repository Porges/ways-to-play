import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { renderReference, Reference } from '../../References';

import * as Meta from './Meta';

type GamesListProps = RouteComponentProps<
    {} | { players: string } | { playersMin: string, playersMax: string }>

const GamesList: React.FC<GamesListProps> = ({location, match}) => {

    let title = "";
    let allGames = Object.entries(Meta.Games).sort();

    if ('players' in match.params) {
        const players = parseInt(match.params.players);
        title += `, ${players} player${players > 1 ? 's' : ''}`;
        allGames = allGames.filter(([path, g]) => g.players.includes(players));
    } else if ('playersMin' in match.params) {
        const min = parseInt(match.params.playersMin);
        const max = parseInt(match.params.playersMax);

        title += `, ${min}–${max} players`;
        allGames = allGames.filter(([path, g]) => g.players.some(p => p >= min && p <= max));
    }

    return (<>
        <h1>Games{title}</h1>
        <Row>
        <Col>
            <h3>By number of players</h3>
            <ul>
            { [1, 2, 3, 4].map(p => 
                <li key={p}><Link to={`/games/players=${p}`}>{p} player{p > 1 && 's'}</Link></li>) }
            </ul>
        </Col>
        <Col>
            <h3>By country</h3>
            <ul>
                <li>New Zealand</li>
            </ul>
        </Col>
        </Row>
        <hr/>
        <ul>
        { allGames.map(([path, game]) =>
             <li key={path}><Link to={`/games/${path}`} lang={game.nameLang}>{game.name}</Link></li>) }
        </ul>
    </>);
}

const GameArticle : React.FC<RouteComponentProps<{gameId: string}>> = ({match, history}) => {

    const gameId = match.params.gameId;
    const [state, setState] = React.useState({ gameId, cited: [] as Reference[]});

    // scroll to top when navigating to a new game
    React.useEffect(() =>{
        // TODO: a better way to save/restore scroll state
        window.scrollTo(0, 0);
    }, [gameId]);

    const game: Meta.GameMeta | undefined = Meta.getGameMeta(gameId);
    if (!game) {
        return null;
    }

    const cite = (ref: Reference, pages?: number|((number|[number, number])[]), inline?: boolean) => {

        let index = state.cited.findIndex(x => x === ref);
        if (index === -1) {
            index = state.cited.length;
            // this will trigger re-render but next time around we won't
            setState(s => {
                // we switched page, need to clear out old ones
                if (gameId !== s.gameId) {
                    return { gameId, cited: [ref] };
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
                : pages.map(p => typeof p === 'number' ? p : `${p[0]}–${p[1]}`).join(', ');

        return inline 
            ? <span className="citation">[<a href={`#ref-${ref.id}`}>{index+1}</a>]{suffix && <>, ({suffix})</>}</span>
            : <sup className="citation">[<a href={`#ref-${ref.id}`}>{index+1}</a>{suffix && <>, {suffix}</>}]</sup>;
    };

    const Import = game.import;
    return (
        <article itemScope itemType="http://schema.org/Article" itemProp="mainEntity" itemRef="author">
            <Helmet>
                <title lang={game.nameLang}>{game.name}</title>
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
                <Col lg="3">
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
                        { state.cited.map((c, i) => <li key={i}>{renderReference(c)}</li>) }
                        </ol>
                    </section>
                </Col>
            </Row>
        </article>
    );
}

const renderInfoBox = (game: Meta.GameMeta) => {

    const players = [...game.players].sort();
    const consecutive = players.every((p, i, ps) => i+1 === ps.length || p+1 === ps[i+1]);
    const renderedPlayers =
        players.length === 1
        ? <Link to={`/games/players=${players[0]}`}><span itemProp="value">{players[0]}</span></Link>
        : consecutive
          ? <Link to={`/games/players=${players[0]}-${players[players.length-1]}`}><span itemProp="minValue">{players[0]}</span>–<span itemProp="maxValue">{players[players.length-1]}</span></Link>
          : players.map((p, i) => <React.Fragment key={i}>{i>0 && '/'}<span itemProp="value">{p}</span></React.Fragment>);

    return (
        <section className="infobox">
            <h4>Game info</h4>
            <div className="info">
                <dl itemProp="about" itemScope itemType="http://schema.org/Game" className="row no-gutters">
                    <meta itemProp="name" lang={game.nameLang} content={game.name} />
                    <dt className="col-4 text-right pr-1">Players</dt>
                    <dd className="col-8"
                        itemScope
                        itemProp="numberOfPlayers"
                        itemType="http://schema.org/QuantitativeValue">
                        <meta itemProp="unitText" content="Players" />{renderedPlayers}
                    </dd>
                    {/* <dt className="col-4 text-right pr-1">Country</dt>
                    <dd className="col-8"
                        itemScope
                        itemProp="gameLocation"
                        itemType="http://schema.org/Country">
                        <span itemProp="name"><a href="/tags/country/South Africa.html">South Africa</a></span>
                    </dd> */}
                </dl>
                <h4>Categories</h4>
                <ul className="tags" itemProp="keywords">
                    {/* <li><a href="/tags/perfect-information.html" rel="tag">perfect-information</a></li>
                    <li><a href="/tags/boards/large%20mill.html" rel="tag">boards/large mill</a></li> */}
                </ul>
            </div>
        </section>
    );
}

export const Games: React.FC<RouteComponentProps> = ({match}) => {
    return (
        <Switch>
            <Route path={match.path} exact component={GamesList} />
            <Route path={`${match.path}/players=:players(\\d+)`} component={GamesList} />
            <Route path={`${match.path}/players=:playersMin(\\d+)-:playersMax(\\d+)`} component={GamesList} />
            <Route path={`${match.path}/:gameId`} component={GameArticle} />
        </Switch>
    );
};
