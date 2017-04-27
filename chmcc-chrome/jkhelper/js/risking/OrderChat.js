var chatMap = new Map();
var allIntervalId, oneIntervalId;
var yAxisTitle;
var valueSuffix;

String.prototype.a2b = function () {
    var A = arguments;
    return this.replace(/\{(\d+)\}/g, function (a, b) {
        return A[b - 1] === void (0) ? '' : A[b - 1]
    });
};

var tmpKey = "{1}_{2}";
/**
 * 实例一个新的Options
 *
 * @param id
 * @param onloadFunc
 * @return
 */
function createOptions(id, onloadFunc) {
    var newOptions = {
        chart: {
            renderTo: id,
            type: 'spline',
            events: {
                load: function () {
                    if (onloadFunc != undefined
                        && typeof onloadFunc == "function") {
                        setInterval(onloadFunc(), 30000);
                    }
                }
            }
        },
        rangeSelector: {
            enabled: false,
            inputEnabled: false,
            selected: 0
        },
        title: {
            text: 'Live random data',
            useHTML: true
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            min: 0,
            title: {
                text: (yAxisTitle == null || yAxisTitle == '' || yAxisTitle == undefined) ? 'Value' : yAxisTitle
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            formatter: function () {
                var s = Highcharts.dateFormat('时间:　%H:%M', this.x) + '<br/>';
                var cX = this.x;

                $.each(this.points, function (i, point) {
                    var arr = point.point.name;
                    if (arr != null && arr != '' && arr.length > 0) {
                        s += arr;
                    }
                    if (valueSuffix == null || valueSuffix == '' || valueSuffix == undefined) {
                        s += "<span style=\"color:" + this.series.color + "\">" + this.series.name + "</span>: <b>" + point.y + "</b><br/>";
                    } else {
                        s += "<span style=\"color:" + this.series.color + "\">" + this.series.name + "</span>: <b>" + point.y + " " + valueSuffix + "</b><br/>";
                    }
                });

                return s;
            }

        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineWidth: 0,
                    enabled: true
                }
            }
        },
        legend: {
            enabled: true
        },
        navigator: {
            top: 295
        },
        exporting: {
            enabled: false
        },
        series: []
    };
    chatMap.put(id, newOptions);
    return newOptions;
}


/**
 * 判断是否为全部订单的Options
 *
 * @param curOption
 * @return
 */
function getOption(curOption) {

    return (curOption == undefined || curOption == null) ? options : curOption;
}


/**
 * 初始化/重置图表
 *
 * @param name
 * @param rftype
 * @return
 */
function initTable(name, rftype) {

    var url = getUrl(name, rftype, 'showCount');
    var dataResult = load(url + '&queryVO.init=1');
    if (dataResult == null) {
        alert('数据加载错误');
        return;
    }
    hideDiv(true);
    initOthers();
    parameter.put('name', name);
    parameter.put('minute', 1);
    parameter.put('rftype', rftype);
    parameter.put('showDetail', '1');
    options.series = [];
    pushData(dataResult, true);
    clearAllInterval();
    oneIntervalId = setInterval(oneTypeNext, 30000);
}

/**
 * 初始化/重置图表
 *
 * @param name
 * @param rftype
 * @return
 */
function initTableNew(dataArr) {
    hideDiv(true);
    initOthers();
    parameter.put('name', dataArr.name);
    parameter.put('minute', 1);
    parameter.put('rftype', dataArr.rftype);
    parameter.put('showDetail', '1');
    options.series = [];
    pushData(dataArr, true);
    clearAllInterval();
    oneIntervalId = setInterval(oneTypeNext, 30000);
}

/**
 * 初始化所有参数, 供新的查询请求重置
 *
 * @return
 */
function initOthers() {
    parameter = new Map();
    dayMap = new Map();
    lastMinutes = '';
    time = 0;
    tableName = '';
}
var currentDateType = '';
/**
 * 给当前图表增加实例
 *
 * @param data
 * @param isCreate
 * @param curOptions
 * @return
 */
