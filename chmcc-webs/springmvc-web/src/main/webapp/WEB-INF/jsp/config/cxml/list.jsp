<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + "" + (request.getServerPort() == 80 ? "" : ":" + request.getServerPort()) + path;
%>
<html lang="en">
<head>
	<meta charset="utf-8"/>
	<title>监控系统配置管理</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link href="/misc/todc-bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
	<link href="/misc/todc-bootstrap/css/todc-bootstrap.min.css" rel="stylesheet"/>
	<style>
		body{padding-top: 50px;}
		.fix{position: fixed;}
	</style>
</head>
<body>
<div class="navbar navbar-fixed-top navbar-default" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand" href="/">☆</a>
		</div>
		<div class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li class="active"><a href="/manage/config/index">Home</a></li>
			</ul>
    		<p class="navbar-text navbar-right">欢迎您，<% out.println(request.getAttribute("_user_name")); %> </p> 
		</div>
	</div>
</div>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-2 fix">
			<div class="list-group">
				<a class="list-group-item" href="/manage/config/system/list">系统维护</a>
				<a class="list-group-item" href="/manage/config/channel/list">渠道维护</a>
				<a class="list-group-item active" href="/manage/config/cxml/list">监控点维护</a>								            
			</div>
		</div>
		<div class="col-sm-10 col-sm-offset-2">
            <div class="container-fluid">
                <ol class="breadcrumb breadcrumb-sm">
                	<li><a href="/manage/config/index">监控系统配置管理</a></li>
                	<li class="active">监控点维护</li>
                </ol>
            </div>
            <div style="padding:0px 15px" class="container-fluid">
				<div style="background-color:#f7f7f7;padding:15px">
				<form class="form-inline" action="/manage/config/cxml/list">
			        <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span> 查询</button>
			    </form>
			    </div> 
			</div>
			<br />
			<div class="container-fluid">
				<table class="table table-bordered table-hover table-striped table-condensed">
					<thead >
						<tr class="info">
							<th width="20%">系统名称</th>
							<th width="20%">渠道名称</th>
							<th width="20%">配置文件</th>
							<th >操作</th>
			            </tr>
			        </thead>
					<tbody >
						<c:forEach items="${scmList}" var="scm" varStatus="vs">
						<tr>
							<td>${scm.systemName}</td>
							<td>${scm.channelName}</td>
							<c:if test="${scm.configXML != null && scm.configXML != ''}">
								<td style="color:green">已配置</td>
							</c:if>
							<c:if test="${scm.configXML == null || scm.configXML == ''}">
								<td style="color:red">未配置</td>
							</c:if>
							<td>
								<a href="/manage/config/cxml/delete/${scm.id}" onclick="return delcfm();">删除</a>
								&nbsp;&nbsp;&nbsp;
								<a href="/manage/config/cxml/update/${scm.id}/false">修改配置</a>
							</td>
						</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
    </div>
</div>
<script src="/misc/jquery-1.11.1.min.js"></script>
<script src="/misc/todc-bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
function delcfm(){
	if (!confirm("确定删除？")) {
        return false;
    }
    return true;
}
</script>
</body>
</html>