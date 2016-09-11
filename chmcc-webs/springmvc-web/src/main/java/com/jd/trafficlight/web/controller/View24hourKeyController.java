package com.jd.trafficlight.web.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.jd.trafficlight.web.view.UmpHighChart;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.jd.statistics.domain.UmpStatisticDomain;
import com.jd.statistics.service.UmpStatisticsService;
import com.jd.statistics.service.config.UmpConfig;

@Controller
@RequestMapping(value = "/view24HoursKey")
public class View24hourKeyController {

	private String viewName;

	private UmpStatisticsService umpStatisticsService;

	private List<UmpHighChart> paintUmpChartList;

	private static final Log logger = LogFactory.getLog(View24hourKeyController.class);

	@RequestMapping(value = "/report")
	public ModelAndView report(
			@RequestParam(value = "year", required = false) Integer year,
			@RequestParam(value = "week", required = false) Integer week) {
		Calendar c = Calendar.getInstance();
		if (year == null)
			year = c.get(Calendar.YEAR);
		if (week == null)
			week = c.get(Calendar.WEEK_OF_YEAR);
		ModelAndView view = new ModelAndView();
		view.setViewName("reportLast24H");
		view.addObject("yearNum", year);
		view.addObject("weekNum", week);
		view.addObject("paintUmpChart", paintUmpChartList);

		return view;
	}

	@RequestMapping(value = "/umpReport.json")
	@ResponseBody
	public Map<String, Object> umpJson(@RequestParam String umpKey,
			@RequestParam(required = false) Integer limit) {

		int length = 24;
		Date statisticDate = new Date();
		UmpStatisticDomain umpQuery = new UmpStatisticDomain();
		if (StringUtils.isNotBlank(umpKey)) {
			umpQuery.setUmpKey(umpKey);
		}
		if (limit != null && limit > 0) {
			length = limit;
		}
		umpQuery.setQueryLimit(length);
		umpQuery.setStatisticDate(statisticDate);
		umpQuery.setDateType(UmpStatisticDomain.DEFAULT_DATE_TYPE);
		umpQuery.setUmpKey(umpKey);
		Calendar c = Calendar.getInstance();
		c.setTime(statisticDate);
		c.add(Calendar.HOUR, -24);
		Date startDate = c.getTime();
		umpQuery.setStartDate(startDate);
		umpQuery.setEndDate(statisticDate);
		umpQuery.setTimeUnit(TimeUnit.HOURS);
		List<UmpStatisticDomain> dbResult = umpStatisticsService.queryUmpKey(umpQuery);

		// 设置长度

		Map<String, List<UmpStatisticDomain>> umpKeyGroup = new HashMap<String, List<UmpStatisticDomain>>();
		List<Map<String, Object>> tp = new ArrayList<Map<String, Object>>(
				length);
		List<Map<String, Object>> invoke = new ArrayList<Map<String, Object>>(
				length);
		for (UmpStatisticDomain statistic : dbResult) {
			String key = statistic.getUmpKey();
			List<UmpStatisticDomain> value = umpKeyGroup.get(key);
			if (value != null) {
				value.add(statistic);
			} else {
				value = new ArrayList<UmpStatisticDomain>();
				value.add(statistic);
				umpKeyGroup.put(key, value);
			}
		}
		for (Map.Entry<String, List<UmpStatisticDomain>> entry : umpKeyGroup
				.entrySet()) {
			String name = entry.getKey();
			List<UmpStatisticDomain> data = entry.getValue();
			Map<String, Object> tpItem = new HashMap<String, Object>();
			Map<String, Object> invokeItem = new HashMap<String, Object>();
			//tpItem.put("name",name);
            tpItem.put("name",UmpConfig.createInstance().getUmpKeyNameMap().get(name));
            //invokeItem.put("name",name);
            invokeItem.put("name",UmpConfig.createInstance().getUmpKeyNameMap().get(name));
			List<Integer> tpData = new ArrayList<Integer>();
			List<Long> invokeData = new ArrayList<Long>();
			for (UmpStatisticDomain item : data) {
				tpData.add(item.getTp99());
				invokeData.add(item.getInvokeTotal());
			}
			//Collections.reverse(tpData);
			//Collections.reverse(invokeData);
			tpItem.put("data", tpData);
			invokeItem.put("data", invokeData);

			tp.add(tpItem);
			invoke.add(invokeItem);
		}
		// 设置X轴坐标
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("length", length);
		result.put("categories", createCategories(length+1, statisticDate));
		result.put("tp", tp);
		result.put("invoke", invoke);
		return result;
	}

	private List<String> createCategories(int length, Date statisticDate) {
		List<String> result = new ArrayList<String>(length);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(statisticDate);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:00:00");
		SimpleDateFormat sdfC = new SimpleDateFormat("MM-dd HH:00");
		Date start = null;
		try {
			start = sdf.parse(sdf.format(calendar.getTime()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		for (int i = 0; i < length; i++) {
			result.add(sdfC.format(start));
			Calendar c = Calendar.getInstance();
			c.setTime(start);
			c.add(Calendar.HOUR, -1);
			start = c.getTime();
		}
		Collections.reverse(result);
		return result;
	}



	public void setPaintUmpChartList(List<UmpHighChart> paintUmpChartList) {
		this.paintUmpChartList = paintUmpChartList;
	}

	public void setViewName(String viewName) {
		this.viewName = viewName;
	}

	public void setUmpStatisticsService(UmpStatisticsService umpStatisticsService) {
		this.umpStatisticsService = umpStatisticsService;
	}
	
	

}
