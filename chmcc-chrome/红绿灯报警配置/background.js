//仅在指定网页都点亮按钮
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(tab.url.indexOf("jk.jd.com/manage/rgy/index") >= 0){
        chrome.pageAction.show(tabId);
    }
});