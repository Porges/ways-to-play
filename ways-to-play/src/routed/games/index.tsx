import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import * as Meta from './Meta';

const renderGames = () => {
    return (
        <ul>
        { Object.entries(Meta.games).sort().map(([path, game]) => <li key={path}><Link to={`/games/${path}`} lang={game.nameLang}>{game.name}</Link></li>) }
        </ul>
    );
}

const renderGame:React.FC<RouteComponentProps<{gameId: string}>> = ({match}) => {
    const game = Meta.games[match.params.gameId];
    if (!game) {
        return null;
    }
    
    const Import = game.import;
    return (
        <article itemScope itemType="http://schema.org/Article" itemProp="mainEntity" itemRef="author">
            <h1 itemProp="headline" lang={game.nameLang}>
                <Link itemProp="mainEntityOfPage" to={match.url}>{game.name}</Link>
            </h1>
            { renderInfoBox(game) }
            <section itemProp="articleBody">
                <React.Suspense fallback={<p>Loading content...</p>}>
                    <Import />
                </React.Suspense>
            </section>
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
            <Route path={`${match.path}:gameId`} component={renderGame} />
        </Switch>
    );
};
