<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
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
    <link id="tree_table_default" type="text/css" rel="stylesheet" href="../../script/treeTable/default/jquery.treeTable.css">
    <style>
    	.txt{border:1px solid #d7d7d7;width:73px;height:24px;margin-right:6px;vertical-align:middle;}
    	.sel2,.txt2{width:160px;}
    	.cal{background:url("../../misc/i/btn1.png") no-repeat 130px 5px #fff;}
    </style>
    
</head>
<body>
系统：
<c:forEach items="${systemList}" var="system" varStatus="vs">
	${system.systemName}
</c:forEach>

</body>
</html>