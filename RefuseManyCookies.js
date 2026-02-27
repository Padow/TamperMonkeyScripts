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

    const excludeWebsites = []

    const wordings = ["Continuer sans accepter", "Refuser",
                    "Refuser les cookies non nécessaires",
                    "Reject", "Tout rejeter" ,
                    "Tout Refuser",
                    "Reject Optional Cookies", "deny", "Reject all",
                    "Use necessary cookies only"]

    const maxTry = 50
    const itvl11 = window.setInterval(defuse, 500);
    var i = 0
    //console.warn(document.URL.split("/", 3)[2])
    if (excludeWebsites.includes(document.URL.split("/", 3)[2])) { i = maxTry}

    function defuse() {
        if (i > maxTry - 1) {
            window.clearInterval(itvl11);
        } else {
            wordings.some((element) => {
                i++
                if (i > maxTry - 1) {
                    return true;
                }
                var rspan = getSpan(element);
                var rbutton = getButton(element);
                var rlink = getLink(element);

                if (rspan != undefined && i < maxTry - 1) {
                    console.warn("Cookies refused span")
                    console.log(element + " - " + i)
                    rspan.click()
                    i = maxTry
                }
                if (rbutton != undefined && i < maxTry - 1) {
                    console.warn("Cookies refused button")
                    console.log(element + " - " + i)
                    rbutton.click()
                    i = maxTry
                }
                if (rlink != undefined && i < maxTry - 1) {
                    console.warn("Cookies refused link")
                    console.log(element + " - " + i)
                    rlink.click()
                    i = maxTry
                }
            })
        }
    }

})();
