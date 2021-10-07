import * as React from 'react';

import { ArticleContent } from '../../ui';

import imgBalikSatu from './BalikSatu/shutterstock_1900515673.jpg';

export const Equipment = {
  "ceki": "Ceki cards",
  "dice": "Dice",
} as const;

export type GameMeta = Readonly<{
  players: readonly number[],
  equipment?: keyof typeof Equipment,
} & ArticleContent>

const games = {
  'balik-satu': {
    title: "Balik Satu",
    titleLang: "ms",
    players: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    equipment: "ceki" as const,
    import: React.lazy(() => import('./BalikSatu/BalikSatu')),
    hero: {
      img: imgBalikSatu,
      source: {
        license: "stock-image",
        organization: { orgName: "Shutterstock.com" },
        author: "khooiay",
        identifier: "1900515673",
        originalUrl: "https://www.shutterstock.com/image-photo/rows-antique-nyonya-tiles-pink-flowers-1900515673"
      } as const,
    },
  },
  'cholek-tiga': {
    title: "Cholek Tiga",
    titleLang: "ms",
    players: [2, 3],
    equipment: "ceki" as const,
    import: React.lazy(() => import(/* webpackChunkName: 'cholek-tiga' */ './CholekTiga/CholekTiga')),
    hero: {
      img: imgBalikSatu,
      source: {
        license: "stock-image",
        organization: { orgName: "Shutterstock.com" },
        author: "khooiay",
        identifier: "1900515673",
        originalUrl: "https://www.shutterstock.com/image-photo/rows-antique-nyonya-tiles-pink-flowers-1900515673"
      } as const,
    },
  },
  'daldos': {
    title: "Daldøs",
    titleLang: "",
    players: [2],
    import: React.lazy(() => import('./Daldos/Daldos')),
    draft: true,
  },
  'chuck-a-luck': {
    title: "Chuck-A-Luck",
    equipment: "dice" as const,
    players: [],
    import: React.lazy(() => import('./ChuckALuck/ChuckALuck')),
  },
  'crown-and-anchor': {
    title: "Crown & Anchor",
    equipment: "dice" as const,
    players: [],
    import: React.lazy(() => import('./CrownAndAnchor/CrownAndAnchor')),
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
    title: "Xiàngqí",
    titleLang: "zh-Latn",
    draft: true,
    players: [2],
    import: React.lazy(() => import(/* webpackChunkName: 'xiangqi' */ './Xiangqi/Xiangqi'))
  },
  'tribord-et-babord': {
    title: "Tribord et Bâbord",
    titleLang: "fr",
    players: [2],
    import: React.lazy(() => import('./TribordEtBabord/TribordEtBabord'))
  }
};

export type GameId = keyof typeof games
type GamesType = {
  [key in GameId]: GameMeta
}
export const Games: GamesType = games

const hasKey = <T extends Object>(o: T, key: keyof any): key is keyof T => o.hasOwnProperty(key);

export const getGameMeta = (name: keyof any): GameMeta | undefined => {

  if (hasKey(games, name)) {
    return games[name];
  }

  return undefined;
}
