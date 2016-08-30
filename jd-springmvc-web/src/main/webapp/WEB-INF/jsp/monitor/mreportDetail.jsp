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
        table,td,td {  border: 1px solid #8DB9DB; border-collapse: collapse;font-size:10px; }
    </style>
    <script type="text/javascript" src="../../js/jquery-1.11.1.min.js"></script>
    <script src="../../script/treeTable/jquery.treeTable.js" type="text/javascript"></script>
    <script src="../../script/layer/layer.js" type="text/javascript"></script>
    <script src="../../misc/My97DatePicker4_8/WdatePicker.js" type="text/javascript" ></script>
    <style>
    	.table td circle {
			border-radius: 50%;
			width: 20px;
			height: 20px; 
			/* 宽度和高度需要相等 */
			}
		.table td square {
			border-radius: 30%;
			width: 20px;
			height: 20px; 
			/* 宽度和高度需要相等 */
			}
		.arrow-down{
		    width: 0;   
		    height: 0;   
		    border-left: 20px solid transparent;  
		    border-right: 20px solid transparent;  
		    border-top: 20px solid #f00;  
		    font-size: 0;  
		    line-height: 0;  
		}
    </style>
    
</head>
<body>
<a href="/">返回京ME</a>
<button onclick="refresh();">刷新</button>
<button onclick="autoRefresh();">自动刷新</button>
<button onclick="clearAutoRefresh()">取消自动刷新</button>
<span style="color:red">默认不自动刷新，如果需要，请手动开启（一分钟刷新一次）</span>

<div>
<table style="width: 100%">
<c:forEach items="${systemList}" var="system" varStatus="vs">
<c:if test="${vs.index == 0 }">
<tr align="center">
	<td style="height: 35px;">系统名/key名</td>
	<c:forEach items="${nameList[system.id]}" var="value2">
		<td style="height: 35px;">${value2}</td>
	</c:forEach>
</tr>
</c:if>
	<tr style="width:20%" align="center">
		<td style="height: 35px;">${system.systemName}</td>
			<c:forEach items="${resultMap[system.id]}" var="channel" varStatus="status">
				<td  align="center" style="height: 35px;">
							<c:if test="${status.index %2 == 0}">
								<div style="cursor:hand;width:100%;border-radius: 50%;width: 20px;height:20px;
								background-color:${fn:split(channel,'$$')[1]};						
								" onclick="getDetail(${fn:split(channel,'$$')[0]})"></div>
							</c:if>
							<c:if test="${status.index %2 == 1}">
								<div style="cursor:hand;width:100%;border-radius: 30%;width: 20px;height:20px;
								background-color:${fn:split(channel,'$$')[1]};						
								" onclick="getDetail(${fn:split(channel,'$$')[0]})"></div>
							</c:if>
					</td>
			</c:forEach>
	</tr>
	
</c:forEach>
</table></div>
<br/>
<div id="showId2">
</div>
</body>
</html>
<script>
function openwindow(key)
{
	layer.open({
        type: 2,
        title: '查看机器性能',
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        area : ['320px' , '350px'],
        content: 'mdetail?key='+key
    });
}
//$("#showId").innerHtml("http://risking.jd.com/showCountNew.action?queryVO.showHtml=1&queryVO.init=1&queryVO.name=order&queryVO.rftype=99&t=1456902406537");
function getDetail(key)
{
	$.ajax({
		  url: "mdetail2",
		  data: "key="+key,
		  success: function (data) {
			  $("#showId2").html(data);
          },
		  dataType: "json"
		});
}

function refresh()
{
	 window.location.reload();
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