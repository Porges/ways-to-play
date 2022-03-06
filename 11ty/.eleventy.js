const eleventyRemark = require('@fec/eleventy-plugin-remark');
const Image = require("@11ty/eleventy-img");
const PropTypes = require('prop-types');
const argParse = require('liquid-args');
const path = require('path');

const { asAttr, ifSet } = require('./helpers');
const references = require('./references');
const prettier = require('prettier');

const fs = require('node:fs/promises');
const { env } = require('process');

PropTypes.resetWarningCache();

function _normalizeShortcodeScope(ctx) {
  let obj = {};
  if (ctx) {
    obj.page = ctx.get(["page"]);
  }
  return obj;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("src/sass");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.addPlugin(eleventyRemark, {
    enableRehype: false,
    plugins: [
      require('remark-sectionize'),
      {
        plugin: 'remark-rehype',
        options: { allowDangerousHtml: true }
      },
      citationPlugin,
      'rehype-slug',
      {
        plugin: 'rehype-autolink-headings',
        options: {
          content: { type: 'text', value: '#' },
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            class: 'permalink',
            title: 'link to section'
          }
        },
      },
      'rehype-raw',
      'rehype-stringify',
    ],
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
  });

  eleventyConfig.addShortcode("person", person);
  eleventyConfig.addShortcode("organization", organization);
  eleventyConfig.addShortcode("license", license);
  eleventyConfig.addShortcode("asAttr", asAttr);

  eleventyConfig.addPairedShortcode("aside", function (content) {
    return `<aside role="note" class="footnote">${content}</aside>`;
  });

  eleventyConfig.addPairedShortcode("fn", function (content) {
    return `<span class="footnote-indicator"></span><span role="note" class="footnote">${content}</span>`;
  });

  eleventyConfig.addLiquidTag("image", function (liquidEngine) {
    return {
      parse: function (tagToken, remainTokens) {
        this.args = tagToken.args;
        this.templates = [];

        var stream = liquidEngine.parser
          .parseStream(remainTokens)
          .on("template", tpl => this.templates.push(tpl))
          .on("tag:imageEnd", () => stream.stop())
          .on("end", () => { throw new Error("unclosed image tag"); });

        stream.start();
      },
      render: function* (scope) {
        const args = yield Promise.all(argParse(this.args, arg => liquidEngine.evalValue(arg, scope)));
        const content = yield this.liquid.renderer.renderTemplates(this.templates, scope);
        return articleImage.call(_normalizeShortcodeScope(scope), content, args.find(a => a.__keywords));
      }
    }
  });

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    // from: https://github.com/11ty/eleventy/issues/1314#issuecomment-657999759
    const extname = path.extname(outputPath);
    switch (extname) {
      case ".html":
      case ".json":
        // Strip leading period from extension and use as the Prettier parser.
        const parser = extname.replace(/^./, "");
        return prettier.format(content, { parser });

      default:
        return content;
    }
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

// shortcode definitions:

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
  let { orgName, orgAbbr, orgLang, orgURL, itemprop } = props;
  let content = orgAbbr
    ? `<meta itemprop="name" content="${orgName}" /><abbr title="${orgName}">${orgAbbr}</abbr>`
    : `<span itemprop="name">${orgName}</span>`;


  if (orgURL) {
    content = `<a href="${orgURL}">${content}</a>`;
  }

  return (
    `<span itemscope itemtype="http://schema.org/Organization"${ifSet(orgLang, ` lang="${orgLang}"`)}${ifSet(itemprop, ` itemprop="${itemprop}"`)}>
      ${content}
    </span>`
  );
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
    + ifSet(worksFor, () => organization({ ...worksFor, itemprop: "worksFor" }))
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
    return `<span>${ifSet(leading, ', ')}with permission</span>`;
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
  version: PropTypes.oneOf(["2.0", "3.0", "3.5", "4.0"]),
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
    case 'cc0': return '\u{1f16e}';
    case 'cc': return '\u{1f16d}';
    case 'by': return '\u{1f16f}';
    case 'nc': return '\u{1f10f}';
    case 'sa': return '\u{1f10e}';
    case 'nd': return '⊜';
    default: return null;
  }
}

/**
 * @param {Object} props
 * @param {string} props.alt
 * @param {string} props.src
 * @param {boolean=} props.noborder
 * @param {boolean=} props.mainImage
 * @param {boolean=} props.cram
 * @param {string=} props.size
 * @param {string=} props.position
 * @param {SourceInfo} props.source
 */
async function articleImage(caption, props) {
  console.log(props);

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
      orgURL: props.orgURL,
    };
  }

  PropTypes.checkPropTypes(articleImagePropTypes, props, 'props', 'articleImage');
  const { alt, src, noborder, mainImage, cram, source, position, size } = props;

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
  const captionLineBreak = (props.source?.license === 'cc0' && !props.source?.author && !props.source?.organization) ? ' ' : '<br/>';

  const l = `<figure class="figure" itemprop="image" itemscope itemtype="${imageObject}">`
    + await renderImage(this, src, alt, sizes, noborder, mainImage)
    + `<figcaption class="text-center figure-caption">`
    + ifSet(caption,
      `\n\n<span itemprop="caption">`
      + caption.trim() /* NB: must appear on its own line to get Markdown formatting… */
      + `</span>\n\n`)
    + sourceInfo
    + `</figcaption>`
    + `</figure>`;
  console.log(l);
  return l;
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
      copyrightHolder = person({ itemProp: "copyrightHolder", name: source.author, worksFor: source.organization });
    } else {
      // organization is author
      copyrightHolder = organization({ org: source.organization, itemProp: 'copyrightHolder' });
    }
  } else if (source.author) {
    copyrightHolder = person({ itemProp: "copyrightHolder", name: source.author });
  }

  return (source.license === 'cc0' ? '' : '© ')
    + ifSet(source.copyrightYear, `<span itemprop="copyrightYear">${source.copyrightYear}</span> `)
    + ((copyrightHolder && source.originalUrl) ? `<a href="${source.originalUrl}" itemprop="sameAs">${copyrightHolder}</a>` : copyrightHolder)
    + ifSet(source.license !== 'stock-image', () => license({ leading: !!copyrightHolder, license: source.license, version: source.licenseVersion }))
    + ifSet(!short && source.identifier, `: ${source.identifier}`);
}

