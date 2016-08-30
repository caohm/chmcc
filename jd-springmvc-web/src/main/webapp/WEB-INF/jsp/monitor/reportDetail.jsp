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
			/* 宽度和高度需要相等 */
			}
		.table td square {
			border-radius: 30%;
			width: 40px;
			height: 40px; 
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
<div ><h1 onclick="flushFrame()">刷新订单信息</h1></div>
<div style="float:left;padding-left:0px;">
<table>
<c:forEach items="${systemList}" var="system" varStatus="vs">
<c:if test="${vs.index == 0 }">
<tr align="center">
	<td>系统名/key名</td>
	<c:forEach items="${nameList[system.id]}" var="value2">
		<td>${value2}</td>
	</c:forEach>
</tr>
</c:if>
	<tr style="width:20%" align="center">
		<td >${system.systemName}</td>
			<c:forEach items="${resultMap[system.id]}" var="channel" varStatus="status">
				<td  align="center" style="height: 80px;">
							<c:if test="${status.index %2 == 0}">
								<div style="cursor:hand;height:80px;width:100%;border-radius: 50%;width: 40px;height: 40px;
								background-color:${fn:split(channel,'$$')[1]};						
								" onclick="getDetail(${fn:split(channel,'$$')[0]})"></div>
							</c:if>
							<c:if test="${status.index %2 == 1}">
								<div style="cursor:hand;height:80px;width:100%;border-radius: 30%;width: 40px;height: 40px;
								background-color:${fn:split(channel,'$$')[1]};						
								" onclick="getDetail(${fn:split(channel,'$$')[0]})"></div>
							</c:if>
					</td>
			</c:forEach>
	</tr>
	
</c:forEach>
</table></div>
<div id="showId" style="float:right; width:50%">
	<iframe src="risking" id="orderInfoId" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="height:100%;width: 100%"></iframe>
</div>
<div id="showId2" style="display:none;float:left;padding-left:100px;">
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
        area : ['1000px' , '460px'],
        content: 'detail?key='+key
    });
}
//$("#showId").innerHtml("http://risking.jd.com/showCountNew.action?queryVO.showHtml=1&queryVO.init=1&queryVO.name=order&queryVO.rftype=99&t=1456902406537");
function getDetail(key)
{
	$.ajax({
		  url: "detail2",
		  data: "key="+key,
		  success: function (data) {
			  $("#showId").hide();
			  $("#showId2").html(data);
			  $("#showId2").show();
          },
		  dataType: "json"
		});
}


function flushFrame()
{
	if(!$("#showId2").is(":hidden"))
		$("#showId2").hide();
	$("#orderInfoId").attr('src', $("#orderInfoId").attr('src'));
	if($("#showId").is(":hidden"))
		$("#showId").show();
}
</script>