/**
 * Created by caohongming on 2016/10/20.
 */


$("#noticeInfo").append("<span class='ts'><a id='openByGroup'>按照分组打开</a></span>");
$("#openByGroup").on("click", function () {
    // window.top.location.href = chrome.extension.getURL("umpPerformanceDetail.html") + window.location.search;
    var port = chrome.extension.connect({
        name: 'umpPerformanceDetail'
    });
    port.postMessage({url: window.location.search});
});
