/**
 *
 应用配置文件：
 http://deploy.jd.com/app?_=1475038302287
 http://deploy.jd.com/6274/group?_=1475038416448
 http://deploy.jd.com/6274/config/group-47656/1166703?_=1475038448558
 $.post("http://deploy.jd.com/6276/config/view-113926",{type:'group',reType:'download',filePath:'WEB-INF/classes/properties/monitorconfig.properties',attachment:true},function(result){
    console.log(result);
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
 [<form action=​"/​customer/​query/​mission_create/​" method=​"post" target=​"_blank">​<input type=​"hidden" name=​"ip_list" value=​"["10.189.47.100"]​">​<input type=​"hidden" name=​"query_tag" value=​"query_conf_nginx">​</form>​]
 http://bmt.jd.com/customer/query/ajax_mission_status?id=73772843
 http://bmt.jd.com/customer/query/mission_getdata?id=73772843
 */


//http://deploy.jd.com/host/download?file=/export/Domains/trade.sdk.jd.v5.local/server1/bin/start.sh&appId=6274&hostId=8128035
//http://deploy.jd.com/host/download?file=/export/Domains/trade.sdk.jd.v5.local/server1/&appId=6274&hostId=8128035


var deploy = {
        app: {
            ids: [6274, 6276]
        },
        tomcat: {
            ids: [6274, 6276]
        },
        nginx: {
            ids: [6274, 6276]
        }
    };
var pullstatus = $(".pull-status");
function resolveRef(bean) {
    if (!bean) {
        return "";
    }
    var regExp = /^\s*\$\{\s*(.*)\s*}\s*/;
    var key = bean.value;
    if (key.match(regExp)) {
        return CheckConfiger.currentServiceProperties[key.replace(regExp, "$1")];
    }
    return key.replace(/^\s*(.*)\s*/, "$1");
}
function getFileType(file) {
    var type = "string";
    try {
        type = file.name.split('.')[1];
    } catch (e) {
    }
    return type;
}
function appGroupListCall(groupUrlList, taskin) {
    // debugger;
    taskin.addTaskNum(groupUrlList.length);
    pullstatus.html(("共获得 AppGroupList " + groupUrlList.length + ""));
    console.log(("共获得 AppGroupList " + groupUrlList.length + ""));
    function dealGroupurl(index) {
        var pageUrl = groupUrlList[index];

        function task1() {
            var taskNum = 0;
            var successNum = 0;
            this.addTaskNum = function (n) {
                taskNum += n;
            };
            this.log = function () {
                console.log("taskNum:" + taskNum + "    successNum:" + successNum);
            };
            this.addSuccessNum = function (n) {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                successNum += n;
                if (taskNum == successNum) {
                    this.propertyChange();
                }
            };
            this.propertyChange = function () {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                if (index < groupUrlList.length - 1) {
                    taskin.addSuccessNum(1);
                    dealGroupurl(++index);
                } else {
                    taskin.addSuccessNum(1);
                }
            }
        }

        var task = new task1();
        if (CheckConfiger.status == "stop")
            return;
        var dir = "app/" + pageUrl.appId + "/" + pageUrl.groupId + "/" + pageUrl.configId;
        pullstatus.html(("正在创建目录 " + dir + ""));
        console.log(("正在创建目录 " + dir + ""));
        // debugger;
        CheckConfiger.fs.mkdirs(dir, function (err) {
            if (err) {
                console.error(err.name + " : " + err.message);
            }
            CheckConfiger.appConfig.getAppConfigList(pageUrl, appConfigListCall, task);
        });
    }

    dealGroupurl(0);
}
function appConfigListCall(configList, intask) {

    intask.addTaskNum(configList.length);
    pullstatus.html(("获得文件列表 " + configList.length + ""));
    console.log(("获得文件列表 " + configList.length + ""));
    function dealConfig(index) {
        // debugger;
        if (CheckConfiger.status == "stop")
            return;
        console.log(index);
        var configBean = configList[index];

        function task1() {
            var taskNum = 0;
            var successNum = 0;
            this.addTaskNum = function (n) {
                taskNum += n;
            };
            this.log = function () {
                console.log("taskNum:" + taskNum + "    successNum:" + successNum);
            };
            this.addSuccessNum = function (n) {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                successNum += n;
                if (taskNum == successNum) {
                    this.propertyChange();
                }
            };
            this.propertyChange = function () {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                if (index < configList.length - 1) {
                    intask.addSuccessNum(1);
                    dealConfig(++index);
                } else {
                    intask.addSuccessNum(1);
                }
            }
        }

        var task = new task1();
        configBean.type = "app";
        // if (configBean.filePath.indexOf(".properties") >= 0 && configBean.filePath.indexOf("important.properties") < 0 && configBean.filePath.indexOf("web.xml") < 0) {
        CheckConfiger.downloadFile(configBean, appSaveAsFile, task);
        // var param = CheckConfiger.appConfig.action.configDownload(configBean.appId, configBean.configId, configBean.filePath);
        // CheckConfiger.appConfig.getConfigDownload(param.url, param.param, appConfigDownloadCall);
        // }
    }

    dealConfig(0);
    // configList.forEach(function (configBean) {
    //     // debugger;
    //     if (CheckConfiger.status == "stop")
    //         return;
    //     if (configBean.filePath.indexOf(".properties") < 0 && configBean.filePath.indexOf("important.properties") < 0 && configBean.filePath.indexOf("web.xml") < 0) {
    //         // debugger;
    //         console.log("configBean:" + JSON.stringify(configBean));
    //         // var param = CheckConfiger.appConfig.action.configDownload(configBean.appId, configBean.configId, configBean.filePath);
    //         // CheckConfiger.appConfig.getConfigDownload(param.url, param.param, configDownloadCall);
    //     }
    // });
}

