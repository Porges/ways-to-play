import * as React from 'react';
import Figure from 'react-bootstrap/Figure'
import uuid from 'uuid';

import { Person, Name } from './Person';
import * as L from './License';
import { Organization, RenderOrganization } from './Organization';

export type SourceInfo = {
    originalUrl?: string,
    copyrightYear?: number,
    author?: Name, 
    organization?: Organization,
    license: L.LicenseName,
    licenseVersion?: L.Version,
}

type ResponsiveImageSrc = { src: string, srcSet: string } | string

type Props = {
    position?: "wide" | "left" | "right" | "small"
    source?: SourceInfo
} & (
    { src: ResponsiveImageSrc, alt: string }
    | { src: [ResponsiveImageSrc, string][], perRow?: number } 
)

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
    }

    if (copyrightHolder && !source.originalUrl) {
        throw new Error("must link if copyright holder supplied");
    }

    return <>({source.license === 'cc0' ? '' : '© ' }{source.copyrightYear && <><span itemProp="copyrightYear">{source.copyrightYear}</span> </>}
        {copyrightHolder && 
            <a href={source.originalUrl} itemProp="sameAs url">
                {copyrightHolder}
            </a>}
        <L.License license={source.license} version={source.licenseVersion} />)</>;
}

const renderImage = (src: ResponsiveImageSrc, alt: string, sizes: string) => {
    return typeof src === 'string'
        ? <Figure.Image itemProp="contentUrl" alt={alt} src={src} />
        : <Figure.Image itemProp="contentUrl" alt={alt} src={src.src} srcSet={src.srcSet} sizes={sizes} />;
}

const imageObject = "http://schema.org/ImageObject";

const renderSourcedImage = (src: ResponsiveImageSrc, ix: number, sourceId: string, alt: string, sizes: string) => {
    return (
        <div itemScope itemType={imageObject} itemProp="image" key={ix} itemRef={sourceId}>{
            typeof src === 'string'
            ? <Figure.Image itemProp="contentUrl" alt={alt} src={src} />
            : <Figure.Image itemProp="contentUrl" alt={alt} src={src.src} srcSet={src.srcSet} sizes={sizes} />
        }</div>
    );
}

const renderImages = (src: [ResponsiveImageSrc, string][], perRow: number|undefined, sourceId: string, sizes: string) => {

    let take = perRow === undefined ? 1000 : perRow;

    let result = [] as React.ReactNode[];

    for (let at = 0; at < src.length; at += take) {
        result.push(
            <div className="multi" key={at}>
                { src.slice(at, at+take).map((x, ix) => renderSourcedImage(x[0], ix, sourceId, x[1], sizes)) }
            </div>
        );
    }

    return <>{result}</>;
}

export const ArticleImage: React.FC<Props> = props => {
    const className = 
        props.position === "right" ? "float-lg-right ml-lg-3 text-center col-12 col-lg-5" :
        props.position === "left" ? "float-lg-left mr-lg-3 text-center col-12 col-lg-5" :
        props.position === "wide" ? "wide text-center" :
        `${props.position === undefined ? '' : props.position} w-100 text-center`;

    // sizes are from Bootstrap breakpoints: https://getbootstrap.com/docs/4.3/layout/overview/ 
    const sizes =
        props.position === 'wide'
        ? "(max-width: 575.98px) 300px, (max-width: 991.98px) 600px, 800px"
        : "(max-width: 575.98px) 300px, 600px";

    if (Array.isArray(props.src)) {
        const sourceId = "src_" + uuid();
        return (
            <Figure className={className}>
                { renderImages(props.src, 'perRow' in props ? props.perRow : undefined, sourceId, sizes) }
                <Figure.Caption className="text-center" itemScope>
                    <div id={sourceId}>
                        {props.children} {props.source && renderSource(props.source) }
                    </div>
                </Figure.Caption>
            </Figure>
        );
    }
    else {        
        return (
            <Figure itemProp='image' itemScope itemType={imageObject} className={className}>
                { renderImage(props.src, 'alt' in props ? props.alt : '', sizes) }
                <Figure.Caption className="text-center">
                    {props.children} {props.source && renderSource(props.source) }
                </Figure.Caption>
            </Figure>
        );
    }
}