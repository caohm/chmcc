/**
 * Created by caohongming on 2016/11/3.
 */


var onButtonClickedCallback = function (notificationId, buttonIndex) {
    var index = notificationId.indexOf('erp_');
    if (index != -1) {
        debugger;
    }
};
chrome.notifications.onButtonClicked.addListener(onButtonClickedCallback);

var ajaxSuccess = function (result) {
    debugger;
    var begin = $(result).find("#clockInfo .check-begin ").html(); //"上 未打卡"
    var end = $(result).find("#clockInfo .check-time ").html(); //"下 未打卡"
    var user = $($("#userName .user-more-list ul li ")[0]).html().match(/^.*Hi，(.*)\s*$/)[1];
    if (begin == "上 未打卡") {
        chrome.notifications.create('erp_begin', {
            type: "basic",
            title: user,
            message: "上班未打开",
            iconUrl: "icon.png"
        }, function (notificationId) {
        });
    }
    if (end == "下 未打卡") {
        chrome.notifications.create('erp_begin', {
            type: "basic",
            title: user,
            message: "下班未打开",
            iconUrl: "icon.png"
        }, function (notificationId) {
        });
    }
};

$.ajax({
    type: 'get',
    url: "http://jdwe.jd.com",
    cache: false,
    async: false,
    success: ajaxSuccess,
    error: function (err) {

    }
});