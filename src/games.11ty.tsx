import { IS_PRODUCTION, ifSet } from '../helpers.jsx';

import slug from 'slug';
import { Article, Context, Data, GameData, Players } from '../types.js';
import React from 'react';
import { safeHTML } from '../references.jsx';

export const data = {
    title: "Games",
    layout: "layout.11ty.js",
    eleventyImport: {
        collections: ["game"]
    },
    eleventyComputed: {
        script: (data: Data) => {
            const expandedGames = getGames(data);
            return `const GAMES=${JSON.stringify(expandedGames)};
            ${renderGames}

            function handleSelect(el, name) {
                el.onchange = () => {
                    const params = new URLSearchParams(window.location.search);
                    const v = el.value;
                    if (v === 'any') {
                        params.delete(name);
                    } else {
                        params.set(name, v);
                    }

                    const queryString = params.toString();
                    if (queryString) {
                        window.history.pushState(null, null, '?' + queryString);
                    } else {
                        window.history.pushState(null, null, window.location.pathname);
                    }
                    renderGames(GAMES);
                }
            }

            window.addEventListener('DOMContentLoaded', () => {
                handleSelect(document.getElementById('player-select'), 'players');
                handleSelect(document.getElementById('equipment-select'), 'equipment');
                handleSelect(document.getElementById('country-select'), 'country');
                renderGames(GAMES);
            });`
        }
    }
};

type RenderableGame = {
    players: Players,
    equipment?: string,
    variant?: boolean,
    url: string,
    title: string,
    titleLang?: string,
    originalTitle?: string,
    draft?: boolean,
    countries?: string,
};

function renderGames(allGames: RenderableGame[]) {
    const dest = document.getElementById('games-list')!;
    const params = new URLSearchParams(window.location.search);

    // Filter players
    const playersS = params.get('players');
    if (playersS && playersS !== 'any') {
        if (playersS === 'banking') {
            allGames = allGames.filter(g => g.players === 'banking');
        } else {
            const players = parseInt(playersS);
            allGames = allGames.filter(g => {
                if (g.players === 'any') {
                    return true;
                }

                if (g.players === 'banking') {
                    return players >= 2;
                }

                if (typeof g.players === 'number') {
                    return g.players === players;
                }

                if (Array.isArray(g.players)) {
                    return g.players.includes(players);
                }

                if ('min' in g.players) {
                    if (g.players.max) {
                        return players >= g.players.min && players <= g.players.max;
                    }

                    return players >= g.players.min;
                }

                let _: never = g.players;
                console.error("unable to process filter");
                return false;
            });
        }
    }

    // Filter equipment
    const equipmentS = params.get('equipment');
    if (equipmentS && equipmentS !== 'any') {
        allGames = allGames.filter(g => g.equipment === equipmentS);
    }

    // Filter country
    const countryS = params.get('country');
    if (countryS && countryS !== 'any') {
        allGames = allGames.filter(g => g.countries && g.countries.indexOf(countryS) >= 0);
    }

    dest.replaceChildren(...allGames.map(g => {
        const li = document.createElement("li")
        if (g.variant) {
            li.classList.add('game-variant');
        }

        const link = document.createElement('a');
        link.setAttribute('href', g.url);
        if (g.titleLang) {
            link.setAttribute('lang', g.titleLang);
        }

        link.innerHTML = `${g.title}${g.originalTitle ? ` (${g.originalTitle})` : ''}${g.draft ? ' <span class="draft">Draft</span>' : ''}`;

        li.appendChild(link);
        return li;
    }));
}

function getGames(data: Data) {
    const expandPlayers = (title: string, players: Players | undefined): Players => {
        if (players === undefined) {
            console.warn('No players specified for ' + title);
            return [];
        }

        return players;
    }

    return data.collections.game.filter(g => !IS_PRODUCTION || !g.data.draft).flatMap(g =>
        [
            {
                title: g.data.title,
                titleLang: g.data.titleLang,
                url: g.url,
                draft: g.data.draft,
                originalTitle: g.data.originalTitle,
                players: expandPlayers(g.data.title, g.data.players),
                equipment: g.data.equipment,
                countries: g.data.countries,
            },
            ...(g.data.subgames || []).map(sg => ({
                title: sg.title,
                draft: g.data.draft,
                titleLang: sg.titleLang,
                originalTitle: sg.originalTitle,
                players: expandPlayers(sg.title, sg.players || g.data.players),
                equipment: sg.equipment || g.data.equipment,
                countries: sg.countries || g.data.countries,
                url: g.url + "#" + (sg.slug || slug(sg.title)),
                variant: true,
            }))
        ]);
}

export function render(this: Context, data: Data): React.JSX.Element {
    const expandedGames: RenderableGame[] = getGames(data);

    const equipment = new Set<string>();
    for (const g of expandedGames) {
        if (g.equipment) {
            equipment.add(g.equipment);
        } else {
            console.warn(`no equipment for ${g.title}`);
        }
    }

    const countries = new Set<string>();
    for (const g of expandedGames) {
        if (g.countries) {
            for (const c of g.countries.split(',')) {
                countries.add(c);
            }
        } else {
            console.warn(`no countries for ${g.title}`);
        }
    }

    const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });
    const countryNames = new Intl.DisplayNames(["en"], { type: "region", style: "short" });

    const sortedEquipment = [...equipment.values()].sort(collator.compare);
    const sortedCountries = [...countries.values()].sort((x, y) => collator.compare(countryNames.of(x)!, countryNames.of(y)!));

    expandedGames.sort((x, y) => x.title.localeCompare(y.title, 'en'));

    return (<>
        <h2>Filters</h2>
        <form>
            <div className="form-group row">
                <label htmlFor="player-select" className="col-sm-3 col-form-label">Players:</label>
                <div className="col-sm-7">
                    <select id="player-select" className="form-control">
                        <option selected>any</option>
                        <option value="banking">banking games (1+any)</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                </div>
            </div>

            <div className="form-group row mt-2">
                <label htmlFor="equipment-select" className="col-sm-3 col-form-label">Type/Equipment:</label>
                <div className="col-sm-7">
                    <select id="equipment-select" className="form-control">
                        <option selected>any</option>
                        {sortedEquipment.map((x, ix) => <option key={ix}>{x}</option>)}
                    </select>
                </div>
            </div>

            <div className="form-group row mt-2">
                <label htmlFor="country-select" className="col-sm-3 col-form-label">Country:</label>
                <div className="col-sm-7">
                    <select id="country-select" className="form-control">
                        <option selected>any</option>
                        {sortedCountries.map((x, ix) => <option key={ix} value={x}>{countryNames.of(x)}</option>)}
                    </select>
                </div>
            </div>
        </form>

        <h2>List</h2>
        <ul id="games-list" className="columnarr wide">
            {expandedGames.map((g, ix) =>
                <li key={ix} className={g.variant ? "game-variant" : undefined}>
                    <a href={g.url} lang={g.titleLang}>
                        <span dangerouslySetInnerHTML={safeHTML(g.title)} />
                        {g.originalTitle && <> (<span dangerouslySetInnerHTML={safeHTML(g.originalTitle)} />)</>}
                    </a>
                </li>
            )}
        </ul>
    </>);
}
