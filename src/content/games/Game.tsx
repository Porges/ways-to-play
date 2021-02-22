import * as React from 'react';
import { Link } from 'react-router-dom';

import { GameId, Games } from './Meta';

export const GameRef: React.FC<{id: GameId, fragment?: string, children?: string}> = ({id, fragment, children}) => {
    const game = Games[id];
    const title = children ?? game.title;
    return <Link to={`/games/${id}/${fragment ?? ''}`} lang={game.titleLang} className="game-title">{title}</Link>;
};
