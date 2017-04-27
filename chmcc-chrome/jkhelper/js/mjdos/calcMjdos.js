/**
 * Created by caohongming on 2016/9/30.
 */
"use strict";
var jkHelper = jkHelper || {
        tablename: "mjdos_" + GlobalUtils.componentizeUrl(window.location.href).path.replace("/gresource/", "")
    };
var threshold = {cpu: 5, mem: 35, tcp: 1000};
jkHelper.addOptionToSelect = function () {
    $('select[name=\'table_length\']').append('<option value=\'500\'>500</option>');
};
jkHelper.changeBigArea = function () {
    var header_display = $('.main-header').css('display')
    if (header_display && header_display == "none") {
        $('.main-header').css('display', 'block');
        $('.main-sidebar').css('display', 'block');
        $('.toolbar').css('display', 'block').next().css('display', 'block');
        $('.content-wrapper').css('margin-left', '0px');
        $('#table ').css('width', '100%');
        $('.main-footer').css('display', 'block');
        // $('.wrapper').css('display', 'block');
    } else {
        $('.main-header').css('display', 'none');
        $('.main-sidebar').css('display', 'none');
        $('.toolbar').css('display', 'none').next().css('display', 'none');
        $('.content-wrapper').css('margin-left', '0px');
        $('#table ').css('width', '100%');
        $('.main-footer').css('display', 'none');
        // $('.wrapper').css('display', 'none');
    }
};
jkHelper.initDb = function () {
    jkHelper.db = {};
    try {
        if (!window.openDatabase) {
            console.log('db not supported');
        } else {
            var shortName = 'jkHelperDb';
            var version = '3.0';
            var displayName = 'jkHelperDb offline database';
            var maxSize = 65536;
            jkHelper.db = openDatabase(shortName, version, displayName, maxSize);
        }
    } catch (e) {
        if (e == INVALID_STATE_ERR) {
            console.log("Invalid database version.");
        } else {
            console.log(error.source + ":" + error.message);
        }
    }
};
jkHelper.createTable = function () {
    jkHelper.db.transaction(
        function (transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS  ' + jkHelper.tablename + ' (date Date,cpuM INTEGER,cpuA INTEGER,memM INTEGER,memA INTEGER,ioiM INTEGER,ioiA INTEGER,iooM INTEGER,iooA INTEGER,loadM INTEGER,loadA INTEGER,tcpM INTEGER,tcpA INTEGER)',
                [], function (result) {
                }, function (transaction, error) {
                    console.log(error.source + ":" + error.message);
                });
        }
    );
};
jkHelper.dropDb = function () {
    jkHelper.db.transaction(function (transaction) {
        transaction.executeSql("DROP TABLE   " + jkHelper.tablename + " ", [], function (transaction, error) {
            console.log(error.source + ":" + error.message);
        });
    });
};
jkHelper.addData = function (date, cpuM, cpuA, memM, memA, ioiM, ioiA, iooM, iooA, loadM, loadA, tcpM, tcpA) {
    jkHelper.db.transaction(function (transaction) {
        transaction.executeSql("INSERT INTO   " + jkHelper.tablename + "  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [date, cpuM, cpuA, memM, memA, ioiM, ioiA, iooM, iooA, loadM, loadA, tcpM, tcpA], function (transaction, rs) {
        }, function (transaction, error) {
            console.log(error.source + ":" + error.message);
        });
    });
};
jkHelper.getData = function (sql, param) {
    var sql = sql || "SELECT * FROM   " + jkHelper.tablename;
    var param = param || [];
    jkHelper.db.transaction(
        function (transaction) {
            transaction.executeSql(sql, param, function (transaction, rs) {
                for (var i = 0; i < rs.rows.length; i++) {
                    var bean = rs.rows.item(i);
                    var log = "";
                    for (var key in bean) {
                        log += key + ": " + bean[key] + " ";
                    }
                    console.log(log);
                }
            }, function (transaction, error) {
                console.log(error.source + ":" + error.message);
            });
        });
};
jkHelper.deleteData = function (date) {
    jkHelper.db.transaction(
        function (transaction) {
            transaction.executeSql('DELETE FROM ' + jkHelper.tablename + ' where date=?', [date],
                function (result) {
                }, function (transaction, error) {
                    console.log(error.source + ":" + error.message);
                });
        });
};
function getNumber(value) {
    try {
        if (value.indexOf("N") >= 0 || value.indexOf("n") >= 0) {
            return 0.00
        }
        return Number(value);
    } catch (e) {
        return 0.00;
    }

}
jkHelper.calc = function () {
    // debugger;
    var url = "http://mjdos.jd.com/gresource/list/4994?draw=2 &columns[0][data]=id &columns[1][data]=ip &columns[2][data]=ext_info.idc &columns[3][data]=metrics.cpu &columns[4][data]=metrics &columns[5][data]=metrics &columns[6][data]=metrics &columns[7][data]=metrics.tcp &columns[8][data]=metrics &start=0 &length=500";
    var start = new Date().valueOf();
    jkHelper.calclate.count++;
    // $("table tbody tr:eq(0) td:eq(1)").attr("old", true);
    $("select[name='table_length']").val("500").trigger("change");
    // while (!$("table tbody tr:eq(0) td:eq(1)").attr("old")) {
    // }
    $("table tbody tr").each(function () {
        var ip = $(this).find('td:eq(1) a:eq(0)').text();
        var cpu = getNumber($(this).find('td:eq(3) span:eq(0)').text());
        var mem = getNumber($(this).find('td:eq(4) span:eq(1)').text());
        var ioI = getNumber($(this).find('td:eq(5) span:eq(1)').text());
        var ioO = getNumber($(this).find('td:eq(5) span:eq(3)').text());
        var load = getNumber($(this).find('td:eq(6) span:eq(3)').text());
        var tcp = getNumber($(this).find('td:eq(7) span:eq(0)').text());
        if (cpu > threshold.cpu) {
            console.error('-------------------------警告：IP:' + ip + ' 超出警戒值' + threshold.cpu + '！ cpu:' + cpu + '-----------------------------')
        }
        if (mem > threshold.mem) {
            console.error('-------------------------警告：IP:' + ip + ' 超出警戒值' + threshold.mem + '！ mem:' + mem + '-----------------------------')
        }
        if (tcp > threshold.tcp) {
            console.error('-------------------------警告：IP:' + ip + ' 超出警戒值' + threshold.tcp + '！ tcp:' + tcp + '-----------------------------')
        }
        jkHelper.calclate.cpu.push(cpu);
        jkHelper.calclate.mem.push(mem);
        jkHelper.calclate.ioI.push(ioI);
        jkHelper.calclate.ioO.push(ioO);
        jkHelper.calclate.load.push(load);
        jkHelper.calclate.tcp.push(tcp);
    });
    if (jkHelper.calclate.count >= jkHelper.setIntervalTimes) {
        jkHelper.calclate.count = 0;
        var cpuA = jkHelper.arrAverageNum(jkHelper.calclate.cpu).toFixed(8);
        var memA = jkHelper.arrAverageNum(jkHelper.calclate.mem).toFixed(8);
        var ioIA = jkHelper.arrAverageNum(jkHelper.calclate.ioI).toFixed(8);
        var ioOA = jkHelper.arrAverageNum(jkHelper.calclate.ioO).toFixed(8);
        var loadA = jkHelper.arrAverageNum(jkHelper.calclate.load).toFixed(8);
        var tcpA = jkHelper.arrAverageNum(jkHelper.calclate.tcp).toFixed(8);
        var cpuM = Math.max.apply(null, jkHelper.calclate.cpu);
        var memM = Math.max.apply(null, jkHelper.calclate.mem);
        var ioIM = Math.max.apply(null, jkHelper.calclate.ioI);
        var ioOM = Math.max.apply(null, jkHelper.calclate.ioO);
        var loadM = Math.max.apply(null, jkHelper.calclate.load);
        var tcpM = Math.max.apply(null, jkHelper.calclate.tcp);
        console.log(cpuM, cpuA, memM, memA, ioIM, ioIA, ioOM, ioOA, loadM, loadA, tcpM, tcpA);
        jkHelper.addData(new Date(), cpuM, cpuA, memM, memA, ioIM, ioIA, ioOM, ioOA, loadM, loadA, tcpM, tcpA);
        jkHelper.initCalculate();
    }
    var end = new Date().valueOf();
    // console.log("本次计算花费时间 :" + (end - start));
};
jkHelper.arrAverageNum = function (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return (sum / arr.length * 100) / 100;
};
jkHelper.initCalculate = function () {
    jkHelper.calclate = {cpu: [], mem: [], ioI: [], ioO: [], load: [], tcp: [], count: 0};
};
jkHelper.startCalc = function () {
    if (jkHelper.calcTimer) {
        console.log("timer already exists!");
        return;
    }
    jkHelper.initDb();
    jkHelper.createTable();
    jkHelper.initCalculate();
    jkHelper.calcTimer = setInterval(jkHelper.calc, jkHelper.setInterval);
};
jkHelper.reStartCalc = function () {
    jkHelper.stopCalc();
    jkHelper.startCalc();
};
jkHelper.stopCalc = function () {
    clearInterval(jkHelper.calcTimer);
};
jkHelper.setThreshold = function (cpu, mem, tcp) {
    threshold = {cpu: cpu, mem: mem, tcp: tcp};
};
jkHelper.addOptionToSelect();
if (jkHelper.autoBigArea) {
    setTimeout(function () {
        jkHelper.changeBigArea();
        jkHelper.startCalc();
    }, 2000)
    }
$("title").html($(".content-header h1 ").html().match(/.*监控分组\[<b>(.*)<\/b>\]下的资源.*/)[1].replace(/^2016双11硬件监控-/, ""));

