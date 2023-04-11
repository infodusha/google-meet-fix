const key = 'authuser';
const manifestEl = document.querySelector('link[rel=manifest]');

if (manifestEl) {
    const url = new URL(manifestEl.href);
    if (url.searchParams.has(key)) {
        fetch(url)
            .then(response => response.json())
            .then((manifest) => modify(manifest, url))
            .catch(console.error);
    }
}

function modify(manifest, url) {
    const startUrl = new URL(manifest.start_url, url);
    startUrl.searchParams.set(key, url.searchParams.get(key))
    const newManifest = { ...manifest, start_url: startUrl.toString() };
    const blob = new Blob([JSON.stringify(newManifest)], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(blob);
    manifestEl.setAttribute('href', manifestURL);
}
