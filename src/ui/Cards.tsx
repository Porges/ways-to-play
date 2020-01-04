import * as React from 'react';

export const Cards: React.FC<{children: string}> = ({children}) => {

    const inner = children.split(/(?<=[\dAJQK]+)|(?=[\dAJQK]+)/).map((p, i) => {
        switch(p) {
            case 's': return <React.Fragment key={i}>♠</React.Fragment>;
            case 'c': return <React.Fragment key={i}>♣</React.Fragment>;
            case 'h': return <span key={i} className="red">♥</span>;
            case 'd': return <span key={i} className="red">♦</span>;
            default: return <React.Fragment key={i}>{p}</React.Fragment>;
        }
    });

    return <span className="playing-cards">{inner}</span>;
};