function pushData(data, isCreate, curOptions) {
    var isOne = (parameter.get('showDetail') == '1');
    var reversed = false;
    var tmpOptions = getOption(curOptions);
    if (tmpOptions.series == null && isOne) {
        tmpOptions = chart.options;
    }
    // 今天的数据, 只有初始化 或者刷新的时候 才会有
    if (isNotNull(data.todayList)) {
        currentDateType = 'today';
        addSeries(data.todayList, true, tmpOptions, data);
    }

    // 其他指定日期或者是初始化时 昨天的数据集合
    if (isNotNull(data.yesterdayList)) {
        currentDateType = 'yesterday';
        addSeries(data.yesterdayList, false, tmpOptions, data);
    }

    // 其他指定日期或者是初始化时 昨天的数据集合
    if (isNotNull(data.weekList)) {
        currentDateType = 'week';
        addSeries(data.weekList, false, tmpOptions, data);
    }

    // 本周或本月 的数据, 只有初始化 或者刷新的时候 才会有
    if (isNotNull(data.weekMonthList)) {
        currentDateType = 'weekMonth';
        reversed = true;
        addWeekMonthSeries(data.weekMonthList, true, tmpOptions, data);
    }

    // 其他指定日期或者是初始化时 上周或上月的数据集合
    if (isNotNull(data.otherWeekMonthList)) {
        currentDateType = 'otherWeekMonth';
        reversed = true;
        addWeekMonthSeries(data.otherWeekMonthList, false, tmpOptions, data);
    }
    currentDateType = '';
    clearWeekMonth(reversed);
    lastMinutes = data.lastMinute;
    // if(lastSeries != null) {
    // tmpOptions.series.push(lastSeries);
    // }
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var dataName = data.name == "productsort" ? "商品分类统计" : transMap.get(data.name + "-" + data.rftype);

    tmpOptions.title.text = "<div class='optionTitle' style='border:1px solid #ccc; display:block; background:rgb(19,130,185); color:white;font-weight:bold;width:300px; height:25px;'><a style='cursor:pointer;' onclick=\"javascript:initTable('"
        + data.name
        + "','"
        + data.rftype
        + "');\">"
        + dataName + "</a></div>";

    if (isCreate != undefined && isCreate) {

        chart = isOne ? new Highcharts.StockChart(tmpOptions)
            : new Highcharts.Chart(tmpOptions);

        if (isOne) {

            put('chart', chart);
            put('options', tmpOptions);
        }
        chatMap.put(data.rftype, chart);
    }

    setPointDesc(chart);

}

/**
 * 按周展现
 * @param year
 * @param week
 * @return
 */
function initWeek(year, week) {
    var url = '/searchWeek.action?queryVO.rftype=' + parameter.get('rftype') + '&queryVO.name=' + parameter.get('name');
    var init = isNotNull(year) && isNotNull(week);

    //如果不是初始化, 则拼接要添加的年, 周
    if (init) {
        url += "&queryVO.year=" + year + "&queryVO.week=" + week;
    }
    clearWeekMonth(0);

    var result = load(url);
    if (options2 != undefined && options2.series != undefined) {
        options2.series = [];
    }
    options2 = createOptions4WeekMonth('container', '按周环比');
    pushData(result, !init, options2);

    //当前默认的为 上一周
    putFlag(queryWeekMap, result.year, result.week);
    //本周的需要在上一周的基础上加1
    putFlag(queryWeekMap, result.year, parseInt(result.week) + 1);
}

function clearWeekMonth(bool) {

    if (!bool) {

        parameter.drop('week_month');
        queryWeekMap = new Map();
        queryMonthMap = new Map();
    }
}
/**
 * 按月展现
 * @param year
 * @param month
 * @return
 */
