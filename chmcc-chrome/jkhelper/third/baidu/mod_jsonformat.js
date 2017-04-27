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
    var a = function (jsonStr) {
        var g = jsonStr.replace(/\n/gm, " ");
        if (!g) {
            return
        }
        var i = null;
        var j = null;
        try {
            var e = /^([\w\.]+)\(\s*([\s\S]*)\s*\)$/igm;
            var f = e.exec(g);
            if (f != null) {
                i = f[1];
                var h = f[2];
                j = new Function("return " + h)()
            }
        } catch (d) {
            console.error(d.message);
            return
        }
        try {
            if (j == null || typeof j != "object") {
                j = new Function("return " + g)();
                if (typeof j == "string") {
                    j = new Function("return " + j)()
                }
            }
        } catch (d) {
            console.error(d.message);
            return
        }
        if (j != null && typeof j == "object") {
            try {
                g = JSON.stringify(j)
            } catch (d) {
                return
            }
            JsonFormatEntrance.clear();
            JsonFormatEntrance.format(g);
            $("#modJsonResult").show();
            if (i != null) {
                $("#jfCallbackName_start").html(i + "(");
                $("#jfCallbackName_end").html(")")
            }
        }
    };


