// ==UserScript==
// @name       Google cookie denial
// @namespace  none
// @version    0.1
// @icon https://raw.githubusercontent.com/Padow/TamperMonkeyScripts/refs/heads/main/NoCookies.png
// @description  Click refuse cookie
// @copyright none
// @match https://www.google.com/*
// ==/UserScript==

(function() {
    'use strict';

  var google = document.getElementById("W0wltc");
  if (google != null) {
    console.log("Google cookies refused")
    google.click();
  }

})();
