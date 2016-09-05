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
    <link id="tree_table_default" type="text/css" rel="stylesheet" href="../../script/treeTable/default/jquery.treeTable.css">
    
</head>
<body>
系统：
<input type="radio" id="systemName" name="systemName" value="cart" onclick="changeSystem('cart');">购物车
<input type="radio" id="systemName" name="systemName" value="trade" onclick="changeSystem('trade');" checked>下单
<input type="radio" id="systemName" name="systemName" value="area" onclick="changeSystem('area');">地址服务

<br>
渠道：
<input type="radio" id="channel" name="channel" value="pc" onclick="changeChannel('pc');" checked>PC
<input type="radio" id="channel" name="channel" value="shouji" onclick="changeChannel('shouji');">手机
<input type="radio" id="channel" name="channel" value="weixin" onclick="changeChannel('weixin');">微信
<input type="radio" id="channel" name="channel" value="shoujiqq" onclick="changeChannel('shoujiqq');">手Q
<input type="radio" id="channel" name="channel" value="guojizhan" onclick="changeChannel('guojizhan');">国际站
<input type="radio" id="channel" name="channel" value="tongyongxiadan" onclick="changeChannel('tongyongxiadan');">通用下单
<input type="radio" id="channel" name="channel" value="coudan" onclick="changeChannel('coudan');">凑单
<input type="radio" id="channel" name="channel" value="miaosha" onclick="changeChannel('miaosha');">秒杀
<input type="radio" id="channel" name="channel" value="B28" onclick="changeChannel('B28');">B28
<input type="radio" id="channel" name="channel" value="YZ" onclick="changeChannel('YZ');">YZ
<br>

时间：
<input type="radio" id="invokeType" name="invokeType" value="1" onclick="changeType(1);" checked>1分钟 
<input type="radio" id="invokeType" name="invokeType" value="2" onclick="changeType(2);">10分钟
<input type="radio" id="invokeType" name="invokeType" value="3" onclick="changeType(3);">30分钟
<input type="radio" id="invokeType" name="invokeType" value="4" onclick="changeType(4);">1小时
<input type="radio" id="invokeType" name="invokeType" value="5" onclick="changeType(5);">1天
<br>

查询时间段：<span id="showUmpTimeFrame"></span>
<br>
<button onclick="autoRefresh();">自动刷新</button>
<button onclick="clearAutoRefresh()">取消自动刷新</button>
<br><br>

<input type="hidden" id="systemNameParam" value="trade">
<input type="hidden" id="channelParam" value="pc">
<input type="hidden" id="invokeTypeParam" value="1">


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
					<th>查看机器</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</fieldset>
</div>

</body>
<script type="text/javascript">

var intervalId = null;

function autoRefresh(){
	if(intervalId == null){
		alert("开启自动刷新！");
		intervalId = window.setInterval(refresh, 5000);
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

intervalId = window.setInterval(refresh, 5000); 

function invoke(systemName, channel, type){
	//$("#umpResultDiv fieldset table tbody").html("");
	var url =  '<%=basePath%>/manage/table/invoke?invokeType='+type + "&systemName=" + systemName + "&channel=" + channel + "&t=" + Math.random();
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
	
	            		if(item1.bisErrorKey != null && item1.bisErrorKey != ""){
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
	        		bodyHtml[bodyHtml.length] = "<td><a onclick=showMachineInfo('" + item1.mainKey + "','" + item1.referenceTP + "');>查看</a></td>";
	        		bodyHtml[bodyHtml.length] = "</tr>";
	
	        		if(type != 1 && umpResultMap[item1.mainKey] != null){
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
	invoke(systemName, jQuery("#channelParam").val(), jQuery("#invokeTypeParam").val());
}

function changeChannel(channel){
	jQuery("#channelParam").val(channel);
	invoke(jQuery("#systemNameParam").val(), jQuery("#channelParam").val(), jQuery("#invokeTypeParam").val());
}

function changeType(type){
	jQuery("#invokeTypeParam").val(type);
	invoke(jQuery("#systemNameParam").val(), jQuery("#channelParam").val(), type);
}

jQuery(document).ready(function (){
	invoke(jQuery("#systemNameParam").val(), jQuery("#channelParam").val(), jQuery("#invokeTypeParam").val());
});

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
	var url = "invokeWithMachine?invokeType=" +  type + "&referenceTP=" + rtp + "&umpKey=" + key;
	layer.open({
        type: 2,
        title: '查看机器性能',
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        area : ['800px' , '460px'],
        content: url
    });
}

</script>
</html>