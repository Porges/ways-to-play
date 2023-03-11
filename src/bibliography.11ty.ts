import * as fs from 'node:fs/promises';
import * as path from 'path';

import { IS_PRODUCTION } from '../helpers';

import { Reference, renderReference } from '../references';
import { Data } from '../types';

export const data = {
    title: "Bibliography",
    layout: "layout",
    eleventyImport: {
        collections: ["article", "game"]
    }
};

function sortKey(r: Reference) {
    return `${r.author ? (r.author[0].family || '') : (r.publisher || '')}
        ${r.author ? (r.author[0].given === 'string' ? r.author[0].given : r.author[0].given[0]) : ''}
        ${r.issued ? r.issued.year : ''}
        ${r.title}`;
}

// matches that in .eleventy.js - TODO extract
const citeExtrator = /((?<!\w)@(?<id1>(_|[^\s\p{P}])+)(\s+\[(?<what1>[^\]]+)\])?)|(\[@(?<id2>(_|[^\s\p{P}])+)(,?\s+(?<what2>[^\]]+))?\])/ug;

async function buildLookup(coll: any[], refs: Map<string, any[]>) {
    for (const c of coll) {
        const content = await c.template.inputContent;
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

function renderBackreferences(ref: Reference, refs: Map<string, any[]>) {
    let backrefs = refs.get(ref.id);
    if (backrefs === undefined) {
        return "";
    }

    // exclude drafts in production
    backrefs = backrefs.filter(x => !IS_PRODUCTION || !x.data.draft);

    // sort by title
    backrefs.sort((x, y) => x.data.title.localeCompare(y.data.title, 'en'));

    return '<ul class="backreferences columnarr">' + backrefs.map(b => `<li><a href="${b.url}">${b.data.title}</a></li>`).join("") + '</ul>';
}

export async function render(data: Data) {
    const refs = new Map();
    await buildLookup(data.collections.article, refs);
    await buildLookup(data.collections.game, refs);
    const locale = new Intl.Collator('en');
    const file = await fs.readFile(path.join(__dirname, "../bibliography.json"), 'utf8');
    const biblio = Object.entries<Reference>(JSON.parse(file)).map(([k, v]) => ({ ...v, id: k, sortKey: sortKey(v) }));
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

function runSort(on: string) {
    const parts = on.split(' ');
    const key = `data-${parts[0]}`;
    const comparer = new Intl.Collator('en', { numeric: true });
    const multiplier = parts[1] === 'desc' ? -1 : 1;
    const el = document.getElementById('ref-list')!;
    const children = Array.prototype.slice.call(el.children).sort((x, y) => multiplier * comparer.compare(x.getAttribute(key), y.getAttribute(key)));
    el.replaceChildren(...children);
}