function initMonth(year, month) {
    var url = '/searchMonth.action?queryVO.rftype=' + parameter.get('rftype') + '&queryVO.name=' + parameter.get('name');
    var init = isNotNull(year) && isNotNull(month);
    if (init) {
        url += "&queryVO.year=" + year + "&queryVO.month=" + month;
    }
    clearWeekMonth(0);

    parameter.put('week_month', "按月环比");
    var result = load(url);
    if (options2 != undefined && options2.series != undefined) {
        options2.series = [];
    }
    options2 = createOptions4WeekMonth('container', '按月环比');
    pushData(result, !init, options2);

    //当前默认的为 上一月
    putFlag(queryMonthMap, result.year, result.month);
    //本月的需要在上一月的基础上加1
    putFlag(queryMonthMap, result.year, parseInt(result.month) + 1);
}

/**
 * 放入加载过的标记
 * @param maps
 * @param year
 * @param monthOrWeek
 * @return
 */
function putFlag(maps, year, monthOrWeek) {
    maps.put(tmpKey.a2b(year, monthOrWeek), "1");
}

/**
 * 按周, 按月的Series
 * @param dataArray
 * @param bool
 * @param curOptions
 * @return
 */
function addWeekMonthSeries(dataArray, bool, curOptions, dataResultObj, dateStr) {
    var series = createWeekMonthSeries(dataArray, bool, dataResultObj, dateStr);

    var tmpOptions = getOption(curOptions);

    tmpOptions.series.push(series);
}

/**
 * 按周, 按月 构建指定数据集合的Series
 *
 * @param dataArray
 * @param bool
 * @return
 */
function createWeekMonthSeries(dataArray, bool, dataResultObj, dateStr) {
    var innerTime;
    var series = {
        data: []
    };
    for (var i = 0; i < dataArray.length; i++) {

        var obj = dataArray[i];
        var nameDate = obj.wmd;
        obj = putResultPara(obj, dataResultObj);
        if (i == 0) {
            var innerDate = new Date();
            innerTime = innerDate.getTime() - (innerDate.getHours() * 3600 + innerDate.getMinutes() * 60 + innerDate.getSeconds()) * 1000 - innerDate.getMilliseconds();
            if (bool != undefined && bool) {
//					innerTime = Date.parse(obj.date);
            }
            series.name = obj.date;
        }
        tableName = nameDate;
        series.data.push({
            x: innerTime + obj.minutes * 24 * 60 * 60 * 1000,
            y: obj.count,
            name: nameDate
        });
    }
    return series;
}
/**
 * 把数据集合Series Push到options.series
 *
 * @param dataArray
 * @param bool
 * @param curOptions
 * @return
 */
function addSeries(dataArray, bool, curOptions, dataResultObj, dateStr) {

    var series = createSeries(dataArray, bool, dataResultObj, dateStr);

    // series.name = tableName;

    var tmpOptions = getOption(curOptions);

    tmpOptions.series.push(series);

    dayMap.put(tableName, tableName);
}

/**
 * 构建指定数据集合的Series
 *
 * @param dataArray
 * @param bool
 * @return
 */
function createSeries(dataArray, bool, dataResultObj, dateStr) {
    var series = {
        data: []
    };
    var temp = 10;
    if (parameter.get("minute") != undefined && parameter.get("minute") != null)
        temp = parameter.get("minute");

    var cDate = '';
    var sCount = '';

    for (var i = 0; i < dataArray.length; i++) {

        var obj = dataArray[i];
        obj = putResultPara(obj, dataResultObj);
        if (i == 0) {

            if (bool != undefined && bool) {
// 				time = Date.parse(obj.date);
                date = new Date();
                time = date.getTime() - (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) * 1000 - date.getMilliseconds();
// 				alert(new Date().getTime());
// 				time=time+new Date().getTimezoneOffset()*60000;
            }
            tableName = obj.date;
            series.name = tableName;
        }
        var myName = createProduct(obj.cacheMap, obj.showOrderCount);
        var times = time + (obj.minutes - temp) * 1000 * 60;
        series.data.push({
            x: times,
            y: obj.count,
            name: myName
        });
    }
    return series;
}

