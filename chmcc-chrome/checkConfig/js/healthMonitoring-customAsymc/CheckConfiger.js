/**
 * Created by caohongming on 2016/9/28.
 */
"use strict";


var CheckConfiger = CheckConfiger || {};
CheckConfiger.status = "stop";
CheckConfiger.appConfig = {
    contentPath: "http://deploy.jd.com",
    action: {}

};


CheckConfiger.tomcatConfig = {
    contentPath: "http://deploy.jd.com",
    action: {}
};
CheckConfiger.nginxConfig = {
    contentPath: "http://deploy.jd.com",
    action: {}
};
CheckConfiger.currentServiceProperties = {};
CheckConfiger.error = {};
var gotoPageMatcher = /^\s*XUI\.gotoPage\('\/(\d*)\/config\/group-(\d*)\/(\d*)'\)\s*;*\s*$/;
var downloadConfigMatcher = /^\s*XUI\.app\.configWindow\('(.*?)','(.*?)','(.*?)','(.*?)','(.*?)','(.*?)'\)\s*;*\s*$/;
var windowOpenMatcher = /^\s*XUI\.window\.open\('(.*)'\s*,\s*'(.*)'\)\s*;*\s*$/;
CheckConfiger.appConfig.action.appList = function () {
    return CheckConfiger.appConfig.contentPath + "/app?_=" + (new Date()).valueOf();
};

CheckConfiger.appConfig.action.configList = function (pageUrl) {
    return CheckConfiger.appConfig.contentPath + pageUrl + "?_=" + (new Date()).valueOf();
};
CheckConfiger.appConfig.action.configDownload = function (appId, configId, filePath) {
    var acc = {};
    acc.url = CheckConfiger.appConfig.contentPath + "/" + appId + "/config/view-" + configId;
    acc.param = {
        type: 'group',
        reType: 'download',
        filePath: filePath,
        attachment: true
    };
    return acc;
};
// CheckConfiger.tomcatConfig.action.appHostList = function (appId) {
//
// };
CheckConfiger.tomcatConfig.action.appHostFilesOptionalPath = function (url) {
    return CheckConfiger.appConfig.contentPath + url + "?_=" + (new Date()).valueOf();
};
CheckConfiger.tomcatConfig.action.appHostFilesList = function (value, onlyIncludeDir, id) {
    return CheckConfiger.appConfig.contentPath + "/tools/browser/" + value + "/fs.json?onlyIncludeDir=" + onlyIncludeDir + "&id=" + id + "&_=" + (new Date()).valueOf();
};
CheckConfiger.tomcatConfig.action.appHostFileDetial = function (baseURI) {
    return CheckConfiger.appConfig.contentPath + baseURI;
};

