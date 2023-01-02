const { renderReference } = require('../references');
const fs = require('node:fs/promises');
const path = require('path');
const { IS_PRODUCTION } = require('../helpers');

exports.data = {
    title: "Bibliography",
    layout: "layout"
};

function sortKey(r) {
    return `${r.author ? (r.author[0].family || '') : (r.publisher || '')}
        ${r.author ? (r.author[0].given === 'string' ? r.author[0].given : r.author[0].given[0]) : ''}
        ${r.issued ? r.issued.year : ''}
        ${r.title}`;
}

// matches that in .eleventy.js - TODO extract
const citeExtrator = /((?<!\w)@(?<id1>(_|[^\s\p{P}])+)(\s+\[(?<what1>[^\]]+)\])?)|(\[@(?<id2>(_|[^\s\p{P}])+)(,?\s+(?<what2>[^\]]+))?\])/ug;

function buildLookup(coll, refs) {
    for (const c of coll) {
        const content = c.template.inputContent;
        const cites = content.matchAll(citeExtrator);
        const processed = new Map();
        for (const cite of cites) {
            const id = cite.groups.id1 || cite.groups.id2;
            if (!processed.has(id)) {
                refs.set(id, [...(refs.get(id) || []), c]);
                processed.set(id, true);
            }
        }
    }
}

function renderBackreferences(ref, refs) {
    let backrefs = refs.get(ref.id);
    if (backrefs === undefined) {
        return "";
    }

    // exclude drafts in production
    backrefs = backrefs.filter(x => !IS_PRODUCTION || !x.data.draft);

    // sort by title
    backrefs.sort((x, y) => x.data.title.localeCompare(y.data.title, 'en'));

    return '<ul class="backreferences">' + backrefs.map(b => `<li><a href="${b.url}">${b.data.title}</a></li>`).join("") + '</ul>';
}

exports.render = async function (data) {
    const refs = new Map();
    buildLookup(data.collections.article, refs);
    buildLookup(data.collections.game, refs);
    const locale = new Intl.Collator('en');
    const file = await fs.readFile(path.join(__dirname, "../bibliography.json"), 'utf8');
    const biblio = Object.entries(JSON.parse(file)).map(([k, v]) => ({ ...v, id: k, sortKey: sortKey(v) }));
    biblio.sort((x, y) => locale.compare(x.sortKey, y.sortKey));
    return '<div class="container">'
        + `<h1>${data.title}</h1>`
        + '<form class="mb-4">'
        + '<div class="form-group row">'
        + '<label for="sort-selector" class="col-lg-1 offset-lg-4 col-form-label text-end">Sort by:</label>'
        + '<div class="col-lg-3">'
        + '<select id="sort-selector" class="form-control">'
        + '<option selected value="key">default</option>'
        + '<option value="year asc">year (ascending)</option>'
        + '<option value="year desc">year (descending)</option>'
        + '<option value="refs desc">references (most)</option>'
        + '<option value="refs asc">references (least)</option>'
        + '</select>'
        + '</div>'
        + '</div>'
        + '</form>'
        + '<p class="text-center">❦</p>'
        + '<div class="row">'
        + `<ul id="ref-list" class="reference-list list-unstyled offset-lg-2 col-lg-8">\n${biblio.map(b => {
            const year =
                typeof b.issued === 'number'
                ? b.issued
                : typeof b.issued === 'object'
                    ? b.issued.year
                    : typeof b.filed === 'object'
                        ? b.filed.year
                        : 0;
            return `<li data-refs="${refs.get(b.id)?.length ?? 0}" data-key="${b.sortKey.replaceAll('"', '&quot;')}" data-year="${year}">`
                + renderReference(b)
                + renderBackreferences(b, refs)
                + `</li>`;
        }).join("\n")}\n</ul>`
        + '</div>'
        + '</div>'
        + `<script type="module">
            ${runSort}
            document.addEventListener("DOMContentLoaded", () => {
                const selector = document.getElementById('sort-selector');
                selector.addEventListener('change', () => runSort(selector.value));
            })
        </script>`;
}

/**
 * @param {string} on 
 */
function runSort(on) {
    const parts = on.split(' ');
    const key = `data-${parts[0]}`;
    const multiplier = parts[1] === 'desc' ? -1 : 1;
    const el = document.getElementById('ref-list');
    const comparer = new Intl.Collator('en', { numeric: true });
    const children = [...el.children].sort((x, y) => multiplier * comparer.compare(x.getAttribute(key), y.getAttribute(key)));
    el.replaceChildren(...children);
}
