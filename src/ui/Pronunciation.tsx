import * as React from 'react'

import * as Server from 'react-dom/server';

type OwnProps = {
    src: string,
    children: string,
    lang?: string,
    noun?: boolean,
}

export const Pronunciation: React.FC<OwnProps> = ({src, lang, children, noun}) => {

    let className = "pronunciation";
    if (noun) {
        className += " proper-noun"
    }

    const result = `<audio src="${src}"></audio><span class="${className}" lang="${lang}" onclick="this.previousSibling.play()">${Server.renderToStaticMarkup(<>{children}</>)}</span>`;

    return <span dangerouslySetInnerHTML={{__html: result}} />;
}