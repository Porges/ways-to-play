import * as React from 'react';
import { Link } from 'react-router-dom';

import { Reference } from '../../References';
import { GameId, Games } from './Meta';

export type GameProps = {
    cite: (ref: Reference, pages?: number|((number|[number,number])[]), inline?: boolean) => React.ReactNode
}

export const GameRef: React.FC<{id: GameId}> = ({id}) => {
    const game = Games[id];
    return <Link to={`/games/${id}`} lang={game.nameLang} className="game-title">{game.name}</Link>;
};