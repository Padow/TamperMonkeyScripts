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
    const excludeWebsites = []

    const wordings = ["Continuer sans accepter",
        "Continuer sans accepter →",
        "Refuser les cookies non nécessaires",
        "Tout rejeter",
        "Tout Refuser",
        "Reject Optional Cookies",
        "Reject all",
        "Use necessary cookies only",
        "Only necessary cookies",
        "Refuser",
        "Reject",
        "deny",
    ]

    const maxTry = 100
    var i = 0
    var seekAndDestroyCookie = undefined
    var awaitPageLoad = undefined

    if (!excludeWebsites.includes(webSiteUrl) && !getCookie(webSiteUrl)) {
        awaitPageLoad = window.setInterval(isPageLoaded, 20)
    } else {
        console.log("Script already executed or is disabled for this site")
    }

    function getSpan(text) {
        return Array.prototype.slice.call(document.querySelectorAll('span'))
            .filter(function(el) {
                return el.textContent.trim().toLowerCase() === text.toLowerCase()
            })[0]
    }

    function getButton(text) {
        return Array.prototype.slice.call(document.querySelectorAll('button'))
            .filter(function(el) {
                return el.textContent.trim().toLowerCase() === text.toLowerCase()
            })[0]
    }

    function getLink(text) {
        return Array.prototype.slice.call(document.querySelectorAll('a'))
            .filter(function(el) {
                return el.textContent.trim().toLowerCase() === text.toLowerCase()
            })[0]
    }

    function isPageLoaded() {
        if (document.readyState === "complete") {
            seekAndDestroyCookie = window.setInterval(seekAndClickRefuseCookie, 150);
            window.clearInterval(awaitPageLoad);
        }
    }

    function seekAndClickRefuseCookie() {
        if (i >= maxTry) {
            setCookie(webSiteUrl, true, 1)
            console.warn("Clear interval " + i)
            window.clearInterval(seekAndDestroyCookie);
        } else {
            wordings.some((element) => {
                if (i >= maxTry) {
                    return true;
                }

                var rbutton = getButton(element);
                if (rbutton != undefined && i < maxTry) {
                    console.warn("Cookies refused button")
                    //console.info(element + " - " + i)
                    rbutton.click()
                    i = maxTry
                    return true;
                }

                var rspan = getSpan(element);
                if (rspan != undefined && i < maxTry) {
                    console.warn("Cookies refused span")
                    //console.log(element + " - " + i)
                    rspan.click()
                    i = maxTry
                    return true;
                }

                var rlink = getLink(element);
                if (rlink != undefined && i < maxTry) {
                    console.warn("Cookies refused link")
                    //console.log(element + " - " + i)
                    rlink.click()
                    i = maxTry
                    return true;
                }

                i++
            })
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
