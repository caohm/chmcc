/**
 * Created by caohongming on 2016/10/20.
 */

$("#noticeInfo").hide();
$(".cp-breadcrumb").hide();
$(".cp-monitor-timerange").hide();
$("#reportWD").hide();
$("#queryRealTimeDataDiv").hide();
$("#dTypeDiv").hide();
$("#autoRefreshDiv").hide();
$("#div_index_temp").hide();
$(".chartBoxTitle").hide();
var key = $(".cp-breadcrumb").html().match(/(.*\n)*\s*(.*)方法性能报表\s*\n(.*\n)*/)[2];
// $(".cp-breadcrumb").html(key).addClass("title");
$("#oneHourSearch").trigger("click");
setTimeout(function () {
    $(".chartBox:eq(0) .highcharts-legend g g g:eq(0)").trigger("click");
    $(".chartBox:eq(0) .highcharts-legend g g g:eq(1)").trigger("click");
// $(".chartBox:eq(0) .highcharts-legend g g g:eq(2)").trigger("click");
$(".chartBox:eq(0) .highcharts-legend g g g:eq(3)").trigger("click");
    $(".chartBox:eq(0) .highcharts-legend g g g:eq(4)").trigger("click");
// $(".chartBox:eq(0) .highcharts-legend g g g:eq(5)").trigger("click");
    $(".chartBox:eq(0) .highcharts-legend g g g:eq(6)").trigger("click");
}, 2000);

$("body").append("<div style='position: absolute;top: 0px;right: 0px;' class='ump_open'>打开面板</div>");
$(".ump_open").bind("click", function (e) {
    $("#noticeInfo").show();
    $(".cp-breadcrumb").show();
    $(".cp-monitor-timerange").show();
    $("#reportWD").show();
    $("#queryRealTimeDataDiv").show();
    $("#dTypeDiv").show();
    $("#autoRefreshDiv").show();
    $("#div_index_temp").show();
    $(".chartBoxTitle").show();
});
