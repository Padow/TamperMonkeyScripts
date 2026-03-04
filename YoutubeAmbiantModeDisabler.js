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

    var k = 0
    var l = 0
    var awaitTime = 0
    const maxk = 5
    const maxAwaitTime = 500
    const ambiantLight = "Éclairage de cinéma"

    function getDiv(text) {
        return Array.prototype.slice.call(document.querySelectorAll('div'))
            .filter(function(el) {
                return el.textContent === text
            })[0]
    }

    function checkAmbientMode() {
        if (k >= maxk || awaitTime >= maxAwaitTime) {
            console.warn("Clear interval ambiant mode")
            window.clearInterval(itvl3);
        } else if (/https:\/\/www\.youtube\.com\/watch.*/.test(document.URL)) {
            var cogWheel = document.querySelectorAll(".ytp-settings-button")[0]
            console.log(cogWheel)
            if (cogWheel != undefined) {
                cogWheel.click()
                setTimeout(function() {
                    var sliderButton = getDiv(ambiantLight)
                    if (sliderButton != undefined) {
                        if (sliderButton.ariaChecked == "true") {
                            sliderButton.click()
                        }
                        k = maxk
                    }
                }, 100)
                cogWheel.click()
            }
            k++
        }
        awaitTime++
    }

    function autoNaveDisable() {
        if (l > 500) {
            console.warn("Clear interval auto nav")
            window.clearInterval(itvl4);
        } else if (/https:\/\/www\.youtube\.com\/watch.*/.test(document.URL) && k >= maxk) {

            setTimeout(function() {
                var button = document.querySelectorAll(".ytp-autonav-toggle-button")[0];
                if (button != undefined) {
                    var ariaChecked = button.ariaChecked
                    if (ariaChecked == "true") {
                        button.click();
                        l = 501
                    }

                    if (ariaChecked == "false") {
                        l = 501
                    }
                }

            }, 100)
        }
        l++
    }


    var itvl3 = window.setInterval(function() {
        checkAmbientMode();
    }, 500);

    var itvl4 = window.setInterval(function() {
        autoNaveDisable();
    }, 100)
})();
