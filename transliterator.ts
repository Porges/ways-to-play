
type Letter =
  string |
  {
    value: string,
    implicitVowel?: string,
    vowelType?: "semi" | "full"
    onNext?: [RegExp, string][],
    onPrev?: [RegExp, string][],
  }

type Mark =
  string |
  {
    value?: string,
    isVowel?: boolean,
    before?: boolean,
    onNext?: Map<string, string>,
    onVowel?: Mark,
    onSemivowel?: Mark,
  }

// TODO: this is simplified dramatically
const wordFinal = /$|\s|\P{Letter}/uy;

/*

Notes on Devanagari and related scripts:
- base consonant comes first
- then optional nukta
- then optional vowel
- then optional candrabindu
- then optional svara

Data from:
- https://web.archive.org/web/20160512163746/http://homepage.ntlworld.com:80/stone-catend/trind.htm
- https://transliteration.eki.ee/pdf/Hindi-Marathi-Nepali.pdf
- https://transliteration.eki.ee/pdf/Malayalam.pdf
- https://transliteration.eki.ee/pdf/Kannada.pdf

*/

const letters = expand(new Map<string | string[], Letter>([
  // ISO 15919
  // - Devanagari, Malayalam, Kannada
  [["ऽ", "ഽ", "ಽ"], "’"],
  [["अ", "അ", "ಅ"], { value: "a", vowelType: "full" }],
  [["आ", "ആ", "ಆ"], { value: "ā", vowelType: "full" }],
  [["इ", "ഇ", "ಇ"], {
    value: "i",
    vowelType: "full",
    onPrev: [
      // if previous is letter with no vowel mark
      // (so it will be -a), this is 'a:i' to distinguish from 'ai'
      // really this should test that previous is also a script character
      // but can't do that without /v which is unsupported in Node currently.
      // this would be simpler if we checked upon the transliterated output...
      [/(?<=\p{Letter})(?<![आആಆइഇಇईഈಈउഉಉ])/uy, ":i"]
    ]
  }],
  [["ई", "ഈ", "ಈ"], { value: "ī", vowelType: "full" }],
  [["उ", "ഉ", "ಉ"], {
    value: "u",
    vowelType: "full",
    onPrev: [
      // if previous is letter with no vowel mark
      // (so it will be -a), this is 'a:u' to distinguish from 'au'
      // really this should test that previous is also a script character
      // but can't do that without /v which is unsupported in Node currently.
      // this would be simpler if we checked upon the transliterated output...
      [/(?<=\p{Letter})(?<![आആಆइഇಇईഈಈउഉಉ])/uy, ":u"]
    ]
  }],
  [["ऊ", "ഊ", "ಊ"], { value: "ū", vowelType: "full" }],
  [["ऋ", "ഋ", "ಋ"], { value: "r̥", vowelType: "semi" }],
  [["ॠ", "ൠ", "ಌೠ"], { value: "r̥̄", vowelType: "semi" }],
  [["ऌ", "ഌ", "ಌ"], { value: "l̥", vowelType: "semi" }],
  [["ॡ", "ൡ", "ೡ"], { value: "l̥̄", vowelType: "semi" }],
  [["ऍ", /* - - */], { value: "ê", vowelType: "full" }],
  [["ऎ", "എ", "ಎ"], { value: "e", vowelType: "full" }],
  [["ए", "ഏ", "ಏ"], { value: "ē", vowelType: "full" }],
  [["ऐ", "ഐ", "ಐ"], { value: "ai", vowelType: "full" }],
  [["ऑ", /* - - */], { value: "ô", vowelType: "full" }],
  [["ऒ", "ഒ", "ಒ"], { value: "o", vowelType: "full" }],
  [["ओ", "ഓ", "ಓ"], { value: "ō", vowelType: "full" }],
  [["औ", "ഔ", "ಔ"], { value: "au", vowelType: "full" }],
  [["क", "ക", "ಕ"], { value: "k", implicitVowel: "a" }],
  [["ख", "ഖ", "ಖ"], { value: "kh", implicitVowel: "a" }],
  [["ग", "ഗ", "ಗ"], { value: "g", implicitVowel: "a" }],
  [["घ", "ഘ", "ಘ"], { value: "gh", implicitVowel: "a" }],
  [["ङ", "ങ", "ಙ"], { value: "ṅ", implicitVowel: "a" }],
  [["च", "ച", "ಚ"], { value: "c", implicitVowel: "a" }],
  [["छ", "ഛ", "ಛ"], { value: "ch", implicitVowel: "a" }],
  [["ज", "ജ", "ಜ"], { value: "j", implicitVowel: "a" }],
  [["झ", "ഝ", "ಝ"], { value: "jh", implicitVowel: "a" }],
  [["ञ", "ഞ", "ಞ"], { value: "ñ", implicitVowel: "a" }],
  [["ट", "ട", "ಟ"], { value: "ṭ", implicitVowel: "a" }],
  [["ठ", "ഠ", "ಠ"], { value: "ṭh", implicitVowel: "a" }],
  [["ड", "ഡ", "ಡ"], { value: "ḍ", implicitVowel: "a" }],
  [["ढ", "ഢ", "ಢ"], { value: "ḍh", implicitVowel: "a" }],
  [["ण", "ണ", "ಣ"], { value: "ṇ", implicitVowel: "a" }],
  [["त", "ത", "ತ"], { value: "t", implicitVowel: "a" }],
  [["थ", "ഥ", "ಥ"], { value: "th", implicitVowel: "a" }],
  [["द", "ദ", "ದ"], { value: "d", implicitVowel: "a" }],
  [["ध", "ധ", "ಧ"], { value: "dh", implicitVowel: "a" }],
  [["न", "ന", "ನ"], { value: "n", implicitVowel: "a" }],
  [["ऩ", /*- -*/], { value: "ṉ", implicitVowel: "a" }],
  [["प", "പ", "ಪ"], { value: "p", implicitVowel: "a" }],
  [["फ", "ഫ", "ಫ"], { value: "ph", implicitVowel: "a" }],
  [["ब", "ബ", "ಬ"], { value: "b", implicitVowel: "a" }],
  [["भ", "ഭ", "ಭ"], { value: "bh", implicitVowel: "a" }],
  [["म", "മ", "ಮ"], { value: "m", implicitVowel: "a" }],
  [["य", /*,*/ "ಯ"], { value: "y", implicitVowel: "a" }],
  ["യ", {
    value: "y",
    implicitVowel: "a",
    onNext: [
      [/(?<=്)\p{Letter}/uy, "y:"] // special medial form for suppressed vowel in Malayalam
    ]
  }],
  ["र", {
    value: "r",
    implicitVowel: "a",
    onNext: [
      [/(?<=्\u200d)/uy, "r̆"] // special case for "eyelash-R" in Nepali/Marathi
    ]
  }],
  ["ര", {
    value: "r",
    implicitVowel: "a",
    onNext: [
      [wordFinal, "ṟ"] // special final form in Malayalam
    ]
  }],
  [["ರ"], { value: "r", implicitVowel: "a" }],
  [["ऱ", "റ", "ಱ"], { value: "ṟ", implicitVowel: "a" }], // TODO: Malayalam special final form
  [["ल", "ല", "ಲ"], { value: "l", implicitVowel: "a" }],
  [["ळ", "ള", "ಳ"], { value: "ḷ", implicitVowel: "a" }],
  [["ऴ", "ഴ", "ೞ"], { value: "ḻ", implicitVowel: "a" }],
  [["व", "വ", "ವ"], { value: "v", implicitVowel: "a" }],
  [["श", "ശ", "ಶ"], { value: "ś", implicitVowel: "a" }],
  [["ष", "ഷ", "ಷ"], { value: "ṣ", implicitVowel: "a" }],
  [["स", "സ", "ಸ"], { value: "s", implicitVowel: "a" }],
  [["ह", "ഹ", "ಹ"], { value: "h", implicitVowel: "a" }],
  [["ഩ", /**/], { value: "ṉ", implicitVowel: "a" }],
  [["ഺ", /**/], { value: "ṯ", implicitVowel: "a" }],
  [["क़", "क\u093c"], { value: "q", implicitVowel: "a" }],
  [["ख़", "ख\u093c"], { value: "k͟h", implicitVowel: "a" }],
  [["ग़", "ग\u093c"], { value: "ġ", implicitVowel: "a" }],
  [["ज़", "ज\u093c", /*-*/ "ಜ಼"], { value: "z", implicitVowel: "a" }],
  [["ड़", "ड\u093c"], { value: "ṛ", implicitVowel: "a" }],
  [["ढ़", "ढ\u093c"], { value: "ṛh", implicitVowel: "a" }],
  [["फ़", "फ\u093c", /**/ "ಫ಼"], { value: "f", implicitVowel: "a" }],
  [["य़", "य\u093c",  /* - - */], { value: "ẏ", implicitVowel: "a" }],
  [[/**/ "ൺ", /**/], "ṇ"],
  [[/**/ "ൻ", /**/], "n"], // TODO: disambiguation?
  [[/**/ "ർ", /**/], "r"], // TODO: Malayalam special final form
  [[/**/ "ൽ", /**/], "l"],
  [[/**/ "ൾ", /**/], "ḷ"],
  [[/**/ "ൿ", /**/], "k"],
  // Not ISO:
  ["ॐ", "om"], // OM
  [["त़", /* - - */], { value: "ț", implicitVowel: "a" }], // Maldivian
  [["ह़", /* - - */], { value: "ḥ", implicitVowel: "a" }], // Maldivian
  [["ब़", /* - - */], { value: "β", implicitVowel: "a" }], // Avestan
  [["ॹ", /* - - */], { value: "ž", implicitVowel: "a" }], // Avestan
]));

