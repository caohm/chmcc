package com.jd.trafficlight.web.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jd.trafficlight.web.util.ConfigFormatUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
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
import com.jd.statistics.service.InvokeUmpWithMachineService;
import com.jd.statistics.service.SystemService;
import com.jd.statistics.service.impl.InvokeUmpWithMachineServiceImpl;
import com.jd.statistics.util.config.ConfigUtil;
import com.jd.statistics.util.ump.openapi.UmpOpenApiDateParamUtil;

/**
 * @author inek
 *
 */
@Controller
@RequestMapping(value = "/monitor")
public class MonitorTableController {

	@Resource
	private InvokeUmpService invokeUmpService;
	@Resource
	private InvokeUmpWithMachineService invokeUmpWithMachineService;
	@Resource
	private InvokeUmpService invokeUmpServiceOpenApiImpl;
	@Resource
	private SystemService systemService;
	@Resource
	private ChannelService channelService;
	@Resource
    private XmlConfigService configService;
	@Resource
	private RedisUtils redisUtils;
	private static final Logger logger = LoggerFactory.getLogger(MonitorTableController.class);
	
	/**
	 * 可以通过开关配置是调用UMP的OpenAPI还是模拟HTTP请求
	 */
	private InvokeUmpService getInvokeUmpServiceIns(){
		InvokeUmpService ins = invokeUmpServiceOpenApiImpl;
		try {
			SystemAndChannelConfigs sacc = configService.getConfigByTypeId(ConfigUtil.CONFIG_TYPE_ID, SystemAndChannelConfigs.class);
			if(sacc != null && sacc.getUmpRpcSwithc() == 1){
				ins = invokeUmpService;
			}
		} catch (Exception e) {
		}
		return ins;
	}
	
	@RequestMapping(value = "/detail")
	public ModelAndView detail(@RequestParam String key,HttpSession session)
	{
		ModelAndView view = new ModelAndView();
		Map<String,String> detailMap=(Map<String,String>)session.getAttribute("detailMap");
		String htmlValue=detailMap.get(key);
		view.addObject("htmlValue", htmlValue);
		return view;
	}
	
	@RequestMapping(value = "/mdetail")
	public ModelAndView mdetail(@RequestParam String key,HttpSession session)
	{
		ModelAndView view = new ModelAndView();
		Map<String,ReportData> detailMap=(Map<String,ReportData>)session.getAttribute("rdMap");
		ReportData rd=detailMap.get(key);
		String htmlValue="<table align=\"center\" style=\"width:100%;table-layout:fixed;\">";
		
		htmlValue+="<tr align=\"center\" ><td style=\"width:35%;word-wrap:break-word;\">key</td><td style=\"word-wrap:break-word;\">"+key+"</td></tr>";
		htmlValue+="<tr align=\"center\" ><td>总次数</td><td>"+rd.getTotalInvokeCount()+"</td></tr>";
		htmlValue+="<tr align=\"center\" ><td>成功次数</td><td>"+rd.getSuccessCount()+"</td></tr>";
		htmlValue+="<tr align=\"center\" ><td>可用率</td><td>"+rd.getAvailableRate()+"</td></tr>";
		htmlValue+="<tr align=\"center\" ><td>TP99</td><td>"+rd.getTp99()+"</td></tr>";
		htmlValue+="</table>";
		
		view.addObject("htmlValue", htmlValue);
		return view;
	}
	
	
	@RequestMapping(value = "/getRedis")
	public ModelAndView getRedis()
	{
		ModelAndView view = new ModelAndView();
		return view;
	}
	
