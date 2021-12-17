import * as React from 'react';

import svgGPL from './gpl.svg';

export type LicenseName
    = "cc0"
    | "cc-by"
    | "cc-by-sa"
    | "cc-by-nd"
    | "cc-by-nc"
    | "cc-by-nc-sa"
    | "cc-by-nc-nd"
    | "gpl"
    | "with-permission"
    | "us-fair-use"

export type Version = "2.0" | "2.5" | "3.0" | "4.0"

type Props = {
    license: LicenseName
    leading: boolean
    version?: Version
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const charFor = (input: string) => {
    switch (input) {
        case 'cc0': return '\u{1f16e}';
        case 'cc': return '\u{1f16d}';
        case 'by': return '\u{1f16f}';
        case 'nc': return '\u{1f10f}';
        case 'sa': return '\u{1f10e}';
        case 'nd': return '⊜';
        default: return null;
    }
}

const altText = (input: string) => {
    switch (input) {
        case "cc0":
            return "Public Domain";
        case "cc":
            return "Creative Commons";
        case "by":
            return "Attribution";
        case "nc":
            return "Non-Commercial";
        case "nd":
            return "No Derivatives";
        case "sa":
            return "Share-Alike";
        case "gpl":
            return "GPL";
    }
}

export const License: React.FC<Props> = (props: Props) => {

    const
        { license
        , leading
        , version
        , ...htmlAttributes } = props;

    if (license === 'with-permission') {
        return <span>{leading && ', '}with permission</span>;
    }

    if (license === 'us-fair-use') {
      return <span>{leading && ', '}under US fair use</span>;
    }

    // license == gpl | creative-common

    const href =
        license === 'gpl'
            ? "https://www.gnu.org/licenses/gpl.html" 
            : license === "cc0"
                ? "https://creativecommons.org/publicdomain/mark/1.0/"
                : `https://creativecommons.org/licenses/${license.substr(3)}/${version}`;

    const parts = license.split('-');

    const title =
        license === 'cc0'
        ? "Public Domain"
        : `Licensed under the ${parts.map(altText).join(' ')} license, ${version}`

    return (<>
        {leading && ' '}
        <a
            itemProp="license"
            href={href}
            title={title}
            {...htmlAttributes}>
            {
                license === 'gpl'
                ? <img src={svgGPL} alt={`GPLv${version}`} width={14} height={14} />
                : parts.map(charFor).join('\u{200a}')
            }
        </a>
    </>);
};
