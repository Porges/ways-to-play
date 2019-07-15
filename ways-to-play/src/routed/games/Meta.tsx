import * as React from 'react';

export type GameMeta = Readonly<{
    name: string,
    nameLang?: string,
    import: React.LazyExoticComponent<React.FC>
}>

export const games: { readonly [path: string]: GameMeta } = {
    morabaraba: {
        name: "Morabaraba",
        nameLang: "st",
        import: React.lazy(() => import('./Morabaraba'))
    }
} as const;