	@ResponseBody 
	@RequestMapping(value = "/getRedisKey")
	public String getRedisKey(@RequestParam String redisKey,@RequestParam String mapKey,@RequestParam String key)
	{
			try {
				Gson g=new Gson();
				if("SMEMBERS".equals(redisKey))
				{
					Set<String> setStrs=redisUtils.smembers(key);
					String strJson=g.toJson(setStrs);
					return strJson;
				}
				if("HMGET".equals(redisKey))
				{
					List<String> strList=redisUtils.hmget(key,mapKey);
					String strJson=g.toJson(strList);
					return strJson;
				}
				if("HKEYS".equals(redisKey))
				{
					Set<String> setStrs=redisUtils.hkeys(key);
					String strJson=g.toJson(setStrs);
					return strJson;
				}
				
				
			} catch (RedisAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return "";
	}
	
	
	
	@ResponseBody 
	@RequestMapping(value = "/detail2")
	public String detail2(@RequestParam String key,HttpSession session)
	{
		Map<String,List<String>> configMap=(Map<String,List<String>>)session.getAttribute("configMap");
		Map<String,String> nameMap=(Map<String,String>)session.getAttribute("nameMap");
		List<String> configList=configMap.get(key);
		String returnHtml="<div style=\"float:left\"><div style=\"text-align:center\">"+nameMap.get(key)+"</div><table>";
		int i=0;
		for(String config:configList)
		{
			if(i==9)
			{
				returnHtml+="</table></div><div style=\"float:left;padding-left:20px;\"><div style=\"text-align:center\">"+nameMap.get(key)+"</div><table>";
			}
			String[] strs=config.split("\\$\\$");
			if(strs != null && strs.length>3){
				String honglvdeng="<h5 style=\"cursor:hand;height:80px;width:100%;border-radius: 50%;width: 40px;height: 40px;background-color:"+strs[1]+";\"  onclick=\"openwindow('"+strs[2]+"')\"></h5>";
				String honglvdeng2="<h5 style=\"cursor:hand;height:80px;width:100%;border-radius: 30%;width: 40px;height: 40px;background-color:"+strs[3]+";\"  onclick=\"openwindow('"+strs[2]+"')\"></h5>";
//				if(strs.length>4 && !org.springframework.util.StringUtils.isEmpty(strs[4]))
//				{
//					honglvdeng2="<h5 style=\"cursor:hand;border-left: 20px solid transparent;  border-right: 20px solid transparent;  border-"+strs[4]+": 30px solid "+strs[3]+";\"  onclick=\"openwindow('"+strs[2]+"')\"></h5>";
//				}
				returnHtml+="<tr><td>"+strs[0]+"</td><td>"+honglvdeng+"</td><td>"+honglvdeng2+"</td></tr>";
			}
			i++;
		}
		returnHtml+="</table></div>";
		
		return returnHtml;
	}
	
	@RequestMapping(value = "/report2")
	public ModelAndView report2()
	{
		ModelAndView view = new ModelAndView();
		return view;
	}
	@RequestMapping(value = "/mreport")
	public ModelAndView mreport()
	{
		ModelAndView view = new ModelAndView();
		return view;
	}
	
	@RequestMapping(value = "/risking")
	public ModelAndView risking()
	{
		ModelAndView view = new ModelAndView();
		Map<String,String> paramKey=new HashMap<String, String>();
		paramKey.put("queryVO.showHtml", "1");
		paramKey.put("queryVO.init", "1");
		paramKey.put("queryVO.name", "order");
		paramKey.put("queryVO.rftype", "99");
		paramKey.put("t", System.currentTimeMillis()+"");
		
		String returnHtml=this.invokeUmpService.getRiskingHtml(paramKey);
		view.addObject("returnHtml", returnHtml);
		
		return view;
	}
	
	
	@RequestMapping(value = "/allinfo")
	public ModelAndView allinfo()
	{
		ModelAndView view = new ModelAndView();
		return view;
	}
	@RequestMapping(value = "/all")
	public ModelAndView all(@RequestParam String key,HttpSession session)
	{
		ModelAndView view = new ModelAndView();
		Map<String,String> detailMap=(Map<String,String>)session.getAttribute("allInfoMap");
		String htmlValue=detailMap.get(key);
		view.addObject("htmlValue", htmlValue);
		return view;
	}
	@RequestMapping(value = "/allDetail")
	public ModelAndView allDetail(HttpSession session)
	{
		ModelAndView view = new ModelAndView();
		List<SystemDomain> systemList = this.systemService.queryList(ConfigUtil.CONFIG_TYPE_ID2);
		if(systemList == null){
			systemList = new ArrayList<SystemDomain>();
		}
		view.addObject("systemList", systemList);
		ConfigFormatUtil c=new ConfigFormatUtil(invokeUmpService,invokeUmpServiceOpenApiImpl,channelService,configService,redisUtils);
		c.formatJson(view, systemList,session,"allInfoMap",ConfigUtil.CONFIG_TYPE_ID2);
		return view;
	}
	
	
	
	@RequestMapping(value = "/orderinfo")
	public ModelAndView orderinfo()
	{
		ModelAndView view = new ModelAndView();
		return view;
	}
	@RequestMapping(value = "/info")
	public ModelAndView info(@RequestParam String key,HttpSession session)
	{
		ModelAndView view = new ModelAndView();
		Map<String,String> detailMap=(Map<String,String>)session.getAttribute("orderInfoMap");
		String htmlValue=detailMap.get(key);
		view.addObject("htmlValue", htmlValue);
		return view;
	}
	@RequestMapping(value = "/orderinfodetail")
	public ModelAndView orderinfodetail(HttpSession session)
	{
		ModelAndView view = new ModelAndView();
		List<SystemDomain> systemList = this.systemService.queryList(ConfigUtil.CONFIG_TYPE_ORDERINFO);
		if(systemList == null){
			systemList = new ArrayList<SystemDomain>();
		}
		view.addObject("systemList", systemList);
		ConfigFormatUtil c=new ConfigFormatUtil(invokeUmpService,invokeUmpServiceOpenApiImpl,channelService,configService,redisUtils);
		c.formatJson(view, systemList,session,"orderInfoMap",ConfigUtil.CONFIG_TYPE_ORDERINFO);
		return view;
	}
	

	/**
	 * 可以通过开关配置是调用UMP的OpenAPI还是模拟HTTP请求
	 */
	private InvokeUmpService getInvokeUmpServiceIns2(){
		InvokeUmpService ins = invokeUmpServiceOpenApiImpl;
		try {
			SystemAndChannelConfigs sacc = configService.getConfigByTypeId(ConfigUtil.CONFIG_TYPE_ID2, SystemAndChannelConfigs.class);
			if(sacc != null && sacc.getUmpRpcSwithc() == 1){
				ins = invokeUmpService;
			}
		} catch (Exception e) {
		}
		return ins;
	}	
	@RequestMapping(value = "/reportDetail")
	public ModelAndView reportDetail(HttpSession session) {
		ModelAndView view = new ModelAndView();
		
		List<SystemDomain> systemList = this.systemService.queryAll2();
		if(systemList == null){
			systemList = new ArrayList<SystemDomain>();
		}
		view.addObject("systemList", systemList);
		
		formatJson(view, systemList,session,"detailMap",ConfigUtil.CONFIG_TYPE_ID2);
		return view;
	}
	
	@RequestMapping(value = "/mreportDetail")
	public ModelAndView mreportDetail(HttpSession session) {
		ModelAndView view = new ModelAndView();
		
		List<SystemDomain> systemList = this.systemService.queryAll2();
		if(systemList == null){
			systemList = new ArrayList<SystemDomain>();
		}
		view.addObject("systemList", systemList);
		
		formatJson(view, systemList,session,"detailMap",ConfigUtil.CONFIG_TYPE_ID2);
		return view;
	}
	@ResponseBody 
	@RequestMapping(value = "/mdetail2")
	public String mdetail2(@RequestParam String key,HttpSession session)
	{
		Map<String,List<String>> configMap=(Map<String,List<String>>)session.getAttribute("configMap");
		Map<String,String> nameMap=(Map<String,String>)session.getAttribute("nameMap");
		List<String> configList=configMap.get(key);
		String returnHtml="<div style=\"float:left\"><div style=\"text-align:center\">"+nameMap.get(key)+"</div><table>";
		int i=0;
		for(String config:configList)
		{
			if(i==9)
			{
				returnHtml+="</table></div><div style=\"float:left;padding-left:20px;\"><div style=\"text-align:center\">"+nameMap.get(key)+"</div><table>";
			}
			String[] strs=config.split("\\$\\$");
			if(strs != null && strs.length>3){
				String honglvdeng="<div style=\"cursor:hand;width:100%;border-radius: 50%;width: 20px;height: 20px;background-color:"+strs[1]+";\"  onclick=\"openwindow('"+strs[2]+"')\"></div>";
				String honglvdeng2="<div style=\"cursor:hand;width:100%;border-radius: 30%;width: 20px;height: 20px;background-color:"+strs[3]+";\"  onclick=\"openwindow('"+strs[2]+"')\"></div>";
//				if(strs.length>4 && !org.springframework.util.StringUtils.isEmpty(strs[4]))
//				{
//					honglvdeng2="<h5 style=\"cursor:hand;border-left: 20px solid transparent;  border-right: 20px solid transparent;  border-"+strs[4]+": 30px solid "+strs[3]+";\"  onclick=\"openwindow('"+strs[2]+"')\"></h5>";
//				}
				returnHtml+="<tr><td  align=\"center\" style=\"height: 35px;\">"+strs[0]+"</td><td align=\"center\" style=\"height: 35px;\">"+honglvdeng+"</td><td align=\"center\" style=\"height: 35px;\">"+honglvdeng2+"</td></tr>";
			}
			i++;
		}
		returnHtml+="</table></div>";
		
		return returnHtml;
	}
	private void formatJson(ModelAndView view,List<SystemDomain> systemList,HttpSession session,String sessionName,int typeId)
	{
		Map<SystemDomain, List<ChannelDomain>> result = new HashMap<SystemDomain, List<ChannelDomain>>();
		Map<Integer, List<String>> channelNameMap = new HashMap<Integer,List<String>>();
		Map<Integer,List<String>> returnHtmlMap=new HashMap<Integer,List<String>>();
		Map<String,String> detailMap=new HashMap<String, String>();
		Map<String,List<String>> configMap=new HashMap<String, List<String>>();
		Map<String,String> nameMap=new HashMap<String, String>();
		Map<String,ReportData> rdMap=new HashMap<String, ReportData>();
		
		for(SystemDomain sd:systemList)
		{
			List<ChannelDomain> channelList = this.channelService.queryChannelListBySystemId(sd.getId(),typeId);
			view.addObject("channelList", channelList);
			if(channelList == null){
				channelList = new ArrayList<ChannelDomain>();
			}
			List<String> channelResultList=new ArrayList<String>();
			List<String> nameList=new ArrayList<String>();
			for(ChannelDomain cd:channelList)
			{
				List<String> configList=new ArrayList<String>();
				String returnHtml="green";
				String returnSuccessHtml="green";
				String availableRateHtml="green";
				UmpResultView umpView=invoke(1,sd.getId()+"",cd.getId()+"","","",typeId);
				
				if(umpView != null)
				{
					List<UmpConfigGroup> umpCGList=umpView.getConfig().getUmpConfigGroups();
					if(umpCGList == null || umpCGList.size() == 0)
						continue ;
					for(UmpConfigGroup umpCG:umpCGList)
					{
						for(UmpConfig config:umpCG.getUmpConfigs())
						{
							StringBuilder html=new StringBuilder();
							html.append("<table align=\"center\" style=\"width:100%\"><tr align=\"center\" ><td>key</td><td>总次数</td><td>成功次数</td><td>历史对比</td><td>可用率</td><td>TP99</td><td>参考</td></tr>");
							String configHtml="green";
							String configCountHtml="green";
							
							UmpResult umpResult=umpView.getUmpResultMap().get(config.getMainKey());
							if(umpResult == null)
								continue ;
							List<ReportData> rdList=umpResult.getPerReportData();
							if(rdList != null && rdList.size()>0)
							{
								ReportData rd=rdList.get(0);
								if(rd == null)
									continue ;
								rdMap.put(config.getMainKey(), rd);
								long lastSuccessCount=getLastDateNum(rd,config.getMainKey());
								String countColor=ConfigUtil.getColorByCount(rd.getSuccessCount(), lastSuccessCount);
								
								if(countColor.startsWith("red"))
								{
									returnSuccessHtml=countColor;
								}else if(countColor.startsWith("orange"))
								{
									if(!returnSuccessHtml.startsWith("red"))
										returnSuccessHtml=countColor;
								}
								
								if((rd.getTp99()>1000 && rd.getSuccessCount()>500)||rd.getAvailableRate()<80)
								{
									String color="red";
									if(rd.getTp99()>1000)
									{
										returnHtml=color;
										configHtml=color;
									}
									if(rd.getAvailableRate()<80)
									{
										availableRateHtml=color;
										configCountHtml=color;
									}
									
									html.append("<tr style=\"background-color: "+color+";\">");
								
								}else if((rd.getTp99()<=config.getMinReferenceTP() || rd.getTp99()>config.getMaxReferenceTP())||rd.getAvailableRate()<90){
									String color="orange";
									
									if(rd.getTp99()<=config.getMinReferenceTP() || rd.getTp99()>config.getMaxReferenceTP())
									{
										if(!"red".equals(returnHtml)){
											returnHtml=color;
										}
										configHtml=color;
										
									}
									if(rd.getAvailableRate()<90)
									{
										if(!"red".equals(availableRateHtml))
											availableRateHtml=color;
										configCountHtml=color;
									}
									html.append("<tr style=\"background-color: "+color+";\">");
									
								}else {
									html.append("<tr>");
								}
								html.append("<td><a href='gotoUMP?umpKey=" + config.getMainKey() + "' target='_blank'>"+config.getMainKeyDes()+"<br/>"+config.getMainKey()+"</a></td>"
										+ "<td>"+rd.getTotalInvokeCount()+"</td><td>"+rd.getSuccessCount()+"</td><td>"+lastSuccessCount+"</td>"
										+ "<td>"+rd.getAvailableRate()+"</td><td>"+rd.getTp99()+"</td><td>"+config.getMaxReferenceTP()+"</td></tr>");
							}
							configList.add(config.getMainKeyDes()+"$$"+configHtml+"$$"+config.getMainKey()+"$$"+configCountHtml);
							detailMap.put(config.getMainKey(), html.toString());
						}
					}
				}
				channelResultList.add(cd.getId()+"$$"+returnHtml);
				channelResultList.add(cd.getId()+"$$"+availableRateHtml);
				nameList.add(cd.getChannelName()+"<br />TP99");
				nameList.add(cd.getChannelName()+"<br />可用率");
				configMap.put(cd.getId()+"", configList);
				nameMap.put(cd.getId()+"",sd.getSystemName()+"("+cd.getChannelName()+")");
			}
			result.put(sd, channelList);
			channelNameMap.put(sd.getId(), nameList);
			returnHtmlMap.put(sd.getId(), channelResultList);
		}
		view.addObject("nameList", channelNameMap);
		view.addObject("resultMap", returnHtmlMap);
		session.setAttribute(sessionName, detailMap);
		session.setAttribute("configMap", configMap);
		session.setAttribute("nameMap", nameMap);
		session.setAttribute("rdMap",rdMap);
	}
	
	private long getLastDateNum(ReportData rd,String mainKey)
	{
		String key=ConfigUtil.REDISKEY+UmpOpenApiDateParamUtil.getForMatTimeByDate(
				UmpOpenApiDateParamUtil.strTimeToDateByParam(rd.getStartDate(),UmpOpenApiDateParamUtil.param2),1,0, "ddHHmm");// "yyyyMMddHHmmss", "ddHHmm");
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
			umpView = this.getInvokeUmpServiceIns2().oneMinuteReport2(systemName, channel,typeId);
			break;
		case 2://10分钟
			umpView = this.getInvokeUmpServiceIns().tenMinuteReport(systemName, channel);
			break;
		case 3://30分钟
			umpView = this.getInvokeUmpServiceIns().thirtyMinuteReport(systemName, channel);
			break;
		case 4://1小时
			umpView = this.getInvokeUmpServiceIns().oneHourReport(systemName, channel);
			break;
		case 5://1天
			umpView = this.getInvokeUmpServiceIns().oneDayReport(systemName, channel);
			break;
		case 6://具体时间段
			umpView = this.getInvokeUmpServiceIns2().timeReport2(systemName, channel, startTime, endTime,typeId);
			break;
		default:
			break;
		}
		return umpView;
	}
	
	@RequestMapping(value = "/gotoUMP")
	public void gotoUMP(@RequestParam String umpKey, HttpServletResponse response) {
		String url = "/gotoUMPError.html";
		try {
			if(StringUtils.isNotBlank(umpKey)){
				url = this.invokeUmpService.getGotoUmpURL(umpKey);
			}
			response.sendRedirect(url);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public void setInvokeUmpService(InvokeUmpService invokeUmpService) {
		this.invokeUmpService = invokeUmpService;
	}

	public InvokeUmpService getInvokeUmpService() {
		return invokeUmpService;
	}
	
}
