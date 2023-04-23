import { expect, test } from '@jest/globals';

import { nameMatcher } from './game-names-index.11ty';

function groups(str: string) {
    return [...str.matchAll(nameMatcher)].map(x => x.groups);
}

test('aka regex tests', () => {
    expect(groups("")).toEqual([]);
    expect(groups("<span>foo</span>")).toEqual([]);
    expect(groups('<span class="aka">foo</span>')).toEqual([{name: "foo"}]);
    expect(groups('<span class="noun aka">foo</span>')).toEqual([{name: "foo"}]);
    expect(groups('<span lang="fr" class="noun aka">foo</span>')).toEqual([{lang: "fr", name: "foo"}]);
    expect(groups('<span class="noun aka" lang="fr">foo</span>')).toEqual([{lang: "fr", name: "foo"}]);
    expect(groups('<span class="pronunciation noun aka" lang="so" title="Pronunciation © ‘ahmed_aw_abdi’ CC-BY-NC-SA 3.0, courtesy of Forvo.com." onclick="this.previousSibling.play()">Shax</span>')).toEqual([{lang: "so", name: "Shax"}]);
});
