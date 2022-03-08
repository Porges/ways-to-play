import * as React from 'react';

import { ArticleContent } from '../../ui';

import imgBalikSatu from './BalikSatu/';

export const Equipment = {
  "ceki": "Ceki cards",
  "dice": "Dice",
} as const;

export type GameMeta = Readonly<{
  players: readonly number[] | 'any',
  equipment?: keyof typeof Equipment,
} & ArticleContent>

const games = {
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
    players: 'any' as const,
    import: React.lazy(() => import('./CrownAndAnchor/CrownAndAnchor')),
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
  'eight-faces': {
    title: "Eight Faces",
    players: 'any' as const,
    import: React.lazy(() => import('./PekBin/PekBin')),
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
    players: [2],
    import: React.lazy(() => import(/* webpackChunkName: 'tic-tac-toe' */ './TicTacToe'))
  },
  'teeko': {
    title: "Teeko",
    players: [2],
    import: React.lazy(() => import('./Teeko/Teeko')),
  },
  'three-mens-morris': {
    title: "Three Men’s Morris",
    draft: true,
    players: [2],
    import: React.lazy(() => import('./ThreeMensMorris/ThreeMensMorris')),
  },
};
