const { IS_PRODUCTION, ifSet } = require('../helpers');

const slug = require('slug');

exports.data = {
    title: "Games",
    layout: "columned"
};

function removeParam(param) {
    const params = new URLSearchParams(window.location.search);
    params.delete(param);
    window.history.pushState(null, null, '?' + params.toString());
}

function genFilterRemover(name, param, existingNode) {
    const result = document.createElement('li');
    result.appendChild(document.createTextNode(name + ' '));

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'text-danger');
    button.appendChild(document.createTextNode('✖'))
    button.onclick = () => {
        removeParam(param);
        result.replaceWith(existingNode);
        renderGames();
    };

    result.appendChild(button);
    return result;
}

function renderGames() {
    let allGames = GAMES;
    const dest = document.getElementById('games-list');
    const params = new URLSearchParams(window.location.search);

    const playersS = params.get('players');
    if (playersS) {
        const players = parseInt(playersS);
        const playerFilter = document.getElementById("player-filter");
        playerFilter.replaceWith(genFilterRemover(`Players: ${players}`, 'players', playerFilter));
        allGames = allGames.filter(g => {
            if (g.players) {
                return g.players.includes(players);
            }

            return false;
        });
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

        link.innerHTML = `${g.title}${g.originalTitle?` (${g.originalTitle})`:''}${g.draft?' <span class="badge bg-warning text-dark">Draft</span>':''}`;

        li.appendChild(link);
        return li;
    }));
}

exports.render = function (data) {
    const expandPlayers = (players) => {
        if (players === undefined) {
            return [];
        }

        if (typeof players === 'number') {
            return [players];
        }

        if (Array.isArray(players)) {
            return players;
        }

        if (players.min && players.max) {
            const result = [];
            for (let i = players.min; i <= players.max; ++i) {
                result.push(i);
            }

            return result;
        }

        throw new Error("cannot handle players: " + players);
    }

    const expandedGames = data.collections.game.filter(g => !IS_PRODUCTION || !g.data.draft).flatMap(g =>
        [
            { title: g.data.title, titleLang: g.data.titleLang, url: g.url, draft: g.data.draft, originalTitle: g.data.originalTitle, players: expandPlayers(g.data.players) },
            ...(g.data.subgames || []).map(sg => ({
                title: sg.title,
                draft: g.data.draft,
                titleLang: sg.titleLang,
                originalTitle: sg.originalTitle,
                players: expandPlayers(sg.players || g.data.players),
                url: g.url + "#" + (sg.slug || slug(sg.title)),
                variant: true,
            }))
        ]);

    expandedGames.sort((x, y) => x.title.localeCompare(y.title, 'en'));

    const script = `<script>
        const GAMES=${JSON.stringify(expandedGames)};
        ${removeParam}
        ${genFilterRemover}
        ${renderGames}
        renderGames();
        const playerSelect = document.getElementById('player-select');
        playerSelect.onchange = () => {
            if (playerSelect.value !== 'any') {
                const params = new URLSearchParams(window.location.search);
                params.set('players', playerSelect.value);
                window.history.pushState(null, null, '?' + params.toString());
                renderGames();
            }
        }
        </script>`;

    return '<h2>Filters</h2>'
        + '<ul id="filters">'
        + '<li id="player-filter">Players: <select id="player-select">'
        + '<option>any</option>'
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
        + '</select></li>'
        + '</ul>'
        + '<h2>List</h2>'
        + '<ul id="games-list" class="columnar">'
        + expandedGames.map(post => {
            //console.log(post);
            return `<li${(post.variant ? ' class="game-variant"' : '')}>`
            +`<a href="${post.url}"${this.asAttr("lang", post.titleLang)}>${post.title}${ifSet(post.originalTitle, ` (${post.originalTitle})`)}</a>`
            +'</li>';
        }).join("\n")
        + '</ul>'
        + script;
}
