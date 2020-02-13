import * as React from 'react';

import * as Server from 'react-dom/server';

import slug from 'slug';

type OwnProps = {
    title: React.ReactNode,
    nesting?: number,
};

export const SectionContext = React.createContext(1);

const renderHeader = (nesting: number, node: React.ReactNode, slug: string)  => {
    const inner = <>{node} <a href={'#'+slug} className="permalink">#</a></>
    switch (nesting) {
        case 1: return <h1>{inner}</h1>;
        case 2: return <h2>{inner}</h2>;
        case 3: return <h3>{inner}</h3>;
        case 4: return <h4>{inner}</h4>;
        case 5: return <h5>{inner}</h5>;
        case 6: return <h6>{inner}</h6>;
    }
}

export const Section: React.FC<OwnProps> = ({title, nesting, children}) => {

    const ctx = React.useContext(SectionContext);

    const id = slug(Server.renderToStaticMarkup(<>{title}</>).normalize("NFKD").replace(/<(.*?)>/g, ''));
    
    return (
        <section id={id}>
            {renderHeader(ctx, title, id)}
            <SectionContext.Provider value={ctx + 1}>
                {children}
            </SectionContext.Provider>
        </section>
    );
};
