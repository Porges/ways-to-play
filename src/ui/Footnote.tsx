import * as React from 'react';

export const Footnote: React.FC = ({children}) => {
    return (
        <aside role="note" className="footnote">
            {children}
        </aside>
    );
}
