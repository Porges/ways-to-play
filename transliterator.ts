import * as UnicodeData from "ucd-full/UnicodeData.json";

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
    isVowel?: true,
    before?: boolean,
    // note that Mark onPrev still matches from before base letter
    onPrev?: [RegExp, Mark][],
    onNext?: Map<string, string>,
  }

// TODO: this is simplified dramatically
const wordFinal = /$|\s|\P{Letter}/uy;

/*

Notes on Devanagari and related scripts:
- base consonant comes first
- then optional nukta [ccc 7]
- then optional virama [ccc 9]
- then optional vowel [ccc 0]
- then optional candrabindu [ccc 0]
- then optional svara

Data from:
- https://web.archive.org/web/20160512163746/http://homepage.ntlworld.com:80/stone-catend/trind.htm
- https://transliteration.eki.ee/pdf/Hindi-Marathi-Nepali.pdf
- https://transliteration.eki.ee/pdf/Malayalam.pdf
- https://transliteration.eki.ee/pdf/Kannada.pdf
- https://unicode.org/L2/L2005/05110-tr36-draft3/indic-trans.html
- https://en.wikipedia.org/wiki/Wikipedia:Indic_transliteration
- https://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=g8w4snzcy5

- TODO: 
  - https://aclanthology.org/C12-3014.pdf - wonder if this would be a good idea?
  - https://aclanthology.org/2022.lrec-1.718.pdf - in this they mimic ISO 15919 but indicate silenced vowels
*/

const gcLookup = buildUnicodeLookup("GeneralCategory");

function buildUnicodeLookup(propName: string): ((c: number) => string | undefined) {
  const lookup = new Map<number, string>();
  const data = (UnicodeData as any)["UnicodeData"];
  for (const { codepoint, category } of data) {
    const ix = Number.parseInt(codepoint, 16);
    lookup.set(ix, category);
  }

  return (c: number): string | undefined => {
    return lookup.get(c);
  }
}

const indicBases = [
  0x0900, // Devanagari
  0x0980, // Bengali
  0x0A00, // Gurmukhi
  0x0A80, // Gujarati
  0x0B00, // Oriya
  0x0B80, // Tamil
  0x0C00, // Telugu
  0x0C80, // Kannada
  0x0D00, // Malayalam
  // 0x0D80, // Sinhala - layout is slightly different
];

export function indic(offset: number, nuqta = false): string[] {
  return indicBases
    .map(base => base + offset)
    .filter(c => gcLookup(c) !== undefined) // ensure character is assigned
    .map(c => String.fromCharCode(nuqta ? (0x3C + c) : c));
}

export function indic2(offset: number, extras: number[]): [string, string[]][] {
  return indicBases
    .map(base => [base + offset, extras.map(e => base + e)] as const)
    .filter(([c, _]) => gcLookup(c) !== undefined) // ensure character is assigned
    .map(([c, extras]) =>
      [String.fromCharCode(c),
      extras.filter(c => gcLookup(c) !== undefined).map(c => String.fromCharCode(c))]);
}

