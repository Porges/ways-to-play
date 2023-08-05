import { it, expect, describe, test } from '@jest/globals';

import { translit } from './transliterator';

import { hindi } from './transliteration_testdata';

it("should be good", () => {
    expect(translit("जें")).toEqual("jē̃");
    expect(translit("एजें")).toEqual("ējē̃");
    expect(translit("हॉकिंस")).toEqual("hôkĩsa");
    expect(translit("പീച്ചാംകുഴൽ")).toEqual("pīccāṅkuḻal");
});

describe("unicode tests", () => {
    const tests = [
        ["ऱ्", "ṟ"],
    ];

    it.each(tests)("check %s", (input, output) => {
        expect(translit(input)).toEqual(output);
    });
})

describe("tests from salita", () => {
    // https://github.com/mbykov/salita/blob/master/test/tests.js
    const tests = [
        ["सत्य", "satya"],
        ["सत्यानृत", "satyānr̥ta"],
        ["राम", "rāma"],
        ["अपसलैः", "apasalaiḥ"],
        ["स्रंसिन्", "srãsin"],
        ["संका", "saṅkā"],
        ["कॢप्त", "kl̥pta"],
        ["उपनिषत्", "upaniṣat"],
        ["ऋद्धि", "r̥ddhi"],
    ];

    it.each(tests)("check %s", (input, output) => {
        expect(translit(input)).toEqual(output);
    });
});

describe("Malayalam special forms", () => {
    const tests = [
        // ra:
        ["ര", "ṟa"], // special at end
        ["രമ", "rama"], // normal at medial
        // ya:
        ["യ്", "y"], // normal at end
        ["യ്മ", "y:ma"], // special at medial
        ["യ", "ya"], // shouldn't change
        ["യമ", "yama"], // shouldn't change
        // i: ambiguities
        ["ഇ", "i"],
        ["ബഇ", "ba:i"],
    ];

    it.each(tests)("check %s", (input, output) => {
        expect(translit(input)).toEqual(output);
    });
});

describe("Devanagari special cases", () => {
    const tests = [
        ["बइ", "ba:i"],
        ["बै", "bai"],
        ["र्य", "rya"],
        //["र्य", "r:ya"],
        ["र्‍", "r̆"], // "eyelash R" as used in Nepali/Marathi
    ];
    
    it.each(tests)("check %s", (input, output) => {
        expect(translit(input)).toEqual(output);
    });
});

describe("npm transliteration", () => {
    // https://github.com/dzcpy/transliteration/blob/master/test/common/transliterate.ts
    const tests = [
        ["മലയാലമ്", "malayālam"],
        ['അഭിജീത', 'abhijīta'],
        ["अभिजीत", "abhijīta"],
        // ["অভিজীত", "abhijīt"], Bengali
    ];

    it.each(tests)("check %s", (input, output) => {
        expect(translit(input)).toEqual(output);
    });
});

describe("conjuncts", () => {
    // https://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=g8w4snzcy5
    const tests = [
        ["क्ष", "kṣa"],
        ["त्र", "tra"],
        ["ज्ञ", "jña"],
        ["ष्र", "ṣra"],
        ["य़", "ẏa"],
    ];

    it.each(tests)("check %s", (input, output) => {
        expect(translit(input)).toEqual(output);
    });
});

describe('hindi tests', () => {
    it.each(hindi)("check %s", (input, output) => {
        expect(translit(input)).toEqual(output);
    });
});