const marks = expand(new Map<string | string[], Mark>([
  // ISO 15919
  // - Devanagari, Malayalam, Kannada
  [["्", "്", "್"], { value: "", isVowel: true }], // virama
  [["ा", "ാ", "ಾ"], { value: "ā", isVowel: true }],
  [["ि", "ി", "ಿ"], { value: "i", isVowel: true }],
  [["ी", "ീ", "ೀ"], { value: "ī", isVowel: true }],
  [["ु", "ു", "ು"], { value: "u", isVowel: true }],
  [["ू", "ൂ", "ೂ"], { value: "ū", isVowel: true }],
  [[/**/ "ു്", /**/], { value: "ŭ", isVowel: true }],
  [["ृ", "ൃ", "ೃ"], { value: "r̥", isVowel: true }],
  [["ॄ", /*,*/ "ೄ"], { value: "r̥̥̄", isVowel: true }],
  [["ॢ", "ൢ"], { value: "l̥", isVowel: true }],
  [["ൣ", "ॣ"], { value: "l̥̄", isVowel: true }],
  ["ॅ", { value: "ê", isVowel: true }],
  [["ॆ", "െ", "ೆ"], { value: "e", isVowel: true }],
  [["े", "േ", "ೇ"], { value: "ē", isVowel: true }],
  [["ै", "ൈ", "ೈ"], { value: "ai", isVowel: true }],
  ["ॉ", { value: "ô", isVowel: true }],
  [["ॊ", "ൊ", "ೊ"], { value: "o", isVowel: true }],
  [["ो", "ോ", "ೋ"], { value: "ō", isVowel: true }],
  [["ौ", "ൌ", "ೌ"], { value: "au", isVowel: true }],
  ["ൗ", { value: "au", isVowel: true }],
  [["ः", "ഃ", "ಃ"], "ḥ"], // visargam
  [["ಂ"], { // Kannada, Strict Nasalization
    // value: "ṁ",
    value: "̃",
    onVowel: "̃",
    onNext: new Map<string, string>(
      ([] as [string, string][]).concat(
        // ṅ before k, kh, g, gh, ṅ
        Array.from("ಕಖಗಘಙ").map(c => [c, "ṅ"]),
        // ñ before c, ch, j, jh, ñ
        Array.from("ಚಛಜಝಞ").map(c => [c, "ñ"]),
        // ṇ before t., t.h, d., d.h, ṇ
        Array.from("ಟಠಡಢಣ").map(c => [c, "ṇ"]),
        // n before t, th, d, dh, n
        Array.from("ತಥದಧನ").map(c => [c, "n"]),
        // m before p, ph, b, bh, m
        Array.from("ಪಫಬಭಮ").map(c => [c, "m"]),
      )),
  }],
  [["ം"], { // Malayalam, Strict Nasalization
    // value: "ṁ",
    value: "̃",
    onVowel: "̃",
    onNext: new Map<string, string>(
      // always 'm' when final
      ([["", "m"]] as [string, string][]).concat(
        // ṅ before k, kh, g, gh, ṅ
        Array.from("കഖഗഘങ").map(c => [c, "ṅ"]),
        // ñ before c, ch, j, jh, ñ
        Array.from("ചഛജഝഞ").map(c => [c, "ñ"]),
        // ṇ before t., t.h, d., d.h, ṇ
        Array.from("ടഠഡഢണ").map(c => [c, "ṇ"]),
        // n before t, th, d, dh, n
        Array.from("തഥദധന").map(c => [c, "n"]),
        // m before p, ph, b, bh, m
        Array.from("പഫബഭമ").map(c => [c, "m"]),
      )),
  }],
  [["ं"], { // Devanagari, Strict Nasalization
    // value: "ṁ",
    value: "̃",
    onVowel: "̃",
    onNext: new Map<string, string>(
      ([] as [string, string][]).concat(
        // ṅ before k, kh, g, gh, ṅ
        Array.from("कखगघङ").map(c => [c, "ṅ"]),
        // ñ before c, ch, j, jh, ñ
        Array.from("चछजझञ").map(c => [c, "ñ"]),
        // ṇ before t., t.h, d., d.h, ṇ
        Array.from("टठडढण").map(c => [c, "ṇ"]),
        // n before t, th, d, dh, n
        Array.from("तथदधन").map(c => [c, "n"]),
        // m before p, ph, b, bh, m
        Array.from("पफबभम").map(c => [c, "m"]),
      )),
  }],
  ["ँ", { // Simplified nasalization.
    // value: "m̐",
    value: "̃",
    onVowel: "̃",
    onSemivowel: {
      value: "m̐",
      before: true,
    }
  }],
]));

