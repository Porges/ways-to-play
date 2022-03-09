const { renderReference } = require('../references');
const fs = require('node:fs/promises');
const path = require('path');

exports.data = {
    title: "Bibliography",
    layout: "layout"
};


function sortKey (r) {
    return `${r.author ? (r.author[0].family || '') : (r.publisher || '')}
        ${r.author ? (r.author[0].given === 'string' ? r.author[0].given : r.author[0].given[0]) : ''}
        ${r.issued ? r.issued.year : ''}
        ${r.title}`;
}

exports.render = async function (data) {
    const file = await fs.readFile(path.join(__dirname, "../bibliography.json"), 'utf8');
    const biblio = Object.entries(JSON.parse(file)).map(([k, v]) => ({...v, id: k, sortKey: sortKey(v)}));
    biblio.sort((x, y) => x.sortKey.localeCompare(y.sortKey, 'en'));
    return '<div class="container">'
        +`<h1>${data.title}</h1>`
        +'<div class="row">'
        +`<ul class="reference-list list-unstyled offset-2 col-8">\n${biblio.map(b => `<li>${renderReference(b)}</li>`).join("\n")}\n</ul>`
        +'</div>'
        +'</div>';
}
