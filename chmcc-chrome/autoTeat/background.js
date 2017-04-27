/**
 * Created by caohongming on 2016/9/26.
 */
function match(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.indexOf("localhost") >= 0) {
        chrome.pageAction.show(tabId);
    }
});

var pageData = {};
chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.type !== 'localtest-links') return;
    pageData.links = message.links;
});