baidu.namespace.register("baidu.pageLoadTime");
baidu.pageLoadTime = (function () {
    var a = function () {
        var f = decodeURIComponent(location.search.substring(1));
        var k = JSON.parse(decodeURIComponent(atob(f)));
        document.getElementById("pageTitle").innerHTML = k.pageInfo.title || "无";
        document.getElementById("pageUrl").innerHTML = k.pageInfo.url || "无";
        function j(m, h) {
            try {
                document.getElementById(m).innerHTML = h + " ms"
            } catch (l) {
            }
        }

        var c = k.time;
        var i = c.redirectStart == 0 ? c.fetchStart : c.redirectStart;
        j("dns", c.domainLookupEnd - c.domainLookupStart);
        j("dnsTotal", c.domainLookupEnd - i);
        j("connect", c.connectEnd - c.connectStart);
        j("requestTotal", c.requestStart - i);
        j("response", c.responseStart - c.requestStart);
        j("responseTotal", c.responseStart - i);
        j("responseEnd", c.responseEnd - c.responseStart);
        j("responseEndTotal", c.responseEnd - i);
        j("contentLoaded", c.domContentLoadedEventEnd - c.domLoading);
        j("contentLoadedTotal", c.domContentLoadedEventEnd - i);
        j("domComplete", c.domComplete - c.domContentLoadedEventEnd);
        j("domCompleteTotal", c.domComplete - i);
        j("loadTotal", c.loadEventEnd - i);
        var d = k.header;
        if (!d) {
            document.getElementById("pageHeaderInfo").style.display = "none"
        } else {
            for (var b in d) {
                try {
                    document.getElementById(b).innerHTML = d[b] || " - "
                } catch (g) {
                }
            }
        }
    };
    return {init: a}
})();
baidu.pageLoadTime.init();