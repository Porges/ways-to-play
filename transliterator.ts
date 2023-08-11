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
    onNext?: [RegExp, Mark][],
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
    .filter(base => gcLookup(base + offset) !== undefined) // make sure character is assigned
    .map(base => String.fromCodePoint(base + offset) + (nuqta ? String.fromCodePoint(base + 0x3C) : ""));
}

export function indic2(offset: number, extras: number[]): [string, string[]][] {
  return indicBases
    .map(base => [base + offset, extras.map(e => base + e)] as const)
    .filter(([c, _]) => gcLookup(c) !== undefined) // ensure character is assigned
    .map(([c, extras]) =>
      [String.fromCodePoint(c),
      extras.filter(c => gcLookup(c) !== undefined).map(c => String.fromCodePoint(c))]);
}

export function ethiopic(base: number, consonant: string, extras: string[] = []): [string, string][] {
  const vowels = [
    "ä", "u", "i", "a", "é", "e", "o",
  ].concat(extras);

  return vowels
    .map((v, offset) => [v, offset] as const)
    .filter(([_, offset]) => gcLookup(base + offset) !== undefined) // ensure character is assigned
    .map(([vowel, offset]) => [String.fromCodePoint(base + offset), consonant + vowel]);
}

const letters = expand(new Map<string | string[], Letter>([
  // Ethiopic languages
  ...ethiopic(0x1200, "h", ["oa"]),
  ...ethiopic(0x1208, "l", ["ʷa"]),
  ...ethiopic(0x1210, "ḥ", ["ʷa"]),
  ...ethiopic(0x1218, "m", ["ʷa"]), ["ፙ", "mʸä"],
  ...ethiopic(0x1220, "ś", ["ʷa"]),
  ...ethiopic(0x1228, "r", ["ʷa"]), ["ፘ", "rʸä"],
  ...ethiopic(0x1230, "s", ["ʷa"]),
  ...ethiopic(0x1238, "š", ["ʷa"]),
  ...ethiopic(0x1240, "q", ["oa", "ʷä", "XX", "ʷi", "ʷa", "ʷé", "ʷe"]),
  ...ethiopic(0x1250, "q̌", ["XX", "ʷä", "XX", "ʷi", "ʷa", "ʷé", "ʷe"]),
  ...ethiopic(0x1260, "b", ["ʷa"]),
  ...ethiopic(0x1268, "v", ["ʷa"]),
  ...ethiopic(0x1270, "t", ["ʷa"]),
  ...ethiopic(0x1278, "č", ["ʷa"]),
  ...ethiopic(0x1280, "ḫ", ["oa", "ʷä", "XX", "ʷi", "ʷa", "ʷé", "ʷe"]),
  ...ethiopic(0x1290, "n", ["ʷa"]),
  ...ethiopic(0x1298, "ñ", ["ʷa"]),
  ...ethiopic(0x12A0, "ʾ", ["ʷa"]),
  ...ethiopic(0x12A8, "k", ["oa", "ʷä", "XX", "ʷi", "ʷa", "ʷé", "ʷe", "XX", "XX"]),
  ...ethiopic(0x12B8, "x", ["XX", "ʷä", "XX", "ʷi", "ʷa", "ʷé", "ʷe"]),
  ...ethiopic(0x12C8, "w"),
  ...ethiopic(0x12D0, "ʿ"),
  ...ethiopic(0x12D8, "z", ["ʷa"]),
  ...ethiopic(0x12E0, "ž", ["ʷa"]),
  ...ethiopic(0x12E8, "y"),
  ...ethiopic(0x12F0, "d", ["ʷa"]),
  ...ethiopic(0x12F8, "ḳ", ["ʷa"]), // ዸ used in Harari, using ḳ instead of k’ for consistency
  ...ethiopic(0x1300, "ǧ", ["ʷa"]),
  ...ethiopic(0x1308, "g", ["oa", "ʷä", "XX", "ʷi", "ʷa", "ʷé", "ʷe"]),
  ...ethiopic(0x1318, "ŋ", ["ʷa"]), // ጘ used in Bilen, pronounced ŋ
  ...ethiopic(0x1320, "ṭ", ["ʷa"]),
  ...ethiopic(0x1328, "č̣", ["ʷa"]),
  ...ethiopic(0x1330, "p̣", ["ʷa"]),
  ...ethiopic(0x1338, "ṣ", ["ʷa"]),
  ...ethiopic(0x1340, "ṣ́", ["oa"]),
  ...ethiopic(0x1348, "f", ["ʷa"]), ["ፚ", "fʸä"],
  ...ethiopic(0x1350, "p", ["ʷa"]),

  // ISO 9
  // - Cyrillic
  ["А", "A"], ["а", "a"],
  ["Ӓ", "Ä"], ["ӓ", "ä"],
  ["Ӓ̄", "Ạ̈"], ["ӓ̄", "ạ̈"],
  ["Ӑ", "Ă"], ["ӑ", "ă"],
  ["А̄", "Ā"], ["а̄", "ā"],
  ["Ӕ", "Æ"], ["ӕ", "æ"],
  ["А́", "Á"], ["а́", "á"],
  ["А̊", "Å"], ["а̊", "å"],
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
  ["Е́", "É"], ["е́", "é"], // added by me
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
  ["Ӱ", "Ü"], ["ӱ", "ü"],
  ["Ӯ", "Ū"], ["ӯ", "ū"],
  ["Ў", "Ŭ"], ["ў", "ŭ"],
  ["Ӳ", "Ű"], ["ӳ", "ű"],
  ["У́", "Ü"], ["у́", "ü"],
  ["Ӱ̄", "Ụ̈"], ["ӱ̄", "ụ̈"],
  ["Ү", "Ù"], ["ү", "ù"],
  ["Ұ", "U̇"], ["ұ", "u̇"],
  ["Ԝ", "W"], ["ԝ", "w"],
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
  ["থ়", { value: "t͟h", implicitVowel: "a" }], // not in ISO, found @ https://fr.wikipedia.org/wiki/%E0%A6%A5%E0%A6%BC
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
      return [c, { value: "r", implicitVowel: "a" }];
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
  // some of these nukta forms have precomposed characters,
  // but they are always decomposed by NFC
  [["क\u093c", "ক\u09bc"], { value: "q", implicitVowel: "a" }],
  [["ख\u093c", "খ\u09bc"], { value: "k͟h", implicitVowel: "a" }],
  [["ग\u093c", "গ\u09bc"], { value: "ġ", implicitVowel: "a" }],
  [["ज\u093c", "ಜ಼", "জ\u09bc"], { value: "z", implicitVowel: "a" }],
  [indic(0x21, true), { value: "ṛ", implicitVowel: "a" }],
  [["ढ\u093c", "ঢ\u09bc"], { value: "ṛh", implicitVowel: "a" }],
  [["फ\u093c", "ಫ಼", "ফ\u09bc"], { value: "f", implicitVowel: "a" }],
  ["ব\u09bc", { value: "w", implicitVowel: "a" }],
  [["य\u093c", "য\u09bc"], { value: "ẏ", implicitVowel: "a" }],
  ["ୟ", { value: "ẏ", implicitVowel: "a" }], // included in Oriya
  // - end nuktas
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

  // Arabic/Urdu

  ["ا", "ā"], // 1 TODO: ʾ
  ["أ", {
    value: "TODO"
  }],
  ["اً", {
    value: "TODO"
  }],
  ["إ", {
    value :"ī",
    onPrev: [
      [/(?<!\p{L})/yu, "ʾi"]
    ]
  }],
  ["ب", "b"], // 2
  ["پ", "p"], // Urdu and others
  ["ت", "t"], // 3
  ["ة", "t"], // ta marbuta
  ["ث", "th"], // 4
  ["ج", "j"], // 5
  ["چ", "ch"], // Urdu
  ["ح", "ḥ"], // 6
  ["خ", "kh"], // 7
  ["د", "d"], // 8
  ["ذ", "dh"], // 9
  ["ر", "r"], // 10
  ["ڑ", "ṛ"], // Urdu
  ["ز", "z"], // 11
  ["ژ", "ž"], // Urdu
  ["س", "s"], // 12
  ["ش", "sh"], // 13
  ["ص", "ṣ"], // 14
  ["ض", "ḍ"], // 15
  ["ط", "ț"], // 16
  ["ظ", "ẓ"], // 17
  ["ع", "ʿ"], // 18
  ["غ", "ġ"], // 19
  ["ف", "f"], // 20
  ["ڤ", "v"], 
  ["ڥ", "v"],
  ["ق", "q"], // 21
  ["ك", "k"], // 22
  ["ڪ", "k"],
  ["گ", "g"],
  ["ڨ", "g"],
  ["ݣ", "g"],
  ["ڭ", "g"],
  ["ل", "l"], // 23
  ["م", "m"], // 24
  ["ن", "n"], // 25
  ["ه", "h"], // 26
  ["ھ", "ʰ"], // Urdu: aspiration
  ["و", "w"], // 27
  ["ي", "y"], // 28
  ["ى", "ā"], // alif maqsurah
  ["ئ", "TODO"], // ya hamzah
  ["ٸ", "TODO"], // ya hamzah
  ["ࢨ", "TODO"], // ya hamzah
  ["ۓ", "TODO"], // ya hamzah
  ["ے", "y"],
  ["ء", "ʾ"],
  ["آ", "ā"],
  [ "ٹ", "ț" ],
  ["ﷲ", "allāh"],
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
  [indic(0x03), "ḥ"], // visargam
  // anusvara
  ...indic2(0x02, [0x15, 0x19, 0x1A, 0x1E, 0x1F, 0x23, 0x24, 0x28, 0x2A, 0x2E]).map(
    ([c, [a1, a2, b1, b2, c1, c2, d1, d2, e1, e2]]): [string, Mark] => {
      return [c,
        {
          value: "ṁ",
          // Malayalam always 'm' when final
          onNext: (c === "ം" ? [[wordFinal, "m"]] as [RegExp, string][] : []).concat([
            // ṅ before k, kh, g, gh, ṅ
            [new RegExp(`[${a1}-${a2}]`, 'yu'), "ṅ"],
            // ñ before c, ch, j, jh, ñ
            [new RegExp(`[${b1}-${b2}]`, 'yu'), "ñ"],
            // ṇ before t., t.h, d., d.h, ṇ
            [new RegExp(`[${c1}-${c2}]`, 'yu'), "ṇ"],
            // n before t, th, d, dh, n
            [new RegExp(`[${d1}-${d2}]`, 'yu'), "n"],
            // m before p, ph, b, bh, m
            [new RegExp(`[${e1}-${e2}]`, 'yu'), "m"],
          ])
        }
      ];
    }),
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
  for (let [key, value] of input) {
    if (Array.isArray(key)) {
      for (let k of key) {
        if (k === value) {
          throw `replacement to self for ${k}`;
        }

        k = k.normalize("NFC");

        if (result.get(k) !== undefined) {
          throw `duplicate value for ${k}`;
        }

        result.set(k, value);
      }
    } else {
      if (key === value) {
        throw `replacement to self for ${key}`;
      }

      key = key.normalize("NFC");

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
  // first match whole substring
  let matchedWhole = true;
  let letterReplacement = letters.get(substring);
  if (letterReplacement === undefined) {
    matchedWhole = false;
    letterReplacement = letters.get(letter);
    if (letterReplacement === undefined) {
      throw `no replacement for letter: ${letter}`;
    }
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

  if (!matchedWhole && letterMarks) {
    for (const mark of Array.from(letterMarks)) {
      const markReplacement = marks.get(mark);
      if (markReplacement === undefined) {
        throw `no replacement for mark: ${mark} (U+${mark.charCodeAt(0).toString(16)}) in ${substring}`;
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

        if (markReplacement.onNext !== undefined) {
          const targetIndex = offset + substring.length;
          let foundMatch = false;
          for (const [regexp, value] of markReplacement.onNext) {
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
import { waitForDebugger } from "inspector";

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
  } else if (args[0] === "dump") {
    for (const [letter, replacement] of letters) {
      console.log(`${letter}\t→\t${replacement}`);
    }
  } else {
    process.argv.slice(2).forEach(val => {
      console.log(translit(val));
    });
  }
}
