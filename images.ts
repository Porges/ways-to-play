import { LicenseName, LicenseVersion, Name, Organization, SourceInfo } from "./types";

import Image from '@11ty/eleventy-img';
import PropTypes from 'prop-types';
import path from 'path';

import { ifSet, asAttr, IS_PRODUCTION } from './helpers';
import { randomUUID } from "crypto";

// from 11ty
type ExpectedThis = {
    page: {
        inputPath: string
    }
};

type CommonArticleImageProps = {
    alt: string,
    src: string,
    perRow?: number,
    noborder?: boolean,
    cram?: boolean,
    size?: 'small' | 'extra-small' | 'wide' | 'extra-wide',
    position?: string,
    justify?: string,
};

type ArticleImageProps = CommonArticleImageProps & {
    source: SourceInfo,
};

type RawArticleImageProps = CommonArticleImageProps & {
    hidden?: boolean,
    license?: LicenseName,
    licenseVersion?: LicenseVersion,
    copyrightYear?: number,
    identifier?: string,
    originalUrl?: string,
    authorFamily?: string,
    authorGiven?: string,
    authorLang?: string,
    authorFamilyFirst?: boolean,
    author?: string,
    orgName?: string,
    orgAbbr?: string,
    orgLang?: string,
    orgUrl?: string,
};

// convert from markdown-level representation to a structured one
function fromRaw(props: RawArticleImageProps): ArticleImageProps {
    let author: Name | undefined = undefined;
    if (props.authorFamily || props.authorGiven) {
        author = {
            family: props.authorFamily ?? "",
            given: props.authorGiven ?? "",
            lang: props.authorLang,
            familyFirst: props.authorFamilyFirst,
        };
    } else if (props.author) {
        author = {
            name: props.author,
            lang: props.authorLang,
        };
    }

    let source: SourceInfo | undefined =
        props.license
            ? {
                author: author,
                license: props.license,
                licenseVersion: props.licenseVersion,
                identifier: props.identifier,
                originalUrl: props.originalUrl,
                copyrightYear: props.copyrightYear,
            }
            : undefined;

    if (author && !source) {
        throw new Error("author supplied but no source");
    }

    if (props.orgName) {
        source!.organization = {
            orgName: props.orgName,
            orgAbbr: props.orgAbbr,
            orgLang: props.orgLang,
            orgUrl: props.orgUrl,
        };
    }

    if (!source) {
        if (props.copyrightYear) {
            source = {
                copyrightYear: props.copyrightYear,
                ...meSource,
            };
        } else {
            source = meSource;
        }
    }

    source.hidden = props.hidden;

    let result: ArticleImageProps = {
        alt: props.alt,
        src: props.src,
        source: source,
        cram: props.cram,
        justify: props.justify,
        noborder: props.noborder,
        perRow: props.perRow,
        position: props.position,
        size: props.size,
    };

    return result;
}

const meSource: SourceInfo = {
    author: {
        given: "George",
        family: "Pollard"
    },
    license: "cc-by-nc-sa",
    licenseVersion: "4.0",
};

