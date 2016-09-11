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

import com.jd.trafficlight.web.view.ConversionRateChart;
import com.jd.trafficlight.web.view.UmpHighChart;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.jd.statistics.domain.UmpStatisticDomain;
import com.jd.statistics.service.UmpStatisticsService;
import com.jd.statistics.service.config.ConvertVO;
import com.jd.statistics.service.config.UmpBusinessKeyConfig;
import com.jd.statistics.service.config.UmpConfig;

@Controller
@RequestMapping(value = "/viewMinuteKey")
public class ViewMinuteController {
	private UmpStatisticsService umpStatisticsService;

    private String viewName;

    private List<UmpHighChart> paintUmpChartList;
    
    private List<ConversionRateChart> painConvertCharList;
    
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
        //view.addObject("painConvertCharList",painConvertCharList);
        
        List<UmpHighChart> chartList=new ArrayList<UmpHighChart>();
        List<UmpBusinessKeyConfig> list=UmpConfig.createInstance().getKeys();
        for(UmpBusinessKeyConfig config : list){
        	UmpHighChart chart=new UmpHighChart();
        	chart.setTpDivId(config.getSystemName()+"Tp");
        	chart.setTpTitle(config.getSystemName()+"方法性能曲线图");
        	chart.setInvokeDivId(config.getSystemName()+"Invoke");
        	chart.setInvokeTitle(config.getSystemName()+"方法调用次数曲线图");
        	chart.setSystem(config.getSystemName());
        	chart.setConvertTitle(config.getSystemName()+"转化率曲线图");
        	chart.setConvertDivId(config.getSystemName()+"convert");
        	chart.setYesterdayConvertTitle(config.getSystemName()+"昨天转化率曲线图");
        	chart.setYesterdayConvertDivId(config.getSystemName()+"YesterdayConvert");
        	chartList.add(chart);
        }
        view.addObject("paintUmpChart",chartList);
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
        umpQuery.setDateType(UmpStatisticDomain.DATE_TYPE_M);
        Calendar c = Calendar.getInstance();
		c.setTime(statisticDate);
		c.add(Calendar.MINUTE, -60);
		Date startDate = c.getTime();
		umpQuery.setStartDate(startDate);
		umpQuery.setEndDate(statisticDate);
		umpQuery.setTimeUnit(TimeUnit.MINUTES);
        List<UmpStatisticDomain> dbResult = umpStatisticsService.queryUmpKey(umpQuery);
        //设置长度
        int length = 60;

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
        result.put("categories",createCategories(length+1, statisticDate));
        result.put("tp",tp);
        result.put("invoke",invoke);
        
        List<Map<String,Object>> convertList = new ArrayList<Map<String, Object>>(length);
        for(ConvertVO chart : UmpConfig.createInstance().getSystemConvertListMap().get(system)){
        //for(ConversionRateChart chart : painConvertCharList){
        	Map<String,Object> convertItem = new HashMap<String, Object>();
        	String firstKey=chart.getFirstUmpKey();
        	String secondKey=chart.getSecondUmpKey();
        	List<Long> firstInvoke=null;
        	List<Long> secondInvoke=null;
        	List<Double> convertResultList=new ArrayList<Double>();
        	for(Map<String,Object> map : invoke){
        		if(firstKey.equals(UmpConfig.createInstance().getNameUmpKeyMap().get(map.get("name")))){
        			firstInvoke=(List<Long>)map.get("data");        			
        		}
        		if(secondKey.equals(UmpConfig.createInstance().getNameUmpKeyMap().get(map.get("name")))){
        			secondInvoke=(List<Long>)map.get("data");        			
        		}        		
        	}
        	if(firstInvoke!=null && secondInvoke!=null){
        		for(int i=0;i <firstInvoke.size();i++){
        			Long secondValue= i>=secondInvoke.size() ? 0 : (secondInvoke.get(i)==null ? 0 : secondInvoke.get(i));
        			if(firstInvoke.get(i)==null || firstInvoke.get(i)==0 ||
        					secondValue==null || secondValue==0){
        				//convertResultList.add(i, 0.0);
        				convertResultList.add(i, null);
        			}else{
        				convertResultList.add(i, calcRate(firstInvoke.get(i),secondValue));
        			}        			
        		}
        	}
        	convertItem.put("name", chart.getName());
        	convertItem.put("data", convertResultList);
        	convertList.add(convertItem);
        }
        result.put("convert",convertList);
        
        
        
