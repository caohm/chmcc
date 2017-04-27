/**
 * Created by caohongming on 2016/10/10.
 *
 *  一、 1、http://deploy.jd.com/8499/instance?currentPage=1&pageSize=10000&orderField=&orderFieldType=&keyword=  //获得实例列表
 *  二、 1、http://deploy.jd.com/host/telnetPort?id=8088727&domain=10.186.186.114&port=1601 //post
 *
 */
$(function () {
        var getDisable = function () {
            var disable = false;
            $(".header .btn").each(function () {
                if ($(this).hasClass("disabled")) {
                    disable = true;
                }
            });
            return disable;
        };
        var monitorArr = [
            {id: 8499, name: "trade-jos", hosts: "jos.trade.jd.local"},                         // no
            {id: 7499, name: "payship.sdk.jd.com", hosts: "payship.sdk.jd.local"},              //no
            {id: 6276, name: "trade.jd.com-v5", hosts: "trade.jd.v5.local"},
            {id: 6274, name: "trade.sdk.jd.com-v5", hosts: "trade.sdk.jd.v5.local"},
            {id: 3454, name: "address.sdk", hosts: "address.sdk.jd.com"},
            {id: 3211, name: "primitive_360buy_com", hosts: "primitive.360buy.com"},               // no
            {id: 3206, name: "vertical-trade-sdk-jd-com", hosts: "ertical.trade.sdk.jd.com"},      // no
            {id: 5681, name: "normalinvoice.sdk.jd.local", hosts: "normalinvoice.sdk.jd.local"},
            {id: 4745, name: "invoice.sdk.jd.com", hosts: "invoice.sdk.jd.local"},                //no
            {id: 3370, name: "primitive.jd.com", hosts: "primitive.jd.com"},
            {id: 2689, name: "easybuy.jd.com", hosts: "easybuy.jd.com"},
            {id: 2985, name: "s.trade", hosts: "s.trade.jd.com"}
        ];
        var instance = [];
        var instanceSync = [];
        var count = 0;
        var rollingCount = 0;
        var message_container = $(".message-container");
        var settings_container = $(".settings-container");
        var message = $(".message");
        var time = $(".time");
        var start = false;
        var interval;
        var statusDom = $(".check-item tbody");
        var canSpeak = true;
        var ignoreArr = [];
        var canScroll = true;
        var intervalTime = 15000;

        function syncGroupsAjax(id, next, arr, callback) {
            debugger;
            var loginError = function (err) {
                try {
                } catch (error) {
                }
            };
            var loginSuccess = function (result) {
                // debugger;
                var el = document.createElement('div').innerHTML = result;
                if (!arr) {
                    arr = [];
                }
                $(el).find('table tbody tr').each(function () {
                    var ip = $(this).find("td:eq(0)").text().trim();
                    var ignore = ["10.186.186.114", "10.190.5.64", "10.187.114.116", "10.186.186.123", "10.190.38.251", "10.190.38.252", "10.190.38.26", "10.190.38.27", "10.191.165.219", "10.191.165.220", "10.191.167.9", "10.191.32.214", "10.191.32.215", "10.191.94.153", "10.191.94.164", "10.191.94.170", "10.191.94.171", "10.191.94.168", "10.191.94.165", "10.191.94.169", "10.191.94.167", "10.191.94.172", "10.191.94.173", "10.191.94.184", "10.186.217.33", "10.187.98.191", "10.190.39.103", "10.190.5.102", "10.190.54.102", "10.190.85.217", "10.190.85.218", "10.190.85.219", "10.190.85.22", "10.190.85.220", "10.191.158.74", "10.191.158.81", "10.191.158.75", "10.191.158.82", "10.191.159.7", "10.191.159.8", "10.191.94.203", "10.191.94.204", "10.191.94.205", "10.191.94.208", "10.191.94.209", "10.191.94.210", "10.191.94.206", "10.191.94.212", "10.191.94.211", "10.191.94.220", "10.191.95.41", "10.191.95.43", "10.191.95.44", "10.191.95.46", "10.191.95.45", "10.191.95.47", "10.191.95.48", "10.191.95.49", "10.191.95.50", "10.191.95.59", "10.191.95.51", "10.191.95.60", "10.191.95.61", "10.191.95.63", "10.191.95.66", "10.191.95.64", "10.191.95.62", "10.191.95.65", "10.191.95.67"];
                    var in_ignore = false;
                    for (var w = 0; w < ignore.length; w++) {
                        if (ignore[w] == ip) {
                            in_ignore = true;
                        }
                    }
                    if (ip.match(/^10\..*/) && !in_ignore) {
                        arr.push({
                            ip: ip,
                            port: $(this).find("td:eq(2)").text().trim() || 1601,
                            inApp: $(this).find("td:eq(3) a").text().trim(),
                            inGroup: $(this).find("td:eq(4)").text().trim()
                        });
                    }
                });
                try {
                    var next = $(el).find(".page a[class='next']").attr("onclick").replace(/XUI.form.page\((\d+)\)/, '$1');
                    el = null;
                    if (next) {
                        syncGroupsAjax(id, next, arr, callback);
                    } else {
                        callback(arr);
                    }
                } catch (e) {
                    el = null;
                    callback(arr);
                }

            };
            if (!next) {
                next = 1;
            }
            $.ajax({
                type: 'GET',
                url: "http://deploy.jd.com/" + id + "/instance?currentPage=" + next + "&pageSize=1000&orderField=&orderFieldType=&keyword=",
                success: loginSuccess,
                error: loginError
            });
        }

        function portCheckAjax(bean, callback) {
            var portCheckError = function (err) {
                try {
                } catch (error) {
                }
            };
            var portCheckSuccess = function (result) {
                var checked = false;
                try {
                    if (result.indexOf("can connected") >= 0) {
                        checked = true;
                    }
                } catch (e) {
                    checked = false;
                }
                bean.checked = checked;
                callback(bean);
            };
            $.ajax({
                type: 'POST',
                url: "http://deploy.jd.com/host/telnetPort",
                data: {id: 7473441, domain: bean.ip, port: bean.port},
                success: portCheckSuccess,
                error: portCheckError
            })
            ;
        }

        $(".getGroup").on("click", function () {
            if (getDisable()) {
                return;
            } else {
                settings_container.hide();
                message_container.show();
                $(this).addClass("disabled");
                for (var i = 0; i < monitorArr.length; i++) {
                    syncGroupsAjax(monitorArr[i].id, 1, [], function (arr) {
                        debugger;
                        instanceSync.push(arr);
                        message.append("<li><span>info: 完成" + ++count + "个。</span></li>");
                        if (count == monitorArr.length) {
                            chrome.storage.local.get(function (iteams) {
                                var config = iteams.portSurvivalConfig;
                                config.appSdk = instanceSync;
                                chrome.storage.local.set({portSurvivalConfig: config}, function () {
                                    $(".getGroup").removeClass("disabled");
                                    message.append("<li><span>info: 获得分组信息完成 </span></li>");
                                    instance.push(instanceSync);
                                    instanceSync = [];
                                    initInstanceFromLocal();
                                });
                            });
                        }
                    });
                }
            }
        });
        $(".portCheck").on("click", function () {
            if (instance.length <= 0) {
                message.append("<li><span class='red'>error: 请先获得分组信息</span></li>");
                return;
            }
            if (getDisable() || start) {
                $(this).html("启动端口检测");
                start = false;
                clearInterval(interval);
                // statusDom.text("");
            } else {
                settings_container.hide();
                message_container.show();
                start = true;
                $(this).html("停止端口检测");
                chrome.tts.speak("已经启动端口检测", {'rate': 3.0, 'enqueue': true});
                message.append("<li><span>info: 已经启动端口检测</span></li>");
                initStatus();
                interval = setInterval(function () {
                    ++rollingCount;
                    initStatus();
                    message.append("<li><span>info: 第：" + rollingCount + "轮请求</span></li>" +
                        "<div rollingCount='" + rollingCount + "' class='message-group'>" +
                        "</div>");
                    var startTime = Number(new Date().valueOf());
                    for (var k = 0; k < instance.length; k++) {
                        if (!start) {
                            return;
                        }
                        for (var j = 0; j < instance[k].arr.length; j++) {
                            if (!start) {
                                return;
                            }
                            var message_group = $(".message-group[rollingCount='" + rollingCount + "'] ");
                            var gl = $("<li speaked=false inApp='" + instance[k].arr[j][0].inApp + "' inGroup='" + instance[k].arr[j][0].inGroup + "'>" +
                                "<div class='message-group-title' style='background-color: #00b7ee;color: #ffffff'>" +
                                "</div>" +
                                "<div class='message-group-ip' style='display: block;'></div>" +
                                "</li>");
                            message_group.append(gl);
                            for (var l = 0; l < instance[k].arr[j].length; l++) {
                                if ($.inArray(instance[k].arr[j][l].ip, ignoreArr) < 0) {
                                    portCheckAjax(instance[k].arr[j][l], function (res) {
                                        if (!start) {
                                            return;
                                        }
                                        if (res.checked) {
                                        } else {
                                            statusDom.find("div").each(function () {
                                                if ($(this).attr("app-name") == res.inApp) {
                                                    $(this).find("span:last").each(function () {
                                                        $(this).removeClass("green").removeClass("glyphicon-ok").addClass("red").addClass("glyphicon-remove");
                                                    });
                                                }
                                            });
                                            var mgl = message_group.find("li[inApp='" + res.inApp + "'][inGroup='" + res.inGroup + "']");
                                            var mglt = mgl.find(".message-group-title");
                                            var mgli = mgl.find(".message-group-ip");
                                            mgli.append("<span class=''>IP：</span><span class='red'>" + res.ip + ":" + res.port + "</span>");
                                            if (canSpeak && mgl.attr("speaked") == "false") {
                                                mgl.attr("speaked", "true");
                                                mglt.append("<span class=''>应用：</span><span class=''>" + res.inApp + "</span><span class=''>分组：</span><span class=''>" + res.inGroup + "</span>");
                                                try {
                                                    chrome.tts.speak(res.inApp + res.inGroup + "异常", {
                                                        'rate': 3.0,
                                                        'enqueue': true
                                                    });
                                                } catch (e) {
                                                }
                                            }
                                            if (canScroll) {
                                                message[0].scrollTop = message[0].scrollHeight;
                                            }
                                        }
                                        time.text("耗时：" + (  Number(new Date().valueOf()) - startTime) + "毫秒");
                                    });
                                }
                            }
                        }
                    }
                }, intervalTime);
            }
        });
        $(".clearLog").on("click", function () {
            message.html("");
            rollingCount = 0;
            time.text("");
            statusDom.text("");
        });
        $(".settings").on("click", function () {
            message_container.hide();
            settings_container.show();
            initSttingsPage();
        });
        $("#addIpConfig-type").on("change", function () {
            var type = $(this).val();
            if (!type && type == "请选择类型") {
                $(".textarea-IpConfig").val("");
                return;
            }
            try {
                chrome.storage.local.get(function (items) {
                    $(".textarea-IpConfig").val(items.portSurvivalConfig[type]);
                });
            } catch (e) {
            }
        });
        $(".addIpConfig-Submit").on("click", function () {
            // debugger;
            var $tip = $(".addIpConfig-tip");
            var $type = $("#addIpConfig-type").val();
            if (!$type && type == "请选择类型") {
                $tip.html("请选择类型");
                return;
            }
            var configStr = $(".textarea-IpConfig").val();
            try {
                var configArr = JSON.parse(configStr);
                if (!(configArr.length == 0 || (configArr[0] && configArr[0][0] && configArr[0][0].ip))) {
                    $tip.html("格式为数组套数组");
                    return;
                }
                chrome.storage.local.get(function (iteams) {
                    var config = iteams.portSurvivalConfig;
                    config[$type] = configArr;
                    chrome.storage.local.set({portSurvivalConfig: config}, function () {
                        initInstanceFromLocal();
                        $tip.html("保存成功");
                    });
                });
            } catch (e) {
                $tip.html("格式为JSON数组");
            }
        });
        $(".ignoreIpConfig-Submit").on("click", function () {
            // debugger;
            var $tip = $(".ignoreIpConfig-tip");
            var configStr = $(".textarea-ignoreIpConfig").val();
            try {
                var configArr = JSON.parse(configStr);
                chrome.storage.local.get(function (iteams) {
                    var config = iteams.portSurvivalConfig;
                    config.ignore = configArr;
                    chrome.storage.local.set({portSurvivalConfig: configStr}, function () {
                        $tip.html("保存成功");
                    });
                });

            } catch (e) {
                $tip.html("格式为JSON");
            }
        });
        $(".settings-return").on("click", function () {
            message_container.show();
            settings_container.hide();
        });
        $(".speak").on("click", function () {
            canSpeak = !canSpeak;
            if (canSpeak) {
                $(this).html("关闭声音");
            } else {
                $(this).html("开启声音");
            }
        });
        var initStatus = function () {
            statusDom.html("");
            for (var m = 0; m < instance.length; m++) {
                var tem = instance[m].arr || [];
                var statusTrDom = $("<tr><td class='status-contianer ' style='width: 50px'><div >" + instance[m].name + "</div></td></tr>");
                var statusTdDom = $("<td></td>");
                for (var b = 0; b < tem.length; b++) {
                    var temp = tem[b];
                    statusTdDom.append("<div class='status-span'style='float: left;' app-name='" + temp[0].inApp + "'><apan>" + temp[0].inApp + "</apan><span class='green glyphicon glyphicon-ok' style='margin-right: 20px'></apan></div>");
                }
                statusTrDom.append(statusTdDom);
                statusDom.append(statusTrDom);
            }
        };
        var initSttingsPage = function () {
            $("#addIpConfig-type").val("请选择类型").trigger("change");
            $(".addIpConfig-tip").html("");
            $(".ignoreIpConfig-tip").html("");
            chrome.storage.local.get(function (items) {
                $(".textarea-ignoreIpConfig").val(items.portSurvivalConfig.ignore);
            });
        };
        var initInstanceFromLocal = function () {
            try {
                chrome.storage.local.get(function (items) {
                    // debugger;
                    instance = [];
                    putArrInstance({name: "appSdk", arr: JSON.parse(items.portSurvivalConfig.appSdk || "[]")});
                    putArrInstance({name: "nginx", arr: JSON.parse(items.portSurvivalConfig.nginx || "[]")});
                    putArrInstance({name: "mysql", arr: JSON.parse(items.portSurvivalConfig.mysql || "[]")});
                    putArrInstance({name: "redis", arr: JSON.parse(items.portSurvivalConfig.redis || "[]")});
                    putArrInstance({name: "jsf", arr: JSON.parse(items.portSurvivalConfig.jsf || "[]")});
                    var ignore = items.portSurvivalConfig.ignore;
                    if (ignore) {
                        ignoreArr = JSON.parse(ignore || "[]");
                    }
                });
            } catch (e) {
            }
            var putArrInstance = function (param) {
                if (param) {
                    instance.push(param);
                }
            };
        };
        initInstanceFromLocal();
    }
);