function createProduct(m, orderShowCounts) {
    var s = '';
    var index = 0;
    var transFlag = false;
    if (orderShowCounts == undefined || orderShowCounts == null || orderShowCounts == '') {
        orderShowCounts = 0;
    } else {
        transFlag = true;
    }
    for (var i in m) {
        if (orderShowCounts > 0 && index >= orderShowCounts) {
            break;
        }
        var name = transFlag ? transMap.get('order-' + i) : i;
        s += '<b>' + name + '</b>:' + m[i] + '<br/>';
        index++;
    }
    return s;
}
function createSeriesWzf(dataArray, series, bool) {
    // var series = {
    // data : []
    // };
    // var chart=series.chart;
    var count = parameter.get("count");
    var data = series.data;
    for (var i = 0; i < dataArray.length; i++) {
        var shift = (data.length >= (i + 1));
        var redraw = ((i + 1) == dataArray.length);
        // alert(shift);
        var obj = dataArray[i];
        if (i == 0) {
            if (bool != undefined && bool) {
                time = Date.parse(obj.date);
            }
            tableName = obj.date;
        }
        var x = time + obj.minutes * 1000 * 60;
        var y = obj.count;
        // series.data.push( {
        // x : time + obj.minutes * 1000 * 60,
        // y : obj.count
        // });
        series.addPoint([x, y], redraw, shift);
    }
    return series;
}
/**
 * 非空
 *
 * @param arr
 * @return
 */
function isNotNull(arr) {
    return arr != undefined && arr != null && arr.length > 0;
}

/**
 * ajax load数据
 *
 * @param url
 * @return
 */
