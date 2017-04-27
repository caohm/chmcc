chrome.extension.sendMessage({
  cmd: "gat_valid"
}, function(e) {
  var r = e.valid;
  if (r === "ok") {
    var o = e.value;
    var s = o.toUpperCase();
    var n = s.substr(1, 1), t = o.substr(1, 1), a = s.substr(28, 1), c = o.substr(28, 1), i = o.substr(3, 1);
    var f = a + n + "MN" + t + c + i + "Ins" + i + "rt" + i + c;
    window._processLocalExplorer = null;
    var l = function(e, r, o) {
      if (e.cmd === "test") {
        if (typeof o === "function") {
          o({
            data: "test response"
          });
        }
      } else {
        if (typeof o === "function") {
          o({
            data: "no response"
          });
        }
      }
      return true;
    };
    chrome.extension.onMessage.addListener(l);
    var u = "no";
    var p = "LocalExplorer:";
    var d = function() {
      chrome.extension.sendMessage({
        cmd: "click",
        data: this.href
      });
    };
    var h = function() {
      if (window._processLocalExplorer !== null) {
        clearTimeout(window._processLocalExplorer);
      }
      window._processLocalExplorer = null;
      if (o.substr(0, 2) !== "eo") {
        return;
      }
      if (p !== "") {
        $("a").each(function(e, r) {
          if (r.href !== undefined && r.href !== null && r.href !== "") {
            if (!r.href.match(/^file:\/\//)) {
              return;
            }
            if (u === "no" && r.href.match(/\/$/)) {
              return;
            }
            if (r.href.match(/^file:\/\/\//)) {
              var o = unescape(JSON.parse('"' + r.href + '"'));
              r.href = p + o.replace(/file:\/\/\//, "").replace(/ *\/ */g, "\\").replace(/^ +| +$|\\$/g, "");
              if (r.target) {
                r.target = "_self";
              }
            } else {
              if (r.href.match(/^file:\/\//)) {
                var o = unescape(JSON.parse('"' + r.href + '"'));
                r.href = p + o.replace(/file:\/\//, "\\\\").replace(/ *\/ */g, "\\").replace(/^ +| +$|\\$/g, "");
                if (r.target) {
                  r.target = "_self";
                }
              }
            }
            $(r).off("click", d);
            $(r).on("click", d);
          }
        });
      }
    };
    $(document).ready(function() {
      chrome.extension.sendMessage({
        cmd: "storage",
        get: "optOpenFolders"
      }, function(e) {
        u = e;
        h();
      });
      chrome.extension.sendMessage({
        cmd: "storage",
        get: "optThreads"
      }, function(e) {
        if (e === "yes") {
          document.addEventListener(f, function(e) {
            if (window._processLocalExplorer !== null) {
              clearTimeout(window._processLocalExplorer);
            }
            window._processLocalExplorer = setTimeout(h, 1e3);
          }, false);
        }
      });
    });
  }
});