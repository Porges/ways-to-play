import * as React from 'react';
import { Organization, RenderOrganization } from './Organization';

export type Name = 
  string |
  { name: string, lang?: string } |
  { given: string, family: string, familyFirst?: boolean, lang?: string } 

type Props = {
  innerId?: string,
  name: Name,
  url?: string,
  sameAs?: string
  worksFor?: Organization
} & React.HTMLAttributes<HTMLSpanElement>

export const Person: React.FC<Props> = (props) => {

  const
    { children
    , url
    , sameAs
    , worksFor
    , innerId
    , ...htmlAttributes } = props;

  let name = typeof props.name === 'string' 
      ? { name: props.name }
      : props.name;

  return (
    <span itemScope itemType="http://schema.org/Person" {...htmlAttributes}>
      <span id={innerId}>
        {url && <link href={url} itemProp="url" />}
        {sameAs && <link href={sameAs} itemProp="sameAs" />}
        {worksFor && <><RenderOrganization org={worksFor} itemProp="worksFor" />/</>}
        <span itemProp="name" lang={name.lang}>
          {
            'name' in name
              ? name.name
              : name.familyFirst // note: also no space for family-first names, at the moment
                ? <><span itemProp="familyName">{name.family}</span><span itemProp="givenName">{name.given}</span></>
                : <><span itemProp="givenName">{name.given}</span> <span itemProp="familyName">{name.family}</span></>
          }
        </span>
      </span>
    </span>
  );
};