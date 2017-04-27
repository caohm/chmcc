chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        'id': 'saveall',
        'type': 'normal',
        'title': '保存所有图片',
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == 'saveall') {
        chrome.tabs.executeScript(tab.id, {file: 'main.js'}, function (results) {
            debugger;
            if (results && results[0] && results[0].length) {
                results[0].forEach(function (url) {
                    chrome.downloads.download({
                        url: results[0][0],
                        conflictAction: 'uniquify',
                        filename: "checkConfig/app/10.10.10.10/conf/tomcat.xml",
                        saveAs: false,
                        DangerType: "accepted"
                    });
                });
            }
        });
    }
});
