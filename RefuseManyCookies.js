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

    console.log("############################# SCRIPT LOADED ##########################################")
    const excludeWebsites = ["www.cse-sncf-connect.com"]

    const wordings = ["Continuer sans accepter",
        "Continuer sans accepter →",
        "Refuser",
        "Refuser les cookies non nécessaires",
        "Reject", "Tout rejeter",
        "Tout Refuser",
        "Refuser",
        "Reject Optional Cookies",
        "deny",
        "Reject all",
        "Use necessary cookies only",
        "Only necessary cookies"
    ]

    const maxTry = 100
    var i = 0
    var seekAndDestroyCookie = undefined
    var awaitPageLoad = undefined


    //console.warn(document.URL.split("/", 3)[2])
    if (!excludeWebsites.includes(document.URL.split("/", 3)[2])) {
        awaitPageLoad = window.setInterval(isPageLoaded, 20)
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

})();
