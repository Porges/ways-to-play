import * as React from 'react';

export const Footnote: React.FC = ({children}) => {
    return (
        <div className="asided">
            { React.Children.map(
                children,
                (c, i) =>
                    i === 0
                    ? <aside role="note">{c}</aside>
                    : c) }
        </div>
    );
}
