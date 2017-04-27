//仅在指定网页都点亮按钮
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(tab.url.indexOf("jsf.jd.com") >= 0 || tab.url.indexOf("deploy.jd.com") >= 0){
        chrome.pageAction.show(tabId);
    }
});