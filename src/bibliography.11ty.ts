import * as fs from 'node:fs/promises';
import * as path from 'path';
import * as jsyaml from 'js-yaml';

import { IS_PRODUCTION } from '../helpers';

import { Reference, Bibliography, LStr, referenceValidator, BiblioRef, sortableDate } from '../references-schema';
import { renderReference } from '../references';
import { Data } from '../types';

export const data = {
    title: "Bibliography of Traditional Games",
    layout: "layout",
    eleventyImport: {
        collections: ["article", "game"]
    }
};

function lStrValue(l: LStr) {
    if (typeof l === 'string') {
        return l;
    }

    return l.value;
}

function sortName(r: Reference) {
    if (r.author) {
        return `${r.author[0].family || ''} ${r.author[0].given}`;
    }

    const editor = 'editor' in r ? r.editor : null;
    if (editor) {
        return `${editor[0].family || ''} ${editor[0].given}`;
    }

    const publisherS =
        'publisher' in r
            ? r.publisher
            : 'in' in r
                ? r.in.publisher
                : undefined;

    return publisherS ? lStrValue(publisherS) : '';
}

// matches that in .eleventy.js - TODO extract
const citeExtrator = /((?<!\w)@(?<id1>(_|[^\s\p{P}])+)(\s+\[(?<what1>[^\]]+)\])?)|(\[@(?<id2>(_|[^\s\p{P}])+)(,?\s+(?<what2>[^\]]+))?\])/ug;

async function buildLookup(coll: any[], refs: Map<string, any[]>) {
    for (const c of coll) {
        if (c.data.draft && IS_PRODUCTION) {
            // exclude drafts in production
            continue;
        }

        const content = await c.template.inputContent as string;
        const cites = content.matchAll(citeExtrator);
        const processed = new Map();
        for (const cite of cites) {
            const id = cite.groups!.id1 || cite.groups!.id2;
            if (!processed.has(id)) {
                refs.set(id, [...(refs.get(id) || []), c]);
                processed.set(id, true);
            }
        }
    }
}

function renderBackreferences(ref: BiblioRef, refs: Map<string, any[]>) {
    let backrefs = refs.get(ref.id);
    if (backrefs === undefined) {
        return "";
    }

    // sort by title
    backrefs.sort((x, y) => x.data.title.localeCompare(y.data.title, 'en'));

    return '<ul class="backreferences">' + backrefs.map(b => `<li><a href="${b.url}">${b.data.title}</a></li>`).join("") + '</ul>';
}

export async function render(data: Data) {
    const refs = new Map();
    await buildLookup(data.collections.article, refs);
    await buildLookup(data.collections.game, refs);
    const locale = new Intl.Collator('en', { numeric: true, ignorePunctuation: true });
    const file = await fs.readFile(path.join(__dirname, "../bibliography.yaml"), 'utf8');
    const parsedFile = jsyaml.load(file);
    if (!referenceValidator(parsedFile)) {
        throw new Error(`Invalid bibliography: ${referenceValidator.errors}`);
    }

    const biblio = Object.entries(parsedFile as Bibliography).map(([k, v]) => ({ ...v, id: k, sortName: sortName(v), sortDate: sortableDate(v) }));
    biblio.sort((x, y) => locale.compare(x.sortName, y.sortName) || locale.compare(x.sortDate, y.sortDate) );
    return '<div class="container">'
        + `<h1>${data.title}</h1>`
        + '<form class="mb-4">'
        + '<div class="form-group row">'
        + '<label for="sort-selector" class="col-lg-1 offset-lg-4 col-form-label text-end">Sort by:</label>'
        + '<div class="col-lg-3">'
        + '<select id="sort-selector" class="form-control">'
        + '<option selected value="name,year">default</option>'
        + '<option value="year asc">year (ascending)</option>'
        + '<option value="year desc">year (descending)</option>'
        + '<option value="refs desc">references (most)</option>'
        + '<option value="refs asc">references (least)</option>'
        + '</select>'
        + '</div>'
        + '</div>'
        + '</form>'
        + `<p class="text-center"><i>${biblio.length} works</i></p>`
        + '<div class="row">'
        + `<ul id="ref-list" class="reference-list list-unstyled offset-lg-2 col-lg-8">\n${biblio.map(b => {
            return `<li data-refs="${refs.get(b.id)?.length ?? 0}" data-name="${b.sortName.replaceAll('"', '&quot;')}" data-year="${b.sortDate}">`
                + renderReference(b)
                + renderBackreferences(b, refs)
                + `</li>`;
        }).join("\n")}\n</ul>`
        + '</div>'
        + '</div>'
        + `<script type="module">
            ${handleSelect}
            ${runSort}
            ${compareKeys}
            document.addEventListener("DOMContentLoaded", () => {
                const selector = document.getElementById('sort-selector');
                selector.addEventListener('change', () => handleSelect(selector.value));
                
                const params = new URLSearchParams(window.location.search);
                const sort = params.get('sort') || 'name,year';
                selector.value = sort;
                handleSelect(selector.value);
            })
        </script>`;
}

function handleSelect(on: string) {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', on);
    window.history.pushState(null, null!, '?' + params.toString());
    runSort(on);
}

function runSort(on: string) {
    const parts = on.split(' ');
    const keys = parts[0].split(',').map(attr => `data-${attr}`);
    const comparer = new Intl.Collator('en', { numeric: true, ignorePunctuation: true });
    const multiplier = parts[1] === 'desc' ? -1 : 1;
    const el = document.getElementById('ref-list')!;
    const children =
        Array.prototype.slice.call(el.children)
            .map(el => ({ el, keys: keys.map(k => el.getAttribute(k)) }))
            .sort((x, y) => multiplier * compareKeys(x.keys, y.keys, comparer));
    const frag = document.createDocumentFragment();
    children.forEach(({el}) => frag.appendChild(el));
    el.appendChild(frag);
}

function compareKeys(xKeys: string[], yKeys: string[], comparer: Intl.Collator) {
    for (let i = 0; i < xKeys.length; ++i) {
        const result = comparer.compare(xKeys[i], yKeys[i]);
        if (result !== 0) {
            return result;
        }
    }

    return 0;
}
