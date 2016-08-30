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
<table align="center"><tr>
<c:forEach items="${domainMap}" var="domain" varStatus="vs">
<td align="center" style="width: 150px;" onclick="displayTable(${fn:length(domainMap)},${vs.index})">${domain.value.channelName }
		<h5 style="cursor:hand;height:80px;width:100%;border-radius: 50%;width: 40px;height: 40px;
		background-color:${fn:split(domain.key,'$$')[1] };"></h5>
		
</td>
</c:forEach>
</tr></table>
<br />
	<c:forEach items="${domainMap}" var="domain"  varStatus="vs">
		<table style="display:none;width:100%" align="center" id="table${vs.index}">
			<tr align="center"><td  style="width: 100px;"></td>
				<c:forEach items="${ChannelListMap[fn:split(domain.key,'$$')[0]]}" var="channel">
				<td align="center" style="width: 100px;">${fn:split(channel,'-')[0]}</td>
				</c:forEach>
			</tr>
			<tr align="center">
				<td align="center"  style="width: 100px;">${domain.value.channelName }</td>
				<c:forEach items="${ChannelListMap[fn:split(domain.key,'$$')[0]]}" var="channel">
					<c:forEach items="${channelNameMap[channel]}" var="mainKey">
						<td style="height: 80px;">
								<h5 cursor:hand; style="height:80px;width:100%;border-radius: 50%;width: 40px;height: 40px;
								background-color:${fn:split(mainKey,'$$')[1] };" onclick="openwindow('${fn:split(mainKey,'$$')[0]}')"></h2>
						</td>
					</c:forEach>
			</c:forEach>
			</tr>
		</table>
	</c:forEach>

<!-- 

<table>
<c:forEach items="${systemList}" var="system" varStatus="vs">
<c:if test="${vs.index == 0 }">
<tr>
	<td>系统名/key名</td>
	<c:forEach items="${nameList[system.id]}" var="value2">
		<td>${value2}</td>
	</c:forEach>
</tr>
</c:if>
	<tr style="width:20%">
		<td >${system.systemName}</td>
			<c:forEach items="${resultMap[system.id]}" var="channel">
				<td style="height: 80px;">
						<h5 style="height:80px;width:100%;border-radius: 50%;width: 40px;height: 40px;
						<c:if test="${fn:contains(channel,'false')}">background-color:red;</c:if><c:if test="${fn:contains(channel,'true')}">background-color:green;</c:if>
						" onclick="openwindow(${fn:split(channel,'$$')[0]})"></h2>
				</td>
			</c:forEach>
	</tr>
	
</c:forEach>
</table><br /><p></p>
 -->
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
        content: 'info?key='+key
    });
}
displayTable(4,0);
function displayTable(size,num)
{
	for(var i=0;i<size;i++)
	{
		if(i == num)
		{
			$("#table"+i).css("display","block");
		}else
			$("#table"+i).css("display","none");
	}
}

</script>