// ==UserScript==
// @name         fimfic_mark_as_read
// @version      0.1
// @description  Marks all chapters on the currently viewed story as read.  Button located under word count.
// @include      https://www.fimfiction.net/story/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant	GM_deleteValue
// @grant       GM_registerMenuCommand
// @downloadURL https://github.com/Gammahoof/userscripts/raw/master/fimfic_mark_as_read.user.js
// @updateURL	https://github.com/Gammahoof/userscripts/raw/master/fimfic_mark_as_read.user.js
// ==/UserScript==

var timeout_len = 2500; //timeout before moving on to the next page, in ms
// this variable should to be set by user to the script has time to fav all the images on each page.
// actual time varies with the number of images diplayed per page, computer speed, and internet connection speed
// some results found to work: 2000 for 10 images, 10000 for 50 images.  ymmv

//dont touch these
var only_unread = true;
var loop = false;

var tid = setInterval(function () {
    if (document.readyState !== 'complete')
        return;
    clearInterval(tid);
    onloaded();
}, 100);

function onloaded() {
    //console.log("Running FavAll");
    //var css = ".FTMenu{ width:24px; height:24px; position:fixed; right:10px; bottom:10px; border-radius:9px } .FTB1{ background:#6EAEDE; } #FTSHButton{width:20px; height:20px; position:absolute; right:2px; bottom:2px; border-radius:7px} .FTBtn{ background:#A8CEEB;} .FTBtn:hover{background:#D4E7F5;}";
    //var style = document.createElement('style');
    //style.type = 'text/css';
    //if (style.styleSheet) {
    //		style.styleSheet.cssText = css;
    //	} else {//
    //style.appendChild(document.createTextNode(css));
    //}
    //head = document.head || document.getElementsByTagName('head')[0];
    //	head.appendChild(style);
    //	var menudiv = document.createElement("div");
    //	menudiv.setAttribute("class", "FTMenu FTB1");
    //	menudiv.name = "FTMenu";
    //	var menubutton = document.createElement("div");
    //	menubutton.id = "FTSHButton";
    //	menubutton.setAttribute("class", "FTBtn");
    //	menudiv.appendChild(menubutton);
    //	document.body.appendChild(menudiv);


    var bottombox = document.getElementsByClassName("bottom")[0];
    var word_count = bottombox.getElementsByClassName("word_count")[0];

    var button = document.createElement("div");


    var button_icon = document.createElement("div");
    // button_icon.scr = "https://static.fimfiction.net/images/icons/red.png";
    button_icon.setAttribute("class", "chapter-read-icon");
    button_icon.setAttribute("title", "Click to mark all chapters as read");
    button.appendChild(button_icon);
    word_count.appendChild(button);
    //bottombox.insertBefore(button, bottombox.children[4]);
    //button_icon.class = "chapter-read-icon";

    button.onclick = mark_all_read;
}

function mark_all_read() {
   // console.log("Marking all chapters as read");

    var chapter_containers = document.getElementsByClassName("chapters")[0];
    chapter_containers = chapter_containers.getElementsByClassName("chapter_container");

    if (chapter_containers.length === 0) {
        //confirm("So, like, there's no chapters on this page, dude.");
        return;
    }

//    console.log(chapter_containers.length + " chapters found");

    for (i = 0; i < chapter_containers.length; i++) {
        var chapter_read_icon = chapter_containers[i].getElementsByClassName("chapter-read-icon")[0];
        if ((!hasClass(chapter_read_icon, "chapter-read"))) {
            chapter_read_icon.click();
        }
    }

}

function hasClass(elem, klass) {
    return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}