/**
 * @param {string} src
 * @param {string} alt
 * @param {string} sizes
 * @param {boolean=} noborder
 * @param {boolean=} mainImage
 */
async function renderImage(me, src, alt, sizes, noborder, mainImage) {
  const basedSrc = path.join(path.dirname(me.page.inputPath), src);
  const metadata = await Image(basedSrc, {
    widths: [300, 600, 800, 1200, 1600, null],
    formats: [null],
    outputDir: "public/img",
  });

  const [format] = Object.keys(metadata);

  const srcset = metadata[format].map(x => x.srcset).join(', ');
  const original = metadata[format][metadata[format].length - 1];

  const id = path.basename(original.filename);

  return `<a href="#!" hidden class="lightbox" id="${id}">`
    + `<span style="background-image: url('${original.url}')"></span>`
    + `</a>`
    + `<a href="#${id}">`
    + `<img class="figure-img" src="${original.url}" width="${original.width}" height="${original.height}" alt="${alt}" srcset="${srcset}" sizes="${sizes}">`
    + `</a>`;
}

const imageObject = "http://schema.org/ImageObject";

const articleImagePropTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  noborder: PropTypes.bool,
  mainImage: PropTypes.bool,
  cram: PropTypes.bool,
};

const citationPlugin = () => {

  let biblio = undefined;
  let unist = undefined;

  const indexToString = (/** @type {number} */ index) => {
    let result = "";

    while (index > 0) {
      const num = (index - 1) % 26;
      result = String.fromCodePoint('a'.charCodeAt(0) + num) + result
      index = Math.floor((index - num) / 26);
    }

    return result;
  };

  const formatCitation = (
    /** @type {string} */ id,
    /** @type {number} */ index,
    /** @type {boolean} */ inline,
    /** @type {string} */ suffix) => {

    const indicator = indexToString(index);
    if (inline) {
      const reference = biblio[id];
      if (!reference) {
        return `[UNKNOWN CITE: ${id}]`;
      }

      switch (reference.type) {
        case 'book':
          return `<a href="${`#ref-${id}`}">`
            + `<cite${asAttr('lang', reference["title-lang"])}>${reference.title}</cite>`
            + `</a>`
            + ifSet(suffix, ` (${suffix})`);
        case 'article-journal':
          return `<a href="${`#ref-${id}`}">${reference.author[0].family}</a>`
            + ` (${ifSet(reference.issued, reference.issued.year)}${ifSet(suffix, `, ${suffix}`)})`;
        default:
          return `<span class="citation">[<a href="${`#ref-${id}`}">${indicator}</a>]${ifSet(suffix, ` (${suffix})`)}</span>`
      }
    } else {
      return `<sup class="citation"><a href="${`#ref-${id}`}">${indicator}</a>${ifSet(suffix, `[${suffix}]`)}</sup>`;
    }
  };

  const citeExtrator = /((?<!\w)@(?<id1>\w+)(\s+\[(?<what1>[^\]]+)\])?)|(\[@(?<id2>\w+)(\s+(?<what2>[^\]]+))?\])/;

  return async (tree, _file) => {
    if (!unist) {
      unist = await import('unist-util-visit');
    }

    if (!biblio) {
      biblio = JSON.parse(await fs.readFile(path.join(__dirname, 'bibliography.json'), 'utf8'));
      Object.entries(biblio).forEach(([key, value]) => { value.id = key });
    }

    // collect all cites
    const cited = [];
    unist.visit(tree, 'text', (node, ix, parent) => {
      const text = node.value;
      const match = text.match(citeExtrator);
      if (!match) {
        return;
      }

      const inline = !!match.groups.id1;
      const id = match.groups.id1 || match.groups.id2;
      const what = match.groups.what1 || match.groups.what2;

      if (!cited.includes(id)) {
        cited.push(id);
      }

      const startIx = match.index;
      const endIx = match.index + match[0].length;

      const children = [
        { type: 'text', value: text.slice(0, startIx) },
        { type: 'raw', value: formatCitation(id, cited.length, inline, what) },
        { type: 'text', value: text.slice(endIx) },
      ];

      parent.children = [
        ...parent.children.slice(0, ix),
        ...children,
        ...parent.children.slice(ix + 1),
      ];
    });

    // print the references
    tree.children.push({
      type: 'element',
      tagName: 'section',
      children: [
        {
          type: 'element',
          tagName: 'h2',
          properties: {
            id: 'references',
          },
          children: [{ type: 'text', value: 'References' }]
        },
        {
          type: 'element',
          tagName: 'ol',
          properties: {
            class: "reference-list",
            type: "a",
          },
          children: cited.map(id => {
            if (!(id in biblio)) {
              if (env === "production") {
                throw new Error("unknown reference id: " + id);
              } else {
                console.error("unknown reference id: ", id);
                return {
                  type: 'element',
                  tagName: 'li',
                  children: [{ type: 'text', value: `UNKNOWN REFERENCE '${id}'` }],
                };
              }
            }

            return {
              type: 'element',
              tagName: 'li',
              children: [{ type: 'raw', value: references.renderReference(biblio[id]) }],
            };
          }),
        },
      ],
    })
  };
}