function appConfigDownloadCall(file) {
    // debugger;
    if (CheckConfiger.status == "stop")
        return;

    var type = getFileType(file);
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
                var regexp = /^(.*)\s*=\s*(.*)/;
                if (!prop.match(/^\s*#/) && prop.match(regexp)) {
                    CheckConfiger.currentServiceProperties[prop.replace(regexp, "$1")] = prop.replace(regexp, "$2");
                }
            }
            break;
        case "xml":
            if (CheckConfiger.status == "stop")
                break;
            if (file.name.indexOf("ehcache") >= 0)
                break;
            var beans = file.content.getElementsByTagName("beans")[0].children;
            for (var i = 0; i < beans.length; i++) {
                var bean = beans.item(i);
                if (bean.tagName == "jsf:consumer") {
                    var consumer = {
                        id: resolveRef(bean.attributes["id"]),
                        interface: resolveRef(bean.attributes["interface"]),
                        protocol: resolveRef(bean.attributes["protocol"]),
                        alias: resolveRef(bean.attributes["alias"]),
                        timeout: resolveRef(bean.attributes["timeout"]),
                        delay: resolveRef(bean.attributes["delay"]),
                        concurrents: resolveRef(bean.attributes["concurrents"]),
                        register: resolveRef(bean.attributes["register"]),
                        hide: resolveRef(bean.attributes["hide"]),
                        lazy: resolveRef(bean.attributes["lazy"])

                    };
                    if (consumer.timeout <= Number(CheckConfiger.config.jsf.consumertimeout.normal)) {
                        CheckConfiger.write(consumer);
                    }
                }
                if (bean.tagName == "jsf:provider") {
                    var provider = {
                        id: resolveRef(bean.attributes["id"]),
                        interface: resolveRef(bean.attributes["interface"]),
                        protocol: resolveRef(bean.attributes["protocol"]),
                        alias: resolveRef(bean.attributes["alias"]),
                        timeout: resolveRef(bean.attributes["timeout"]),
                        delay: resolveRef(bean.attributes["delay"]),
                        concurrents: resolveRef(bean.attributes["concurrents"]),
                        register: resolveRef(bean.attributes["register"]),
                        hide: resolveRef(bean.attributes["hide"]),
                        lazy: resolveRef(bean.attributes["lazy"])
                    };
                    if (provider.timeout <= Number(CheckConfiger.config.jsf.consumertimeout.normal)) {
                        CheckConfiger.write(provider);
                    }
                }
            }
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
    }
    // console.log("fileContent:" + JSON.stringify(file.path + file.name));
}
function getAppHostListCall(hostList, intask) {
    // debugger;
    if (CheckConfiger.status == "stop")
        return;
    pullstatus.html(("共获得 appHostList " + hostList.length + ""));
    console.log(("共获得 appHostList " + hostList.length + ""));
    intask.addTaskNum(hostList.length);
    function dealhostList(index) {
        function task1() {
            var taskNum = 0;
            var successNum = 0;
            this.addTaskNum = function (n) {
                taskNum += n;
            };
            this.log = function () {
                console.log("taskNum:" + taskNum + "    successNum:" + successNum);
            };
            this.addSuccessNum = function (n) {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                successNum += n;
                if (taskNum == successNum) {
                    this.propertyChange();
                }
            };
            this.propertyChange = function () {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                if (index < hostList.length - 1) {
                    intask.addSuccessNum(1);
                    dealhostList(++index);
                } else {
                    intask.addSuccessNum(1);
                }
            }
        }

        debugger;

        console.log(index + 1);
        var task = new task1();
        var host = hostList[index];
        console.log(JSON.stringify(host));
        if (CheckConfiger.status == "stop")
            return;
        pullstatus.html(("获得 AppHostDomainValue :" + host.url + ""));
        console.log(("获得 AppHostDomainValue :" + host.url + ""));
        CheckConfiger.tomcatConfig.getAppHostDomainValue(host, getAppHostDomainValueCall, task);
    }

    dealhostList(0);
}
function getAppHostDomainValueCall(host, intask) {
    // debugger;
    if (CheckConfiger.status == "stop")
        return;
    pullstatus.html(("正在获得 appHostFilesList "));
    console.log(("正在获得 appHostFilesList "));
    CheckConfiger.tomcatConfig.getAppHostFilesList(host, getAppHostFilesListCall, intask);
    // var url = CheckConfiger.tomcatConfig.action.appHostFilesList(value, "false", "/conf");
    // CheckConfiger.tomcatConfig.getAppHostFilesList(url, getAppHostFilesListCall);
}
function getAppHostFilesListCall(files, intask) {
    debugger;
    if (CheckConfiger.status == "stop")
        return;
    pullstatus.html(("共获得 appHostFilesList " + files.length));
    console.log(("共获得 appHostFilesList " + files.length));
    intask.addTaskNum(files.length);
    function dealfiles(index) {
        if (CheckConfiger.status == "stop")
            return;
        function task1() {
            var taskNum = 0;
            var successNum = 0;
            this.addTaskNum = function (n) {
                taskNum += n;
            };
            this.log = function () {
                console.log("taskNum:" + taskNum + "    successNum:" + successNum);
            };
            this.addSuccessNum = function (n) {
                debugger;
                if (CheckConfiger.status == "stop")
                    return;
                successNum += n;
                if (taskNum == successNum) {
                    this.propertyChange();
                }
            };
            this.propertyChange = function () {
                debugger;
                if (CheckConfiger.status == "stop")
                    return;
                if (index < files.length - 1) {
                    intask.addSuccessNum(1);
                    dealfiles(++index);
                } else {
                    intask.addSuccessNum(1);
                }
            }
        }

        var task = new task1();
        var file = files[index];
        task.addTaskNum(1);
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
                hostIp: file.hostIp,
            };
            CheckConfiger.tomcatConfig.getAppHostFileDetial(url, param, tomcatSaveAsFile, task);
        } else {
            task.addSuccessNum(1);
        }
    }

    dealfiles(0);
}
function tomcatConfigDownloadCall(file) {
    // debugger;
    if (CheckConfiger.status == "stop")
        return;
    var type = getFileType(file);
    switch (type) {
        case "sh":
            if (CheckConfiger.status == "stop")
                break;
            if (file.name == "start.sh") {
                var opts = file.content.match(/JAVA_OPTS\s*=\s*"\s*(.*)\s*"\s*\n/)[1];
                var javaOpts = {
                    Xms: opts.replace(/.*-Xms(\d+m).*/, "$1"),
                    Xmx: opts.replace(/.*-Xmx(\d+m).*/, "$1"),
                    MaxPermSize: opts.replace(/.*-XX:MaxPermSize=(\d+m).*/, "$1"),
                    defaultConnectTimeout: opts.replace(/.*-Dsun.net.client.defaultConnectTimeout=(\d+).*/, "$1"),
                    defaultReadTimeout: opts.replace(/.*-Dsun.net.client.defaultReadTimeout=(\d+).*/, "$1"),
                    cacheTtl: opts.replace(/.*-Dnetworkaddress.cache.ttl=(\d+).*/, "$1"),
                    inetaddrTtl: opts.replace(/.*-Dsun.net.inetaddr.ttl=(\d+).*/, "$1")
                };
                console.log("javaOpts : %s ", JSON.stringify(javaOpts));
                // if (server.connectionTimeout <= Number(CheckConfiger.config.tomcat.connectionTimeout.normal)) {
                //     CheckConfiger.write(server);
                // }
            }
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
                var server = {
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
                // console.log("server : %s ", JSON.stringify(server));
                // if (server.connectionTimeout <= Number(CheckConfiger.config.tomcat.connectionTimeout.normal)) {
                //     CheckConfiger.write(server);
                // }
            }
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
    }
}
CheckConfiger.start = function () {
    CheckConfiger.parseConfig();
    function appTask() {
        var taskNum = 0;
        var successNum = 0;
        this.addTaskNum = function (n) {
            taskNum += n;
        };
        this.log = function () {
            console.log("taskNum:" + taskNum + "    successNum:" + successNum);
        };
        this.addSuccessNum = function (n) {
            // debugger;
            if (CheckConfiger.status == "stop")
                return;
            successNum += n;
            if (taskNum == successNum) {
                this.propertyChange();
            }
        };
        this.propertyChange = function () {
            // debugger;
            if (CheckConfiger.status == "stop")
                return;
            function dealtomcatId(index) {
                CheckConfiger.appConfig.task.addTaskNum(1);
                function task1() {
                    var taskNum = 0;
                    var successNum = 0;
                    this.addTaskNum = function (n) {
                        taskNum += n;
                    };
                    this.log = function () {
                        console.log("taskNum:" + taskNum + "    successNum:" + successNum);
                    };
                    this.addSuccessNum = function (n) {
                        // debugger;
                        // debugger;
                        if (CheckConfiger.status == "stop")
                            return;
                        successNum += n;
                        if (taskNum == successNum) {
                            this.propertyChange();
                        }
                    };
                    this.propertyChange = function () {
                        // debugger;
                        if (CheckConfiger.status == "stop")
                            return;
                        if (index < deploy.tomcat.ids.length - 1) {
                            CheckConfiger.appConfig.task.addSuccessNum(1);
                            dealtomcatId(++index);
                        } else {
                            CheckConfiger.appConfig.task.addSuccessNum(1);
                        }
                    }
                }

                var task = new task1();
                var tomcatId = deploy.tomcat.ids[index];
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                pullstatus.html(("创建文件系统'/tomcat/" + tomcatId + "/'"));
                console.log(("创建文件系统'/tomcat/" + tomcatId + "/'"));
                CheckConfiger.fs.mkdirs("tomcat/" + tomcatId, function (err) {
                    if (err) {
                        console.error(err.name + " : " + err.message);
                    }
                    pullstatus.html(("正在处理 tomcat appId: " + tomcatId + ""));
                    console.log(("正在处理 tomcat appId: " + tomcatId + ""));
                    CheckConfiger.tomcatConfig.getAppHostListAjax(tomcatId, 1, [], getAppHostListCall, task);
                });
            }

            dealtomcatId(0);
        }
    }

    CheckConfiger.appConfig.task = new appTask();
    function tomcatTask() {
        var taskNum = 0;
        var successNum = 0;
        this.addTaskNum = function (n) {
            taskNum += n;
        };
        this.log = function () {
            console.log("taskNum:" + taskNum + "successNum:" + successNum);
        };
        this.addSuccessNum = function (n) {
            // debugger;
            // debugger;
            if (CheckConfiger.status == "stop")
                return;
            successNum += n;
            if (taskNum == successNum) {
                this.propertyChange();
            }
        };
        this.propertyChange = function () {
            // debugger;
            if (CheckConfiger.status == "stop")
                return;
            pullstatus.html(("正在创建文件系统/nginx/"));
            console.log(("正在创建文件系统/nginx/"));
            CheckConfiger.fs.mkdir("/nginx", function (err) {
                if (err) {
                    console.error(err.name + " : " + err.message);
                }
                deploy.nginx.ids.forEach(function (appId) {
                    // debugger;
                    pullstatus.html(("正在处理 nginx appId: " + appId + ""));
                    console.log(("正在处理 nginx appId: " + appId + ""));
                    CheckConfiger.tomcatConfig.getAppHostListAjax(appId, 1, [], getAppHostListForNginxCall);
                });
            });

        };
    }

    CheckConfiger.tomcatConfig.task = new tomcatTask();
    function nginxTask() {
        var taskNum = 0;
        var successNum = 0;
        this.addTaskNum = function (n) {
            taskNum += n;
        };
        this.log = function () {
            console.log("taskNum:" + taskNum + "successNum:" + successNum);
        };
        this.addSuccessNum = function (n) {
            // debugger;
            // debugger;
            if (CheckConfiger.status == "stop")
                return;
            successNum += n;
            if (taskNum == successNum) {
                this.propertyChange();
            }
        };
        this.propertyChange = function () {
            // debugger;
            if (CheckConfiger.status == "stop")
                return;
            //TODO 加载完成
            pullstatus.html(("文件拉取成功，开始计算"));
            console.log(("文件拉取成功，开始计算"));
            $(".start span").html("0.00");
        }
    }


    CheckConfiger.nginxConfig.task = new nginxTask();
    pullstatus.html(("正在清理文件系统"));
    console.log(("正在清理文件系统"));
    CheckConfiger.fs.cleanfs("/", function () {
        // debugger;
        CheckConfiger.appConfig.task.addTaskNum(deploy.app.ids.length);
        function dealappId(index) {
            function task1() {
                var taskNum = 0;
                var successNum = 0;
                this.addTaskNum = function (n) {
                    taskNum += n;
                };
                this.log = function () {
                    console.log("taskNum:" + taskNum + "    successNum:" + successNum);
                };
                this.addSuccessNum = function (n) {
                    // debugger;
                    if (CheckConfiger.status == "stop")
                        return;
                    successNum += n;
                    if (taskNum == successNum) {
                        this.propertyChange();
                    }
                };
                this.propertyChange = function () {
                    // debugger;
                    if (CheckConfiger.status == "stop")
                        return;
                    if (index < deploy.app.ids.length - 1) {
                        CheckConfiger.appConfig.task.addSuccessNum(1);
                        dealappId(++index);
                    } else {
                        CheckConfiger.appConfig.task.addSuccessNum(1);
                    }
                }
            }

            var task = new task1();
            var appId = deploy.app.ids[index];
            pullstatus.html(("创建文件系统'/app/" + appId + "/'"));
            console.log(("创建文件系统'/app/" + appId + "/'"));
            CheckConfiger.fs.mkdirs("app/" + appId, function (err) {
                if (err) {
                    console.error(err.name + " : " + err.message);
                }
                pullstatus.html(("正在处理 app appId: " + appId + ""));
                console.log(("正在处理 app appId: " + appId + ""));
                CheckConfiger.appConfig.getAppGroupListAjax(appId, 1, [], appGroupListCall, task);

            });
        }

        dealappId(0);
    });
};
function getAppHostListForNginxCall(hostList) {
    if (CheckConfiger.status == "stop")
        return;
    var arr = [];
    pullstatus.html(("共获得 appHostList " + hostList.length));
    console.log(("共获得 appHostList " + hostList.length));
    CheckConfiger.nginxConfig.task.addTaskNum(hostList.length);
    hostList.forEach(function (host) {
        if (CheckConfiger.status == "stop")
            return;
        arr.push(host.hostIp);
        if (arr.length == 100) {
            // debugger;
            pullstatus.html(("正在批量获得 nginx配置 "));
            console.log(("正在批量获得 nginx配置 "));
            CheckConfiger.getNginxConfig(JSON.stringify(arr), nginxSaveAsFile);
            arr = [];
        }
    });
}
CheckConfiger.stop = function () {
    CheckConfiger.status = "stop";
};
chrome.storage.local.get(function (itmes) {
    CheckConfiger.configXml = itmes.healthMonitoringConfig;
});

