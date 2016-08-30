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
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta charset="utf-8" />
<meta content="yes" name="apple-mobile-web-app-capable"/>
<meta content="yes" name="apple-touch-fullscreen"/>
<meta content="telephone=no" name="format-detection"/>
<meta content="black" name="apple-mobile-web-app-status-bar-style"/>
<meta name="msapplication-TileColor" content="#ffffff" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<link rel="stylesheet" type="text/css" href="/misc/skin/index.css?r=3"/>
<link rel="stylesheet" type="text/css" href="/misc/skin/list.css?r=3"/>
<script src="/misc/jquery-1.11.1.min.js"></script>
<script src="/misc/comm.js?r=1"></script>
<script src="/misc/mobiscroll/dev/js/mobiscroll.core-2.5.2.js" type="text/javascript"></script>
<script src="/misc/mobiscroll/dev/js/mobiscroll.core-2.5.2-zh.js" type="text/javascript"></script>
<link href="/misc/mobiscroll/dev/css/mobiscroll.core-2.5.2.css" rel="stylesheet" type="text/css" />
<link href="/misc/mobiscroll/dev/css/mobiscroll.animation-2.5.2.css" rel="stylesheet" type="text/css" />
<script src="/misc/mobiscroll/dev/js/mobiscroll.datetime-2.5.1.js" type="text/javascript"></script>
<script src="/misc/mobiscroll/dev/js/mobiscroll.datetime-2.5.1-zh.js" type="text/javascript"></script>
<script src="/misc/mobiscroll/dev/js/mobiscroll.ios-2.5.1.js" type="text/javascript"></script>
<link href="/misc/mobiscroll/dev/css/mobiscroll.ios-2.5.1.css" rel="stylesheet" type="text/css" />
<script src="/misc/mobiscroll/dev/js/mobiscroll.list-2.5.1.js" type="text/javascript"></script>
<script src="/misc/mobiscroll/dev/js/mobiscroll.list-2.5.1.js" type="text/javascript"></script>
<script src="/misc/mobiscroll/dev/js/mobiscroll.select-2.5.1.js" type="text/javascript"></script>

<script src="http://jdme.jd.com/open/jdme-sdk-dev.js" type="text/javascript"></script>

<style>
.nav {
	width: 100%;
	height: 64px;
	position: relative;
	font-size: 17px;
	line-height: 44px;
	position: fixed;
	top: 0;
	z-index: 100;
	max-width: 640px;
	padding-top: 20px;
	background-image:url(/misc/skin/i/c43549.png)
}

.back {
	position: absolute;
	left: 0;
	top: 0px;
	width: 35%;
	height: 64px;
	padding-left: 3.125%
}

.back .back-icon {
	width: 11px;
	height: 21px;
	float: left;
	background:
		url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAApCAYAAADeWrJ9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTU3NUY4QTQ5OUZGMTFFNDg5RjVEQTFDMTU2NDUwNUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTU3NUY4QTM5OUZGMTFFNDg5RjVEQTFDMTU2NDUwNUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZCQTBBM0RGOTdENzExRTRBODlGQzE2RkRDQTY5REQzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZCQTBBM0UwOTdENzExRTRBODlGQzE2RkRDQTY5REQzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+9wG4FAAAAeVJREFUeNqsl00oRFEUx98MhshHoiwsbChWLGRjxYqVIslCpKQspCxYKEVZUJJkJ1ZKpCjJQiERIbGwoVhQRJTPGM//cF8dpzHevDm3ftO8ue/9/vXm3nPv9dm2bSk2HxgHO2DCIrkSPjBm/7QgaNQUj9i/26SWfFiIp0GMhnhQiGdI/P1fRikeEOJZEOf0RyPuE+J5EOD3eBX3CvGiFHuV9wjxUiixF3mXEC+D+L/uj0TcKcQrIDHcM27FHUK8+p/YrbwdfDLxmhuxG3mbEG+AJLevMlxnixBvgpRIBsBfHc1CvA1SIx22oX5sMiXTabtexKHkDeCDifdAmtcSwS/qhfgApEdT2JwvtUJ8CDKjLcf0UQPemfhYQ0z4sZBWg1i2yMaAgMpybSragpjepyBH47U4ATRp3ljAOcjVkDtUghcWcAnyteREOXhiAdegUEtOlIIHFnALirXkRAm4YwH3JlRFThSBGxbwCMq05EQBuGIBz6BCS07kgQsWQEO2SktumUl1xgKoZNRpyYlscMICqNg1asmJLHDEAmjFatWSExlgXwR0aMkts0Jti4LXrSUnksG6COjXkltmg7QiAoboKKN1bEkw22jeRv1KR8RXs6LNmesg2NI8KlrmLDRltijWlwADAJMc2xDBN75jAAAAAElFTkSuQmCC)
		no-repeat;
	background-size: 11px 21px;
	margin-top: 30px
}

.back .back-txt {
	padding-left: 10px;
	color: #fff
}

.title {
	float: left;
	width: 100%;
	text-align: center;
	color: #ffffff;
	font-size: 17px;
	height:64px;
}

.mainbox {
	width: 100%;
	padding: 64px 0 0 0;
	position: relative
}
</style>
</head>
<body>
<div class="common-wrapper">

