var umpEditor;
var riskingEditor;
$(function () {

    var autoBigAreaDom = $('#options-autoBigArea');
    var setIntervalDom = $('#options-setInterval');
    var setIntervalTimesDom = $('#options-setInterval-times');
    var umpEditorText = $('#ump-config');
    var riskingEditorText = $('#risking-config');
    var risking_compareYesterdayDom = $("#risking-compareYesterday");
    var risking_belowMiddleDom = $("#risking-belowMiddle");
    var risking_floatOverMiddleDom = $("#risking-floatOverMiddle");
    var defaultOptions = {
        autoBigArea: false,
        setInterval: 10000,
        setIntervalTimes: 6
    };

    function localize() {
        GlobalUtils.localize($('head title')[0]);
        $('.automessage').each(function () {
            GlobalUtils.localize($(this)[0]);
        });
    }

    function umpEditorSave() {
        try {
            umpEditor.save();
            var configVal = umpEditorText.val();
            var config = JSON.parse(configVal);
            if (config[0].title && config[0].param) {
                chrome.storage.local.set({umpConfig: configVal});
                $(".ump-config-tip").html("");
            } else {
                throw new Error("formate error");
            }
        } catch (e) {
            $(".ump-config-tip").html(e.message);
        }
    }

    function riskingEditorSave() {
        try {
            riskingEditor.save();
            var riskingEditorVal = riskingEditorText.val();
            var config = JSON.parse(riskingEditorText.val());
            if (config[0] == null || ( config && config[0].title && config[0].param)) {
                chrome.storage.local.get(function (items) {
                    var risking = items.risking;
                    risking.riskingConfig = riskingEditorVal;
                    chrome.storage.local.set({risking: risking});
                });
                $(".risking-config-tip").html("");
            } else {
                throw new Error("formate error");
            }
        } catch (e) {
            $(".risking-config-tip").html(e.message);
        }
    }

    function restoreOptions(options) {
        chrome.storage.local.get(function (itmes) {
            autoBigAreaDom[0].checked = itmes.autoBigArea;
            risking_compareYesterdayDom[0].checked = itmes.risking.compareYesterday;
            risking_belowMiddleDom[0].checked = itmes.risking.belowMiddle;
            risking_floatOverMiddleDom[0].checked = itmes.risking.floatOverMiddle;
            setIntervalDom[0].value = itmes.setInterval;
            setIntervalTimesDom[0].value = itmes.setIntervalTimes;
            umpEditor = CodeMirror.fromTextArea(document.getElementById("ump-config"), {
                matchBrackets: true,
                autoCloseBrackets: true,
                mode: "application/ld+json",
                lineWrapping: true,
                lineNumbers: true
            });
            umpEditor.setValue(itmes.umpConfig);
            umpEditor.on('change', umpEditorSave);
            riskingEditor = CodeMirror.fromTextArea(document.getElementById("risking-config"), {
                matchBrackets: true,
                autoCloseBrackets: true,
                mode: "application/ld+json",
                lineWrapping: true,
                lineNumbers: true
            });
            riskingEditor.setValue(itmes.risking.riskingConfig);
            riskingEditor.on('change', riskingEditorSave);
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

        //listen the checkbox event of save img to server
        autoBigAreaDom.on('click', function () {
            var isAutoBigArea = autoBigAreaDom[0].checked;
            chrome.storage.local.set({
                autoBigArea: isAutoBigArea
            }, function () {
                console.log("save success");
            });
        });
        setIntervalDom.on('blur', function () {
            var setInterval = setIntervalDom[0].value;
            chrome.storage.local.set({
                setInterval: setInterval
            }, function () {
                console.log("save success");
            });
        });
        setIntervalTimesDom.on('blur', function () {
            var setIntervalTimes = setIntervalTimesDom[0].value;
            chrome.storage.local.set({
                setIntervalTimes: setIntervalTimes
            }, function () {
                console.log("save success");
            });
        });
        $("#risking .content .checkbox input").each(function () {
            $(this).on("click", function () {
                chrome.storage.local.get(function (iteams) {
                    var risking = iteams.risking;
                    risking.compareYesterday = risking_compareYesterdayDom[0].checked;
                    risking.belowMiddle = risking_belowMiddleDom[0].checked;
                    risking.floatOverMiddle = risking_floatOverMiddleDom[0].checked;
                    chrome.storage.local.set({
                        risking: risking
                    }, function () {
                        console.log("save success");
                    })
                })
            });
        });
    }

    function init() {
        localize();
        initEvent();
        restoreOptions(defaultOptions);
    }

    init();
});


