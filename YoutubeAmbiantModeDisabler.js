// ==UserScript==
// @name         Youtube ambiant mode disabler
// @namespace    http://tampermonkey.net/
// @version      2025-11-29
// @description  disable ambiant light
// @copyright none
// @match https://www.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    var k = 0;
    var l = 0
    const ambiantLight = "Éclairage de cinéma"

    function getDiv(text) {
        return Array.prototype.slice.call(document.querySelectorAll('div'))
                 .filter(function (el) {
                    return el.textContent === text
               })[0]
    }

    function checkAmbientMode() {
        if (k > 500) {
            window.clearInterval(itvl3);
        } else if (/https:\/\/www\.youtube\.com\/watch.*/.test(document.URL)) {
            document.querySelectorAll(".ytp-settings-button")[0].click()
            setTimeout(function() {

                var ariaChecked = getDiv(ambiantLight).ariaChecked
                console.error(ariaChecked)
                if (ariaChecked == "true") {
                    getDiv(ambiantLight).click()
                    k = 501
                }

                if (ariaChecked == "false") {
                    k = 501
                }


            }, 100)
            document.querySelectorAll(".ytp-settings-button")[0].click()

        }
        k++
    }

  function autoNaveDisable() {
        if (l > 500) {
            window.clearInterval(itvl4);
        } else if (/https:\/\/www\.youtube\.com\/watch.*/.test(document.URL) && k > 500) {

            setTimeout(function() {
                var button = document.querySelectorAll(".ytp-autonav-toggle-button")[0];
                var ariaChecked = button.ariaChecked
                if (ariaChecked == "true") {
                    button.click();
                    l = 501
                }

                if (ariaChecked == "false") {
                    l = 501
                }

            }, 100)
        }
        l++
    }


    var itvl3 = window.setInterval(function() {
        checkAmbientMode();
    }, 1000);

    var itvl4 = window.setInterval(function() {
        autoNaveDisable();
    })
})();
