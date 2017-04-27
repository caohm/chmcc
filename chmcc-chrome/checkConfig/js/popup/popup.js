var cookie = {};

$(function () {
    chrome.cookies.onChanged.addListener(listener);
    function listener(info) {
        if (info.cookie.name = "sso.jd.com") {
            cookie = info.cookie;
        }
    }

    $(".logout").on("click", function () {
        logout();
    });
    $(".portSurvival").on("click", function () {
        portSurvivalLink();
    });
    $(".healthMonitoring").on("click", function () {
        healthMonitoringLink();
    });
    checkLogin();
});


function login(loginParam) {
    var port = chrome.extension.connect({
        name: 'login'
    });
    port.postMessage(loginParam);
    port.onMessage.addListener(function (res) {
        loginPortListener(res);
    });
}
function logout() {
    var port = chrome.extension.connect({
        name: 'logout'
    });
    port.postMessage({});
    port.onMessage.addListener(function (res) {
        logoutPortListener(res);
    });
}
function checkLogin() {
    var port = chrome.extension.connect({
        name: 'checkLogin'
    });
    port.postMessage({});
    port.onMessage.addListener(function (res) {
        loginPortListener(res);
    });
}
function portSurvivalLink() {
    var port = chrome.extension.connect({
        name: 'portSurvivalLink'
    });
    port.postMessage({});
}
function healthMonitoringLink() {
    var port = chrome.extension.connect({
        name: 'healthMonitoringLink'
    });
    port.postMessage({});
}

function loginPortListener(res) {
    if (res) {
        $(".nologin").hide();
        $(".logind").show();
        $(".user-pin").text(res);
    } else {
        $(".logind").hide();
        $(".nologin").show();
        $(".user-pin").text("");
    }
}
function logoutPortListener(res) {
    $(".logind").hide();
    $(".nologin").show();
    $(".user-pin").text("");
}