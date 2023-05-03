const eleventyRemark = require('@fec/eleventy-plugin-remark');
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventyNavigation = require('@11ty/eleventy-navigation');
const PropTypes = require('prop-types');
const argParse = require('liquid-args');
const path = require('path');
const fs = require('node:fs/promises');
const slug = require('slug');
const YAML = require('yaml');

const { asAttr, ifSet, IS_PRODUCTION, isolate } = require('./helpers');
const references = require('./references');
const { articleImage, person, license, organization } = require('./images');
const referenceSchema = require('./references-schema');

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
  eleventyConfig.addWatchTarget("src/maps");
  eleventyConfig.addWatchTarget("bibliography.yaml");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("audio");
  eleventyConfig.addPassthroughCopy("small-images");
  eleventyConfig.addPassthroughCopy({ "site_root": "/" });

  eleventyConfig.addPlugin(eleventyRemark, {
    enableRehype: false,
    plugins: [
      'remark-sectionize',
      {
        plugin: 'remark-rehype',
        options: { allowDangerousHtml: true }
      },
      citationPlugin,
      addSlugs,
      {
        plugin: 'rehype-autolink-headings',
        options: {
          content: { type: 'text', value: '#' },
          properties: {
            ariaHidden: 'true',
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

  eleventyConfig.addPlugin(eleventyNavigation);

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js"
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
  });

  eleventyConfig.addShortcode("person", person);
  eleventyConfig.addShortcode("organization", organization);
  eleventyConfig.addShortcode("license", license);
  eleventyConfig.addShortcode("asAttr", asAttr);
  eleventyConfig.addShortcode("isolate", isolate);

  eleventyConfig.addShortcode("dice", dice);
  eleventyConfig.addShortcode("cdice", chinese_dice);
  eleventyConfig.addShortcode("jdice", japanese_dice);
  eleventyConfig.addShortcode("cards", cards);
  eleventyConfig.addLiquidTag("gameref", gameRef);

  eleventyConfig.addLiquidTag("a", linkToArticle);

  eleventyConfig.addShortcode("ce", () => `<abbr class="initialism">CE</abbr>`);
  eleventyConfig.addShortcode("bce", () => `<abbr class="initialism">BCE</abbr>`);
  eleventyConfig.addShortcode("c", () => `<abbr title="circa">c.</abbr>`);

  eleventyConfig.addPairedShortcode("aside", function (content) {
    return `<aside role="note" class="footnote">\n\n${content.trim()}\n\n</aside>`;
  });

  eleventyConfig.addPairedShortcode("fn", function (content) {
    return `<span class="footnote-indicator"></span><span role="note" class="footnote">${content.trim()}</span>`;
  });

  eleventyConfig.addLiquidTag("pronounce", function (liquidEngine) {
    return {
      parse: function (tagToken) {
        this.args = tagToken.args;
      },
      render: function* (scope) {
        const args = yield Promise.all(argParse(this.args, arg => liquidEngine.evalValue(arg, scope)));
        return pronunciation.call(_normalizeShortcodeScope(scope), args.find(a => a.__keywords));
      }
    }
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

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

// shortcode definitions:
function pronunciation(props) {
  const { file, lang, word, pronouncer, noun } = props;
  const klass = props['class'];
  const mp3File = file ? ('/audio/' + file) : `/audio/pronunciation_${lang}_${word.replace(/\s+/g, '_')}.mp3`;
  return `<audio preload="none" src="${mp3File}"></audio><span class="pronunciation${ifSet(noun, ' noun')}${ifSet(klass, ' ' + klass)}" lang="${lang}" title="Pronunciation © ‘${pronouncer}’ CC-BY-NC-SA 3.0, courtesy of Forvo.com." onclick="this.previousSibling.play()">${word}</span>`;
}

/**
 * @param {string|number} content 
 */
function cards(content) {
  if (typeof content === 'number') {
    return `<span class="playing-cards">${content}</span>`;
  }

  return '<span class="playing-cards">'
    + content.replace(/(1\d|.)/g, p => {
      switch (p) {
        case '10': return '⑩';
        case '11': return '⑪';
        case '12': return '⑫';
        case '13': return '⑬';
        case 's': return '♠';
        case 'c': return '♣';
        case 'h': return '<span class="red">♥</span>';
        case 'd': return '<span class="red">♦</span>';
        default: return p;
      }
    })
    + '</span>';
}

/**
 * @param {string|number} content
 */
function chinese_dice(content) {
  if (typeof content == 'number') {
    content = content.toString(10)
  }

  return content.replace(/./g, c => `<img class="inline-img" alt="${c}" src="/small-images/d6_chinese/d6_${c}.svg" />`);
}

/**
 * @param {string|number} content
 */
function japanese_dice(content) {
  if (typeof content == 'number') {
    content = content.toString(10)
  }

  return content.replace(/./g, c => `<img class="inline-img" alt="${c}" src="/small-images/d6_japanese/d6_${c}.svg" />`);
}

/**
 * @param {string|number} content
 */
function dice(content) {
  if (typeof content == 'number') {
    content = content.toString(10)
  }

  return content.replace(/./g, c => `<img class="inline-img" alt="${c}" src="/small-images/d6/d6_${c}.svg" />`);
}

function linkToArticle() {
  return {
    parse: function (tagToken) {
      this.args = tagToken.args.split(',');
    },
    render: async function(context) {
      const articles = context.environments.collections.article;
      const [slug, fragment] = this.args[0].split('#');
      const article = articles.find(a => a.fileSlug === slug);
      if (!article) {
        throw new Error(`no such article found: ${slug}`);
      }

      const linkText = this.args.length > 1 ? this.args.slice(1).join(",") : article.data.title;
      if (IS_PRODUCTION && article.data.draft) {
        // don't link drafts in production
        return linkText;
      }

      return `<a href="${article.url}${fragment ? ('#' + fragment) : ''}">${linkText}</a>`;
    }
  }
}

//figured out via https://github.com/11ty/eleventy/issues/813#issuecomment-1037834776
function gameRef() {
  return {
    parse: function (tagToken) {
      this.ref = tagToken.args;
    },
    render: async function (context) {
      const games = context.environments.collections.game;
      const gameArticle = games.find(g => g.fileSlug === this.ref);
      if (gameArticle) {
        if (IS_PRODUCTION && gameArticle.data.draft) {
          // don't link drafts in production
          return `<span${asAttr('lang', gameArticle.data.titleLang)}>${gameArticle.data.title}</span>`;
        }

        return `<a href="${gameArticle.url}"${asAttr('lang', gameArticle.data.titleLang)}>${gameArticle.data.title}</a>`;
      }

      // try to find a sub-article
      for (g of games) {
        if (g.data.subgames) {
          for (sg of g.data.subgames) {
            const s = sg.slug || slug(sg.title);
            if (s === this.ref) {
              if (IS_PRODUCTION && g.data.draft) {
                // don't link drafts in production
                return `<span${asAttr('lang', sg.titleLang)}>${sg.title}</span>`;
              }

              return `<a href="${g.url}#${s}"${asAttr('lang', sg.titleLang)}>${sg.title}</a>`;
            }
          }
        }
      }

      if (IS_PRODUCTION) {
        throw new Error(`unknown game reference: ${this.ref}`);
      } else {
        console.log('Unknown game ref: ', this.ref);
        return `UNKNOWN GAME REF: ${this.ref}`;
      }
    }
  }
}

// altered from: https://github.com/rehypejs/rehype-slug/blob/main/index.js
const addSlugs = () => {
  let imports = undefined;
  return async tree => {
    if (!imports) {
      imports = {
        hasProperty: (await import('hast-util-has-property')).hasProperty,
        headingRank: (await import('hast-util-heading-rank')).headingRank,
        toString: (await import('hast-util-to-string')).toString,
        visit: (await import('unist-util-visit')).visit,
      };
    }

    imports.visit(tree, 'element', node => {
      if (imports.headingRank(node) && node.properties && !imports.hasProperty(node, 'id')) {
        node.properties.id = slug(imports.toString(node).normalize("NFKD"));
      }
    })
  }
}

let biblio = undefined;
let biblioLastModified = undefined;
let unist = undefined;
const citationPlugin = () => {
  const indexToString = (/** @type {number} */ index) => {
    let result = "";

    while (index > 0) {
      const num = (index - 1) % 26;
      result = String.fromCodePoint('A'.charCodeAt(0) + num) + result
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
            + references.renderLStr(reference.title, 'cite', {})
            + `</a>`
            + ifSet(suffix, ` (${suffix})`);
        case 'chapter':
        case 'paper-conference':
        case 'article-journal':
        case 'thesis':
          if (reference.author) {
            return `<a href="${`#ref-${id}`}">${reference.author[0].family}</a>`
              + ` (${referenceSchema.publicationYear(reference)}${ifSet(suffix, `, ${suffix}`)})`;
          }
      }

      return `<span class="citation inline">[<a href="${`#ref-${id}`}" class="index">${indicator}</a>]${ifSet(suffix, ` (${suffix})`)}</span>`
    } else {
      return `<span class="citation"><a class="index" href="${`#ref-${id}`}">${indicator}</a>${ifSet(suffix, `[${suffix}]`)}</span>`;
    }
  };

  // matches that in bibliography.11ty.js - TODO extract
  const citeExtrator = /((?<!\w)@(?<id1>(_|[^\s\p{P}])+)(\s+\[(?<what1>[^\]]+)\])?)|(\[@(?<id2>(_|[^\s\p{P}])+)(,?\s+(?<what2>[^\]]+))?\])/u;

  return async (tree, _file) => {
    if (!unist) {
      unist = await import('unist-util-visit');
    }

    const biblioPath = path.join(__dirname, 'bibliography.yaml');
    let stat = await fs.stat(biblioPath);
    if (!biblio || stat.mtime > biblioLastModified) {
      biblio = YAML.parse(await fs.readFile(biblioPath, 'utf8'));
      if (!referenceSchema.referenceValidator(biblio)) {
        throw new Error(JSON.stringify(referenceSchema.referenceValidator.errors));
      }
      biblioLastModified = stat.mtime;
      Object.entries(biblio).forEach(([key, value]) => {
        value.id = key;
      });
    }

    // collect all cites
    const cited = [];
    function handleNode(node, ix, parent) {
      const text = node.value;
      const match = text.match(citeExtrator);
      if (!match) {
        return;
      }

      const inline = !!match.groups.id1;
      const id = match.groups.id1 || match.groups.id2;
      const what = match.groups.what1 || match.groups.what2;

      let index = cited.findIndex(x => x === id);
      if (index < 0) {
        index = cited.length;
        cited.push(id);
      }

      const startIx = match.index;
      const endIx = match.index + match[0].length;

      if (node.type === 'raw') {
        node.value = text.slice(0, startIx) + formatCitation(id, index + 1, inline, what) + text.slice(endIx);
        return handleNode(node, ix, parent);
      } else {
        const children = [
          { type: 'text', value: text.slice(0, startIx) },
          { type: 'raw', value: formatCitation(id, index + 1, inline, what) },
          { type: 'text', value: text.slice(endIx) },
        ];

        parent.children = [
          ...parent.children.slice(0, ix),
          ...children,
          ...parent.children.slice(ix + 1),
        ];
      }
    }

    unist.visit(tree, ['text', 'raw'], handleNode);

    if (cited.length > 0) {
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
              type: "A",
            },
            children: cited.map(id => {
              if (!(id in biblio)) {
                if (IS_PRODUCTION) {
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
      });
    }
  };
}
