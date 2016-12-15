<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + "" + (request.getServerPort() == 80 ? "" : ":" + request.getServerPort()) + path;
%>
<html>
<head>
    <title>天眼</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta charset="utf-8" />
<meta content="yes" name="apple-mobile-web-app-capable"/>
<meta content="yes" name="apple-touch-fullscreen"/>
<meta content="telephone=no" name="format-detection"/>
<meta content="black" name="apple-mobile-web-app-status-bar-style"/>
<meta name="msapplication-TileColor" content="#ffffff" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
    
    <link type="text/css" rel="stylesheet" href="../../demo/style/treeTable.css">
    <style type="text/css">
        table,td,td {  border: 1px solid #8DB9DB; padding:5px; border-collapse: collapse; font-size:10px; }
    </style>
    <script type="text/javascript" src="../../js/jquery-1.11.1.min.js"></script>
    <script src="../../script/treeTable/jquery.treeTable.js" type="text/javascript"></script>
    <script src="../../script/layer/layer.js" type="text/javascript"></script>
    <script src="../../misc/My97DatePicker4_8/WdatePicker.js" type="text/javascript" ></script>
    <style>
    	.table td circle {
			border-radius: 50%;
			width: 40px;
			height: 40px; 
			background-color:red;
			/* 宽度和高度需要相等 */
			}
    </style>
    
</head>
<body>
<a href="/">返回京ME</a>
<button onclick="refresh();">刷新</button>
<button onclick="autoRefresh();">自动刷新</button>
<button onclick="clearAutoRefresh()">取消自动刷新</button>
<span style="color:red">默认不自动刷新，如果需要，请手动开启（一分钟刷新一次）</span>

<iframe src="/monitor/manage/monitor/mreportDetail" id="iframepage" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="height:100%;width: 100%"></iframe>
</body>
</html>
<script>
function refresh()
{
	$('#iframepage').attr('src', $('#iframepage').attr('src'));
}
var intervalId=null;
function autoRefresh(){
	if(intervalId == null){
		alert("开启自动刷新！");
		intervalId = window.setInterval(refresh, 60000);
	}else{
		alert("自动刷新中，不用重复开启！");
	}
}

function clearAutoRefresh(){
	if(intervalId != null){
		alert("关闭自动刷新！");
		clearInterval(intervalId);
		intervalId = null;
	}else{
		alert("自动刷新已经关闭！");
	}
}


</script>