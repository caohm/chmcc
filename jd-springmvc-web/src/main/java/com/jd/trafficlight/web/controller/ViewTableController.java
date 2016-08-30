package com.jd.trafficlight.web.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.auto.detect.web.RgyController;
import com.jd.order.purchase.config.client.xmlext.service.XmlConfigService;
import com.jd.statistics.domain.UmpMachineResultView;
import com.jd.statistics.domain.UmpResultView;
import com.jd.statistics.domain.config.SystemAndChannelConfigs;
import com.jd.statistics.domain.db.SystemDomain;
import com.jd.statistics.service.InvokeUmpService;
import com.jd.statistics.service.InvokeUmpWithMachineService;
import com.jd.statistics.service.SystemService;
import com.jd.statistics.util.config.ConfigUtil;
import com.jd.statistics.util.constants.UmpInvokeType;

/**
 * 
 * @author liandahu
 * @date 2015-4-18 上午11:38:09
 * @email liandahu(a)jd.com
 * 
 */
@Controller
@RequestMapping(value = "/table")
public class ViewTableController {

	@Resource
	private InvokeUmpService invokeUmpService;
	@Resource
	private InvokeUmpWithMachineService invokeUmpWithMachineService;
	@Resource
	private InvokeUmpService invokeUmpServiceOpenApiImpl;
	@Resource
	private SystemService systemService;
	@Resource
    private XmlConfigService configService;
	
	private static final Logger logger = Logger.getLogger(ViewTableController.class);
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


	@RequestMapping(value = "/report")
	public ModelAndView report() {
		ModelAndView view = new ModelAndView();
		
		List<SystemDomain> systemList = this.systemService.queryAll();
		if(systemList == null){
			systemList = new ArrayList<SystemDomain>();
		}
		view.addObject("systemList", systemList);
		
		return view;
	}
	
	@RequestMapping(value = "/invokeWithMachine")
	public ModelAndView invokeWithMachine(@RequestParam Integer invokeType, @RequestParam String umpKey, @RequestParam String referenceTP, String startTime, String endTime) {
		ModelAndView view = new ModelAndView();
		UmpMachineResultView umpView = null;
		switch (invokeType) {
		case 1://1分钟 
			umpView = this.invokeUmpWithMachineService.invokeUmpWithMachine(UmpInvokeType.ONE_MINUTE, umpKey, referenceTP, "", "");
			break;
		case 2://10分钟
			umpView = this.invokeUmpWithMachineService.invokeUmpWithMachine(UmpInvokeType.TEN_MINUTE, umpKey, referenceTP, "", "");
			break;
		case 3://30分钟
			umpView = this.invokeUmpWithMachineService.invokeUmpWithMachine(UmpInvokeType.THIRTY_MINUTE, umpKey, referenceTP, "", "");
			break;
		case 4://1小时
			umpView = this.invokeUmpWithMachineService.invokeUmpWithMachine(UmpInvokeType.ONE_HOUR, umpKey, referenceTP, "", "");
			break;
		case 5://1天
			umpView = this.invokeUmpWithMachineService.invokeUmpWithMachine(UmpInvokeType.ONE_DAY, umpKey, referenceTP, "", "");
			break;
		case 6://具体时间段
			umpView = this.invokeUmpWithMachineService.invokeUmpWithMachine(UmpInvokeType.TIMES, umpKey, referenceTP, startTime, endTime);
			break;
		default:
			break;
		}
		if(umpView != null){
			view.addObject("perReportData", umpView.getPreReportData());
		}
		return view;
	}

	@RequestMapping(value = "/invoke")
	@ResponseBody
	public Map<String, Object> invoke(@RequestParam Integer invokeType, @RequestParam String systemName, @RequestParam String channel, String startTime, String endTime) {
		Map<String, Object> result = new HashMap<String, Object>();
		UmpResultView umpView = null;
		switch (invokeType) {
		case 1://1分钟 
			umpView = this.getInvokeUmpServiceIns().oneMinuteReport(systemName, channel);
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
			umpView = this.getInvokeUmpServiceIns().timeReport(systemName, channel, startTime, endTime);
			break;
		default:
			break;
		}
		result.put("umpConfigGroups", umpView.getConfig().getUmpConfigGroups());
		result.put("umpResultMap", umpView.getUmpResultMap());
		return result;
	}
	
	@RequestMapping(value = "/gotoUMP")
	public void gotoUMP(@RequestParam String umpKey, HttpServletResponse response) {
		String url = "/gotoUMPError.html";
		try {
			if(StringUtils.isNotBlank(umpKey)){
				url = this.invokeUmpServiceOpenApiImpl.getGotoUmpURL(umpKey);				
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
