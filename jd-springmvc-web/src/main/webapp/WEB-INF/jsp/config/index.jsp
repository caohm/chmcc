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
    		<p class="navbar-text navbar-right">欢迎您，<% out.println(request.getAttribute("_user_name")); %></p> 
		</div>
	</div>
</div>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-2 fix">
			<div class="list-group">
				<a class="list-group-item" href="/manage/config/system/list">系统维护</a>
				<a class="list-group-item" href="/manage/config/channel/list">渠道维护</a>
				<a class="list-group-item" href="/manage/config/cxml/list">监控点维护</a>								            
			</div>
		</div>
		<div class="col-sm-10 col-sm-offset-2">
            <div class="container-fluid">
                <ol class="breadcrumb breadcrumb-sm">
                	<li><a href="/manage/config/index">监控系统配置管理</a></li>
                </ol>
            </div>
            <div class="container-fluid">
			<h1>
				维护说明
			</h1>
			<h2>
				一、系统维护
			</h2>
			<p>
				&nbsp;&nbsp;&nbsp; 首先看现有系统列表中，是否有你想要监控的系统，如果没有，新增一个系统。
			</p>
			<h2>
				二、渠道维护
			</h2>
			<p>
				&nbsp;&nbsp;&nbsp; 如果你想监控的系统已经存在，看一下这个系统是否需要分不同渠道进行监控（比如下单PC、微信、手机等不同渠道监控点不同，需要分别监控），如果需要，看一下你需要监控的渠道在现有渠道列表里面是否有，如果有，直接分配给你需要监控的系统，如果没有，新建一个渠道，然后分配给你需要监控的系统。<span style="background-color:#E53333;">如果需要监控的系统就一套，不需要分渠道监控，渠道就选择一个“PC”即可。</span>
			</p>
			<h2>
				三、渠道分配
			</h2>
			<p>
				&nbsp;&nbsp;&nbsp; 在“系统维护”菜单下，系统列表后面有“配置渠道”入口，可以设置一个系统的不同渠道，分别监控。
			</p>
			<h2>
				四、配置文件维护
			</h2>
			<p>
				&nbsp;&nbsp;&nbsp; 配置文件是根据系统-渠道两个维度进行维护的。当你需要监控的系统和渠道已经维护好，并且把渠道分配给系统后，在“监控点维护”菜单下就可以看到对应的记录<span style="background-color:#E53333;">（如果没有，请进行系统分配渠道操作）</span>。默认下是没有维护配置文件的，在列表右侧，有“修改配置”入口，可以修改指定系统和渠道下的配置文件。配置文件按照模板要求编辑好，直接黏贴进入保存即可。<span style="background-color:#E53333;">请注意验证配置文件格式，格式错误将无法保存。</span>
			</p>
			<h2>
				五、配置文件模板
			</h2>
			<p>
				&nbsp;&nbsp;&nbsp; <a target="_blank" href="/template/demo.xml">《配置文件节点说明》</a>
			</p>
			<p>
				&nbsp;&nbsp;&nbsp; <a target="_blank" href="/template/SuperUmpConfig_pc.xml">《交易PC完整配置》</a>
			</p>
		</div>
		</div>
		
    </div>
</div>
<script src="/misc/jquery-1.11.1.min.js"></script>
<script src="/misc/todc-bootstrap/js/bootstrap.min.js"></script>
</body>
</html>