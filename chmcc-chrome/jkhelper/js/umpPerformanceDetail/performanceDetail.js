var funcrootpath = "http://ump.jd.com";
Date.prototype.format = function (e) {
    var a = function (m, l) {
        var n = "", k = (m < 0), j = String(Math.abs(m));
        if (j.length < l) {
            n = (new Array(l - j.length + 1)).join("0")
        }
        return (k ? "-" : "") + n + j
    };
    if ("string" != typeof e) {
        return this.toString()
    }
    var b = function (k, j) {
        e = e.replace(k, j)
    };
    var f = this.getFullYear(), d = this.getMonth() + 1, i = this.getDate(), g = this.getHours(), c = this.getMinutes(), h = this.getSeconds();
    b(/yyyy/g, a(f, 4));
    b(/yy/g, a(parseInt(f.toString().slice(2), 10), 2));
    b(/MM/g, a(d, 2));
    b(/M/g, d);
    b(/dd/g, a(i, 2));
    b(/d/g, i);
    b(/HH/g, a(g, 2));
    b(/H/g, g);
    b(/hh/g, a(g % 12, 2));
    b(/h/g, g % 12);
    b(/mm/g, a(c, 2));
    b(/m/g, c);
    b(/ss/g, a(h, 2));
    b(/s/g, h);
    return e
};
var groups = [];
/**
 * 打开页面详细
 */

$(function () {

    function getGroup(appId, callback) {
        $.ajax({
            type: "post",
            cache: false,
            url: "http://deploy.jd.com/" + appId + "/group",
            data: {view: 'module', currentPage: 1, pageSize: 500},
            success: function (data) {
                var group = [];
                $(data).find("table tr td .cotBox").each(function () {
                    var name = $(this).find("h2 span").html();
                    if (name.indexOf("172") < 0 && name.indexOf("txy") < 0) {
                        var ips = [];
                        if ($(this).find("p").html().indexOf("<br") >= 0) {
                            var ips = $(this).find("p").html().replace(/\s*\n\s*/g, '').split('<br>');
                        } else {
                            $(this).find("p").find("label").each(function () {
                                try {
                                    var ip = $(this).html().match(/\s*<.*>\s*\n\s*(.*)\s*/)[1];
                                    if (ip) {
                                        ips.push(ip);
                                    }
                                } catch (e) {
                                }
                            });
                        }
                        if (ips) {
                            group.push({name: name, ips: ips, data: []});
                        }
                    }
                });
                data = null;
                callback(null, group);
            },
            error: function (err) {
                callback(err);
            }
        });
    }

    function getUmpData(callback) {
        groups = callback.getPreviousTaskResult() || [];
        var param = GlobalUtils.GetRequest(window.location.search);
        $(":input[name='xData']").val(param['datas.xData']);
        $(":input[name='yData']").val(param['datas.yData']);
        $(":input[name='tpName']").val(param['datas.tpName']);
        $(":input[name='accessKey']").val(param['datas.accessKey']);
        $(":input[name='type']").val(param['datas.type']);
        $(":input[name='dType']").val(param['datas.dType']);
        $(":input[name='appId']").val(param['datas.appId']);
        $(":input[name='timeStr']").val(new Date(Number(param['datas.xData']) + 60 * 1000).format("yyyy-MM-dd HH:mm:ss"));

        window.type = $(":input[name='type']").val();
        window.tpName = $(":input[name='tpName']").val();
        var inputs = $(":input");
        var submitData = {};
        for (var i = 0; i < inputs.length; i++) {
            var key = "datas." + $(inputs[i]).attr("name");
            submitData[key] = $(inputs[i]).val();
        }
        $.ajax({
            type: "post",
            dataType: "json",
            cache: false,
            url: funcrootpath + "/performanceDetail/queryJsonData.action?timestamp=" + new Date(),
            data: submitData,
            success: function (data) {
                callback(null, data);
            }
        });
    }

    function groupData(callback) {
        var data = callback.getPreviousTaskResult() || [];
        if (data == null) {
            return;
        }

        for (var i = 0, len = data.length; i < len; i++) {
            var bean = data[i];
            for (var j = 0, lenj = groups.length; j < lenj; j++) {
                if (inArray(bean.hostName.replace("host-", '').replace("-", '.'), groups[j].ips)) {
                    groups[j].data.push(bean);
                }
            }
        }

        $("#container").html('');
        for (var k = 0, len = groups.length; k < len; k++) {
            $("#container").append("<div id='container_" + k + "'>" +
                "<div id='container" + k + "'></div>" +
                "<div id='idcLegend" + k + "'></div>" +
                "<div id='mouseOverHostIp" + k + "' style='width:100%;height:22px;'></div> " +
                "<div id='hiddenChartUrl" + k + "' style='display:none;'></div> " +
                "<div id='sourceData" + k + "'></div>" +
                "</div>");
            drawPicture(k, groups[k].data);
        }
        data = null;
    }

    function inArray(val, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                return true;
            }
        }
        return false;
    }

    var task = new jsFlow({isParallel: false});
    task.add(getGroup, window, 7499);
    task.add(getUmpData, window);
    task.add(groupData, window);
    task.fire(function (result) {
        console.log('所有任务执行完毕');
    }, function (e) {
        console.error('计算异常:' + JSON.stringify(e));
    });
});