function expand<K>(input: Map<string | string[], K>): Map<string, K> {
  const result = new Map();
  for (const [key, value] of input) {
    if (Array.isArray(key)) {
      for (const k of key) {
        if (result.get(k) !== undefined) {
          throw `duplicate value for ${k}`;
        }

        result.set(k, value);
      }
    } else {
      if (result.get(key) !== undefined) {
        throw `duplicate value for ${key}`;
      }

      result.set(key, value);
    }
  }

  return result;
}

// include Nuktas alongside character, for matching
// allow suffix ZWJ, for now
const regex = /((?!\p{Script=Latin})\p{L}[಼\u093c]?)(\p{M}*)\u200d?/gu;

export function translit(value: string): string {
  return value.replaceAll(regex, replacement);
}

function replacement(substring: string, letter: string, letterMarks: string, offset: number, wholeString: string): string {
  let letterReplacement = letters.get(letter);
  if (letterReplacement === undefined) {
    throw `no replacement for letter: ${letter}`;
  }

  let mustEmitVowel =
    typeof letterReplacement === 'object'
    && letterReplacement.implicitVowel !== undefined;

  let result = "";
  if (typeof letterReplacement === 'string') {
    result += letterReplacement;
  } else {
    let foundMatch = false;
    if (letterReplacement.onNext !== undefined) {
      const targetIndex = offset + substring.length;
      for (const [regexp, value] of letterReplacement.onNext) {
        if (!regexp.sticky) {
          throw "regexp must be sticky (/y)";
        }

        regexp.lastIndex = targetIndex;
        if (regexp.test(wholeString)) {
          result += value;
          foundMatch = true;
          break;
        }
      }
    } else if (letterReplacement.onPrev !== undefined) {
      const targetIndex = offset;
      for (const [regexp, value] of letterReplacement.onPrev) {
        if (!regexp.sticky) {
          throw "regexp must be sticky (/y)";
        }

        regexp.lastIndex = targetIndex;
        if (regexp.test(wholeString)) {
          result += value;
          foundMatch = true;
          break;
        }
      }
    }

    if (!foundMatch) {
      result += letterReplacement.value;
    }
  }

  if (letterMarks) {
    for (const mark of Array.from(letterMarks)) {
      const markReplacement = marks.get(mark);
      if (markReplacement === undefined) {
        throw `no replacement for mark: ${mark}`;
      }

      if (typeof markReplacement === 'object') {
        if (mustEmitVowel) {
          mustEmitVowel = false;
          if (!markReplacement.isVowel) {
            result += (letterReplacement as any).implicitVowel;
          }
        }

        if (typeof letterReplacement === 'object') {
          if (markReplacement.onNext !== undefined) {
            const next = wholeString.charAt(offset + substring.length);
            const nextValue = markReplacement.onNext.get(next);
            if (nextValue !== undefined) {
              result += nextValue;
              continue;
            }
          }

          if (letterReplacement.vowelType !== undefined) {
            if (markReplacement.onSemivowel !== undefined
              && letterReplacement.vowelType === 'semi') {
              result = addMark(result, markReplacement.onSemivowel);
              continue;
            }

            if (markReplacement.onVowel !== undefined) {
              result = addMark(result, markReplacement.onVowel);
              continue;
            }
          }
        }

        result = addMark(result, markReplacement);
      } else {
        if (mustEmitVowel) {
          mustEmitVowel = false;
          result += (letterReplacement as any).implicitVowel;
        }

        result += markReplacement;
      }
    }

    return result;
  }

  return result + (mustEmitVowel ? (letterReplacement as any).implicitVowel : "");
}

function addMark(value: string, mark: Mark): string {
  if (typeof mark === 'string') {
    return value + mark;
  }

  if (mark.before) {
    return mark.value + value;
  }

  return value + mark.value;
}

if (process.argv) {
  process.argv.slice(2).forEach(val => {
    console.log(translit(val));
  });
}
