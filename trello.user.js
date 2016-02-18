// ==UserScript==
// @name         Trello background
// @namespace    http://tampermonkey.net/
// @version      0.7
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

function main() {
    
  var body = $('body');

  $.getJSON('https://www.reddit.com/r/earthporn/top.json?limit=15', {}, function(JsonData) {
  
      var index = Math.floor((Math.random() * 15));
      url = JsonData.data.children[index].data.url;
      preview = JsonData.data.children[index].data.preview.images[0].source.url;
      
      console.log('reddit index: ' + index + '; url: "' + url + '"; preview: "' + preview + '";');
      
      body.css('background-image', 'url(' + preview + ')');
  });

  body.css('background-size', '100%');
  body.css('background-repeat', 'no-repeat');
  body.css('background-position', 'center');
}

// load jQuery and execute the main function
addJQuery(main);
window.setInterval(main, 300000);

window.addEventListener("load", function(e) {
  addButton();
}, false);
 
function addButton() {
    var btn = document.createElement( 'a' );
    with( btn ) {
        setAttribute( 'class', 'header-btn' );
        setAttribute( 'id', 'bg-button' );
        setAttribute( 'href', '#' );
    }
    
    var span = document.createElement( 'span' );
    with (span)
    {
        setAttribute( 'class', 'header-btn-text js-member-name' );
    }
    
    var text = document.createTextNode("Change Background");
    
    span.appendChild(text);
    
    btn.appendChild(span);

    // append at end
    document.getElementsByClassName( 'header-user' )[ 0 ].appendChild( btn );
    addButtonListener();
}
 
function addButtonListener() { 
  var button = document.getElementById("bg-button");
  button.addEventListener('click',main,true);
}