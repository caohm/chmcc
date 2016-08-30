<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
<form action="#">
	<select id="redisKey">
		<option value="SMEMBERS">SMEMBERS</option>
		<option value="HMGET">HMGET</option>
		<option value="HKEYS">HKEYS</option>
	</select>
	<input type="text" name="key" id="key"/>
	<input type="text" name="mapKey" id="mapKey"/>
	<input type="button" value="查询" onclick="getKeyValue()"/> 
</form>
<div id="divvalue"></div>
</body>
</html>
<script>
function getKeyValue()
{
	var redisKey=$("#redisKey").val();
	var key=$("#key").val();
	var mapKey=$("#mapKey").val();
	$.ajax({
		  url: "getRedisKey",
		  data: "key="+key+"&redisKey="+redisKey+"&mapKey="+mapKey,
		  success: function (data) { 
			  $("#divvalue").append(data);
        },
		  dataType: "json"
		});	
}
</script>