import * as React from 'react';

import * as bibliography from '../bibliography.json';

type Props = {
    id: string
    page?: number | [number, number]
    inline?: boolean
}

export const Citation: React.FC<Props> = ({id, page}) => {
    const reference = bibliography.references.find(x => x.id === id);
    if (!reference) {
        throw new Error(`Undefined reference: ${id}`);
    }

    const pages = typeof page === 'undefined' ? null : typeof page === 'number' ? `, ${page}` : `, ${page[0]}–${page[1]}`;
    return <span className="citation"><sup>({reference.id}{pages})</sup></span>;
};