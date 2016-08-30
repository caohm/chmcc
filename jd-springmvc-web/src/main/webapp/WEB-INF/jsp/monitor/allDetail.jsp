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
    <link type="text/css" rel="stylesheet" href="../../demo/style/treeTable.css">
    <style type="text/css">
        table,td,th {  border: 1px solid #8DB9DB; padding:5px; border-collapse: collapse; font-size:16px; }
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
<table align="center" style="width:80%"><tr>
<input type="hidden" value="${fn:length(doMainList)}" id="systemIdList" />
<c:forEach items="${doMainList}" var="domain" varStatus="vs">
<td align="center" style="width: 150px;" onclick="topTable(${fn:length(doMainList)},${vs.index})">${fn:split(domain,'$$')[1]}
		<h5 style="height:80px;width:100%;border-radius: 50%;width: 40px;height: 40px;
		 <c:if test="${fn:contains(domain,'false')}">background-color:red;</c:if>
		 <c:if test="${fn:contains(domain,'true')}">background-color:green;</c:if>
		 <c:if test="${fn:contains(domain,'purple')}">background-color:purple;</c:if>
		"></h2>
</td>
</c:forEach>
</tr></table>
<br />
<c:forEach items="${doMainList}" var="systemMap" varStatus="index">
	<table align="center"  style="display:none;width:60%" id="${index.index}table"><tr>
	<c:set value="${fn:length(ChannelDomainList[fn:split(systemMap,'$$')[0]])}" var="listSize"></c:set>
		<input type="hidden" value="${listSize}" id="${index.index}input"/>
	<c:forEach items="${ChannelDomainList[fn:split(systemMap,'$$')[0]]}" var="domain" varStatus="vs">
	<td align="center" style="width: 150px;" onclick="displayTable(${listSize},${vs.index},${index.index })">${domainMap[domain].channelName }
			<h5 style="height:80px;width:100%;border-radius: 50%;width: 40px;height: 40px;
			 <c:if test="${fn:contains(domain,'false')}">background-color:red;</c:if>
			 <c:if test="${fn:contains(domain,'true')}">background-color:green;</c:if>
			 <c:if test="${fn:contains(domain,'purple')}">background-color:purple;</c:if>
			"></h2>
	</td>
	</c:forEach>
	</tr></table>
</c:forEach>

<br />

<c:forEach items="${doMainList}" var="systemMap" varStatus="index">
	<c:forEach items="${ChannelDomainList[fn:split(systemMap,'$$')[0]]}" var="domain" varStatus="vs">
		<table style="display:none;width:100%" align="center" id="${index.index }t${vs.index}">
				<tr align="center"><td  style="width: 100px;"></td>
					<c:forEach items="${ChannelListMap[fn:split(domain,'$$')[0]]}" var="channel">
						<td align="center" style="width: 100px;">${fn:split(channel,'-')[0]}</td>
					</c:forEach>
				</tr>
				<tr align="center">
					<td align="center"  style="width: 100px;">${domainMap[domain].channelName}</td>
					<c:forEach items="${ChannelListMap[fn:split(domain,'$$')[0]]}" var="channel">
						<c:forEach items="${channelNameMap[channel]}" var="mainKey">
							<td style="height: 80px;">
									<h5 style="height:80px;width:100%;border-radius: 50%;width: 40px;height: 40px;
									<c:if test="${fn:contains(mainKey,'false')}">background-color:red;</c:if>
									<c:if test="${fn:contains(mainKey,'true')}">background-color:green;</c:if>
									<c:if test="${fn:contains(mainKey,'purple')}">background-color:purple;</c:if>
									" onclick="openwindow('${fn:split(mainKey,'$$')[0]}')"></h2>
							</td>
						</c:forEach>
				</c:forEach>
				</tr>
			</table>
	</c:forEach>
</c:forEach>

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
        area : ['1000px' , '460px'],
        content: 'all?key='+key
    });
}
//displayTable(4,0);
function displayTable(size,num,line)
{
	for(var i=0;i<size;i++)
	{
		if(num == i ){
			showTable(line+"t"+i)
		}
		else{
			hideTable(line+"t"+i);
		}
	}	
}
topTable($("#systemIdList").val(),0);
function topTable(num,line)
{
	for(var i=0;i<num;i++)
	{
		if(line == i){
			showTable(i+"table");
			hideOtherAll(i);
		}
		else{
			hideTable(i+"table");
			hideAll(i);
		}
	}
}

function hideOtherAll(line)
{
	var detailNum=$("#"+line+"input").val();
	for(var i=0;i<detailNum;i++)
	{
		if(0 == i ){
			showTable(line+"t"+i)
		}
		else{
			hideTable(line+"t"+i);
		}
	}	
}
function hideAll(line)
{
	var detailNum=$("#"+line+"input").val();
	for(var i=0;i<detailNum;i++)
	{
		hideTable(line+"t"+i);
	}
}

function hideTable(tableName)
{
	$("#"+tableName).hide();
}
function showTable(tableName)
{
	$("#"+tableName).show();	
}
</script>