/**
 * 具体渲染柱状图图片方法
 * @param pictitle：图片标题，yTitle：Y轴标题，xData：X轴展现的数据
 *          yData: Y轴展现的数据
 *          seriesName: 用与onmouse显示的字符
 * */
window.drawLinePicture = function (index, pictitle, yTitle, xData, yData, seriesName, maxValue, idc) {

    var method_option = getOption(index);
    var seriesData = [];
    var seriesAry = [];
    var seriesDataObj = {};
    getIdcColor(idcMap);
    //设置最大值
    method_option.yAxis.max = maxValue;
    //设置展现数据的series，Name的值
    seriesDataObj.name = seriesName;
    //设置需要展现的series,Data的值
    for (var i = 0; i < yData.length; i++) {
        var dataObj = {};
        dataObj.y = yData[i];
        dataObj.color = idcMap[idc[i]];
        seriesAry.push(dataObj);
    }
    seriesDataObj.data = seriesAry;
    seriesData.push(seriesDataObj);
    method_option.title.text = pictitle;
    //设置Y轴的字符
    method_option.yAxis.title.text = yTitle;
    method_option.xAxis.categories = xData;
    //设置X轴具体的值
    method_option.series = seriesData;
    new Highcharts.Chart(method_option);
    drawIdcLegend(index, idcMap);
};

var colors = ['#6699FF', '#339933', '#FF9900', '#FF6666', '#C0C0C0',
    '#CC99CC', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
//机房及其颜色MAP
var idcMap = {};
/**
 * 为机房分配颜色
 * @param idcMap
 */
function getIdcColor(idcMap) {
    if (idcMap != null) {
        var i = 0;
        for (var idc in idcMap) {
            idcMap[idc] = colors[i];
            i++;
            if (i > 9) {
                i = 0;
            }
        }
    }
}
/**
 * 绘制legend
 * @param idcMap
 */
function drawIdcLegend(index, idcMap) {
    if (idcMap != null) {
        var html = '<table><tr><td class="ts" width="60px">机房图例：</td>';
        for (var idc in idcMap) {
            html += '<td style = "color:#FFFFFF;width:100px;height:5px;background: ' + idcMap[idc] + '">' + idc + '</td>'
        }
        html += '</tr></table></br>';
        $("#idcLegend" + index).html(html);
    }
}
function getOption(index) {
    return {
        chart: {
            renderTo: 'container' + index,
            defaultSeriesType: 'column',
            inverted: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['360buy', '360buy1', '360buy2', '360buy3', '360buy4'],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    font: 'normal 13px Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            gridLineWidth: 1,
            lineWidth: 1,
            title: {text: ''}
        },
        legend: {
            layout: 'horizontal',
            backgroundColor: '#FFFFFF',
            borderColor: '#CCC',
            borderWidth: 1,
            align: 'right',
            verticalAlign: 'top',
            enabled: false,
            y: 20,
            shadow: true
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 2);
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                allowPointSelect: true,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (event) {
                            event.preventDefault();
                            try {
//                            		alert (this.series.name);
//                            		alert("<b>Result : index = "+event.point.x+" , series = "+this.name + ', x = '+event.point.category+' ,y = '+event.point.y+"</b>");
//                            		alert($("#appIdInput").val());
                                var appId = $(":input[name='appId']").val();
                                var machineName = event.point.category;
                                // 这里根据这个主机名称，去取得相应的的IP，再传入要该地址中去。
                                jQuery.ajax({
                                    type: "post",
                                    cache: false,
                                    url: funcrootpath + "/machine/queryHostIp.action?_charset_=utf-8",
                                    data: {
                                        "machineName": machineName,
                                        "appId": appId
                                    },
                                    success: function (data) {
                                        if (data != null && data != "") {
                                            var url = "http://mjdosapi.jd.com/chart.html?ip=" + data;
                                            $("#hiddenChartUrl" + index).html('<a  href="' + url + '" target=\"_blank\"><span id="chartIP' + index + '">' + data + '</span></a>');
                                            $("#chartIP" + index).click();
//            		                    		window.open("http://mpc.jd.com/hunterapi/enapi.php/Chart/show/?host=" + data,"_parent");
                                        }
                                    }
                                });

                            } catch (e) {
                                alert(e.message);
                            }
                        },
                        mouseOver: function (event) {
                            // var type = $(":input[name='type']").val();
                            // var html = '<span class="ts">当前主机：</span><input type="text" size="20" value="';
                            // var hostName = event.currentTarget.category;
                            // html += hostName + '"/>&nbsp;';
                            // html += '<span class="ts">';
                            // if (type == 'tp') {
                            //     html += '方法性能';
                            // } else if (type == 'invokeNo') {
                            //     html += '方法调用次数';
                            // } else {
                            //     html += '可用率';
                            // }
                            // html += '：</span>';
                            // var hostValueObj = document.getElementById("hostValue_" + hostName);
                            // html += $(hostValueObj).html();
                            // $("#mouseOverHostIp" + index).html(html);
                        },
                        mouseOut: function (event) {

                        }
                    }
                }
            }, bar: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [12, 23, 33, 45, 33]
    };
}

