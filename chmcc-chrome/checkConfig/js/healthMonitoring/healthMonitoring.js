/**
 *
 应用配置文件：
 http://deploy.jd.com/app?_=1475038302287
 http://deploy.jd.com/6274/group?_=1475038416448
 http://deploy.jd.com/6274/config/group-47656/1166703?_=1475038448558
 $.post("http://deploy.jd.com/6276/config/view-113926",{type:'group',reType:'download',filePath:'WEB-INF/classes/properties/monitorconfig.properties',attachment:true},function(result){
    console.log(result);pullstatus.html(result);;
  });
 tomcat配置列表
 http://deploy.jd.com/host/appHostList?id=6274&_=1475038615606
 http://deploy.jd.com/tools/browser/F1E631ED3DA1FDBD0A0CB1A9FA3412C8/fs?_=1475038760997
 http://deploy.jd.com/tools/browser/980C22E7D83B58CAEFC31140688374245F488388F3B2C4D02B2845709505FDC020D1400D2BFA4B296876A78187264F612279DBABE66DCCDAB89DBF5CA3FA87B92D9D4367019E6DD3/fs.json?onlyIncludeDir=false&id=&_=1475038761259
 http://deploy.jd.com/tools/browser/980C22E7D83B58CAEFC31140688374245F488388F3B2C4D07C685C36F08153A0917E7845801E0B9A9D5879C6EBD5B831A3B14A040A4BF6BD500F5E0787AD3BC3F1D0C7A0765B37CE3AAC122B2FC12F61/fs.json?onlyIncludeDir=false&id=&_=1475038761259
 http://deploy.jd.com/tools/browser/980C22E7D83B58CAEFC31140688374245F488388F3B2C4D07C685C36F08153A0917E7845801E0B9A9D5879C6EBD5B831A3B14A040A4BF6BD500F5E0787AD3BC3F1D0C7A0765B37CE3AAC122B2FC12F61/fs.json?id:'/bin'&onlyIncludeDir:false
 http://deploy.jd.com/tools/viewFile/980C22E7D83B58CAEFC31140688374245F488388F3B2C4D07C685C36F08153A0917E7845801E0B9A9D5879C6EBD5B831A3B14A040A4BF6BD500F5E0787AD3BC3F1D0C7A0765B37CE3AAC122B2FC12F61?id:'/bin/start.sh'&appId='6274'
 http://deploy.jd.com/tools/browser/980C22E7D83B58CAEFC31140688374245F488388F3B2C4D07C685C36F08153A0917E7845801E0B9A9D5879C6EBD5B831A3B14A040A4BF6BD500F5E0787AD3BC3F1D0C7A0765B37CE3AAC122B2FC12F61/fs.json?id:'/conf'&onlyIncludeDir:false
 http://deploy.jd.com/tools/viewFile/980C22E7D83B58CAEFC31140688374245F488388F3B2C4D07C685C36F08153A0917E7845801E0B9A9D5879C6EBD5B831A3B14A040A4BF6BD500F5E0787AD3BC3F1D0C7A0765B37CE3AAC122B2FC12F61?id='/conf/context.xml'&appId='6274'
 http://deploy.jd.com/tools/viewFile/980C22E7D83B58CAEFC31140688374245F488388F3B2C4D07C685C36F08153A0917E7845801E0B9A9D5879C6EBD5B831A3B14A040A4BF6BD500F5E0787AD3BC3F1D0C7A0765B37CE3AAC122B2FC12F61?id:'/conf/logging.properties'&appId='6274'&head=false&lines=1000
 nginx
 http://bmt.jd.com/customer/app_server?app_key=trade.sdk.jd.com-v5
 http://bmt.jd.com/customer/query/mission_create/?ip_list=%5B%2210.189.47.100%22%5D&query_tag=query_conf_nginx   post
 [<form action=?"/?customer/?query/?mission_create/?" method=?"post" target=?"_blank">?<input type=?"hidden" name=?"ip_list" value=?"["10.189.47.100"]?">?<input type=?"hidden" name=?"query_tag" value=?"query_conf_nginx">?</form>?]
 http://bmt.jd.com/customer/query/ajax_mission_status?id=73772843
 http://bmt.jd.com/customer/query/mission_getdata?id=73772843

 http://deploy.jd.com/host/download?file=/export/Domains/trade.sdk.jd.v5.local/server1/bin/start.sh&appId=6274&hostId=8128035
 http://deploy.jd.com/host/download?file=/export/Domains/trade.sdk.jd.v5.local/server1/&appId=6274&hostId=8128035
 */
