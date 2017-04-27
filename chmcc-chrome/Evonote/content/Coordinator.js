/*! Copyright 2009-2016 Evernote Corporation. All rights reserved. */
define(["GlobalUtils", "PageInfo", "ContentPreview", "Promotion"], function (a, b, c, d) {
    function e(a) {
        aa && (aa.getElement() && aa.getElement().parentNode && aa.getElement().parentNode.removeChild(aa.getElement()), a && aa.destroy()), a && (aa = null), document.documentElement.classList.remove("skitchWaiting", "skitchReady")
    }

    function f(a, b, d) {
        !Z.classList.contains("evernoteClipperVisible") || document.documentElement.classList.contains("evernoteOptionsOpen") ? (Z.classList.remove("evernoteClipperVisible"), z()) : (Z.addEventListener("webkitTransitionEnd", z), Z.classList.remove("evernoteClipperVisible")), $ && $.parentNode && ($.parentNode.removeChild($), $ = null), document.documentElement.classList.remove("evernoteOptionsOpen"), c.clear(), e(a.notClipping), a.notClipping && (c.reset(), c.clearHighlights()), window.removeEventListener("keydown", B), window.removeEventListener("keypress", C), window.removeEventListener("mousedown", D), window.removeEventListener("unload", E), Browser.sendToExtension({name: "showLoggedInOrOutState"})
    }

    function g(a, b, c) {
        "function" == typeof fa[a.keycode] && fa[a.keycode](a.keycode, null, !0)
    }

    function h() {
        document.documentElement.classList.add("skitchWaiting")
    }

    function i(a, b, c) {
        document.documentElement.classList.contains("evernoteOptionsOpen") ? n({authed: !0}) : Z.classList.contains("evernoteClipperVisible") && (c ? f({notClipping: !0}) : Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_handleEscape", keycode: a}
        }))
    }

    function j(a) {
        Z.classList.contains("evernoteClipperVisible") && !document.documentElement.classList.contains("skitchReady") && ("notebook" === a ? Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_openNotebook"}
        }) : "tags" === a && Browser.sendToExtension({name: "bounce", message: {name: "gt_openTags"}}))
    }

    function k(a) {
        Z.classList.contains("evernoteClipperVisible") && !document.documentElement.classList.contains("skitchReady") && ("expand" == a ? c.expandPreview() : "contract" == a ? c.contractPreview() : "up" == a ? c.moveToElementAbove() : "down" == a && c.moveToElementBelow())
    }

    function l(a, b) {
        ea && fa[a] && fa[a](a, b)
    }

    function m(a, b) {
        fa[a] && fa[a](a, b)
    }

    function n(a, b, c) {
        a.authed ? (Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_reactivateClipperTool"}
        }), $ && $.parentNode && ($.parentNode.removeChild($), $ = null), document.documentElement.classList.remove("evernoteOptionsOpen")) : f({notClipping: !0})
    }

    function o() {
        Browser.sendToExtension({
            name: "getKeyboardShortcuts",
            shortcuts: ["startWebClipperShortcut"]
        }), Z = document.createElement("iframe"), Z.id = "evernoteGlobalTools", Z.addEventListener("load", function () {
            Browser.sendToExtension({
                name: "bounce",
                message: {name: "gt_setKeyboardHandlers", handlers: ga, enabled: ea}
            }), Browser.sendToExtension({
                name: "bounce",
                message: {name: "gt_getBrowserHeight", height: window.innerHeight}
            }), F()
        }), window.addEventListener("resize", function () {
            Browser.sendToExtension({
                name: "bounce",
                message: {name: "gt_getBrowserHeight", height: window.innerHeight}
            })
        }), Z.src = Browser.extension.getURL("content/global_tools/global_tools.html")
    }

    function p() {
        M(), document.documentElement.appendChild(Z), EDGE && "auto" === getComputedStyle(Z).getPropertyValue("right") && Browser.sendToExtension({
            name: "insertCSS",
            filename: ["css/contentpreview.css", "content/clip_result/iframe.css", "content/tooltips/TooltipCoordinator.css", "content/tooltips/gmail_tooltip_check.css", "css/coordinator.css"]
        }), window.addEventListener("keydown", B), window.addEventListener("keypress", C), window.addEventListener("mousedown", D), window.addEventListener("unload", E), Browser.sendToExtension({
            name: "getKeyboardShortcuts",
            shortcuts: ["closeWebClipperShortcut", "previewArticleShortcut", "previewFullPageShortcut", "previewUrlShortcut", "selectionModeShortcut", "takeScreenshotShortcut", "clearlyShortcut", "pdfShortcut", "emailShortcut", "expandArticleShortcut", "contractArticleShortcut", "moveArticleUpShortcut", "moveArticleDownShortcut", "selectNotebookShortcut", "addTagsShortcut", "saveShortcut", "minimizeClipperShortcut", "arrowShortcut", "textShortcut", "rectangleShortcut", "roundedRectangleShortcut", "ellipseShortcut", "lineShortcut", "markerShortcut", "highlighterShortcut", "stampShortcut", "pixelateShortcut", "cropShortcut"]
        }), ia++
    }

    function q(a, b, c) {
        Z && Z.classList.contains("evernoteClipperVisible") && Browser.sendToExtension({name: "showOpenState"})
    }

    function r(a) {
        return function () {
            t(), Q(a)
        }
    }

    function s(a, b) {
        return function () {
            t(), R(a, b)
        }
    }

    function t() {
        Browser.sendToExtension({name: "bounce", message: {name: "gt_maximizeClipper"}})
    }

    function u(a, b, c) {
        ea = a.keyboardShortcutsEnabled;
        var d = {};
        for (var e in a.keys) {
            var f = a.keys[e].split("|"), g = f.join(" + ");
            switch (d[g] = l, ga[e] = [g], e) {
                case"startWebClipperShortcut":
                    fa[g] = S;
                    break;
                case"closeWebClipperShortcut":
                    d[g] = m, fa[g] = i, ha[e] = [g];
                    break;
                case"previewArticleShortcut":
                    fa[g] = r("article");
                    break;
                case"previewFullPageShortcut":
                    fa[g] = r("fullPage");
                    break;
                case"previewUrlShortcut":
                    fa[g] = r("url");
                    break;
                case"selectionModeShortcut":
                    fa[g] = r("selection");
                    break;
                case"takeScreenshotShortcut":
                    EDGE || (fa[g] = r("screenshot"));
                    break;
                case"clearlyShortcut":
                    fa[g] = r("clearly");
                    break;
                case"pdfShortcut":
                    EDGE || (fa[g] = r("pdf"));
                    break;
                case"emailShortcut":
                    fa[g] = r("email");
                    break;
                case"expandArticleShortcut":
                    d[g] = m, fa[g] = function () {
                        t(), k("expand")
                    };
                    break;
                case"contractArticleShortcut":
                    d[g] = m, fa[g] = function () {
                        t(), k("contract")
                    };
                    break;
                case"moveArticleUpShortcut":
                    d[g] = m, fa[g] = function () {
                        t(), k("up")
                    };
                    break;
                case"moveArticleDownShortcut":
                    d[g] = m, fa[g] = function () {
                        t(), k("down")
                    };
                    break;
                case"selectNotebookShortcut":
                    fa[g] = function () {
                        t(), j("notebook")
                    };
                    break;
                case"addTagsShortcut":
                    fa[g] = function () {
                        t(), j("tags")
                    };
                    break;
                case"saveShortcut":
                    fa[g] = H;
                    break;
                case"minimizeClipperShortcut":
                    fa[g] = I;
                    break;
                case"arrowShortcut":
                    fa[g] = s("shapes", "arrow");
                    break;
                case"textShortcut":
                    fa[g] = s("text");
                    break;
                case"rectangleShortcut":
                    fa[g] = s("shapes", "rectangle");
                    break;
                case"roundedRectangleShortcut":
                    fa[g] = s("shapes", "roundedRectangle");
                    break;
                case"ellipseShortcut":
                    fa[g] = s("shapes", "ellipse");
                    break;
                case"lineShortcut":
                    fa[g] = s("shapes", "line");
                    break;
                case"markerShortcut":
                    fa[g] = s("marker");
                    break;
                case"highlighterShortcut":
                    fa[g] = s("highlighter");
                    break;
                case"stampShortcut":
                    fa[g] = s("stamps");
                    break;
                case"pixelateShortcut":
                    fa[g] = s("pixelate");
                    break;
                case"cropShortcut":
                    fa[g] = s("crop")
            }
            if (f.indexOf("91") > -1) {
                var h = JSON.parse(JSON.stringify(f));
                /windows/i.test(window.navigator.userAgent) ? (h[f.indexOf("91")] = "17", h.sort(function (a, b) {
                    return a - b
                }), fa[h.join(" + ")] = fa[g], delete fa[g], d[h.join(" + ")] = d[g], delete d[g], ga[e] && (ga[e][0] = h.join(" + ")), ha[e] && (ha[e][0] = h.join(" + "))) : (h[f.indexOf("91")] = "93", h.sort(function (a, b) {
                    return a - b
                }), fa[h.join(" + ")] = fa[g], d[h.join(" + ")] = d[g], ga[e] && ga[e].push(h.join(" + ")), ha[e] && ha[e].push(h.join(" + ")))
            }
        }
        Browser.addKeyboardHandlers(d), Z && Z.parentNode && Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_setKeyboardHandlers", handlers: ga, enabled: ea}
        })
    }

    function v(a, b, c) {
        ea = a.keyboardShortcutsEnabled, Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_setKeyboardHandlers", enabled: ea}
        }), Browser.sendToExtension({name: "bounce", message: {name: "op_setKeyboardHandlers", enabled: ea}})
    }

    function w(a, b, c) {
        aa = Markup({
            allowZoom: !1,
            container: document.body,
            document: a.data,
            margin: 0,
            enableToolbar: !1,
            fullScreen: !0,
            success: function () {
                if (document.documentElement.classList.add("skitchReady"), /^frameset$/i.test(document.body.nodeName)) {
                    var a = document.body.parentElement;
                    a.appendChild(aa.dom), a.appendChild(document.getElementById("en-markup-disabled"))
                }
                aa.toast(Browser.i18n.getMessage("screenshotToast")), Browser.sendToExtension({
                    name: "bounce",
                    message: {name: "skitchSurfaceReady"}
                })
            }
        }), aa.on("toolStarted", function (a) {
            Browser.sendToExtension({name: "trackEvent", category: "Skitch", action: a})
        }), aa.on("toolStopped", function (a) {
            "crop" === a && Z.style.removeProperty("display")
        }), aa.localize({
            CROP_APPLY_TEXT: Browser.i18n.getMessage("apply"),
            CROP_CANCEL_TEXT: Browser.i18n.getMessage("regForm_cancel"),
            MARKUP_STAMP_APPROVED_TEXT: Browser.i18n.getMessage("approved"),
            MARKUP_STAMP_EXCLAIM_TEXT: Browser.i18n.getMessage("wow"),
            MARKUP_STAMP_PERFECT_TEXT: Browser.i18n.getMessage("perfect"),
            MARKUP_STAMP_QUESTION_TEXT: Browser.i18n.getMessage("what"),
            MARKUP_STAMP_REJECTED_TEXT: Browser.i18n.getMessage("rejected"),
            ZOOM_RESET_TEXT: Browser.i18n.getMessage("reset"),
            ZOOM_TIP_TEXT: Browser.i18n.getMessage("panInstruction")
        })
    }

    function x(a, b, c) {
        return Browser.sendToExtension({
            name: "tabStatusReply",
            alive: !0
        }), T() ? (G(), Z.classList.contains("evernoteClipperVisible") ? f({notClipping: !0}) : (clipResultCoordinator.hideClipResult(!1), L(a)), void(c && c())) : (ja = [a, b, c], document.getElementById("evernoteLoading") || p(), void(c && c()))
    }

    function y(a, b, c) {
        "string" == typeof a.oldShortcut && (a.oldShortcut = [a.oldShortcut], a.shortcut = [a.shortcut], a.shortcutName = [a.shortcutName]);
        for (var d = 0; d < a.oldShortcut.length; d++) {
            var e = a.oldShortcut[d].split("|").join(" + "), f = a.shortcut[d].split("|").join(" + ");
            fa[f] = fa[e], delete fa[e];
            var g = {};
            ["closeWebClipperShortcut", "expandArticleShortcut", "contractArticleShortcut", "moveArticleUpShortcut", "moveArticleDownShortcut"].indexOf(a.shortcutName[d]) > -1 ? g[f] = m : g[f] = l, Browser.addKeyboardHandlers(g)
        }
    }

    function z() {
        Z && (Z.removeEventListener("webkitTransitionEnd", z), Z.parentNode && Z.parentNode.removeChild(Z)), ia = 0
    }

    function A(a) {
        "opacity" === a.propertyName && (Browser.sendToExtension({
            name: "getOption",
            option: "defaultClipAction"
        }), Z.removeEventListener("webkitTransitionEnd", A))
    }

    function B(a) {
        /Mac OS X/.test(window.navigator.userAgent) ? a.metaKey && a.preventDefault() : /Windows/.test(window.navigator.userAgent) && a.ctrlKey && a.preventDefault(), [8, 13, 27, 39, 37, 65, 70, 66, 83, 77, 80, 69, 67].indexOf(a.keyCode) > -1 ? document.documentElement.classList.contains("skitchReady") || document.documentElement.classList.contains("skitchWaiting") || a.preventDefault() : 9 === a.keyCode && Z.focus()
    }

    function C(a) {
        if (document.documentElement.classList.contains("skitchReady") && !document.querySelector("textarea.skitch-tool-element-text-editor")) {
            var b = aa.getElement().offsetWidth / 2, c = aa.getElement().offsetHeight / 2;
            Browser.sendToExtension({
                name: "bounce",
                message: {name: "gt_useSkitchTool", tool: "text", loc: {x: b, y: c}, charCode: a.charCode}
            }), a.preventDefault()
        }
    }

    function D(a) {
        Z.classList.contains("evernoteClipperVisible") ? a.srcElement !== document.documentElement && c.isPointOnVeil(a.pageX, a.pageY) && a.preventDefault() : document.documentElement.classList.contains("evernoteOptionsOpen") && a.preventDefault()
    }

    function E() {
        Browser.sendToExtension({name: "showLoggedInOrOutState"})
    }

    function F() {
        ia++, ja.length > 0 && T() && (x(ja[0], ja[1], ja[2]), ja = []), window.focus()
    }

    function G() {
        _ && _.parentNode && _.parentNode.removeChild(_)
    }

    function H() {
        Z.classList.contains("evernoteClipperVisible") && Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_save"}
        })
    }

    function I() {
        Z.classList.contains("evernoteClipperVisible") && Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_toggleMinimizeClipper"}
        })
    }

    function J(a, b, c) {
        document.documentElement.classList.contains("evernoteOptionsOpen") || (Z.style.setProperty("height", a.height + "px", "important"), a.recalculate === !0 && Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_toggleSmallScreenMode"}
        }), c && c())
    }

    function K(a, b, c) {
        a.height > window.innerHeight ? ($.style.setProperty("height", window.innerHeight + "px", "important"), $.style.setProperty("top", "-webkit-calc(50% - " + window.innerHeight / 2 + "px)", "important"), Browser.sendToExtension({
            name: "bounce",
            message: {name: "op_setPinchHeight", totalHeight: window.innerHeight}
        })) : ($.style.setProperty("height", a.height + "px", "important"), $.style.setProperty("top", "-webkit-calc(50% - " + a.height / 2 + "px)", "important"))
    }

    function L(a) {
        if (a) {
            Browser.sendToExtension({name: "main_recordActivity"}), ca = a.bizUser, da = a.bizComplete, Browser.sendToExtension({
                name: "bounce",
                message: {name: "gt_initialize", ssoRequired: ca && !da, title: b.getTitle()}
            });
            var e = b.isCustomFormat();
            Browser.sendToExtension({
                name: "bounce",
                message: {
                    name: "gt_setPossibleClipTypes",
                    pageInfo: {
                        pdf: b.getPdfUrl(),
                        documentIsFrameset: b.documentIsFrameset,
                        selection: !!b.getSelection(),
                        gmail: b.isGmail(),
                        gmailThread: b.isGmailThread(),
                        custom: e ? b.getCustomFormatSiteName(e.id) : null
                    }
                }
            }), ba = UUID.generateGuid(), Browser.sendToExtension({
                name: "getSmartFilingInfo",
                recText: b.getRecommendationText(!1),
                pendingNoteKey: ba,
                url: b.getUrl()
            }), c.clearHighlights({
                tag: "true",
                tagName: "highlight"
            }), a.selectedElement && c.setElement(d.selectedElement)
        }
        b.lazyImagesLoad(), Z.addEventListener("webkitTransitionEnd", A), Z.classList.add("evernoteClipperVisible"), Browser.sendToExtension({name: "showOpenState"}), Browser.sendToExtension({
            name: "bounce",
            message: {name: "ttc_close", which: "gmailTooltip"}
        }), Browser.sendToExtension({
            name: "bounce",
            message: {name: "ttc_close", which: "googleInboxTooltip"}
        }), Browser.sendToExtension({
            name: "bounce",
            message: {name: "ttc_close", which: "pdfTooltip"}
        }), Browser.sendToExtension({name: "bounce", message: {name: "ttc_close", which: "customTooltip"}})
    }

    function M() {
        _ = document.createElement("div"), _.id = "evernoteLoading", document.body.appendChild(_)
    }

    function N(a, b, d) {
        $ || ($ = document.createElement("iframe"), $.id = "evernoteOptionsPage", $.addEventListener("load", function () {
            Browser.sendToExtension({
                name: "bounce",
                message: {name: "op_setKeyboardHandlers", handlers: ha, enabled: ea}
            })
        }), $.src = Browser.extension.getURL("options.html#iframe")), document.documentElement.appendChild($), document.documentElement.classList.add("evernoteOptionsOpen"), c.gray(), $.focus()
    }

    function O(a, b, c) {
        new TooltipCoordinator(Browser.extension.getURL("content/tooltips/tooltip.html#authed=true&which=ssoInProgress"), "ssoInProgress", "evernoteSSOProgress")
    }

    function P(d, e, g) {
        function h(a, b) {
            "screenshot" === d.clipType ? d.screenshotUrl ? a() : aa.getFile(function (b) {
                aa.destroy(), aa = null, a({bytes: b.bytes, byteLength: b.bytes.byteLength})
            }) : "clearly" === d.clipType ? clipper.clipClearly(a, b) : "article" === d.clipType ? clipper.clipArticle(!0, a, b) : "fullPage" === d.clipType ? clipper.clipFullPage(!0, a, b) : "selection" === d.clipType ? clipper.clipSelection(!0, d.selectionText, a, b) : "url" === d.clipType ? clipper.clipUrl(a) : "pdf" === d.clipType ? clipper.clipPdf(a) : "email" === d.clipType ? clipper.clipEmail(a, b) : "image" === d.clipType ? clipper.clipImage(d.imageUrl, a) : "custom" === d.clipType && clipper.clipCustom(a, b)
        }

        function i() {
            "custom" === d.clipType && Browser.sendToExtension({
                name: "setPersistentValueForCurrentUser",
                key: b.getCustomFormatSiteName(b.isCustomFormat().id) + "UncheckedSections",
                value: c.getCustomElementUncheckedSections()
            })
        }

        f({notClipping: !1});
        var j = d.title;
        "string" != typeof j && (j = b.getTitle()), j = a.removeControlCharacters(j).trim(), j || (j = Browser.i18n.getMessage("quickNote_untitledNote"));
        var k = b.getUrl(), l = null;
        d.contextMenu && (l = b.getRecommendationText(!1)), clipResultCoordinator.showClipResult(ba, j, k, l, function () {
            i(), h(function (a) {
                var b = {
                    name: "submitNote",
                    title: j,
                    notebook: d.notebook,
                    tags: d.tags,
                    comment: d.comment,
                    clipType: d.clipType,
                    url: k,
                    hostname: document.location.hostname,
                    userSelectedNotebook: d.userSelectedNotebook,
                    pendingNoteKey: ba,
                    smartFilingNotebookAvailable: d.smartFilingNotebookAvailable,
                    changedSmartFilingNotebook: d.changedSmartFilingNotebook
                };
                "screenshot" === d.clipType ? d.screenshotUrl ? b.content = '<img src="' + d.screenshotUrl + '"></img>' : (b.content = '<img src="resource:0"></img>', b.resources = [a]) : b.content = a, Browser.sendToExtension(b), c.reset()
            }, function (a) {
                Browser.sendToExtension({
                    name: "submitNote",
                    clipType: d.clipType,
                    error: a.message + " " + a.stack,
                    pendingNoteKey: ba,
                    smartFilingNotebookAvailable: d.smartFilingNotebookAvailable,
                    changedSmartFilingNotebook: d.changedSmartFilingNotebook
                }), c.reset()
            })
        })
    }

    function Q(a) {
        Z.classList.contains("evernoteClipperVisible") && !document.documentElement.classList.contains("skitchReady") && Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_useClipType", clipType: a}
        })
    }

    function R(a, b) {
        document.documentElement.classList.contains("skitchReady") && Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_useSkitchTool", tool: a, subtool: b}
        })
    }

    function S(a, b) {
        b && (["INPUT", "TEXTAREA"].indexOf(b.nodeName) > -1 || "true" === b.contentEditable) || Browser.sendToExtension({name: "toggleClipper"}, function (a) {
            (a || chrome && chrome.runtime && chrome.runtime.lastError) && setTimeout(function () {
                alert("The Clipper couldn't start on this page. Reload the page and try again. If that doesn't help, contact customer support.")
            }, 200)
        })
    }

    function T() {
        return 2 === ia
    }

    function U(a, c, d) {
        ca === a.bizUser && da === a.bizComplete || (Browser.sendToExtension({
            name: "bounce",
            message: {name: "gt_updateUser", ssoRequired: a.bizUser && !a.bizComplete}
        }), Browser.sendToExtension({
            name: "getSmartFilingInfo",
            recText: b.getRecommendationText(!1),
            pendingNoteKey: ba,
            url: b.getUrl()
        }), ca = a.bizUser, da = a.bizComplete)
    }

    function V(a, b, c) {
        aa.updateSelectedElementsColor(a.color), aa.useColor(a.color), Browser.sendToExtension({
            name: "trackEvent",
            category: "Skitch",
            action: "color",
            label: a.color
        })
    }

    function W(a, b, c) {
        aa.useTool(a.tool), "crop" === a.tool ? (Z.style.setProperty("display", "none", "important"), Browser.sendToExtension({
            name: "trackEvent",
            category: "Skitch",
            action: "crop"
        })) : "text" === a.tool && a.loc && a.charCode && aa.startActiveTool(a.loc, {
            value: String.fromCharCode(a.charCode),
            selectOnFocus: !1
        })
    }

    function X() {
        aa.zoom(1.1, {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }), Browser.sendToExtension({name: "trackEvent", category: "Skitch", action: "zoom_in"})
    }

    function Y() {
        aa.zoom(1 / 1.1, {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }), Browser.sendToExtension({name: "trackEvent", category: "Skitch", action: "zoom_out"})
    }

    var Z, $, _, aa, ba, ca, da, ea = !0, fa = {}, ga = {}, ha = {}, ia = 0, ja = [];
    this.msgHandlerToggleCoordinator = x, Browser.addMessageHandlers({
        closeClipper: f,
        duplicateKeyboardShortcut: g,
        goToSkitchWaitingMode: h,
        hideOptions: n,
        isExtensionOpen: q,
        receiveKeyboardShortcuts: u,
        receiveKeyboardShortcutsEnabled: v,
        receiveScreenshot: w,
        setGlobalToolsHeight: J,
        setOptionsHeight: K,
        showOptions: N,
        showSSOProgressTooltip: O,
        startSubmission: P,
        toggleCoordinator: x,
        updateKeyboardShortcut: y,
        updateUserTier: U,
        skitch_useColor: V,
        skitch_useTool: W,
        skitch_zoomIn: X,
        skitch_zoomOut: Y
    }), o(), Browser.sendToExtension({name: "coordinatorLoaded"})
});