export async function articleImage(this: ExpectedThis, caption: string, rawprops: RawArticleImageProps) {
    const props = fromRaw(rawprops);
    PropTypes.checkPropTypes(articleImagePropTypes, props, 'props', 'articleImage');
    const { alt, src, noborder, cram, source, position, size, perRow, justify } = props;

    const className = `${position || ''} ${size || ''} ${cram ? 'cram' : ''}`;
    // sizes are from Bootstrap breakpoints: https://getbootstrap.com/docs/4.3/layout/overview/ 
    const sizes =
        size === 'extra-wide'
            ? "(max-width: 575.98px) 300px, (max-width: 991.98px) 600px, (max-width: 1199.98px) 800px, 1000px"
            : size === 'wide'
                ? "(max-width: 575.98px) 300px, (max-width: 991.98px) 600px, 800px"
                : "(max-width: 575.98px) 300px, 600px";

    const sourceInfo = renderSource(source);

    // if we are only showing the (🅮) public domain symbol don't bother putting it on its own line
    const captionLineBreak = (props.source.license === 'cc0' && !props.source.author && !props.source.organization) ? ' ' : '\n\n';

    const srcs = src.split(';');
    const alts = alt.split(';');

    if (srcs.length !== alts.length) {
        throw new Error("number of srcs must match number of alts");
    }

    const captionAndSource =
        ifSet(caption.trim(),
            c => `\n\n<span itemprop="caption">`
            + c /* NB: must appear on its own line to get Markdown formatting… */
            + `</span>` + captionLineBreak)
        + sourceInfo;

    if (srcs.length === 1) {
        return `<figure class="figure ${className}" itemprop="image" itemscope itemtype="${imageObject}">`
            + await renderImage(this, src, alt, sourceInfo, sizes, noborder)
            + `<figcaption class="text-center figure-caption">`
            + captionAndSource
            + `</figcaption>`
            + `</figure>`;
    } else {
        const sourceId = "src_" + randomUUID();
        return `<figure class="figure ${className}">`
            + await renderImages(this, srcs, alts, sourceInfo, perRow, sourceId, sizes, noborder, justify as 'centered' | undefined)
            + `<figcaption class="text-center figure-caption" itemscope>`
            + `<div id="${sourceId}">`
            + captionAndSource
            + `</div>`
            + `</figcaption>`
            + `</figure>`;
    }
}


export function renderSource(source: SourceInfo, short = false) {
    let copyrightHolder = '';

    if (source.organization) {
        if (source.author) {
            // person works for organization
            // TODO: here organization should also be marked copyrightHolder?
            copyrightHolder = person({ itemprop: "creator", name: source.author, worksFor: source.organization });
        } else {
            // organization is author
            copyrightHolder = organization({ ...source.organization, itemprop: 'copyrightHolder' });
        }
    } else if (source.author) {
        copyrightHolder = person({ itemprop: "copyrightHolder creator", name: source.author });
    }

    return `<span itemprop="copyrightNotice"${ifSet(source.hidden, ' hidden')}>`
        + (source.license === 'cc0' ? '' : '© ')
        + ifSet(source.copyrightYear, `<span itemprop="copyrightYear">${source.copyrightYear}</span> `)
        + ((copyrightHolder && source.originalUrl) ? `<a href="${source.originalUrl}" itemprop="url">${copyrightHolder}</a>` : copyrightHolder)
        + ifSet(source.license !== 'stock-image', () => license(source.license as any, source.licenseVersion, undefined, !!copyrightHolder))
        + ifSet(!short && source.identifier, `: <span class="image-identifier">${source.identifier}</span>`)
        + '</span>';
}

async function renderImage(me: ExpectedThis, src: string, alt: string, sourceInfo: string, sizes: string, noborder?: boolean) {
    const metadata = await loadSizedImage(me, src);

    const [format] = Object.keys(metadata) as (keyof typeof metadata)[];
    const m = metadata[format]!;

    const srcset = m.map(x => x.srcset).join(', ');
    const original = m.slice(-1)[0];
    const smallest = m[0];

    const id = path.basename(original.filename!, path.extname(original.filename!));

    const classlist = noborder ? " border-0" : '';

    return `<dialog class="lightbox" id="${id}">`
        + `<img src="${original.url}" srcset="${srcset}" alt="${alt}" loading="lazy" />`
        + `<div class="lightbox-under"><span itemscope>${sourceInfo}</span><form method="dialog"><a href="${original.url}" class="lightbox-original" role="button" target="_blank">Original</a><button class="lightbox-close">Close</button></form></div></dialog>`
        + `<a href="#${id}">`
        + `<img class="figure-img${classlist}" itemprop="contentUrl" src="${smallest.url}" width="${original.width}" height="${original.height}" alt="${alt}" srcset="${srcset}" sizes="${sizes}">`
        + `</a>`;
}

async function renderImages(me: ExpectedThis, srcs: string[], alts: string[], sourceInfo: string, perRow = 1000, sourceId: string, sizes: string, noborder: boolean | undefined, justify: 'centered' | undefined) {
    let classes = "multi";
    if (justify) {
        switch (justify) {
            case 'centered':
                classes += ' centered';
                break;
            default:
                throw new Error(`Invalid 'justify' value: ${justify}`)
        }
    }
    let result = '';
    for (let at = 0; at < srcs.length; at += perRow) {
        result += `<div class="${classes}">`;
        for (let ix = at; ix < Math.min(at + perRow, srcs.length); ++ix) {
            result += await renderSourcedImage(me, srcs[ix], alts[ix], sourceInfo, sourceId, sizes, noborder);
        }
        result += '</div>';
    }

    return result;
}

