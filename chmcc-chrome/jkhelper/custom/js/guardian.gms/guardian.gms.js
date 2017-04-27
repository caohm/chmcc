/**
 * Created by caohongming on 2016/11/2.
 */

var titleParams = window.location.search.split("=")[1];
$.ajax({
    type: "post",
    data: {field: titleParams},
    url: local + "/manage/dashboard/tipOutAjax",
    success: function (data) {
        var formInfo = data.info.split("||");
        for (var f in formInfo) {
            var params = formInfo[f];
            var status = true;
            var qu = params.split("&");
            for (var i = 0; i < qu.length; i++) {
                if (qu[i].split("=")[1] == "") {
                    status = false;
                    break;
                }
            }
            if (status) {
                var searchType = qu[4].split("=")[1];
                if (searchType == "tp") {
                    var tpNum = f;
                    $("#showChart" + tpNum).append(function () {
                        var title = $("<div style='position: absolute; top: 0px;'></div>");
                        title.append("<span style='color: #00a2d4'>" + qu[1].split("=")[1] + "</span>");
                        var _interface = qu[2].split("=")[1];
                        _interface = _interface.substr(_interface.lastIndexOf(".") + 1);
                        title.append("<span id='" + qu[1].split("=")[1] + "_" + _interface + "_" + qu[3].split("=")[1] + "' >" + _interface + "</span>");
                        title.append("<span style='color: #00a2d4'>" + qu[3].split("=")[1] + "</span>");
                        return title;
                    });
                }
            }
        }
    },
    error: function () {
        alert("系统错误，请稍后再试...");
    }
});
var tp = function (data) {
    var total = 0;
    var min = Infinity;
    var max = -Infinity;
    var tp50 = -1, tp99 = -1, tp999 = -1;
    for (var i in data) {
        if (i < min) min = +i;
        if (i > max) max = +i;
        total += +data[i];
    }
    var pos50 = total * 50 / 100,
        pos99 = total * 99 / 100,
        pos999 = total * 999 / 1000;
    for (var i in data) {
        pos50 = pos50 - data[i];
        pos99 = pos99 - data[i];
        pos999 = pos999 - data[i];
        if (pos50 <= 0 && tp50 < 0) tp50 = i;
        if (pos99 <= 0 && tp99 < 0) tp99 = i;
        if (pos999 <= 0 && tp999 < 0) tp999 = i;
    }

    return {
        'tp99': tp99 == -1 ? "" : tp99
    }
};
function dashTP(chart, params) {
    var tpData = [];
    arr.push(setInterval(function () {
        $.get(local + "/manage/getTp?" + params, function (data) {
            if (tpData.length >= 6000) {
                tpData.shift();
            }
            tpData.push([data.time, tp(data.tp)]);
            var num = params.split("&");
            var group = num[1].split("=")[1];
            var _interface = num[2].split("=")[1];
            _interface = _interface.substr(_interface.lastIndexOf(".") + 1);
            var method = num[3].split("=")[1];
            check(group + "组" + method + "方法", tpData, "tp", 5);
            chart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data: tpData.map(function (item) {
                        return item[0];
                    }),
                    gridIndex: 0
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} ms'
                    }
                },
                legend: {
                    data: ['min', 'tp50', 'tp99', 'tp999', 'max'],
                    top: 20
                },
                toolbox: {
                    right: 10,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter'// 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                    }
                ],
                series: [
                    {
                        name: 'min',
                        type: 'line',
                        data: tpData.map(function (item) {
                            return item[1]['min'];
                        })
                    },
                    {
                        name: 'tp50',
                        type: 'line',
                        data: tpData.map(function (item) {
                            return item[1]['tp50'];
                        })
                    },
                    {
                        name: 'tp99',
                        type: 'line',
                        data: tpData.map(function (item) {
                            return item[1]['tp99'];
                        })
                    },
                    {
                        name: 'tp999',
                        type: 'line',
                        data: tpData.map(function (item) {
                            return item[1]['tp999'];
                        })
                    },
                    {
                        name: 'max',
                        type: 'line',
                        data: tpData.map(function (item) {
                            return item[1]['max'];
                        })
                    }
                ]
            });
        });
    }, 1000));
}
function speak(alarmMsg) {
    var msg = new SpeechSynthesisUtterance("" + alarmMsg);
    msg.lang = 'zh';
    msg.voice = speechSynthesis.getVoices().filter(function (voice) {
        return voice.name == 'Whisper';
    })[0];
    msg.rate = 0.8;
    speechSynthesis.speak(msg);
}

function check(key, arr, type, up_range, down_range) {
    if (arr.length < 30)
        return;
    else {
        if (type == 'invoke') {
            var lastPoint = arr[arr.length - 1][1];
            var max = -Infinity;
            var min = Infinity;
            var total = 0;
            for (var i in arr) {
                if (arr[i][1] > max) max = arr[i][1];
                if (arr[i][1] < min) min = arr[i][1];
                total += +arr[i][1];
            }
            //去掉一个最大值和一个最小值
            total = total - max - min;
            var avg = total / (arr.length - 2);
            //(lastPoint-avg)/avg > upgange
            if (lastPoint > avg && (lastPoint - avg) / avg > up_range) {
                speak(key + "调用量飙升!")
            }
            if (lastPoint < avg && (avg - lastPoint) / avg > down_range) {
                speak(key + "调用量骤降!")
            }
        } else if (type == 'cpu') {
            var lastPoint = arr[arr.length - 1][1].average;
            //todo: make it configable
            if (lastPoint > 55) {
                speak(key + "超过55%！");
            }
        } else if (type == 'tp') {
            console.log("tp");
            var lastPoint = arr[arr.length - 1][1].tp99 == "" ? 0 : arr[arr.length - 1][1].tp99;
            var max = -Infinity;
            var min = Infinity;
            var total = 0;
            for (var i in arr) {
                var p = arr[i][1].tp99;
                if (p == "") p = 0;
                if (arr[i][1].tp99 > max) max = p;
                if (arr[i][1].tp99 < min) min = p;
                total += +p;
            }
            total = total - max - min;
            var avg = total / (arr.length - 2);
            if (lastPoint > avg && (lastPoint - avg) / avg > up_range) {
                // group+"组"+_interface+"的"+method+"方法
                var id = key.replace("组", "_").replace("的", "_").replace("方法", "");
                $("#" + id).css("color", "red");
                setTimeout(function () {
                    $("#" + id).css("color", "black");
                }, 60000);
                speak(key + "tp99性能明显变差!")
            }
        }
    }
}

