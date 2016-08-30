<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + "" + (request.getServerPort() == 80 ? "" : ":" + request.getServerPort()) + path;
%>
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
    <link id="tree_table_default" type="text/css" rel="stylesheet" href="../../script/treeTable/default/jquery.treeTable.css">
    <style>
    	.txt{border:1px solid #d7d7d7;width:73px;height:24px;margin-right:6px;vertical-align:middle;}
    	.sel2,.txt2{width:160px;}
    	.cal{background:url("../../misc/i/btn1.png") no-repeat 130px 5px #fff;}
    </style>
    
</head>
<body>
系统：
<c:forEach items="${systemList}" var="system" varStatus="vs">
	<input type="radio" id="systemName" name="systemName" value="${system.id}" onclick="changeSystem('${system.id}');" <c:if test="${vs.index == 0}"> checked </c:if> >${system.systemName}
</c:forEach>

<br>
渠道：
<span id="channelDiv"></span>
<br>

时间：
<input type="radio" id="invokeType" name="invokeType" value="1" onclick="changeType(1);" checked>1分钟 
<input type="radio" id="invokeType" name="invokeType" value="2" onclick="changeType(2);">10分钟
<input type="radio" id="invokeType" name="invokeType" value="3" onclick="changeType(3);">30分钟
<input type="radio" id="invokeType" name="invokeType" value="4" onclick="changeType(4);">1小时
<input type="radio" id="invokeType" name="invokeType" value="5" onclick="changeType(5);">一天
<input type="radio" id="invokeType" name="invokeType" value="5" onclick="changeType(6);">具体时间段
<span id="timesSpan" style="display: none;">
开始时间：<input type="text" class="txt txt2 cal"  name="startTime" id="startTime" onfocus="WdatePicker({ isShowWeek: true, dateFmt: 'yyyy-MM-dd HH:mm:ss'});" ></input> 
结束时间：<input type="text" class="txt txt2 cal"  name="endTime" id="endTime" onfocus="WdatePicker({ isShowWeek: true, dateFmt: 'yyyy-MM-dd HH:mm:ss'});" ></input>
</span>
<br>
查看：
<input type="radio" id="onlyRedKey" name="onlyRedKey" value="0" onclick="changeOnlyRedKey(0);" checked>全部KEY
<input type="radio" id="onlyRedKey" name="onlyRedKey" value="1" onclick="changeOnlyRedKey(1);">标红KEY
<br>
查询时间段：<span id="showUmpTimeFrame"></span>
<br>
<button onclick="refresh();">查询</button>
<button onclick="autoRefresh();">自动刷新</button>
<button onclick="clearAutoRefresh()">取消自动刷新</button>
<span style="color:red">默认不自动刷新，如果需要，请手动开启（一分钟刷新一次）</span>

<br><br>

<input type="hidden" id="systemNameParam" value="">
<input type="hidden" id="channelParam" value="">
<input type="hidden" id="invokeTypeParam" value="1">
<input type="hidden" id="onlyRedKeyParam" value="0">


<div id="umpResultDiv">
	<fieldset>
		<table id="treeTableId" style="width:100%">
			<thead>
				<tr>
					<th>分组名称</th>
					<th>接口名称</th>
					<th>总次数</th>
					<th>成功次数</th>
					<th>异常次数</th>
					<th>可用率</th>
					<th>业务异常</th>
					<th>异常率</th>
					<th>TP99(ms)</th>
					<th>参考性能(ms)</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</fieldset>
</div>

</body>
<script type="text/javascript">

var intervalId = null;

jQuery(document).ready(function (){
	init();
});

//初始化方法
function init(){
	$("#systemNameParam").val($("#systemName").val());
	buildChannelDiv();
}

function autoRefresh(){
	if(intervalId == null){
		alert("开启自动刷新！");
		intervalId = window.setInterval(refresh, 60000);
	}else{
		alert("自动刷新中，不用重复开启！");
	}
}

function clearAutoRefresh(){
	if(intervalId != null){
		alert("关闭自动刷新！");
		clearInterval(intervalId);
		intervalId = null;
	}else{
		alert("自动刷新已经关闭！");
	}
}
//默认不自动刷新
//intervalId = window.setInterval(refresh, 60000); 

function invoke(systemName, channel, type){
	
	var url =  '<%=basePath%>/manage/table/invoke?invokeType='+type + "&systemName=" + systemName + "&channel=" + channel + "&t=" + Math.random();
	
	//如果是按时间段查询，先校验参数
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	if(type == 6){
		if(startTime == null || startTime == ""){
			alert("请选择开始时间！");
			return false;
		}
		if(endTime == null || endTime == ""){
			alert("请选择结束时间！");
			return false;
		}

		var t1 = new Date(startTime.replace(/-/g, '/'));
		var t2 = new Date(endTime.replace(/-/g, '/'));

		//最大查询1个月的数据
		if((t2-t1)>2592000000){
			alert("时间间隔不能超过30天！");
			return false;
		}

		url =  '<%=basePath%>/manage/table/invoke?invokeType='+type + "&systemName=" + systemName + "&channel=" + channel + "&startTime=" + startTime 
		+ "&endTime=" + endTime + "&t=" + Math.random();

	}

	//$("#umpResultDiv fieldset table tbody").html("");
	
	var onlyRedKey = jQuery("#onlyRedKeyParam").val();
	
    $.getJSON(url,function(map) {
    	var bodyHtml = [];
        var umpConfigGroups = map['umpConfigGroups'];
        var umpResultMap = map['umpResultMap'];
        if(umpConfigGroups == null){
        	bodyHtml[bodyHtml.length] = "<tr>";
        	bodyHtml[bodyHtml.length] = "<td  colspan='11'>未配置</td>";
        	bodyHtml[bodyHtml.length] = "</tr>";
        }else{
	    	jQuery.each(umpConfigGroups, function(index, item) {
	        	var pId = index+1;
	    		bodyHtml[bodyHtml.length] = "<tr id='" + pId + "'>";
	    		bodyHtml[bodyHtml.length] = "<td><b>" + item.groupNameDes + "</b></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "<td></td>";
	    		bodyHtml[bodyHtml.length] = "</tr>";
	        	var groupName = item.groupName;
	        	var groupNameDes = item.groupNameDes;
	        	var umpConfigs = item.umpConfigs;
	        	jQuery.each(umpConfigs, function(index1, item1) {

	        		if(onlyRedKey == 1 && item1.mark != 1){
		        		return true;
	        		}
	        		
	            	var id = (pId + "000" + (index1+1));
	        		var recordDate = null;
	        		if(umpResultMap[item1.mainKey] != null){
	        			recordDate = umpResultMap[item1.mainKey].perReportData;
	        		}
	
	        		if(recordDate != null && recordDate.length > 0){
	        			//if(recordDate[0].tp99 >= item1.maxReferenceTP || recordDate[0].tp99 <= item1.minReferenceTP){
	        			if(item1.mark == 1){
	            			bodyHtml[bodyHtml.length] = "<tr style='background:red' id='" + id + "' pId='" + pId + "'>";
	                	}else{
	                		bodyHtml[bodyHtml.length] = "<tr id='" + id + "' pId='" + pId + "'>";
	                	}
	            		bodyHtml[bodyHtml.length] = "<td></td>";
	            		//bodyHtml[bodyHtml.length] = "<td><a title=" + item1.mainKey + ">" + item1.mainKeyDes + "(" + item1.mainKey + ")"  + "</a></td>";
	            		bodyHtml[bodyHtml.length] = "<td><a title=" + item1.mainKey + ">" + item1.mainKeyDes + "</a></td>";
	            		bodyHtml[bodyHtml.length] = "<td>" + recordDate[0].totalInvokeCount + "</td>";
	            		bodyHtml[bodyHtml.length] = "<td>" + recordDate[0].successCount + "</td>";
	            		bodyHtml[bodyHtml.length] = "<td>" + recordDate[0].failCount + "</td>";
	            		bodyHtml[bodyHtml.length] = "<td>" + recordDate[0].availableRate.toFixed(2) + "</td>";
	
	            		if(item1.bisErrorKey != null && item1.bisErrorKey != "" && umpResultMap[item1.bisErrorKey] != null){
	            			var bisErrorRecordDate = umpResultMap[item1.bisErrorKey].perReportData;
	            			if(bisErrorRecordDate != null && bisErrorRecordDate.length > 0){
	            				bodyHtml[bodyHtml.length] = "<td><a title=" + item1.bisErrorKey + ">" + bisErrorRecordDate[0].totalInvokeCount + "</a></td>";
	            				bodyHtml[bodyHtml.length] = "<td>" + ((bisErrorRecordDate[0].totalInvokeCount/recordDate[0].totalInvokeCount) * 100).toFixed(2) + "</td>";
	            			}else{
	            				bodyHtml[bodyHtml.length] = "<td>--</td>";
	            				bodyHtml[bodyHtml.length] = "<td>--</td>";
	            			}
	            		}else{
	            			bodyHtml[bodyHtml.length] = "<td>--</td>";
	            			bodyHtml[bodyHtml.length] = "<td>--</td>";
	        			}
	            		
	            		bodyHtml[bodyHtml.length] = "<td>" + recordDate[0].minTp99 + "-" + recordDate[0].tp99 + "</td>";
	
	            		if(type == 1){
	            			var showUmpTimeFrame = recordDate[0].startDate + "--" + recordDate[0].endDate;
							jQuery("#showUmpTimeFrame").html(showUmpTimeFrame);
	            		}

	            		if(type == 6){
	            			var showUmpTimeFrame = $("#startTime").val() + "--" + $("#endTime").val();
							jQuery("#showUmpTimeFrame").html(showUmpTimeFrame);
		        		}
	            		
	            	}else{
	            		bodyHtml[bodyHtml.length] = "<tr id='" + id + "' pId='" + pId + "'>";
	            		bodyHtml[bodyHtml.length] = "<td></td>";
	            		bodyHtml[bodyHtml.length] = "<td><a title=" + item1.mainKey + ">" + item1.mainKeyDes + "</a></td>";
	            		bodyHtml[bodyHtml.length] = "<td>--</td>";
	            		bodyHtml[bodyHtml.length] = "<td>--</td>";
	            		bodyHtml[bodyHtml.length] = "<td>--</td>";
	            		bodyHtml[bodyHtml.length] = "<td>--</td>";
	            		bodyHtml[bodyHtml.length] = "<td>--</td>";
	            		bodyHtml[bodyHtml.length] = "<td>--</td>";
	            		bodyHtml[bodyHtml.length] = "<td>--</td>";
	            	}
	        		
	        		
	        		bodyHtml[bodyHtml.length] = "<td>" + item1.referenceTP + "</td>";
	        		bodyHtml[bodyHtml.length] = "<td><a href='javascript:void(0);' onclick=showMachineInfo('" + item1.mainKey + "','" + item1.referenceTP + "');>查看机器</a>";
	        		bodyHtml[bodyHtml.length] = "&nbsp;&nbsp;&nbsp;<a href='gotoUMP?umpKey=" + item1.mainKey + "' target='_blank'>查看UMP</a>";
	        		bodyHtml[bodyHtml.length] = "</td>";
	        		bodyHtml[bodyHtml.length] = "</tr>";
	
	        		if(type != 1 && type != 6 && umpResultMap[item1.mainKey] != null){
	        			var showUmpTimeFrame = umpResultMap[item1.mainKey].startTime + "--" + umpResultMap[item1.mainKey].endTime;
						jQuery("#showUmpTimeFrame").html(showUmpTimeFrame);
	        		}
	        		
	
	        	});
	    	});
        }
    	$("#umpResultDiv fieldset table tbody").html(bodyHtml.join(""));
    	buildTree();
    });
}

//修改系统调用
function changeSystem(systemName){
	jQuery("#systemNameParam").val(systemName);
	buildChannelDiv();
	//invoke(systemName, jQuery("#channelParam").val(), jQuery("#invokeTypeParam").val());
}

function changeChannel(channel){
	jQuery("#channelParam").val(channel);
	invoke(jQuery("#systemNameParam").val(), jQuery("#channelParam").val(), jQuery("#invokeTypeParam").val());
}

function changeType(type){
	jQuery("#invokeTypeParam").val(type);
	if(type == 6){
		$("#timesSpan").show();
		var bodyHtml = [];
		bodyHtml[bodyHtml.length] = "<tr>";
    	bodyHtml[bodyHtml.length] = "<td  colspan='11'>请选择时间段，然后点击查询按钮！</td>";
    	bodyHtml[bodyHtml.length] = "</tr>";
    	$("#umpResultDiv fieldset table tbody").html(bodyHtml.join(""));
    	$("#showUmpTimeFrame").html("");
	}else{
		$("#timesSpan").hide();
		
	}
	invoke(jQuery("#systemNameParam").val(), jQuery("#channelParam").val(), type);
}



function buildTree(){
	var option = {
        theme:'default',
        expandLevel : 20
    };
    $('#treeTableId').treeTable(option);
}

function refresh(){
	invoke(jQuery("#systemNameParam").val(), jQuery("#channelParam").val(), jQuery("#invokeTypeParam").val());
}

function showMachineInfo(key, rtp){
	var type = jQuery("#invokeTypeParam").val();
	var url = "invokeWithMachine?invokeType=" +  type + "&referenceTP=" + rtp + "&umpKey=" + key + '&t=' + Math.random();

	if(type == 6){
		//如果是按时间段查询，先校验参数
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		url = "invokeWithMachine?invokeType=" +  type + "&referenceTP=" + rtp + "&umpKey=" + key + "&startTime=" + startTime 
		+ "&endTime=" + endTime + '&t=' + Math.random();
	}
	
	layer.open({
        type: 2,
        title: '查看机器性能',
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        area : ['800px' , '460px'],
        content: url
    });
}

function buildChannelDiv(){
	$("#channelDiv").html("");
	var systemId = jQuery("#systemNameParam").val();
	var url =  '<%=basePath%>/manage/comm/queryChannelBySystemId?systemId='+ systemId + '&t=' + Math.random();
	var channelDivHtml = [];
	$.getJSON(url,function(map) {
		var channelList = map['channelList'];
		if(channelList == null || channelList.length == 0){
			channelDivHtml[channelDivHtml.length] = "<font color=red>未配置该系统的渠道，请先维护数据。</font>";
		}else{
			jQuery.each(channelList, function(index, item) {
				if(index == 0){
					channelDivHtml[channelDivHtml.length] = "<input type='radio' id='channel' name='channel' value='" + item.id + "' onclick='changeChannel(" + item.id + ");' checked >" + item.channelName;
					$("#channelParam").val(item.id);
				}else{
					channelDivHtml[channelDivHtml.length] = "<input type='radio' id='channel' name='channel' value='" + item.id + "' onclick='changeChannel(" + item.id + ");'>" + item.channelName;
				}
			});
		}
		$("#channelDiv").html(channelDivHtml.join(""));
		invoke(jQuery("#systemNameParam").val(), jQuery("#channelParam").val(), jQuery("#invokeTypeParam").val());
	});
}

function changeOnlyRedKey(onlyRedKey){
	jQuery("#onlyRedKeyParam").val(onlyRedKey);
	invoke(jQuery("#systemNameParam").val(), jQuery("#channelParam").val(), jQuery("#invokeTypeParam").val());
}
</script>
</html>