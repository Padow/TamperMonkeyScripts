// ==UserScript==
// @name         Youtube cookie denial
// @namespace    http://tampermonkey.net/
// @version      2025-11-29
// @description  refuse cookie disable ambiant light
// @icon https://raw.githubusercontent.com/Padow/TamperMonkeyScripts/refs/heads/main/NoCookies.png
// @copyright none
// @match https://www.youtube.com/*
// @match https://consent.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';
    var i = 0
    var j = 0
    var defuse = function() {
        var yt = document.querySelectorAll('[aria-label="Refuser l\'utilisation de cookies et d\'autres données aux fins décrites"]')[0];
        if (yt != null) {
            console.log("Youtube cookies refused")
            yt.click()
            i = 10
        }
        i++
        if (i > 10) {
            window.clearInterval(itvl1);
        }
    }

    var defusebis = function() {
        var yt = document.querySelectorAll('[aria-label="Tout refuser"]')[0];
        if (yt != null) {
            console.log("Youtube cookies refused")
            yt.click()
            j = 10
        }
        j++
        if (j > 10) {
            window.clearInterval(itvl2);
        }
    }

    var itvl1 = window.setInterval(function() {
        defuse();
    }, 100);


    var itvl2 = window.setInterval(function() {
        defusebis();
    }, 100);

})();
