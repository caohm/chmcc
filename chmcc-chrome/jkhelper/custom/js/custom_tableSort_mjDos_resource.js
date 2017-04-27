/**
 * Created by caohm on 16-9-29.
 */
"use strict";
var jkHelper = jkHelper || {};
jkHelper.sortTable = function () {

    $("table").attr("id", "_sortTable");
    $("table thead tr").find("th:eq(3)").each(function () {
        $(this).html($("<a>").attr("href", "javascript:;").html($(this).html()).attr("id", "_sort_cpu"));
    });
    $("table thead tr").find("th:eq(4)").each(function () {
        $(this).html($("<a>").attr("href", "javascript:;").html($(this).html()).attr("id", "_sort_mem"));
    });
    $("table thead tr").find("th:eq(5)").each(function () {
        $(this).append($("<a>").attr("href", "javascript:;").html("_in").attr("id", "_sort_ioi")).append($("<a>").attr("href", "javascript:;").html("_out").attr("id", "_sort_ioo"));
    });
    $("table thead tr").find("th:eq(6)").each(function () {
        $(this).html($("<a>").attr("href", "javascript:;").html($(this).html()).attr("id", "_sort_load"));
    });
    $("table thead tr").find("th:eq(7)").each(function () {
        $(this).html($("<a>").attr("href", "javascript:;").html($(this).html()).attr("id", "_sort_tcp"));
    });
    $("table tbody tr").each(function () {
        $(this).find("td:eq(3)").attr("_order", $(this).find("td:eq(3) span:eq(0)").html());
        $(this).find("td:eq(4)").attr("_order", $(this).find("td:eq(4) span:eq(1)").html());
        $(this).find("td:eq(5)").attr("_order_i", $(this).find("td:eq(5) span:eq(1)").html());
        $(this).find("td:eq(5)").attr("_order_o", $(this).find("td:eq(5) span:eq(3)").html());
        $(this).find("td:eq(6)").attr("_order", $(this).find("td:eq(6) span:eq(3)").html());
        $(this).find("td:eq(7)").attr("_order", $(this).find("td:eq(7) span:eq(0)").html());
    });
    TableOrderOper.Init("_sortTable", 0, {
        OnShow: function (i, trJqObj, _tbodyObj) {
            trJqObj.attr("class", ((i + 1) % 2 == 0 ? "hoverTr" : ""));
        }
    });
    TableOrderOper.SetOrder("_sort_cpu", 3, {ValAttr: "_order", DataType: "int"});
    TableOrderOper.SetOrder("_sort_mem", 4, {ValAttr: "_order", DataType: "int"});
    TableOrderOper.SetOrder("_sort_ioi", 5, {ValAttr: "_order_i", DataType: "float"});
    TableOrderOper.SetOrder("_sort_ioo", 5, {ValAttr: "_order_o", DataType: "float"});
    TableOrderOper.SetOrder("_sort_load", 6, {ValAttr: "_order", DataType: "float"});
    TableOrderOper.SetOrder("_sort_tcp", 7, {ValAttr: "_order", DataType: "float"});


};
