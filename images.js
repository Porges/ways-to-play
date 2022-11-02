const Image = require("@11ty/eleventy-img");
const PropTypes = require('prop-types');
const path = require('path');

const { ifSet, asAttr, IS_PRODUCTION } = require('./helpers');
const { randomUUID } = require("crypto");

module.exports = { renderSource, articleImage, person, license, organization }

/**
 * @param {Object} props
 * @param {string} props.alt
 * @param {string} props.src
 * @param {Name} props.author
 * @param {number=} props.perRow
 * @param {boolean=} props.noborder
 * @param {boolean=} props.cram
 * @param {string=} props.size
 * @param {string=} props.position
 * @param {SourceInfo} props.source
 * @param {string=} props.justify
 */
async function articleImage(caption, props) {
    if (props.authorFamily || props.authorGiven) {
        props.author = {
            family: props.authorFamily,
            given: props.authorGiven,
            lang: props.authorLang,
            familyFirst: props.authorFamilyFirst,
        };
    } else if (props.authorName) {
        props.author = {
            name: props.authorName,
            lang: props.authorLang,
        };
    }

    if (props.license) {
        props.source = {
            identifier: props.identifier,
            originalUrl: props.originalUrl,
            copyrightYear: props.copyrightYear,
            author: props.author,
            licenseVersion: props.licenseVersion,
            license: props.license,
        };
    }

    if (props.orgName) {
        props.source.organization = {
            orgName: props.orgName,
            orgAbbr: props.orgAbbr,
            orgLang: props.orgLang,
            orgUrl: props.orgUrl,
        };
    }

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

    // if no source was provided, source is me
    const sourceInfo =
        source
            ? renderSource(props.source)
            : ('<meta itemprop="copyrightHolder" itemscope itemtype="http://schema.org/Person" itemRef="author" />'
                + '<meta itemprop="license" content="https://creativecommons.org/licenses/by-nc-sa/4.0/" />');

    // if we are only showing the (🅮) public domain symbol don't bother putting it on its own line
    const captionLineBreak = (props.source?.license === 'cc0' && !props.source?.author && !props.source?.organization) ? ' ' : '\n\n';

    const srcs = src.split(';');
    const alts = alt.split(';');

    if (srcs.length !== alts.length) {
        throw new Error("number of srcs must match number of alts");
    }

    const captionAndSource =
        ifSet(caption.trim(),
            `\n\n<span itemprop="caption">`
            + caption.trim() /* NB: must appear on its own line to get Markdown formatting… */
            + `</span>` + (source ? captionLineBreak : ''))
        + `<span itemprop="copyrightNotice">${sourceInfo}</span>`;

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
            + await renderImages(this, srcs, alts, sourceInfo, perRow, sourceId, sizes, noborder, justify)
            + `<figcaption class="text-center figure-caption" itemscope>`
            + `<div id="${sourceId}">`
            + captionAndSource
            + `</div>`
            + `</figcaption>`
            + `</figure>`;
    }
}


/**
 * @param {SourceInfo} source 
 * @param {boolean=} short 
 * @returns {string}
 */
function renderSource(source, short = false) {
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

    return (source.license === 'cc0' ? '' : '© ')
        + ifSet(source.copyrightYear, `<span itemprop="copyrightYear">${source.copyrightYear}</span> `)
        + ((copyrightHolder && source.originalUrl) ? `<a href="${source.originalUrl}" itemprop="url">${copyrightHolder}</a>` : copyrightHolder)
        + ifSet(source.license !== 'stock-image', () => license({ leading: !!copyrightHolder, license: source.license, version: source.licenseVersion }))
        + ifSet(!short && source.identifier, `: <span class="image-identifier">${source.identifier}</span>`);
}

/**
 * @param {string} src
 * @param {string} alt
 * @param {string} sourceInfo
 * @param {string} sizes
 * @param {boolean=} noborder
 */
async function renderImage(me, src, alt, sourceInfo, sizes, noborder) {
    const metadata = await loadSizedImage(me, src);

    const [format] = Object.keys(metadata);

    const srcset = metadata[format].map(x => x.srcset).join(', ');
    const original = metadata[format].slice(-1)[0];

    const id = path.basename(original.filename, path.extname(original.filename));

    const classlist = noborder ? " border-0" : '';

    return `<dialog class="lightbox" id="${id}">`
        + `<img src="${original.url}" srcset="${srcset}" alt="${alt}" />`
        + `<div class="lightbox-under"><span itemscope>${sourceInfo}</span><form method="dialog"><a href="${original.url}" class="lightbox-original" role="button" target="_blank">Original</a><button class="lightbox-close" value="clicked">Close</button></form></div></dialog>`
        + `<a href="#${id}">`
        + `<img class="figure-img${classlist}" itemprop="contentUrl" src="${original.url}" width="${original.width}" height="${original.height}" alt="${alt}" srcset="${srcset}" sizes="${sizes}">`
        + `</a>`;
}

