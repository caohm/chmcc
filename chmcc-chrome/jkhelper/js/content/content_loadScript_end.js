/**
 * Created by caohm on 16-9-29.
 */



chrome.storage.local.get(function (itmes) {
    var content = "";
    content += "var jkHelper = jkHelper || {};\n";
    content += " jkHelper.setInterval = " + itmes.setInterval + " || 10000;\n";
    content += " jkHelper.setIntervalTimes = " + itmes.setIntervalTimes + " || 3;\n";
    content += " jkHelper.autoBigArea = " + itmes.autoBigArea + " || false;\n";
    content += " jkHelper.tablename= \"mjdos_\" + GlobalUtils.componentizeUrl(window.location.href).path.replace(\"/gresource/\", \"\") ;\n";
    content += "\n";
    content += "\n";
    content += "\n";
    GlobalUtils.appendTodDocument("", "script", content);
    GlobalUtils.appendTodDocument("custom/js/custom_tableSort_mjDos_resource.js", "script");
    GlobalUtils.appendTodDocument("custom/js/custom_calculate_mjDos_resource.js", "script");
});