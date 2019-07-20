import * as React from 'react';
import { Link } from 'react-router-dom';

import { ReferenceId } from '../../References';
import { GameId, Games } from './Meta';

export type GameProps = {
    cite: (id: ReferenceId, ...pages:(number|[number,number])[]) => React.ReactNode
}

export const GameRef: React.FC<{id: GameId}> = ({id}) => {
    const game = Games[id];
    return <Link to={`/games/${id}`} lang={game.nameLang} className="game-title">{game.name}</Link>;
};