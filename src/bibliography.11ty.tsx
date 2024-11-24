import * as fs from 'node:fs/promises';
import * as jsyaml from 'js-yaml';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { IS_PRODUCTION } from '../helpers.js';

import { Reference, Bibliography, LStr, referenceValidator, BiblioRef, sortableDate } from '../references-schema.js';
import { renderReference, safeHTML } from '../references.js';
import { Data } from '../types.js';

export const data = {
    title: "Bibliography of Traditional Games",
    layout: "layout.11ty.js",
    eleventyImport: {
        collections: ["article", "game"]
    },
    script: `${handleSelect}
        ${runSort}
        ${compareKeys}
        document.addEventListener("DOMContentLoaded", () => {
            const selector = document.getElementById('sort-selector');
            selector.addEventListener('change', () => handleSelect(selector.value));
            const params = new URLSearchParams(window.location.search);
            const sort = params.get('sort') || 'name,year';
            selector.value = sort;
            handleSelect(selector.value);
        });`
};

function lStrValue(l: LStr): string {
    if (typeof l === 'string') {
        return l;
    }

    if (typeof l.value === 'string') {
        return l.value;
    }
    
    if (typeof l.value === 'object') {
        return renderToStaticMarkup(l.value);
    }
    
    throw "malformed LStr";
}

function sortName(r: Reference): string {
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

function renderBackreferences(ref: BiblioRef, refs: Map<string, any[]>): React.JSX.Element | null {
    let backrefs = refs.get(ref.id);
    if (backrefs === undefined) {
        return null;
    }

    // sort by title
    backrefs.sort((x, y) => x.data.title.localeCompare(y.data.title, 'en'));

    return (
        <ul className="backreferences">
            {backrefs.map((b, ix) => <li key={ix}><a href={b.url} dangerouslySetInnerHTML={safeHTML(b.data.title)} /></li>)}
        </ul>
    );
}

export async function render(data: Data) {
    const refs = new Map();
    await buildLookup(data.collections.article, refs);
    await buildLookup(data.collections.game, refs);
    const locale = new Intl.Collator('en', { numeric: true, ignorePunctuation: true });
    const file = await fs.readFile(new URL("../bibliography.yaml", import.meta.url), 'utf8');
    const parsedFile = jsyaml.load(file);
    if (!referenceValidator(parsedFile)) {
        throw new Error(`Invalid bibliography: ${referenceValidator.errors}`);
    }

    const biblio = Object.entries(parsedFile as Bibliography).map(([k, v]) => ({ ...v, id: k, sortName: sortName(v), sortDate: sortableDate(v) }));
    biblio.sort((x, y) => locale.compare(x.sortName, y.sortName) || locale.compare(x.sortDate, y.sortDate));
    return (<>
        <form>
            <div className="form-group row">
                <label htmlFor="sort-selector" className="col-lg-1 offset-lg-4 col-form-label text-end">Sort by:</label>
                <div className="col-lg-3">
                    <select id="sort-selector" className="form-control">
                        <option selected value="name,year">default</option>
                        <option value="year asc">year (ascending)</option>
                        <option value="year desc">year (descending)</option>
                        <option value="refs desc">references (most)</option>
                        <option value="refs asc">references (least)</option>
                    </select>
                </div>
            </div>
        </form>
        <p className="text-center"><i>{biblio.length} works</i></p>
        <div className="row">
            <ul id="ref-list" className="reference-list">
                {biblio.map((b, ix) =>
                    <li key={ix} data-refs={refs.get(b.id)?.length ?? 0} data-name={b.sortName} data-year={b.sortDate}>
                        {renderReference(b)}
                        {renderBackreferences(b, refs)}
                    </li>
                )}
            </ul>
        </div>
    </>);
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
    children.forEach(({ el }) => frag.appendChild(el));
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
