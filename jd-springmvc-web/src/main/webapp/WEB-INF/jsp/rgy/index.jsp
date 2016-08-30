<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ""
			+ (request.getServerPort() == 80 ? "" : ":" + request.getServerPort()) + path;
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<title>交易平台监控系统</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link href="../../rgy/static/css/bootstrap.min.css" rel="stylesheet">
<link href="../../rgy/static/css/common.css" rel="stylesheet">
<link href="../../rgy/static/css/home.css" rel="stylesheet">
<script type="text/javascript" src="../../rgy/static/js/jquery.min.js"></script>
<script type="text/javascript"
	src="../../rgy/static/js/bootstrap.min.js"></script>
</head>
<body>
	<nav class="navbar navbar-default navbar-static-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="${basePath}"
					style="font-size: 20px; color: #2F67B4; font-weight: bold;">交易平台监控系统</a>
			</div>
			<div class="collapse navbar-collapse" style="font-size: 14px;">
				<ul class="nav navbar-nav">
					<li><a href="${basePath}">首页</a></li>
				</ul>
				<!-- <p class="navbar-text navbar-right" style="margin-right: 20px;">
					<a style='color: blue'
						href="http://wqadmin.jd.com/athena/rgy/index.php/biz/peopleInfo">欢迎您，<b>xueqiang3</b></a>
				</p> -->
			</div>
		</div>
	</nav>

	<div id="content">

		<!-- 业务线 -->
		<div class="wrap" style="width: 1851px">

			<div>
				<!--显示样式分组头  -->
				<!--[D] 黄色点样式 yellow-->
				<!--[D] 红色点样式 red-->
				<!--[D] 灰色点样式 grey-->
				<ul class="list-process">
					<c:forEach items="${systemList}" var="system" varStatus="vs">
						<li><span>${system.systemName}</span> <span class="img-icon"><img
								src="../../rgy/static/img/home/erp.png" width="48" height="48"></span></li>
					</c:forEach>
				</ul>
				<div class="cl"></div>
				<ul class="list-process2">
					<c:forEach items="${systemList}" var="system" varStatus="vs">
						<li class="b">
							<ul class="data-list">
								<c:forEach items="${chanNameList[system.id]}" var="channelName"
									varStatus="c">
									<div class="subTree">
									  <c:if test="${fn:split(resultMap[system.id][c.index],'$$')[1]=='grey'}"> <span style="color: #999;left:30px;top:5px;position: absolute;">无量</span>
									  
									  </c:if> 
									  
									   <c:if test="${fn:split(resultMap[system.id][c.index],'$$')[1]!='grey' && invokeChanView[channelName]!=null}"> <span style="color:#777;left:20px;top:5px;position: absolute;">${invokeChanView[channelName]["invokePercent"]}(${invokeChanView[channelName]["invokeCountView"]}万)</span> 
									  
									  </c:if> 
									
										<span class="subIcon"
											style="background: ${fn:split(resultMap[system.id][c.index],'$$')[1]};"></span>
									</div>
									<li class="bizItem" id="bizid_${vs.index}_${c.index}"
										flag="false"><span class="text3"
										onclick="Show('${vs.index}_${c.index}');">${channelName}</span>
										 <span onclick="Show('${vs.index}_${c.index}');"
										class="icon-p bizItemColor ${fn:split(resultMap[system.id][c.index],'$$')[1]}"></span>
										<%-- <c:forEach items="${systemIdChannelIdsMap[system.id]}" var="channelId" varStatus="cid"> --%>
										<c:set value="${systemIdChannelIdsMap[system.id][c.index]}"
											var="channelId" /> <c:forEach
											items="${configMap[channelId]}" var="mainKey" varStatus="key">
											<div class="linebox"
												<c:if test="${fn:split(mainKey,'$$')[1]=='green' || fn:split(mainKey,'$$')[1]=='grey' || fn:split(resultMap[system.id][c.index],'$$')[1]=='grey'}"> style="display:none"</c:if>>
											    <c:if test="${fn:split(mainKey,'$$')[5]=='up'}">	<span style='margin-left:30px;width:20px;height:19px;display:block' class='up'></span></c:if>
												<div class="subkey">
												     <c:if test="${fn:split(mainKey,'$$')[4]!='0'}"><span style="color: red;font-size: 12px;">*</span>
										            </c:if>
													<a target="_blank"
														href="http://jk.jd.com/manage/table/gotoUMP?umpKey=${fn:split(mainKey,'$$')[2]}">${fn:split(mainKey,'$$')[0]}</a>
												</div>
												<span style="left: 100px; top: 25px;" data-toggle="popover"
													onclick="serviceChange(${fn:split(mainKey,'$$')[4]})"
													class="icon-p bizItemColor ${fn:split(mainKey,'$$')[1]}"></span>
											</div>
										</c:forEach> <%-- </c:forEach> --%></li>

								</c:forEach>
							</ul>
						</li>
					</c:forEach>
				</ul>
			</div>
			<div class="cl"></div>
		</div>
	</div>
	<div class="modal" id="myModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">×</span><span class="sr-only">Close</span>
					</button>
					<h4 class="modal-title" id="mdTitle">服务切换和路由</h4>
				</div>
				<div class="modal-body" id="mdBody">
				   <p><span style="margin-left:150px">操作密码:</span><input type="password" id="txtPwd" name="txtPassword"  value=""  placeholder="请输入密码" /></p>
					<table class="table table-condensed">
						<tr>
							<td>配置号</td>
							<td>版本号</td>
							<td>状态</td>
							<td>操作</td>
						</tr>

					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<!-- <button type="button" class="btn btn-primary">保存</button> -->
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
	<script type="text/javascript">
			function Show(v) {
				if ($("#bizid_" + v).attr("flag") == "true") {
					$("#bizid_" + v).children(".linebox").hide();
					$("#bizid_" + v).attr("flag", "false");
				} else {
					$("#bizid_" + v).children(".linebox").show();
					$("#bizid_" + v).attr("flag", "true");
				}

			}
			function switchService(typeId, configId,pid){
				if(typeId>0 && configId>0 ){
					if($("#txtPwd").val()==""){
						alert("请输入操作密码!");
						return;
					}
					$.ajax({
						url:"http://jk.jd.com/manage/rgy/doSwitchConfig?typeId="+typeId+"&configId="+configId+"&pwd="+$("#txtPwd").val()+"&rnd="+Math.random(),
						cache:false,
						success:function(data) { 
							if(data=="1"){
								
								alert("切换成功！");
							}else if(data=="2") {
								alert("密码错误！");
							}else{
								alert("系统异常!");
							}
							serviceChange(pid);
						}
						});
			}
			}
			function serviceChange(configId) {
				if(configId>0){
					$.ajax({
						url:"http://jk.jd.com/manage/rgy/getSwitchConfig?configId="+configId+"&rnd="+Math.random(),
						cache:false,
						dataType: "json", 
						success:function(data) {  
							$("#mdTitle").html(data.switchServiceName);
							 var tbHtml="<p><span style='margin-left:150px'>操作密码:</span><input type='password' id='txtPwd' name='txtPassword'  value=''  placeholder='请输入密码' /></p><table class='table table-condensed'> <tr><td>配置号</td> <td>版本号</td> <td>状态</td><td>切换描述</td><td>操作</td></tr>";
							for(var i=0;i<data.switchConfigs.length;i++){
								   var flag="关闭状态";
								   var btn="<button type='button' class='btn btn-primary' onclick='switchService("+data.switchConfigs[i].busConfigNo+","+data.switchConfigs[i].configNo+","+configId+")'>启用</button>";
								   if(data.switchConfigs[i].flag==1){
									   flag="开启状态";
									   btn=" ";
									   
								   }else if(data.switchConfigs[i].flag=="-1") {
									   flag="获取状态异常";
								   }
				                   var row="<tr><td>"+data.switchConfigs[i].busConfigNo+"</td> <td>"+data.switchConfigs[i].configNo+"</td> <td style='color:red'>"+flag+"</td><td>"+data.switchConfigs[i].switchDesc+"</td><td>"+btn+"</td></tr>";
				                   tbHtml+=row;
							}
							tbHtml+="</table>";
							$("#mdBody").html(tbHtml);
						}
						
							       
					});
					
					$("#myModal").modal("show");
				}
			}
			function refresh() {
				window.location.reload();
			}

			$(document).ready(function() {				
				if($(".red").size()>0){
			    	texttospeak("请注意!");	    	
			    	$(".red:not([style])").each(function(){
			        	var suffix = "异常";
			        	var systemNum = $(this).parent().attr("id").split("_")[1];    	    	
			        	var systemName = $(".list-process li:eq("+systemNum+")").children().text();
			        	texttospeak(systemName+"系统");
			        	var channel = $(this).prev().text();
			        	texttospeak(channel+"渠道");
			        	$(this).nextAll().each(function(){    		
			        		$(this).find(".red").each(function(){
			            		var text = $(this).prev().children().text();        		
			            		texttospeak(text+" "+suffix);
			        		});    		   		
			        	});    	
			        });
			    }
												
				setTimeout(refresh, 30000);
			});
			function texttospeak(text){
		        var msg = new SpeechSynthesisUtterance(text);
		        msg.lang = 'zh';
		        msg.rate = 1.5;
		        msg.voice = speechSynthesis.getVoices().filter(function(voice) {
		        return voice.name == 'Whisper';
		        })[0];        
		        speechSynthesis.speak(msg);
			}
		</script>
</body>
</html>