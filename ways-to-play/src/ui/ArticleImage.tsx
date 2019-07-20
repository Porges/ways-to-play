import * as React from 'react';
import { Person, Name } from './Person';
import * as L from './License';

import Figure from 'react-bootstrap/Figure'

type SourceInfo = {
    originalUrl: string,
    copyrightYear: number,
    author: Name,
    license: L.LicenseName,
    licenseVersion?: L.Version,
}

type Props = {
    position?: "wide" | "left" | "right" | "small"

    src: string,
    alt: string,

    source?: SourceInfo
}

export const ArticleImage: React.FC<Props> = props => {
    const className = 
        props.position === "right" ? "float-lg-right ml-3" :
        props.position === "left" ? "float-lg-left mr-3" :
        props.position === "wide" ? "wide" :
        `${props.position} w-100`;

    const source =
        props.source &&
        <>(© <span itemProp="copyrightYear">{props.source.copyrightYear}</span>{' '}
        <a href={props.source.originalUrl} itemProp="sameAs url">
            <Person itemProp="copyrightHolder" name={props.source.author}></Person>,
        </a> <L.License license={props.source.license} version={props.source.licenseVersion} />)</>;

    return (
        <Figure itemProp="image" itemScope itemType="http://schema.org/ImageObject" className={className}>
            <Figure.Image
                itemProp="contentUrl"
                alt={props.alt}
                src={props.src} />
            <Figure.Caption className="text-center">
                {props.children} {source}
            </Figure.Caption>
        </Figure>
    );
}