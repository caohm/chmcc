var baidu = function () {
    this.version = "1.3.5"
};
baidu.namespace = new Object();
baidu.namespace.register = function (e) {
    var c = /^[_$a-z]+[_$a-z0-9]*/i;
    var d = e.split(".");
    var g = "";
    var f = "";
    var a = [window];
    for (var b = 0; b < d.length; b++) {
        if (!c.test(d[b])) {
            throw new Error("Invalid namespace:" + d[b] + "");
            return
        }
        a[b + 1] = a[b][d[b]];
        if (typeof a[b + 1] == "undefined") {
            a[b + 1] = new Object()
        }
    }
};
String.prototype.trim = function () {
    return this.replace(/^\s*|\s*$/g, "")
};
String.prototype.format = function () {
    var b = arguments.length, a = this;
    while (b--) {
        a = a.replace(new RegExp("\\{" + b + "\\}", "g"), arguments[b])
    }
    return a
};
Date.prototype.format = function (e) {
    var a = function (m, l) {
        var n = "", k = (m < 0), j = String(Math.abs(m));
        if (j.length < l) {
            n = (new Array(l - j.length + 1)).join("0")
        }
        return (k ? "-" : "") + n + j
    };
    if ("string" != typeof e) {
        return this.toString()
    }
    var b = function (k, j) {
        e = e.replace(k, j)
    };
    var f = this.getFullYear(), d = this.getMonth() + 1, i = this.getDate(), g = this.getHours(), c = this.getMinutes(), h = this.getSeconds();
    b(/yyyy/g, a(f, 4));
    b(/yy/g, a(parseInt(f.toString().slice(2), 10), 2));
    b(/MM/g, a(d, 2));
    b(/M/g, d);
    b(/dd/g, a(i, 2));
    b(/d/g, i);
    b(/HH/g, a(g, 2));
    b(/H/g, g);
    b(/hh/g, a(g % 12, 2));
    b(/h/g, g % 12);
    b(/mm/g, a(c, 2));
    b(/m/g, c);
    b(/ss/g, a(h, 2));
    b(/s/g, h);
    return e
};
String.prototype.getBytes = function () {
    var b = this.replace(/\n/g, "xx").replace(/\t/g, "x");
    var a = encodeURIComponent(b);
    return a.replace(/%[A-Z0-9][A-Z0-9]/g, "x").length
};
var getOuterHtmlEllipsis = function (d) {
    var b = /(<[^>]+>)/g;
    var a = b.exec(d.outerHTML);
    var c = a ? a[1] : d.outerHTML;
    c = c.length > 40 ? c.substr(0, 40) + "..." : c;
    return c.replace(/</g, "&lt;").replace(/>/g, "&gt;")
};
var getOuterAndInnerHtmlEllipsis = function (b) {
    var a = jQuery("<div></div>").append(b).html()
};
(function () {
    baidu.i18n = {};
    baidu.i18n.getMessage = function (d, b) {
        if (b) {
            for (var c = 0, a = b.length; c < a; c++) {
                b[c] = "" + b[c]
            }
            return chrome.i18n.getMessage(d, b)
        } else {
            return chrome.i18n.getMessage(d)
        }
    }
})();
const MSG_TYPE = {
    BROWSER_CLICKED: "browser-clicked",
    GET_CSS: "get-css",
    GET_JS: "get-js",
    GET_HTML: "get-html",
    GET_COOKIE: "get-cookie",
    REMOVE_COOKIE: "remove-cookie",
    SET_COOKIE: "set-cookie",
    GET_OPTIONS: "get_options",
    SET_OPTIONS: "set_options",
    FCP_HELPER_INIT: "fcp_helper_init",
    CSS_READY: "css-ready",
    JS_READY: "js-ready",
    HTML_READY: "html-ready",
    ALL_READY: "all-ready",
    START_OPTION: "start-option",
    OPT_START_FCP: "opt-item-fcp",
    OPT_START_GRID: "opt-item-grid",
    CALC_PAGE_LOAD_TIME: "calc-page-load-time",
    GET_PAGE_WPO_INFO: "get_page_wpo_info",
    SHOW_PAGE_LOAD_TIME: "show-page-load-time",
    FCP_HELPER_DETECT: "fcp-helper-detect",
    GRID_DETECT: "grid-detect",
    JS_TRACKER: "js_tracker",
    CODE_COMPRESS: "code_compress",
    FROM_POPUP: "from_popup_action",
    TAB_CREATED_OR_UPDATED: "tab_created_or_updated",
    REGEXP_TOOL: "regexp",
    EN_DECODE: "endecode",
    JSON_FORMAT: "jsonformat",
    QR_CODE: "qrcode",
    CODE_BEAUTIFY: "codebeautify",
    TIME_STAMP: "timestamp",
    IMAGE_BASE64: "imagebase64",
    AUTO_FORMART_PAGE_JSON: "opt_item_autojson",
    COLOR_PICKER: "color-picker:newImage"
};
const FILE = {STYLE: "style", LINK: "link", SCRIPT: "script-block"};
const PUBLIC_ID_WHITE_LIST = {
    "": {systemIds: {"": true}},
    "-//W3C//DTD HTML 3.2 Final//EN": {systemIds: {"": true}},
    "-//W3C//DTD HTML 4.0//EN": {systemIds: {"": true, "http://www.w3.org/TR/html4/strict.dtd": true}},
    "-//W3C//DTD HTML 4.01//EN": {systemIds: {"": true, "http://www.w3.org/TR/html4/strict.dtd": true}},
    "-//W3C//DTD HTML 4.0 Transitional//EN": {systemIds: {"": true, "http://www.w3.org/TR/html4/loose.dtd": true}},
    "-//W3C//DTD HTML 4.01 Transitional//EN": {
        systemIds: {
            "": true,
            "http://www.w3.org/TR/html4/loose.dtd": true,
            "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd": true
        }
    },
    "-//W3C//DTD XHTML 1.1//EN": {systemIds: {"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd": true}},
    "-//W3C//DTD XHTML Basic 1.0//EN": {systemIds: {"http://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd": true}},
    "-//W3C//DTD XHTML 1.0 Strict//EN": {systemIds: {"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd": true}},
    "-//W3C//DTD XHTML 1.0 Transitional//EN": {systemIds: {"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd": true}},
    "ISO/IEC 15445:1999//DTD HyperText Markup Language//EN": {systemIds: {"": true}},
    "ISO/IEC 15445:2000//DTD HTML//EN": {systemIds: {"": true}},
    "ISO/IEC 15445:1999//DTD HTML//EN": {systemIds: {"": true}}
};
const COMPAT_MODE_DIFF_PUBLIC_ID_MAP = {
    "-//W3C//DTD HTML 4.0 Transitional//EN": {
        systemIds: {
            "http://www.w3.org/TR/html4/loose.dtd": {
                IE: "S",
                WebKit: "Q"
            }
        }
    },
    "ISO/IEC 15445:2000//DTD HTML//EN": {systemIds: {"": {IE: "Q", WebKit: "S"}}},
    "ISO/IEC 15445:1999//DTD HTML//EN": {systemIds: {"": {IE: "Q", WebKit: "S"}}}
};
const HTML_DEPRECATED_TAGS = {
    acronym: "定义首字母缩写",
    applet: "定义Java Applet",
    basefont: "定义Font定义",
    big: "定义大号文本",
    center: "定义居中的文本",
    dir: "定义目录列表",
    font: "定义文字相关",
    frame: "定义框架",
    frameset: "定义框架集",
    isindex: "定义单行的输入域",
    noframes: "定义noframe 部分",
    s: "定义加删除线的文本",
    strike: "定义加删除线的文本",
    tt: "定义打字机文本",
    u: "定义下划线文本",
    xmp: "定义预格式文本",
    layer: "定义层"
};
const HTML_DEPRECATED_ATTRIBUTES = {
    align: {iframe: true, img: true, object: true, table: true},
    color: {font: true},
    height: {td: true, th: true},
    language: {script: true},
    noshade: {hr: true},
    nowrap: {td: true, th: true},
    size: {hr: true, font: true, basefont: true}
};
const BLOCK_HTML_ELEMENT = ["address", "blockquote", "center", "dir", "div", "dl", "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "isindex", "menu", "noframes", "noscript", "ol", "p", "pre", "table", "ul"];
const INLINE_HTML_ELEMENT = ["a", "acronym", "b", "bdo", "big", "br", "cite", "code", "dfn", "em", "font", "i", "img", "input", "kbd", "label", "q", "s", "samp", "select", "small", "span", "strike", "strong", "sub", "sup", "textarea", "tt", "u", "var"];
const CHANGE_ABLE_HTML_ELEMENT = ["applet", "button", "del", "iframe", "ins", "map", "object", "script"];
const CONDITIONAL_COMMENT_REGEXP = /\[\s*if\s+[^\]][\s\w]*\]/i;
const NOT_IE_REVEALED_OPENING_CONDITIONAL_COMMENT_REGEXP = /^\[if\s+(!IE|false)\]$/i;
const REVEALED_CLOSING_CONDITIONAL_COMMENT_REGEXP = /^\[endif\s*\]$/i;
const NOT_IE_HIDDEN_CONDITIONAL_COMMENT_REGEXP = /^\[if\s+(!IE|false)\]>.*<!\[endif\]$/i;
const REG = {
    SCRIPT: /<script[^>]*>[\s\S]*?<\/[^>]*script>/gi,
    COMMENT: /<!--[\s\S]*?--\>/g,
    CSS_EXPRESSION: /expression[\s\r\n ]?\(/gi,
    TEXTAREA: /<textarea[^>]*>[\s\S]*?<\/[^>]*textarea>/gi,
    INVALID_TAG: /<\W+>/gi
};
const SELF_CLOSING_TAGS = ["meta", "link", "area", "base", "col", "input", "img", "br", "hr", "param", "embed"];
baidu.namespace.register("baidu.network");
baidu.network = (function () {
    var d = function (f, h) {
        var g = new XMLHttpRequest();
        g.onreadystatechange = function () {
            if (g.readyState === 4) {
                var i;
                if (g.status === 200 && g.responseText) {
                    i = {success: true, type: FILE.LINK, path: f, content: g.responseText}
                } else {
                    i = {success: false, type: FILE.LINK, path: f, content: "FcpHelper can't load such file."}
                }
                h(i)
            }
        };
        g.open("GET", f, true);
        g.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        g.setRequestHeader("Access-Control-Allow-Origin", "*");
        g.send()
    };
    var a = function (f) {
        return "http" + (f.secure ? "s" : "") + "://" + f.domain + f.path
    };
    var c = function (g, h) {
        var f = [];
        chrome.cookies.getAll({}, function (l) {
            for (var k = 0, j = l.length; k < j; k++) {
                if (g.url.indexOf(l[k].domain.substring(1)) > -1) {
                    l[k].url = a(l[k]);
                    f.push(l[k])
                }
            }
            l.sort(function (m, i) {
                return m.domain.localeCompare(i.domain)
            });
            h.call(null, {cookie: f})
        })
    };
    var e = function (f, g) {
        chrome.cookies.getAll({}, function (m) {
            for (var l = 0, k = m.length; l < k; l++) {
                var j = a(m[l]);
                var h = m[l].name;
                if (j == f.url && h == f.name) {
                    chrome.cookies.remove({url: j, name: h});
                    if (g && typeof g == "function") {
                        g.call(null)
                    }
                    return
                }
            }
        })
    };
    var b = function (f, g) {
        chrome.cookies.getAll({}, function (m) {
            for (var l = 0, k = m.length; l < k; l++) {
                var j = a(m[l]);
                var h = m[l].name;
                if (j == f.url && h == f.name) {
                    chrome.cookies.set(f);
                    if (g && typeof g == "function") {
                        g.call(null)
                    }
                    return
                }
            }
        })
    };
    return {readFileContent: d, getCookies: c, removeCookie: e, setCookie: b}
})();
baidu.feOption = (function () {
    var d = function (o) {
        for (var p in o) {
            window.localStorage.setItem(p, o[p])
        }
    };
    var f = function (p) {
        var r = {};
        for (var q = 0, o = p.length; q < o; q++) {
            r[p[q]] = window.localStorage.getItem(p[q])
        }
        return r
    };
    var l = function (o, p) {
        chrome.extension.sendMessage({type: MSG_TYPE.GET_OPTIONS, items: o}, p)
    };
    var j = function (o) {
        chrome.extension.sendMessage({type: MSG_TYPE.SET_OPTIONS, items: o})
    };
    var a = function (o, p) {
        if (p && typeof p == "function") {
            p.call(null, f(o))
        }
    };
    var n = function (o) {
        d(o)
    };
    var b = function (o) {
        return f([o])[o]
    };
    var c = function () {
        var o = {};
        o.opt_item_contextMenus = $("#opt_item_contextMenus").attr("checked");
        o.opt_item_showfdpmenu = $("#opt_item_showfdpmenu").attr("checked");
        o.opt_item_autojson = $("#opt_item_autojson").attr("checked");
        o.opt_item_notification = $("#opt_item_notification").val();
        j(o)
    };
    var k = function () {
        var o = ["opt_item_contextMenus", "opt_item_showfdpmenu", "opt_item_autojson", "opt_item_notification"];
        l(o, function (p) {
            $.each(o, function (q, r) {
                if (q == 3) {
                    $("#" + r).val(p[r])
                } else {
                    if (p[r] === "true") {
                        $("#" + r).attr("checked", "checked")
                    }
                }
            })
        })
    };
    var e = function (o) {
        switch (o) {
            case"opt_form_start":
                c();
                break;
            case"":
                break
        }
    };
    var i = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (o) {
            var p = o[0];
            chrome.tabs.remove(p.id)
        })
    };
    var h = function () {
        $("#fe-opt-list-item>li").click(function (p) {
            var o = $(this).siblings().removeClass("selected").end().addClass("selected");
            $(o.attr("data-content")).siblings().removeClass("selected").addClass("fe-hide").end().removeClass("fe-hide").addClass("selected")
        });
        $(".right form").submit(function (o) {
            e($(this).attr("id"));
            i();
            o.preventDefault();
            o.stopPropagation()
        });
        $("#btn_close").click(function () {
            i()
        });
        $("#btn_save").click(function () {
            $(".right div.selected form").submit()
        })
    };
    var m = function () {
        k()
    };
    var g = function () {
        h();
        m()
    };
    return {init: g, doSetOptions: n, doGetOptions: a, getOptionItem: b, getOptions: l, setOptions: j}
})();
var BgPageInstance = (function () {
    var q = {css: false, js: false, html: true, allDone: false};
    var p = function (s) {
        if (!window.Notification) {
            return
        }
        if (!s.icon) {
            s.icon = "static/img/fe-48.png"
        }
        if (!s.title) {
            s.title = "温馨提示"
        }
        return chrome.notifications.create("", {
            type: "basic",
            title: s.title,
            iconUrl: chrome.runtime.getURL(s.icon),
            message: s.message
        })
    };
    var g = function (s) {
        if (q.css && q.js && q.html) {
            q.allDone = true
        }
        if (q.allDone && typeof s == "function") {
            s()
        }
    };
    var i = [];
    var f = function (s) {
        if (q.allDone) {
            clearInterval(i[s.id]);
            chrome.tabs.sendMessage(s.id, {type: MSG_TYPE.BROWSER_CLICKED, event: MSG_TYPE.FCP_HELPER_DETECT})
        } else {
            if (i[s.id] === undefined) {
                chrome.tabs.sendMessage(s.id, {type: MSG_TYPE.BROWSER_CLICKED, event: MSG_TYPE.FCP_HELPER_INIT});
                p({message: "正在准备数据，请稍等..."});
                i[s.id] = setInterval(function () {
                    f(s)
                }, 200)
            }
        }
    };
    var r = function (s) {
        chrome.tabs.query({active: true, currentWindow: true}, function (t) {
            if (!s) {
                p({message: "对不起，检测失败"})
            } else {
                chrome.tabs.create({
                    url: "template/fehelper_wpo.html?" + btoa(encodeURIComponent(JSON.stringify(s))),
                    active: true
                })
            }
        })
    };
    var k = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (s) {
            var t = s[0];
            chrome.tabs.sendMessage(t.id, {type: MSG_TYPE.GET_PAGE_WPO_INFO})
        })
    };
    var d = function () {
        var s = "http://www.baidufe.com/fehelper/codecompress.html";
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (w) {
            var y = false;
            var u;
            var x = new RegExp("fehelper.*codecompress.html$", "i");
            for (var v = 0, t = w.length; v < t; v++) {
                if (x.test(w[v].url)) {
                    y = true;
                    u = w[v].id;
                    break
                }
            }
            if (!y) {
                chrome.tabs.create({url: s, active: true})
            } else {
                chrome.tabs.update(u, {highlighted: true})
            }
        })
    };
    var l = function (s, t) {
        return function (u) {
            if (t) {
                setTimeout(function () {
                    chrome.tabs.sendMessage(u.id, {type: MSG_TYPE.TAB_CREATED_OR_UPDATED, content: t, event: s})
                }, 300)
            }
        }
    };
    var m = function (u, t, s) {
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (y) {
            var A = false;
            var w;
            var z = new RegExp("^chrome.*" + t + ".html$", "i");
            for (var x = 0, v = y.length; x < v; x++) {
                if (z.test(y[x].url)) {
                    A = true;
                    w = y[x].id;
                    break
                }
            }
            if (!A) {
                chrome.tabs.create({url: "template/fehelper_" + t + ".html", active: true}, l(t, s))
            } else {
                chrome.tabs.update(w, {highlighted: true}, l(t, s))
            }
        })
    };
    var a = function (s) {
        chrome.tabs.query({active: true, currentWindow: true}, function (t) {
            var u = t[0];
            if (s.useFile == "1") {
                var v = s.msgType == MSG_TYPE.QR_CODE ? u.url : "";
                m(u, s.msgType, v)
            } else {
                switch (s.msgType) {
                    case MSG_TYPE.FCP_HELPER_DETECT:
                        f(u);
                        break;
                    case MSG_TYPE.SHOW_PAGE_LOAD_TIME:
                        k();
                        break;
                    case MSG_TYPE.CODE_COMPRESS:
                        d();
                        break
                }
            }
        })
    };
    var c = function () {
        j();
        baidu.contextMenuId = chrome.contextMenus.create({
            title: "FeHelper",
            contexts: ["page", "selection", "editable", "link"],
            documentUrlPatterns: ["http://*/*", "https://*/*"]
        });
        chrome.contextMenus.create({
            title: "生成二维码",
            contexts: ["page", "selection", "editable", "link"],
            parentId: baidu.contextMenuId,
            onclick: function (t, s) {
                chrome.tabs.executeScript(s.id, {
                    code: "(" + (function () {
                        return window.getSelection().toString() || location.href
                    }).toString() + ")()", allFrames: false
                }, function (u) {
                    m(s, "qrcode", u)
                })
            }
        });
        chrome.contextMenus.create({type: "separator", contexts: ["all"], parentId: baidu.contextMenuId});
        chrome.contextMenus.create({
            title: "页面取色器",
            contexts: ["page", "selection", "editable"],
            parentId: baidu.contextMenuId,
            onclick: function (t, s) {
                b()
            }
        });
        chrome.contextMenus.create({type: "separator", contexts: ["all"], parentId: baidu.contextMenuId});
        chrome.contextMenus.create({
            title: "字符串编解码",
            contexts: ["page", "selection", "editable"],
            parentId: baidu.contextMenuId,
            onclick: function (t, s) {
                chrome.tabs.executeScript(s.id, {
                    code: "(" + (function () {
                        return window.getSelection().toString()
                    }).toString() + ")()", allFrames: false
                }, function (u) {
                    m(s, "endecode", u)
                })
            }
        });
        chrome.contextMenus.create({type: "separator", contexts: ["all"], parentId: baidu.contextMenuId});
        chrome.contextMenus.create({
            title: "JSON格式化",
            contexts: ["page", "selection", "editable"],
            parentId: baidu.contextMenuId,
            onclick: function (t, s) {
                chrome.tabs.executeScript(s.id, {
                    code: "(" + (function () {
                        return window.getSelection().toString()
                    }).toString() + ")()", allFrames: false
                }, function (u) {
                    m(s, "jsonformat", u)
                })
            }
        });
        chrome.contextMenus.create({type: "separator", contexts: ["all"], parentId: baidu.contextMenuId});
        chrome.contextMenus.create({
            title: "代码格式化",
            contexts: ["page", "selection", "editable"],
            parentId: baidu.contextMenuId,
            onclick: function (t, s) {
                chrome.tabs.executeScript(s.id, {
                    code: "(" + (function () {
                        return window.getSelection().toString()
                    }).toString() + ")()", allFrames: false
                }, function (u) {
                    m(s, "codebeautify", u)
                })
            }
        })
    };
    var j = function () {
        if (!baidu.contextMenuId) {
            return
        }
        chrome.contextMenus.remove(baidu.contextMenuId);
        baidu.contextMenuId = null
    };
    var e = function () {
        if (baidu.feOption.getOptionItem("opt_item_contextMenus") !== "false") {
            c()
        } else {
            j()
        }
    };
    var b = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (u) {
            var v = u[0];
            var s = v.id;
            var t = chrome.tabs.connect(s, {name: "popupshown"});
            chrome.tabs.sendMessage(s, {enableColorPicker: true}, function (w) {
                chrome.tabs.sendMessage(s, {doPick: true}, function (x) {
                })
            })
        })
    };
    var n = function (s) {
        chrome.tabs.query({active: true, currentWindow: true}, function (u) {
            var v = u[0];
            var t = v.id;
            chrome.tabs.captureVisibleTab(null, {format: "png"}, function (w) {
                chrome.tabs.sendMessage(t, {setPickerImage: true, pickerImage: w}, function (x) {
                    s && s()
                })
            })
        })
    };
    var o = function () {
        chrome.runtime.onMessage.addListener(function (t, s, u) {
            if (t.type == MSG_TYPE.GET_CSS) {
                baidu.network.readFileContent(t.link, u)
            } else {
                if (t.type == MSG_TYPE.GET_JS) {
                    baidu.network.readFileContent(t.link, u)
                } else {
                    if (t.type == MSG_TYPE.GET_HTML) {
                        baidu.network.readFileContent(t.link, u)
                    } else {
                        if (t.type == MSG_TYPE.GET_COOKIE) {
                            baidu.network.getCookies(t, u)
                        } else {
                            if (t.type == MSG_TYPE.REMOVE_COOKIE) {
                                baidu.network.removeCookie(t, u)
                            } else {
                                if (t.type == MSG_TYPE.SET_COOKIE) {
                                    baidu.network.setCookie(t, u)
                                } else {
                                    if (t.type == MSG_TYPE.CSS_READY) {
                                        q.css = true;
                                        g(u)
                                    } else {
                                        if (t.type == MSG_TYPE.JS_READY) {
                                            q.js = true;
                                            g(u)
                                        } else {
                                            if (t.type == MSG_TYPE.HTML_READY) {
                                                q.html = true;
                                                g(u)
                                            } else {
                                                if (t.type == MSG_TYPE.GET_OPTIONS) {
                                                    baidu.feOption.doGetOptions(t.items, u)
                                                } else {
                                                    if (t.type == MSG_TYPE.SET_OPTIONS) {
                                                        baidu.feOption.doSetOptions(t.items, u);
                                                        e()
                                                    } else {
                                                        if (t.type == MSG_TYPE.CALC_PAGE_LOAD_TIME) {
                                                            r(t.wpo)
                                                        } else {
                                                            if (t.type == MSG_TYPE.FROM_POPUP) {
                                                                a(t.config)
                                                            } else {
                                                                if (t.type == MSG_TYPE.COLOR_PICKER) {
                                                                    n(u)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return true
        })
    };
    var h = function () {
        o();
        e()
    };
    return {init: h, runHelper: a, showColorPicker: b}
})();
BgPageInstance.init();