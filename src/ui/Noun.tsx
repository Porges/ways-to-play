import * as React from 'react';

// really ProperNoun
export const Noun: React.FC<React.HTMLAttributes<HTMLSpanElement>> =
    ({children}) => <span className="proper-noun">{children}</span>;