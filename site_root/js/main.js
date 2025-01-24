/* pop open the lightbox if the hash is present in the URL */
function doHashPopup({ newURL, oldURL }) {
  if (oldURL) {
    const oldHash = new URL(oldURL).hash;
    if (oldHash) {
      const old = document.getElementById(oldHash.substring(1));
      if (old.close) {
        old.close('navigated');
      }
    }
  }

  const newHash = new URL(newURL).hash;
  if (newHash) {
    const target = document.getElementById(newHash.substring(1));
    if (target.showModal) {
      target.showModal();
    }
  }
}

addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  const relTimeFormatter = new Intl.RelativeTimeFormat('en');
  for (const time of document.getElementsByClassName('relative')) {
    const t = new Date(time.getAttribute("datetime"));
    const diff = Math.trunc((t - now) / (24 * 60 * 60 * 1000));
    time.replaceChildren(relTimeFormatter.format(diff, 'day'));
  }
});

addEventListener('DOMContentLoaded', () => {
  for (const lb of document.getElementsByClassName('lightbox')) {
    lb.firstChild.addEventListener('click', () => lb.close('clicked'));
    lb.addEventListener('close', () => {
      if (lb.returnValue !== 'navigated') {
        history.replaceState("", document.title, window.location.pathname + window.location.search);
      }

      lb.returnValue = '';
    });
  }

  window.addEventListener('hashchange', doHashPopup);
  doHashPopup({ newURL: window.location.href });
});

// Bibliography sorter
addEventListener('DOMContentLoaded', () => {
  const collator = new Intl.Collator('en', { numeric: true, ignorePunctuation: true });

  function runSort(value) {
    const parts = value.split(' ');
    const keys = parts[0].split(',').map(key => `data-${key}`);
    const multiplier = parts[1] === 'desc' ? -1 : 1;
    const list = document.getElementById('ref-list');
    let children = Array.prototype.slice.call(list.children);
    list.replaceChildren();
    children = children
      .map(el => ({ el, keys: keys.map(key => el.getAttribute(key)) }))
      .sort((x, y) => multiplier * compareKeys(x.keys, y.keys, collator));
    const frag = document.createDocumentFragment();
    children.forEach(({ el }) => frag.appendChild(el));
    list.appendChild(frag);
  }

  function compareKeys(xs, ys, collator) {
    for (let i = 0; i < xs.length; i++) {
      const result = collator.compare(xs[i], ys[i]);
      if (result !== 0) {
        return result;
      }
    }

    return 0;
  }

  function handleSelect(value) {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', value);
    window.history.pushState('', '', '?' + params.toString());
    runSort(value);
  }

  const selector = document.getElementById('sort-selector');
  if (!selector) return;

  selector.addEventListener('change', () => handleSelect(selector.value));

  const params = new URLSearchParams(window.location.search);
  const sort = params.get('sort') || 'name,year';
  selector.value = sort;
  handleSelect(selector.value);
});

// Games sorter
addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('game-form');
  if (!form) return;
  
  const selects = form.getElementsByTagName('select');
  for (const select of selects) {
    select.addEventListener('change', () => handleSelect(select));
  }
  
  runFilter();
  
  function handleSelect(select) {
    const params = new URLSearchParams(window.location.search);
    if (!select.value) {
      params.delete(select.name);
    } else {
      params.set(select.name, select.value);
    }

    window.history.pushState('', '', '?' + params.toString());
    runFilter();
  }
  
  function runFilter() {
    const params = new URLSearchParams(window.location.search);

    /** @type {Map<string, string>} */
    const attrFilter = new Map(); 
    for (const select of selects) {
      const param = params.get(select.name);
      if (param) {
        attrFilter.set(`data-${select.name}`, param);
      }
    }
    
    const games = document.getElementById('games');
    for (const game of games.children) {
      let show = true;
      for (const [key, value] of attrFilter) {
        if (game.getAttribute(key) !== value) {
          show = false;
          break;
        }
      }
      
      game.hidden = !show;
    }
  }

});
