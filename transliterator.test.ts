import { it, expect, describe, test } from '@jest/globals';

import { translit } from './transliterator';

import { hindi } from './transliteration_testdata';

it("should be good", () => {
    expect(translit("जें")).toEqual("jē̃");
    expect(translit("एजें")).toEqual("ējē̃");
    expect(translit("हॉकिंस")).toEqual("hôkĩsa");
    expect(translit("പീച്ചാംകുഴൽ")).toEqual("pīccā̃kuḻal");
})

/*
describe('hindi tests', () => {
    it.each(hindi)("check %s", (input, output) => {
        expect(translit(input)).toEqual(output);
    });
});
*/
