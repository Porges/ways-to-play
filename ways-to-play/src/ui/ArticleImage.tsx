import * as React from 'react';
import { Person, Name } from './Person';
import * as L from './License';
import { Organization, RenderOrganization } from './Organization';

import Figure from 'react-bootstrap/Figure'

type SourceInfo = {
    originalUrl: string,
    copyrightYear: number,
    author?: Name, 
    organization?: Organization,
    license: L.LicenseName,
    licenseVersion?: L.Version,
}

type Props = {
    position?: "wide" | "left" | "right" | "small"

    src: string,
    alt: string,

    source?: SourceInfo
}


const renderSource = (source: SourceInfo) => {

    let copyrightHolder: JSX.Element | null = null

    if (source.organization) {
        if (source.author) {
            // person works for organization
            copyrightHolder = <Person itemProp="copyrightHolder" name={source.author} worksFor={source.organization} />;
        } else {
            // organization is author
            copyrightHolder = <RenderOrganization org={source.organization} itemProp='copyrightHolder' />;
        }
    } else if (source.author) {
        copyrightHolder = <Person itemProp="copyrightHolder" name={source.author} />;
    } else {
        throw new Error("Either 'organization' or 'author' must be specified.");
    }

    return <>(© <span itemProp="copyrightYear">{source.copyrightYear}</span>{' '}
        <a href={source.originalUrl} itemProp="sameAs url">
            {copyrightHolder}
        </a> <L.License license={source.license} version={source.licenseVersion} />)</>;
}

export const ArticleImage: React.FC<Props> = props => {
    const className = 
        props.position === "right" ? "float-lg-right ml-3 text-center col-12 col-lg-5" :
        props.position === "left" ? "float-lg-left mr-3 text-center col-12 col-lg-5" :
        props.position === "wide" ? "wide text-center" :
        `${props.position} w-100 text-center`;

    return (
        <Figure itemProp="image" itemScope itemType="http://schema.org/ImageObject" className={className}>
            <Figure.Image
                itemProp="contentUrl"
                alt={props.alt}
                src={props.src} />
            <Figure.Caption className="text-center">
                {props.children} {props.source && renderSource(props.source) }
            </Figure.Caption>
        </Figure>
    );
}