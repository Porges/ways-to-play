import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';

import * as Meta from './Meta';
import { Article } from '../../ui';

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
        {/*
            <h3>By country</h3>
            <ul>
                <li>New Zealand</li>
            </ul>
        */}
        </Col>
        </Row>
        <hr/>
        <ul>
        { allGames.map(([path, game]) =>
            (process.env.NODE_ENV === 'production' && game.draft)
            ? null
            : <li key={path}><Link to={`/games/${path}`} lang={game.titleLang}>{game.title} {game.draft && <Badge variant="warning">Draft</Badge>}</Link></li>) }
        </ul>
    </>);
}

const GameArticle : React.FC<RouteComponentProps<{id: string}>> = ({match, history}) => {

    const gameId = match.params.id;
    const game: Meta.GameMeta | undefined = Meta.getGameMeta(gameId);
    if (!game) {
        return null;
    }

    return <Article url={match.url} content={game} infoBox={renderInfoBox(game)} />;
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
                    <meta itemProp="name" lang={game.titleLang} content={game.title} />
                    <dt className="col-5 text-right pr-1">Players</dt>
                    <dd className="col-7"
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
            <Route path={`${match.path}/:id`} component={GameArticle} />
        </Switch>
    );
};
