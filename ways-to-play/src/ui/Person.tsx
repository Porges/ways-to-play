import * as React from 'react';

export type Name = string | { given: string, family: string, familyFirst?: boolean } 

type Props = {
    name: Name,
    url?: string,
    sameAs?: string
} & React.HTMLAttributes<HTMLSpanElement>

export const Person: React.FC<Props> = (props) => {

    const
        { name
        , children
        , url
        , sameAs
        , ...htmlAttributes } = props;

    return (
        <span itemScope itemType="http://schema.org/Person" {...htmlAttributes}>
            { url && <link href={url} itemProp="url"/> }
            { sameAs && <link href={sameAs} itemProp="sameAs"/> }
            <span itemProp="name">
            {
                typeof name === 'string'
                ? name
                : name.familyFirst
                ? <><span itemProp="familyName">{name.family}</span> <span itemProp="givenName">{name.given}</span></>
                : <><span itemProp="givenName">{name.given}</span> <span itemProp="familyName">{name.family}</span></>
            }
            </span>
        </span>
    );
};