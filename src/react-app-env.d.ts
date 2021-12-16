// copied from https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/lib/react-app.d.ts
// and modified with rseponsive-loader types for jpe?g, png.

/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'isbn3' {
    type ParseResult = {
        validIsbn: boolean,
    };

    export default {} as {
        audit: (isbn: string) => ParseResult,
        hyphenate: (isbn: string) => string,
    };
}

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
    }
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

type ResponsiveImageOutput = 
    { src: string
    , srcSet: string
    , placeholder: string
    , images: {path: string, width: number, height: number}[]
    , width: number
    , height: number
    }

declare module '*.jpg' {
    const content: ResponsiveImageOutput
    export default content;
}

declare module '*.jpeg' {
    const content: ResponsiveImageOutput
    export default content;
}

declare module '*.png' {
    const content: ResponsiveImageOutput
    export default content;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.mp3' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    const src: string;
    export default src;
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}
