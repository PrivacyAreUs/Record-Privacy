// ==UserScript==
// @name         Record
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Stop Discord spying via fingerprinting, tracking icons, science endpoints, Sentry, and third-party embeds
// @author       PrivacyAre.Us
// @match        *://*.discord.com/*
// @grant        GM_xmlhttpRequest
// @connect      open.spotify.com
// @grant        none
// @compatible   chrome Chrome + Tampermonkey or Violentmonkey
// @compatible   firefox Firefox + Tampermonkey
// @compatible   opera Opera + Tampermonkey or Violentmonkey
// @compatible   edge Edge + Tampermonkey or Violentmonkey
// @compatible   safari Safari + Tampermonkey or Violentmonkey
// @updateURL    https://github.com/PrivacyAreUs/Record-Privacy/raw/refs/heads/main/src/Record.user.js
// @downloadURL  https://github.com/PrivacyAreUs/Record-Privacy/raw/refs/heads/main/src/Record.user.js
// ==/UserScript==
(function() {
    'use strict';

    function addStyles() {
        const css = ` .status-1LqJ1, .activity-1rI2Q, .avatar-3EQep, .presence-2qW7b, .user-info-2zN2z {display: none !important;}.music-placeholder {display: flex;align-items: center;width: 350px;min-height: 80px;margin: 5px 0;padding: 10px 12px;border-radius: 10px;font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-weight: bold;text-decoration: none;cursor: pointer;box-shadow: 0 2px 6px rgba(0,0,0,0.3);overflow: hidden;}.spotify-placeholder {background: linear-gradient(135deg, #1DB954, #1AA34A);color: #fff;}.spotify-placeholder .music-title, .spotify-placeholder .music-artist, .spotify-placeholder .music-meta, .spotify-placeholder .music-note {color: #fff;}.apple-placeholder {background: linear-gradient(135deg, #FFFFFF, #F0F0F0);color: #050505;}.apple-placeholder .music-title, .apple-placeholder .music-artist, .apple-placeholder .music-meta, .apple-placeholder .music-note {color: #050505;}.music-art {width: 48px;height: 48px;border-radius: 10px;margin-right: 12px;flex-shrink: 0;display: flex;align-items: center;justify-content: center;}.music-info {display: flex;flex-direction: column;justify-content: center;overflow: hidden;}.music-title, .music-artist, .music-meta {font-size: 13px;line-height: 1.2;margin: 2px 0;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}.music-meta {font-size: 11px;}.music-note {font-size: 11px;font-style: italic;}`;
        if (typeof GM_addStyle === 'function') {
            GM_addStyle(css);
        } else {
            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        }
    }

    const SPOTIFY_ICON = `<svg viewBox="0 0 48 48" width="32" height="32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Color-" transform="translate(-200.000000, -460.000000)" fill="#fff"><path d="M238.16,481.36 C230.48,476.8 217.64,476.32 210.32,478.6 C209.12,478.96 207.92,478.24 207.56,477.16 C207.2,475.96 207.92,474.76 209,474.4 C217.52,471.88 231.56,472.36 240.44,477.64 C241.52,478.24 241.88,479.68 241.28,480.76 C240.68,481.6 239.24,481.96 238.16,481.36 M237.92,488.08 C237.32,488.92 236.24,489.28 235.4,488.68 C228.92,484.72 219.08,483.52 211.52,485.92 C210.56,486.16 209.48,485.68 209.24,484.72 C209,483.76 209.48,482.68 210.44,482.44 C219.2,479.8 230,481.12 237.44,485.68 C238.16,486.04 238.52,487.24 237.92,488.08 M235.04,494.68 C234.56,495.4 233.72,495.64 233,495.16 C227.36,491.68 220.28,490.96 211.88,492.88 C211.04,493.12 210.32,492.52 210.08,491.8 C209.84,490.96 210.44,490.24 211.16,490 C220.28,487.96 228.2,488.8 234.44,492.64 C235.28,493 235.4,493.96 235.04,494.68 M224,460 C210.8,460 200,470.8 200,484 C200,497.2 210.8,508 224,508 C237.2,508 248,497.2 248,484 C248,470.8 237.32,460 224,460" id="Spotify"></path></g></g></g></svg>`;
    const APPLE_ICON = `<svg viewBox="-3.5 0 48 48" width="32" height="32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#050505"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>Apple-color</title><desc>Created with Sketch.</desc><defs></defs><g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Color-" transform="translate(-204.000000, -560.000000)" fill="#050505"><path d="M231.174735,567.792499 C232.740177,565.771699 233.926883,562.915484 233.497649,560 C230.939077,560.177808 227.948466,561.814769 226.203475,563.948463 C224.612784,565.88177 223.305444,568.757742 223.816036,571.549042 C226.613071,571.636535 229.499881,569.960061 231.174735,567.792499 L231.174735,567.792499 Z M245,595.217241 C243.880625,597.712195 243.341978,598.827022 241.899976,601.03692 C239.888467,604.121745 237.052156,607.962958 233.53412,607.991182 C230.411652,608.02505 229.606488,605.94498 225.367451,605.970382 C221.128414,605.99296 220.244696,608.030695 217.116618,607.999649 C213.601387,607.968603 210.913765,604.502761 208.902256,601.417937 C203.27452,592.79849 202.68257,582.680377 206.152914,577.298162 C208.621711,573.476705 212.515678,571.241407 216.173986,571.241407 C219.89682,571.241407 222.239372,573.296075 225.322563,573.296075 C228.313175,573.296075 230.133913,571.235762 234.440281,571.235762 C237.700215,571.235762 241.153726,573.022307 243.611302,576.10431 C235.554045,580.546683 236.85858,592.121127 245,595.217241 L245,595.217241 Z" id="Apple"></path></g></g></g></svg>`;

    function parseAppleMusic(url) {
        const match = url.match(/\/([a-z]{2})\/album\/([^/]+)\/([0-9]+)/i);
        if (!match) return {
            title: 'Apple Music Track',
            region: '',
            albumId: ''
        };
        return {
            title: decodeURIComponent(match[2]).replace(/-/g, ' '),
            region: match[1].toUpperCase(),
            albumId: match[3]
        };
    }

    function fetchSpotify(trackId, cb) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`,
            onload: res => {
                try {
                    cb(JSON.parse(res.responseText));
                } catch {
                    cb(null);
                }
            },
            onerror: () => cb(null)
        });
    }

    function createSpotifyPlaceholder(trackId, url) {
        const container = document.createElement('a');
        container.href = url;
        container.target = '_blank';
        container.className = 'music-placeholder spotify-placeholder';

        const artDiv = document.createElement('div');
        artDiv.className = 'music-art';
        artDiv.innerHTML = SPOTIFY_ICON;
        container.appendChild(artDiv);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'music-info';
        infoDiv.innerHTML = `<div class="music-title">Loading...</div>
                             <div class="music-artist"></div>
                             <div class="music-note">Click to open Spotify</div>
                             <div class="music-meta"></div>`;
        container.appendChild(infoDiv);

        fetchSpotify(trackId, data => {
            if (!data) return;
            const titleDiv = infoDiv.querySelector('.music-title');
            const artistDiv = infoDiv.querySelector('.music-artist');
            const metaDiv = infoDiv.querySelector('.music-meta');
            titleDiv.textContent = data.title || 'Track';
            artistDiv.textContent = data.author_name || '';
            metaDiv.textContent = `Spotify ID: ${trackId}`;
        });

        return container;
    }

    function createApplePlaceholder(url) {
        const {
            title,
            region,
            albumId
        } = parseAppleMusic(url);
        const container = document.createElement('a');
        container.href = url;
        container.target = '_blank';
        container.className = 'music-placeholder apple-placeholder';

        const artDiv = document.createElement('div');
        artDiv.className = 'music-art';
        artDiv.innerHTML = APPLE_ICON;
        container.appendChild(artDiv);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'music-info';
        infoDiv.innerHTML = `<div class="music-title">${title}</div>
                             <div class="music-note">Click to open Apple Music</div>
                             <div class="music-meta">Region: ${region}, Album ID: ${albumId}</div>`;
        container.appendChild(infoDiv);

        return container;
    }

    // Replace tracking embeds
    function replaceEmbeds(root = document) {
        const iframes = root.querySelectorAll('iframe:not([data-replaced])');
        iframes.forEach(iframe => {
            const src = iframe.src;
            if (!src) return;

            if (src.includes('open.spotify.com/embed')) {
                const trackId = new URL(src).pathname.split('/').pop();
                const placeholder = createSpotifyPlaceholder(trackId, `https://open.spotify.com/track/${trackId}`);
                iframe.replaceWith(placeholder);
                placeholder.dataset.replaced = 'true';
            } else if (src.includes('embed.music.apple.com')) {
                const placeholder = createApplePlaceholder(src);
                iframe.replaceWith(placeholder);
                placeholder.dataset.replaced = 'true';
            }
        });
    }

    // Replace YouTube and Twitter/X links in message content
    function replaceLinksInMessage(content) {
        // YouTube to Invidious (yewtu.be)
        content = content.replace(/(https?:\/\/)(?:www\.)?(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(?:[?&][^\s]*)?/g, '$1yewtu.be/watch?v=$2');
        // Twitter/X to Fxtwitter
        content = content.replace(/(https?:\/\/)(?:www\.)?(?:twitter\.com|x\.com)(\/[^?\s]*)(?:[?][^\s]*)?/g, '$1fxtwitter.com$2');
        return content;
    }

    // Block tracking endpoints and sentry.io tracking / analytics
    function blockTrackingEndpoints() {
        const originalFetch = window.fetch;
        window.fetch = async function(url, options) {
            if (typeof url === 'string' && (url.includes('/science') || url.includes('/track') || url.includes('/analytics') || url.includes('/experiments') || url.includes('sentry.io'))) {
                console.log(`Blocked tracking request to: ${url}`);
                return {
                    ok: true,
                    status: 200,
                    json: async () => ({})
                };
            }
            return originalFetch.apply(this, [url, options]);
        };

        const originalXhrOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
            if (typeof url === 'string' && (url.includes('/science') || url.includes('/track') || url.includes('/analytics') || url.includes('/experiments') || url.includes('sentry.io'))) {
                console.log(`Blocked XHR tracking request to: ${url}`);
                return;
            }
            return originalXhrOpen.apply(this, arguments);
        };
    }

    // Block WebGL fingerprinting
    function blockWebGLFingerprinting() {
        const originalGetContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function(contextType) {
            if (contextType === 'webgl' || contextType === 'webgl2') {
                console.log('Blocked WebGL fingerprinting attempt');
                return null;
            }
            return originalGetContext.apply(this, arguments);
        };
    }

    const CUSTOM_FAVICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAH0lEQVR42mNgwAL8//8/AwMDEwODAwPD/wMDw3AAAIgAZc5o3oIAAAAASUVORK5CYII=';

    function replaceFavicon() {
        const faviconLinks = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="mask-icon"]');
        faviconLinks.forEach(link => link.remove());

        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = CUSTOM_FAVICON;
        document.head.appendChild(newFavicon);
    }

    function init() {
        addStyles();
        blockTrackingEndpoints();
        blockWebGLFingerprinting();
        replaceEmbeds();
        // replaceFavicon();

        // Monitor favicon changes
        const faviconObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === 'LINK' && (node.rel === 'mask-icon' || node.rel === 'apple-touch-icon' || node.rel === 'icon')) {
                        node.remove();
                        const newFaviconClone = document.createElement('link');
                        newFaviconClone.rel = 'icon';
                        newFaviconClone.href = CUSTOM_FAVICON;
                        document.head.appendChild(newFaviconClone);
                    }
                });
            });
        });
        faviconObserver.observe(document.head, {
            childList: true
        });

        // Monitor embed changes
        const embedObserver = new MutationObserver(mutations => {
            mutations.forEach(m => replaceEmbeds(m.target));
        });
        embedObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
