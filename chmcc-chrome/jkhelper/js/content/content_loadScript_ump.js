/**
 * Created by caohongming on 2016/10/20.
 */


chrome.storage.local.get(function (itmes) {
    if (itmes.inited) {
        var content = "";
        content += "'use strict';\n";
        content += " var umpConfig='" + JSON.stringify(itmes.umpConfig) + "';\n";
        content += "\n";
        content += "\n";
        GlobalUtils.appendTodDocument("", "script", content);
    }
    GlobalUtils.appendTodDocument("custom/js/ump.js", "script");
    GlobalUtils.appendTodDocument("custom/css/ump.css", "link");
});


chrome.runtime.onMessage.addListener(function (details) {
    console.log('Message from frame: ' + details.data);
});
