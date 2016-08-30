<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + "" + (request.getServerPort() == 80 ? "" : ":" + request.getServerPort()) + path;
%>
<html>
<body>


<a href="<%=basePath%>/manage/viewKey/report">最近三天report</a>
<br/>
<!--  
<a href="<%=basePath%>/manage/view24HoursKey/report">最近24小时report</a><br/>
-->
<a href="<%=basePath%>/manage/viewMinuteKey/report">最近60分钟report</a><br/>
<a href="<%=basePath%>/manage/table/report">表格汇总视图</a>
</body>
</html>
