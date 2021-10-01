import * as React from 'react';

export type Organization = { orgName: string, orgAbbr?: string, orgLang?: string, orgURL?: string }

type Props = {
  org: Organization
} & React.HTMLAttributes<HTMLSpanElement>

export const RenderOrganization: React.FC<Props> = ({ org, ...attributes }) => {
  let content = 'orgAbbr' in org
    ? <><meta itemProp="name" content={org.orgName} /><abbr title={org.orgName}>{org.orgAbbr}</abbr></>
    : <span itemProp="name">{org.orgName}</span>;

  if ('orgURL' in org) {
    content = <a href={org.orgURL}>{content}</a>;
  }

  return (
    <span itemScope itemType="http://schema.org/Organization" {...attributes} lang={org.orgLang}>
      {content}
    </span>
  );
}
