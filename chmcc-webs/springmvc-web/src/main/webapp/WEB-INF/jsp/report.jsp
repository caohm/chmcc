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
        function paint(tp,tpTitle,invoke,invokeTitle,system,year,week){
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
            //ajax
            var url =  '<%=basePath%>/manage/viewKey/umpReport.json?system='+system+'&yearNum='+year+'&weekNum='+week;
            $.getJSON(url,function(map) {
                var length = map['tp'].length;
                tpOptions.xAxis.categories = map['categories'];
                invokeOptions.xAxis.categories = map['categories'];

                //}
                tpOptions.series = map['tp'];
                invokeOptions.series = map['invoke'];
                new Highcharts.Chart(tpOptions);
                new Highcharts.Chart(invokeOptions);
            });
        }

    </script>
</head>
<body>
<h1><a href="<%=basePath%>/">首页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最近三天报告</h1>
<hr/>


<c:forEach items="${paintUmpChart}" var="item">
    <script type="text/javascript">
        $(paint('${item.tpDivId}','${item.tpTitle}',
                '${item.invokeDivId}','${item.invokeTitle}',
                '${item.system}',${yearNum},${weekNum}));
    </script>
        <div id="${item.tpDivId}" style="min-width: 310px; height: 400px; margin: 0 auto;border: 1px solid #e0e0e0;"></div>
        <br>
        <br>
        <div id="${item.invokeDivId}" style="min-width: 310px; height: 400px; margin: 0 auto;border: 1px solid #e0e0e0;"></div>
        <br>
        <br>
</c:forEach>
</body>
</html>