		c.setTime(statisticDate);
		c.add(Calendar.DAY_OF_MONTH, -1);
		Date endDate=c.getTime();
		c.add(Calendar.MINUTE, -60);
		startDate = c.getTime();
		umpQuery.setStartDate(startDate);
		umpQuery.setEndDate(endDate);
        List<UmpStatisticDomain> yesterdayResult = umpStatisticsService.queryUmpKey(umpQuery);
        Map<String,List<UmpStatisticDomain>> yesterdayUmpKeyGroup = new HashMap<String, List<UmpStatisticDomain>>();
        List<Map<String,Object>> yesterdayInvoke = new ArrayList<Map<String, Object>>(length);
        for(UmpStatisticDomain statistic:yesterdayResult){
            String key = statistic.getUmpKey();
            List<UmpStatisticDomain> value = yesterdayUmpKeyGroup.get(key);
            if(value!=null){
                value.add(statistic);
            }
            else {
                value = new ArrayList<UmpStatisticDomain>();
                value.add(statistic);
                yesterdayUmpKeyGroup.put(key,value);
            }
        }
        for(Map.Entry<String,List<UmpStatisticDomain>> entry:yesterdayUmpKeyGroup.entrySet()){
            String name = entry.getKey();
            List<UmpStatisticDomain> data = entry.getValue();
            Map<String,Object> invokeItem = new HashMap<String, Object>();
            //invokeItem.put("name",name);
            invokeItem.put("name",UmpConfig.createInstance().getUmpKeyNameMap().get(name));
            List<Long> invokeData = new ArrayList<Long>();
            for(UmpStatisticDomain item:data){
                invokeData.add(item.getInvokeTotal());
            }
            invokeItem.put("data",invokeData);
            yesterdayInvoke.add(invokeItem);
        }
        List<Map<String,Object>> yesterdayConvertList = new ArrayList<Map<String, Object>>(length);
        for(ConvertVO chart : UmpConfig.createInstance().getSystemConvertListMap().get(system)){
        //for(ConversionRateChart chart : painConvertCharList){
        	Map<String,Object> convertItem = new HashMap<String, Object>();
        	String firstKey=chart.getFirstUmpKey();
        	String secondKey=chart.getSecondUmpKey();
        	List<Long> firstInvoke=null;
        	List<Long> secondInvoke=null;
        	List<Double> convertResultList=new ArrayList<Double>();
        	for(Map<String,Object> map : yesterdayInvoke){
        		if(firstKey.equals(UmpConfig.createInstance().getNameUmpKeyMap().get(map.get("name")))){
        			firstInvoke=(List<Long>)map.get("data");        			
        		}
        		if(secondKey.equals(UmpConfig.createInstance().getNameUmpKeyMap().get(map.get("name")))){
        			secondInvoke=(List<Long>)map.get("data");        			
        		}        		
        	}
        	if(firstInvoke!=null && secondInvoke!=null){
        		for(int i=0;i <firstInvoke.size();i++){
        			Long secondValue= i>=secondInvoke.size() ? 0 : (secondInvoke.get(i)==null ? 0 : secondInvoke.get(i));
        			if(firstInvoke.get(i)==null || firstInvoke.get(i)==0 ||
        					secondValue==null || secondValue==0){
        				//convertResultList.add(i, 0.0);
        				convertResultList.add(i, null);
        			}else{
        				convertResultList.add(i, calcRate(firstInvoke.get(i),secondValue));
        			}        			
        		}
        	}
        	convertItem.put("name", chart.getName());
        	convertItem.put("data", convertResultList);
        	yesterdayConvertList.add(convertItem);
        }
        result.put("yesterdayConvert",yesterdayConvertList);
        result.put("yesterdayCategories",createCategories(length+1, endDate));
        return result;
    }

    private Double calcRate(Long frist,Long second ){
        Double fFirst = Double.valueOf(frist);
        Double fSecond = Double.valueOf(second);
        return fSecond/fFirst;
    }
    
    private List<String> createCategories(int length, Date statisticDate) {
		List<String> result = new ArrayList<String>(length);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(statisticDate);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:00");
		SimpleDateFormat sdfC = new SimpleDateFormat("MM-dd HH:mm");
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
			c.add(Calendar.MINUTE, -1);
			start = c.getTime();
		}
		Collections.reverse(result);
		return result;
	}

    public void setUmpStatisticsService(UmpStatisticsService umpStatisticsService) {
		this.umpStatisticsService = umpStatisticsService;
	}

	public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public void setPaintUmpChartList(List<UmpHighChart> paintUmpChartList) {
        this.paintUmpChartList = paintUmpChartList;
    }

	public void setPainConvertCharList(List<ConversionRateChart> painConvertCharList) {
		this.painConvertCharList = painConvertCharList;
	}


    
}
