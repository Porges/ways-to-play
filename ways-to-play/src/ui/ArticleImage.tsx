import * as React from 'react';
import { Person, Name } from './Person';
import * as L from './License';

type Props = {
    position?: "wide" | "left" | "right"

    src: string,
    alt: string,
    caption: string | React.ReactElement,

    originalUrl: string,
    copyrightYear: number,
    author: Name,

    license: L.License,
    licenseVersion?: L.Version,
}

export const ArticleImage: React.FC<Props> = props => {
    const className = 
        props.position === "right"
        ? "side-image-r"
        : props.position === "left"
        ? "side-image-l"
        : props.position;

    return (
        <figure itemProp="image" itemScope itemType="http://schema.org/ImageObject" className={className}>
            <img 
                itemProp="contentUrl"
                src={props.src} alt={props.alt} />
            <figcaption>
                {props.caption} (© <span itemProp="copyrightYear">{props.copyrightYear}</span>{' '}
                <a href={props.originalUrl} itemProp="sameAs url">
                    <Person itemProp="copyrightHolder" name={props.author}></Person>,
                </a> <L.Licence license={props.license} version={props.licenseVersion} />)
            </figcaption>
        </figure>
    );
}