async function loadSizedImage(me: ExpectedThis, src: string): Promise<Image.Metadata> {
    const basedSrc = path.join(path.dirname(me.page.inputPath), src);
    // don't resize locally, for speed
    return await Image(basedSrc, {
        widths: IS_PRODUCTION ? [300, 600, 800, 1200, 1600, 4000] : [null],
        formats: [null],
        outputDir: "public/img",
    });

    /* even faster but needs to be able to serve local files
    return {
        [path.extname(basedSrc).slice(1)]: [{
            filename: basedSrc,
            url: "file://" + basedSrc,
            width: '',
            height: '',
            srcSet: '',
        }]
    };
    */
}

async function renderSourcedImage(me: ExpectedThis, src: string, alt: string, sourceInfo: string, sourceId: string, sizes: string, noborder: boolean | undefined) {
    const metadata = await loadSizedImage(me, src);
    const [format] = Object.keys(metadata) as (keyof typeof metadata)[];
    const m = metadata[format]!;

    const srcset = m.map(x => x.srcset).join(', ');
    const original = m.slice(-1)[0];
    const smallest = m[0];

    const className = noborder ? "border-0" : '';
    const id = path.basename(original.filename!, path.extname(original.filename!));

    return `<div itemscope itemtype="${imageObject}" itemprop="image" itemRef="${sourceId}">`
        + `<dialog class="lightbox" id="${id}">`
        + `<img src="${original.url}" srcset="${srcset}" alt="${alt}" loading="lazy" />`
        + `<div class="lightbox-under"><span itemscope>${sourceInfo}</span><form method="dialog"><a href="${original.url}" class="lightbox-original" role="button" target="_blank">Original</a><button class="lightbox-close">Close</button></form></div></dialog>`
        + `<a href="${'#' + id}">`
        + `<img class="figure-img ${className}" itemprop="contentUrl url" alt="${alt}" src="${smallest.url}"`
        + ` srcset="${srcset}" sizes="${sizes}" width="${original.width}" height="${original.height}" />`
        + '</a>'
        + '</div>';
}

const imageObject = "http://schema.org/ImageObject";

const articleImagePropTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    noborder: PropTypes.bool,
    cram: PropTypes.bool,
    justify: PropTypes.oneOf(['centered']),
};

/** @typedef { import('./types').Name } Name */
/** @typedef { import('./types').Organization } Organization */
/** @typedef { import('./types').LicenseName } LicenseName */
/** @typedef { import('./types').LicenseVersion } LicenseVersion */
/** @typedef { import('./types').SizePosition } SizePosition */
/** @typedef { import('./types').SourceInfo } SourceInfo */

const organizationPropTypes = {
    orgName: PropTypes.string.isRequired,
    orgAbbr: PropTypes.string,
    orgLang: PropTypes.string,
    orgUrl: PropTypes.string,
    itemprop: PropTypes.string,
};

type OrganizationProps = {
    orgName: string,
    orgAbbr?: string,
    orgLang?: string,
    orgUrl?: string,
    itemprop?: string,
};

export function organization(props: OrganizationProps) {
    PropTypes.checkPropTypes(organizationPropTypes, props, 'props', 'organization');
    let { orgName, orgAbbr, orgLang, orgUrl, itemprop } = props;
    let content = orgAbbr
        ? `<meta itemprop="name" content="${orgName}" /><abbr title="${orgName}">${orgAbbr}</abbr>`
        : `<span itemprop="name">${orgName}</span>`;


    if (orgUrl) {
        content = `<a href="${orgUrl}">${content}</a>`;
    }

    return (`<span itemscope itemtype="http://schema.org/Organization"${asAttr('lang', orgLang)}${asAttr("itemprop", itemprop)}>`
        + content
        + '</span>');
}

