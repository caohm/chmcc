setTimeout(function () {
    drawTable();
    freshData();
    txtSearch();
}, 500);

function drawTable() {
    var hostTrs = $("#hostNames").find("tr");
    if (hostTrs !== undefined) {
        var count = 0;
        var str = [];
        //获取所有ip
        $.each(hostTrs, function (i, e) {
            if (i == 0) {
            } else if (i < hostTrs.size()) {
                var tds = $(this).children();
                count += tds.size();
                $.each(tds, function () {
                    var ck = $(this).children().first();
                    $(ck).attr("id", $(ck).attr("id").replace(/\./g, "-").replace("host-", ""));
                    $(ck).attr("name", "ipCtr");
                    str.push($(ck).attr("id"));
                });
            }
        });
        var pageCount = count / 15;
        var ss = "总共" + count + "个IP  ";
        var $div = $("<div/>");
        for (var i = 0; i < pageCount; i++) {
            var value = "";
            for (var j = i * 15; j < (i + 1) * 15; j++) {
                value += "," + str[j];
            }
            var $span = $("<span style='margin-right:20px;' />");
            var end = (i + 1) * 15 > count ? count : (i + 1) * 15;
            var $button = $("<button />", {"id": "div_" + i, "value": value.substr(1), "text": (i * 15 + 1) + " ~ " + end});

            $span.append($button);
            $div.append($span);
        }

        //搜索
        var $serachSpan = $("<span/>");
        var $serachInput = $("<input/>", {"id": "txtSearch", "value": "", "style": "background-color:red;height:20px;font-color:yellow;"});
        var $searchA = $("<span style='margin-left:10px;'><a href='javascript:void(0);'>搜索</a></span>");
        $serachSpan.append($serachInput).append($searchA);
        $div.append($serachSpan);

        $("#hostNameContent").prev().append('<div style="margin-top: 7px; margin-left: 10px; float: left;">' + ss + $div.html() + '</div>');
    }
}

function txtSearch() {
    $(".chartBoxTitle").delegate("a", "click", function () {
        $("input[name='ipCtr']").each(function () {
            var ip = $("#txtSearch").val();
            console.log(ip);
            if ($(this).attr("id").indexOf(ip.replace(/\./g, "-")) >= 0) {
                $(this).removeAttr("checked");
                $(this).click();
            } else {
                $(this).removeAttr("checked");
            }
        });
        $(".chartBoxTitle").children().first().next().find("span").first().click();
    });
}

function freshData() {
    $(".chartBoxTitle").delegate("button", "click", function () {
        var ips = $(this).val().split(",");
        var hostTds = $("#hostNames td");
        $.each(hostTds, function () {
            $(this).children().first().removeAttr("checked");
        });
        $.each(ips, function (i, e) {
            $("#" + e).click();
        });
        $(".chartBoxTitle").children().first().next().find("span").first().click();
    });
}
