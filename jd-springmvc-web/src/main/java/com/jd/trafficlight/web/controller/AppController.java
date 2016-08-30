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
@RequestMapping(value = "/viewKey")
public class AppController {
	private static final Log logger = LogFactory.getLog(AppController.class);

    private static final int MAX_WEEK_ID = 52;

    private UmpStatisticsService umpStatisticsService;

    private String viewName;

    private int weekSize;

    private List<UmpHighChart> paintUmpChartList;

    @RequestMapping(value = "/report")
    public ModelAndView report(@RequestParam(value ="year",required = false) Integer year,
                               @RequestParam(value ="week",required = false)Integer week){
        Calendar c = Calendar.getInstance();
        if(year==null)
            year = c.get(Calendar.YEAR);
        if(week==null)
            week = c.get(Calendar.WEEK_OF_YEAR);
        ModelAndView view = new ModelAndView();
        view.setViewName(viewName);
        view.addObject("yearNum",year);
        view.addObject("weekNum",week);
        //view.addObject("paintUmpChart",paintUmpChartList);
        Map<String, List<String>> systemUmpKeyMap=UmpConfig.createInstance().getSystemUmpKeyMap();
        List<UmpHighChart> list=new ArrayList<UmpHighChart>();
        for(String system : systemUmpKeyMap.keySet()){
        	UmpHighChart chart=new UmpHighChart();
        	chart.setTpDivId(system+"Tp");
        	chart.setTpTitle(system+"方法性能曲线图");
        	chart.setInvokeDivId(system+"Invoke");
        	chart.setInvokeTitle(system+"方法调用次数曲线图");
        	chart.setSystem(system);
        	list.add(chart);
        }
        view.addObject("paintUmpChart",list);
        return view;
    }

    @RequestMapping(value="/umpReport.json")
    @ResponseBody
    public Map<String,Object> umpJson(@RequestParam String system,@RequestParam Integer yearNum,@RequestParam Integer weekNum){
    	UmpStatisticDomain umpQuery = new UmpStatisticDomain();
    	Date statisticDate = new Date();
        umpQuery.setSystem(system);
        umpQuery.setYearNum(yearNum);
        umpQuery.setWeekNum(weekNum);
        umpQuery.setDateType(UmpStatisticDomain.DEFAULT_DATE_TYPE);
        Calendar c = Calendar.getInstance();
		c.setTime(statisticDate);
		c.add(Calendar.HOUR, -24*3);
		Date startDate = c.getTime();
		umpQuery.setStartDate(startDate);
		umpQuery.setEndDate(statisticDate);
		umpQuery.setTimeUnit(TimeUnit.HOURS);
        List<UmpStatisticDomain> dbResult = umpStatisticsService.queryUmpKey(umpQuery);
        //设置长度
        int length = 7*24;

        Map<String,List<UmpStatisticDomain>> umpKeyGroup = new HashMap<String, List<UmpStatisticDomain>>();
        List<Map<String,Object>> tp = new ArrayList<Map<String, Object>>(length);
        List<Map<String,Object>> invoke = new ArrayList<Map<String, Object>>(length);
        for(UmpStatisticDomain statistic:dbResult){
            String key = statistic.getUmpKey();
            List<UmpStatisticDomain> value = umpKeyGroup.get(key);
            if(value!=null){
                value.add(statistic);
            }
            else {
                value = new ArrayList<UmpStatisticDomain>();
                value.add(statistic);
                umpKeyGroup.put(key,value);
            }
        }
        for(Map.Entry<String,List<UmpStatisticDomain>> entry:umpKeyGroup.entrySet()){
            String name = entry.getKey();
            List<UmpStatisticDomain> data = entry.getValue();
            Map<String,Object> tpItem = new HashMap<String, Object>();
            Map<String,Object> invokeItem = new HashMap<String, Object>();
            //tpItem.put("name",name);
            tpItem.put("name",UmpConfig.createInstance().getUmpKeyNameMap().get(name));
            //invokeItem.put("name",name);
            invokeItem.put("name",UmpConfig.createInstance().getUmpKeyNameMap().get(name));
            List<Integer> tpData = new ArrayList<Integer>();
            List<Long> invokeData = new ArrayList<Long>();
            for(UmpStatisticDomain item:data){
                tpData.add(item.getTp99());
                invokeData.add(item.getInvokeTotal());
            }
            //Collections.reverse(tpData);
            //Collections.reverse(invokeData);
            tpItem.put("data",tpData);
            invokeItem.put("data",invokeData);

            tp.add(tpItem);
            invoke.add(invokeItem);
        }
        //设置X轴坐标
        Map<String,Object> result = new HashMap<String,Object>();
        result.put("length",length);
        result.put("categories",createCategories(3*24+1,statisticDate));
        result.put("tp",tp);
        result.put("invoke",invoke);
        return result;
    }

    private List<String> createCategories(Integer yearNum,Integer weekNum){
        List<String> result = new ArrayList<String>(7*24);
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, yearNum);
        calendar.set(Calendar.WEEK_OF_YEAR,weekNum);
        calendar.set(Calendar.DAY_OF_WEEK,1);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdfC = new SimpleDateFormat("MM-dd HH:00");
        Date start = null;
        try {
            start = sdf.parse(sdf.format(calendar.getTime()));
        } catch (ParseException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        for(int i=0;i<7*24;i++){
            result.add(sdfC.format(start));
            Calendar c =Calendar.getInstance();
            c.setTime(start);
            c.add(Calendar.HOUR,1);
            start = c.getTime();
        }
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

 


    private Double calcRate(Long current,Long before ){
        Double fBefore = Double.valueOf(before);
        Double fCurrent = Double.valueOf(current);
        return ((fCurrent-fBefore)/fBefore*100);
    }

    public void setUmpStatisticsService(UmpStatisticsService umpStatisticsService) {
		this.umpStatisticsService = umpStatisticsService;
	}

	public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public void setWeekSize(int weekSize) {
        this.weekSize = weekSize;
    }

    public void setPaintUmpChartList(List<UmpHighChart> paintUmpChartList) {
        this.paintUmpChartList = paintUmpChartList;
    }

    public static void main(String[] args) throws ParseException {
        int year = 2014;
        int week = 1;
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.WEEK_OF_YEAR,week);
        calendar.set(Calendar.DAY_OF_WEEK,1);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdfC = new SimpleDateFormat("MM-dd HH:00");
        Date start = sdf.parse(sdf.format(calendar.getTime()));
        for(int i=0;i<7*24;i++){
            System.out.println(sdfC.format(start));
            Calendar c =Calendar.getInstance();
            c.setTime(start);
            c.add(Calendar.HOUR,1);
            start = c.getTime();
        }
        Calendar c1 = Calendar.getInstance();
        System.out.println(c1.get(Calendar.WEEK_OF_YEAR));
//        System.out.println(calendar.getTime().toLocaleString());

    }
}
