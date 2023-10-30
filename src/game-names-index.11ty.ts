import { IS_PRODUCTION } from "../helpers";
import { Data } from "../types";

export const data = {
    title: "Game Names Index",
    layout: "columned",
    eleventyImport: {
        collections: ["game"]
    }
};

export const nameMatcher = /<span(?=[^>]+class="[^"]*?\baka\b)(?=(?:[^>]+lang="(?<lang>[^"]+)")?)[^>]*>(?<name>.*?)<\/span>/ugs;

type Name = {
    lang: string,
    name: string,
}

async function findNames(coll: any[], refs: Map<Name, any>) {
    for (const c of coll) {
        const content = c.content as string;
        const matches = content.matchAll(nameMatcher);
        for (const match of matches) {
            refs.set({ lang: match.groups!.lang ?? 'en', name: match.groups!.name }, c);
        }
    }
}

// not all languages supported by Intl.DisplayNames
// in particular, 3-letter codes are under-supported
const nameOverrides = new Map<string, string>([
    ["cmn", "Mandarin Chinese"],
    ["gup", "Bininj Kunwok"],
    ["kew", "Kewa (West)"],
    ["kxd", "Kedayan"],
    ["mbw", "Maring"],
    ["mcm", "Malaccan Creole Portuguese"],
    ["mfa", "Pattani Malay"],
    ["mnr", "Mono"],
    ["rng", "Rongo"],
    ["stv", "Siltʼe"],
    ["tiw", "Tiwi"],
    ["tws", "Teochew"],
    ["urh", "Urhobo"],
    ["wni", "Comorian"], // Ndzwani
]);

export async function render(data: Data) {
    const refs = new Map<Name, any>();
    await findNames(data.collections.game, refs);

    const byLang = new Map<string, Map<{ lang: string, name: string }, any>>();
    for (const [k, v] of refs) {
        const langNoScript =
            // for some reason 'cmn' gets normalized to 'zh'
            // despite being its own entry in the language subtag registry
            k.lang === 'cmn-Latn-pinyin'
                ? 'cmn'
                : new Intl.Locale(k.lang).language;
        let it = byLang.get(langNoScript);
        if (!it) {
            it = new Map();
            byLang.set(langNoScript, it);
        }

        it.set(k, v);
    }

    let result = '<p>This page lists all game names by language, for ease of reference.</p>'
        + '<hr/>';

    const displayer = new Intl.DisplayNames(["en"], { type: "language" });
    const display = (code: string) => {
        const override = nameOverrides.get(code);
        return override || displayer.of(code);
    };

    const sorter = new Intl.Collator();
    const langs = [...byLang.entries()]
        .map(([code, values]) => ({ code, title: display(code) || code, values }))
        .sort((a, b) => sorter.compare(a.title, b.title));

    result += '<h2>Languages</h2><ul class="columnar">';
    for (const { code, title } of langs) {
        result += `<li><a href="#${code}">${title}</a></li>`;
    }
    result += '</ul>'
        + '<h2>List</h2>';

    for (const { code, title, values } of langs) {
        result += `<h3 id="${code}"><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}_language">${title}</a></h3>`;
        result += '<ul class="columnarr">';
        const names = [...values.entries()].sort((a, b) => sorter.compare(a[0].name, b[0].name));
        for (const [{ lang, name }, page] of names) {
            if (IS_PRODUCTION && page.data.draft) {
                continue;
            }

            result += `<li><a href="${page.url}#:~:text=${encodeURIComponent(name).replaceAll('-', '%2D')}"><span class="noun" lang="${lang}">${titlize(name)}</span></a></li>`;
        }
        result += '</ul>';
    }

    return result;
}

const titlizer = /(?<![\(\)’'\u00ad]\p{Letter}*)(\p{Letter}|\p{Mark})+/ug;
function titlize(name: string) {
    return name.replaceAll(titlizer, x => x[0].toUpperCase() + x.slice(1));
}
