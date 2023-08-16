import { IS_PRODUCTION, ifSet } from '../helpers';

import slug from 'slug';
import { Article, Context, Data, GameData, Players } from '../types';

export const data = {
    title: "Games",
    layout: "columned",
    eleventyImport: {
        collections: ["game"]
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

        link.innerHTML = `${g.title}${g.originalTitle ? ` (${g.originalTitle})` : ''}${g.draft ? ' <span class="badge bg-warning text-dark">Draft</span>' : ''}`;

        li.appendChild(link);
        return li;
    }));
}

export function render(this: Context, data: Data) {
    const expandPlayers = (title: string, players: Players | undefined): Players => {
        if (players === undefined) {
            console.warn('No players specified for ' + title);
            return [];
        }

        return players;
    }

    const expandedGames: RenderableGame[] = data.collections.game.filter(g => !IS_PRODUCTION || !g.data.draft).flatMap(g =>
        [
            {
                title: g.data.title,
                titleLang: g.data.titleLang,
                url: g.url,
                draft: g.data.draft,
                originalTitle: g.data.originalTitle,
                players: expandPlayers(g.data.title, g.data.players),
                equipment: g.data.equipment,
            },
            ...(g.data.subgames || []).map(sg => ({
                title: sg.title,
                draft: g.data.draft,
                titleLang: sg.titleLang,
                originalTitle: sg.originalTitle,
                players: expandPlayers(sg.title, sg.players || g.data.players),
                equipment: sg.equipment || g.data.equipment,
                url: g.url + "#" + (sg.slug || slug(sg.title)),
                variant: true,
            }))
        ]);

    const equipment = new Set<string>();
    for (const g of expandedGames) {
        if (g.equipment) {
            equipment.add(g.equipment);
        } else {
            console.warn(`no equipment for ${g.title}`);
        }
    }

    const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

    const sortedEquipment = [...equipment.values()].sort(collator.compare);

    expandedGames.sort((x, y) => x.title.localeCompare(y.title, 'en'));

    const script = `<script type="module">
        const GAMES=${JSON.stringify(expandedGames)};
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
            renderGames(GAMES);
        });
        </script>`;

    return '<h2>Filters</h2>'
        + '<form>'

        + '<div class="form-group row">'
        + '<label for="player-select" class="col-sm-2 col-form-label">Players:</label>'
        + '<div class="col-sm-10">'
        + '<select id="player-select" class="form-control">'
        + '<option selected>any</option>'
        + '<option value="banking">banking games (1+any)</option>'
        + '<option>1</option>'
        + '<option>2</option>'
        + '<option>3</option>'
        + '<option>4</option>'
        + '<option>5</option>'
        + '<option>6</option>'
        + '<option>7</option>'
        + '<option>8</option>'
        + '<option>9</option>'
        + '<option>10</option>'
        + '</select>'
        + '</div>'
        + '</div>'

        + '<div class="form-group row mt-2">'
        + '<label for="equipment-select" class="col-sm-2 col-form-label">Equipment:</label>'
        + '<div class="col-sm-10">'
        + '<select id="equipment-select" class="form-control">'
        + '<option selected>any</option>'
        + sortedEquipment.map(e => `<option>${e}</option>`).join('')
        + '</select>'
        + '</div>'
        + '</div>'
        + '</form>'

        + '<h2>List</h2>'
        + '<ul id="games-list" class="columnarr wide">'
        + expandedGames.map(g => {
            return `<li${(g.variant ? ' class="game-variant"' : '')}>`
                + `<a href="${g.url}"${this.asAttr("lang", g.titleLang)}>${g.title}${ifSet(g.originalTitle, ` (${g.originalTitle})`)}</a>`
                + '</li>';
        }).join("\n")
        + '</ul>'
        + script;
}
