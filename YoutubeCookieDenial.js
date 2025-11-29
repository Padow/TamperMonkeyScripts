// ==UserScript==
// @name         Youtube cookie denial & ambiant mode disabler
// @namespace    http://tampermonkey.net/
// @version      2025-11-29
// @description  refuse cookie disable ambiant light
// @copyright none
// @require https://code.jquery.com/jquery-latest.min.js
// @match https://www.youtube.com/*
// @match https://consent.youtube.com/*
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

$(document).ready(function() {

    var i = 0
    var j = 0

    var end = false

    var defuse = function() {
        var yt = document.querySelectorAll('[aria-label="Refuser l\'utilisation de cookies et d\'autres données aux fins décrites"]')[0];
        if (yt != null) {
            console.log("Youtube cookies refused")
            yt.click()
            i = 10
        }
        i++
        if (i > 10) {
            end = true
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
    }, 500);

});
