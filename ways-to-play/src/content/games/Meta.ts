import * as React from 'react';

import { GameProps } from './Game';

export type GameMeta = Readonly<{
    name: string,
    nameLang?: string,
    import: React.LazyExoticComponent<React.FC<GameProps>>
}>

const games = {
    morabaraba: {
        name: "Morabaraba",
        nameLang: "st",
        import: React.lazy(() => import('./Morabaraba'))
    }, 
    camelot: {
        name: "Camelot family",
        import: React.lazy(() => import('./Camelot'))
    },
    leapfrog: {
        name: "Leapfrog",
        import: React.lazy(() => import('./LeapFrog'))
    },
    takeItAway: {
        name: "Take It Away",
        import: React.lazy(() => import('./TakeItAway'))
    }
} as const;

export type GameId = keyof typeof games
type GamesType = {
    [key in GameId]: GameMeta
}
export const Games: GamesType = games

const hasKey = <T>(o : T, key: keyof any): key is keyof T => key in o;

export const getGameMeta = (name: string): GameMeta|undefined => {
    if (hasKey(games, name)) {
        return games[name];
    }

    return undefined;
}

