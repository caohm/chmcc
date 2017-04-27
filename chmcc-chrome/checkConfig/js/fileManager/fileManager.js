/**
 * Created by caohongming on 2016/10/18.
 */
var filepath;
var CheckConfiger = {isOpenFileSystem: true};
$(function () {
    var dummy = {
        attrs: {
            color: ["red", "green", "blue", "purple", "white", "black", "yellow"],
            size: ["large", "medium", "small"],
            description: null
        },
        children: []
    };

    var tags = {
        "!top": ["top"],
        "!attrs": {
            id: null,
            class: ["A", "B", "C"]
        },
        top: {
            attrs: {
                lang: ["en", "de", "fr", "nl"],
                freeform: null
            },
            children: ["animal", "plant"]
        },
        animal: {
            attrs: {
                name: null,
                isduck: ["yes", "no"]
            },
            children: ["wings", "feet", "body", "head", "tail"]
        },
        plant: {
            attrs: {name: null},
            children: ["leaves", "stem", "flowers"]
        },
        wings: dummy, feet: dummy, body: dummy, head: dummy, tail: dummy,
        leaves: dummy, stem: dummy, flowers: dummy
    };

    function completeAfter(cm, pred) {
        var cur = cm.getCursor();
        if (!pred || pred()) setTimeout(function () {
            if (!cm.state.completionActive)
                cm.showHint({completeSingle: false});
        }, 100);
        return CodeMirror.Pass;
    }

    function completeIfAfterLt(cm) {
        return completeAfter(cm, function () {
            var cur = cm.getCursor();
            return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == "<";
        });
    }

    function completeIfInTag(cm) {
        return completeAfter(cm, function () {
            var tok = cm.getTokenAt(cm.getCursor());
            if (tok.type == "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)) return false;
            var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
            return inner.tagName;
        });
    }

    var editor = CodeMirror.fromTextArea(document.getElementById("fileContent"), {
        mode: "shell",
        lineNumbers: true,
        matchBrackets: true,
        readOnly: true
    });
    editor.setSize("100%", window.innerHeight - 126 + "px");
    var init = function (path) {
        filepath = path;
        getfs(function (err, fs) {
            if (err) {
                console.log(err.name + " : " + err.message);
            } else {
                var path = filepath || "/";
                fs.readdir(path, function (err, res) {
                    if (err) {
                        console.log(err.name + " : " + err.message);
                    } else {
                        $("#fileManager").html("");
                        $("#fileContent").html("");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].indexOf("/") >= 0) {
                                $("#fileManager").append("<div class='dir col-sm-2'><a path='" + path + res[i] + "'>" + res[i] + "</a></div>");
                            } else {
                                $("#fileManager").append("<div class='file col-sm-2'><a path='" + path + res[i] + "' data-toggle='modal' data-target='#modal' >" + res[i] + "</a></div>");
                            }
                        }
                        initHeader(path);
                        $("a").each(function () {
                            $(this).on("click", function () {
                                if ($(this).html().indexOf("/") < 0) {
                                    filepath = $(this).attr("path");
                                    getfs(function (err, fs) {
                                        if (err) {
                                            console.log(err.name + " : " + err.message);
                                        } else {
                                            var path = filepath || "/";
                                            fs.readfile(path, function (err, res) {
                                                if (err) {
                                                    console.log(err.name + " : " + err.message);
                                                } else {
                                                    editor.setValue(res);
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    init($(this).attr("path"));
                                }
                            });
                        })
                    }
                });
            }
        });
    };
    var initHeader = function (path) {
        var file_nav = $(".file-nav").html("<li ><a path='/' style='cursor: pointer;'>/</a></li>");
        var name = "/", arr = path.replace(/^\//, "").replace(/\/$/, "").split("/");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
                name += arr[i] + "/";
                file_nav.append("<li><a  path='" + name + "' style='cursor: pointer;'>" + arr[i] + "/</a></li>");
            }
        }
    };
    init();
})
;