var sortOrderIdc = 0;
var sortOrderIp = 0;
var sortOrderCnt = 0;

function tableSortIdc(index) {
    var jsonData = groups[index].data;
    var order = sortOrderIdc;
    if (order == 0) {
        jsonData.sort(sortFunction("desc", "idc"));
        sortOrderIdc = 1;
    } else {
        jsonData.sort(sortFunction("asc", "idc"));
        sortOrderIdc = 0;
    }
    drawPicture(index, jsonData);
}

function tableSortIp(index) {
    var jsonData = groups[index].data;
    var order = sortOrderIp;
    if (order == 0) {
        jsonData.sort(sortFunction("desc", "hostName"));
        sortOrderIp = 1;
    } else {
        jsonData.sort(sortFunction("asc", "hostName"));
        sortOrderIp = 0;
    }
    drawPicture(index, jsonData);
}

function tableSort(index) {
    var jsonData = groups[index].data;
    var order = sortOrderCnt;
    var sortBy = $('#param').attr("datatype");
    if (type == 'tp') {
        if ("min" == tpName || "max" == tpName || "avg" == tpName) {
            sortBy = tpName + "Time";
        } else {
            sortBy = tpName;
        }
    } else if (type == 'invokeNo') {
        sortBy = 'totalInvokeCount';
    } else {
        sortBy = 'availableRate';
    }
    if (order == 0) {
        jsonData.sort(sortFunction("desc", sortBy));
        sortOrderCnt = 1;
    } else {
        jsonData.sort(sortFunction("asc", sortBy));
        sortOrderCnt = 0;
    }
    drawPicture(index, jsonData);
}

