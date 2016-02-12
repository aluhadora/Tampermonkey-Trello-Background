// ==UserScript==
// @name         Trello background
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make myself feel less like a plebian
// @author       You
// @include      https://trello.com/b/*/todo
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function parseImgur(url) {
  alert(url);
}

function main() {
    
    function checkImgur(url) {
        if (url.match(/imgur.com/) == null) return(url);
        if (url.match(/i\.imgur\.com/) != null) return(url);
        
        console.log(url);
        return(url.replace(/imgur/, 'i.imgur').replace(/imgur\.com\/(.*)/, 'imgur.com/$1.png'));
    }
    
  $.getJSON('https://www.reddit.com/r/earthporn/top.json?limit=15', {}, function(JsonData){
  
      var index = Math.floor((Math.random() * 15));
      console.log(index);
      
      url = JsonData.data.children[index].data.url;
      console.log(url);
      
      $('body').css('background-image', 'url(' + checkImgur(url) + ')');
  });
    
  
  $('body').css('background-size', 'contain');
  $('body').css('background-repeat', 'no-repeat');
  $('body').css('background-position', 'center');
}

// load jQuery and execute the main function
function start() {
    addJQuery(main);
}

start();
window.setInterval(start, 300000);