const letters = expand(new Map<string | string[], Letter>([
  // ISO 9
  // - Cyrillic
  ["А", "A"], ["а", "a"],
  ["Б", "B"], ["б", "b"],
  ["В", "V"], ["в", "v"],
  ["Г", "G"], ["г", "g"],
  ["Ґ", "G̀"], ["ґ", "g̀"],
  ["Ѓ", "Ǵ"], ["ѓ", "ǵ"],
  ["Ғ", "Ġ"], ["ғ", "ġ"],
  ["Ҕ", "Ğ"], ["ҕ", "ğ"],
  ["Һ", "Ḥ"], ["һ", "ḥ"],
  ["Д", "D"], ["д", "d"],
  ["Ђ", "Đ"], ["ђ", "đ"],
  ["Е", "E"], ["е", "e"],
  ["Ӗ", "Ĕ"], ["ӗ", "ĕ"],
  ["Ё", "Ë"], ["ё", "ë"],
  ["Є", "Ê"], ["є", "ê"],
  ["Ж", "Ž"], ["ж", "ž"],
  ["Җ", "Ž̧̧"], ["җ", "ž̧"],
  ["Ӝ", "Z̄"], ["ӝ", "z̄"],
  ["Ӂ", "Z̆"], ["ӂ", "z̆"],
  ["З", "Z"], ["з", "z"],
  ["Ӟ", "Z̈"], ["ӟ", "z̈"],
  ["Ӡ", "Ź"], ["ӡ", "ź"],
  ["Ѕ", "Ẑ"], ["ѕ", "ẑ"],
  ["И", "I"], ["и", "i"],
  ["Ӣ", "Ī"], ["ӣ", "ī"],
  ["И́", "Í"], ["и́", "í"],
  ["Ӥ", "Î"], ["ӥ", "î"],
  ["Й", "J"], ["й", "j"],
  ["І", "Ì"], ["і", "ì"],
  ["Ї", "Ï"], ["ї", "ï"],
  ["І̄", "Ǐ"], ["і̄", "ǐ"],
  ["Ј", "J̌"], ["ј", "ǰ"],
  ["Ј̵", "J́"], ["ј̵", "j́"],
  ["К", "K"], ["к", "k"],
  ["Ќ", "Ḱ"], ["ќ", "ḱ"],
  ["Ӄ", "Ḳ"], ["ӄ", "ḳ"],
  ["Ҝ", "K̂"], ["ҝ", "k̂"],
  ["Ҡ", "Ǩ"], ["ҡ", "ǩ"],
  ["Ҟ", "K̄"], ["ҟ", "k̄"],
  ["Қ", "Ķ"], ["қ", "ķ"],
  ["К̨", "K̀"], ["к̨", "k̀"],
  ["Ԛ", "Q"], ["ԛ", "q"],
  ["Л", "L"], ["л", "l"], // <- up to here https://en.wikipedia.org/wiki/ISO_9
  ["М", "M"], ["м", "m"],
  ["Н", "N"], ["н", "n"],
  ["О", "O"], ["о", "o"],
  ["П", "P"], ["п", "p"],
  ["Р", "R"], ["р", "r"],
  ["С", "S"], ["с", "s"],
  ["Т", "T"], ["т", "t"],
  ["У", "U"], ["у", "u"],
  ["Ф", "F"], ["ф", "f"],
  ["Х", "H"], ["х", "h"],
  ["Ц", "C"], ["ц", "c"],
  ["Ч", "Č"], ["ч", "č"],
  ["Ш", "Š"], ["ш", "š"],
  ["Щ", "Ŝ"], ["щ", "ŝ"],
  ["Ъ", "ʺ"], ["ъ", "ʺ"],
  ["Ы", "Y"], ["ы", "y"],
  ["Ь", "ʹ"], ["ь", "ʹ"],
  ["Э", "È"], ["э", "è"],
  ["Ю", "Û"], ["ю", "û"],
  ["Я", "Â"], ["я", "â"],
  ["І", "Ì"], ["і", "ì"],
  ["Ѣ", "Ě"], ["ѣ", "ě"],
  ["Ѳ", "F̀"], ["ѳ", "f̀"],
  ["Ѵ", "Ỳ"], ["ѵ", "ỳ"],
  // ISO 15919
  [indic(0x3D), "’"],
  [indic(0x05), { value: "a", vowelType: "full" }],
  [indic(0x06), { value: "ā", vowelType: "full" }],
  // a, ka, ha 
  ...indic2(7, [0x5, 0x15, 0x39])
    .map(([i_vowel, [a, start, end]]): [string, Letter] => {
      return [i_vowel, {
        value: "i",
        vowelType: "full",
        onPrev: [
          // if previous is letter with no vowel mark, or the vowel 'a'
          // (so it will be -a), this is 'a:i' to distinguish from 'ai'.
          // this would be simpler if we checked upon the transliterated output...
          [new RegExp(`(?<=[${a}${start}-${end}])`, 'uy'), ":i"]
        ]
      }];
    }),
  [indic(0x08), { value: "ī", vowelType: "full" }],
  // u, ka, ha
  ...indic2(0x09, [0x05, 0x15, 0x39])
    .map(([u_vowel, [a, start, end]]): [string, Letter] => {
      return [u_vowel, {
        value: "u",
        vowelType: "full",
        onPrev: [
          // if previous is letter with no vowel mark, or the vowel 'a'
          // (so it will be -a), this is 'a:u' to distinguish from 'au'.
          // this would be simpler if we checked upon the transliterated output...
          [new RegExp(`(?<=[${a}${start}-${end}])`, 'uy'), ":u"] // TODO: Bengali
        ]
      }];
    }),
  [indic(0x0A), { value: "ū", vowelType: "full" }],
  [indic(0x0B), { value: "r̥", vowelType: "full" }],
  [indic(0x60), { value: "r̥̄", vowelType: "full" }],
  [indic(0x0C), { value: "l̥", vowelType: "full" }],
  [indic(0x61), { value: "l̥̄", vowelType: "full" }],
  [indic(0x0D), { value: "ê", vowelType: "full" }],
  [indic(0x0E), { value: "e", vowelType: "full" }],
  [indic(0x0F), { value: "ē", vowelType: "full" }],
  [indic(0x10), { value: "ai", vowelType: "full" }],
  [indic(0x11), { value: "ô", vowelType: "full" }],
  [indic(0x12), { value: "o", vowelType: "full" }],
  [indic(0x13), { value: "ō", vowelType: "full" }],
  [indic(0x14), { value: "au", vowelType: "full" }],
  // TODO: a:yā Bengali?
  [indic(0x15), { value: "k", implicitVowel: "a" }],
  [indic(0x16), { value: "kh", implicitVowel: "a" }],
  [indic(0x17), { value: "g", implicitVowel: "a" }],
  [indic(0x18), { value: "gh", implicitVowel: "a" }],
  [indic(0x19), { value: "ṅ", implicitVowel: "a" }],
  ["ঙ়", { value: "ṅ", implicitVowel: "a" }], // not in ISO, cannot locate this anywhere
  [indic(0x1A), { value: "c", implicitVowel: "a" }],
  ["চ়", { value: "c", implicitVowel: "a" }], // ??? no idea
  [indic(0x1B), { value: "ch", implicitVowel: "a" }],
  ["ছ়", { value: "ch", implicitVowel: "a" }], // ??? no idea
  [indic(0x1C), { value: "j", implicitVowel: "a" }],
  [indic(0x1D), { value: "jh", implicitVowel: "a" }],
  [indic(0x1E), { value: "ñ", implicitVowel: "a" }],
  [indic(0x1F), { value: "ṭ", implicitVowel: "a" }],
  ["ট়", { value: "ṭ", implicitVowel: "a" }], // ??? no idea
  [indic(0x20), { value: "ṭh", implicitVowel: "a" }],
  ["ঠ়", { value: "ṭh", implicitVowel: "a" }], // ??? no idea
  [indic(0x21), { value: "ḍ", implicitVowel: "a" }],
  [indic(0x22), { value: "ḍh", implicitVowel: "a" }],
  [indic(0x23), { value: "ṇ", implicitVowel: "a" }],
  [indic(0x24), { value: "t", implicitVowel: "a" }],
  ["ত়", { value: "ṭ", implicitVowel: "a" }], // not in ISO, found @ https://fr.wikipedia.org/wiki/%E0%A6%A4%E0%A6%BC
  [indic(0x25), { value: "th", implicitVowel: "a" }],
  ["থ়", { value: "th", implicitVowel: "a" }], // ??? no idea
  [indic(0x26), { value: "d", implicitVowel: "a" }],
  ["দ়", { value: "d͟h", implicitVowel: "a" }], // not in ISO, found @ https://fr.wikipedia.org/wiki/%E0%A6%A6%E0%A6%BC
  [indic(0x27), { value: "dh", implicitVowel: "a" }],
  [indic(0x28), { value: "n", implicitVowel: "a" }],
  [indic(0x29), { value: "ṉ", implicitVowel: "a" }],
  [["ನ಼", "ন়"], { value: "ṉ", implicitVowel: "a" }], // accessible with nuqta
  [indic(0x2A), { value: "p", implicitVowel: "a" }],
  ["প়", { value: "w", implicitVowel: "a" }], // ??? no idea - https://aclanthology.org/W12-5604.pdf
  [indic(0x2B), { value: "ph", implicitVowel: "a" }],
  [indic(0x2C), { value: "b", implicitVowel: "a" }],
  [indic(0x2D), { value: "bh", implicitVowel: "a" }],
  ["ভ়", { value: "v", implicitVowel: "a" }], // not in ISO, found @ https://fr.wikipedia.org/wiki/%E0%A6%AD%E0%A6%BC
  [indic(0x2E), { value: "m", implicitVowel: "a" }],
  ["ম়", { value: "m", implicitVowel: "a" }], // ??? no idea
  [indic(0x2F).filter(c => c !== "യ"), { value: "y", implicitVowel: "a" }],
  ["യ", {
    value: "y",
    implicitVowel: "a",
    onNext: [
      [/(?<=്)\p{Letter}/uy, "y:"] // special medial form for suppressed vowel in Malayalam
    ]
  }],
  // RA is a bit weird:
  ...indic(0x30).concat("ৰ"/*Assamese*/).map((c): [string, Letter] => {
    if (c === "र") {
      return [c, {
        value: "r",
        implicitVowel: "a",
        onNext: [
          [/(?<=्\u200d)/uy, "r̆"] // special case for "eyelash-R" in Nepali/Marathi [two-way urpha]
        ]
      }];
    } else if (c === "ര") {
      return [c, {
        value: "r",
        implicitVowel: "a",
        onNext: [
          [wordFinal, "ṟ"] // special final form in Malayalam
        ]
      }];
    } else {
      return [c, { value: "r", implicitVowel: "a"}];
    }
  }),
  [indic(0x31), { value: "ṟ", implicitVowel: "a" }], // TODO: Malayalam special final form
  [indic(0x32), { value: "l", implicitVowel: "a" }],
  [indic(0x33), { value: "ḷ", implicitVowel: "a" }],
  [indic(0x34), { value: "ḻ", implicitVowel: "a" }],
  ["ল়", { value: "ḻ", implicitVowel: "a" }],
  [indic(0x35).concat("ৱ" /* Assamese */), { value: "v", implicitVowel: "a" }],
  [indic(0x36), { value: "ś", implicitVowel: "a" }],
  ["শ়", { value: "ś", implicitVowel: "a" }], // ??? no idea
  [indic(0x37), { value: "ṣ", implicitVowel: "a" }],
  [indic(0x38), { value: "s", implicitVowel: "a" }],
  [["स़", /*,*/ "ಸ಼", "স়"], { value: "š", implicitVowel: "a" }], // not in ISO, using Arabic transliteration
  [indic(0x39), { value: "h", implicitVowel: "a" }],
  ["হ়", { value: "h", implicitVowel: "a" }], // ??? no idea, not in ISO
  [["ഺ", /**/], { value: "ṯ", implicitVowel: "a" }],
  [["क़", "क\u093c", "ক\u09bc"], { value: "q", implicitVowel: "a" }],
  [["ख़", "ख\u093c", "খ\u09bc"], { value: "k͟h", implicitVowel: "a" }],
  [["ग़", "ग\u093c", "গ\u09bc"], { value: "ġ", implicitVowel: "a" }],
  [["ज़", "ज\u093c", "ಜ಼", "জ\u09bc"], { value: "z", implicitVowel: "a" }],
  [["ड़", "ड\u093c", "ড়", "ড\u09bc"], { value: "ṛ", implicitVowel: "a" }],
  [["ढ़", "ढ\u093c", "ঢ়", "ঢ\u09bc"], { value: "ṛh", implicitVowel: "a" }],
  [["फ़", "फ\u093c", "ಫ಼", "ফ\u09bc"], { value: "f", implicitVowel: "a" }],
  ["ব\u09bc", { value: "w", implicitVowel: "a" }],
  [["य़", "य\u093c", "য়", "য\u09bc"], { value: "ẏ", implicitVowel: "a" }],
  // Special Malayalam consonants:
  [[/**/ "ൺ", /**/], "ṇ"],
  ["ൻ",
    {
      value: "n",
      onNext: [
        [/ന/uy, "n:"] // disambiguation
      ]
    }
  ],
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
  [["\u200c", "\u200d"], ""], //ZWJ & ZWNJ
  // ISO 15919
  // - Devanagari, Malayalam, Kannada
  ...indic(0x4d).map((c): [string, Mark] => [c, { value: "", isVowel: true }]), // virama
  ...indic(0x3e).map((c): [string, Mark] => [c, { value: "ā", isVowel: true }]),
  ...indic(0x3f).map((c): [string, Mark] => [c, { value: "i", isVowel: true }]),
  ...indic(0x40).map((c): [string, Mark] => [c, { value: "ī", isVowel: true }]),
  ...indic(0x41).map((c): [string, Mark] => [c, { value: "u", isVowel: true }]),
  ...indic(0x42).map((c): [string, Mark] => [c, { value: "ū", isVowel: true }]),
  [[/*,*/ "ു്", /*, ,*/], { value: "ŭ", isVowel: true }],
  ...indic(0x43).map((c): [string, Mark] => [c, { value: "r̥", isVowel: true }]),
  ...indic(0x44).map((c): [string, Mark] => [c, { value: "r̥̥̄", isVowel: true }]),
  ...indic(0x62).map((c): [string, Mark] => [c, { value: "l̥", isVowel: true }]),
  ...indic(0x63).map((c): [string, Mark] => [c, { value: "l̥̄", isVowel: true }]),
  ...indic(0x45).map((c): [string, Mark] => [c, { value: "ê", isVowel: true }]),
  ...indic(0x46).map((c): [string, Mark] => [c, { value: "e", isVowel: true }]),
  ...indic(0x47).map((c): [string, Mark] => [c, { value: "ē", isVowel: true }]),
  ...indic(0x48).map((c): [string, Mark] => [c, { value: "ai", isVowel: true }]),
  ...indic(0x49).map((c): [string, Mark] => [c, { value: "ô", isVowel: true }]),
  ...indic(0x4A).map((c): [string, Mark] => [c, { value: "o", isVowel: true }]),
  ...indic(0x4B).map((c): [string, Mark] => [c, { value: "ō", isVowel: true }]),
  ...indic(0x4C).map((c): [string, Mark] => [c, { value: "au", isVowel: true }]),
  [["ൗ", "ৗ"], { value: "au", isVowel: true }],
  [["ः", "ഃ", "ಃ", "ঃ"], "ḥ"], // visargam
  [["ಂ"], { // Kannada, Strict Nasalization
    value: "ṁ",
    //value: "̃",
    //onVowel: "̃",
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
    value: "ṁ",
    //value: "̃",
    //onVowel: "̃",
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
    value: "ṁ",
    //value: "̃",
    //onVowel: "̃",
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
  [["ং"], { // Bengali, Strict Nasalization
    value: "ṁ",
    //value: "̃",
    //onVowel: "̃",
    onNext: new Map<string, string>(
      ([] as [string, string][]).concat(
        // ṅ before k, kh, g, gh, ṅ
        Array.from("কখগঘঙ").map(c => [c, "ṅ"]),
        // ñ before c, ch, j, jh, ñ
        Array.from("চছজঝঞ").map(c => [c, "ñ"]),
        // ṇ before t., t.h, d., d.h, ṇ
        Array.from("টঠডঢণ").map(c => [c, "ṇ"]),
        // n before t, th, d, dh, n
        Array.from("তথদধন").map(c => [c, "n"]),
        // m before p, ph, b, bh, m
        Array.from("পফবভম").map(c => [c, "m"]),
      )),
  }],
  // chandrabindu, then virama & semivowels (y r l .l v)
  ...indic2(0x01, [0x4D, 0x2F, 0x30, 0x32, 0x33, 0x35]).map(([cb, [virama, ...semis]]) =>
    [cb, {
      value: "̃",
      onPrev: [
        // semivowel: must be base semi followed by virama
        [new RegExp(`[${semis.join("")}]${virama}`, 'yu'), {
          value: "m̐",
          before: true,
        }]
      ]
    }] as [string, Mark]
  ),

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


// something approaching an extended grapheme cluster: https://unicode.org/reports/tr29/#Table_Combining_Char_Sequences_and_Grapheme_Clusters
// include Nuktas alongside character, for matching
const regex = new RegExp(`((?!\\p{Script=Latin})\\p{L}[${indic(0x3C).join("")}]*)([\\p{M}\\p{Join_Control}]*)`, 'gu');

export function translit(value: string): string {
  // normalizing to NFC ensures that nuktas etc are in the right order
  value = value.normalize("NFC");
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

  let vowelType = null;

  let result = "";
  if (typeof letterReplacement === 'string') {
    result += letterReplacement;
  } else {
    let foundMatch = false;
    if (letterReplacement.vowelType !== undefined) {
      vowelType = letterReplacement.vowelType;
    }

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
        throw `no replacement for mark: ${mark} in ${substring}`;
      }

      if (typeof markReplacement === 'object') {
        if (mustEmitVowel) {
          mustEmitVowel = false;
          if (!markReplacement.isVowel) {
            result += (letterReplacement as any).implicitVowel;
          }
        }

        if (markReplacement.onPrev !== undefined) {
          const targetIndex = offset;
          let foundMatch = false;
          for (const [regexp, value] of markReplacement.onPrev) {
            if (!regexp.sticky) {
              throw "regexp must be sticky (/y)";
            }

            regexp.lastIndex = targetIndex;
            if (regexp.test(wholeString)) {
              result = addMark(result, value);
              foundMatch = true;
              break;
            }
          }

          if (foundMatch) {
            continue;
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

import { createInterface } from "readline";

if (process.argv) {

  let args = process.argv.slice(2);
  if (args[0] === "dict") {
    console.log("export const dict: [string, string][] = [");
    const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
    rl.on('line', line => {
      try {
        let result = translit(line);
        console.log(`["${line}", "${result}"],`);
      } catch {
        console.log(`["${line}", ""],`);
      }
    }).on('close', () => {
      console.log("];");
    });
  } else {
    process.argv.slice(2).forEach(val => {
      console.log(translit(val));
    });
  }
}
