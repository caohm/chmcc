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
				<a class="list-group-item active" href="/manage/config/system/list">系统维护</a>
				<a class="list-group-item" href="/manage/config/channel/list">渠道维护</a>
				<a class="list-group-item" href="/manage/config/cxml/list">监控点维护</a>								            
			</div>
		</div>
		<div class="col-sm-10 col-sm-offset-2">
            <div class="container-fluid">
                <ol class="breadcrumb breadcrumb-sm">
                	<li><a href="/manage/config/index">监控系统配置管理</a></li>
                	<li><a href="/manage/config/system/list">系统维护</a></li>
                	<li class="active">新建系统</li>
                </ol>
            </div>
			<div class="container-fluid">
				<form class="form-horizontal" method="post" action="/manage/config/system/addChannel">
					<input type="hidden" name="id" value="${sd.id}" />
					<div class="form-group">
						<label class="col-sm-1 control-label">系统名称</label>
						<div class="col-sm-5">
							<input type="text" class="form-control" placeholder="系统名称" name="name" value="${sd.systemName}" disabled="disabled"/>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-1 control-label">添加渠道</label>
						<div class="col-sm-10">
							<c:forEach items="${allChannelDomain}" var="cd" varStatus="vs">
			    			<div class="row">
								<div class="col-sm-3">
									<label class="control-label">
										<c:choose>  
										   <c:when test="${cd.check}">
										   		<input type="checkbox" name="channelIds" value="${cd.id}" id="channelIds" checked="checked"/> ${cd.channelName} ${channelIdList}
										   </c:when>  
										   <c:otherwise>
										   		<input type="checkbox" name="channelIds" value="${cd.id}" id="channelIds"/> ${cd.channelName}
										   </c:otherwise>  
										</c:choose>
									</label>
								</div>
			                </div>
			                </c:forEach>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-1 col-sm-10">
							<button type="submit" class="btn btn-primary" onclick="return addcfm();">保存</button>
							<button type="button" class="btn btn-default" onclick="history.back()">返回</button>
							<c:if test="${success}">
								<span style="color:green" id="tips">操作成功！</span>
							</c:if>
						</div>
					</div>
				</form>
			</div>
		</div>
    </div>
</div>

			
<script src="/misc/jquery-1.11.1.min.js"></script>
<script src="/misc/todc-bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
function addcfm(){
	$("#tips").html("");
	return true;
}
</script>
</body>
</html>