import * as React from 'react';

export type License
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
    license: License
    version?: Version
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const altText = (input: string) => {
    switch (input) {
        case "cc0":
            return "Public Domain";
        case "cc":
            return "Creative Commons ";
        case "by":
            return "Attribution ";
        case "nc":
            return "Non-Commercial ";
        case "nd":
            return "No Derivatives ";
        case "sa":
            return "Share-Alike ";
    }
}

export const Licence: React.FC<Props> = (props: Props) => {

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

    const images =
            license === "cc0"
            ? ["publicdomain"]
            : license.split('-');

    return (
        <a
            itemProp="license"
            href={href}
            {...htmlAttributes}>
        { images.map(img => <img key={img} src={`/images/${img}.svg`} alt={altText(img)} />) }
        </a>
    );

};