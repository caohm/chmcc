/**
 * Created by caohongming on 2016/10/17.
 */


GlobalUtils.appendTodDocument("third/jquery/jquery-1.11.1.min.js", "script");

GlobalUtils.appendTodDocument("third/codemirror/lib/codemirror.css", "link");
GlobalUtils.appendTodDocument("third/mergely/lib/mergely.css", "link");
GlobalUtils.appendTodDocument("third/codemirror/addon/hint/show-hint.css", "link");
GlobalUtils.appendTodDocument("third/codemirror/addon/dialog/dialog.css", "link");
GlobalUtils.appendTodDocument("third/codemirror/addon/search/matchesonscrollbar.css", "link");
setTimeout(function () {
   GlobalUtils.appendTodDocument("third/codemirror/lib/codemirror.js", "script");
//GlobalUtils.appendTodDocument("third/mergely/lib/codemirror.css", "link");
//GlobalUtils.appendTodDocument("third/mergely/lib/codemirror.js", "script");
    setTimeout(function () {
       GlobalUtils.appendTodDocument("third/mergely/lib/mergely.js", "script");
        setTimeout(function () {
           GlobalUtils.appendTodDocument("third/codemirror/addon/hint/show-hint.js", "script");

           GlobalUtils.appendTodDocument("third/codemirror/addon/hint/xml-hint.js", "script");
           GlobalUtils.appendTodDocument("third/codemirror/mode/xml/xml.js", "script");
           GlobalUtils.appendTodDocument("third/codemirror/addon/dialog/dialog.js", "script");
           GlobalUtils.appendTodDocument("third/codemirror/addon/search/searchcursor.js", "script");
           GlobalUtils.appendTodDocument("third/codemirror/addon/search/search.js", "script");
           GlobalUtils.appendTodDocument("third/codemirror/addon/scroll/annotatescrollbar.js", "script");
           GlobalUtils.appendTodDocument("third/codemirror/addon/search/matchesonscrollbar.js", "script");
           GlobalUtils.appendTodDocument("third/codemirror/addon/search/jump-to-line.js", "script");

           GlobalUtils.appendTodDocument("custom/js/configmanager/custom_ConfigManagerCompare.js", "script");
            //GlobalUtils.appendTodDocument("css/configmanager/custom_ConfigManagerCompare.css", "link");
        }, 20);
    }, 20);
}, 20);