$(function () {
    pullstatus = $(".pull-status");
    getfs(function (err, fs) {
        if (err) {
            console.error(err.name + " : " + err.message);
        } else {
            CheckConfiger.fs = fs;
        }
    });
    $(".start").on("click", function () {
        var statusDom = $(this).find("span");
        if (CheckConfiger.status == "stop") {
            CheckConfiger.status = "start";
            statusDom.html("正在加载配置文件");
            CheckConfiger.start();
            $(this).addClass("scroll");
        } else {
            statusDom.html("开始检测");
            CheckConfiger.stop();
            $(this).removeClass("scroll");
        }
    });
});
function appSaveAsFile(file, intask) {
    if (CheckConfiger.status == "stop")
        return;
    var filePath = file.type + "/" + file.appId + "/" + file.groupId + "/" + file.configId + "/" + file.filePath;
    pullstatus.html(("正在保存文件 " + filePath + ""));
    console.log(("正在保存文件 " + filePath + ""));
    CheckConfiger.fs.writefile(filePath, file.content, function (err) {
        if (CheckConfiger.status == "stop")
            return;
        if (err) {
            console.error(err.name + " : " + err.message);
        } else {
            pullstatus.html(("保存文件 " + filePath + "成功"));
            console.log(("保存文件 " + filePath + "成功"));
        }
        intask.addSuccessNum(1);

    });
};
function tomcatSaveAsFile(file, intask) {
    if (CheckConfiger.status == "stop")
        return;
    debugger;
    var filePath = file.type + "/" + file.appId + "/" + file.hostIp + file.id;
    pullstatus.html(("正在保存文件 " + filePath));
    console.log(("正在保存文件 " + filePath));
    CheckConfiger.fs.writefile(filePath, file.content, function (err) {
        if (CheckConfiger.status == "stop")
            return;
        if (err) {
            console.error(err.name + " : " + err.message);
        } else {
            pullstatus.html(("保存文件 " + filePath + "成功"));
            console.log(("保存文件 " + filePath + "成功"));
        }
        intask.addSuccessNum(1);
    });
};
function nginxSaveAsFile(files) {
    // debugger;
    if (CheckConfiger.status == "stop")
        return;
    pullstatus.html(("本次批量获得 nginx配置 " + files.length));
    console.log(("本次批量获得 nginx配置 " + files.length));
    for (var k = 0; k < files.length; k++) {
        if (CheckConfiger.status == "stop")
            return;
        var file = files[k];
        var filePath = "nginx" + "/" + file.ip + "/conf.properties";
        pullstatus.html(("正在保存nginx配置文件 " + filePath));
        console.log(("正在保存nginx配置文件 " + filePath));
        CheckConfiger.fs.writefile(filePath, file.content, function (err) {
            if (CheckConfiger.status == "stop")
                return;
            CheckConfiger.nginxConfig.task.addSuccessNum(1);
            if (err) {
                console.error(err.name + " : " + err.message);
            } else {
                pullstatus.html(("保存文件 " + filePath + "成功"));
                console.log(("保存文件 " + filePath + "成功"));
            }
        });
    }

};

