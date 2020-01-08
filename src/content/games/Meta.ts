import * as React from 'react';

import { ArticleContent } from '../../ui';

export type GameMeta = Readonly<{
    players: readonly number[],
} & ArticleContent>

const games = {
    kakkuri: {
        title: "Kakkuri",
        titleLang: "ja-Latn",
        players: [2,3,4,5,6,7,8],
        import: React.lazy(() => import(/* webpackChunkName: 'kakkuri' */ './Kakkuri'))

    },
    morabaraba: {
        title: "Morabaraba",
        titleLang: "st",
        players: [2],
        import: React.lazy(() => import(/* webpackChunkName: 'morabaraba' */ './Morabaraba'))
    }, 
    camelot: {
        title: "Camelot family",
        players: [2, 4],
        import: React.lazy(() => import(/* webpackChunkName: 'camelot' */ './Camelot'))
    },
    'leap-frog': {
        title: "Leap-Frog",
        players: [2],
        import: React.lazy(() => import(/* webpackChunkName: 'leap-frog' */ './LeapFrog'))
    },
    'take-it-away': {
        title: "Take It Away",
        players: [2,3,4],
        import: React.lazy(() => import(/* webpackChunkName: 'take-it-away' */ './TakeItAway'))
    },
    konane: {
        title: "Kōnane",
        titleLang: "haw",
        players: [2],
        import: React.lazy(() => import(/* webpackChunkName: 'konane' */ './Konane'))
    },
    'tic-tac-toe': {
      title: "Tic-Tac-Toe",
      draft: true,
      players: [2],
      import: React.lazy(() => import(/* webpackChunkName: 'tic-tac-toe' */ './TicTacToe'))
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
