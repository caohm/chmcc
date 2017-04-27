/**
 * Created by caohongming on 2016/10/24.
 */
// 展示列数
var cols = 4;
// 展示行数
var rows = 2;
// 自动滚动位置
var left = 0;
// 自动滚动位置 UMP监控中 无效，使用页面元素定位
var top = 370;
// 框架内页面缩放比例 暂未启用
var zoom = "100%";
// 红绿灯跳转UMP用URL
var riskUrl = chrome.extension.getURL("risk.html");
function view(risk, cols, rows, i) {
    var url = riskUrl + "?" + risk;
    var width = (($(window).width() - 32) / cols);
    var height = (($(window).height() - 12) / rows);
    var frame = $("<iframe id=\"frame_" + i + "\" name=\"frame\" class=\"frame\" style=\"float: left;\" width=\"" + width + "px\" height=\"" + height + "px\" src=\"" + url + "\"></iframe>");
    $("body").append(frame);
}
chrome.storage.local.get(function (itmes) {
    try {
        var param = GlobalUtils.GetRequest(location.search);
        var riskingConfig = JSON.parse(itmes.risking.riskingConfig);
        var bean = riskingConfig[Number(param.id || 1) - 1];
        cols = param.cols || cols;
        rows = param.rows || rows;
        $("title").html("第" + param.id + "页 " + bean.title);
        for (var i = 0, len = bean.param.length; i < len; i++) {
            view("name=" + bean.param[i].name + "&rftype=" + bean.param[i].rftype, cols, rows, i);
        }
    } catch (e) {
    }
});


