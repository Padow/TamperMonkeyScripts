// ==UserScript==
// @name       Google cookie denial
// @namespace  none
// @version    0.1
// @description  Click refuse cookie
// @copyright none
// @require https://code.jquery.com/jquery-latest.min.js
// @match https://www.google.com/*
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */


$(document).ready(function() {
  console.log("toto")
  var google = document.getElementById("W0wltc");
  if (google != null) {
    console.log("Google cookies refused")
    google.click();
  }
});
