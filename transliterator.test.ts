import { it, expect, describe, test } from '@jest/globals';

import { translit, indic } from './transliterator';

import { dict as hindi_tests } from './hindi_testdata';
import { dict as bengali_tests } from './bengali_testdata';

it("should be good", () => {
    expect(translit("जें")).toEqual("jēṁ");
    expect(translit("एजें")).toEqual("ējēṁ");
    expect(translit("हॉकिंस")).toEqual("hôkiṁsa");
    expect(translit("പീച്ചാംകുഴൽ")).toEqual("pīccāṅkuḻal");
    expect(translit("Борис Николаевич Ельцин")).toEqual("Boris Nikolaevič Elʹcin");
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
        ["स्रंसिन्", "sraṁsin"],
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
        // ambiguity
        ["ൻന", "n:na"],
        ["ന്ന", "nna"],
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
        //["र्य", "r:ya"], // unsure how this is constructed in the example
        ["र्‍", "r̆"], // "eyelash R" as used in Nepali/Marathi
        ["सय्ँयन्ता", "sam̐yyantā"],
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

// these were table-driven tests but that was too slow:

it('Hindi tests', () => {
    for (const [input, output] of hindi_tests) {
        expect(translit(input)).toEqual(output);
    }
});

/*
it('Bengali tests', () => {
    for (const [input, output] of bengali_tests) {
        expect(translit(input)).toEqual(output);
    }
});
*/

it('Bengali cases', () => {
    const tests = [
        ["মন", "mana"],
        ["সাপ", "sāpa"],
        ["শাপ", "śāpa"],
        ["মত", "mata"],
        ["মতো", "matō"],
        ["তেল", "tēla"],
        ["গেল", "gēla"],
        ["জ্বর", "jbara"],
        ["স্বাস্থ্য", "sbāsthya"],
        ["বাংলাদেশ", "bāṁlādēśa"],
        ["ব্যঞ্জনধ্বনি", "byañjanadhbani"],
        ["আত্মহত্যা", "ātmahatyā"],
        ["ৰৱ", "rava"], // Assamese
    ];

    for (const [input, output] of tests) {
        expect(translit(input)).toEqual(output);
    }
});
