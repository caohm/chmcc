var editor;
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

    function localize() {
        GlobalUtils.localize($('head title')[0]);
        $('.autoMessage').each(function () {
            GlobalUtils.localize($(this)[0]);
        });
    }

    function restoreOptions() {
        chrome.storage.local.get(function (itmes) {
            var healthMonitoringConfig = itmes.healthMonitoringConfig;
            $("#healthMonitoring_config").val(healthMonitoringConfig.xmlConfig);
            $("#health-openFileSystem")[0].checked = healthMonitoringConfig.openFileSystem;
            editor = CodeMirror.fromTextArea(document.getElementById("healthMonitoring_config"), {
                mode: "xml",
                lineNumbers: true,
                extraKeys: {
                    "'<'": completeAfter,
                    "'/'": completeIfAfterLt,
                    "' '": completeIfInTag,
                    "'='": completeIfInTag,
                    "Ctrl-Space": "autocomplete"
                },
                hintOptions: {schemaInfo: tags}
            });
            editor.on("change", function () {
                editor.save();
                chrome.storage.local.get(function (itmes) {
                    var healthMonitoringConfig = itmes.healthMonitoringConfig;
                    healthMonitoringConfig.xmlConfig = $("#healthMonitoring_config").val();
                    chrome.storage.local.set({healthMonitoringConfig: healthMonitoringConfig}, function () {
                    });
                });
            });
        });
    }

    function initEvent() {
        $('.menu a').click(function (ev) {
            ev.preventDefault();
            var selected = 'selected';
            $('.mainview > *').removeClass(selected);
            $('.menu li').removeClass(selected);
            setTimeout(function () {
                $('.mainview > *:not(.selected)').css('display', 'none');
            }, 100);
            $(ev.currentTarget).parent().addClass(selected);
            var currentView = $($(ev.currentTarget).attr('href'));
            currentView.css('display', 'block');
            setTimeout(function () {
                currentView.addClass(selected);
            }, 0);
            setTimeout(function () {
                $('body')[0].scrollTop = 0;
            }, 200);
        });
        $('.mainview > *:not(.selected)').css('display', 'none');
        $("#health-openFileSystem").on("click", function () {
            var openFileSystem = this.checked;
            chrome.storage.local.get(function (itmes) {
                var healthMonitoringConfig = itmes.healthMonitoringConfig;
                healthMonitoringConfig.openFileSystem = openFileSystem;
                chrome.storage.local.set({healthMonitoringConfig: healthMonitoringConfig}, function () {
                });
            });
        })
    }

    function init() {
        localize();
        initEvent();
        restoreOptions();
    }

    init();
});