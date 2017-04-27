/**
 * Created by caohongming on 2016/9/28.
 */
"use strict";


var CheckConfiger = CheckConfiger || {};
CheckConfiger.isOpenFileSystem = false;
CheckConfiger.status = "stop";
CheckConfiger.appConfig = {
    contentPath: "http://deploy.jd.com",
    action: {}, totalTaskNum: 0
}
;
CheckConfiger.tomcatConfig = {
    contentPath: "http://deploy.jd.com",
    action: {}
};
CheckConfiger.nginxConfig = {
    contentPath: "http://deploy.jd.com",
    action: {}
};
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

// CheckConfiger.appConfig.getAppList = function (callback) {
//     CheckConfiger.httpRequestGet(CheckConfiger.appConfig.action.appList(), "html", function (result) {
//         //debugger;
//         callback(result);
//     });
// };


CheckConfiger.resolveRef = function (bean) {
    if (!bean) {
        return "";
    }
    var regExp = /^\s*\$\{\s*(.*)\s*}\s*/;
    var key = bean.value;
    if (key.match(regExp)) {
        return CheckConfiger.appConfig.currentServiceProperties[key.replace(regExp, "$1")];
    }
    return key.replace(/^\s*(.*)\s*/, "$1");
};
CheckConfiger.getFileType = function (file) {
    // debugger;
    var type = "string", name = file.name;
    try {
        type = name.substring(name.lastIndexOf('.') + 1, name.length);
    } catch (e) {
    }
    return type;
};
CheckConfiger.parseConfig = function (configXml) {
    var content = new DOMParser().parseFromString(configXml, "text/xml");
    var kinds = content.getElementsByTagName("sysconfcheck")[0].children;
    CheckConfiger.config = {};
    CheckConfiger.totalScore = {};
    for (var i = 0; i < kinds.length; i++) {
        var kindName = kinds[i].tagName;
        CheckConfiger.config[kindName] = {};
        CheckConfiger.totalScore[kindName] = {taskNum: 0, score: 0};
        var items = kinds[i].children;
        for (var j = 0; j < items.length; j++) {
            var itemName = items[j].tagName;
            CheckConfiger.config[kindName][itemName] = {};
            switch (items[j].getAttribute("type")) {
                case "number":
                    var score = Number(items[j].getAttribute("score"));
                    CheckConfiger.config[kindName][itemName]["type"] = "number";
                    CheckConfiger.config[kindName][itemName]["score"] = score;
                    CheckConfiger.config[kindName][itemName]["segment"] = [];
                    var sections = items[j].children;
                    for (var k = 0; k < sections.length; k++) {
                        var weight = Number(sections[k].getAttribute("weight"));
                        var regx = sections[k].getAttribute("range") || sections[k].getAttribute("equals");
                        CheckConfiger.config[kindName][itemName]["segment"].push({weight: weight, regx: regx});
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


CheckConfiger.initDb = function () {
    CheckConfiger.db = {};
    try {
        if (!window.openDatabase) {
            console.log('db not supported');
        } else {
            var shortName = 'CheckConfigerDB ';
            var version = '3.0';
            var displayName = 'CheckConfigerDB offline database';
            var maxSize = 65536;
            CheckConfiger.db = openDatabase(shortName, version, displayName, maxSize);
            CheckConfiger.db.transaction(
                function (transaction) {
                    transaction.executeSql('CREATE TABLE IF NOT EXISTS CheckConfiger ( checkId INTEGER, checkType VARCHAR, checkSubItem VARCHAR, oldValue VARCHAR, score NUMBER, path VARCHAR, error VARCHAR, date DATE) ',
                        [], function (result) {

                        }, function (transaction, error) {
                            console.log(error.source + ":" + error.message);
                        });
                }
            );
        }
    } catch (e) {
        console.error(error.source + ":" + error.message);
    }
};
CheckConfiger.dropDb = function () {
    CheckConfiger.db.transaction(function (transaction) {
        transaction.executeSql("DROP TABLE CheckConfiger ", [], function (transaction, error) {
            console.log(error.source + ":" + error.message);
        });
    });
};
CheckConfiger.getData = function (sql, param, callback) {
    CheckConfiger.db.transaction(
        function (transaction) {
            transaction.executeSql(sql || "SELECT top *  100  FROM  CheckConfiger ", param || [], function (transaction, rs) {
                callback(null, transaction, rs);
            }, function (transaction, error) {
                callback(error, transaction);
            });
        });
};
CheckConfiger.deleteData = function (date) {
    CheckConfiger.db.transaction(
        function (transaction) {
            transaction.executeSql('DELETE FROM CheckConfiger WHERE date=?', [date],
                function (result) {
                }, function (transaction, error) {
                    console.log(error.source + ":" + error.message);
                });
        });
};