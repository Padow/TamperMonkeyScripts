// ==UserScript==
// @name         refuse cookie
// @namespace    http://tampermonkey.net/
// @version      2026-02-26
// @description  try to take over the world!
// @match        https://*/*
// @icon https://raw.githubusercontent.com/Padow/TamperMonkeyScripts/refs/heads/main/NoCookies.png
// @copyright none
// ==/UserScript==

(function() {
    'use strict';

    let webSiteUrl = document.URL.split("/", 3)[2]
    let cookieName = "cookieRefused"
    const excludeWebsites = []

    const wordings = ["Continuer sans accepter",
        "Continuer sans accepter →",
        "Refuser les cookies non nécessaires",
        "Refuser tous les cookies",
        "Tout rejeter",
        "Tout Refuser",
        "Refuser tous",
        "Reject Optional Cookies",
        "Reject all",
        "Use necessary cookies only",
        "Only necessary cookies",
        "Necessary cookies only",
        "Reject Optional",
        "Refuser",
        "Reject",
        "deny",
    ]

    const maxTry = 200
    var i = 0
    var seekAndDestroyCookie = undefined
    var awaitPageLoad = undefined
    var shadowDom = undefined

    if (!excludeWebsites.includes(webSiteUrl) && !getCookie(cookieName)) {
        awaitPageLoad = window.setInterval(isPageLoaded, 20)
    } else {
        console.log("Script already executed or is disabled for this site")
    }

    function findElement(text, elementKind) {
        return Array.prototype.slice.call(document.querySelectorAll(elementKind))
            .find((el) => el.textContent.trim().toLowerCase() === text.toLowerCase())
    }

    function findElementInShadow(text, elementKind, shadow) {
        return Array.prototype.slice.call(shadow.querySelectorAll(elementKind))
            .find((el) => el.textContent.trim().toLowerCase() === text.toLowerCase())
    }

    function isPageLoaded() {
        if (document.readyState === "complete") {
            seekAndDestroyCookie = window.setInterval(function() {
                seekAndClickRefuseCookie();
            }, 150);
            window.clearInterval(awaitPageLoad);
        }
    }

    function findRoots(el) {
        return [
                el,
                ...el.querySelectorAll('*')
            ].filter(e => !!e.shadowRoot)
            .flatMap(e => [e.shadowRoot, ...findRoots(e.shadowRoot)])
    }


    function seekAndClickRefuseCookie() {
        //console.log("CALL " + i)
        i++;
        if (i >= maxTry) {
            setCookie(cookieName, true, 1)
            console.warn("Clear interval " + i)
            window.clearInterval(seekAndDestroyCookie);
        } else {
            wordings.some((element) => {
                if (i >= maxTry) {
                    return true;
                }

                clicker(element, 'button');
                clicker(element, 'span');
                clicker(element, 'a');
            })


            shadowDom = findRoots(document);
            shadowDom.forEach(sd => {
                wordings.some((element) => {
                    if (i >= maxTry) {
                        return true;
                    }
                    shadowClick(element, 'button', sd)
                    shadowClick(element, 'span', sd)
                    shadowClick(element, 'a', sd)
                })
            })

        }
    }

    function clicker(element, elementKind) {
        var rbutton = findElement(element, elementKind);
        if (rbutton != undefined && i < maxTry) {
            console.warn("Cookies refused " + elementKind)
            //console.info(element + " - " + i)
            rbutton.click()
            i = maxTry
            return true;
        }
    }

    function shadowClick(element, elementKind, shadowElement) {
        var rbutton = findElementInShadow(element, elementKind, shadowElement);
        if (rbutton != undefined && i < maxTry) {
            console.warn("Cookies refused button")
            //console.info(element + " - " + i)
            rbutton.click()
            setCookie(cookieName, true, 1)
            window.location.reload();
        }
    }



    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

})();
