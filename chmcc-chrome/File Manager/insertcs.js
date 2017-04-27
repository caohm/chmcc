alert("DGDG");
		//if(tab.url.indexOf(".html")<tab.url.length-2)
		//	chrome.tabs.insertCSS(null, {file: "styles.css"});
chrome.tabs.query({}, function (tabs) {
  var myTabs = [];
  var test="";
  for (var i = 0; i < tabs.length; i++) {
  	test+=tabs[i].url;
    if ((tabs[i].url.indexOf(".html")<test.length-2)&&((tabs[i].url.indexOf("file://")===0)||(tabs[i].url.indexOf("ftp://")===0))) {
    	alert("GAHARAA");
    	//tabs[i].insertCSS(null, {file: "styles.css"});
    }
    alert(test);
    test="";
  }
  console.log(myTabs);
});
$(document).ready(function() {
var path = chrome.extension.getURL('styles/myExtensionRulz.css');
$('head').append($('<link>')
    .attr("rel","stylesheet")
    .attr("type","text/css")
    .attr("href", path));
});