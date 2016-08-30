package com.jd.trafficlight.web.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.jd.data.redis.RedisUtils;
import com.jd.data.redis.connection.RedisAccessException;
import com.jd.order.purchase.config.client.xmlext.service.XmlConfigService;
import com.jd.statistics.domain.UmpResultView;
import com.jd.statistics.domain.config.SystemAndChannelConfigs;
import com.jd.statistics.domain.config.UmpConfig;
import com.jd.statistics.domain.config.UmpConfigGroup;
import com.jd.statistics.domain.db.ChannelDomain;
import com.jd.statistics.domain.db.SystemDomain;
import com.jd.statistics.domain.ump.UmpResult;
import com.jd.statistics.domain.ump.UmpResult.ReportData;
import com.jd.statistics.service.ChannelService;
import com.jd.statistics.service.InvokeUmpService;
import com.jd.statistics.util.config.ConfigUtil;
import com.jd.statistics.util.ump.openapi.UmpOpenApiDateParamUtil;

@Component
public class ConfigFormatUtil {

	private InvokeUmpService invokeUmpService;
	private InvokeUmpService invokeUmpServiceOpenApiImpl;
	private ChannelService channelService;
    private XmlConfigService configService;
	private RedisUtils  redisUtils;
	
	public void formatJson(ModelAndView view,List<SystemDomain> systemList,HttpSession session,String sessionName,int typeId)
	{
		Map<String,String> channelNameMap = new HashMap<String,String>();
		Map<String,String> detailMap=new HashMap<String, String>();
		Map<String,ChannelDomain> domainMap=new HashMap<String, ChannelDomain>();
		List<String> doMainList=new ArrayList<String>();
		Map<String,List<String>> ChannelListMap=new HashMap<String, List<String>>();
		Map<String,List<String>> ChannelDomainList=new HashMap<String, List<String>>();
//		Map<String,List<ChannelDomain>> ChannelListMap=new HashMap<String, List<ChannelDomain>>();
		for(SystemDomain sd:systemList)
		{
			List<ChannelDomain> channelList = channelService.queryChannelListBySystemId(sd.getId(),typeId);
			if(channelList == null){
				channelList = new ArrayList<ChannelDomain>();
			}
			List<String> channelId=new ArrayList<String>();
			String allHtml="green";
			for(ChannelDomain cd:channelList)
			{
				UmpResultView umpView=invoke(1,sd.getId()+"",cd.getId()+"","","",typeId);
				String channelHtml="green";
				if(umpView != null)
				{
					List<UmpConfigGroup> umpCGList=umpView.getConfig().getUmpConfigGroups();
					List<String> keyList=new ArrayList<String>();
					if(umpCGList == null || umpCGList.size() == 0)
						continue ;
					for(UmpConfigGroup umpCG:umpCGList)
					{
						for(UmpConfig config:umpCG.getUmpConfigs())
						{
							String returnHtml="green";
							StringBuilder html=new StringBuilder();
							html.append("<table align=\"center\"  style=\"width:100%\"><tr align=\"center\" ><td>key</td><td>总次数</td><td>成功次数</td><td>同期次数</td><td>可用率</td><td>TP99</td><td>参考</td></tr>");
							UmpResult umpResult=umpView.getUmpResultMap().get(config.getMainKey());
							if(umpResult == null)
								continue ;
							List<ReportData> rdList=umpResult.getPerReportData();
							if(rdList != null && rdList.size()>0)
							{
								ReportData rd=rdList.get(0);
								long successCount=getLastDateNum(rd,config.getMainKey());
								long startCount=(long) (successCount*0.8);
								long endCount=(long)(successCount*1.2);
								
								if(rd.getTp99()>1000||rd.getAvailableRate()<80)
								{
									returnHtml="red";
									html.append("<tr style=\"background-color: red;\">");
									channelHtml="red";
									allHtml="red";
								}else if(rd.getSuccessCount()<startCount||rd.getSuccessCount()>endCount)
								{
									String color="#7d7dff";
									returnHtml=color;
									html.append("<tr style=\"background-color: "+color+";\">");
									channelHtml=color;
									allHtml=color;
								}else if((rd.getTp99()<=config.getMinReferenceTP() || rd.getTp99()>config.getMaxReferenceTP())||rd.getAvailableRate()<90){
									returnHtml="orange";
									html.append("<tr style=\"background-color: orange;\">");
									channelHtml="orange";
									allHtml="orange";
								}
								else{
									html.append("<tr>");
								}
								html.append("<td><a href='gotoUMP?umpKey=" + config.getMainKey() + "' target='_blank'>"+config.getMainKeyDes()+"<br/>"+config.getMainKey()+"</a></td><td>"+rd.getTotalInvokeCount()+"</td>"
										+ "<td>"+rd.getSuccessCount()+"</td><td>"+successCount+"</td>"
										+ "<td>"+rd.getAvailableRate()+"</td><td>"+rd.getTp99()+"</td><td>"+config.getMaxReferenceTP()+"</td></tr>");
							}
							detailMap.put(cd.getId()+"-"+config.getMainKey(), html.toString());
							channelNameMap.put(config.getMainKeyDes()+"-"+cd.getId(),cd.getId()+"-"+config.getMainKey()+"$$"+returnHtml);
							keyList.add(config.getMainKeyDes()+"-"+cd.getId());
						}
					}
					ChannelListMap.put(cd.getId()+"", keyList);
				}
				domainMap.put(cd.getId()+"$$"+channelHtml, cd);
				channelId.add(cd.getId()+"$$"+channelHtml);
			}
			ChannelDomainList.put(sd.getId()+"",channelId);
			doMainList.add(sd.getId()+"$$"+sd.getSystemName()+"$$"+allHtml);
		}
		view.addObject("ChannelListMap", ChannelListMap);
		view.addObject("channelNameMap", channelNameMap);
		view.addObject("domainMap", domainMap);
		view.addObject("doMainList", doMainList);
		view.addObject("ChannelDomainList", ChannelDomainList);
		session.setAttribute(sessionName, detailMap);
	}
	
