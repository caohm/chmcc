chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // chrome.pageAction.show(tabId);
});
function onConnectListener(port) {
    var name = port.name;
    if (!name) {
        return;
    }
    switch (name) {
        case 'login':
            port.onMessage.addListener(portLogin);
            break;
        case 'checkLogin':
            port.onMessage.addListener(portCheckLogin);
            break;
        case 'compare':
            port.onMessage.addListener(portCompare);
            break;
        case 'onkeydown':
            port.onMessage.addListener(function (msg) {
                var direction = msg.direction;
                getTab(bindKeyDownHandler, direction);
            });
            break;
        case 'popupClosed':
            port.onDisconnect.addListener(function () {
                getTab(hideContentVeil);
            });
            console.log("popupClosed msg received!");
            break;
        case 'portSurvivalLink':
            console.log("portSurvivalLink msg received!");
            port.onMessage.addListener(portSurvivalPageContextMenuClick);
            break;
        case 'healthMonitoringLink':
            console.log("healthMonitoringLink msg received!");
            port.onMessage.addListener(healthMonitoringPageContextMenuClick);
            break;
        case 'logout':
            port.onMessage.addListener(portLogoutAjax);
            break;
    }
}
function portLogin(loginParam, port) {
    portLoginAjax(loginParam, port);
}
function portCheckLogin(loginParam, port) {
    portCheckLoginAjax(loginParam, port);
}
function portCompare(param, port) {
    console.log(param);
    chrome.tabs.query({active: true, currentWindow: true}, function (t) {
        var url = chrome.extension.getURL("compare.html");
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (res) {
            var opened = false;
            var reg = new RegExp(".*compare.html$", "i");
            for (var v = 0, t = res.length; v < t; v++) {
                if (reg.test(res[v].url)) {
                    opened = true;
                    url = res[v].id;
                    break
                }
            }
            if (!opened) {
                chrome.tabs.create({url: url, active: true})
            } else {
                chrome.tabs.update(url, {highlighted: true})
            }
        })
    });
}
function retryClip(port) {
    //不自动增加cookie时间
    port.onMessage.addListener(function (msg) {
        if (msg && msg.title && msg.params) {
            saveToServer(msg);
        }
    });
}
function portLoginAjax(loginParam, port, params, callback) {
    var loginError = function (err) {
        try {
            if (port) {
                port.postMessage(err);
            }
        } catch (error) {
            console.log('portLoginAjax callError Error: ' + error);
        }
    };
    var loginSuccess = function (responseJSON) {
        try {
            if (port) {
                loginParam.response = responseJSON;
                port.postMessage(loginParam)
                chrome.storage.local.set({
                        username: loginParam.username,
                        password: loginParam.password
                    },
                    function () {
                    }
                );
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
        url: "http://ssa.jd.com/sso/login?returnUrl=http://deploy.jd.com",
        data: loginParam,
        success: loginSuccess,
        error: loginError
    });
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
                port.postMessage(loginParam)
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

function getTab(callback, params) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        callback(tabs[0], params);
    });
}
function hideContentVeil(tab) {
    Jd.Browser.sendRequest(tab.id, {
        name: 'preview',
        op: 'clear'
    });
}
function bindKeyDownHandler(tab, direction) {
    Jd.Browser.sendRequest(tab.id, {
        name: 'preview',
        op: 'keydown',
        opCmd: direction
    });
}
function portSurvivalPageContextMenuClick(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function (t) {
        var url = chrome.extension.getURL("portSurvival.html");
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (res) {
            var opened = false;
            var reg = new RegExp(".*portSurvival.html$", "i");
            for (var v = 0, t = res.length; v < t; v++) {
                if (reg.test(res[v].url)) {
                    opened = true;
                    url = res[v].id;
                    break
                }
            }
            if (!opened) {
                chrome.tabs.create({url: url, active: true})
            } else {
                chrome.tabs.update(url, {highlighted: true})
            }
        })
    });
}
function healthMonitoringPageContextMenuClick(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function (t) {
        var url = chrome.extension.getURL("healthMonitoring.html");
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (res) {
            var opened = false;
            var reg = new RegExp(".*healthMonitoring.html$", "i");
            for (var v = 0, t = res.length; v < t; v++) {
                if (reg.test(res[v].url)) {
                    opened = true;
                    url = res[v].id;
                    break
                }
            }
            if (!opened) {
                chrome.tabs.create({url: url, active: true})
            } else {
                chrome.tabs.update(url, {highlighted: true})
            }
        })
    });
}
chrome.extension.onConnect.addListener(onConnectListener);

chrome.storage.local.get(function (itmes) {
    if (!itmes.inited) {
        var healthMonitoringConfig = {openFileSystem: true}, portSurvivalConfig = {};
        $.ajax({
            type: 'GET',
            url: chrome.extension.getURL("config/sysconfcheck.xml"),
            async: false,
            success: function (config) {
                healthMonitoringConfig.xmlConfig = config;
            },
            error: function () {
            }
        });
        $.ajax({
            type: 'GET',
            url: chrome.extension.getURL("config/ignore.json"),
            async: false,
            success: function (config) {
                portSurvivalConfig.ignore = config;
            },
            error: function () {
            }
        });
        $.ajax({
            type: 'GET',
            url: chrome.extension.getURL("config/jsf.json"),
            async: false,
            success: function (config) {
                portSurvivalConfig.jsf = config;
            },
            error: function () {
            }
        });
        $.ajax({
            type: 'GET',
            url: chrome.extension.getURL("config/mysql.json"),
            async: false,
            success: function (config) {
                portSurvivalConfig.mysql = config;
            },
            error: function () {
            }
        });
        $.ajax({
            type: 'GET',
            url: chrome.extension.getURL("config/nginx.json"),
            async: false,
            success: function (config) {
                portSurvivalConfig.nginx = config;
            },
            error: function () {
            }
        });
        $.ajax({
            type: 'GET',
            url: chrome.extension.getURL("config/redis.json"),
            async: false,
            success: function (config) {
                portSurvivalConfig.redis = config;
            },
            error: function () {
            }
        });
        debugger;
        chrome.storage.local.set({
            inited: true,
            portSurvivalConfig: portSurvivalConfig,
            healthMonitoringConfig: healthMonitoringConfig
        });
    }
});