CheckConfiger.appConfig.getAppList = function (callback) {
    CheckConfiger.httpRequestGet(CheckConfiger.appConfig.action.appList(), "html", function (result) {
        // debugger;
        callback(result);
    });
};
CheckConfiger.appConfig.getAppGroupListAjax = function (appId, next, arr, callback, task) {
    next = next || 1;
    pullstatus.html(("正在获得 AppGroupList 第" + next + "页"));
    console.log(("正在获得 AppGroupList 第" + next + "页"));
    var ajaxError = function (err) {
        if (err) {
            // debugger;
            console.error(err.name + " : " + err.message);
        }
    };
    var ajaxSuccess = function (result) {
        // debugger;
        arr = arr || [];
        $(result).find('table tbody tr').each(function () {
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
            next = $(result).find(".page a[class='next']").attr("onclick").replace(/XUI.form.page\((\d+)\)/, '$1');
            if (next) {
                CheckConfiger.appConfig.getAppGroupListAjax(appId, next, arr, callback, task);
            } else {
                callback(arr, task);
            }
        } catch (e) {
            callback(arr, task);
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
};

CheckConfiger.appConfig.getAppConfigList = function (pageUrl, callback, intask) {
    var url = CheckConfiger.appConfig.action.configList(pageUrl.pageUrl);
    pullstatus.html(("正在请求 " + url + ""));
    console.log(("正在请求 " + url + ""));
    CheckConfiger.httpRequestGet(url, "html", function (result) {
        // debugger;
        var array = [];
        $(result).find("table tbody tr").each(function () {
            //XUI.app.configWindow('6274','1139627','group','WEB-INF/web.xml','','false')
            var arr, onclick = $(this).find("td:last div a:first").attr("onclick");
            if (onclick && ( arr = onclick.match(downloadConfigMatcher) )) {
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
        callback(array, intask);
    });
};
CheckConfiger.appConfig.getConfigDownload = function (url, params, callback) {
    var type = "html";
    type = params.filePath.indexOf(".xml") >= 0 ? "xml" : type;
    CheckConfiger.httpRequestPost(url, params, type, function (result) {
        // debugger;
        var arr = params.filePath.split('/');
        var file = {
            path: params.filePath.replace(arr[arr.length - 1], ''),
            name: arr[arr.length - 1],
            content: result
        };
        callback(file);
    });
};
CheckConfiger.tomcatConfig.getAppHostListAjax = function (appId, next, arr, callback, intask) {
    if (CheckConfiger.status == "stop")
        return;
    next = next || 1;
    pullstatus.html(("正在获得 AppHostList 第" + next + "页"));
    console.log(("正在获得 AppHostList 第" + next + "页"));
    var ajaxError = function (err) {
        // debugger;
        if (err) {
            console.error(err.name + " : " + err.message);
        }
    };
    var ajaxSuccess = function (result) {
        if (CheckConfiger.status == "stop")
            return;
        // debugger;
        arr = arr || [];
        $(result).find("table tbody tr").each(function () {
                var ip = ($(this).find("td:eq(2)").text() || "").trim();
                if (ip.match(/^10\..*/)) {
                    var bean = {
                        hostId: $(this).find("td:first input").val(),
                        computerRoom: ($(this).find("td:eq(1)").text() || "").trim(),
                        hostIp: ip,
                        hostName: ($(this).find("td:eq(3)").text() || "").trim(),
                        url: $(this).find("td:last div a:first").attr("onclick").replace(windowOpenMatcher, "$2")///tools/browser/5E092CB6887839880A0CB1A9FA3412C8/fs
                    };
                    arr.push(bean);
                }
            }
        );
        try {
            next = $(result).find(".page a[class='next']").attr("onclick").replace(/XUI.form.page\((\d+)\)/, '$1');
            if (next) {
                CheckConfiger.tomcatConfig.getAppHostListAjax(appId, next, arr, callback, intask);
            } else {
                callback(arr, intask);
            }
        } catch (e) {
            callback(arr, intask);
        }
    };
    $.ajax({
        type: 'POST',
        data: {id: appId, currentPage: next, orderField: "", orderFieldType: "", keyword: "", pageSize: 1038},
        url: CheckConfiger.appConfig.contentPath + "/host/appHostList",
        cache: false,
        async: false,
        success: ajaxSuccess,
        error: ajaxError
    });
};
CheckConfiger.tomcatConfig.getAppHostDomainValue = function (host, callback, intask) {
    if (CheckConfiger.status == "stop")
        return;
    var ajaxError = function (err) {
        // debugger;
        if (err) {
            console.error(err.name + " : " + err.message);
        }
    };
    var ajaxSuccess = function (result) {
        if (CheckConfiger.status == "stop")
            return;
        debugger;
        try {
            if (result instanceof Object) {
                console.error(result.result);
                intask.addTaskNum(1);
                intask.addSuccessNum(1);
            } else {
                $(result).find("select option").each(function () {
                    if ($(this).text().indexOf("/export/Domains") >= 0) {
                        host.value = $(this).val().trim();
                    }
                });
                callback(host, intask);
            }
        } catch (e) {
            try {
                console.error(result.result);
            } catch (e) {
                console.error("获取信息失败！");
            }
            intask.addTaskNum(1);
            intask.addSuccessNum(1);
        }
    };
    $.ajax({
        type: 'GET',
        url: CheckConfiger.appConfig.contentPath + host.url,
        cache: false,
        async: false,
        success: ajaxSuccess,
        error: ajaxError
    });
};
CheckConfiger.tomcatConfig.getAppHostFilesList = function (host, callback, intask) {
    if (CheckConfiger.status == "stop")
        return;
    var url = CheckConfiger.tomcatConfig.action.appHostFilesList(host.value, "false", "/bin");
    pullstatus.html(("正在请求：" + url));
    console.log(("正在请求：" + url));
    CheckConfiger.httpRequestGet(url, "json", function (result) {
        if (CheckConfiger.status == "stop")
            return;
        // debugger;
        var array = [];
        result.forEach(function (file) {
            if (CheckConfiger.status == "stop")
                return;
            var name = file.name.match(/(.*)<span.*span>/)[1];
            if (name.indexOf(".bak") < 0) {
                array.push({
                    baseURI: file.baseURI,
                    appId: file.appId,
                    canView: file.canView,
                    isParent: file.isParent,
                    hostId: file.hostId,
                    hostName: file.hostName,
                    computerRoom: file.computerRoom,
                    hostIp: host.hostIp,
                    id: file.id,
                    name: name
                });
            }

        });
        callback(array, intask);
    });
};
CheckConfiger.tomcatConfig.getAppHostFileDetial = function (url, params, callback, intask) {
    if (CheckConfiger.status == "stop")
        return;
    pullstatus.html(("正在下载文件: " + params.id));
    console.log(("正在下载文件: " + params.id));
    CheckConfiger.httpRequestPost(url, params, "html", function (result) {
        // debugger;
        var xml = $($(result)[2]).text();
        params.content = xml;
        params.type = "tomcat";
        callback(params, intask);
    });
};
CheckConfiger.httpRequestGet = function (url, contentType, callback) {
    pullstatus.html(("正在请求：" + url));
    console.log(("正在请求：" + url));
    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        async: false,
        dataType: contentType,
        success: function (result) {
            callback(result);
        },
        failure: function (result) {
            console.log(result);
        }
    });
};
CheckConfiger.httpRequestPost = function (url, params, contentType, callback) {
    pullstatus.html(("正在请求：" + url));
    console.log(("正在请求：" + url));
    $.ajax({
        type: "POST",
        url: url,
        data: params,
        cache: false,
        async: false,
        dataType: contentType,
        success: function (result) {
            callback(result);
        },
        failure: function (result) {
            console.log(result);
        }
    });
};
CheckConfiger.write = function (param) {
    console.log(param);
};
CheckConfiger.parseConfig = function () {
    // debugger;
    var content = new DOMParser().parseFromString(CheckConfiger.configXml, "text/xml");
    CheckConfiger.configXml = {};
    var kinds = content.getElementsByTagName("sysconfcheck")[0].children;
    CheckConfiger.config = {};
    // debugger;
    for (var i = 0; i < kinds.length; i++) {
        var kindName = kinds[i].tagName;
        CheckConfiger.config[kindName] = {};
        var items = kinds[i].children;
        for (var j = 0; j < items.length; j++) {
            var itemName = items[j].tagName;
            CheckConfiger.config[kindName][itemName] = {};
            switch (items[j].getAttribute("type")) {
                case "number":
                    var score = Number(items[j].getAttribute("score"));
                    CheckConfiger.config[kindName][itemName]["type"] = "number";
                    CheckConfiger.config[kindName][itemName]["core"] = score;
                    CheckConfiger.config[kindName][itemName]["segment"] = [];
                    var sections = items[j].children;
                    for (var k = 0; k < sections.length; k++) {
                        var weight = Number(sections[k].getAttribute("weight"));
                        var reg = sections[k].getAttribute("range") || sections[k].getAttribute("equals");
                        CheckConfiger.config[kindName][itemName]["segment"].push({weight: weight, reg: reg});
                    }
                    break;
                case "string":
                    var score = Number(items[j].getAttribute("score"));
                    var value = items[j].getAttribute("value");
                    CheckConfiger.config[kindName][itemName]["type"] = "string";
                    CheckConfiger.config[kindName][itemName]["score"] = score;
                    CheckConfiger.config[kindName][itemName]["value"] = value;
                    break;
                case "boolean":
                    var score = Number(items[j].getAttribute("score"));
                    var value = Boolean(items[j].getAttribute("value"));
                    CheckConfiger.config[kindName][itemName]["type"] = "boolean";
                    CheckConfiger.config[kindName][itemName]["score"] = score;
                    CheckConfiger.config[kindName][itemName]["value"] = value;
                    break;
                default:
                    break;
            }
        }
    }
    content = null;
};

CheckConfiger.downloadFile = function (param, callback, intask) {
    intask.addTaskNum(1);
    pullstatus.html(("正在下载文件 " + param.filePath + ""));
    console.log(("正在下载文件 " + param.filePath + ""));
    $.ajax({
        url: CheckConfiger.appConfig.contentPath + "/" + param.appId + "/config/view-" + param.configId,
        data: {type: "group", reType: "download", filePath: param.filePath, encoding: param.encoding},
        type: "post",
        dataType: "text",
        async: false,
        cache: false,
        success: function (txt) {
            // debugger;
            var arr = param.filePath.split('/');
            callback({
                path: param.filePath.replace(arr[arr.length - 1], ''),
                name: arr[arr.length - 1],
                content: txt,
                appId: param.appId,
                configId: param.configId,
                encoding: param.encoding,
                filePath: param.filePath,
                groupId: param.groupId,
                type: param.type
            }, intask);
        }
    });
};
CheckConfiger.getNginxConfig = function (ipArr, callback) {
    if (CheckConfiger.status == "stop")
        return;
    var obj;
    pullstatus.html(("正在请求：" + "http://bmt.jd.com/customer/query/mission_create/"));
    console.log(("正在请求：" + "http://bmt.jd.com/customer/query/mission_create/"));
    $.ajax({
        type: 'POST',
        data: {ip_list: ipArr, query_tag: "query_conf_nginx"},
        url: "http://bmt.jd.com/customer/query/mission_create/",
        cache: false,
        async: false,
        // dataType: "json",
        success: function (res) {
            if (CheckConfiger.status == "stop")
                return;
            // debugger;
            var id = res.match(/(.*\n)*\s*var\s*url\s*=\s*"\/customer\/query\/ajax_mission_status"\s*;\s*\n\s*var\s*data\s*=\s*\"\s*id=(\d+)\s*\"\s*;\s*(.*\n)*/)[2];
            obj = setInterval(getMissionStatus(id, callback), 3000);
        },
        error: function (res) {
            // debugger;
        }
    });
    function getMissionStatus(id, callback) {
        if (CheckConfiger.status == "stop")
            return;
        pullstatus.html(("正在请求：" + "http://bmt.jd.com/customer/query/ajax_mission_status"));
        console.log(("正在请求：" + "http://bmt.jd.com/customer/query/ajax_mission_status"));
        $.ajax({
            type: "get",
            dataType: "json",
            async: false,  //同步请求
            url: "http://bmt.jd.com/customer/query/ajax_mission_status",
            data: {id: id},
            timeout: 1000,
            success: function (datas) {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                if (datas.statusCode == 1) {
                    getMissionData(id, callback);
                    clearInterval(obj);
                }
            },
            error: function () {
                // debugger;
            }
        });
    };
    function getMissionData(id, callback) {
        if (CheckConfiger.status == "stop")
            return;
        pullstatus.html(("正在请求：" + "http://bmt.jd.com/customer/query/mission_getdata"));
        console.log(("正在请求：" + "http://bmt.jd.com/customer/query/mission_getdata"));
        $.ajax({
            type: "get",
            dataType: "json",
            async: false,  //同步请求
            url: "http://bmt.jd.com/customer/query/mission_getdata",
            data: {id: id},
            timeout: 2000,
            success: function (datas) {
                if (CheckConfiger.status == "stop")
                    return;
                // debugger;
                var arr = [];
                $(datas.result).each(function () {
                    arr.push({
                        ip: $(this).find("td:first").html().trim(),
                        content: $(this).find("td:last").html().replace(/<br>/g, '\n')
                    });
                });

                callback(arr);
            },
            error: function () {
                // debugger;
            }
        });
    };
}
