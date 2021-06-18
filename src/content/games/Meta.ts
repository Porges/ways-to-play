import * as React from 'react';

import { ArticleContent } from '../../ui';

export type GameMeta = Readonly<{
    players: readonly number[],
} & ArticleContent>

const games = {
  'balek-satu': {
    title: "Balek Satu",
    titleLang: "ms",
    players: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    import: React.lazy(() => import('./BalekSatu/BalekSatu')),
    draft: true,
  },
  'cholek-tiga': {
    title: "Cholek Tiga",
    titleLang: "ms",
    players: [2, 3],
    import: React.lazy(() => import(/* webpackChunkName: 'cholek-tiga' */ './CholekTiga/CholekTiga')),
    draft: true,
  },
  'gunjin-shoji': {
    title: "Gunjin Shogi",
    titleLang: "ja-Latn",
    players: [2],
    import: React.lazy(() => import(/* webpackChunkName: 'gunjin-shogi' */ './GunjinShogi')),
    draft: true,
  },
  'hachi-hachi': {
    title: "Hachi-Hachi",
    titleLang: "ja-Latn",
    players: [3, 4, 5, 6, 7],
    import: React.lazy(() => import(/* webpackChunkName: 'hachi-hachi' */ './HachiHachi')),
    draft: true
  },
  kakkuri: {
    title: "Kakkuri",
    titleLang: "ja-Latn",
    players: [2, 3, 4, 5, 6, 7, 8],
    import: React.lazy(() => import(/* webpackChunkName: 'kakkuri' */ './Kakkuri'))
  },
  'oicho-kabu': {
    title: "Oicho-Kabu",
    titleLang: "ja-Latn",
    players: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    import: React.lazy(() => import(/* webpackChunkName: 'oicho-kabu' */ './OichoKabu')),
    draft: true
  },
  morabaraba: {
    title: "Morabaraba",
    titleLang: "st",
    players: [2],
    import: React.lazy(() => import(/* webpackChunkName: 'morabaraba' */ './Morabaraba'))
  },
  camelot: {
    title: "The Camelot Family",
    players: [2, 4],
    import: React.lazy(() => import(/* webpackChunkName: 'camelot' */ './Camelot'))
  },
  'leap-frog': {
    title: "Leap-Frog",
    players: [2],
    import: React.lazy(() => import(/* webpackChunkName: 'leap-frog' */ './LeapFrog'))
  },
  'nine-mens-morris': {
    title: "Nine Men’s Morris",
    players: [2],
    draft: true,
    import: React.lazy(() => import(/* webpackChunkName: 'nine-mens-morris' */ './NineMensMorris/NineMensMorris'))
  },
  'take-it-away': {
    title: "Take It Away",
    players: [2, 3, 4],
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
  },
  'xianqi': {
    title: "Xiangqi",
    titleLang: "zh-Latn",
    players: [2],
    import: React.lazy(() => import(/* webpackChunkName: 'xiangqi' */ './Xiangqi/Xiangqi'))
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
