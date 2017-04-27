var Timestamp = (function () {
    var b = function () {
        $("#btnStampToLocale").click(function (f) {
            var d = $.trim($("#txtSrcStamp").val());
            if (d.length == 0) {
                alert("请先填写你需要转换的Unix时间戳");
                return
            }
            if (!parseInt(d, 10)) {
                alert("请输入合法的Unix时间戳");
                return
            }
            $("#txtDesDate").val((new Date(parseInt(d, 10) * 1000)).format("yyyy-MM-dd HH:mm:ss"))
        });
        $("#btnLocaleToStamp").click(function (f) {
            var d = $.trim($("#txtLocale").val());
            d = Date.parse(d);
            if (isNaN(d)) {
                alert("请输入合法的时间格式，如：2014-04-01 10:01:01，或：2014-01-01")
            }
            $("#txtDesStamp").val(d / 1000)
        })
    };
    var a = function () {
        var e = $("#txtNowDate");
        var d = $("#txtNow");
        window.setInterval(function () {
            e.val((new Date()).toLocaleString());
            d.val(Math.round((new Date()).getTime() / 1000))
        }, 1000)
    };
    var c = function () {
        $(function () {
            a();
            b();
            $("#tab0_url").focus()
        })
    };
    return {init: c}
})();
Timestamp.init();