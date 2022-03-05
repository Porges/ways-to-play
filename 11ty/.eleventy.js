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

  eleventyConfig.addPairedShortcode("footnote", function(content, standalone) {
    if (standalone === 'standalone') {
      return `<aside role="note" class="footnote">${content}</aside>`;
    }

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

const organizationPropTypes = {
  orgName: PropTypes.string.isRequired,
  orgAbbr: PropTypes.string,
  orgLang: PropTypes.string,
  orgUrl: PropTypes.string,
  itemProp: PropTypes.string,
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
  let { orgName, orgAbbr, orgLang, orgURL, itemProp } = props;
  let content = orgAbbr
    ? `<meta itemProp="name" content="${orgName}" /><abbr title="${orgName}">${orgAbbr}</abbr>`
    : `<span itemProp="name">${orgName}</span>`;


  if (orgURL) {
    content = `<a href="${orgURL}">${content}</a>`;
  }

  return (
    `<span itemScope itemType="http://schema.org/Organization"${ifSet(orgLang, ` lang="${orgLang}"`)}${ifSet(itemProp, ` itemProp="${itemProp}"`)}>
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
  itemProp: PropTypes.string,
  sameAs: PropTypes.string,
  worksFor: PropTypes.exact(organizationPropTypes),
};

/**
 * @param {Object} props
 * @param {Name} props.name
 * @param {string=} props.innerId
 * @param {string=} props.id
 * @param {string=} props.url
 * @param {string=} props.itemProp
 * @param {string=} props.sameAs
 * @param {Organization=} props.worksFor
 * @returns {string}
 */
function person(props) {
  PropTypes.checkPropTypes(personPropTypes, props, 'props', 'person');
  const { id, itemProp, innerId, url, sameAs, worksFor } = props;
  let name = typeof props.name === 'string'
    ? { name: props.name }
    : props.name;
  return `
    <span itemScope itemType="http://schema.org/Person"${asAttr("id", id)}${asAttr("itemProp", itemProp)}>
      <span${asAttr("id", innerId)}>
        ${ifSet(url, `<link href="${url}" itemProp="url" />`)}
        ${ifSet(sameAs, `<link href="${sameAs}" itemProp="sameAs" />`)}
        ${ifSet(worksFor, () => organization({ ...worksFor, itemProp: "worksFor" }))}
        <span itemProp="name"${ifSet(name.lang, ` lang=="${name.lang}"`)}>
          ${'name' in name
      ? name.name
      : name.familyFirst // note: also no space for family-first names, at the moment
        ? `<span itemProp="familyName">${name.family}</span><span itemProp="givenName">${name.given}</span>`
        : `<span itemProp="givenName">${name.given}</span> <span itemProp="familyName">${name.family}</span>`
    }
        </span>
      </span>
    </span>`;
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

  return (`${ifSet(leading, ' ')}<a itemProp="license" href="${href}" title="${title}"${asAttr("rel", rel)}>
      ${license === 'gpl'
      ? `<img src="/images/gpl.svg" alt=${`GPLv${version}`} width={14} height={14} />`
      : parts.map(charForLicense).join('\u{200a}')
    }
    </a>`);
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
  PropTypes.checkPropTypes(articleImagePropTypes, props, 'props', 'articleImage');

  const { alt, src, noborder, mainImage, cram, source, position, size } = props;

  const basedSrc = path.join(path.dirname(this.page.inputPath), src);

  const metadata = await Image(basedSrc, {
    widths: [300, 600, 800, 1200, 1600, null],
    formats: [null],
    outputDir: "public/img",
  });


  const className = `${position || ''} ${size || ''} ${cram ? 'cram' : ''}`;
  // sizes are from Bootstrap breakpoints: https://getbootstrap.com/docs/4.3/layout/overview/ 
  const sizes =
    size === 'extra-wide'
      ? "(max-width: 575.98px) 300px, (max-width: 991.98px) 600px, (max-width: 1199.98px) 800px, 1000px"
      : size === 'wide'
        ? "(max-width: 575.98px) 300px, (max-width: 991.98px) 600px, 800px"
        : "(max-width: 575.98px) 300px, 600px";

  // console.log(metadata);
  let original = metadata.jpeg[metadata.jpeg.length - 1];
  return `<figure class="figure" itemProp="image" itemScope itemType="${imageObject}">
<img src="${original.url}" width="${original.width}" height="${original.height}" alt="${alt}">
<figcaption class="text-center">
${caption ? `<span itemProp="caption">
${caption /* NB: must appear on its own line to get Markdown formatting… */}
</span>
<br/>` : ''}
</figcaption>
</figure>`;
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
          return `<span className="citation">[<a href="${`#ref-${id}`}">${indicator}</a>]${ifSet(suffix, ` (${suffix})`)}</span>`
      }
    } else {
      return `<sup className="citation"><a href="${`#ref-${id}`}">${indicator}</a>${ifSet(suffix, `[${suffix}]`)}</sup>`;
    }
  };

  const citeExtrator = /((?<!\w)@(?<id1>\w+)(\s+\[(?<what1>[^\]]+)\])?)|(\[@(?<id2>\w+)(\s+(?<what2>[^\]]+))?\])/;

  return async (tree, _file) => {
    //console.log(tree);

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

      console.log({id, what, inline});

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
        { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'References' }] },
        {
          type: 'element',
          tagName: 'ol',
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
