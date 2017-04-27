var jkhelper = {};
chrome.storage.local.get(function (itmes) {
    jkhelper.autoSyncGroups = itmes.autoSyncGroups;
    jkhelper.autoSyncGroupsUrl = itmes.autoSyncGroupsUrl;
    jkhelper.useCustomGroup = itmes.useCustomGroup;
    jkhelper.autoBigArea = itmes.autoBigArea;
    jkhelper.setInterval = itmes.setInterval || 10000;
    jkhelper.setIntervalTimes = itmes.setIntervalTimes || 3;
    jkhelper.currentGroup = "23";
    jkhelper.autoStart = false;
    jkhelper.groups = itmes.settings_groups;
    for (var i = 0; i < jkhelper.groups.length; i++) {
        var groupName = jkhelper.groups[i];
        jkhelper[groupName] = itmes[groupName];
    }
});
var db = openDatabase('jkhelper', '', 'this is jkhelper', 102400);


$(function () {
    jkhelper.arrAverageNum = function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return (sum / arr.length * 100) / 100;
    };
    jkhelper.calc = function (array) {
        var res = {};
        res.avg = jkhelper.arrAverageNum(array).toFixed();
        res.max = Math.max.apply(null, array);
        return res;
    };
    jkhelper.initCalclate = function () {
        jkhelper.calclate = {
            cpu: [],
            mem: [],
            ioin: [],
            ioout: [],
            load5: [],
            tcp: [],
            count: 0
        };
    };
    if (jkhelper.autoSyncGroups) {
        function httpRequest(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    callback(xhr.responseText);
                }
            };
            xhr.send();
        }

        function showWeather(result) {
            var el = document.createElement('div');
            el.id = "group";
            el.innerHTML = result;
            el.style.display = "none";
            document.body.appendChild(el);
            $("#group").css("display", "none");
            var groups = [];
            $(".cotBox ").each(function () {
                var group_name = $(this).find(".txt_box").text();
                var group_type = $(this).find("p span").text();
                var group_ips = $(this).find("p").text();
                var ips = [];
                if (group_type && group_type == "预") {
                } else {
                    var array = group_ips.replace(" ", "").split('\n');
                    var size = array.length, i;
                    for (i = 0; i < size; i++) {
                        var ip = array[i].trim();
                        if (ip) {
                            ips.push(ip);
                        }
                    }
                    groups.push(group_name);
                    var obj = {};
                    obj[group_name] = ips;
                    chrome.storage.local.set(obj,
                        function () {
                            console.log("save success");
                        }
                    )
                }
            });
            el.innerHTML = "";
            chrome.storage.local.set({
                    settings_groups: groups
                },
                function () {
                    console.log("save success");
                }
            );
        }

        httpRequest(jkhelper.autoSyncGroupsUrl, showWeather);
    }
    if (jkhelper.autoBigArea) {
        $(".main-header").css('display', 'none');
        $(".main-sidebar").css('display', 'none');
        $(".content-header").css('display', 'none');
        $(".toolbar").css('display', 'none');
        $(".content-wrapper").css('margin-left', '0px');
        $("#table ").css('width', '100%');
        $(".main-footer").css('display', 'none');
        $("select[name='table_length']").append("<option value='200'>200</option>");
        $("select[name='table_length']").val("200").trigger('change');
    }
    if (jkhelper.useCustomGroup) {
        jkhelper.tablename = "mjdos_" + jkhelper.currentGroup;
    } else {
        var data = GlobalUtils.componentizeUrl(window.location.href);
        jkhelper.tablename = "mjdos_" + data.path.replace("/gresource/", "");
    }
    jkhelper.initdb = function () {
        db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS  ' + jkhelper.tablename + ' (date TEXT,cpu_max TEXT,cpu_avg TEXT,mem_max TEXT,mem_avg TEXT,ioi_max TEXT,ioi_avg TEXT,ioo_max TEXT,ioo_avg TEXT,load_max TEXT,load_avg TEXT,tcp_max TEXT,tcp_avg TEXT)', []);
            }
        );
    };
    jkhelper.dropdb = function () {
        db.transaction(function (tx) {
                tx.executeSql('DROP TABLE   ' + jkhelper.tablename + ' ', []);
            }
        );
    };
    jkhelper.getAllData = function () {
        db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM   ' + jkhelper.tablename + ' ', [], function (tx, rs) {
                    for (var i = 0; i < rs.rows.length; i++) {
                        var bean = rs.rows.item(i);
                        console.log(" date " + bean.date.replace('GMT+0800 (中国标准时间)', "") + " cpu_max " + bean.cpu_max + " cpu_avg " + bean.cpu_avg + " mem_max " + bean.mem_max + " mem_avg " + bean.mem_avg + " ioi_max " + bean.ioi_max + " ioi_avg " + bean.ioi_avg + " ioo_max " + bean.ioo_max + " ioo_avg " + bean.ioo_avg + " load_max " + bean.load_max + " load_avg " + bean.load_avg + " tcp_max " + bean.tcp_max + " tcp_avg " + bean.tcp_avg)
                    }
                });
            }
        );
    };
    jkhelper.addData = function (date, cpu_max, cpu_avg, mem_max, mem_avg, ioi_max, ioi_avg, ioo_max, ioo_avg, load_max, load_avg, tcp_max, tcp_avg) {
        db.transaction(function (tx) {
                tx.executeSql('INSERT INTO   ' + jkhelper.tablename + '  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [date, cpu_max, cpu_avg, mem_max, mem_avg, ioi_max, ioi_avg, ioo_max, ioo_avg, load_max, load_avg, tcp_max, tcp_avg], function (tx, rs) {
                        console.log("成功保存数据!");
                    },
                    function (tx, error) {
                        console.log(error.source + "::" + error.message);
                    });
            }
        );
    };
    jkhelper.initdb();
    jkhelper.initCalclate();
    setInterval(function () {
        jkhelper.calclate.count++;
        $("select[name='table_length']").val("200").trigger('change');
        $("table tbody tr").each(function () {
            jkhelper.calclate.cpu.push(Number($($(this).children()[3]).children().text()));
            jkhelper.calclate.mem.push(Number($($($(this).children()[4]).children()[1]).text()));
            jkhelper.calclate.ioin.push(Number($($($(this).children()[5]).children()[1]).text()));
            jkhelper.calclate.ioout.push(Number($($($(this).children()[5]).children()[3]).text()));
            jkhelper.calclate.load5.push(Number($($($(this).children()[6]).children()[3]).text()));
            jkhelper.calclate.tcp.push(Number($($(this).children()[7]).children().text()));
        });
        if (jkhelper.calclate.count >= jkhelper.setIntervalTimes) {
            jkhelper.calclate.count = 0;
            var cpub = jkhelper.calc(jkhelper.calclate.cpu);
            var memb = jkhelper.calc(jkhelper.calclate.mem);
            var ioinb = jkhelper.calc(jkhelper.calclate.ioin);
            var iooutb = jkhelper.calc(jkhelper.calclate.ioout);
            var load5b = jkhelper.calc(jkhelper.calclate.load5);
            var tcpb = jkhelper.calc(jkhelper.calclate.tcp);
            console.log(" cpub.max: " + cpub.max + " cpub.avg: " + cpub.avg + " memb.max: " + memb.max + " memb.avg: " + memb.avg + " ioinb.max: " + ioinb.max + " ioinb.avg: " + ioinb.avg + " iooutb.max: " + iooutb.max + " iooutb.avg: " + iooutb.avg + " load5b.max: " + load5b.max + " load5b.avg: " + load5b.avg + " tcpb.max: " + tcpb.max + " tcpb.avg: " + tcpb.avg)
            jkhelper.addData(new Date(), cpub.max, cpub.avg, memb.max, memb.avg, ioinb.max, ioinb.avg, iooutb.max, iooutb.avg, load5b.max, load5b.avg, tcpb.max, tcpb.avg);
            jkhelper.initCalclate();
        }
    }, jkhelper.setInterval);
});