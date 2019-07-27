import * as React from 'react';
import { Organization, RenderOrganization } from './Organization';

export type Name = string | { given: string, family: string, familyFirst?: boolean, lang?: string } 

type Props = {
    name: Name,
    url?: string,
    sameAs?: string
    worksFor?: Organization
} & React.HTMLAttributes<HTMLSpanElement>

export const Person: React.FC<Props> = (props) => {

    const
        { name
        , children
        , url
        , sameAs
        , worksFor
        , ...htmlAttributes } = props;

    return (
        <span itemScope itemType="http://schema.org/Person" {...htmlAttributes}>
            { url && <link href={url} itemProp="url"/> }
            { sameAs && <link href={sameAs} itemProp="sameAs"/> }
            { worksFor && <><RenderOrganization org={worksFor} itemProp="worksFor" />/</> }
            <span itemProp="name">
            {
                typeof name === 'string'
                ? name
                : name.familyFirst // note: also no space for family-first names, at the moment
                ? <span lang={name.lang}><span itemProp="familyName">{name.family}</span><span itemProp="givenName">{name.given}</span></span>
                : <span lang={name.lang}><span itemProp="givenName">{name.given}</span> <span itemProp="familyName">{name.family}</span></span>
            }
            </span>
        </span>
    );
};