<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + "" + (request.getServerPort() == 80 ? "" : ":" + request.getServerPort()) + path;
%>
<html>
<head>
    <title></title>
    <script type="text/javascript" src="../../js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../js/highcharts.js"></script>
    <style>
        ${demo.css}
        table tr td{
            border: 1px solid #D7D7D7;text-align:center;color:black;
        }
    </style>
    <script type="text/javascript">
        function paint(tp,tpTitle,invoke,invokeTitle,convert,convertTitle,yesterdayConvert,yesterdayConvertTitle,system,year,week){
            var tpOptions = {
                chart: {
                    renderTo: tp, //DIV容器ID
                    type: 'line'//报表类型
                },
                title: {text: tpTitle},
                yAxis: {
                    title: {text: 'TP99(ms)'},
                    min :0,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                xAxis: {
                    categories: []   ,
                    tickInterval:24
                },
                tooltip: {
                    valueSuffix: 'ms',
                    crosshairs: true,
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                plotOptions:{
                    series:{
                        connectNulls:true
                    }
                }
            };
            var invokeOptions = {
                chart: {
                    renderTo: invoke, //DIV容器ID
                    type: 'line'//报表类型
                },
                title: {text: invokeTitle},
                yAxis: {
                    title: {text: '调用量(次)'},
                    min :0,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                xAxis: {
                    categories: []   ,
                    tickInterval:24
                },
                tooltip: {
                    valueSuffix: '次',
                    crosshairs: true,
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                plotOptions:{
                    series:{
                        connectNulls:true
                    }
                }

            };
            var convertOptions = {
                    chart: {
                        renderTo: convert, //DIV容器ID
                        type: 'line'//报表类型
                    },
                    title: {text: convertTitle},
                    yAxis: {
                        title: {text: '转化率'},
                        min :0,
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    xAxis: {
                        categories: []   ,
                        tickInterval:24
                    },
                    tooltip: {
                        valueSuffix: '',
                        crosshairs: true,
                        shared: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    plotOptions:{
                        series:{
                            connectNulls:true
                        }
                    }

                };
            	 var yesterdayConvertOptions = {
                    chart: {
                        renderTo: yesterdayConvert, //DIV容器ID
                        type: 'line'//报表类型
                    },
                    title: {text: yesterdayConvertTitle},
                    yAxis: {
                        title: {text: '转化率'},
                        min :0,
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    xAxis: {
                        categories: []   ,
                        tickInterval:24
                    },
                    tooltip: {
                        valueSuffix: '',
                        crosshairs: true,
                        shared: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    plotOptions:{
                        series:{
                            connectNulls:true
                        }
                    }

                }; 
            //ajax
            var url =  '<%=basePath%>/manage/viewMinuteKey/umpReport.json?system='+system+'&yearNum='+year+'&weekNum='+week;
            $.getJSON(url,function(map) {
                var length = map['tp'].length;
                tpOptions.xAxis.categories = map['categories'];
                invokeOptions.xAxis.categories = map['categories'];
                convertOptions.xAxis.categories = map['categories'];
                yesterdayConvertOptions.xAxis.categories = map['yesterdayCategories'];
                //}
                tpOptions.series = map['tp'];
                invokeOptions.series = map['invoke'];
                convertOptions.series = map['convert'];
                yesterdayConvertOptions.series = map['yesterdayConvert'];
                new Highcharts.Chart(tpOptions);
                new Highcharts.Chart(invokeOptions);
                new Highcharts.Chart(convertOptions);
                new Highcharts.Chart(yesterdayConvertOptions);
            });
        }

    </script>
</head>
<body>
<!--  <h1>${yearNum},${weekNum}</h1>-->
<h1><a href="<%=basePath%>/manage/viewMinuteKey/report">刷新</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最近60分钟报告 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="<%=basePath%>/">首页</a></h1>
<hr/>


<c:forEach items="${paintUmpChart}" var="item">
    <script type="text/javascript">
        $(paint('${item.tpDivId}','${item.tpTitle}',
                '${item.invokeDivId}','${item.invokeTitle}',
                '${item.convertDivId}','${item.convertTitle}',
                '${item.yesterdayConvertDivId}','${item.yesterdayConvertTitle}',
                '${item.system}',${yearNum},${weekNum}));
    </script>
        <div id="${item.tpDivId}" style="min-width: 310px; height: 400px; margin: 0 auto;border: 1px solid #e0e0e0;"></div>
        <br>
        <br>
        <div id="${item.invokeDivId}" style="min-width: 310px; height: 400px; margin: 0 auto;border: 1px solid #e0e0e0;"></div>
        <br>
        <div id="${item.convertDivId}" style="min-width: 310px; height: 400px; margin: 0 auto;border: 1px solid #e0e0e0;"></div>        
        <br>
        <div id="${item.yesterdayConvertDivId}" style="min-width: 310px; height: 400px; margin: 0 auto;border: 1px solid #e0e0e0;"></div>
        <br>
</c:forEach>
</body>
</html>