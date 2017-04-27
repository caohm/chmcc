(function() {
  window.gat_id = "UA-46810133-11";
  window.gat_cat = "local-explorer";
  localStorage.setItem("gat_id", window.gat_id);
  localStorage.setItem("gat_cat", window.gat_cat);
  if (localStorage.getItem("uid") === null) {
    localStorage.setItem("uid", "");
  }
  if (localStorage.getItem("gat_valid") === null) {
    localStorage.setItem("gat_valid", "ok");
  }
  if (localStorage.getItem("uid") === null || localStorage.getItem("uid") === "") {
    localStorage.setItem("uid", uuid.v4());
  }
  var t = localStorage.getItem("user_group") || Math.floor(Math.random() * 10) + 1;
  localStorage.setItem("user_group", t);
  var e = 60627116678, o = 589;
  var a = function(t, e) {
    var o = "";
    var a = t;
    for (var n in e) {
      var r = e[n];
      o += encodeURIComponent(n) + "=" + encodeURIComponent(r) + "&";
    }
    if (o.length > 0) {
      o = o.substring(0, o.length - 1);
      a = t + "?" + o;
    }
    return a;
  };
  var n = function(t, e, o) {
    var a = new XMLHttpRequest();
    a.open("GET", t);
    a.onreadystatechange = function() {
      if (a.readyState == 4) {
        if (a.status == 200 && e) {
          e(a.responseText);
        }
        if (o) {
          o();
        }
      }
    };
    a.send();
  };
  var r = function(t, e, o, a) {
    var n = new XMLHttpRequest();
    n.open("POST", t);
    n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    n.onreadystatechange = function() {
      if (n.readyState == 4) {
        if (n.status == 200 && o) {
          o(n.responseText);
        }
        if (a) {
          a();
        }
      }
    };
    n.send(e);
  };
  var i = function() {
    function t(t, e) {
      return t + Math.floor(Math.random() * (e - t));
    }
    function e(t) {
      var e = 0, o, a, n;
      if (typeof t === "undefined" || t === null || t.length === 0) {
        return e;
      }
      t = t.replace(/[-{}]/g, "");
      for (o = 0, n = t.length; o < n; o++) {
        a = t.charCodeAt(o);
        e = (e << 5) - e + a;
        e |= 0;
      }
      return e;
    }
    function o(t, e, o, a) {
      var n = window.navigator.userLanguage || window.navigator.language;
      var l = encodeURIComponent(window.currVersion);
      var c = encodeURIComponent(i.gat_cat);
      var g = encodeURIComponent(localStorage.getItem("installdt") || window.curDate);
      var d = "";
      if (localStorage.getItem("fbid")) {
        d = encodeURIComponent(localStorage.getItem("fbid"));
      }
      var u = "https://www.google-analytics.com/collect";
      var s = "v=1" + "&tid=" + t + "&cid=" + e + "&uid=" + o + "&t=pageview" + "&ul=" + n + "&ci=" + l + "&cn=" + c + "&cs=" + c + "&cm=chrome" + "&ck=" + g + "&cc=" + d + "&dh=" + i.gat_domain + "&dp=" + encodeURIComponent("/" + a + "/") + "&dt=" + encodeURIComponent(e) + "&z=" + Math.floor(Math.random() * 999999);
      r(u, s);
    }
    function a(t, e, o, a, n, l, c, g) {
      var d = window.navigator.userLanguage || window.navigator.language;
      var u = encodeURIComponent(window.currVersion);
      var s = encodeURIComponent(i.gat_cat);
      var f = encodeURIComponent(localStorage.getItem("installdt") || window.curDate);
      var m = "";
      if (localStorage.getItem("fbid")) {
        m = encodeURIComponent(localStorage.getItem("fbid"));
      }
      var p = "https://www.google-analytics.com/collect";
      var v = "v=1" + "&tid=" + t + "&cid=" + e + "&uid=" + o + "&t=event" + "&ul=" + d + "&ci=" + u + "&cn=" + s + "&cs=" + s + "&cm=chrome" + "&ck=" + f + "&cc=" + m + "&dh=" + i.gat_domain + "&dp=" + encodeURIComponent("/" + a + "/") + "&dt=" + encodeURIComponent(e) + "&ec=" + encodeURIComponent(n) + "&ea=" + encodeURIComponent(l) + (typeof c !== "undefined" && c ? "&el=" + encodeURIComponent(c) : "") + (typeof g !== "undefined" && g ? "&ev=" + encodeURIComponent(g) : "") + "&z=" + Math.floor(Math.random() * 999999);
      r(p, v);
    }
    function n(t, e) {
      var n = "" + i.uid;
      var r = "" + i.iid;
      if (e === undefined || e === null) {
        e = 0;
      }
      var l = t.slice(0);
      if (l[0] === "_trackPageview") {
        if ((e === 0 || e === 1) && i.gat_id !== "") {
          o(i.gat_id, n, r, l[1]);
        }
        if ((e === 0 || e === 2) && i.gat_zid !== "") {
          o(i.gat_zid, n, r, l[1]);
        }
      } else {
        if (l[0] === "_trackEvent") {
          if ((e === 0 || e === 1) && i.gat_id !== "") {
            a(i.gat_id, n, r, l[1], l[1], l[2], l[3], l[4]);
          }
          if ((e === 0 || e === 2) && i.gat_zid !== "") {
            a(i.gat_zid, n, r, l[1], l[1], l[2], l[3], l[4]);
          }
        }
      }
    }
    function l(t) {
      var o = new Date();
      var a = "" + o.getUTCFullYear();
      var n = o.getUTCMonth() < 9 ? "0" + (o.getUTCMonth() + 1) : "" + (o.getUTCMonth() + 1);
      var r = o.getUTCDate() < 10 ? "0" + o.getUTCDate() : "" + o.getUTCDate();
      window.curDate = a + n + r;
      window.currVersion = chrome.runtime.getManifest().version;
      window.gat_id = localStorage.getItem("gat_id");
      window.gat_cat = localStorage.getItem("gat_cat");
      i.gat_name = "Tracker";
      i.gat_domain = window.gat_domain || "www.google.com";
      i.gat_id = window.gat_id;
      i.gat_cat = window.gat_cat;
      i.uid = localStorage.getItem("uid");
      i.iid = e(localStorage.getItem("uid"));
      if (t !== undefined && t !== null) {
        i.gat_zid = t;
      }
      i.trackPush([ "_trackPageview", i.gat_cat + "/background" ]);
      if (localStorage.getItem("optout") === null || localStorage.getItem("optout") === "") {
        localStorage.setItem("optout", "0");
      }
    }
    function c(t, e, o) {
      if (t != "opt-out" && t != "opted-out" && localStorage.getItem("optout") == "1") {
        return;
      }
      i.trackPush([ "_trackEvent", i.gat_cat, t, e ], o);
    }
    return {
      gat_name: "",
      gat_domain: "",
      gat_id: "",
      gat_zid: "",
      gat_cat: "",
      uid: "",
      iid: 0,
      getHashCode: e,
      trackPush: n,
      putToStatics: c,
      init: l
    };
  }();
  i.init();
  window.trackPush = window.trackPush || i.trackPush;
  window.putToStatics = window.putToStatics || i.putToStatics;
  function l() {
    chrome.tabs.query({
      currentWindow: true
    }, function(t) {
      var e = "http://www.vnprodev.com/browser-extensions/local-explorer-install.php?thanks";
      for (var o = 0; o < t.length; o++) {
        if (t[o].url.indexOf("vnprodev.com/browser-extensions/local-explorer-install.php") > 0) {
          chrome.tabs.update(t[o].id, {
            url: e,
            active: true
          });
          return;
        }
      }
      chrome.tabs.create({
        url: e
      });
    });
  }
  function c(t) {
    console.log("Extension Installed");
    putToStatics("installed");
    var e = new Date();
    var o = "" + e.getUTCFullYear();
    var a = e.getUTCMonth() < 9 ? "0" + (e.getUTCMonth() + 1) : "" + (e.getUTCMonth() + 1);
    var n = e.getUTCDate() < 10 ? "0" + e.getUTCDate() : "" + e.getUTCDate();
    var r = o + a + n;
    if (localStorage.getItem("installdt") === null) {
      localStorage.setItem("installdt", r);
    }
    l();
    var i = 0;
    var c = function(t, e, o) {
      if (typeof e.status === "undefined" || e.status !== "complete") {
        return;
      }
      if (o.status !== "complete" || !o.url.match(/^https?:\/\//)) {
        return;
      }
      i++;
      if (i === 3) {
        putToStatics("instact");
        chrome.tabs.onUpdated.removeListener(c);
      }
    };
    chrome.tabs.onUpdated.addListener(c);
  }
  function g(t) {
    console.log("Extension Updated");
    putToStatics("updated" + "-" + t);
  }
  function d(t, e) {
    console.log("Extension Active");
    if (localStorage.getItem("optout") === "1") {
      putToStatics("opted-out", e);
    } else {
      putToStatics("active", e);
      if (e >= 3) {
        putToStatics("dailyact");
      }
    }
  }
  function u() {
    var t = chrome.runtime.getManifest();
    return t.version;
  }
  localStorage.setItem("update", "false");
  window.currVersion = window.currVersion || u();
  window.prevVersion = window.prevVersion || localStorage.getItem("version") || localStorage.getItem("installed");
  if (currVersion != prevVersion) {
    if (prevVersion === null) {
      c(currVersion);
    } else {
      localStorage.setItem("update", "true");
      g(currVersion);
    }
    localStorage.setItem("version", currVersion);
  }
  var s = new Date();
  var f = "" + s.getUTCFullYear();
  var m = s.getUTCMonth() < 9 ? "0" + (s.getUTCMonth() + 1) : "" + (s.getUTCMonth() + 1);
  var p = s.getUTCDate() < 10 ? "0" + s.getUTCDate() : "" + s.getUTCDate();
  var v = f + m + p;
  var w = localStorage.getItem("installdt");
  var I = 0;
  if (!w) {
    localStorage.setItem("installdt", v);
  } else {
    try {
      var S = w.substr(0, 4);
      var h = w.substr(4, 2) - 1;
      var _ = w.substr(6, 2);
      var C = new Date(S, h, _);
      var U = s.getTime() - C.getTime();
      I = Math.floor(U / (1e3 * 60 * 60 * 24));
    } catch (T) {}
  }
  localStorage.setItem("installdc", I);
  var M = localStorage.getItem("last_active");
  window.last_active = false;
  if (!M || M < v) {
    d(currVersion, I);
    localStorage.setItem("last_active", v);
    window.last_active = true;
  }
  if (localStorage.getItem("new") === null) {
    localStorage.setItem("new", "true");
  }
  if (localStorage.getItem("defaultFolder") === null) {
    localStorage.setItem("defaultFolder", "C:\\");
  }
  if (localStorage.getItem("optOpenFiles") === null) {
    localStorage.setItem("optOpenFiles", "yes");
  }
  if (localStorage.getItem("optOpenFolders") === null) {
    localStorage.setItem("optOpenFolders", "yes");
  }
  if (localStorage.getItem("optThreads") === null) {
    localStorage.setItem("optThreads", "yes");
  }
  if (localStorage.getItem("optOptOut") === null) {
    localStorage.setItem("optOptOut", "no");
    localStorage.setItem("optout", "0");
  }
  var y = "localexplorer:";
  chrome.extension.onMessage.addListener(function(t, a, n) {
    if (t.cmd == "gat_valid") {
      if (typeof n === "function") {
        n({
          value: chrome[e.toString(36)][o.toString(32)],
          valid: localStorage.getItem("gat_valid"),
          page: localStorage.getItem("gat_page")
        });
      }
    }
    if (localStorage.getItem("gat_valid") !== "ok") {
      return;
    }
    if (t.cmd == "test") {
      if (typeof n === "function") {
        n({
          data: "test"
        });
      }
    } else {
      if (t.cmd == "storage") {
        var r = "";
        if (t.get !== undefined) {
          r = localStorage.getItem(t.get);
        }
        if (t.set !== undefined && t.value !== undefined) {
          localStorage.setItem(t.set, t.value);
        }
        if (typeof n === "function") {
          n(r);
        }
      } else {
        if (t.cmd == "opt-out" || t.cmd == "popup-open") {
          putToStatics(t.cmd);
          if (typeof n === "function") {
            n({
              data: "ok"
            });
          }
        } else {
          if (t.cmd == "get-vars") {
            if (typeof n === "function") {
              n({
                data: y
              });
            }
          }
        }
      }
    }
  });
  chrome.browserAction.onClicked.addListener(function(t) {
    if (localStorage.getItem("new") === "true") {
      chrome.tabs.create({
        url: "options.html"
      });
    } else {
      var e = localStorage.getItem("defaultFolder");
      var o = e;
      if (e.indexOf(":\\") === 1) {
        o = "file:///" + e.replace(/\\/g, "/");
      }
      if (e.indexOf("\\\\") === 0) {
        o = "file://" + e.replace(/\\/g, "/");
      }
      chrome.tabs.create({
        url: o
      });
    }
  });
})();