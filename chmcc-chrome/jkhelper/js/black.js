/**
 * Created by caohongming on 2016/11/9.
 */
var origin = [2, 3], hour = ['08', '09', '10', '11'], action = [20, 21], date = "20161110", PinArr = [];

for (var i = 0, len = origin.length; i < len; i++) {
    for (var j = 0, lenj = hour.length; j < lenj; j++) {
        for (var k = 0, lenk = action.length; k < lenk; k++) {
            var url = "http://trafficlightweb.jd.com/Calculate/downOneHourPinOfAction?origin=" + origin[i] + "&date=" + date + "&hour=" + hour[j] + "&start=100&end=2147483647&inPin=&action=" + action[k];
            getPin(url);
        }
    }
}
function getPin(url) {
    $.ajax({
        type: "get",
        cache: false,
        url: url,
        success: function (data) {
            PinArr = PinArr.concat(data.split("\n"));
            PinArr.pop();
            console.log("success");
        },
        error: function (err) {
            console.log("err");
        }
    });
}
debugger;
function unique(a) {
    var res = [];
    for (var i = 0, len = a.length; i < len; i++) {
        var item = a[i];

        for (var j = 0, jLen = res.length; j < jLen; j++) {
            if (res[j] === item)
                break;
        }
        if (j === jLen)
            res.push(item);
    }
    return res;
}

var ans = unique(PinArr);
function saveFile(filename, ans) {
    var win = window.open();
    for (var i = 0, len = ans.length; i < len; i++) {
        win.document.write(ans[i] + "<br>");
    }
    win.document.execCommand('SaveAs', '', filename);
    // win.close();
}
saveFile("input.txt", ans);