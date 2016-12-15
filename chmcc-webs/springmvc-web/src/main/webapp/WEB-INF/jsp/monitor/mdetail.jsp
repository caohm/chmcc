<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
        table,td,td {  border: 1px solid #8DB9DB;border-collapse: collapse; font-size:20px; }
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
${htmlValue}
</body>
</html>
