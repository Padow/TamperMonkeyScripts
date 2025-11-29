// ==UserScript==
// @name         Youtube ambiant mode disabler
// @namespace    http://tampermonkey.net/
// @version      2025-11-29
// @description  disable ambiant light
// @copyright none
// @require https://code.jquery.com/jquery-latest.min.js
// @match https://www.youtube.com/*
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

$(document).ready(function() {

    var k = 0;
    const text = "Éclairage de cinéma"

    function checkAmbientMode() {
        if (k > 500) {
            window.clearInterval(itvl3);
        } else if (/https:\/\/www\.youtube\.com\/watch.*/.test(document.URL)) {
            $(".ytp-settings-button").click()
            setTimeout(function() {
                var ariaChecked = $('div:contains("' + text + '")').parents('div[class^="ytp-menuitem"]')[0].ariaChecked
                if (ariaChecked == "true") {
                    $('div:contains("' + text + '")').parents('div[class^="ytp-menuitem"]')[0].click()
                    k = 501
                }
                if (ariaChecked == "false") {
                    k = 501
                }
                $(".ytp-settings-button").click()
            }, 100);
        }
        k++
    }

    var itvl3 = window.setInterval(function() {
        checkAmbientMode();
    }, 1000);
});