var deploy = {
    app: {
        ids: [6276]
    },
    tomcat: {
        ids: [6276]
    },
    nginx: {
        app_key: ['trade.sdk.jd.com-v5']
    }
};
var pullstatus;
var statusDom;
var sumScore = 0;
function start() {
    //debugger;
    function getCheckId(callback) {
        CheckConfiger.getData("select max(checkId) as checkId from CheckConfiger", [], function (err, transction, rs) {
            try {
                if (rs || rs.rows || rs.rows.length > 0) {
                    CheckConfiger.checkId = Number(rs.rows[0].checkId || 0) + 1;
                }
            } catch (e) {
                CheckConfiger.checkId = 1;
            }
            callback();
        });
    }

    function task1(path, callback) {
        console.log("正在清理文件系统");
        pullstatus.html("正在清理文件系统");
        CheckConfiger.fs.cleanfs(path, function (err) {
            if (err) {
                callback(null, false);
            } else {
                callback(null, true);
            }
        });
    }

    function task2(arr, callback) {
//         debugger;
        var count = 0;
        statusDom.html(sumScore);
        async.whilst(
            function () {
                return count < arr.length;
            },
            function (callback) {
                var appId = arr[count++];
                console.log("正在处理 app appId: " + appId + "");
                pullstatus.html("正在处理 app appId: " + appId + "");
                var task = new jsFlow({isParallel: false});
                task.add(task21, window, appId, 1, []);
                task.add(task22, window);
                task.fire(function (result) {
                    console.log('task2循环任务执行完毕');
                    pullstatus.html('task2循环任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                callback(null);
            }
        );
    }

    function task21(appId, next, arr, callback) {
        next = next || 1;
        arr = arr || [];
        console.log("正在获得 AppGroupList 第" + next + "页");
        pullstatus.html("正在获得 AppGroupList 第" + next + "页");
        var ajaxError = function (err) {
            callback(err);
        };
        var ajaxSuccess = function (result) {
            //debugger;
            result = $(result);
            result.find('table tbody tr').each(function () {
                var id = $(this).find("td:first").text().trim();
                var matchArr, name = $(this).find("td:eq(1)").text().trim();
                if (name.indexOf("预") < 0 && name.indexOf("物理机") < 0 && name.indexOf("暂不上线") < 0 && name.indexOf("压测") < 0 && (matchArr = $(this).find("td:last div:first a:first").attr("onclick").match(gotoPageMatcher))) {
                    arr.push({
                        id: id,
                        name: name,
                        pageUrl: "/" + matchArr[1] + "/config/group-" + matchArr[2] + "/" + matchArr[3],
                        appId: matchArr[1],
                        groupId: matchArr[2],
                        configId: matchArr[3]
                    });
                }
            });
            try {
                next = result.find(".page a[class='next']").attr("onclick").replace(/XUI.form.page\((\d+)\)/, '$1');
                result = null;
                if (next) {
                    task21(appId, next, arr, callback);
                } else {
                    callback(null, arr)
                }
            } catch (e) {
                callback(null, arr)
            }
        };
        $.ajax({
            type: 'POST',
            data: {view: "", currentPage: next, orderField: "", orderFieldType: "", keyword: "", pageSize: 500},
            url: CheckConfiger.appConfig.contentPath + "/" + appId + "/group",
            cache: false,
            async: false,
            success: ajaxSuccess,
            error: ajaxError
        });
    }

    function task22(callback) {
        //debugger;
        var groupUrlList = callback.getPreviousTaskResult() || [];
        console.log("共获得 AppGroupList " + groupUrlList.length + "");
        var count = 0;
        async.whilst(
            function () {
                return count < groupUrlList.length;
            },
            function (callback) {
                var pageUrl = groupUrlList[count++];
                if (CheckConfiger.status == "stop")
                    return;
                var dir = "app/" + pageUrl.appId + "/" + pageUrl.groupId + "/" + pageUrl.configId;
                var task = new jsFlow({isParallel: false});
                task.add(task221, window, dir);
                task.add(task222, window, pageUrl);
                task.add(task223, window);
                task.fire(function (result) {
                    console.log('task22循环任务执行完毕');
                    pullstatus.html('task22循环任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                callback(null);
            }
        );
    }

    function task221(dir, callback) {
        console.log("正在创建目录 " + dir + "");
        pullstatus.html("正在创建目录 " + dir + "");
        CheckConfiger.fs.mkdirs(dir, function (err) {
            callback(null)
        });
    }

    function task222(pageUrl, callback) {
        var url = CheckConfiger.appConfig.action.configList(pageUrl.pageUrl);
        console.log("正在请求 " + url + "");
        pullstatus.html("正在请求 " + url + "");
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            async: false,
            dataType: "html",
            success: function (result) {
                var array = [];
                $(result).find("table tbody tr").each(function () {
                    //XUI.app.configWindow('6274','1139627','group','WEB-INF/web.xml','','false')
                    var arr, onclick = $(this).find("td:last div a:first").attr("onclick");
                    if (onclick && ( arr = onclick.match(downloadConfigMatcher) ) && (arr && arr[4].indexOf("struts") < 0) && (arr[4].indexOf('ehcache') < 0)) {
                        array.push({
                            appId: arr[1],
                            configId: arr[2],
                            groupId: pageUrl.groupId,
                            type: arr[3],
                            filePath: arr[4],
                            encoding: arr[5],
                            attachment: arr[6]
                        });
                    }
                });
                callback(null, array);
            },
            failure: function (result) {
                callback(result);
            }
        });
    }

    function task223(callback) {
        var configList = callback.getPreviousTaskResult() || [];
        CheckConfiger.appConfig.currentServiceProperties = {};
        console.log("获得文件列表 " + configList.length + "");
        pullstatus.html("获得文件列表 " + configList.length + "");
        var count = 0;
        async.whilst(
            function () {
                return count < configList.length;
            },
            function (callback) {
                var configBean = configList[count++];
                if (CheckConfiger.status == "stop")
                    return;
                configBean.type = "app";
                var task = new jsFlow({isParallel: false});
                task.add(task2231, window, configBean);
                task.add(resolveAppConfig, window);
                task.add(task2233, window);
                task.fire(function (result) {
                    console.log('task223循环任务执行完毕');
                    pullstatus.html('task223循环任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
//         debugger;
                callback(null);
            }
        );
    }

    function task2231(param, callback) {
        console.log("正在下载文件 " + param.filePath + "");
        pullstatus.html("正在下载文件 " + param.filePath + "");
        $.ajax({
            url: CheckConfiger.appConfig.contentPath + "/" + param.appId + "/config/view-" + param.configId,
            data: {type: "group", reType: "download", filePath: param.filePath, encoding: param.encoding},
            type: "post",
            dataType: "text",
            async: false,
            cache: true,
            success: function (txt) {
                //debugger;
                var arr = param.filePath.split('/');
                callback(null, {
                    path: param.filePath.replace(arr[arr.length - 1], ''),
                    name: arr[arr.length - 1],
                    content: txt,
                    appId: param.appId,
                    configId: param.configId,
                    encoding: param.encoding,
                    filePath: param.filePath,
                    groupId: param.groupId,
                    type: param.type
                });
            }
        });
    }

    function resolveAppConfig(callback) {
        if (CheckConfiger.status == "stop")
            return;
        var file = callback.getPreviousTaskResult() || {}, type = CheckConfiger.getFileType(file);
        console.log("正在解析文件 " + file.filePath + "");
        pullstatus.html("正在解析文件 " + file.filePath + "");
        switch (type) {
            case "html":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            case "properties":
                if (CheckConfiger.status == "stop")
                    break;
                var properties = file.content.split("\n");
                for (var j = 0; j < properties.length; j++) {
                    var prop = properties[j];
                    var regexp = /^(.*)\s*=\s*(.*)\s*$/;
                    if (!prop.match(/^\s*#/) && prop.match(regexp)) {
                        CheckConfiger.appConfig.currentServiceProperties[prop.replace(regexp, "$1")] = prop.replace(regexp, "$2");
                    }
                }
                callback(null, file);
                break;
            case "xml":
                if (CheckConfiger.status == "stop")
                    break;
                if (file.name.indexOf("ehcache") >= 0)
                    break;
                var beans, matched = false, count = 0;
                try {
                    beans = new DOMParser().parseFromString(file.content, "text/xml").getElementsByTagName("beans")[0].children;
                } catch (e) {
                    beans = [];
                }
                async.whilst(
                    function () {
                        return count < beans.length;
                    },
                    function (callback) {
                        var bean = beans.item(count++), options;
                        if (bean.tagName == "jsf:consumer") {
                            CheckConfiger.totalScore.jsf.taskNum++;
                            options = {
                                id: CheckConfiger.resolveRef(bean.attributes["id"]),
                                interface: CheckConfiger.resolveRef(bean.attributes["interface"]),
                                protocol: CheckConfiger.resolveRef(bean.attributes["protocol"]),
                                alias: CheckConfiger.resolveRef(bean.attributes["alias"]),
                                timeout: CheckConfiger.resolveRef(bean.attributes["timeout"]),
                                delay: CheckConfiger.resolveRef(bean.attributes["delay"]),
                                concurrents: CheckConfiger.resolveRef(bean.attributes["concurrents"]),
                                register: CheckConfiger.resolveRef(bean.attributes["register"]),
                                hide: CheckConfiger.resolveRef(bean.attributes["hide"]),
                                lazy: CheckConfiger.resolveRef(bean.attributes["lazy"])
                            };
                        }
                        if (bean.tagName == "jsf:provider") {
                            CheckConfiger.totalScore.jsf.taskNum++;
                            options = {
                                id: CheckConfiger.resolveRef(bean.attributes["id"]),
                                interface: CheckConfiger.resolveRef(bean.attributes["interface"]),
                                protocol: CheckConfiger.resolveRef(bean.attributes["protocol"]),
                                alias: CheckConfiger.resolveRef(bean.attributes["alias"]),
                                timeout: CheckConfiger.resolveRef(bean.attributes["timeout"]),
                                delay: CheckConfiger.resolveRef(bean.attributes["delay"]),
                                concurrents: CheckConfiger.resolveRef(bean.attributes["concurrents"]),
                                register: CheckConfiger.resolveRef(bean.attributes["register"]),
                                hide: CheckConfiger.resolveRef(bean.attributes["hide"]),
                                lazy: CheckConfiger.resolveRef(bean.attributes["lazy"])
                            };
                        }
                        if (options) {
                            matched = true;
                            console.log("options : %s ", JSON.stringify(options));
                            // pullstatus.html("options : " + JSON.stringify(options));
                            var task = new jsFlow({isParallel: false});
                            task.add(detectionConfiguration, window, {
                                appId: file.appId,
                                IP: file.hostIp,
                                path: file.id
                            }, options, "jsf", null);
                            task.fire(function (result) {
                                console.log('resolveAppConfig任务执行完毕');
                                pullstatus.html('resolveAppConfig任务执行完毕');
                                callback();
                            }, function (e) {
                                console.error('计算异常:' + JSON.stringify(e));
                                pullstatus.html('计算异常:' + JSON.stringify(e));
                                callback(e);
                            });
                        } else {
                            callback();
                        }
                    },
                    function (err, n) {
                        callback(null, file);
                    });
                break;
            case "json":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            case "jsonp":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            default:
                if (CheckConfiger.status == "stop")
                    break;
                console.log("Sorry, we are out of " + type + ".");
                pullstatus.html("Sorry, we are out of " + type + ".");
        }
    }

    function task2233(callback) {
        if (CheckConfiger.status == "stop")
            return;
        var file = callback.getPreviousTaskResult() || {};
        var filePath = file.type + "/" + file.appId + "/" + file.groupId + "/" + file.configId + "/" + file.filePath;
        console.log("正在保存文件 " + filePath + "");
        pullstatus.html("正在保存文件 " + filePath + "");
        CheckConfiger.fs.writefile(filePath, file.content, function (err) {
            if (CheckConfiger.status == "stop")
                return;
            if (err) {
                console.error(err.name + " : " + err.message);
            } else {
                console.log("保存文件 " + filePath + "成功");
                pullstatus.html("保存文件 " + filePath + "成功");
            }
            callback(null);
        });
    }

    function task3(arr, callback) {
//         debugger;
        var count = 0, keys_length = (Object.keys(CheckConfiger.config) || []).length;
        if (CheckConfiger.totalScore.jsf.score && CheckConfiger.totalScore.jsf.score > 0 && CheckConfiger.totalScore.jsf.taskNum && CheckConfiger.totalScore.jsf.taskNum > 0 && keys_length && keys_length > 0) {
            sumScore += (CheckConfiger.totalScore.jsf.score || 0) / CheckConfiger.totalScore.jsf.taskNum / keys_length;
            statusDom.html(sumScore);
        }
        async.whilst(
            function () {
                return count < arr.length;
            },
            function (callback) {
                var tomcatId = arr[count++];
                console.log("正在处理 tomcat appId: " + tomcatId + "");
                pullstatus.html("正在处理 tomcat appId: " + tomcatId + "");
                var task = new jsFlow({isParallel: false});
                task.add(task31, window, tomcatId, 1, []);
                task.add(task32, window);
                task.fire(function (result) {
                    console.log('task3循环任务执行完毕');
                    pullstatus.html('task3循环任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                callback(null);
            }
        );
    }

    function task31(appId, next, arr, callback) {
        if (CheckConfiger.status == "stop")
            return;
        next = next || 1;
        arr = arr || [];
        console.log("正在获得 AppHostList 第" + next + "页");
        pullstatus.html("正在获得 AppHostList 第" + next + "页");
        var ajaxSuccess = function (result) {
            if (CheckConfiger.status == "stop")
                return;
            //debugger;
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
                    task31(appId, next, arr, callback);
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
            url: CheckConfiger.appConfig.contentPath + "/host/appHostList",
            cache: false,
            async: false,
            success: ajaxSuccess,
            error: callback
        });
    }

    function task32(callback) {
        if (CheckConfiger.status == "stop")
            return;
        var hostList = callback.getPreviousTaskResult() || [], count = 0;
        CheckConfiger.totalScore.tomcat.taskNum = hostList.length;
        CheckConfiger.totalScore.jvm.taskNum = hostList.length;
        console.log("共获得 appHostList " + CheckConfiger.totalScore.tomcat.taskNum + "");
        async.whilst(
            function () {
                return count < hostList.length;
            },
            function (callback) {
                var host = hostList[count++];
                console.log(JSON.stringify(host));
                pullstatus.html(JSON.stringify(host));
                console.log("获得 AppHostDomainValue :" + host.url + "");
                pullstatus.html("获得 AppHostDomainValue :" + host.url + "");
                var task = new jsFlow({isParallel: false});
                task.add(task321, window, host);
                task.add(task322, window);
                task.add(task323, window);
                task.fire(function (result) {
                    console.log('task32任务执行完毕');
                    pullstatus.html('task32任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                callback(null);
            }
        );
    }

    function task321(host, callback) {
        if (CheckConfiger.status == "stop")
            return;
        var ajaxSuccess = function (result) {
            if (CheckConfiger.status == "stop")
                return;
            //debugger;
            try {
                if (result instanceof Object) {
                    console.error(result.result);
                    callback(result.result);
                } else {
                    $(result).find("select option").each(function () {
                        if ($(this).text().indexOf("/export/Domains") >= 0) {
                            host.value = $(this).val().trim();
                        }
                    });
                    callback(null, host);
                }
            } catch (e) {
                try {
                    callback(result.result);
                } catch (e) {
                    callback("获取信息失败！");
                }
            }
        };
        $.ajax({
            type: 'GET',
            url: CheckConfiger.appConfig.contentPath + host.url,
            cache: false,
            async: false,
            success: ajaxSuccess,
            error: callback
        });
    }

    function task322(callback) {
//         debugger;
        if (CheckConfiger.status == "stop")
            return;
        var host = callback.getPreviousTaskResult() || {};
        console.log("正在获得 appHostFilesList ");
        pullstatus.html("正在获得 appHostFilesList ");
        // var url = CheckConfiger.tomcatConfig.action.appHostFilesList(value, "false", "/conf");
        var url = CheckConfiger.tomcatConfig.action.appHostFilesList(host.value, "false", "/bin");
        console.log("正在请求：" + url);
        pullstatus.html("正在请求：" + url);
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            async: false,
            dataType: 'json',
            success: function (result) {
                if (CheckConfiger.status == "stop")
                    return;
                //debugger;
                // var array = [];
                // for (var i = 0; i < result.length; i++) {
                //     if (CheckConfiger.status == "stop")
                //         return;
                //     var file = result[i];
                //     var name = file.name.match(/(.*)<span.*span>/)[1];
                //     if (name.indexOf(".bak") < 0) {
                //         array.push({
                //             baseURI: file.baseURI,
                //             appId: file.appId,
                //             canView: file.canView,
                //             isParent: file.isParent,
                //             hostId: file.hostId,
                //             hostName: file.hostName,
                //             computerRoom: file.computerRoom,
                //             hostIp: host.hostIp,
                //             id: file.id,
                //             name: name
                //         });
                //     }
                // }
                var file = result[0];
                var array = [{
                    baseURI: file.baseURI,
                    appId: file.appId,
                    canView: true,
                    isParent: false,
                    hostId: file.hostId,
                    hostName: file.hostName,
                    computerRoom: file.computerRoom,
                    // hostIp: host.hostIp,
                    id: "/bin/start.sh",
                    name: "start.sh"
                }, {
                    baseURI: file.baseURI,
                    appId: file.appId,
                    canView: true,
                    isParent: false,
                    hostId: file.hostId,
                    hostName: file.hostName,
                    computerRoom: file.computerRoom,
                    hostIp: host.hostIp,
                    id: "/conf/server.xml",
                    name: "server.xml"
                }];
                callback(null, array);
            },
            failure: callback
        });
    }

    function task323(callback) {
        //debugger;
        if (CheckConfiger.status == "stop")
            return;
        var files = callback.getPreviousTaskResult() || {};
        console.log("共获得 appHostFilesList " + files.length);
        pullstatus.html("共获得 appHostFilesList " + files.length);
        var count = 0;
        async.whilst(
            function () {
                return count < files.length;
            },
            function (callback) {
                if (CheckConfiger.status == "stop")
                    return;
                var file = files[count++];
                if ($.inArray(file.name, ["server.xml", "start.sh"]) >= 0) {
                    var url = CheckConfiger.tomcatConfig.action.appHostFileDetial(file.baseURI);
                    var param = {
                        id: file.id,
                        name: file.id.split("/").pop(),
                        appId: file.appId,
                        head: false,
                        encoding: "",
                        lines: 10000,
                        hostId: file.hostId,
                        hostName: file.hostName,
                        computerRoom: file.computerRoom,
                        hostIp: file.hostIp
                    };
                    var task = new jsFlow({isParallel: false});
                    task.add(task3231, window, url, param);
                    task.add(resolveTomcatConfig, window);
                    task.add(task3233, window);
                    task.fire(function (result) {
                            console.log('task323任务执行完毕');
                            pullstatus.html('task323任务执行完毕');
                            callback();
                        },
                        function (e) {
                            console.error('计算异常:' + JSON.stringify(e));
                            pullstatus.html('计算异常:' + JSON.stringify(e));
                            callback(e);
                        }
                    );
                } else {
                    callback();
                }
            },
            function (err, n) {
                callback(null);
            }
        );
    }

    function task3231(url, params, callback) {
        //debugger;
        if (CheckConfiger.status == "stop")
            return;
        console.log("正在下载文件: " + params.id);
        pullstatus.html("正在下载文件: " + params.id);
        $.ajax({
            type: "POST",
            url: url,
            data: params,
            cache: false,
            async: false,
            dataType: "html",
            success: function (result) {
                //debugger;
                var xml = $($(result)[2]).text();
                params.content = xml;
                params.type = "tomcat";
                callback(null, params);
            },
            failure: callback
        });
    }

    function resolveTomcatConfig(callback) {
        //debugger;
        if (CheckConfiger.status == "stop")
            return;
        var options = {}, file = callback.getPreviousTaskResult() || {}, type = CheckConfiger.getFileType(file);
        switch (type) {
            case "sh":
                if (CheckConfiger.status == "stop")
                    break;
                if (file.name == "start.sh") {
                    var opts = file.content.match(/JAVA_OPTS\s*=\s*"\s*(.*)\s*"\s*\n/)[1],
                        xmsArr = opts.match(/.*-Xms(\d+)(m|M|G|g).*/),
                        xmxArr = opts.match(/.*-Xmx(\d+)(m|M|G|g).*/),
                        maxPermSizeArr = opts.match(/.*-XX:MaxPermSize=(\d+)(m|M|G|g).*/);
                    options = {
                        Xms: xmsArr[2].toLocaleUpperCase() == 'G' ? xmsArr[1] * 1024 : xmsArr[1],
                        Xmx: xmxArr[2].toLocaleUpperCase() == 'G' ? xmxArr[1] * 1024 : xmxArr[1],
                        MaxPermSize: maxPermSizeArr[2].toLocaleUpperCase() == 'G' ? maxPermSizeArr[1] * 1024 : maxPermSizeArr[1],
                        defaultConnectTimeout: opts.replace(/.*-Dsun.net.client.defaultConnectTimeout=(\d+).*/, "$1"),
                        defaultReadTimeout: opts.replace(/.*-Dsun.net.client.defaultReadTimeout=(\d+).*/, "$1"),
                        cacheTtl: opts.replace(/.*-Dnetworkaddress.cache.ttl=(\d+).*/, "$1"),
                        inetaddrTtl: opts.replace(/.*-Dsun.net.inetaddr.ttl=(\d+).*/, "$1")
                    };
                    opts = null;
                }
                console.log("options : %s ", JSON.stringify(options));
                // pullstatus.html("options : " + JSON.stringify(options));
                var task = new jsFlow({isParallel: false});
                task.add(detectionConfiguration, window, {
                    appId: file.appId,
                    IP: file.hostIp,
                    path: file.id
                }, options, "jvm", null);
                task.fire(function (result) {
                    console.log('resolveTomcatConfig任务执行完毕');
                    pullstatus.html('resolveTomcatConfig任务执行完毕');
                    callback(null, file);
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e, file);
                });
                break;
            case "html":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            case "properties":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            case "xml":
                if (CheckConfiger.status == "stop")
                    break;
                if (file.name == "server.xml") {
                    var connector = $(new DOMParser().parseFromString(file.content, "text/xml").getElementsByTagName("Connector"));
                    options = {
                        id: connector.attr("port"),
                        maxParameterCount: connector.attr("maxParameterCount"),
                        protocol: connector.attr("protocol"),
                        redirectPort: connector.attr("redirectPort"),
                        maxSpareThreads: connector.attr("maxSpareThreads"),
                        maxThreads: connector.attr("maxThreads"),
                        minSpareTHreads: connector.attr("minSpareTHreads"),
                        acceptCount: connector.attr("acceptCount"),
                        connectionTimeout: connector.attr("connectionTimeout"),
                        URIEncoding: connector.attr("URIEncoding")
                    };
                    connector = null;
                }
                console.log("options : %s ", JSON.stringify(options));
                // pullstatus.html("options : " + JSON.stringify(options));
                var task = new jsFlow({isParallel: false});
                task.add(detectionConfiguration, window, {
                        appId: file.appId,
                        IP: file.hostIp,
                        path: file.id
                    }, options, "tomcat", null
                );
                task.fire(function (result) {
                    console.log('resolveTomcatConfig任务执行完毕');
                    pullstatus.html('resolveTomcatConfig任务执行完毕');
                    callback(null, file);
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e, file);
                });
                break;
            case "json":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            case "jsonp":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            default:
                console.error("Sorry, we are out of " + type + ".");
                pullstatus.html("Sorry, we are out of " + type + ".");
                throw new Error();
        }
    }

    function task3233(callback) {
        //debugger;
        if (CheckConfiger.status == "stop")
            return;
        var file = callback.getPreviousTaskResult() || {};
        var filePath = file.type + "/" + file.appId + "/" + file.hostIp + file.id;
        console.log("正在保存文件 " + filePath);
        pullstatus.html("正在保存文件 " + filePath);
        CheckConfiger.fs.writefile(filePath, file.content, function (err) {
            if (CheckConfiger.status == "stop")
                return;
            if (err) {
                console.error(err.name + " : " + err.message);
            } else {
                console.log("保存文件 " + filePath + "成功");
                pullstatus.html("保存文件 " + filePath + "成功");
            }
            callback(null);
        });
    }

    function task4(arr, callback) {
        // debugger;
        var count = 0;
        var keys_length = (Object.keys(CheckConfiger.config) || []).length;
        if (CheckConfiger.totalScore.tomcat.score && CheckConfiger.totalScore.tomcat.score > 0 && CheckConfiger.totalScore.tomcat.taskNum && CheckConfiger.totalScore.tomcat.taskNum > 0 && keys_length && keys_length > 0) {
            sumScore += (CheckConfiger.totalScore.tomcat.score || 0) / CheckConfiger.totalScore.tomcat.taskNum / keys_length;
            statusDom.html(sumScore);
        }
        if (CheckConfiger.totalScore.jvm.score && CheckConfiger.totalScore.jvm.score > 0 && CheckConfiger.totalScore.jvm.taskNum && CheckConfiger.totalScore.jvm.taskNum > 0 && keys_length && keys_length > 0) {
            sumScore += (CheckConfiger.totalScore.jvm.score || 0) / CheckConfiger.totalScore.jvm.taskNum / keys_length;
            statusDom.html(sumScore);
        }
        async.whilst(
            function () {
                return count < arr.length;
            },
            function (callback) {
                var app_key = arr[count++];
                console.log("正在处理 nginx app_key: " + app_key + "");
                pullstatus.html("正在处理 nginx app_key: " + app_key + "");
                var task = new jsFlow({isParallel: false});
                task.add(task41, window, app_key);
                task.add(task42, window);
                task.fire(function (result) {
                    console.log('task4任务执行完毕');
                    pullstatus.html('task4任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                callback(null);
            }
        );
    }

    function task41(app_key, callback) {
        // task31(appId, next, arr, callback);
        $.ajax({
            type: 'GET',
            url: "http://bmt.jd.com/customer/app_server?app_key=" + app_key + "&size=all",
            cache: false,
            dataType: "html",
            success: function (res) {
                if (CheckConfiger.status == "stop")
                    return;
//         debugger;
                var arr = [];
                $(res).find("table tbody tr").each(function () {
                    arr.push($(this).find("td:eq(2)").html());
                });
                res = null;
                callback(null, arr);
            },
            error: callback
        });
    }

    function task42(callback) {
        if (CheckConfiger.status == "stop")
            return;
        var hostList = callback.getPreviousTaskResult() || [];
        console.log("共获得 appHostList " + hostList.length);
        pullstatus.html("共获得 appHostList " + hostList.length);
        var arr = [], tArr = [];
        for (var i = 0, len = hostList.length; i < len; i++) {
            tArr.push(hostList[i]);
            if (i % 200 == 199) {
                arr.push(tArr);
                tArr = [];
            }
        }
        hostList = null;
        if (tArr.length > 0) {
            arr.push(tArr);
        }
        tArr = null;
        var count = 0;
        async.whilst(
            function () {
                return count < arr.length;
            },
            function (callback) {
                //debugger;
                var task = new jsFlow({isParallel: false});
                task.add(task421, window, arr[count++]);
                task.add(getMissionStatus, window, null);
                task.add(getMissionData, window);
                task.add(task424, window);
                task.fire(function (result) {
                    console.log('task42任务执行完毕');
                    pullstatus.html('task42任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                callback(null);
            }
        );
    }

    function task421(ipArr, callback) {
//         debugger;
        if (CheckConfiger.status == "stop")
            return;
        console.log("正在批量获得 nginx配置：" + "http://bmt.jd.com/customer/query/mission_create/");
        pullstatus.html("正在批量获得 nginx配置：" + "http://bmt.jd.com/customer/query/mission_create/");
        $.ajax({
            type: 'POST',
            data: {ip_list: JSON.stringify(ipArr), query_tag: "query_conf_nginx"},
            url: "http://bmt.jd.com/customer/query/mission_create/",
            cache: false,
            async: false,
            dataType: "html",
            success: function (res) {
                if (CheckConfiger.status == "stop")
                    return;
                ipArr = null;
                var id = res.match(/(.*\n)*\s*var\s*url\s*=\s*"\/customer\/query\/ajax_mission_status"\s*;\s*\n\s*var\s*data\s*=\s*\"\s*id=(\d+)\s*\"\s*;\s*(.*\n)*/)[2];
                res = null;
                callback(null, id);
            },
            error: callback
        });
    }

    function getMissionStatus(id, callback) {
        if (CheckConfiger.status == "stop")
            return;
//         debugger;
        var id = id || callback.getPreviousTaskResult();
        if (!id) {
            callback("id is null");
            return;
        }
        console.log("正在请求：" + "http://bmt.jd.com/customer/query/ajax_mission_status");
        pullstatus.html("正在请求：" + "http://bmt.jd.com/customer/query/ajax_mission_status");
        $.ajax({
            type: "get",
            dataType: "json",
            cache: false,
            url: "http://bmt.jd.com/customer/query/ajax_mission_status",
            data: {id: id},
            timeout: 1000,
            success: function (datas) {
//         debugger;
                if (CheckConfiger.status == "stop")
                    return;
                if (datas.statusCode != 1) {
                    datas = null;
                    setTimeout(function () {
                        getMissionStatus(id, callback)
                    }, 2000);
                } else {
                    callback(null, id);
                }
            },
            error: callback
        });
    };

    function getMissionData(callback) {
        if (CheckConfiger.status == "stop")
            return;
        var id = callback.getPreviousTaskResult();
        console.log("正在请求：" + "http://bmt.jd.com/customer/query/mission_getdata");
        pullstatus.html("正在请求：" + "http://bmt.jd.com/customer/query/mission_getdata");
        $.ajax({
            type: "get",
            dataType: "json",
            cache: false,
            url: "http://bmt.jd.com/customer/query/mission_getdata",
            data: {id: id},
            timeout: 2000,
            success: function (datas) {
                if (CheckConfiger.status == "stop")
                    return;
                //debugger;
                var arr = [];
                $(datas.result).each(function () {
                    arr.push({
                        ip: $(this).find("td:first").html().trim(),
                        content: $(this).find("td:last").html().replace(/<br>/g, '\n')
                    });
                });
                datas = null;
                callback(null, arr);
            },
            error: callback
        });
    };

    function task424(callback) {
        //debugger;
        if (CheckConfiger.status == "stop")
            return;
        var files = callback.getPreviousTaskResult() || [];
        console.log("本次批量获得 nginx配置 " + files.length);
        pullstatus.html("本次批量获得 nginx配置 " + files.length);
        var count = 0;
        async.whilst(
            function () {
                return count < files.length;
            },
            function (callback) {
                var file = files[count++];
                if (CheckConfiger.status == "stop")
                    return;
                var task = new jsFlow({isParallel: false});
                task.add(task425, window, file);
                task.add(task4222, window);
                task.fire(function (result) {
                    console.log('task424任务执行完毕');
                    pullstatus.html('task424任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                callback(null);
            }
        );
    }

    function task425(callback) {
        //debugger;
        if (CheckConfiger.status == "stop")
            return;
        var options = {}, file = callback.getPreviousTaskResult() || {}, type = CheckConfiger.getFileType(file);
        switch (type) {
            case "conf":
                if (CheckConfiger.status == "stop")
                    break;
                var options = window.nginxParse(file.content);
                console.log("options : %s ", JSON.stringify(options));
                var task = new jsFlow({isParallel: false});
                task.add(detectionConfiguration, window, {
                        appId: file.appId,
                        IP: file.hostIp,
                        path: file.id
                    }, options, "jvm", null
                );
                task.fire(function (result) {
                    console.log('task425任务执行完毕');
                    pullstatus.html('task425任务执行完毕');
                    callback(null, file);
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e, file);
                });
                break;
            case "properties":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            default:
                console.error("Sorry, we are out of " + type + ".");
                pullstatus.html("Sorry, we are out of " + type + ".");
                throw new Error();
        }
    }

    function task4222(callback) {
        var file = callback.getPreviousTaskResult() || {};
        var filePath = "nginx" + "/" + file.ip + "/conf.properties";
        console.log("正在保存nginx配置文件 " + filePath);
        pullstatus.html("正在保存nginx配置文件 " + filePath);
        CheckConfiger.fs.writefile(filePath, file.content, function (err) {
            if (CheckConfiger.status == "stop")
                return;
            if (err) {
                console.error(err.name + " : " + err.message);
            } else {
                console.log("保存文件 " + filePath + "成功");
                pullstatus.html("保存文件 " + filePath + "成功");
            }
            callback();
        });
    }

    function task5(arr, callback) {
//         debugger;
        var count = 0;
        var keys_length = (Object.keys(CheckConfiger.config) || []).length;
        if (CheckConfiger.totalScore.tomcat.score && CheckConfiger.totalScore.tomcat.score > 0 && CheckConfiger.totalScore.tomcat.taskNum && CheckConfiger.totalScore.tomcat.taskNum > 0 && keys_length && keys_length > 0) {
            sumScore += (CheckConfiger.totalScore.tomcat.score || 0) / CheckConfiger.totalScore.tomcat.taskNum / keys_length;
            statusDom.html(sumScore);
        }
        if (CheckConfiger.totalScore.jvm.score && CheckConfiger.totalScore.jvm.score > 0 && CheckConfiger.totalScore.jvm.taskNum && CheckConfiger.totalScore.jvm.taskNum > 0 && keys_length && keys_length > 0) {
            sumScore += (CheckConfiger.totalScore.jvm.score || 0) / CheckConfiger.totalScore.jvm.taskNum / keys_length;
            statusDom.html(sumScore);
        }
        async.whilst(
            function () {
                return count < arr.length;
            },
            function (callback) {
                var app_key = arr[count++];
                console.log("正在处理 nginx app_key: " + app_key + "");
                pullstatus.html("正在处理 nginx app_key: " + app_key + "");
                var task = new jsFlow({isParallel: false});
                task.add(task51, window, app_key);
                task.add(task52, window);
                task.fire(function (result) {
                    console.log('task5任务执行完毕');
                    pullstatus.html('task5任务执行完毕');
                    setTimeout(function () {
                        callback();
                    }, 1000);
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    setTimeout(function () {
                        callback(e);
                    }, 1000);
                });
            },
            function (err, n) {
                setTimeout(function () {
                    callback();
                }, 1000);
            }
        );
    }

    function task51(app_key, callback) {
        $.ajax({
            type: 'GET',
            url: "http://bmt.jd.com/customer/app_server?app_key=" + app_key + "&size=all",
            cache: false,
            dataType: "html",
            success: function (res) {
                if (CheckConfiger.status == "stop")
                    return;
//         debugger;
                var arr = [];
                $(res).find("table tbody tr").each(function () {
                    arr.push($(this).find("td:eq(2)").html());
                });
                res = null;
                callback(null, arr);
            },
            error: callback
        });
    }

    function task52(callback) {
        if (CheckConfiger.status == "stop")
            return;
        // debugger;
        var hostList = callback.getPreviousTaskResult() || [];
        console.log("共获得 appHostList " + hostList.length);
        pullstatus.html("共获得 appHostList " + hostList.length);
        var count = 0;
        async.whilst(
            function () {
                return count < hostList.length;
            },
            function (callback) {
                //debugger;
                var task = new jsFlow({isParallel: false});
                task.add(task521, window, hostList[count++]);
                task.add(task522, window);
                task.add(task523, window);
                task.fire(function (result) {
                    console.log('task52循环任务执行完毕');
                    pullstatus.html('task52循环任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('task52循环计算异常:' + JSON.stringify(e));
                    pullstatus.html('task52循环计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                console.error('task52循环计算异常:' + JSON.stringify(err));
                callback(err);
            }
        );
    }

    function task521(ip, callback) {
//         debugger;
        if (CheckConfiger.status == "stop")
            return;
        console.log("正在获得 nginx配置：" + "http://bmt.jd.com/service/query/queryPost/?queryIp=" + ip);
        pullstatus.html("正在获得 nginx配置：" + "http://bmt.jd.com/service/query/queryPost/?queryIp=" + ip);
        $.ajax({
            type: 'GET',
            url: "http://bmt.jd.com/service/query/queryPost/?queryIp=" + ip,
            cache: false,
            async: false,
            dataType: "json",
            success: function (res) {
                if (CheckConfiger.status == "stop")
                    return;
                if (res.code == 0) {
                    setTimeout(function () {
                        callback(null, {id: res.data, ip: ip})
                    }, 5000);
                } else {
                    setTimeout(function () {
                        task521(ip, callback);
                    }, 2000);
                }
            },
            error: function (res) {
                if (res.responseText == "提交频繁，请稍后再试!") {
                    setTimeout(function () {
                        task521(ip, callback)
                    }, 15000);
                } else {
                    callback(res);
                }
                console.error(JSON.stringify(res));
            }
        });
    }

    function task522(callback) {
        //         debugger;
        if (CheckConfiger.status == "stop")
            return;
        var param = callback.getPreviousTaskResult() || "";
        console.log("正在获得 nginx配置：" + "http://bmt.jd.com/service/query/result/?id=" + param.id);
        pullstatus.html("正在获得 nginx配置：" + "http://bmt.jd.com/service/query/result/?id=" + param.id);
        $.ajax({
            type: 'GET',
            url: "http://bmt.jd.com/service/query/result/?id=" + param.id,
            cache: false,
            dataType: "text",
            success: function (res) {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                var arr = [];
                $(res).find("#tab_4 #accordion4 .panel").each(function () {
                    var cur = $(this), name;
                    name = (cur.find(".panel-heading .panel-title a").html() || "").trim();
                    arr.push({
                        name: name.indexOf('.conf') >= 0 ? name : name + ".conf",
                        content: (cur.find(".panel-body pre").html() || "").trim(),
                        ip: param.ip
                    });
                    cur = null;
                });
                if (arr.length > 0) {
                    callback(null, arr);
                } else {
                    task522(callback);
                }
            },
            error: function (err) {
                callback(err);
            }
        });
    }

    function task523(callback) {
        //debugger;
        if (CheckConfiger.status == "stop")
            return;
        var files = callback.getPreviousTaskResult() || [];
        console.log("本次获得 nginx配置 " + files.length);
        pullstatus.html("本次获得 nginx配置 " + files.length);
        var count = 0;
        async.whilst(
            function () {
                return count < files.length;
            },
            function (callback) {
                if (CheckConfiger.status == "stop")
                    return;
                var file = files[count++];
                CheckConfiger.totalScore.nginx.taskNum++;
                var task = new jsFlow({isParallel: false});
                task.add(resolveNginxConfig, window, file);
                task.add(task5232, window);
                task.fire(function (result) {
                    console.log('task523循环任务执行完毕');
                    pullstatus.html('task523循环任务执行完毕');
                    callback();
                }, function (e) {
                    console.error('task523计算异常:' + JSON.stringify(e));
                    pullstatus.html('task523计算异常:' + JSON.stringify(e));
                    callback(e);
                });
            },
            function (err, n) {
                callback(err);
            }
        );
    }

    function resolveNginxConfig(file, callback) {
        // debugger;
        if (CheckConfiger.status == "stop")
            return;
        var options = {}, type = CheckConfiger.getFileType(file);
        switch (type) {
            case "conf":
                if (CheckConfiger.status == "stop")
                    break;
                var options = window.nginxParse(file.content);
                var task = new jsFlow({isParallel: false});
//         debugger;
                task.add(detectionConfiguration, window, {
                    appId: file.appId || "",
                    IP: file.hostIp || file.ip || "",
                    path: file.name || ""
                }, options, "nginx", null);
                task.fire(function (result) {
                    console.log('resolveNginxConfig任务执行完毕');
                    pullstatus.html('resolveNginxConfig任务执行完毕');
                    callback(null, file);
                }, function (e) {
                    console.error('计算异常:' + JSON.stringify(e));
                    pullstatus.html('计算异常:' + JSON.stringify(e));
                    callback(e, file);
                });
                break;
            case "properties":
                if (CheckConfiger.status == "stop")
                    break;
                break;
            default:
                console.error("Sorry, we are out of " + type + ".");
                pullstatus.html("Sorry, we are out of " + type + ".");
                throw new Error();
        }
    }

    function detectionConfiguration(fileParam, opts, type, subItem, callback) {
//         debugger;
        if (subItem) {
            // CheckConfiger.getScore(CheckConfiger.config[type][subItem], opts[subItem], callback);
        } else {
            var keys = Object.keys(CheckConfiger.config[type]) || [], count = 0;
            async.whilst(
                function () {
                    return count < keys.length;
                },
                function (callback) {
                    if (CheckConfiger.status == "stop")
                        return;
                    var key = keys[count++], value = type == "nginx" ? getNginxValue(opts, key) : opts[key], param, task;
                    task = new jsFlow({isParallel: false});
                    // debugger;
                    param = getScore(CheckConfiger.config[type][key], value);
                    if (param.score > 0) {
                        CheckConfiger.totalScore[type].score += param.score;
                    }
                    task.add(addData, window, fileParam, type, key, param);
                    task.fire(function (result) {
                        console.log('detectionConfiguration循环任务执行完毕');
                        pullstatus.html('detectionConfiguration循环任务执行完毕');
                        callback();
                    }, function (e) {
                        console.error('计算异常:' + JSON.stringify(e));
                        pullstatus.html('计算异常:' + JSON.stringify(e));
                        callback(e);
                    });
                },
                function (err, n) {
                    callback(null);
                }
            );
        }
    }

    function getScore(config, opts) {
        // debugger;
        var error = "", fullWeight = false;
        switch (config.type) {
            case "number":
                var opts = Number(opts), score = -1, segments = config.segment, matchRegx = false, rangeMatch, eqMatch;
                for (var i = 0, len = segments.length; i < len; i++) {
                    if (matchRegx)
                        continue;
                    var segment = segments[i];
                    if (rangeMatch = segment.regx.match(/^(\(|\[)(.*),(.*)(\]|\))$/)) {
                        if (eval("Number(" + rangeMatch[2] + ")" + (rangeMatch[1] == "[" ? " <= Number(" : " < Number(" ) + opts + ") && Number(" + opts + (rangeMatch[4] == "]" ? ") <= Number(" : ") < Number(" ) + rangeMatch[3] + ")")) {
                            score = config.score * segment.weight / 10;
                            segment.weight == 10 ? fullWeight = true : true;
                            matchRegx = true;
                        }
                    } else if (eqMatch = segment.regx.match(/^\s*(\d*)\s*$/)) {
                        if (opts == eqMatch[1]) {
                            score = config.score * segment.weight / 10;
                            segment.weight == 10 ? fullWeight = true : true;
                            matchRegx = true;
                        }
                    }
                }
                break;
            case "string":
                var score = -1;
                if (config.value.indexOf(opts)) {
                    score = config.score;
                    fullWeight = true;
                }
                break;
            case "boolean":
                var score = -1;
                if (opts == config.value) {
                    score = config.score;
                    fullWeight = true;
                }
                break;
            default:
                score = -1;
                error = "没有匹配到该检测项";
                break;
        }
        return {score: score, oldValue: opts, fullWeight: fullWeight, error: error};
    }

    function addData(fileParam, checkType, checkSubItem, param, callback) {
//         debugger;
        if (!param.fullWeight) {
            $(".result div[check-type='" + checkType + "']").next().find("div[check-subitem='" + checkSubItem + "'] .glyphicon ").removeClass("green ").removeClass("glyphicon-ok").addClass("red").addClass("glyphicon-remove");
        }
        CheckConfiger.db.transaction(function (transaction) {
            transaction.executeSql("INSERT INTO CheckConfiger VALUES(?,?,?,?,?,?,?,?)", [CheckConfiger.checkId, checkType, checkSubItem, param.oldValue || "", param.score || -1, fileParam.IP || "" + fileParam.id || "", param.error || "", new Date()], function (transaction, rs) {
                callback();
            }, function (transaction, error) {
                console.error(error.source + ":" + error.message);
                callback();
            });
        });
    }

    function task5232(callback) {
//         debugger;
        var file = callback.getPreviousTaskResult() || {};
        var filePath = "nginx" + "/" + file.ip + "/conf.properties";
        console.log("正在保存nginx配置文件 " + filePath);
        pullstatus.html("正在保存nginx配置文件 " + filePath);
        CheckConfiger.fs.writefile(filePath, file.content, function (err) {
            if (CheckConfiger.status == "stop")
                return;
            if (err) {
                console.error(err.name + " : " + err.message);
            } else {
                console.log("保存文件 " + filePath + "成功");
                pullstatus.html("保存文件 " + filePath + "成功");
            }
            callback();
        });
    }

    function task6(callback) {
//         debugger;
        var keys_length = (Object.keys(CheckConfiger.config) || []).length;
        if (keys_length && keys_length > 0 && CheckConfiger.totalScore.nginx.score && CheckConfiger.totalScore.nginx.score > 0 && CheckConfiger.totalScore.nginx.taskNum && CheckConfiger.totalScore.nginx.taskNum > 0) {
            sumScore += (CheckConfiger.totalScore.nginx.score || 0) / CheckConfiger.totalScore.nginx.taskNum / keys_length;
        }
        statusDom.html(sumScore);
        CheckConfiger.db.transaction(function (transaction) {
            transaction.executeSql("INSERT INTO CheckConfiger VALUES(?,?,?,?,?,?,?,?)", [CheckConfiger.checkId, 'totalScore', "", "", sumScore, "", "", new Date()], function (transaction, rs) {
                callback();
            }, function (transaction, error) {
                console.error(error.source + ":" + error.message);
                callback();
            });
        });
    }

    var task = new jsFlow({isParallel: false});
    task.add(getCheckId, window);
    task.add(task1, window, '/');
    task.add(task2, window, deploy.app.ids);
    task.add(task3, window, deploy.tomcat.ids);
    task.add(task5, window, deploy.nginx.app_key);
    task.add(task6, window);
    task.fire(function (result) {
        console.log('所有任务执行完毕');
        pullstatus.html('所有任务执行完毕');
        $(".laserLine").removeClass("scroll-radar").hide();
    }, function (e) {
        console.error('计算异常:' + JSON.stringify(e));
        pullstatus.html('计算异常:' + JSON.stringify(e));
        $(".laserLine").removeClass("scroll-radar").hide();
    });
}
function stop() {
    CheckConfiger.status = "stop";
}
chrome.storage.local.get(function (itmes) {
    CheckConfiger.parseConfig(itmes.healthMonitoringConfig.xmlConfig);
    CheckConfiger.isOpenFileSystem = itmes.healthMonitoringConfig.openFileSystem;
});
$(function () {
    pullstatus = $(".pull-status");
    statusDom = $(".start span");
    getfs(function (err, fs) {
        if (err) {
            console.error(err.name + " : " + err.message);
        } else {
            CheckConfiger.fs = fs;
        }
    });
    CheckConfiger.initDb();
    $(".start").on("click", function () {
        if (deploy.app.ids.length <= 0 || deploy.tomcat.ids.length <= 0 || deploy.nginx.app_key.length <= 0) {
            return;
        }
        if (CheckConfiger.status == "stop") {
            CheckConfiger.status = "start";
            statusDom.html("加载配置");
            start();
            $(".laserLine").addClass("scroll-radar").show();
        } else {
            statusDom.html("开始检测");
            stop();
            $(".laserLine").removeClass("scroll-radar").hide();
        }
    });
    $(".params input[name='deploy']").on('blur', function () {
        var id = $(this).val();
        if (id) {
            deploy.app.ids = [id];
            deploy.tomcat.ids = [id];
        }
    });
    $(".params input[name='btm']").on('blur', function () {
        var key = $(this).val();
        if (key) {
            deploy.nginx.app_key = [key];
        }
    });
    CheckConfiger.getData("select score from CheckConfiger where checkType='totalScore' and checkId=(select max(checkId) from CheckConfiger)", [], function (err, transction, rs) {
        try {
            var lastScore = rs.rows[0].score;
            if (lastScore) {
                statusDom.html("上次检测<br>" + lastScore);
            }
        } catch (e) {
        }
    });
});

function getNginxValue(nginxConfig, key) {
    var tmp = nginxConfig[key], value;
    if (typeof tmp == 'undefined') {
        var nkeys = Object.keys(nginxConfig) || [];
        for (var i = 0, len = nkeys.length; i < len; i++) {
            tmp = nginxConfig[nkeys[i]];
            if (tmp && tmp._isNodeArray) {
                var tmp2 = tmp[0];
                for (var ke in tmp2) {
                    if (ke == key) {
                        value = tmp2[ke][0][0];
                    }
                }
            }
        }
    } else if (tmp && tmp._isDirectiveArray) {
        value = tmp[0][0];
    }
    return value;
}
// $.ajax({
//     type: 'get',
//     url: chrome.extension.getURL("config/nginx.conf"),
//     success: function (res) {
//         debugger;
//         var nginx = window.nginxParse(res);
//         getNginxValue(nginx, "worker_processes");
//     }
// });