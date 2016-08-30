<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
                	<li><a href="/manage/config/cxml/list">监控点维护</a></li>
                	<li class="active">新建监控点配置</li>
                </ol>
            </div>
			$screen_content
		</div>
    </div>
</div>
<script src="/misc/jquery-1.11.1.min.js"></script>
<script src="/misc/todc-bootstrap/js/bootstrap.min.js"></script>
</body>
</html>