function sortFunction(order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

function drawPicture(index, data) {
    var tempHtml = '';
    var xData = [], yData = [], idc = [];
    if (type == 'tp') {
        tempHtml += '<h3 class="textTitle">' + groups[index].name + ' 方法性能原始数据</h3>';
        tempHtml += '<table style="width:50%;border:1px solid #ccc;" cellspacing="1" cellpadding="0" border="0">';
        tempHtml += '<tr><th width="30%" style="border:1px solid #ccc;"index="' + index + '"  class="tableSortIdc"><a>机房</a></th>' +
            '<th width="30%" height="22" style="border:1px solid #ccc;"index="' + index + '"  class="tableSortIp"><a>主机名</a></th>' +
            '<th width="40%" style="border:1px solid #ccc;" index="' + index + '" class="tableSort"><a>方法性能</a></th></tr>';
        for (var i = 0; i < data.length; i++) {
            xData.push(data[i].hostName);
            if ("min" == tpName || "max" == tpName || "avg" == tpName) {
                tpName += "Time";
            }
            yData.push(data[i][tpName]);
            idc.push(data[i].idc);
            idcMap[idc[i]] = idc[i];
            tempHtml += '<tr><td height="22" style="border:1px solid #ccc;">' + data[i].idc + '</td>' +
                '<td height="22" style="border:1px solid #ccc;">' + data[i].hostName + '</td>' +
                '<td style="border:1px solid #ccc;" id="hostValue_' + data[i].hostName + '">' + data[i][tpName] + '</td></tr>';
        }
        tempHtml += '</table>';
        drawLinePicture(index, groups[index].name + " 方法性能主机分布图", "时间(ms)", xData, yData, tpName, undefined, idc);
    } else if (type == 'invokeNo') {
        tempHtml += '<h3 class="textTitle">' + groups[index].name + ' 方法调用次数原始数据</h3>';
        tempHtml += '<table style="width:50%;border:1px solid #ccc;" cellspacing="1" cellpadding="0" border="0">';
        tempHtml += '<tr><th width="30%" style="border:1px solid #ccc;" index="' + index + '"  class="tableSortIdc"><a>机房</a></th>' +
            '<th width="30%" height="22" style="border:1px solid #ccc;" index="' + index + '"  class="tableSortIp"><a>主机名</a></th>' +
            '<th width="40%" style="border:1px solid #ccc;" index="' + index + '"  class="tableSort"><a>方法调用次数</a></th></tr>';
        for (var i = 0; i < data.length; i++) {
            xData.push(data[i].hostName);
            yData.push(data[i].totalInvokeCount);
            idc.push(data[i].idc);
            idcMap[idc[i]] = idc[i];
            tempHtml += '<tr><td height="22" style="border:1px solid #ccc;">' + data[i].idc + '</td>' +
                '<td height="22" style="border:1px solid #ccc;">' + data[i].hostName + '</td>' +
                '<td style="border:1px solid #ccc;" id="hostValue_' + data[i].hostName + '">' + data[i].totalInvokeCount + '</td></tr>';
        }
        tempHtml += '</table>';
        drawLinePicture(index, groups[index].name + " 方法调用次数主机分布图", "调用次数", xData, yData, "总共调用：", undefined, idc);
    } else {
        tempHtml += '<h3 class="textTitle">' + groups[index].name + ' 可用率原始数据</h3>';
        tempHtml += '<table style="width:50%;border:1px solid #ccc;" cellspacing="1" cellpadding="0" border="0">';
        tempHtml += '<tr><th width="30%" style="border:1px solid #ccc;" index="' + index + '"  class="tableSortIdc"><a>机房</a></th>' +
            '<th width="30%" height="22" style="border:1px solid #ccc;" index="' + index + '"  class="tableSortIp"><a>主机名</a></th>' +
            '<th width="40%" style="border:1px solid #ccc;" index="' + index + '"  class="tableSort"><a>可用率</a></th></tr>';
        for (var i = 0; i < data.length; i++) {
            xData.push(data[i].hostName);
            yData.push(data[i].availableRate);
            idc.push(data[i].idc);
            idcMap[idc[i]] = idc[i];
            tempHtml += '<tr><td height="22" style="border:1px solid #ccc;">' + data[i].idc + '</td>' +
                '<td height="22" style="border:1px solid #ccc;">' + data[i].hostName + '</td>' +
                '<td style="border:1px solid #ccc;" id="hostValue_' + data[i].hostName + '">' + data[i].availableRate + '</td></tr>';
        }
        tempHtml += '</table>';
        drawLinePicture(index, groups[index].name + " 可用率主机分布图", "可用率(%)", xData, yData, "方法可用率：", 100, idc);
    }
    $("#sourceData" + index).html(tempHtml);
    $(".tableSort").on("click", function () {
        tableSort($(this).attr("index"));
    });
    $(".tableSortIdc").on("click", function () {
        tableSortIdc($(this).attr("index"));
    });
    $(".tableSortIp").on("click", function () {
        tableSortIp($(this).attr("index"));
    });
}
