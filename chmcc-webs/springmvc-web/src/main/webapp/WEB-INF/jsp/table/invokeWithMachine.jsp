<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + "" + (request.getServerPort() == 80 ? "" : ":" + request.getServerPort()) + path;
%>
<html>
<head>
<title>机器性能</title>
<style type="text/css">
table,td,th {
	border: 1px solid #8DB9DB;
	padding: 5px;
	border-collapse: collapse;
	font-size: 16px;
}
</style>
<script type="text/javascript" src="../../js/jquery-1.11.1.min.js"></script>
</head>
<body>
<CENTER>
<table>
	<thead>
		<tr>
			<th>机器名</th>
			<th>调用量</th>
			<th>可用率</th>
			<th>TP99</th>
			<th>参考性能</th>
		</tr>
	</thead>
	<tbody>
		<c:forEach items="${perReportData}" var="reportData" varStatus="vs">
			<c:if test="${reportData.tp99 > reportData.maxReferenceTP || reportData.tp99 < reportData.minReferenceTP}">
				<tr style='background-color: red'>
			</c:if>
			<c:if test="${reportData.tp99 < eportData.maxReferenceTP && reportData.tp99 > reportData.minReferenceTP}">
				<tr>
			</c:if>
				<td align="center">${reportData.hostName}</td>
				<td align="center">${reportData.totalInvokeCount}</td>
				<td align="center">${reportData.availableRate}</td>
				<td align="center">${reportData.minTp99}-${reportData.tp99}</td>
				<td align="center">${reportData.referenceTP}</td>
			</tr>
		</c:forEach>
	</tbody>
</table>
</CENTER>
</body>
</html>