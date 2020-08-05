import * as React from 'react';

export type Organization = { orgName: string, orgAbbr?: string, orgLang?: string }

type Props = {
    org: Organization
} & React.HTMLAttributes<HTMLSpanElement>

export const RenderOrganization: React.FC<Props> = ({org, ...attributes}) => {
    return (
        <span itemScope itemType="http://schema.org/Organization" {...attributes} lang={org.orgLang}>
        { 'orgAbbr' in org
            ? <><meta itemProp="name" content={org.orgName} /><abbr title={org.orgName}>{org.orgAbbr}</abbr></>
            : <span itemProp="name">{org.orgName}</span> }
        </span>
    );
}