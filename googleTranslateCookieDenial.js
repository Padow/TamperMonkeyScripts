// ==UserScript==
// @name       Translate cookie denial
// @namespace  none
// @version    0.1
// @description  Click refuse cookie
// @icon https://raw.githubusercontent.com/Padow/TamperMonkeyScripts/refs/heads/main/NoCookies.png
// @copyright none
// @match https://consent.google.fr/*
// ==/UserScript==


(function() {
    'use strict';

  var i = 0
  var defuse = function() {
    var gc = document.querySelectorAll('[aria-label="Tout refuser"]')[0];
    if (gc != null) {
      console.log("Google consent cookies refused")
      gc.click()
      i = 10
    }
    i++
    if (i > 10) {
      window.clearInterval(itvl1);
    }
  }

  var itvl1 = window.setInterval(function() {
    defuse();
  }, 500);

})();
