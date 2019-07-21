import * as React from 'react';

export type LicenseName
    = "cc0"
    | "cc-by"
    | "cc-by-sa"
    | "cc-by-nd"
    | "cc-by-nc"
    | "cc-by-nc-sa"
    | "cc-by-nc-nd"
    | "instagram"

export type Version = "2.0" | "4.0"

type Props = {
    license: LicenseName
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
    }
}

export const License: React.FC<Props> = (props: Props) => {

    const
        { license
        , version
        , ...htmlAttributes } = props;

    if (license === 'instagram') {
        return <span>Instagram</span>;
    }

    const href =
            license === "cc0"
            ? "https://creativecommons.org/publicdomain/zero/1.0/"
            : `https://creativecommons.org/licenses/${license.substr(3)}/${version}`;

    const parts = license.split('-');

    const title =
        license === 'cc0'
        ? "Public Domain"
        : `Licensed under the ${parts.map(altText).join(' ')} license, ${version}`

    return (
        <a
            itemProp="license"
            href={href}
            title={title}
            {...htmlAttributes}>
            { parts.map(charFor).join('\u{200a}') }
        </a>
    );
};