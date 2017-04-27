/**
 * Created by caohongming on 2016/11/2.
 */

var maxArray = [];
var cpuMaxObject = {};
var connectionsMaxObject = {};
var cpuavg = [];
var connectionsavg = [];
var param = GlobalUtils.GetRequest(location.search);
var time = param.time || '24.0', q_type = param.q_type || 1, ip = param.ip || '10.190.165.9', appId = param.appId || 6274;
var gotoPageMatcher = /^\s*XUI\.gotoPage\('\/(\d*)\/config\/group-(\d*)\/(\d*)'\)\s*;*\s*$/;
var downloadConfigMatcher = /^\s*XUI\.app\.configWindow\('(.*?)','(.*?)','(.*?)','(.*?)','(.*?)','(.*?)'\)\s*;*\s*$/;
var windowOpenMatcher = /^\s*XUI\.window\.open\('(.*)'\s*,\s*'(.*)'\)\s*;*\s*$/;

function task1(appId, next, arr, callback) {
    next = next || 1;
    arr = arr || [];
    console.log("正在获得 AppHostList 第" + next + "页");
    var ajaxSuccess = function (result) {
        result = $(result);
        result.find("table tbody tr").each(function () {
            var ip = ($(this).find("td:eq(2)").text() || "").trim();
            if (ip.match(/^10\..*/)) {
                arr.push({
                    hostId: $(this).find("td:first input").val(),
                    computerRoom: ($(this).find("td:eq(1)").text() || "").trim(),
                    hostIp: ip,
                    hostName: ($(this).find("td:eq(3)").text() || "").trim(),
                    url: $(this).find("td:last div a:first").attr("onclick").replace(windowOpenMatcher, "$2")///tools/browser/5E092CB6887839880A0CB1A9FA3412C8/fs
                });
            }
        });
        try {
            next = result.find(".page a[class='next']").attr("onclick").replace(/XUI.form.page\((\d+)\)/, '$1');
            result = null;
            if (next) {
                task1(appId, next, arr, callback);
            } else {
                callback(null, arr);
            }
        } catch (e) {
            callback(null, arr);
        }
    };
    $.ajax({
        type: 'POST',
        data: {id: appId, currentPage: next, orderField: "", orderFieldType: "", keyword: "", pageSize: 800},
        url: "http://deploy.jd.com/host/appHostList",
        cache: false,
        async: false,
        success: ajaxSuccess,
        error: callback
    });
}
function task2(callback) {
    var hostList = callback.getPreviousTaskResult() || [], count = 0;
    var count = 0;
    async.whilst(
        function () {
            return count < hostList.length;
        },
        function (callback) {
            console.log(count);
            var host = hostList[count++];
            var task = new jsFlow({isParallel: false});
            task.add(task21, window, host);
            task.add(task22, window, host);
            task.fire(function (result) {
                setTimeout(function () {
                    callback();
                }, 100);
            }, function (e) {
                callback(e);
            });
        },
        function (err, n) {
            callback(err, n);
        }
    );
}
function task21(host, callback) {
    var reqUrl = "http://mjdos.jd.com/monitor/d?ip=" + host.hostIp + "&period=" + time + "&t=" + h(host.hostIp + time) + "&type=1";
    console.log("正在获取：" + reqUrl);
    var callbackSuccess = function (res) {
        var cpudata = res.info['cpu.usage'][0].data, data = {};
        for (var i = 0, len = cpudata.length; i < len; i++) {
            var bean = cpudata[i];
            data[bean[0]] = bean[1]
        }
        var data = res.info['cpu.usage'][0].data, data = {};
        for (var i = 0, len = cpudata.length; i < len; i++) {
            var bean = cpudata[i];
            data[bean[0]] = bean[1]
        }
        var keys = Object.keys(data), cpumax = Math.max.apply(null, Object.values(data)), cpuarr = [], avg = arrAverageNum(Object.values(data));
        for (var i = 0, len = keys.length; i < len; i++) {
            if (data[keys[i]] == cpumax)
                cpuarr.push(keys[i]);
        }
        res = null;
        data = null;
        keys = null;

        var result = {max: cpumax, ip: host.hostIp, time: cpuarr, cpuavg: avg};
        var maxBean = cpuMaxObject[result.max];
        cpuavg.push(result.cpuavg);
        if (maxBean) {
            maxBean.push({ip: result.ip, time: result.time});
            cpuMaxObject[result.max] = maxBean;
        } else {
            cpuMaxObject[result.max] = [{ip: result.ip, time: result.time}];
        }
        maxBean = null;
        callback(null, {});
    };
    var callbackError = function (res) {
        console.log(res);
        callback(null, {max: -1, ip: host.hostIp, time: [], avg: 0});
    };
    $.ajax({
        type: 'get',
        url: reqUrl,
        dataType: "json",
        async: false,
        success: callbackSuccess,
        error: callbackError
    });
}
function task22(host, callback) {
    var reqUrl = "http://mjdos.jd.com/monitor/d?ip=" + host.hostIp + "&period=" + time + "&t=" + h(host.hostIp + time) + "&type=2";
    console.log("正在获取：" + reqUrl);
    var callbackSuccess = function (res) {
        var cpudata = res.info['tcp.connections'][0].data, data = {};
        for (var i = 0, len = cpudata.length; i < len; i++) {
            var bean = cpudata[i];
            data[bean[0]] = bean[1]
        }
        var data = res.info['tcp.connections'][0].data, data = {};
        for (var i = 0, len = cpudata.length; i < len; i++) {
            var bean = cpudata[i];
            data[bean[0]] = bean[1]
        }
        var keys = Object.keys(data), cpumax = Math.max.apply(null, Object.values(data)), cpuarr = [], avg = arrAverageNum(Object.values(data));
        for (var i = 0, len = keys.length; i < len; i++) {
            if (data[keys[i]] == cpumax)
                cpuarr.push(keys[i]);
        }
        res = null;
        data = null;
        keys = null;
        var result = {max: cpumax, ip: host.hostIp, time: cpuarr, connectionsavg: avg};
        var maxBean = connectionsMaxObject[result.max];
        connectionsavg.push(result.connectionsavg);
        if (maxBean) {
            maxBean.push({ip: result.ip, time: result.time});
            connectionsMaxObject[result.max] = maxBean;
        } else {
            connectionsMaxObject[result.max] = [{ip: result.ip, time: result.time}];
        }
        maxBean = null;
        callback(null, {});
    };
    var callbackError = function (res) {
        console.log(res);
        callback(null, {max: -1, ip: host.hostIp, time: [], avg: 0});
    };
    $.ajax({
        type: 'get',
        url: reqUrl,
        dataType: "json",
        async: false,
        success: callbackSuccess,
        error: callbackError
    });
}
var arrAverageNum = function (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
    }
    return (sum / arr.length * 100) / 100;
};
function start() {
    var task = new jsFlow({isParallel: false});
    task.add(task1, window, appId, 1, []);
    task.add(task2, window);
    task.fire(function (result) {
        console.log('所有任务执行完毕');
        var keys = Object.keys(cpuMaxObject), max = Math.max.apply(null, Object.values(keys));
        var avg = arrAverageNum(cpuavg);
        console.log("cpu max:\t" + max + "\t" + JSON.stringify(cpuMaxObject[max]));
        console.log("cpu avg:\t" + avg);
        for (var i = 0, len = keys.length; i < len; i++) {
            if (Number(keys[i]) >= 4) {
                console.log("cpu:\t" + keys[i] + "\t" + JSON.stringify(cpuMaxObject[keys[i]]));
            }
        }
        keys = Object.keys(connectionsMaxObject), max = Math.max.apply(null, Object.values(keys));
        var avg = arrAverageNum(connectionsavg);
        console.log(" connections max:\t" + max + "\t" + JSON.stringify(connectionsMaxObject[max]));
        console.log(" connections avg:\t" + avg);
        for (var i = 0, len = keys.length; i < len; i++) {
            if (Number(keys[i]) >= 4) {
                console.log("connections :\t" + keys[i] + "\t" + JSON.stringify(connectionsMaxObject[keys[i]]));
            }
        }
    }, function (e) {
        console.error('计算异常:' + JSON.stringify(e));
    });
}