	private long getLastDateNum(ReportData rd,String mainKey)
	{
		String key=ConfigUtil.REDISKEY+UmpOpenApiDateParamUtil.getForMatTimeByDate(
				UmpOpenApiDateParamUtil.strTimeToDateByParam(rd.getStartDate(), UmpOpenApiDateParamUtil.param2),1,0, "ddHHmm");// "yyyyMMddHHmmss", "ddHHmm");
		try {
			List<String> strList=redisUtils.hmget(key,mainKey);
			if(strList != null && strList.size()>0)
			{
				String str=strList.get(0);
				Gson gson=new Gson();
				ReportData rd1=gson.fromJson(str, ReportData.class);
				if(rd1 == null)
					return 0;
				return rd1.getSuccessCount();
			}
		} catch (RedisAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 0;
	}
	
	public UmpResultView invoke(Integer invokeType, String systemName, String channel,String startTime,String endTime,int typeId) {
		UmpResultView umpView = null;
		switch (invokeType) {
		case 1://1分钟 
			umpView = getInvokeUmpServiceIns2(typeId).oneMinuteReport2(systemName, channel,typeId);
			break;
//		case 2://10分钟
//			umpView = getInvokeUmpServiceIns().tenMinuteReport(systemName, channel);
//			break;
//		case 3://30分钟
//			umpView = getInvokeUmpServiceIns().thirtyMinuteReport(systemName, channel);
//			break;
//		case 4://1小时
//			umpView = getInvokeUmpServiceIns().oneHourReport(systemName, channel);
//			break;
//		case 5://1天
//			umpView = getInvokeUmpServiceIns().oneDayReport(systemName, channel);
//			break;
		case 6://具体时间段
			umpView = getInvokeUmpServiceIns2(typeId).timeReport2(systemName, channel, startTime, endTime,typeId);
			break;
		default:
			break;
		}
		return umpView;
	}
	
	/**
	 * 可以通过开关配置是调用UMP的OpenAPI还是模拟HTTP请求
	 */
	private InvokeUmpService getInvokeUmpServiceIns2(int typeId){
		InvokeUmpService ins = invokeUmpServiceOpenApiImpl;
		try {
			SystemAndChannelConfigs sacc = configService.getConfigByTypeId(typeId, SystemAndChannelConfigs.class);
			if(sacc != null && sacc.getUmpRpcSwithc() == 1){
				ins = invokeUmpService;
			}
		} catch (Exception e) {
		}
		return ins;
	}
	
	public ConfigFormatUtil(InvokeUmpService invokeUmpService,InvokeUmpService invokeUmpServiceOpenApiImpl,ChannelService channelService,XmlConfigService configService,RedisUtils redisUtils) {
		this.channelService=channelService;
		this.invokeUmpService=invokeUmpService;
		this.invokeUmpServiceOpenApiImpl=invokeUmpServiceOpenApiImpl;
		this.configService=configService;
		this.redisUtils=redisUtils;
	}
	
	public ConfigFormatUtil()
	{}
}
