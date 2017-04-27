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
baidu.namespace.register("baidu.FL");
baidu.FL = new (function () {
    this.FL_EOF = 1;
    this.FL_TPL_DELIMITER = 2;
    this.FL_NEW_LINE = 3;
    this.FL_NORMAL = 4;
    this.HTML_CONTENT = 111;
    this.HTML_TAG = 112;
    this.HTML_JS_START = 113;
    this.HTML_JS_CONTENT = 114;
    this.HTML_JS_END = 115;
    this.HTML_CSS_START = 116;
    this.HTML_CSS_CONTENT = 117;
    this.HTML_CSS_END = 118;
    this.HTML_IE_HACK_START = 119;
    this.HTML_IE_HACK_EDN = 120;
    this.HTML_DOC_TYPE = 121;
    this.HTML_COMMENT = 122;
    this.HTML_STATUS_OK = 123;
    this.HTML_TAG_START = 124;
    this.HTML_TAG_END = 125;
    this.HTML_TPL_ATTR_NAME = 126;
    this.HTML_XML = 127;
    this.HTML_TEXTAREA_START = 128;
    this.HTML_TEXTAREA_CONTENT = 129;
    this.HTML_TEXTAREA_END = 130;
    this.HTML_PRE_START = 131;
    this.HTML_PRE_CONTENT = 132;
    this.HTML_PRE_END = 133;
    this.JS_START_EXPR = 211;
    this.JS_END_EXPR = 212;
    this.JS_START_BLOCK = 213;
    this.JS_END_BLOCK = 214;
    this.JS_SEMICOLON = 215;
    this.JS_WORD = 216;
    this.JS_OPERATOR = 217;
    this.JS_EQUALS = 218;
    this.JS_INLINE_COMMENT = 219;
    this.JS_BLOCK_COMMENT = 220;
    this.JS_COMMENT = 221;
    this.JS_STRING = 222;
    this.JS_IE_CC = 223;
    this.JS_REGEXP = 224;
    this.JS_MODE_EXPRESSION = 250;
    this.JS_MODE_INDENT_EXPRESSION = 251;
    this.JS_MODE_DO_BLOCK = 252;
    this.JS_MODE_BLOCK = 253;
    this.JS_MODE_ARRAY = 254;
    this.CSS_AT = 311;
    this.CSS_NORMAL = 312;
    this.CSS_DEVICE_DESC = 313;
    this.CSS_DEVICE_START = 314;
    this.CSS_DEVICE_END = 315;
    this.CSS_SELECTOER = 316;
    this.CSS_SELECTOER_START = 317;
    this.CSS_SELECTOER_END = 318;
    this.CSS_COMMENT = 319;
    this.CSS_PROPERTY = 320;
    this.CSS_VALUE = 321;
    this.CSS_SEMICOLON = 322;
    this.CSS_COLON = 323
})();
baidu.namespace.register("baidu.cssAnalytic");
baidu.cssAnalytic = function () {
    this.parsePos = 0;
    this.content = "";
    this.contentLength = 0;
    this._output = [];
    this._pre_type = "";
    this.run = function (a) {
        this.content = a.trim().replace(/\n/g, "\n");
        this.contentLength = this.content.length;
        this.tokenAnalytic();
        return this._output
    };
    this.tokenAnalytic = function () {
        var a;
        while (true) {
            a = this.getNextToken();
            if (a) {
                if (a[1] === baidu.FL.FL_EOF) {
                    break
                }
                this._output.push(a);
                if (a[1] === baidu.FL.CSS_PROPERTY) {
                    this._output.push([":", baidu.FL.CSS_COLON])
                } else {
                    if (a[1] === baidu.FL.CSS_VALUE) {
                        this._output.push([";", baidu.FL.CSS_SEMICOLON])
                    }
                }
            }
        }
    };
    this.getNextToken = function () {
        if (this.parsePos >= this.contentLength) {
            return ["", baidu.FL.FL_EOF]
        }
        $char = this.content[this.parsePos];
        this.parsePos++;
        if ($char === "\x0d") {
            return ""
        }
        if ($char === "\x0a") {
            return [$char, baidu.FL.FL_NEW_LINE]
        }
        if ($char.trim() === "" || $char === ";") {
            return ""
        }
        var d;
        if ($char === "@") {
            d = this._getAtToken($char);
            if (d) {
                return d
            }
        } else {
            if ($char === "{") {
                switch (this._pre_type) {
                    case baidu.FL.CSS_DEVICE_DESC:
                        this._pre_type = baidu.FL.CSS_DEVICE_START;
                        return [$char, baidu.FL.CSS_DEVICE_START];
                    default:
                        this._pre_type = baidu.FL.CSS_SELECTOER_START;
                        return [$char, baidu.FL.CSS_SELECTOER_START]
                }
            } else {
                if ($char === "}") {
                    switch (this._pre_type) {
                        case baidu.FL.CSS_SELECTOER_END:
                            this._pre_type = baidu.FL.CSS_DEVICE_END;
                            return [$char, baidu.FL.CSS_DEVICE_END];
                        default:
                            for (var e = this._output.length - 1; e >= 0; e--) {
                                var c = this._output[e];
                                if (c[1] === baidu.FL.CSS_SELECTOER_START) {
                                    this._pre_type = baidu.FL.CSS_SELECTOER_END;
                                    return [$char, baidu.FL.CSS_SELECTOER_END]
                                } else {
                                    if (c[1] === baidu.FL.CSS_DEVICE_START) {
                                        this._pre_type = baidu.FL.CSS_DEVICE_END;
                                        return [$char, baidu.FL.CSS_DEVICE_END]
                                    }
                                }
                            }
                            this._pre_type = baidu.FL.CSS_SELECTOER_END;
                            return [$char, baidu.FL.CSS_SELECTOER_END]
                    }
                } else {
                    if (this.content.substr(this.parsePos - 1, 2) === "/*") {
                        d = this._getCommentToken($char);
                        if (d) {
                            return d
                        }
                    } else {
                        if ($char === "\x0d" || $char === "\x0a") {
                            return [$char, baidu.FL.FL_NEW_LINE]
                        }
                    }
                }
            }
        }
        switch (this._pre_type) {
            case baidu.FL.CSS_SELECTOER_START:
            case baidu.FL.CSS_VALUE:
                d = this._getPropertyToken($char);
                this._pre_type = baidu.FL.CSS_PROPERTY;
                return d;
            case baidu.FL.CSS_PROPERTY:
                d = this._getValueToken($char);
                this._pre_type = baidu.FL.CSS_VALUE;
                return d;
            case baidu.FL.CSS_DEVICE_START:
                var b = this.parsePos;
                d = this._getPropertyToken($char);
                var a = d[0];
                if (a.indexOf("{") > -1) {
                    this.parsePos = b;
                    d = this._getSelectorToken($char);
                    this._pre_type = baidu.FL.CSS_DEVICE_START;
                    if (d) {
                        return d
                    }
                } else {
                    this._pre_type = baidu.FL.CSS_PROPERTY;
                    return d
                }
            default:
                d = this._getSelectorToken($char);
                if (d) {
                    return d
                }
        }
        return [$char, baidu.FL.CSS_NORMAL]
    };
    this._getAtToken = function (a) {
        $resultString = a;
        while (this.content[this.parsePos] !== ";" && this.content[this.parsePos] !== "{" && this.parsePos < this.contentLength) {
            $resultString += this.content[this.parsePos];
            this.parsePos++
        }
        if (this.content[this.parsePos] === ";") {
            $resultString += ";";
            this.parsePos++;
            return [$resultString.trim(), baidu.FL.CSS_AT]
        }
        this._pre_type = baidu.FL.CSS_DEVICE_DESC;
        return [$resultString.trim(), baidu.FL.CSS_DEVICE_DESC]
    };
    this._getCommentToken = function (a, b) {
        this.parsePos++;
        $resultString = "";
        while (!(this.content[this.parsePos] === "*" && this.content[this.parsePos + 1] && this.content[this.parsePos + 1] === "/") && this.parsePos < this.contentLength) {
            $resultString += this.content[this.parsePos];
            this.parsePos++
        }
        this.parsePos += 2;
        if (b) {
            return "/*" + $resultString + "*/"
        }
        return ["/*" + $resultString + "*/", baidu.FL.CSS_COMMENT]
    };
    this._getSelectorToken = function (a) {
        var b = a;
        while (this.content[this.parsePos] !== "{" && this.content[this.parsePos] !== "}" && this.parsePos < this.contentLength) {
            if (this.content[this.parsePos] === "/" && this.content[this.parsePos + 1] && this.content[this.parsePos + 1] === "*") {
                b += this._getCommentToken("/", true)
            } else {
                b += this.content[this.parsePos];
                this.parsePos++
            }
        }
        return [b.trim(), baidu.FL.CSS_SELECTOER]
    };
    this._getPropertyToken = function (a) {
        $resultString = a;
        while (this.content[this.parsePos] !== ":" && this.content[this.parsePos] !== ";" && this.content[this.parsePos] !== "}" && this.parsePos < this.contentLength) {
            $resultString += this.content[this.parsePos];
            this.parsePos++
        }
        if (this.content[this.parsePos] !== "}") {
            this.parsePos++
        }
        return [$resultString.trim().toLowerCase(), baidu.FL.CSS_PROPERTY]
    };
    this._getValueToken = function (a) {
        var c = a;
        var b = false;
        while (this.content[this.parsePos] !== ";" && this.content[this.parsePos] !== "}" && this.parsePos < this.contentLength) {
            a = this.content[this.parsePos];
            this.parsePos++;
            c += a;
            if (!b && c.toLowerCase() === "expression(") {
                b = true;
                c += this._getJSToken()
            }
        }
        if (this.content[this.parsePos] === ";") {
            this.parsePos++
        }
        c = c.trim().replace(/\s+/ig, " ");
        return [c, baidu.FL.CSS_VALUE]
    };
    this._getJSToken = function () {
        var b = "", a;
        while (this.parsePos < this.contentLength) {
            a = this.content[this.parsePos];
            this.parsePos++;
            b += a;
            if (a === ")" && this._checkJSToken("(" + b)) {
                break
            }
        }
        return b
    };
    this._checkJSToken = function (d) {
        var e = 0;
        var c = 0;
        for (var f = 0, b = d.length; f < b; f++) {
            var a = d[f];
            if (a[0] === "(") {
                e++
            } else {
                if (a[0] === ")") {
                    c++
                }
            }
        }
        return e === c
    }
};
baidu.namespace.register("baidu.css");
baidu.css = (function () {
    var s = null;
    var d = null;
    var G = null;
    var z = 0;
    var D = null;
    var B = [];
    var y = null;
    var n = function (L) {
        s = {curIndex: 0, queen: [], callback: new Function(), finished: L};
        d = {}
    };
    var e = function () {
        y = {styles: [], cssMinified: {files: [], count: 0}, backgroundImages: [], expressions: [], duplicatedFiles: []}
    };
    var A = function () {
        G = {
            matched: {count: 0, selectors: []},
            unmatched: {count: 0, selectors: []},
            ignored: {count: 0, selectors: []}
        }
    };
    var k = function (L) {
        s.queen.push(L)
    };
    var c = function () {
        return s.queen[s.curIndex]
    };
    var i = function () {
        return (s.curIndex == s.queen.length)
    };
    var I = function () {
        s.curIndex += 1
    };
    var f = function () {
        return s.finished
    };
    var l = function (N) {
        var L = /(.*\/)([^\/]+\.css)/;
        var M = L.exec((N || "").replace(/\?.*/, ""));
        D = M ? M[1] : ""
    };
    var u = function () {
        return D || ""
    };
    var v = function (N) {
        var L = /(.*\/)([^\/]+\.css)/;
        var M = L.exec((N || "").replace(/\?.*/, ""));
        return M ? M[2] : "style块" + ++z
    };
    var m = function (O, N) {
        N = N.replace(/\/\*[\S\s]*?\*\//g, "");
        var L = v(O);
        B.push({href: O ? O : "#", fileName: L, fileContent: N});
        try {
            var M = /@import\s+url\(\s*(\"|\')(.*)\1\s*\)(\s*;)?/ig;
            N.replace(M, function (R, Q, S) {
                k({link: {href: u() + S}, style: null})
            })
        } catch (P) {
        }
    };
    var j = function (M) {
        if (M.indexOf("http://") != 0) {
            M = M.replace(/['"]/g, "");
            var L = u();
            if (M.indexOf("/") == 0) {
                L = ""
            } else {
                if (M.indexOf("./") == 0) {
                    M = M.substr(2)
                } else {
                    if (M.indexOf("../") == 0) {
                        M = M.substr(3);
                        if (L.lastIndexOf("/") == L.length - 1) {
                            L = L.substr(0, L.length - 1)
                        }
                        L = L.substr(0, L.lastIndexOf("/") + 1)
                    }
                }
            }
            M = L + M
        }
        return M
    };
    var b = function (M, O) {
        var N = /(background|background-image):(?:[\#\w]+\s+)?url\(([^\)]*)\)/ig;
        var L = [];
        O.replace(/\/\*[\S\s]*?\*\//g, "").replace(/\r?\n/, "").replace(/\s+\'|\"/g, "").replace(N, function (Q, P, R) {
            R = R.replace(/\?.*/, "");
            L.push(j(R))
        });
        if (L.length) {
            y.backgroundImages.push({fileName: M, bgImages: L})
        }
    };
    var E = function (M, O) {
        var N = /:expression\(/ig;
        var L = O.replace(/\/\*[\S\s]*?\*\//g, "").replace(/\r?\n/, "").replace(/\s+/g, "").split(N);
        if (L.length - 1) {
            y.expressions.push({fileName: M, count: L.length - 1})
        }
    };
    var o = function (N) {
        var L = N.fileContent.split(/\n/);
        var M = N.fileContent.length / L.length;
        if (M < 150 && L.length > 1) {
            y.cssMinified.count++;
            y.cssMinified.files.push({href: N.href, fileName: N.fileName})
        }
    };
    var C = function (L) {
        var M = (function () {
            var N = {link: [], style: []};
            jQuery.each(L, function (P, O) {
                if (!!O.href) {
                    N.link.push(O)
                } else {
                    N.style.push(O)
                }
            });
            return N
        })();
        return M
    };
    var K = function (L) {
        l(L.href);
        chrome.extension.sendMessage(null, {type: MSG_TYPE.GET_CSS, link: L.href}, function (M) {
            m(M.path, M.content);
            g()
        })
    };
    var r = function (L) {
        m("", L.ownerNode.innerText);
        g()
    };
    var g = function () {
        var L = c();
        if (f() || !L) {
            chrome.extension.sendMessage({type: MSG_TYPE.CSS_READY});
            return
        }
        I();
        if (i()) {
            n(true)
        }
        if (!!L.style) {
            r(L.style)
        } else {
            if (!!L.link) {
                K(L.link)
            }
        }
    };
    var t = function () {
        styleheets = C(document.styleSheets);
        if (styleheets.style && styleheets.style.length > 0) {
            jQuery.each(styleheets.style, function (L, M) {
                k({link: null, style: M})
            })
        }
        if (styleheets.link && styleheets.link.length > 0) {
            jQuery.each(styleheets.link, function (L, M) {
                k({link: M, style: null})
            })
        }
        g()
    };
    var x = function () {
        return [{type: 0, count: G.unmatched.count, content: G.unmatched.selectors}, {
            type: 1,
            count: G.ignored.count,
            content: G.ignored.selectors
        }, {type: 2, count: G.matched.count, content: G.matched.selectors}]
    };
    var H = function () {
        var L = false;
        jQuery.each(B, function (M, N) {
            q(N)
        })
    };
    var q = function (L) {
        var P = L.fileName;
        var O = L.fileContent;
        o(L);
        E(P, O);
        b(P, O);
        var N = (new baidu.cssAnalytic()).run(O);
        var M = h(N);
        A();
        jQuery.each(M, function (Q, R) {
            if (R.selector) {
                a(R.selector, R.csstext)
            }
        });
        y.styles.push({path: P, content: x()})
    };
    var h = function (S) {
        var R = [], M = "", T = [], O;
        for (var N = 0, P = S.length; N < P; N++) {
            var U = S[N];
            if (U[1] == baidu.FL.FL_NEW_LINE) {
                continue
            } else {
                if (U[1] == baidu.FL.CSS_DEVICE_DESC) {
                    M = U[0];
                    O = baidu.FL.CSS_DEVICE_START;
                    continue
                } else {
                    if (U[1] == baidu.FL.CSS_SELECTOER) {
                        M = U[0];
                        O = baidu.FL.CSS_SELECTOER_START;
                        continue
                    } else {
                        if (U[1] == baidu.FL.CSS_AT) {
                            M = U[0]
                        } else {
                            var L = N;
                            for (; L < P; L++) {
                                var Q = S[L];
                                if (U[1] == baidu.FL.CSS_AT) {
                                    L--;
                                    break
                                } else {
                                    if (Q[1] == baidu.FL.CSS_DEVICE_END && O == baidu.FL.CSS_DEVICE_START) {
                                        T.push(Q[0]);
                                        break
                                    } else {
                                        if (Q[1] == baidu.FL.CSS_SELECTOER_END && O == baidu.FL.CSS_SELECTOER_START) {
                                            T.push(Q[0]);
                                            break
                                        } else {
                                            T.push(Q[0])
                                        }
                                    }
                                }
                            }
                            N = L
                        }
                    }
                }
            }
            R.push({selector: M, csstext: T.join("")});
            T = [];
            O = ""
        }
        return R
    };
    var a = function (M, S) {
        var O = M.replace(/\r?\n/g, "").trim().split(",");
        var R = "", L;
        var Q = /^([\*\+]+[^ ]+)[ ]+(.*)$/;
        var N = /([^:]+)(:hover|:focus|:visited|:link|:active|:before|:after|::)/;
        var P;
        jQuery.each(O, function (V, T) {
            R = T;
            L = Q.exec(T);
            if (L && L[1] && L[2]) {
                T = L[2]
            }
            var X = false;
            if (T.indexOf("@") > -1 || T.indexOf("-moz-") > -1) {
                d[T] = 1
            } else {
                if (!d[T]) {
                    var U = N.exec(T);
                    if (U && U[1]) {
                        X = true;
                        T = U[1]
                    }
                    try {
                        d[T] = jQuery(T + ':not("[id^=fe-helper-],[id^=fe-helper-] ' + T + '")').length
                    } catch (W) {
                        d[T] = 0
                    }
                }
            }
            P = d[T] ? X ? "ignored" : "matched" : "unmatched";
            G[P].count++;
            G[P].selectors.push({selector: R, cssText: S})
        })
    };
    var p = function () {
        H()
    };
    var J = function () {
        styleheets = C(document.styleSheets);
        var N = {};
        var M = [];
        var L = {};
        if (styleheets.link && styleheets.link.length > 0) {
            jQuery.each(styleheets.link, function (O, P) {
                N[P.href] = parseInt(N[P.href] || 0, 10) + 1
            });
            jQuery.each(N, function (O, Q) {
                if (Q > 1) {
                    M.push({href: O, count: Q})
                } else {
                    var P = "";
                    var R = [];
                    jQuery.each(B, function (T, S) {
                        if (S.href == O) {
                            P = S.fileContent.replace(/\s+/g, "");
                            return false
                        }
                    });
                    jQuery.each(B, function (T, S) {
                        if (P == S.fileContent.replace(/\s+/g, "") && !L[S.href] && R.join(",").indexOf(S.href) == -1) {
                            R.push(S.href)
                        }
                    });
                    if (R.length > 1) {
                        M.push({href: O, dupFiles: R});
                        L[O] = true
                    }
                }
            })
        }
        y.duplicatedFiles = M
    };
    var F = function () {
        n(false);
        t()
    };
    var w = function (L) {
        e();
        p();
        J();
        if (L && typeof L == "function") {
            L.call(null, y)
        }
    };
    return {init: F, detect: w}
})();
baidu.namespace.register("baidu.htmlAnalytic");
baidu.htmlAnalytic = function () {
    this.parsePos = 0;
    this.content = "";
    this.contentLength = 0;
    this.singleTag = ["br", "input", "link", "meta", "!doctype", "basefont", "base", "col", "area", "hr", "wbr", "param", "img", "isindex", "?xml", "embed"];
    this.closeTagWhiteList = ["html", "body", "li", "tr", "td"];
    this._output = [];
    this.__construct = function () {
    };
    this.run = function (b, a) {
        if (a == undefined) {
            a = 1
        }
        this.content = b.trim().replace(/\r\n/g, "\n");
        if (this.content.indexOf("<?xml") > -1) {
            return [[b, baidu.FL.HTML_XML]]
        }
        this.contentLength = this.content.length;
        if (a === 1) {
            this.tokenAnalytic();
            return this._output
        }
        return this.getTagAttributes(b)
    };
    this.tokenAnalytic = function () {
        var a;
        while (true) {
            a = this.getNextToken();
            if (a) {
                if (a[1] === baidu.FL.FL_EOF) {
                    break
                }
                this._output.push(a)
            }
        }
    };
    this.getNextToken = function () {
        if (this.parsePos >= this.contentLength) {
            return ["", baidu.FL.FL_EOF]
        }
        var a = this.content[this.parsePos];
        this.parsePos++;
        var d = this._output.length;
        var c;
        if (d) {
            var b = this._output[d - 1][1];
            if (b === baidu.FL.HTML_JS_START) {
                c = this._getScriptOrStyleContent(a, 1);
                if (c) {
                    return c
                }
            } else {
                if (b === baidu.FL.HTML_CSS_START) {
                    c = this._getScriptOrStyleContent(a, 2);
                    if (c) {
                        return c
                    }
                } else {
                    if (b === baidu.FL.HTML_TEXTAREA_START) {
                        c = this._getTextareaOrPreContent(a, 1);
                        if (c) {
                            return c
                        }
                    } else {
                        if (b === baidu.FL.HTML_PRE_START) {
                            c = this._getTextareaOrPreContent(a, 2);
                            if (c) {
                                return c
                            }
                        }
                    }
                }
            }
        }
        if (a === "\x0d") {
            return ""
        }
        if (a === "\x0a") {
            return [a, baidu.FL.FL_NEW_LINE]
        }
        if (a === "<" && this.content[this.parsePos] !== "<") {
            c = this._getTagToken(a);
            if (c) {
                return c
            }
        }
        c = this._getContentToken(a);
        if (c) {
            return c
        }
        return [a, baidu.FL.FL_NORMAL]
    };
    this._getTagToken = function (a) {
        var b = a;
        do {
            if (this.parsePos >= this.contentLength) {
                break
            }
            a = this.content[this.parsePos];
            this.parsePos++;
            if (a === '"' || a === "'") {
                if (b[1] !== "!") {
                    b += a;
                    b += this._getUnformated(a)
                }
            } else {
                b += a
            }
        } while (a !== ">");
        if (b[1] === "!") {
            if (b.indexOf("[if") > -1) {
                if (b.indexOf("!IE") > -1) {
                    b += this._getUnformated("-->", b)
                }
                return [b, baidu.FL.HTML_IE_HACK_START]
            } else {
                if (b.indexOf("[[endif") > -1) {
                    return [b, baidu.FL.HTML_IE_HACK_EDN]
                } else {
                    if (this._checkEqual(b, 2, 7, "doctype")) {
                        return [b, baidu.FL.HTML_DOC_TYPE]
                    } else {
                        if (this._checkEqual(b, 4, 6, "status")) {
                            b += this._getUnformated("-->", b);
                            return [b, baidu.FL.HTML_STATUS_OK]
                        } else {
                            b += this._getUnformated("-->", b);
                            return [b, baidu.FL.HTML_COMMENT]
                        }
                    }
                }
            }
        }
        if (this._checkEqual(b, 0, 7, "<script")) {
            return [b, baidu.FL.HTML_JS_START]
        } else {
            if (this._checkEqual(b, 0, 9, "<\/script>")) {
                return [b, baidu.FL.HTML_JS_END]
            } else {
                if (this._checkEqual(b, 0, 6, "<style")) {
                    return [b, baidu.FL.HTML_CSS_START]
                } else {
                    if (this._checkEqual(b, 0, 8, "</style>")) {
                        return [b, baidu.FL.HTML_CSS_END]
                    } else {
                        if (this._checkEqual(b, 0, 9, "<textarea")) {
                            return [b, baidu.FL.HTML_TEXTAREA_START]
                        } else {
                            if (this._checkEqual(b, 0, 11, "</textarea>")) {
                                return [b, baidu.FL.HTML_TEXTAREA_END]
                            } else {
                                if (this._checkEqual(b, 0, 4, "<pre")) {
                                    return [b, baidu.FL.HTML_PRE_START]
                                } else {
                                    if (this._checkEqual(b, 0, 6, "</pre>")) {
                                        return [b, baidu.FL.HTML_PRE_END]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this._checkEqual(b, 0, 2, "</")) {
            return [b, baidu.FL.HTML_TAG_END]
        }
        return [b, baidu.FL.HTML_TAG_START]
    };
    this._checkEqual = function (a, d, b, c) {
        return a.substr(d, b).toLowerCase() === c.toLowerCase()
    };
    this._getContentToken = function (a) {
        var b = a;
        while (true) {
            if (this.parsePos >= this.contentLength) {
                break
            }
            if (this.content[this.parsePos] === "<" && this.content[this.parsePos + 1] && this.content[this.parsePos + 1] !== "<" && this.content[this.parsePos + 1] !== ">") {
                break
            }
            b += this.content[this.parsePos];
            this.parsePos++
        }
        return [b, baidu.FL.HTML_CONTENT]
    };
    this._getUnformated = function (a, b) {
        if (b == undefined) {
            b = ""
        }
        if (b.indexOf(a) > -1) {
            return ""
        }
        var c = "";
        do {
            if (this.parsePos >= this.contentLength) {
                break
            }
            $c = this.content[this.parsePos];
            c += $c;
            this.parsePos++
        } while (c.indexOf(a) == -1);
        if (a.length === 1) {
            while (a === this.content[this.parsePos]) {
                c += this.content[this.parsePos];
                this.parsePos++
            }
        }
        return c
    };
    this._getScriptOrStyleContent = function (a, b) {
        var e = b == 1 ? "<\/script>" : "</style>";
        var d = e.length;
        if (this.content.substr(this.parsePos - 1, d).toLowerCase() === e) {
            return ""
        }
        var h = a;
        while (this.parsePos < this.contentLength) {
            if (this.content.substr(this.parsePos, d).toLowerCase() === e) {
                break
            } else {
                h += this.content[this.parsePos];
                this.parsePos++
            }
        }
        h = h.trim();
        var c = ["<!--", "/*<![CDATA[*/", "//<![CDATA["];
        var f = ["//-->", "/*]]>*/", "//]]>"];
        for (var g in c) {
            if (h.indexOf(g) === 0) {
                h = h.substr(g.length);
                break
            }
        }
        for (var g in f) {
            if (h.indexOf(g) === (h.length - g.length)) {
                h = h.substr(0, h.length - g.length);
                break
            }
        }
        return [h.trim(), b === 1 ? baidu.FL.HTML_JS_CONTENT : baidu.FL.HTML_CSS_CONTENT]
    };
    this._getTextareaOrPreContent = function (a, b) {
        var d = b == 1 ? "</textarea>" : "</pre>";
        var c = d.length;
        if (this.content.substr(this.parsePos - 1, c).toLowerCase() === d) {
            return ""
        }
        var e = a;
        while (this.parsePos < this.contentLength) {
            if (this.content.substr(this.parsePos, c).toLowerCase() === d) {
                break
            } else {
                e += this.content[this.parsePos];
                this.parsePos++
            }
        }
        return [e.trim(), b === 1 ? baidu.FL.HTML_TEXTAREA_CONTENT : baidu.FL.HTML_PRE_CONTENT]
    };
    this.getTagAttributes = function (c) {
        var c = c.trim();
        if (c.substr(0, 2) === "</") {
            return [baidu.FL.HTML_TAG_END, c.substr(2, c.length - 3).trim()]
        }
        var b = [baidu.FL.HTML_TAG_START, "", []];
        this.parsePos = 1;
        this.contentLength = c.replace(/^>\/|>\/$/g, "").length;
        var a = "";
        while (true) {
            if (this.parsePos >= this.contentLength) {
                break
            }
            $char = this.content[this.parsePos];
            this.parsePos++;
            if (!/^[a-z0-9]{1}$/g.test($char)) {
                this.parsePos--;
                break
            } else {
                a += $char
            }
        }
        b[1] = a;
        var e = $name = "";
        while (true) {
            if (this.parsePos >= this.contentLength) {
                break
            }
            $char = this.content[this.parsePos];
            this.parsePos++;
            var d;
            if ($char === '"' || $char === "'") {
                d = $char + this._getUnformated($char);
                b[2].push([$name, d])
            } else {
                if ($char === "=") {
                    $name = e;
                    e = ""
                } else {
                    if ($char === " ") {
                        if (e) {
                            if ($name) {
                                b[2].push([$name, e])
                            } else {
                                b[2].push([e, ""])
                            }
                        }
                        $name = e = ""
                    } else {
                        if ($char !== " " && $char != "\n" && $char != "\r" && $char != "\t") {
                            e += $char
                        }
                    }
                }
            }
        }
        if (e) {
            if ($name) {
                b[2].push([$name, e])
            } else {
                b[2].push([e, ""])
            }
        }
        return b
    };
    this._in_array = function (d, b) {
        for (var c = 0, a = d.length; c < a; c++) {
            if (b.trim() == d[c]) {
                return true
            }
        }
        return false
    };
    this._getTagName = function (e, a) {
        var b = /^<([^\s\/>]+)\s*\/?/g;
        var d = /^<\/([^\s]+)>/g;
        var c = (a == 0 ? b : d).exec(e);
        return c ? c[1] : ""
    };
    this.getUnclosedTags = function (f) {
        Array.prototype.remove = function (l) {
            for (var i = this.length - 1; i >= 0; i--) {
                if (l == this[i].tagName) {
                    this.splice(i, 1);
                    return true
                }
            }
            return false
        };
        var d = this.run(f);
        var a = [];
        for (var c = 0, e = d.length; c < e; c++) {
            if (d[c][1] === baidu.FL.HTML_PRE_START || d[c][1] === baidu.FL.HTML_PRE_END || d[c][1] === baidu.FL.HTML_TEXTAREA_START || d[c][1] === baidu.FL.HTML_TEXTAREA_END || d[c][1] === baidu.FL.HTML_TAG_START || d[c][1] === baidu.FL.HTML_TAG_END || d[c][1] === baidu.FL.HTML_XML) {
                a.push(d[c])
            }
        }
        var k = "";
        var j = [];
        var b = [];
        for (var c = 0, e = a.length; c < e; c++) {
            if (a[c][1] !== baidu.FL.HTML_PRE_END && a[c][1] !== baidu.FL.HTML_TEXTAREA_END && a[c][1] !== baidu.FL.HTML_TAG_END) {
                k = this._getTagName(a[c][0], 0);
                b.push({tagName: k, outerHTML: a[c][0], type: 1})
            } else {
                k = this._getTagName(a[c][0], 1);
                if (!b.remove(k)) {
                    j.push({tagName: k, outerHTML: a[c][0], type: 0})
                }
            }
        }
        var g = [], h = b.concat(j);
        for (var c = 0, e = h.length; c < e; c++) {
            if ((!this._in_array(this.singleTag, h[c].tagName.toLowerCase()) || h[c].type == 0) && !this._in_array(this.closeTagWhiteList, h[c].tagName.toLowerCase())) {
                g.push(h[c])
            }
        }
        return g
    }
};
baidu.namespace.register("baidu.doctype");
baidu.doctype = (function () {
    var e = {
        IE: "Q",
        WebKit: "Q",
        hasCommentBeforeDTD: false,
        hasConditionalCommentBeforeDTD: false,
        isUnusualDocType: false,
        hasDocType: false
    };

    function c(k, l, j) {
        if (k.toLowerCase() == "\"xmlns:xsl='http://www.w3.org/1999/xsl/transform'\"" && l == "" && j == "") {
            e.IE = "S";
            e.WebKit = "Q";
            e.isUnusualDocType = false
        }
    }

    function f(j) {
        return CONDITIONAL_COMMENT_REGEXP.test(j)
    }

    function h(j) {
        return NOT_IE_HIDDEN_CONDITIONAL_COMMENT_REGEXP.test(j)
    }

    function a(j) {
        return REVEALED_CLOSING_CONDITIONAL_COMMENT_REGEXP.test(j)
    }

    function b(j) {
        return NOT_IE_REVEALED_OPENING_CONDITIONAL_COMMENT_REGEXP.test(j)
    }

    function g(k) {
        var j = k.previousSibling;
        for (; j; j = j.previousSibling) {
            if (b(j.nodeValue)) {
                return j
            }
        }
        return null
    }

    function i() {
        var j = {hasCommentBeforeDTD: false, hasConditionalCommentBeforeDTD: false};
        var k = document.doctype;
        if (!k) {
            return j
        }
        var m = k.previousSibling;
        for (; m; m = m.previousSibling) {
            if (m.nodeType == Node.COMMENT_NODE) {
                var l = m.nodeValue;
                if (a(l)) {
                    m = g(m);
                    if (m) {
                        j.hasConditionalCommentBeforeDTD = true;
                        return j
                    }
                    continue
                }
                var n = f(l);
                if (!n) {
                    j.hasCommentBeforeDTD = true;
                    continue
                }
                if (h(l)) {
                    j.hasConditionalCommentBeforeDTD = true
                }
            }
        }
        return j
    }

    function d() {
        var l = document.doctype;
        var n = document.compatMode.toLowerCase();
        e.hasDocType = (l) ? true : false;
        e.WebKit = (n == "backcompat") ? "Q" : "S";
        e.IE = e.WebKit;
        if (!l) {
            return
        }
        var m = l ? l.name.toLowerCase() : "";
        var o = l ? l.publicId : "";
        var k = l ? l.systemId : "";
        if (m != "html") {
            e.IE = undefined;
            e.isUnusualDocType = true
        } else {
            if (o in PUBLIC_ID_WHITE_LIST) {
                if (!(k in PUBLIC_ID_WHITE_LIST[o].systemIds)) {
                    e.IE = undefined;
                    e.isUnusualDocType = true
                }
            } else {
                e.IE = undefined;
                e.isUnusualDocType = true
            }
        }
        if ((o in COMPAT_MODE_DIFF_PUBLIC_ID_MAP) && (k in COMPAT_MODE_DIFF_PUBLIC_ID_MAP[o].systemIds)) {
            e.IE = COMPAT_MODE_DIFF_PUBLIC_ID_MAP[o].systemIds[k].IE;
            e.isUnusualDocType = false
        }
        c(m, o, k);
        if (e.IE != "Q") {
            var j = i();
            if (j.hasConditionalCommentBeforeDTD) {
                e.IE = undefined;
                e.hasConditionalCommentBeforeDTD = true
            } else {
                if (j.hasCommentBeforeDTD) {
                    e.IE = "Q";
                    e.hasCommentBeforeDTD = true
                }
            }
        }
    }

    return {
        getDocMode: function () {
            d();
            return e
        }
    }
})();
baidu.namespace.register("baidu.html");
baidu.html = (function () {
    var s = "";
    var p = null;
    var a = function () {
        p = {
            HTMLBase: {HTMLDeprecatedAttribute: {}, HTMLDeprecatedTag: {}},
            documentMode: {
                hasDocType: false,
                compatMode: {IE: "Q", WebKit: "Q"},
                publicId: "",
                hasComment: false,
                hasConditionalComment: false,
                isUnusualDocType: false
            },
            DOM: {
                IECondComm: [],
                FFNotSptComm: [],
                allComm: [],
                count: 0,
                invalidInput: {count: 0, input: []},
                maxDepth: {xpath: "", depth: 1}
            },
            title: [],
            LINK: {notInHead: []},
            ID: {ids: {}, count: 0},
            tagInclude: [],
            unClosedTags: [],
            htmlMinified: true,
            imgTag: []
        }
    };
    var u = function (x) {
        return HTML_DEPRECATED_TAGS[x.toLowerCase()]
    };
    var t = function (y, x) {
        y = y.toLowerCase();
        x = x.toLowerCase();
        return (HTML_DEPRECATED_ATTRIBUTES[x] && HTML_DEPRECATED_ATTRIBUTES[x][y])
    };
    var e = function (z) {
        var y = z.tagName.toLowerCase();
        if (u(y)) {
            var x = p.HTMLBase.HTMLDeprecatedTag;
            if (!x[y]) {
                x[y] = 0
            }
            x[y]++
        }
    };
    var i = function (C) {
        var B = C.tagName.toLowerCase();
        var x = C.attributes;
        var z = p.HTMLBase.HTMLDeprecatedAttribute;
        for (var y = 0, D = x.length; y < D; ++y) {
            var A = x[y].name;
            if (t(B, A)) {
                if (!z[A]) {
                    z[A] = {}
                }
                if (!z[A][B]) {
                    z[A][B] = 0
                }
                z[A][B]++
            }
        }
    };
    var g = function (z, x) {
        var B = document.createNodeIterator(z, x, null, false);
        var y = [];
        var A = B.nextNode();
        while (A) {
            y.push(A);
            A = B.nextNode()
        }
        return y
    };
    var o = function () {
        var x = g(document.documentElement, NodeFilter.SHOW_COMMENT);
        var C = /\[\s*if\s*[^\]][\s\w]*\]/i;
        var A = /--/g;
        for (var z = 0, B = x.length; z < B; ++z) {
            var y = x[z];
            if (C.test(y.nodeValue)) {
                p.DOM.IECondComm.push(y.nodeValue)
            }
            if (A.test(y.nodeValue)) {
                p.DOM.FFNotSptComm.push(y.nodeValue)
            }
            p.DOM.allComm.push(y.nodeValue)
        }
    };
    var v = function () {
        p.documentMode = baidu.doctype.getDocMode()
    };
    var n = function (y) {
        var x = p.ID;
        for (var z in y) {
            if (y[z] > 1) {
                x.ids[z] = y[z];
                x.count++
            }
        }
    };
    var q = function (B) {
        if (B.nodeType !== 1 || !B.tagName) {
            return
        }
        if (B.id === "fe-helper-tab-box" || B.id === "fe-helper-pb-mask") {
            return
        }
        var C = p.DOM.maxDepth;
        var A = 0;
        var y, x = [];
        do {
            if (B.id === "fe-helper-tab-box" || B.id === "fe-helper-pb-mask") {
                return
            }
            if (B.tagName.toLowerCase() == "svg") {
                continue
            }
            try {
                if (B.id) {
                    y = B.tagName.toLowerCase() + '<span style="color:red;">#' + B.id + "</span>"
                } else {
                    if (B.className) {
                        y = B.tagName.toLowerCase() + '<span style="color:green;">.' + B.className.split(/\s+/).join(".") + "</span>"
                    } else {
                        y = B.tagName.toLowerCase()
                    }
                }
            } catch (z) {
                continue
            }
            A++;
            x.unshift(y)
        } while ((B = B.parentNode) && B.nodeType === 1);
        if (A > C.depth) {
            C.depth = A;
            C.xpath = x.join('<span style="color:gray;">&gt;</span>')
        }
    };
    var w = function () {
        var B = g(document.documentElement, NodeFilter.SHOW_ELEMENT);
        p.DOM.count = B.length;
        var y = {};
        for (var A = 0, x = B.length; A < x; ++A) {
            var z = B[A];
            e(z);
            i(z);
            q(z);
            if (!!z.id) {
                if (!y[z.id]) {
                    y[z.id] = 0
                }
                y[z.id]++
            }
        }
        n(y)
    };
    var m = function () {
        var y = document.querySelectorAll("link");
        var z = document.querySelectorAll("head link");
        var x = [];
        jQuery.each(y, function (B, C) {
            var A = true;
            jQuery.each(z, function (E, D) {
                if (C.href == D.href) {
                    A = false
                }
            });
            A ? x.push(C) : false
        });
        p.LINK.notInHead = x
    };
    var h = function () {
        var y = document.querySelectorAll("title");
        var z = document.querySelectorAll("head title");
        var x = false;
        var A = [];
        jQuery.each(y, function (C, B) {
            x = false;
            jQuery.each(z, function (E, D) {
                if (B == D) {
                    x = true;
                    return false
                }
            });
            A.push({dom: B, isInHead: x})
        });
        p.title = A
    };
    var j = function () {
        var y = document.querySelectorAll("img[src]");
        var z = [];
        var A = /.*src=\"(.*)\".*/;
        var x = [];
        jQuery.each(y, function (C, B) {
            x = A.exec(B.outerHTML);
            if (!x || x[1].trim() == "") {
                z.push(B)
            }
        });
        p.imgTag = z
    };
    var r = function () {
        var x = document.querySelectorAll("input[type=text],input[type=password]");
        var y = p.DOM.invalidInput;
        jQuery.each(x, function (A, z) {
            if (z.getAttribute("size")) {
                y.count++;
                y.input.push(z)
            }
        })
    };
    var d = function () {
        var y = p.tagInclude;
        var z = null;
        var x = null;
        jQuery.each(INLINE_HTML_ELEMENT, function (B, A) {
            jQuery.each(BLOCK_HTML_ELEMENT, function (C, D) {
                z = document.querySelectorAll(A + ">" + D);
                if (z.length > 0) {
                    x = getOuterHtmlEllipsis(z[0].parentNode);
                    jQuery.each(z, function (E, F) {
                        y.push({inline: x, block: getOuterHtmlEllipsis(F)})
                    })
                }
            })
        })
    };
    var b = function () {
        var y = s;
        var z = new baidu.htmlAnalytic();
        var A = z.getUnclosedTags(y);
        for (var x = 0; x < A.length; x++) {
            p.unClosedTags.push(A[x].outerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;"))
        }
    };
    var c = function () {
        var x = s.split(/\n/);
        var y = s.length / x.length;
        if (y < 150) {
            p.htmlMinified = false
        }
    };
    var l = function (x) {
        chrome.extension.sendMessage({type: MSG_TYPE.GET_HTML, link: location.href.split("#")[0]}, function (y) {
            s = y.content;
            chrome.extension.sendMessage({type: MSG_TYPE.HTML_READY});
            x && x()
        })
    };
    var k = function (x) {
        l(x)
    };
    var f = function (x) {
        a();
        w();
        h();
        m();
        j();
        v();
        o();
        r();
        d();
        b();
        c();
        if (x && typeof x == "function") {
            x.call(null, p)
        }
    };
    return {init: k, detect: f}
})();
baidu.namespace.register("baidu.js");
baidu.js = (function () {
    var y = null;
    var d = 0;
    var B = 0;
    var s = [];
    _cookies = [];
    var m = null;
    var g = function (D) {
        y = {curIndex: 0, queen: [], callback: new Function(), finished: D}
    };
    var A = function (D) {
        y.queen.push(D)
    };
    var i = function () {
        return y.queen[y.curIndex]
    };
    var o = function () {
        return (y.curIndex == y.queen.length)
    };
    var n = function () {
        y.curIndex += 1
    };
    var l = function () {
        return y.finished
    };
    var w = function (F) {
        var D = /(.*\/)([^\/]+\.js)/;
        var E = D.exec((F || "").replace(/\?.*/, ""));
        return E ? E[2] : F ? ("异步接口" + ++d) : ("script块" + ++B)
    };
    var b = function () {
        m = {
            cookies: [],
            scriptTag: {scriptBlock: 0, scriptSrc: 0},
            domain: false,
            jsMinified: {files: [], count: 0},
            tangram: [],
            duplicatedFiles: []
        }
    };
    var x = function (F, E) {
        E = E.replace(/\/\*[\S\s]*?\*\//g, "");
        var D = w(F);
        s.push({href: F ? F : "#", fileName: D, fileContent: E})
    };
    var k = function (D) {
        var E = (function () {
            var F = {src: [], block: []};
            jQuery.each(D, function (H, G) {
                if (!!G.src) {
                    F.src.push(G)
                } else {
                    if (!!G.innerHTML) {
                        F.block.push(G)
                    }
                }
            });
            return F
        })();
        return E
    };
    var C = function (D) {
        chrome.extension.sendMessage({type: MSG_TYPE.GET_JS, link: D.src}, function (E) {
            x(E.path, E.content);
            r()
        })
    };
    var e = function (D) {
        x("", D.innerHTML);
        r()
    };
    var r = function () {
        var D = i();
        if (l() || !D) {
            chrome.extension.sendMessage({type: MSG_TYPE.JS_READY});
            return
        }
        n();
        if (o()) {
            g(true)
        }
        if (!!D.block) {
            e(D.block)
        } else {
            if (!!D.src) {
                C(D.src)
            }
        }
    };
    var v = function () {
        scripts = k(document.scripts);
        if (scripts.block && scripts.block.length > 0) {
            jQuery.each(scripts.block, function (E, D) {
                A({src: null, block: D})
            })
        }
        if (scripts.src && scripts.src.length > 0) {
            jQuery.each(scripts.src, function (D, E) {
                A({src: E, block: null})
            })
        }
        r()
    };
    var h = function () {
        var D = false;
        jQuery.each(s, function (E, F) {
            z(F)
        });
        m.scriptTag = {scriptSrc: jQuery("script[src]").length, scriptBlock: jQuery("script:not(script[src])").length}
    };
    var z = function (D) {
        var F = D.fileName;
        var E = D.fileContent;
        c(D)
    };
    var t = function () {
        chrome.extension.sendMessage({type: MSG_TYPE.GET_COOKIE, url: location.href}, function (D) {
            _cookies = D.cookie
        })
    };
    var p = function () {
        m.cookies = _cookies
    };
    var c = function (F) {
        var D = F.fileContent.split(/\n/);
        var E = F.fileContent.length / D.length;
        if (E < 150 && D.length > 1) {
            m.jsMinified.count++;
            m.jsMinified.files.push({href: F.href, fileName: F.fileName})
        }
    };
    var u = function () {
        var E = document.querySelectorAll("script[src]");
        var D = [];
        jQuery.each(E, function (G, H) {
            if (!H.src) {
                return true
            }
            var F = w(H.src);
            if (F.indexOf("tangram") > -1) {
                D.push(F)
            }
        });
        m.tangram = D
    };
    var q = function () {
        scripts = k(document.scripts);
        var F = {};
        var E = [];
        var D = {};
        if (scripts.src && scripts.src.length > 0) {
            jQuery.each(scripts.src, function (G, H) {
                F[H.src] = parseInt(F[H.src] || 0, 10) + 1
            });
            jQuery.each(F, function (G, I) {
                if (I > 1) {
                    E.push({href: G, count: I})
                } else {
                    var H = "";
                    var J = [];
                    jQuery.each(s, function (L, K) {
                        if (K.href == G) {
                            H = K.fileContent.replace(/\s+/g, "");
                            return false
                        }
                    });
                    jQuery.each(s, function (L, K) {
                        if (H == K.fileContent.replace(/\s+/g, "") && !D[K.href] && J.join(",").indexOf(K.href) == -1) {
                            J.push(K.href)
                        }
                    });
                    if (J.length > 1) {
                        E.push({href: G, dupFiles: J});
                        D[G] = true
                    }
                }
            })
        }
        m.duplicatedFiles = E
    };
    var a = function () {
        h()
    };
    var j = function () {
        g(false);
        v();
        t()
    };
    var f = function (D) {
        b();
        p();
        a();
        u();
        q();
        D.call(null, m)
    };
    return {init: j, detect: f, getCookies: t}
})();
baidu.namespace.register("baidu.fcptabs");
baidu.fcptabs = (function () {
    var b = {};
    var g = function () {
        var j = jQuery("#fe-helper-box");
        var k = jQuery("#fe-helper-main-tab");
        if (j[0]) {
            j.remove()
        }
        j = jQuery('<div id="fe-helper-box" class="fe-helper-hide"></div>').appendTo("body");
        jQuery('<iframe id="fe-helper-main-ifr" src="about:blank" frameborder="0"></iframe>').appendTo(j);
        k = jQuery('<div id="fe-helper-main-tab"></div>').appendTo(j).html('		<ul id="fe-helper-main-ul">			<li id="fe-helper-closethick"><span class="ui-icon ui-icon-closethick" title="关闭面板">Close</span></li>			<li id="fe-helper-plusthick" class="fe-helper-hide"><span class="ui-icon ui-icon-plusthick" title="最大化面板">Maximun</span></li>			<li id="fe-helper-minusthick"><span class="ui-icon ui-icon-minusthick" title="最小化面板">Minimun</span></li>		</ul>		');
        j.css({height: jQuery(window).height()});
        k.tabs({
            tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
            add: function (n, p) {
                jQuery("#fe-helper-tab-" + b.type).css({height: jQuery(window).height() - 80});
                var m = "fe-helper-acc-" + b.type;
                jQuery(p.panel).append("<div id='" + m + "'>" + b.tabContent + "</div>");
                jQuery("#" + m).css({height: jQuery(window).height() - 80});
                if (b.isAccordion) {
                    jQuery("#" + m).accordion({collapsible: true, active: false});
                    var o = jQuery("#" + m + " .rst-content");
                    var l = jQuery(window).height() - 120 - o.length * 30;
                    o.css({height: l})
                }
            }
        });
        jQuery("#fe-helper-main-ul span.ui-icon-close").live("click", function () {
            var l = jQuery("#fe-helper-main-ul li");
            var m = l.index(jQuery(this).parent()) - 3;
            k.tabs("remove", m);
            if (l.length == 4) {
                b.tabBox.remove()
            }
        });
        jQuery("#fe-helper-closethick").click(function (l) {
            b.tabBox.hide("slide")
        });
        jQuery("#fe-helper-plusthick").click(function (l) {
            b.tabBox.css({height: jQuery(window).height()});
            jQuery(this).hide().next().show()
        });
        jQuery("#fe-helper-minusthick").click(function (l) {
            b.tabBox.css({height: 38});
            jQuery(this).hide().prev().show()
        });
        jQuery(window).resize(function (l) {
            b.tabBox.css({height: jQuery(window).height()})
        });
        b.tabBox = j;
        b.mainTab = k;
        return j
    };
    var f = function (k, m, l, j) {
        b.type = k;
        b.tabContent = l;
        b.isAccordion = j;
        return b.mainTab.tabs("add", "#fe-helper-tab-" + b.type, m)
    };
    var h = function (j, k) {
        return f(j + "-issue-sug", baidu.i18n.getMessage("msg0061", [j]), k, false)
    };
    var d = function (j) {
        return f("html", baidu.i18n.getMessage("msg0001"), j, true)
    };
    var i = function (j) {
        return f("js", baidu.i18n.getMessage("msg0003"), j, true)
    };
    var c = function (k, j) {
        b.cssTabContent = j;
        b.cssTabCount = b.cssTabCount || 0;
        b.cssTabCount++;
        b.cssTab = jQuery("#fe-helper-tab-css");
        if (!b.cssTab[0]) {
            f("css", baidu.i18n.getMessage("msg0002"), "", false);
            b.cssTab = jQuery("#fe-helper-tab-css").html('<ul id="fe-helper-css-ul"></ul>');
            b.cssTab.tabs({
                tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
                add: function (n, p) {
                    var m = "fe-helper-css-acc-" + b.cssTabCount;
                    jQuery(p.panel).append("<div id='" + m + "'>" + b.cssTabContent + "</div>");
                    jQuery("#" + m).accordion({collapsible: true, active: false});
                    var o = jQuery("#" + m + " .rst-content");
                    var l = jQuery(window).height() - 180 - o.length * 30;
                    o.css({height: l})
                }
            });
            jQuery("#fe-helper-css-ul span.ui-icon-close").live("click", function () {
                var l = jQuery("#fe-helper-css-ul li");
                var m = l.index(jQuery(this).parent());
                b.cssTab.tabs("remove", m)
            })
        }
        return b.cssTab.tabs("add", "#fe-helper-tab-css-" + b.cssTabCount, k)
    };
    var e = function () {
        var j = new Date();
        baidu.fcptabs.createMainTab();
        if (b.progressbar) {
            b.mask.remove()
        }
        b.mask = jQuery('<div id="fe-helper-pb-mask"><div id="f-h-p-m"></div><div id="fe-helper-progress-bar-img">正在进行页面检测，请稍后...</div><div id="fe-helper-progress-bar"></div></div>').appendTo("body");
        jQuery("#f-h-p-m").css({height: jQuery(window).height(), width: jQuery(window).width()});
        var k = chrome.extension.getURL("static/img/pbar-ani.gif");
        jQuery("#fe-helper-progress-bar-img").css({background: "url(" + k + ") repeat-x"});
        b.progressbar = jQuery("#fe-helper-progress-bar").progressbar({
            value: 0, complete: function (l, m) {
                var n = jQuery("#fe-helper-progress-bar-img").html("页面检测完成，共计耗时：" + (new Date() - j) / 1000 + " s");
                b.tabBox.show("slide", {}, 500);
                jQuery("#f-h-p-m").fadeOut(500);
                n.fadeOut(3000)
            }
        });
        jQuery("#fe-helper-progress-bar-img").css({
            top: jQuery(window).height() / 2 - 40,
            left: (jQuery(window).width() - 800) / 2
        })
    };
    var a = function (j) {
        b.progressbar.progressbar("value", j)
    };
    return {
        createMainTab: g,
        addHtmlTab: d,
        addJavascriptTab: i,
        addCssTab: c,
        addIssueSuggestionTab: h,
        createProgressBar: e,
        updateProgressBar: a
    }
})();
baidu.namespace.register("baidu.fcphelper");
baidu.fcphelper = (function () {
    var e = function (u) {
        return '			<h3 class="rst-title">				<a href="#">' + u.title + '：					<span class="rst-count">' + u.count + '</span>				</a>			</h3>			<div class="rst-content">' + u.content + "</div>			"
    };
    var t = function (u, B, w) {
        var z = [];
        var A = 0;
        z.push("<table>");
        z.push('<thead><tr><td>序号（Num）</td><td class="td-content-title">&nbsp;</td><td class="td-content-content">描述（Description）</td></tr></thead><tbody>');
        var v = function (E, D) {
            var C = A % 2 == 0 ? "tr-content-even" : "";
            z.push('<tr class="' + C + '"><th class="td-linenum" rowspan="2">' + (++A) + '</th><td class="td-content-title"><span class="-x-issue">问题</span></td><td class="td-content-content -c-x-issue">' + E + "</td></tr>");
            z.push('<tr class="' + C + '"><td class="td-content-title"><span class="-x-suggestion">建议</span></td><td class="td-content-content">' + D + "</td></tr>")
        };
        var y;
        for (var x = B; x <= w; x++) {
            y = ("0000" + x);
            y = u + "_" + y.substr(y.length - 4);
            v(baidu.i18n.getMessage(y), baidu.i18n.getMessage(y + "_suggestion"))
        }
        z.push("</tbody></table>");
        return z.join("")
    };
    var q = function (v, z, u) {
        var w = [];
        var x = 0;
        w.push("<div>" + baidu.i18n.getMessage("msg0042", [document.cookie.getBytes()]) + "。如下是和整个站点相关的cookie：</div><br />");
        w.push("<table>");
        w.push('<thead><tr><td>序号</td><td class="td-cookie-name">名称（name）</td><td class="td-cookie-value">值（value）</td><td class="td-cookie-domain">所在域（domain）</td><td class="td-cookie-expires">过期时间（expires）</td><td class="td-cookie-op">操作</td></tr></thead><tbody>');
        var y = new Date() - 1;
        jQuery.each(v.cookies, function (B, A) {
            x++;
            w.push('<tr><td class="td-cookie-linenum">' + (B + 1) + '</td><td class="td-cookie-name">' + A.name + '</td><td class="td-cookie-value" id="td-cookie-value-"' + A.name + ">" + A.value + '</td><td class="td-cookie-domain">' + A.domain + '</td><td class="td-cookie-expires">' + (A.expirationDate ? new Date(A.expirationDate * 1000).format("yyyy年MM月dd日 HH时mm分ss秒") : "-") + '</td><td class="td-cookie-op"><button class="fe-a-cookie-delete -f-a-c-d-' + y + ' ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">删除</span></button><input type="hidden" id="hid-url-' + A.name + '" value="' + A.url + '" /><input type="hidden" id="hid-domain-' + A.name + '" value="' + A.domain + '" /><input type="hidden" id="hid-storeId-' + A.name + '" value="' + A.storeId + '" /><input type="hidden" id="hid-expires-' + A.name + '" value="' + (A.expirationDate ? A.expirationDate : "") + '" /></td></tr>')
        });
        w.push("</tbody></table>");
        u.push(e({title: z, count: x, content: w.join("")}));
        jQuery("#fe-helper-box .-f-a-c-d-" + y).live("click", function (E) {
            var D = jQuery(this);
            var C = D.parent().parent();
            var B = C.children(".td-cookie-name").html().trim();
            var A = jQuery("#hid-storeId-" + B).val().trim();
            chrome.extension.sendMessage({
                type: MSG_TYPE.REMOVE_COOKIE,
                name: B,
                url: jQuery("#hid-url-" + B).val().trim(),
                storeId: A
            }, function (I) {
                var H = D.parent().parent().parent();
                var G = H.index(C) - 1;
                var F = 0;
                C.remove();
                H.find("td.td-cookie-linenum").each(function (J, K) {
                    jQuery(K).html((J + 1));
                    F++
                });
                H.parent().parent().prev().find(".rst-count").html(F)
            })
        })
    };
    var j = function (x, z, w) {
        var A = [];
        var B = 0;
        A.push("<table>");
        A.push('<thead><tr><td>序号（Num）</td><td class="td-content">描述（Description）</td></tr></thead><tbody>');
        var u = function (E) {
            A.push('<tr><th class="td-linenum">' + ++B + '</th><td class="td-content">' + E + "</td></tr>")
        };
        if (x.scriptTag.scriptBlock) {
            u(baidu.i18n.getMessage("msg0033", [x.scriptTag.scriptBlock]))
        }
        if (x.scriptTag.scriptSrc) {
            u(baidu.i18n.getMessage("msg0034", [x.scriptTag.scriptSrc]))
        }
        if (x.jsMinified.count > 0) {
            var D = [];
            jQuery.each(x.jsMinified.files, function (E, F) {
                if (F.href == "#") {
                    D.push(baidu.i18n.getMessage("msg0047", [F.fileName]))
                } else {
                    D.push(baidu.i18n.getMessage("msg0062", [F.href, F.fileName]))
                }
            });
            u(baidu.i18n.getMessage("msg0045", [D.join("、")]))
        }
        if (x.tangram.length > 0) {
            var D = [];
            jQuery.each(x.tangram, function (E, F) {
                D.push(F)
            });
            if (D.length == 1) {
                u(baidu.i18n.getMessage("msg0054", [D.join("")]))
            } else {
                u(baidu.i18n.getMessage("msg0055", [D.join("、")]))
            }
        }
        if (x.duplicatedFiles.length) {
            var C = [];
            var y = [];
            var v = [];
            jQuery.each(x.duplicatedFiles, function (F, G) {
                if (G.dupFiles) {
                    var E = [];
                    jQuery.each(G.dupFiles, function (H, I) {
                        E.push(baidu.i18n.getMessage("msg0069", [I, I]))
                    });
                    C.push(baidu.i18n.getMessage("msg0070", [E.join("、")]))
                } else {
                    y.push(baidu.i18n.getMessage("msg0068", [G.href, G.href, G.count]))
                }
            });
            if (y.length) {
                v.push(baidu.i18n.getMessage("msg0066", ['<div style="margin-left:30px;">' + y.join("") + "</div>"]))
            }
            if (C.length) {
                v.push(baidu.i18n.getMessage("msg0067", ['<div style="margin-left:30px;">' + C.join("") + "</div>"]))
            }
            u(v.join(""))
        }
        A.push("</tbody></table>");
        w.push(e({title: z, count: B, content: A.join("")}))
    };
    var i = function (w, A, v) {
        var z = true;
        for (var u in w.HTMLBase.HTMLDeprecatedTag) {
            z = false;
            break
        }
        if (z) {
            return
        }
        var x = [];
        var y = 0;
        x.push("<table>");
        x.push('<thead><tr><td>标签（Tag）</td><td class="td-content">描述（Description）</td></tr></thead><tbody>');
        jQuery.each(w.HTMLBase.HTMLDeprecatedTag, function (B, C) {
            y++;
            x.push('<tr><th class="td-linenum">' + B + '</th><td class="td-content">' + baidu.i18n.getMessage("msg0004", [C]) + baidu.i18n.getMessage("msg0005") + "</td></tr>")
        });
        x.push("</tbody></table>");
        v.push(e({title: A, count: y, content: x.join("")}))
    };
    var h = function (w, A, v) {
        var z = true;
        for (var u in w.HTMLBase.HTMLDeprecatedAttribute) {
            z = false;
            break
        }
        if (z) {
            return
        }
        var x = [];
        var y = 0;
        x.push("<table>");
        x.push('<thead><tr><td>属性（Attr）</td><td class="td-content">描述（Description）</td></tr></thead><tbody>');
        jQuery.each(w.HTMLBase.HTMLDeprecatedAttribute, function (B, C) {
            y++;
            x.push('<tr><th class="td-linenum">' + B + '</th><td class="td-content"><span class="x-detail">' + (function () {
                    var D = [];
                    jQuery.each(C, function (F, E) {
                        D.push(baidu.i18n.getMessage("msg0007", [E, F]))
                    });
                    return D.join("")
                })() + baidu.i18n.getMessage("msg0005") + "</span></td></tr>")
        });
        x.push("</tbody></table>");
        v.push(e({title: A, count: y, content: x.join("")}))
    };
    var f = function (v, y, u) {
        var x = v.LINK.notInHead;
        if (x.length == 0) {
            return
        }
        var w = "";
        w = "<div>" + baidu.i18n.getMessage("msg0021", [x.length, "head"]) + "</div>";
        w += (function (A) {
            var z = ["<table>"];
            z.push('<thead><tr><td>序号（Num）</td><td class="td-content">描述（Description）</td></tr></thead><tbody>');
            if (x.length) {
                jQuery.each(A, function (B, C) {
                    z.push('<tr>						<th class="td-linenum">' + (B + 1) + '</th>						<td class="td-content">' + C.outerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</td>					</tr>")
                })
            }
            z.push("</tbody></table>");
            return z.join("")
        })(x);
        u.push(e({title: y, count: x.length, content: w}))
    };
    var l = function (v, x, u) {
        if (v.tagInclude.length == 0) {
            return
        }
        var w = "";
        w += (function (z) {
            var y = ["<table>"];
            y.push('<thead><tr><td>序号（Num）</td><td class="td-content">描述（Description）</td></tr></thead><tbody>');
            if (v.tagInclude.length > 0) {
                jQuery.each(z, function (B, A) {
                    y.push('<tr>						<th class="td-linenum">' + (B + 1) + '</th>						<td class="td-content">' + baidu.i18n.getMessage("msg0035", [A.inline, A.block]) + "</td>					</tr>")
                })
            }
            y.push("</tbody></table>");
            return y.join("")
        })(v.tagInclude);
        u.push(e({title: x, count: v.tagInclude.length, content: w}))
    };
    var p = function (v) {
        var w = [];
        var y = "<strong>混杂模式</strong>";
        var x = "<em>标准模式</em>";
        var z = (v.documentMode.WebKit == "S") ? x : y;
        if (v.documentMode.hasDocType) {
            w.push(baidu.i18n.getMessage("msg0009"));
            if (v.documentMode.isUnusualDocType) {
                w.push(baidu.i18n.getMessage("msg0010", [z, y]))
            }
            if (v.documentMode.hasConditionalCommentBeforeDTD || v.documentMode.hasCommentBeforeDTD) {
                w.push(baidu.i18n.getMessage("msg0011", [z, y]))
            }
            if (v.documentMode.IE == v.documentMode.WebKit) {
                w.push(baidu.i18n.getMessage("msg0012", [z]));
                if (v.documentMode.WebKit == "Q") {
                    w.push(baidu.i18n.getMessage("msg0013"))
                }
            } else {
                if (!v.documentMode.isUnusualDocType) {
                    if (v.documentMode.IE) {
                        var u = (v.documentMode.IE == "Q") ? y : x;
                        var A = (v.documentMode.WebKit == "Q") ? y : x;
                        w.push(baidu.i18n.getMessage("msg0014", [u, A]));
                        w.push(baidu.i18n.getMessage("msg0013"))
                    } else {
                        w.push(baidu.i18n.getMessage("msg0015"))
                    }
                } else {
                    w.push(baidu.i18n.getMessage("msg0013"))
                }
            }
        } else {
            w.push(baidu.i18n.getMessage("msg0016", [z]));
            w.push(baidu.i18n.getMessage("msg0013"))
        }
        return w.join("")
    };
    var r = function (w, B, v) {
        var z = [];
        var A = 0;
        z.push("<table>");
        z.push('<thead><tr><td>序号（Num）</td><td class="td-content">描述（Description）</td></tr></thead><tbody>');
        var u = function (C) {
            z.push('<tr><th class="td-linenum">' + (++A) + '</th><td class="td-content">' + C + "</td></tr>")
        };
        u(p(w));
        u(baidu.i18n.getMessage("msg0028", [w.DOM.count]));
        u(baidu.i18n.getMessage("msg0063", [w.DOM.maxDepth.depth, w.DOM.maxDepth.xpath]));
        if (w.title.length == 0) {
            u(baidu.i18n.getMessage("msg0049") + baidu.i18n.getMessage("msg0052"))
        } else {
            if (w.title.length > 1) {
                u(baidu.i18n.getMessage("msg0051") + baidu.i18n.getMessage("msg0052"))
            } else {
                if (!w.title[0].isInHead) {
                    u(baidu.i18n.getMessage("msg0050") + baidu.i18n.getMessage("msg0052"))
                }
            }
        }
        if (w.imgTag.length > 0) {
            var y = "";
            jQuery.each(w.imgTag, function (D, C) {
                y = "";
                y += C.id ? "#" + C.id : "";
                y += y.className ? "." + y.className.replace(/\s+/g, ".") : "";
                y = y ? y : C.outerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                u(baidu.i18n.getMessage("msg0053", [y]))
            })
        }
        if (w.DOM.allComm.length) {
            if (w.DOM.IECondComm.length) {
                u(baidu.i18n.getMessage("msg0018", [w.DOM.IECondComm.length]))
            }
            if (w.DOM.FFNotSptComm.length) {
                u(baidu.i18n.getMessage("msg0060", [w.DOM.FFNotSptComm.length]))
            }
            u(baidu.i18n.getMessage("msg0030", [w.DOM.allComm.length, w.DOM.allComm.join("").getBytes()]) + baidu.i18n.getMessage("msg0019"))
        }
        if (w.ID.count) {
            var x = [];
            jQuery.each(w.ID.ids, function (D, C) {
                x.push(baidu.i18n.getMessage("msg0064", [D, C]))
            });
            u(baidu.i18n.getMessage("msg0026", [w.ID.count, x.join("，")]))
        }
        if (w.DOM.invalidInput.count) {
            u(baidu.i18n.getMessage("msg0029", [w.DOM.invalidInput.count]))
        }
        if (!w.htmlMinified) {
            u(baidu.i18n.getMessage("msg0043"))
        }
        if (w.unClosedTags.length > 0) {
            var y = [];
            jQuery.each(w.unClosedTags, function (C, D) {
                y.push(baidu.i18n.getMessage("msg0046", [D]))
            });
            u(baidu.i18n.getMessage("msg0038", [y.join("、")]))
        }
        z.push("</tbody></table>");
        v.push(e({title: B, count: A, content: z.join("")}))
    };
    var k = function (v) {
        var w = [baidu.i18n.getMessage("msg0039"), baidu.i18n.getMessage("msg0040"), baidu.i18n.getMessage("msg0041")];
        var u = function (y) {
            var x = ["<table>"];
            x.push('<thead><tr><td>序号（Num）</td><td class="td-content">选择器（CSS Selector）</td></tr></thead><tbody>');
            jQuery.each(y, function (z, A) {
                x.push('<tr><th class="td-linenum">' + (z + 1) + '</th><td class="td-content"><span class="x-selector">' + A.selector + '</span><span class="x-css-text">' + A.cssText + "</span></td></tr>")
            });
            x.push("</tbody></table>");
            return x.join("")
        };
        jQuery.each(v.styles, function (y, z) {
            var x = [];
            jQuery.each(z.content, function (B, A) {
                x.push(e({title: w[B], count: A.count, content: u(A.content)}))
            });
            baidu.fcptabs.addCssTab(z.path, x.join(""))
        })
    };
    var c = function (x, w) {
        var y = [];
        var B = 0;
        var z = 0;
        y.push("<table>");
        y.push('<thead><tr><td>序号（Num）</td><td class="td-content">描述（Description）</td></tr></thead><tbody>');
        var v = function (C) {
            y.push('<tr><th class="td-linenum">' + (++B) + '</th><td class="td-content">' + C + "</td></tr>")
        };
        if (x.backgroundImages.length) {
            var u = [];
            var A = new Date() - 1;
            jQuery.each(x.backgroundImages, function (C, D) {
                u = ['<div class="table-css-bg -t-c-b-' + A + '" style="display:none;">'];
                jQuery.each(D.bgImages, function (F, E) {
                    u.push("<div>" + E + "</div>")
                });
                u.push("</div>");
                v(baidu.i18n.getMessage("msg0057", [D.fileName, D.bgImages.length, A]) + u.join(""));
                z += D.bgImages.length
            });
            jQuery("#fe-helper-box .-x-expand-" + A).live("click", function () {
                var D = jQuery(this);
                var C = D.parent().next();
                if (C.css("display") == "none") {
                    C.slideDown(300);
                    D.html("收起")
                } else {
                    C.slideUp(300);
                    D.html("展开")
                }
            });
            jQuery("#fe-helper-box .-t-c-b-" + A + " div").live("mouseover", function (C) {
                var D = jQuery("#fe-img-tootip");
                if (!D[0]) {
                    D = jQuery('<img id="fe-img-tootip" src="' + jQuery(this).html().trim() + '" alt="load image failed" />').appendTo("body")
                } else {
                    D.attr("src", jQuery(this).html().trim())
                }
                D.css({top: C.pageY + 20, left: C.pageX + 20, "max-width": 500, "max-height": 500}).show()
            }).live("mouseout", function (C) {
                var D = jQuery("#fe-img-tootip");
                D.hide()
            })
        }
        y.push("</tbody></table>");
        w.push(e({title: baidu.i18n.getMessage("msg0065"), count: z, content: y.join("")}))
    };
    var m = function (x) {
        var A = [];
        var B = 0;
        var w = [];
        A.push("<table>");
        A.push('<thead><tr><td>序号（Num）</td><td class="td-content">描述（Description）</td></tr></thead><tbody>');
        var u = function (E) {
            A.push('<tr><th class="td-linenum">' + (++B) + '</th><td class="td-content">' + E + "</td></tr>")
        };
        if (x.duplicatedFiles.length) {
            var C = [];
            var y = [];
            var v = [];
            jQuery.each(x.duplicatedFiles, function (F, G) {
                if (G.dupFiles) {
                    var E = [];
                    jQuery.each(G.dupFiles, function (H, I) {
                        E.push(baidu.i18n.getMessage("msg0069", [I, I]))
                    });
                    C.push(baidu.i18n.getMessage("msg0070", [E.join("、")]))
                } else {
                    y.push(baidu.i18n.getMessage("msg0068", [G.href, G.href, G.count]))
                }
            });
            if (y.length) {
                v.push(baidu.i18n.getMessage("msg0066", ['<div style="margin-left:30px;">' + y.join("") + "</div>"]))
            }
            if (C.length) {
                v.push(baidu.i18n.getMessage("msg0067", ['<div style="margin-left:30px;">' + C.join("") + "</div>"]))
            }
            u(v.join(""))
        }
        if (x.cssMinified.count > 0) {
            var D = [];
            jQuery.each(x.cssMinified.files, function (E, F) {
                if (F.href == "#") {
                    D.push(baidu.i18n.getMessage("msg0047", [F.fileName]))
                } else {
                    D.push(baidu.i18n.getMessage("msg0062", [F.href, F.fileName]))
                }
            });
            u(baidu.i18n.getMessage("msg0044", [D.join("、")]))
        }
        if (x.expressions.length) {
            var z = [], D = 0;
            jQuery.each(x.expressions, function (E, F) {
                z.push(baidu.i18n.getMessage("msg0059", [F.fileName, F.count]));
                D += F.count
            });
            u(baidu.i18n.getMessage("msg0058", [D, z.join("、")]))
        }
        A.push("</tbody></table>");
        w.push(e({title: baidu.i18n.getMessage("msg0048"), count: B, content: A.join("")}));
        c(x, w);
        baidu.fcptabs.addCssTab(baidu.i18n.getMessage("msg0048"), w.join(""))
    };
    var o = function () {
        baidu.html.detect(function (u) {
            var v = [];
            i(u, baidu.i18n.getMessage("msg0006"), v);
            h(u, baidu.i18n.getMessage("msg0008"), v);
            f(u, baidu.i18n.getMessage("msg0022"), v);
            l(u, baidu.i18n.getMessage("msg0036"), v);
            r(u, baidu.i18n.getMessage("msg0020"), v);
            baidu.fcptabs.addHtmlTab(v.join(""))
        })
    };
    var b = function () {
        baidu.css.detect(function (u) {
            k(u);
            m(u)
        })
    };
    var s = function () {
        baidu.js.detect(function (v) {
            var u = [];
            q(v, baidu.i18n.getMessage("msg0031"), u);
            j(v, baidu.i18n.getMessage("msg0032"), u);
            baidu.fcptabs.addJavascriptTab(u.join(""))
        })
    };
    var a = function () {
        var u = function (v) {
            return '<a class="-f-h-get-more-" href="#" onclick="return false;">' + v + "&gt;&gt;</a>"
        };
        jQuery(u("查看更多HTML帮助")).appendTo("#fe-helper-tab-html").click(function (x) {
            if (!jQuery("#fe-helper-tab-HTML-issue-sug")[0]) {
                baidu.fcptabs.addIssueSuggestionTab("HTML", t("html", 1, 42))
            }
            var v = jQuery("#fe-helper-main-tab>div");
            var w = v.index(jQuery("#fe-helper-tab-HTML-issue-sug"));
            jQuery("#fe-helper-main-tab").tabs("select", w)
        });
        jQuery(u("查看更多CSS帮助")).appendTo("#fe-helper-tab-css").click(function (x) {
            if (!jQuery("#fe-helper-tab-CSS-issue-sug")[0]) {
                baidu.fcptabs.addIssueSuggestionTab("CSS", t("css", 1, 119))
            }
            var v = jQuery("#fe-helper-main-tab>div");
            var w = v.index(jQuery("#fe-helper-tab-CSS-issue-sug"));
            jQuery("#fe-helper-main-tab").tabs("select", w)
        });
        jQuery(u("查看更多Javascript帮助")).appendTo("#fe-helper-tab-js").click(function (x) {
            if (!jQuery("#fe-helper-tab-Javascript-issue-sug")[0]) {
                baidu.fcptabs.addIssueSuggestionTab("Javascript", t("javascript", 1, 114))
            }
            var v = jQuery("#fe-helper-main-tab>div");
            var w = v.index(jQuery("#fe-helper-tab-Javascript-issue-sug"));
            jQuery("#fe-helper-main-tab").tabs("select", w)
        })
    };
    var d = function () {
        baidu.css.init();
        baidu.js.init()
    };
    var n = function (u) {
        baidu.html.init(u)
    };
    var g = function () {
        baidu.fcptabs.createProgressBar();
        window.setTimeout(function () {
            o();
            b();
            s();
            a();
            baidu.fcptabs.updateProgressBar(100)
        }, 100)
    };
    return {initStaticFile: d, initHtml: n, detect: g}
})();
baidu.namespace.register("baidu.fehelper");
baidu.fehelper = (function () {
    var b = function () {
        if (!jQuery("#_fehelper_jq_ui_css_")[0]) {
            var e = chrome.extension.getURL("static/vendor/jquery-ui-1.8/jquery-ui.hot.css");
            jQuery('<link id="_fehelper_jq_ui_css_" href="' + e + '" rel="stylesheet" type="text/css" />').appendTo("head");
            var d = chrome.extension.getURL("static/css/fe-helper.css");
            jQuery('<link id="_fehelper_fcp_css_" href="' + d + '" rel="stylesheet" type="text/css" />').appendTo("head")
        }
    };
    var a = function () {
        chrome.extension.onMessage.addListener(function (e, d, f) {
            if (e.type == MSG_TYPE.BROWSER_CLICKED && e.event == MSG_TYPE.FCP_HELPER_INIT) {
                baidu.fcphelper.initStaticFile()
            }
            if (e.type == MSG_TYPE.BROWSER_CLICKED && e.event == MSG_TYPE.FCP_HELPER_DETECT) {
                b();
                baidu.fcphelper.initHtml(function () {
                    baidu.fcphelper.detect()
                })
            }
        })
    };
    var c = function () {
        a()
    };
    return {main: c}
})();
baidu.fehelper.main();
baidu.calcPageLoadTime = (function () {
    var c = {};
    var d = function () {
        if (c.header && c.time && c.pageInfo) {
            b()
        } else {
            $.ajax({
                type: "GET", url: window.location.href, complete: function (i, h) {
                    c.header = {
                        date: i.getResponseHeader("Date"),
                        connection: i.getResponseHeader("Connection"),
                        contentEncoding: i.getResponseHeader("Content-Encoding"),
                        contentLength: i.getResponseHeader("Content-Length"),
                        server: i.getResponseHeader("Server"),
                        vary: i.getResponseHeader("Vary"),
                        transferEncoding: i.getResponseHeader("Transfer-Encoding"),
                        contentType: i.getResponseHeader("Content-Type"),
                        cacheControl: i.getResponseHeader("Cache-Control"),
                        exprires: i.getResponseHeader("Exprires"),
                        lastModified: i.getResponseHeader("Last-Modified")
                    };
                    a();
                    g();
                    b()
                }
            })
        }
    };
    var a = function () {
        c.pageInfo = {title: document.title, url: location.href}
    };
    var g = function () {
        c.time = performance.timing
    };
    var b = function () {
        chrome.extension.sendMessage({type: MSG_TYPE.CALC_PAGE_LOAD_TIME, wpo: c})
    };
    var f = function () {
        if (/^((http)|(https))\:\/\//.test(location.href)) {
            d()
        } else {
            a();
            g();
            b()
        }
    };
    var e = function () {
        chrome.runtime.onMessage.addListener(function (j, i, k) {
            if (j.type == MSG_TYPE.GET_PAGE_WPO_INFO) {
                (function h() {
                    (document.readyState == "complete") ? f() : setTimeout(h, 1000)
                })()
            }
        })
    };
    return {init: e}
})();
baidu.calcPageLoadTime.init();
var FeHelper = window.FeHelper || {};
FeHelper.elemTool = {
    elm: function (b, c, h, f) {
        var g = document.createElement(b), e, a;
        if (c) {
            if (c.event || c.events) {
                var d = c.event || c.events;
                if (typeof(d[0]) == "string") {
                    g.addEventListener(d[0], d[1], d[2])
                } else {
                    if (d.length) {
                        for (e = 0, a = d.length; e < a; e++) {
                            g.addEventListener(d[e][0], d[e][1], d[e][2])
                        }
                    }
                }
            }
        }
        for (e in c) {
            if (e.substring(0, 5) == "event") {
            } else {
                if (e == "checked" || e == "selected") {
                    if (c[e]) {
                        g.setAttribute(e, e)
                    }
                } else {
                    g.setAttribute(e, c[e])
                }
            }
        }
        if (h) {
            for (e = 0, a = h.length; e < a; e++) {
                if (h[e]) {
                    g.appendChild(h[e])
                }
            }
        }
        if (f) {
            this.insertNode(g, f)
        }
        return g
    }, txt: function (a) {
        return document.createTextNode(a)
    }, ent: function (a) {
        return document.createTextNode(this.unescapeHtml(a))
    }, paragraphs: function (e) {
        var d = e.split("\n");
        var b = [];
        for (var c = 0, a = d.length; c < a; c++) {
            b.push(elemTool.elm("p", {}, [elemTool.ent(d[c])]))
        }
        return b
    }, insertNode: function (b, a, c) {
        if (!a) {
            a = document.body
        }
        if (c && c.parentNode == a) {
            a.insertBefore(b, c)
        } else {
            a.appendChild(b)
        }
    }, insertNodes: function (c, a, e) {
        if (typeof(c) != "array") {
            this.insertNode(c, a, e)
        } else {
            for (var d = 0, b = c.length; d < b; d++) {
                this.insertNode(c[d], a, e, true)
            }
        }
    }, empty: function (a) {
        while (a.lastChild) {
            a.removeChild(a.lastChild)
        }
    }, unescapeHtml: function (c) {
        if (c.length < 1) {
            return c
        }
        var b = document.createElement("div");
        c = c.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, "");
        b.innerHTML = c;
        var a = b.childNodes[0].nodeValue;
        this.empty(b);
        return a
    }
};
var FeHelper = window.FeHelper || {};
FeHelper.ColorPicker = (function () {
    if (!(document.documentElement instanceof HTMLElement)) {
        return
    }
    var b = "fehelper-colorpicker-box", ai = "fehelper-colorpicker-result";
    var G = 0;

    function A(c) {
        return document.getElementById(c)
    }

    var aa = false, ah = false, T = "F00BAF", s = "", m = null;
    var p = null;
    var W = 0, V = 0, Z = false, N = false, g = false, ab = "1px solid #666", M = "";
    var v = false, o = 0, J = 0, I = 0;
    var Y = document.createElement("canvas");
    var E = Y.getContext("2d"), K = 1, ag = 1;

    function ad(n, c, aj) {
        return h(u(n) + u(c) + u(aj))
    }

    function h(c) {
        return g ? c.toLowerCase() : c
    }

    function u(c) {
        if (c == null) {
            return "00"
        }
        c = parseInt(c);
        if (c == 0 || isNaN(c)) {
            return "00"
        }
        c = Math.max(0, c);
        c = Math.min(c, 255);
        c = Math.round(c);
        return "0123456789ABCDEF".charAt((c - c % 16) / 16) + "0123456789ABCDEF".charAt(c % 16)
    }

    function H(c, al, an) {
        c /= 255, al /= 255, an /= 255;
        var ao = Math.max(c, al, an), aj = Math.min(c, al, an);
        var ak, ap, n = (ao + aj) / 2;
        if (ao == aj) {
            ak = ap = 0
        } else {
            var am = ao - aj;
            ap = n > 0.5 ? am / (2 - ao - aj) : am / (ao + aj);
            switch (ao) {
                case c:
                    ak = (al - an) / am + (al < an ? 6 : 0);
                    break;
                case al:
                    ak = (an - c) / am + 2;
                    break;
                case an:
                    ak = (c - al) / am + 4;
                    break
            }
            ak /= 6
        }
        return {h: Math.round(ak * 360), s: Math.round(ap * 100), v: Math.round(n * 100)}
    }

    function i(c) {
        while (c.lastChild) {
            c.removeChild(c.lastChild)
        }
    }

    function D() {
        ah.style.height = "auto";
        ah.style.width = (innerWidth) + "px";
        K = ah.naturalWidth / innerWidth;
        ag = ah.naturalHeight / innerHeight;
        Y.width = ah.naturalWidth;
        Y.height = ah.naturalHeight;
        E.drawImage(ah, 0, 0);
        setTimeout(function () {
            L = false;
            ah.style.visibility = "visible";
            aa.style.visibility = "visible";
            document.body.style.cursor = "url(" + chrome.extension.getURL("static/img/crosshair.png") + ") 16 16,crosshair";
            e()
        }, 255)
    }

    function l(n, ak, c) {
        if (N) {
            return
        }
        var aj = 75, al = 32;
        aj = 150;
        T = ak ? ak : T;
        if (!A("fehelper-colorpicker-cpimprev") || (m && !A("cprgbvl"))) {
            i(aa);
            FeHelper.elemTool.elm("div", {}, [FeHelper.elemTool.elm("img", {
                id: "fehelper-colorpicker-cpimprev",
                height: aj,
                width: aj,
                src: n,
                style: "margin:0px;padding:0px;margin:0px;"
            }), FeHelper.elemTool.elm("br"), FeHelper.elemTool.elm("input", {
                type: "text",
                size: 7,
                style: "width:60px;height:20px;line-height:20px;font-size:10pt;border:" + ab,
                id: "fehelper-colorpicker-cphexvl",
                value: "#" + T,
                event: ["mouseover", C]
            })], aa);
            P()
        } else {
            A("fehelper-colorpicker-cpimprev").src = n;
            A("fehelper-colorpicker-cpimprev").width = aj;
            A("fehelper-colorpicker-cpimprev").height = aj;
            A("fehelper-colorpicker-cphexvl").value = T;
            aa.style.backgroundColor = "#" + T
        }
    }

    function z(c) {
        if (!aa) {
            return
        }
        T = c.hex ? c.hex : T;
        aa.style.backgroundColor = "#" + T;
        if (N) {
            F()
        }
    }

    function C(c) {
        c.target.select()
    }

    function F() {
        i(aa);
        FeHelper.elemTool.elm("div", {}, [FeHelper.elemTool.elm("input", {
            type: "text",
            size: 7,
            style: "width:80px;height:20px;line-height:20px;font-size:10pt;border:" + ab,
            id: "fehelper-colorpicker-cphexvl",
            value: "#" + T,
            event: ["mouseover", C]
        }), FeHelper.elemTool.elm("img", {
            style: "width:20px;height:20px;position:absolute;top:-10px;right:-10px;cursor:pointer;",
            src: chrome.extension.getURL("static/img/close.png"),
            alt: "Close",
            title: "[esc]键可直接关闭",
            id: "fehelper-colorpicker-exitbtn",
            event: ["click", B, true]
        })], aa);
        if (A("fehelper-colorpicker-cphexvl")) {
            A("fehelper-colorpicker-cphexvl").select()
        }
        P()
    }

    function y() {
        if (N) {
            s = T;
            N = false;
            i(aa)
        } else {
            N = true;
            F()
        }
    }

    function B() {
        var c = setTimeout(af, 500);
        chrome.runtime.sendMessage({disableColorPicker: true}, function (n) {
            clearTimeout(c)
        })
    }

    function af() {
        Z = false, N = false;
        document.removeEventListener("mousemove", S);
        removeEventListener("scroll", j);
        removeEventListener("resize", j);
        removeEventListener("keyup", f);
        U();
        clearTimeout(R)
    }

    function U() {
        if (document.body) {
            ah = A(b), aa = A(ai);
            if (ah) {
                document.body.removeChild(ah)
            }
            if (aa) {
                document.body.removeChild(aa)
            }
            ah = false, aa = false;
            document.body.style.cursor = ""
        }
    }

    function f(c) {
        if (!Z) {
            return
        }
        if (c.keyCode == 27) {
            B()
        } else {
            if (c.keyCode == 82 || c.keyCode == 74) {
                j()
            } else {
                if (c.keyCode == 13) {
                    y()
                }
            }
        }
    }

    function S(c) {
        if (!Z) {
            return
        }
        if (!N) {
            J = (c.pageX - pageXOffset), I = (c.pageY - pageYOffset);
            W = Math.round(J * K), V = Math.round(I * ag);
            e()
        }
    }

    function j(c) {
        if (!Z) {
            return
        }
        aa.style.visibility = "hidden";
        ah.style.visibility = "hidden";
        clearTimeout(R);
        R = setTimeout(function () {
            k()
        }, 250)
    }

    function d() {
        U();
        ah = FeHelper.elemTool.elm("img", {
            id: b,
            src: M,
            style: "position:fixed;max-width:none!important;max-height:none!important;top:0px;left:0px;margin:0px;padding:0px;overflow:hidden;z-index:2147483646;",
            events: [["click", y, true], ["load", D]]
        }, [], document.body);
        aa = FeHelper.elemTool.elm("div", {
            id: ai,
            style: "position:fixed;min-width:30px;max-width:300px;box-shadow:2px 2px 2px #666;border:" + ab + ";border-radius:5px;z-index:2147483646;cursor:default;padding:10px;text-align:center;"
        }, [], document.body);
        document.addEventListener("mousemove", S);
        addEventListener("keyup", f);
        addEventListener("scroll", j);
        addEventListener("resize", j);
        O();
        a()
    }

    function r() {
        if (!aa) {
            d();
            return false
        }
        return a()
    }

    function a() {
        if (!Z) {
            aa.style.visibility = "hidden";
            ah.style.visibility = "hidden";
            if (N) {
                y()
            }
            document.body.style.cursor = "url(" + chrome.extension.getURL("static/img/crosshair.png") + ") 16 16,crosshair";
            Z = true;
            setTimeout(k, 1);
            return false
        }
        return true
    }

    function P() {
        if (!aa) {
            return
        }
        aa.style.top = (I + 8) + "px";
        aa.style.left = (J + 8) + "px";
        if (aa.clientWidth + aa.offsetLeft + 24 > innerWidth) {
            aa.style.left = (J - 8 - aa.clientWidth) + "px"
        }
        if (aa.clientHeight + aa.offsetTop + 24 > innerHeight) {
            aa.style.top = (I - 8 - aa.clientHeight) + "px"
        }
    }

    function e(c) {
        if (!Z) {
            return
        }
        P();
        var n = E.getImageData(W, V, 1, 1).data;
        p = H(n[0], n[1], n[2]);
        m = {r: n[0], g: n[1], b: n[2]};
        z({hex: ad(n[0], n[1], n[2])});
        t()
    }

    var L = false, R = 0;

    function k() {
        if (!Z) {
            return
        }
        if (L) {
            clearTimeout(R);
            R = setTimeout(function () {
                k()
            }, 255);
            return
        }
        document.body.style.cursor = "wait";
        L = true;
        aa.style.visibility = "hidden";
        ah.style.visibility = "hidden";
        ah.src = M;
        var c = innerWidth, n = innerHeight;
        ah.style.width = c + "px";
        ah.style.height = n + "px";
        setTimeout(function () {
            try {
                chrome.runtime.sendMessage({type: MSG_TYPE.COLOR_PICKER}, function (ak) {
                })
            } catch (aj) {
                console.log("有错误发生，可提交此反馈到官网！", aj)
            }
        }, 255)
    }

    var X;
    var ae = 0, q = 150;

    function t(at) {
        var an = W, am = V;
        if (L) {
            v = false;
            return
        }
        var aq = Math.floor(q * 0.5);
        var ak = Math.round(an), aj = Math.round(am);
        if (at) {
            var al = x();
            al.scale(2, 2);
            al.drawImage(Y, -ak + (aq * 0.5), -aj + (aq * 0.5));
            al.scale(0.5, 0.5);
            al.fillStyle = "rgba(0,0,0,0.3)";
            al.fillRect(aq, 0, 1, q);
            al.fillRect(0, aq, q, 1)
        } else {
            var al = x();
            al.drawImage(Y, -ak + (aq), -aj + (aq));
            var ao, ap, au = 15 - 0;
            for (var av = 0; av < aq; av += 2) {
                ao = aq - av;
                ap = aq + av;
                al.drawImage(ae, ap, 0, ao, q, ap + 1, 0, ao, q);
                al.drawImage(ae, 0, 0, ao + 1, q, -1, 0, ao + 1, q);
                al.drawImage(ae, 0, ap, q, ao, 0, ap + 1, q, ao);
                al.drawImage(ae, 0, 0, q, ao + 1, 0, -1, q, ao + 1);
                if (av == 0) {
                    var ax = al.getImageData(aq, aq, 1, 1).data;
                    var ay = ax[0] + ax[1] + ax[2];
                    if (ay > 192) {
                        al.fillStyle = "rgba(30,30,30,0.8)"
                    } else {
                        al.fillStyle = "rgba(225,225,225,0.8)"
                    }
                } else {
                    al.fillStyle = "rgba(255,255,255,0.4)"
                }
                for (var az = 0; az < au; az++) {
                    if (++av >= aq) {
                        break
                    }
                    ao = aq - av;
                    ap = aq + av;
                    al.drawImage(ae, ap, 0, ao, q, ap + 1, 0, ao, q);
                    al.drawImage(ae, 0, 0, ao + 1, q, -1, 0, ao + 1, q);
                    al.drawImage(ae, 0, ap, q, ao, 0, ap + 1, q, ao);
                    al.drawImage(ae, 0, 0, q, ao + 1, 0, -1, q, ao + 1)
                }
                au--;
                if (au < 1) {
                    au = 1
                }
                al.fillRect(ap + 1, 0, 1, q);
                al.fillRect(ao - 1, 0, 1, q);
                al.fillRect(0, ap + 1, q, 1);
                al.fillRect(0, ao - 1, q, 1)
            }
        }
        X = ae.toDataURL();
        var ar = (devicePixelRatio > 1 ? 38 : 19);
        var n = Math.floor(ar * 0.5);
        var aB = document.createElement("canvas");
        aB.width = ar, aB.height = ar;
        var aA = aB.getContext("2d");
        aA.drawImage(ae, aq - n, aq - n, ar, ar, 0, 0, ar, ar);
        var aw = {};
        aw[ar] = aB.toDataURL();
        chrome.runtime.sendMessage({browserIconMsg: true, path: (aw)}, function () {
        });
        l(X, T, s);
        if (G > 0) {
            Q()
        }
        v = false
    }

    function Q() {
        chrome.runtime.sendMessage({
            setPreview: true,
            previewURI: X,
            hex: T,
            lhex: s,
            elemTool: m.r,
            cg: m.g,
            cb: m.b
        }, function (c) {
        })
    }

    function x() {
        var c = ae.getContext("2d");
        if (c) {
            return c
        } else {
            O();
            return ae.getContext("2d")
        }
    }

    function O() {
        ae = document.createElement("canvas");
        ae.width = q;
        ae.height = q
    }

    function w(aj, n, c) {
        var ak = {result: true};
        if (aj.enableColorPicker) {
            ak.wasAlreadyEnabled = r();
            if (aj.workerHasChanged) {
                lsnaptabid = -1
            }
            if (ak.wasAlreadyEnabled) {
                ak.hex = T;
                ak.lhex = s;
                ak.previewURI = X;
                ak.FeHelper.elemTool = m.r;
                ak.cg = m.g;
                ak.cb = m.b
            }
        } else {
            if (aj.doPick) {
                y()
            } else {
                if (aj.setPickerImage) {
                    ah.src = aj.pickerImage
                }
            }
        }
        ak.isPicking = !N;
        c(ak)
    }

    function ac() {
        af();
        chrome.runtime.onMessage.removeListener(w);
        chrome.runtime.onMessage.addListener(w);
        chrome.runtime.onConnect.addListener(function (c) {
            if (c.name == "popupshown") {
                G++;
                c.onDisconnect.addListener(function (n) {
                    G--;
                    if (G < 0) {
                        G = 0
                    }
                })
            }
        })
    }

    return {init: ac}
})();
FeHelper.ColorPicker && FeHelper.ColorPicker.init && FeHelper.ColorPicker.init();
var JsonFormatDealer = (function () {
    var c = 1, g = 2, a = 3, e = 4, p = 5, r = 6;

    function i(x) {
        x = ("__" + x + "__").split("");
        var w = {
            singleQuote: false,
            doubleQuote: false,
            regex: false,
            blockComment: false,
            lineComment: false,
            condComp: false
        };
        for (var v = 0, u = x.length; v < u; v++) {
            if (w.regex) {
                if (x[v] === "/" && x[v - 1] !== "\\") {
                    w.regex = false
                }
                continue
            }
            if (w.singleQuote) {
                if (x[v] === "'" && x[v - 1] !== "\\") {
                    w.singleQuote = false
                }
                continue
            }
            if (w.doubleQuote) {
                if (x[v] === '"' && x[v - 1] !== "\\") {
                    w.doubleQuote = false
                }
                continue
            }
            if (w.blockComment) {
                if (x[v] === "*" && x[v + 1] === "/") {
                    x[v + 1] = "";
                    w.blockComment = false
                }
                x[v] = "";
                continue
            }
            if (w.lineComment) {
                if (x[v + 1] === "\n" || x[v + 1] === "\r") {
                    w.lineComment = false
                }
                x[v] = "";
                continue
            }
            if (w.condComp) {
                if (x[v - 2] === "@" && x[v - 1] === "*" && x[v] === "/") {
                    w.condComp = false
                }
                continue
            }
            w.doubleQuote = x[v] === '"';
            w.singleQuote = x[v] === "'";
            if (x[v] === "/") {
                if (x[v + 1] === "*" && x[v + 2] === "@") {
                    w.condComp = true;
                    continue
                }
                if (x[v + 1] === "*") {
                    x[v] = "";
                    w.blockComment = true;
                    continue
                }
                if (x[v + 1] === "/") {
                    x[v] = "";
                    w.lineComment = true;
                    continue
                }
                w.regex = true
            }
        }
        return x.join("").slice(2, -2)
    }

    localStorage.jfVersion = "0.5.6";
    var d, j = document.createElement("div"), b = document.createElement("span");

    function l(w, v) {
        var u = b.cloneNode(false);
        u.className = v;
        u.innerText = w;
        return u
    }

    function m(v) {
        var u = b.cloneNode(false);
        u.innerText = v;
        return u
    }

    function t(v) {
        var u = b.cloneNode(false);
        u.className = v;
        return u
    }

    function o(v) {
        var u = j.cloneNode(false);
        u.className = v;
        return u
    }

    var s = {
        t_kvov: o("kvov"),
        t_exp: t("e"),
        t_key: t("k"),
        t_string: t("s"),
        t_number: t("n"),
        t_null: l("null", "nl"),
        t_true: l("true", "bl"),
        t_false: l("false", "bl"),
        t_oBrace: l("{", "b"),
        t_cBrace: l("}", "b"),
        t_oBracket: l("[", "b"),
        t_cBracket: l("]", "b"),
        t_ellipsis: t("ell"),
        t_blockInner: t("blockInner"),
        t_colonAndSpace: document.createTextNode(":\u00A0"),
        t_commaText: document.createTextNode(","),
        t_dblqText: document.createTextNode('"')
    };

    function h(H, E) {
        var C, G, A, y = s, z, x, u;
        if (typeof H === "string") {
            C = c
        } else {
            if (typeof H === "number") {
                C = g
            } else {
                if (H === false || H === true) {
                    C = p
                } else {
                    if (H === null) {
                        C = r
                    } else {
                        if (H instanceof Array) {
                            C = e
                        } else {
                            C = a
                        }
                    }
                }
            }
        }
        G = y.t_kvov.cloneNode(false);
        if (C === a || C === e) {
            A = false;
            for (z in H) {
                if (H.hasOwnProperty(z)) {
                    A = true;
                    break
                }
            }
            if (A) {
                G.appendChild(y.t_exp.cloneNode(false))
            }
        }
        if (E !== false) {
            G.classList.add("objProp");
            x = y.t_key.cloneNode(false);
            x.textContent = JSON.stringify(E).slice(1, -1);
            G.appendChild(y.t_dblqText.cloneNode(false));
            G.appendChild(x);
            G.appendChild(y.t_dblqText.cloneNode(false));
            G.appendChild(y.t_colonAndSpace.cloneNode(false))
        } else {
            G.classList.add("arrElem")
        }
        var F, N;
        switch (C) {
            case c:
                var w = b.cloneNode(false), I = JSON.stringify(H);
                I = I.substring(1, I.length - 1);
                if (H[0] === "h" && H.substring(0, 4) === "http") {
                    var v = document.createElement("A");
                    v.href = H;
                    v.innerText = I;
                    w.appendChild(v)
                } else {
                    w.innerText = I
                }
                u = y.t_string.cloneNode(false);
                u.appendChild(y.t_dblqText.cloneNode(false));
                u.appendChild(w);
                u.appendChild(y.t_dblqText.cloneNode(false));
                G.appendChild(u);
                break;
            case g:
                u = y.t_number.cloneNode(false);
                u.innerText = H;
                G.appendChild(u);
                break;
            case a:
                G.appendChild(y.t_oBrace.cloneNode(true));
                if (A) {
                    G.appendChild(y.t_ellipsis.cloneNode(false));
                    F = y.t_blockInner.cloneNode(false);
                    var D = 0, J, M;
                    for (J in H) {
                        if (H.hasOwnProperty(J)) {
                            D++;
                            N = h(H[J], J);
                            M = y.t_commaText.cloneNode();
                            N.appendChild(M);
                            F.appendChild(N)
                        }
                    }
                    N.removeChild(M);
                    G.appendChild(F)
                }
                G.appendChild(y.t_cBrace.cloneNode(true));
                break;
            case e:
                G.appendChild(y.t_oBracket.cloneNode(true));
                if (A) {
                    G.appendChild(y.t_ellipsis.cloneNode(false));
                    F = y.t_blockInner.cloneNode(false);
                    for (var K = 0, B = H.length, L = B - 1; K < B; K++) {
                        N = h(H[K], false);
                        if (K < L) {
                            N.appendChild(y.t_commaText.cloneNode())
                        }
                        F.appendChild(N)
                    }
                    G.appendChild(F)
                }
                G.appendChild(y.t_cBracket.cloneNode(true));
                break;
            case p:
                if (H) {
                    G.appendChild(y.t_true.cloneNode(true))
                } else {
                    G.appendChild(y.t_false.cloneNode(true))
                }
                break;
            case r:
                G.appendChild(y.t_null.cloneNode(true));
                break
        }
        return G
    }

    function n(w, u) {
        var y = h(w, false);
        y.classList.add("rootKvov");
        var v = document.createElement("DIV");
        v.id = "formattedJson";
        v.appendChild(y);
        var x = v.outerHTML;
        if (u !== null) {
            x = '<div id="jsonpOpener">' + u + " ( </div>" + x + '<div id="jsonpCloser">)</div>'
        }
        return x
    }

    var k = function (w) {
        var D = null;
        var x = JsonFormatEntrance;
        if (w.type === "SENDING TEXT") {
            var y, F = w.text;
            try {
                y = new Function("return " + F)()
            } catch (A) {
                F = F.trim();
                var v;
                if (!(v = F.indexOf("("))) {
                    x.postMessage(["NOT JSON", "no opening parenthesis"]);
                    x.disconnect();
                    return
                }
                var u = i(F.substring(0, v)).trim();
                if (!u.match(/^[a-zA-Z_$][\.\[\]'"0-9a-zA-Z_$]*$/)) {
                    x.postMessage(["NOT JSON", "first bit not a valid function name"]);
                    x.disconnect();
                    return
                }
                var E;
                if (!(E = F.lastIndexOf(")"))) {
                    x.postMessage(["NOT JSON", "no closing paren"]);
                    x.disconnect();
                    return
                }
                var C = i(F.substring(E + 1)).trim();
                if (C !== "" && C !== ";") {
                    x.postMessage(["NOT JSON", "last closing paren followed by invalid characters"]);
                    x.disconnect();
                    return
                }
                F = F.substring(v + 1, E);
                try {
                    y = JSON.parse(F)
                } catch (B) {
                    x.postMessage(["NOT JSON", "looks like a function call, but the parameter is not valid JSON"]);
                    return
                }
                D = u
            }
            if (typeof y !== "object" && typeof y !== "array") {
                x.postMessage(["NOT JSON", "technically JSON but not an object or array"]);
                x.disconnect();
                return
            }
            x.postMessage(["FORMATTING"]);
            var z = n(y, D);
            x.postMessage(["FORMATTED", z]);
            x.disconnect()
        }
    };
    var f = function (u) {
        k(u)
    };
    var q = function () {
    };
    return {postMessage: f, disconnect: q}
})();
var JsonFormatEntrance = (function () {
    var r, o, n, i, g, k = JsonFormatDealer, l = +(new Date()), q, u, b, v;
    var j = function (B) {
        switch (B[0]) {
            case"NOT JSON":
                o.style.display = "";
                r.innerHTML = '<span class="x-json-tips">JSON不合法，请检查：</span>';
                b = +(new Date());
                break;
            case"FORMATTING":
                u = +(new Date());
                clearTimeout(g);
                var y = document.getElementById("optionBar");
                if (y) {
                    y.parentNode.removeChild(y)
                }
                y = document.createElement("div");
                y.id = "optionBar";
                var A = document.createElement("button"), x = document.createElement("button");
                A.id = "buttonFormatted";
                A.innerText = "格式化";
                A.classList.add("selected");
                x.id = "buttonCollapseAll";
                x.innerText = "折叠所有";
                var z = false;
                A.addEventListener("click", function () {
                    if (z) {
                        z = false;
                        o.style.display = "none";
                        r.style.display = "";
                        $(this).text("元数据")
                    } else {
                        z = true;
                        o.style.display = "";
                        r.style.display = "none";
                        $(this).text("格式化")
                    }
                    $(this).parent().find("button").removeClass("selected");
                    $(this).addClass("selected")
                }, false);
                x.addEventListener("click", function () {
                    if (z) {
                        A.click()
                    }
                    if (!z) {
                        if (x.innerText == "折叠所有") {
                            x.innerText = "展开所有";
                            e(document.getElementsByClassName("objProp"))
                        } else {
                            x.innerText = "折叠所有";
                            c(document.getElementsByClassName("objProp"))
                        }
                        $(this).parent().find("button").removeClass("selected");
                        $(this).addClass("selected")
                    }
                }, false);
                y.appendChild(A);
                y.appendChild(x);
                document.addEventListener("click", m, false);
                r.parentNode.appendChild(y);
                break;
            case"FORMATTED":
                i.style.display = "";
                r.innerHTML = B[1];
                v = +(new Date());
                break;
            default:
                throw new Error("Message not understood: " + B[0])
        }
    };
    var t = 0;

    function e(B) {
        var z, y, x, A;
        for (y = B.length - 1; y >= 0; y--) {
            z = B[y];
            z.classList.add("collapsed");
            if (!z.id) {
                z.id = "kvov" + (++t);
                x = z.firstElementChild;
                while (x && !x.classList.contains("blockInner")) {
                    x = x.nextElementSibling
                }
                if (!x) {
                    continue
                }
                A = x.children.length;
                var C = A + (A === 1 ? " item" : " items");
                n.insertAdjacentHTML("beforeend", "\n#kvov" + t + '.collapsed:after{color: #aaa; content:" // ' + C + '"}')
            }
        }
    }

    function c(y) {
        for (var x = y.length - 1; x >= 0; x--) {
            y[x].classList.remove("collapsed")
        }
    }

    var h = navigator.platform.indexOf("Mac") !== -1, d;
    if (h) {
        d = function (x) {
            return x.metaKey
        }
    } else {
        d = function (x) {
            return x.ctrlKey
        }
    }
    function m(A) {
        if (A.which === 1) {
            var z = A.target;
            if (z.className === "e") {
                A.preventDefault();
                var y = z.parentNode, E = r, x = document.body.offsetHeight, C = document.body.scrollTop, B;
                if (y.classList.contains("collapsed")) {
                    if (d(A)) {
                        c(y.parentNode.children)
                    } else {
                        c([y])
                    }
                } else {
                    if (d(A)) {
                        e(y.parentNode.children)
                    } else {
                        e([y])
                    }
                }
                E.style.marginBottom = 0;
                if (document.body.offsetHeight < window.innerHeight) {
                    return
                }
                if (document.body.scrollTop === C) {
                    return
                }
                var D = C - document.body.scrollTop + 8;
                E.style.marginBottom = D + "px";
                document.body.scrollTop = C;
                return
            }
        }
    }

    var f = function (x) {
        j(x)
    };
    var w = function () {
    };
    var s = function (x) {
        r = document.getElementById("jfContent");
        if (!r) {
            r = document.createElement("div");
            r.id = "jfContent";
            document.body.appendChild(r)
        }
        r.style.display = "";
        o = document.getElementById("jfContent_pre");
        if (!o) {
            o = document.createElement("pre");
            o.id = "jfContent_pre";
            document.body.appendChild(o)
        }
        o.innerHTML = JSON.stringify(JSON.parse(x), null, 4);
        o.style.display = "none";
        n = document.getElementById("jfStyleEl");
        if (!n) {
            n = document.createElement("style");
            document.head.appendChild(n)
        }
        i = document.getElementById("formattingMsg");
        if (!i) {
            i = document.createElement("pre");
            i.id = "formattingMsg";
            i.innerHTML = '<svg id="spinner" width="16" height="16" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#3d7fe6"></path></svg> 格式化中...';
            document.body.appendChild(i)
        }
        k.postMessage({type: "SENDING TEXT", text: x, length: x.length});
        a(JSON.parse(x))
    };
    var a = function (x) {
        try {
            window.webkitRequestFileSystem(window.TEMPORARY, 10 * 1024 * 1024, function (z) {
                var B = (+new Date).toString(36);
                var A = +new Date() + ".json";
                z.root.getDirectory(B, {create: true}, function (D) {
                    var C = B + "/" + A;
                    z.root.getFile(C, {create: true}, function (E) {
                        E.createWriter(function (G) {
                            G.onwriteend = function () {
                                $("#optionBar").prepend('<a href="' + E.toURL() + '" id="btnDownload" target="_blank" title="在新页面Ctrl+S保存到本地">下载JSON数据</a>')
                            };
                            var F = new Blob([JSON.stringify(x, null, 4)], {type: "application/octet-stream"});
                            G.write(F)
                        })
                    })
                })
            })
        } catch (y) {
        }
    };
    var p = function () {
        try {
            r.innerHTML = "";
            o.innerHTML = ""
        } catch (x) {
        }
    };
    return {format: s, clear: p, postMessage: f, disconnect: w}
})();
baidu.csJsonFormat = (function () {
    var f = ['<div class="mod-json mod-contentscript"><div class="rst-item">', '<div id="formattingMsg">', '<svg id="spinner" width="16" height="16" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1">', '<path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#3d7fe6"></path>', "</svg>加载中...", "</div>", '<div id="jfCallbackName_start" class="callback-name"></div>', '<div id="jfContent"></div>', '<pre id="jfContent_pre"></pre>', '<div id="jfCallbackName_end" class="callback-name"></div>', "</div></div>"].join("");
    var b = function () {
        var g = chrome.extension.getURL("static/css/fe-jsonformat-content.css");
        jQuery('<link id="_fehelper_fcp_css_" href="' + g + '" rel="stylesheet" type="text/css" />').appendTo("head")
    };
    var e = function () {
        var o = $("body>pre:eq(0)")[0] || {textContent: ""};
        var m = $.trim(o.textContent);
        if (!m) {
            m = $.trim(document.body.textContent || "")
        }
        if (!m) {
            return false
        }
        var h = document.body.childNodes;
        var n = "";
        for (var l = 0, g = h.length; l < g; l++) {
            if (h[l].nodeType == Node.TEXT_NODE) {
                n += h[l].textContent
            } else {
                if (h[l].nodeType == Node.ELEMENT_NODE) {
                    var k = h[l].tagName.toLowerCase();
                    var j = $.trim(h[l].textContent);
                    if (k === "pre" && j === m) {
                        continue
                    } else {
                        if (h[l].offsetWidth === 0 || h[l].offsetHeight === 0 || !j) {
                            continue
                        } else {
                            return false
                        }
                    }
                } else {
                    return false
                }
            }
        }
        return n || m
    };
    var c = function (k) {
        k = k.replace(/\\/g, "%").replace("%U", "%u").replace("%u0025", "%25");
        k = unescape(k.toString().replace(/%2B/g, "+"));
        var i = k.match(/(%u00([0-9A-F]{2}))/gi);
        if (i) {
            for (var j = 0; j < i.length; j++) {
                var h = i[j].substring(1, 3);
                var g = Number("0x" + h);
                if (g >= 128) {
                    k = k.replace(i[j], h)
                }
            }
        }
        k = unescape(k.toString().replace(/%2B/g, "+"));
        return k
    };
    var a = function () {
        var g = e();
        if (!g) {
            return
        }
        var o = null;
        var p = null;
        var h = "";
        try {
            var i = /^([\w\.]+)\(\s*([\s\S]*)\s*\)$/igm;
            var k = i.exec(g);
            if (k != null) {
                o = k[1];
                h = k[2];
                p = new Function("return " + h)()
            }
        } catch (n) {
            return
        }
        try {
            if (p == null || typeof p != "object") {
                p = new Function("return " + g)();
                if (typeof p == "string") {
                    p = new Function("return " + p)()
                }
            }
        } catch (l) {
            return
        }
        if (p != null && typeof p == "object") {
            try {
                h = JSON.stringify(p);
                if (h.length * 2 < (c(g)).length) {
                    return
                }
                var m = h.replace(/[^\w]/gm, "").length;
                var j = c(g).replace(/[^\w]/gm, "").length;
                if (Math.abs(m - j) > (m + j) / 20) {
                    return
                }
            } catch (n) {
                return
            }
            $("body").html(f);
            b();
            $("#jfContent").delegate(".kvov", "click", function (q) {
                $("#jfContent .kvov").removeClass("x-outline");
                $(this).removeClass("x-hover").addClass("x-outline");
                if (!$(q.target).is(".kvov .e")) {
                    q.stopPropagation()
                } else {
                    $(q.target).parent().trigger("click")
                }
            }).delegate(".kvov", "mouseover", function (q) {
                $(this).addClass("x-hover");
                return false
            }).delegate(".kvov", "mouseout", function (q) {
                $(this).removeClass("x-hover")
            });
            JsonFormatEntrance.clear();
            JsonFormatEntrance.format(h);
            if (o != null) {
                $("#jfCallbackName_start").html(o + "(");
                $("#jfCallbackName_end").html(")")
            }
        }
    };
    var d = function () {
        $(function () {
            if (!/^filesystem\:/.test(location.href)) {
                a()
            }
        })
    };
    return {init: d}
})();
baidu.csJsonFormat.init();