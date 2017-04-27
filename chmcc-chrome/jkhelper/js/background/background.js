//仅在指定网页都点亮按钮
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (tab.url.indexOf("mjdos.jd.com/gresource/") >= 0) {
//         chrome.pageAction.show(tabId);
//     }
// });
chrome.runtime.onMessage.addListener(function (message, sender) {
    if (message.sendBack) {
        chrome.tabs.sendMessage(sender.tab.id, message.data);
    }
});
chrome.storage.local.get(function (itmes) {
    if (!itmes.inited) {
        $.ajax({
            type: 'GET',
            url: chrome.extension.getURL("config/ump.json"),
            success: function (config) {
                chrome.storage.local.set({
                    inited: true,
                    umpConfig: config,
                    autoBigArea: false,
                    setInterval: 10000,
                    setIntervalTimes: 6
                });
            }
        });
        $.ajax({
            type: 'GET',
            url: chrome.extension.getURL("config/risking.json"),
            success: function (config) {
                chrome.storage.local.set({
                    inited: true,
                    risking: {
                        riskingConfig: config, compareYesterday: false, belowMiddle: false, floatOverMiddle: false
                    }
                });
            }
        });
    }
});

function umpJKPageContextMenuClick(info, tab) {
    var url = chrome.extension.getURL("ump.html");
    chrome.storage.local.get(function (itmes) {
        //TODO
        var umpConfig = JSON.parse(itmes.umpConfig);
        for (var i = 0; i < umpConfig.length; i++) {
            chrome.tabs.create({url: url + "?id=" + (i + 1) + "&cols=4&rows=1", active: true})
        }
    });
}
function riskingJKPageContextMenuClick(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function (t) {
        var url = chrome.extension.getURL("riskingMonitoring.html");
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (res) {
            var opened = false;
            var reg = new RegExp("^chrome-extension:\/\/.*\/riskingMonitoring.html\?.*id=.*$", "i");
            for (var v = 0, t = res.length; v < t; v++) {
                if (reg.test(res[v].url)) {
                    opened = true;
                    url = res[v].id;
                    break
                }
            }
            if (!opened) {
                chrome.storage.local.get(function (itmes) {
                    var riskingConfig = JSON.parse(itmes.risking.riskingConfig);
                    for (var i = 0; i < riskingConfig.length; i++) {
                        chrome.tabs.create({url: url + "?id=" + (i + 1) + "&cols=3&rows=2", active: true})
                    }
                });
            } else {
            }
        })
    });
}
function mjdosPageContextMenuClick(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function (t) {
        var url = chrome.extension.getURL("mjdos.html");
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (res) {
            var opened = false;
            var reg = new RegExp("^chrome-extension:\/\/.*\/mjdos.html\?.*appId=.*$", "i");
            for (var v = 0, t = res.length; v < t; v++) {
                if (reg.test(res[v].url)) {
                    opened = true;
                    url = res[v].id;
                    break
                }
            }
            if (!opened) {
                chrome.tabs.create({url: url + "?appId=6276&time=0.5", active: true})
            } else {
            }
        })
    });
}
function umpPerformanceDetailPageContextMenuClick(info, tab) {
    var url = chrome.extension.getURL("umpPerformanceDetail.html");
    chrome.tabs.create({url: url + info.url, active: true});
}

function onConnectListener(port) {
    var name = port.name;
    if (!name) {
        return;
    }
    switch (name) {
        case 'checkLogin':
            port.onMessage.addListener(portCheckLoginAjax);
            break;
        case 'popupClosed':
            port.onDisconnect.addListener(function () {
                getTab(hideContentVeil);
            });
            break;
        case 'umpJKLink':
            port.onMessage.addListener(umpJKPageContextMenuClick);
            break;
        case 'umpPerformanceDetail':
            port.onMessage.addListener(umpPerformanceDetailPageContextMenuClick);
            break;
        case 'riskingJKLink':
            port.onMessage.addListener(riskingJKPageContextMenuClick);
            break;
        case 'mjdosLink':
            port.onMessage.addListener(mjdosPageContextMenuClick);
            break;
        case 'logout':
            port.onMessage.addListener(portLogoutAjax);
            break;
    }
}
function portLogoutAjax(loginParam, port, params, callback) {
    var logoutError = function (err) {
        try {
            if (port) {
                port.postMessage(err);
            }
        } catch (error) {
            console.log('portLoginAjax callError Error: ' + error);
        }
    };
    var logoutSuccess = function (responseJSON) {
        try {
            if (port) {
                loginParam.response = responseJSON;
                port.postMessage(loginParam);
                chrome.storage.local.set({username: "", password: ""}, function () {
                });
                localStorage.clear();
                if (callback) {
                    callback(port);
                }
            }
        } catch (error) {
            console.log('portLoginAjax callSuccess Error: ' + error);
        }
    };
    $.ajax({
        type: 'POST',
        url: "http://ssa.jd.com/sso/logout",
        success: logoutSuccess,
        error: logoutError
    });
}
function portCheckLoginAjax(loginParam, port, params, callback) {
    var loginError = function (err) {
        try {
            if (port) {
                port.postMessage(err);
            }
        } catch (error) {
            console.log('portLoginAjax callError Error: ' + error);
        }
    };
    var loginSuccess = function (response) {
        var user;
        try {
            user = response.match(/(.*\n)*\s*\<input type="hidden" id="currentUserName" name="currentUserName" value="(.*)"\/\>\s*\n(.*\n)*/)[2];
        } catch (e) {
            try {
                user = response.match(/(.*\n)*\s*\<h3 style="text-decoration: none ;font-weight:bold"\>欢迎,(.*)！\<\/h3\>\s*\n(.*)*/)[2];
            } catch (e) {
                if (port) {
                    port.postMessage();
                    if (callback) {
                        callback(port);
                    }
                }
            }
        }
        if (port) {
            port.postMessage(user);
            if (callback) {
                callback(port);
            }
        }
    };
    $.ajax({
        type: 'GET',
        url: "http://erp.jd.com",
        success: loginSuccess,
        error: loginError
    });
}
chrome.extension.onConnect.addListener(onConnectListener);