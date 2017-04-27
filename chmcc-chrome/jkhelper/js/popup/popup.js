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
    $(".umpJK").on("click", function () {
        umpJKLink();
    });
    $(".umpPerformanceDetail").on("click", function () {
        umpPerformanceDetail();
    });
    $(".riskingJK").on("click", function () {
        riskingJKLink();
    });
    $(".mjdosLink").on("click", function () {
        mjdosLink();
    });
    checkLogin();
});


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
function umpJKLink() {
    var port = chrome.extension.connect({
        name: 'umpJKLink'
    });
    port.postMessage({});
}
function umpPerformanceDetail() {
    var port = chrome.extension.connect({
        name: 'umpPerformanceDetail'
    });
    port.postMessage({});
}
function riskingJKLink() {
    var port = chrome.extension.connect({
        name: 'riskingJKLink'
    });
    port.postMessage({});
}
function mjdosLink() {
    var port = chrome.extension.connect({
        name: 'mjdosLink'
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