// ==UserScript==
// @name         fimfic_mark_as_read
// @version      0.1
// @description  Fave All on page, and the next page, and the next one, and then some more after that.
// @include      https://www.fimfiction.net/story/*
// @include      https://www.fimfiction.net/bookshelf/*
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
	var css = ".FTMenu{ width:24px; height:24px; position:fixed; right:10px; bottom:10px; border-radius:9px } .FTB1{ background:#6EAEDE; } #FTSHButton{width:20px; height:20px; position:absolute; right:2px; bottom:2px; border-radius:7px} .FTBtn{ background:#A8CEEB;} .FTBtn:hover{background:#D4E7F5;}";
	var style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	head = document.head || document.getElementsByTagName('head')[0];
	head.appendChild(style);
	var menudiv = document.createElement("div");
	menudiv.setAttribute("class", "FTMenu FTB1");
	menudiv.name = "FTMenu";
	var menubutton = document.createElement("div");
	menubutton.id = "FTSHButton";
	menubutton.setAttribute("class", "FTBtn");
	menudiv.appendChild(menubutton);
	document.body.appendChild(menudiv);



	mark_all_read();
}

function mark_all_read() {
	//console.log("Favoriting this page");

	var chapterstocheck = document.getElementsByClassName("interaction--fave");
		
	if (chapterstocheck.length == 0) {
		confirm("So, like, there's no chapters on this page...");
		return;
	}
	
	for (i = 0; i < imagestocheck.length; i++) {
		if ((!hasClass(chapterstocheck[i], "active"))) {
			chapterstocheck[i].click();
		}
	}

}

function hasClass(elem, klass) {
	return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}
