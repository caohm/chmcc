/**
 * Created by caohongming on 2016/10/20.
 */
var umps = {};
var normalAddress_ump = [];
// 展示列数
var cols = 4;
// 展示行数
var rows = 2;
// 是否展示标题
var titleFlag = true;
// 自动滚动位置
var left = 0;
// 自动滚动位置 UMP监控中 无效，使用页面元素定位
var top = 370;
// 框架内页面缩放比例 暂未启用
var zoom = "100%";
// 红绿灯跳转UMP用URL
var jkUrl = "http://jk.jd.com/manage/table/gotoUMP?umpKey=";
var params = {};
function view(umpKeys, cols, rows, i, titleFlag) {
    var url = jkUrl + umpKeys;
    var width = (($(window).width() - 35) / cols);
    var height = (($(window).height() - 12) / rows);
    var frame = $("<iframe id=\"frame_" + i + "\" name=\"frame\" class=\"frame\" style=\"float: left;\" width=\"" + width + "px\" height=\"" + height + "px\" src=\"" + url + "\"></iframe>");
    $("body").append(frame);
    var name = params[umpKeys].name + " 参考值" + params[umpKeys].threshold;
    var top = $("#frame_" + i).offset().top;
    var left = $("#frame_" + i).offset().left;
    var display = 'none';
    if (titleFlag) {
        display = 'inline';
    }
    var title = "<div class=\"title\" style=\" display:" + display + ";position:absolute; left:" + left + "px; top: " + top + "px; width:" + width + "px; height:28px; background-color:#004F99; font-weight: bold; color:#FFFFFF; z-index:2; text-align:center; valign:middle;\">" + name + "</div>";
    $("body").append(title);
}


chrome.storage.local.get(function (itmes) {
    try {
        var param = GlobalUtils.GetRequest(location.search);
        var umpConfig = JSON.parse(itmes.umpConfig);
        var value = "", bean = umpConfig[Number(param.id) - 1];
        cols = param.cols || cols;
        rows = param.rows || rows;
        $("title").html("" + param.id + " " + bean.title);
        params = bean.param;
        for (var k in params) {
            value += k + "\n";
        }
        $("#inputKeys").val(value.replace(/\n$/, ""));
        $("#inputKey").trigger("click");
    } catch (e) {
    }
});

$(function () {
    $(".group").click(function () {
        $("iframe").remove();
        $(".title").remove();
        // 展示分组
        var type = this.id;
        if (type == "normalAddress") {
            umpKeys = normalAddress_ump;
        }
        // 页面输入的情况
        if (type == "inputKey") {
            umpKeys = $("#inputKeys").val().split("\n")
        }
        var i = 0;
        for (i = 0, len = umpKeys.length; i < len; i++) {
            view(umpKeys[i], cols, rows, i, titleFlag);
        }
        clickFlag = true;
    });

    $("#hidden").click(function () {
        if ($("#hidden").val() == "打开") {
            $("#operate").css({
                width: "",
                height: ""
            });
            $("#hidden").css({
                position: "",
                left: "",
                top: ""
            }).val("隐藏");
        } else {
            $("#operate").css({
                width: "40px",
                height: "20px"
            });
            $("#hidden").css({
                position: "absolute",
                left: 0,
                top: 0
            }).val("打开");
        }
    });
    // 默认打开页面
    if (getUrlParam("channel") != null && getUrlParam("channel") != "null") {
        $("#" + getUrlParam("channel")).click();
    } else {
        $("#normalAddress").click();
    }

});

function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null) return unescape(r[2]);
    return null;
}

chrome.runtime.sendMessage({sendBack: true, data: "test"});