/**
 * @param {string[]} srcs 
 * @param {string[]} alts 
 * @param {number=} perRow 
 * @param {string} sourceId 
 * @param {string} sizes 
 * @param {boolean=} noborder 
 * @returns {Promise<string>}
 */
async function renderImages(me, srcs, alts, sourceInfo, perRow = 1000, sourceId, sizes, noborder, justify) {
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

async function loadSizedImage(me, src) {
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

/**
 * @param {*} me 
 * @param {string} src 
 * @param {string} alt 
 * @param {string} sourceInfo 
 * @param {string} sourceId 
 * @param {string} sizes 
 * @param {boolean=} noborder 
 * @returns 
 */
async function renderSourcedImage(me, src, alt, sourceInfo, sourceId, sizes, noborder) {
    const metadata = await loadSizedImage(me, src);
    const [format] = Object.keys(metadata);

    const srcset = metadata[format].map(x => x.srcset).join(', ');
    const original = metadata[format][metadata[format].length - 1];

    const className = noborder ? "border-0" : '';
    const id = path.basename(original.filename, path.extname(original.filename));

    return `<div itemscope itemtype="${imageObject}" itemprop="image" itemRef="${sourceId}">`
        + `<dialog class="lightbox" id="${id}">`
        + `<img src="${original.url}" srcset="${srcset}" alt="${alt}" />`
        + `<div class="lightbox-under"><span itemscope>${sourceInfo}</span><form method="dialog"><a href="${original.url}" class="lightbox-original" role="button" target="_blank">Original</a><button class="lightbox-close" value="clicked">Close</button></form></div></dialog>`
        + `<a href="${'#' + id}">`
        + `<img class="figure-img ${className}" itemprop="contentUrl url" alt="${alt}" src="${original.url}"`
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

/**
 * @param {Object} props 
 * @param {string} props.orgName 
 * @param {string=} props.orgAbbr
 * @param {string=} props.orgLang
 * @param {string=} props.orgUrl
 * @returns {string}
 */
function organization(props) {
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

/**
 * @param {Object} props
 * @param {Name} props.name
 * @param {string=} props.innerId
 * @param {string=} props.id
 * @param {string=} props.url
 * @param {string=} props.itemprop
 * @param {string=} props.sameAs
 * @param {Organization=} props.worksFor
 * @returns {string}
 */
function person(props) {
    PropTypes.checkPropTypes(personPropTypes, props, 'props', 'person');
    const { id, itemprop, innerId, url, sameAs, worksFor } = props;
    let name = typeof props.name === 'string'
        ? { name: props.name }
        : props.name;
    return `<span itemscope itemtype="http://schema.org/Person"${asAttr("id", id)}${asAttr("itemprop", itemprop)}>`
        + `<span${asAttr("id", innerId)}>`
        + ifSet(url, `<link href="${url}" itemprop="url" />`)
        + ifSet(sameAs, `<link href="${sameAs}" itemprop="sameAs" />`)
        + ifSet(worksFor, () => organization({ ...worksFor, itemprop: "worksFor" }) + '/')
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

/**
 * 
 * @param {Object} props 
 * @param {LicenseName} props.license 
 * @param {LicenseVersion=} props.version 
 * @param {string=} props.rel
 * @param {boolean=} props.leading 
 */
function license(props) {
    PropTypes.checkPropTypes(licensePropTypes, props, "props", "license");
    const { license, leading, version, rel } = props;

    if (license === 'with-permission') {
        return `<span>${ifSet(leading, ', ')}used with permission</span>`;
    }

    if (license === 'us-fair-use') {
        return `<span>${ifSet(leading, ', ')}under US fair use</span>`;
    }

    // license == gpl | creative-common

    const href =
        license === 'gpl'
            ? "https://www.gnu.org/licenses/gpl.html"
            : license === "cc0"
                ? "https://creativecommons.org/publicdomain/mark/1.0/"
                : `https://creativecommons.org/licenses/${license.substr(3)}/${version}`;

    const parts = license.split('-');

    const title =
        license === 'cc0'
            ? "Public Domain"
            : `Licensed under the ${parts.map(altTextForLicense).join(' ')} license, ${version}`

    return (
        ifSet(leading, ' ')
        + `<a itemprop="license" href="${href}" title="${title}"${asAttr("rel", rel)}>`
        + (license === 'gpl'
            ? `<img src="/images/gpl.svg" alt=${`GPLv${version}`} width="14" height="14" />`
            : parts.map(charForLicense).join('\u{200a}')
        )
        + `</a>`);
}

const licensePropTypes = {
    license: PropTypes.oneOf(["cc0", "cc-by", "cc-by-sa", "cc-by-nd", "cc-by-nc", "cc-by-nc-sa", "cc-by-nc-nd", "gpl", "with-permission", "us-fair-use"]).isRequired,
    version: PropTypes.oneOf(["2.0", "2.5", "3.0", "3.5", "4.0"]),
    rel: PropTypes.string,
    leading: PropTypes.bool,
};

function altTextForLicense(input) {
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
        case "gpl":
            return "GPL";
    }
}

function charForLicense(input) {
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