function load(url) {
    var result = null;
    var append = url.indexOf('?') == -1 ? '?' : '&';
    $.ajax({
        url: "http://risking.jd.com" + url + append + 't=' + new Date().getTime(),
        type: "POST",
        dataType: "json",
        async: false,
        beforeSend: function () {
        },
        error: function (XMLHttpRequest) {
        },
        success: function (data, textStatus) {
            if (data != null) {
                var todayData = data.todayList;
                var yesterdayData = {};
                for (var key in data.yesterdayMap) {
                    yesterdayData = data.yesterdayMap[key];
                }
                $(".optionTitle").css("color", "#fff");
                var name = $(".optionTitle a").html();
                var thoulds = (Math.max.apply(null, todayData) + Math.min.apply(null, todayData)) / 2;
                var sound = name;
                if (((todayData[todayData.length - 2].c < todayData[todayData.length - 3].c) && (todayData[todayData.length - 3].c < todayData[todayData.length - 4].c) && (todayData[todayData.length - 4].c < todayData[todayData.length - 5].c))) {
                    sound += "连续跌三点";
                }
                if (config.compareYesterday && ( yesterdayData[yesterdayData.length - 2].c > todayData[todayData.length - 2].c)) {
                    sound += "小于昨天值";
                }
                if (config.floatOverMiddle && (todayData[todayData.length - 3].c - todayData[todayData.length - 2].c) > thoulds / 10) {
                    sound += "波动超过" + thoulds;
                }
                if (config.belowMiddle && (thoulds - todayData[todayData.length - 2].c) > thoulds / 10) {
                    sound += "低于中间值" + thoulds;
                }
                if (sound != name) {
                    $(".optionTitle").css("color", "red");
                    chrome.tts.speak(sound, {'rate': 2.5, 'enqueue': true});
                }
                result = data;

            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        }
    });
    return result;
}


/**
 * 指定分钟数 重新获取数据
 *
 * @param mins
 * @return
 */
function changeOneMinute(cnt) {

    parameter.put('count', cnt);
    parameter.put('minute', 1);

    resetOneMinutes(cnt);
    refresh();
}

/**
 * 将当前选中的分钟数 href属性删除, 为不可点击状态
 *
 * @param mins
 * @return
 */
function resetOneMinutes(mins) {
    $("a[name=AOneMinute]").each(function () {
        var val = $(this).attr('id');
        if (val == mins) {
            $(this).removeAttr('href');
        } else {
            $(this).attr('href', 'javascript:changeOneMinute(\'' + val + '\')');
        }
    });
}


/**
 * 刷新单个图标的多线
 *
 * @return
 */
function refresh() {
    var values = dayMap.getValues();
    options.series = [];
    var isCreate = false;
    if (chart != undefined || chart != null) {
        chart.options.series = [];
    }
    for (var i = 0; i < values.length; i++) {

        if (i == values.length - 1)
            isCreate = true;

        var url = createURL('ajaxLoad', values[i]);

        var dataResult = load(url);
        pushData(dataResult, isCreate);
    }
    clearAllInterval();
    oneIntervalId = setInterval(oneTypeNext, 30000);
}


function isNull(obj) {

    return obj == null || obj == '' || obj.length == 0;
}

/**
 * 初始化所有options.series = []
 *
 * @return
 */
function initOptionsMap() {

    var values = allOptions.getValues();
    for (var i = 0; i < values.length; i++) {
        values[i].series = [];
    }
}

/**
 * 显示隐藏图表container
 *
 * @param bool
 * @return
 */
function hideDiv(bool) {

    if (bool)
        $('#container').show();
    else
        $('#container').hide();

    $('div[id^=container_]').each(function () {
        if (bool)
            $(this).hide();
        else
            $(this).show();
    });
}

/**
 * 初始化全部订单, 并隐藏topMenu
 *
 * @param type
 * @return
 */
function initAllNew(dataArr) {

    hideDiv(false);
    // topHide(true);
    parameter.put('name', 'order');
    parameter.put("minute", 10);
    var dataResult = dataArr; // 获取返回的数据

    var arr = dataResult.dataMap;
    var others = dataResult.yesterdayMap;
    var week = dataResult.weekMap;
    var index = 0;
    for (var i in arr) {

        var cOption = null;

        cOption = createOptions('container_' + i);

        allOptions.put(i, cOption);

        dataResult.todayList = arr[i];

        if (others[i] != undefined) {
            dataResult.yesterdayList = others[i];
        }
        if (week[i] != undefined) {
            dataResult.weekList = week[i];
        }
        dataResult.rftype = i;

        pushData(dataResult, true, cOption);
        index++;
    }
    clearAllInterval();
    allIntervalId = setInterval(doAllNext, 30000);
}

/**
 * 获取全部的跳点
 *
 * @return
 */
function doAllNext() {

    var tmpResult = '';
    if (window.location.href.indexOf("showAllNewMobile") >= 0) {
        tmpResult = load('showAllMobile.action?queryVO.minute=10&queryVO.name=order&queryVO.lastMinute=' + lastMinutes);
    } else {
        tmpResult = load('showAll.action?queryVO.minute=10&queryVO.name=order&queryVO.lastMinute=' + lastMinutes);
    }


    var arr = tmpResult.dataMap;
    var others = tmpResult.yesterdayMap;
    var week = tmpResult.weekMap;
    lastMinutes = tmpResult.lastMinute;
    for (var i in arr) {

        var tmpChart = chatMap.get(i);
        var tmpData = createSeries(arr[i], true, tmpResult);
        // createSeriesWzf(arr[i],tmpChart.series[0], true)
        tmpChart.series[0].setData(tmpData.data, true);
        if (others[i] != undefined) {
            var otherData = createSeries(others[i], false, tmpResult);
            tmpChart.series[1].setData(otherData.data, true);
            // createSeriesWzf(others[i],tmpChart.series[1], false);
        }
        if (week[i] != undefined) {
            var otherData = createSeries(week[i], false, tmpResult);
            tmpChart.series[2].setData(otherData.data, true);
        }
    }
}

/**
 * 单个类型下 所有时间的线条跳点更新
 *
 * @return
 */
function oneTypeNext() {


    var tmpChart = get('chart');
    // alert('one next chart length : ' + tmpChart.series.length);
    var url = createURL('showOne') + '&queryVO.oneTypeDays=' + dayMap.getValues().join(",");
    if (parameter.get('minute') == '1') {
        url += '&queryVO.init=1';
    }

    var tmpResult = load(url);
    if (tmpResult.lastTime.indexOf('0000') >= 0) {

        window.location.href = window.location.href;
        return;
    }

    var others = tmpResult.yesterdayMap;
    lastMinutes = tmpResult.lastMinute;

    var tmpData = createSeries(tmpResult.todayList, true, tmpResult);
    tmpChart.series[0].setData(tmpData.data, true);

    for (var i in others) {
        var index = getSeriesIndex(i, tmpChart);
        var otherData = createSeries(others[i], false, tmpResult);
        tmpChart.series[index].setData(otherData.data, true);
    }

    setPointDesc(tmpChart);
}

function getSeriesIndex(seriesName, chart) {

    for (var i = 0; i < chart.series.length; i++) {

        if (chart.series[i].name == seriesName) {
            return i;
        }
    }
}

function createResult() {

    var Result = {
        date: null,
        name: null,
        rftype: null,
        minutes: null,
        count: null,
        cacheMap: null,
        orderMap: null,
        showOrderCount: null
    };
    return Result;
}

function putResultPara(obj, dataResultObj) {

    var result = createResult();

    result.cacheMap = obj.cm;
    result.orderMap = obj.om;
    result.count = obj.c;
    result.minutes = obj.m;
    result.rftype = parameter.get('rftype');
    result.name = parameter.get('name');

    if (dataResultObj != undefined && dataResultObj != null) {

        result.showOrderCount = dataResultObj.soc;
        var tmpDayMap = dataResultObj.qDayMap;

        if (tmpDayMap != undefined && tmpDayMap != null) {

            result.date = tmpDayMap[currentDateType];
        }
    }
    return result;
}

/**
 * 创建全部参数的url
 *
 * @param actionName
 * @param date
 * @return
 */
function createURL(actionName, date) {
    var day = date == null || date == undefined ? null : date;
    return getUrl(parameter.get('name'), parameter.get('rftype'), actionName,
        day, parameter.get('minute'), parameter.get('count'));
}
/**
 * 清除全局Interval
 *
 * @return
 */
function clearAllInterval() {

    clearInterval(oneIntervalId);
    clearInterval(allIntervalId);
}

function addShowCount(counts) {

    if (isNull(counts)) {

        alert('请输入显示节点数');
        $('#showCounts').focus();
        return;
    }

    parameter.put('count', counts);
    refresh();
    $('#showCounts').val('');
}

function put(k, v) {
    parameter.put(k, v);
}

function get(k) {
    return parameter.get(k);
}

function isOne() {
    return parameter.get('showDetail') == '1';
}


function setPointDesc(chart) {
    var length = chart.series.length;
    var tmp = "";
    // 获取最小的index,5,10,30,60的时候不应取最后的点
    var minLength = 10000;
    for (var i = 0; i < length; i++) {

        var se = chart.series[i];
        if ((se.data.length - 1) < minLength) {

            minLength = se.data.length - 1;
        }
    }
    for (var i = 0; i < length; i++) {

        var se = chart.series[i];

        if (se.name == 'Navigator') {
            continue;
        }
        var dat = new Date();
        dat.setTime(se.data[minLength].x);
        var xVal = dat.getHours() + ":" + dat.getMinutes();
        if (valueSuffix == null || valueSuffix == '' || valueSuffix == undefined) {

            tmp = tmp + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:" + se.color + "'><b>" + se.name + " " + xVal + "</b></span> : <b>" + se.data[minLength].y + "</b><br/>";
        } else {

            tmp = tmp + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:" + se.color + "'><b>" + se.name + " " + xVal + "</b></span> : <b>" + se.data[minLength].y + " " + valueSuffix + "</b><br/>";
        }


    }
    $("#topDesc").html(tmp);
}
