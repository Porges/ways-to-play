import React from "react";
import { IS_PRODUCTION } from "../helpers.jsx";
import { Data } from "../types.js";

export const data = {
    title: "Game Names Index",
    layout: "layout.11ty.js",
    eleventyImport: {
        collections: ["game"]
    }
};

export const nameMatcher = /<span(?=[^>]+class="[^"]*?\baka\b)(?=(?:[^>]+lang="(?<lang>[^"]+)")?)[^>]*>(?<name>.*?)<\/span>/ugs;

type Name = {
    lang: string,
    name: string,
}

function findNames(coll: any[], refs: Map<Name, any>) {
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
    ["lmo", "Lombard"],
    ["mbw", "Maring"],
    ["mcm", "Malaccan Creole Portuguese"],
    ["mfa", "Pattani Malay"],
    ["mnr", "Mono"],
    ["rng", "Rongo"],
    ["stv", "Siltʼe"],
    ["tiw", "Tiwi"],
    ["tws", "Teochew"],
    ["urh", "Urhobo"],
    ["vmw", "Makhuwa"],
    ["wni", "Comorian"], // Ndzwani
]);

export function render(data: Data): React.JSX.Element {
    const refs = new Map<Name, any>();
    findNames(data.collections.game, refs);

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


    const displayer = new Intl.DisplayNames(["en"], { type: "language" });
    const display = (code: string) => {
        const override = nameOverrides.get(code);
        return override || displayer.of(code);
    };

    const sorter = new Intl.Collator();
    const langs = [...byLang.entries()]
        .map(([code, values]) => ({ code, title: display(code) || code, values }))
        .sort((a, b) => sorter.compare(a.title, b.title));

    return (<>
        <p>This page lists all game names by language, for ease of reference.</p>
        <h2>Languages</h2>
        <ul className="columnarr">
            {langs.map(({ code, title }, ix) => <li key={ix}><a href={`#${code}`}>{title}</a></li>)}
        </ul>
        <hr />

        {langs.map(({ code, title, values }, ix) => {

            const names = [...values.entries()]
                .sort((a, b) => sorter.compare(a[0].name, b[0].name))
                .filter(([{ lang, name }, page]) => !IS_PRODUCTION || !page.data.draft);

            if (names.length === 0) {
                return null;
            }

            return (
                <React.Fragment key={ix}>
                    <h3 id={code}>
                        <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}_language`}>
                            {title}
                        </a>
                    </h3>
                    <ul className="columnarr">
                        {names.map(([{ lang, name }, page], ix) =>
                            <li key={ix}>
                                <a href={`${page.url}#:~:text=${encodeURIComponent(name).replaceAll('-', '%2D')}`}>
                                    <span className="noun" lang={lang}>{titlize(name)}</span>
                                </a>
                            </li>
                        )}
                    </ul>
                </React.Fragment>
            );
        })}
    </>);
}

const titlizer = /(?<![\(\)’'\u00ad]\p{Letter}*)(\p{Letter}|\p{Mark})+/ug;
function titlize(name: string) {
    return name.replaceAll(titlizer, x => x[0].toUpperCase() + x.slice(1));
}
