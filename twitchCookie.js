// ==UserScript==
// @name       Twitch cookie denial
// @namespace  none
// @version    0.1
// @description  Click refuse cookie
// @icon https://raw.githubusercontent.com/Padow/TamperMonkeyScripts/refs/heads/main/NoCookies.png
// @copyright none
// @require https://code.jquery.com/jquery-latest.min.js
// @match https://www.twitch.tv/*
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */


$(document).ready(function() {
  var i = 0
  var defuse = function() {
    var tw = $('div:contains("Rejeter")').parent();
    if (tw.is(':button')) {
      console.log("Twitch cookies refused")
      tw.click()
      i = 10
    }
    i++
    console.log(i)
    if (i > 10) {
      window.clearInterval(itvl1);
    }
  }

  var itvl1 = window.setInterval(function() {
    defuse();
  }, 500);

});
