/**
 * Created by caohongming on 2016/10/17.
 */

$(document).ready(function () {
    // document.doctype.parentNode.removeChild(document.doctype);
    // document.doctype = "<!DOCTYPE html>";
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

    var editor = CodeMirror.fromTextArea(document.getElementById("SerializeInfo"), {
        mode: "xml",
        lineNumbers: true,
        extraKeys: {
            "'<'": completeAfter,
            "'/'": completeIfAfterLt,
            "' '": completeIfInTag,
            "'='": completeIfInTag,
            "Ctrl-Space": "autocomplete",
            extraKeys: {"Alt-F": "findPersistent"}
        },
        hintOptions: {schemaInfo: tags}
    });
    editor.on('change', function () {
        $("#btnSubmit").hide();
    });
    $("body").append("<div id='mergely-resizer' > <div id='compare'> </div> </div>");

    $('#compare').mergely({
        linewrapping: true,
        _debug: '',
        editor_width: '48%',
        editor_height: '100%',
        cmsettings: {readOnly: true, mode: 'xml'},
        lhs: function (setValue) {
            setValue($("#SerializeInfo").val());
        }
    });
    $("#btnSubmit").hide().parent().prepend($("<input type='button' value='比较' id='startCompare'>"));

    $("#startCompare").on("click", function () {
        editor.save();
        try {
            var error = $(".CodeMirror:first .cm-error");
            if (error && error.length > 0) {
                $("#btnSubmit").hide();
            } else {
                $("#btnSubmit").show();
            }
        } catch (e) {
            $("#btnSubmit").show();
        }

        $('#compare').mergely('rhs', $("#SerializeInfo").val());
    });
});