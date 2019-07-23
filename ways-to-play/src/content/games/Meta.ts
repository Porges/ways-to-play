import * as React from 'react';

import { GameProps } from './Game';

export type GameMeta = Readonly<{
    name: string,
    nameLang?: string,
    players: readonly number[],
    draft?: boolean,
    import: React.LazyExoticComponent<React.FC<GameProps>>
}>

const games = {
    morabaraba: {
        name: "Morabaraba",
        nameLang: "st",
        players: [2],
        import: React.lazy(() => import(/* webpackChunkName: 'morabaraba' */ './Morabaraba'))
    }, 
    camelot: {
        name: "Camelot family",
        players: [2, 4],
        import: React.lazy(() => import(/* webpackChunkName: 'camelot' */ './Camelot'))
    },
    'leap-frog': {
        name: "Leap-Frog",
        players: [2],
        import: React.lazy(() => import(/* webpackChunkName: 'leap-frog' */ './LeapFrog'))
    },
    'take-it-away': {
        name: "Take It Away",
        players: [2,3,4],
        import: React.lazy(() => import(/* webpackChunkName: 'take-it-away' */ './TakeItAway'))
    },
    konane: {
        name: "Kōnane",
        nameLang: "haw",
        players: [2],
        import: React.lazy(() => import(/* webpackChunkName: 'konane' */ './Konane'))
    }
};

export type GameId = keyof typeof games
type GamesType = {
    [key in GameId]: GameMeta
}
export const Games: GamesType = games

const hasKey = <T extends Object>(o : T, key: keyof any): key is keyof T => o.hasOwnProperty(key);

export const getGameMeta = (name: keyof any): GameMeta|undefined => {
    
    if (hasKey(games, name)) {
        return games[name];
    }

    return undefined;
}

