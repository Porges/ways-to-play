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