const namePropTypes = PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.exact({
        name: PropTypes.string.isRequired,
        lang: PropTypes.string,
    }),
    PropTypes.exact({
        given: PropTypes.string.isRequired,
        family: PropTypes.string.isRequired,
        familyFirst: PropTypes.bool,
        lang: PropTypes.string,
    }),
]);

const personPropTypes = {
    name: namePropTypes.isRequired,
    innerId: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
    itemprop: PropTypes.string,
    sameAs: PropTypes.string,
    worksFor: PropTypes.exact(organizationPropTypes),
};

type PersonProps = {
    name: Name,
    innerId?: string,
    id?: string,
    url?: string,
    itemprop?: string,
    sameAs?: string,
    worksFor?: Organization,
};

export function person(props: PersonProps) {
    PropTypes.checkPropTypes(personPropTypes, props, 'props', 'person');
    const { id, itemprop, innerId, url, sameAs, worksFor } = props;
    let name = typeof props.name === 'string'
        ? { name: props.name }
        : props.name;
    return `<span itemscope itemtype="http://schema.org/Person"${asAttr("id", id)}${asAttr("itemprop", itemprop)}>`
        + `<span${asAttr("id", innerId)}>`
        + ifSet(url, `<link href="${url}" itemprop="url" />`)
        + ifSet(sameAs, `<link href="${sameAs}" itemprop="sameAs" />`)
        + ifSet(worksFor, o => organization({ ...o, itemprop: "worksFor" }) + '/')
        + `<span itemprop="name"${asAttr('lang', name.lang)}>`
        + ('name' in name
            ? name.name
            : name.familyFirst // note: also no space for family-first names, at the moment
                ? `<span itemprop="familyName">${name.family}</span><span itemprop="givenName">${name.given}</span>`
                : `<span itemprop="givenName">${name.given}</span> <span itemprop="familyName">${name.family}</span>`
        )
        + `</span>`
        + `</span>`
        + `</span>`;
}

export function license(name: LicenseName, version: LicenseVersion | undefined, rel: string | undefined, leading: boolean | undefined) {
    PropTypes.checkPropTypes(licensePropTypes, { license: name, version, rel, leading }, "props", "license");

    if (name === 'with-permission') {
        return `<span>${ifSet(leading, ', ')}used with permission</span>`;
    }

    if (name === 'us-fair-use') {
        return `<span>${ifSet(leading, ', ')}under US fair use</span>`;
    }

    // license is creative-commons
    if (version === undefined) {
        version = "4.0";
    }

    const href =
        name === "cc0"
            ? "https://creativecommons.org/publicdomain/mark/1.0/"
            : `https://creativecommons.org/licenses/${name.slice(3)}/${version}`;

    const parts = name.split('-');

    const title =
        name === 'cc0'
            ? "Public Domain"
            : `Licensed under the ${parts.map(altTextForLicense).join(' ')} license, ${version}`

    return (
        ifSet(leading, ' ')
        + `<a itemprop="license" href="${href}" title="${title}"${asAttr("rel", rel)}>`
        + parts.map(charForLicense).join('')
        + `</a>`);
}

const licensePropTypes = {
    license: PropTypes.oneOf(["cc0", "cc-by", "cc-by-sa", "cc-by-nd", "cc-by-nc", "cc-by-nc-sa", "cc-by-nc-nd", "with-permission", "us-fair-use"]).isRequired,
    version: PropTypes.oneOf(["2.0", "2.5", "3.0", "3.5", "4.0"]),
    rel: PropTypes.string,
    leading: PropTypes.bool,
};

function altTextForLicense(input: string) {
    switch (input) {
        case "cc0":
            return "Public Domain";
        case "cc":
            return "Creative Commons";
        case "by":
            return "Attribution";
        case "nc":
            return "Non-Commercial";
        case "nd":
            return "No Derivatives";
        case "sa":
            return "Share-Alike";
        default:
            throw new Error(`no such license part: ${input}`)
    }
}

function charForLicense(input: string) {
    switch (input) {
        case 'cc': return '\u{1f16d}';
        case 'cc0': return '\u{1f16e}';
        case 'by': return '\u{1f16f}';
        case 'sa': return '\u{1f10e}';
        case 'nc': return '\u{1f10f}';
        case 'nd': return '⊜';
        default: return null;
    }
}
