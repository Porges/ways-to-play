import * as React from 'react';
import { Link } from 'react-router-dom';

import { GameId, Games } from './Meta';

export const GameRef: React.FC<{id: GameId}> = ({id}) => {
    const game = Games[id];
    return <Link to={`/games/${id}/`} lang={game.titleLang} className="game-title">{game.title}</Link>;
};