package com.jd.trafficlight.web;

import javax.annotation.Resource;

import org.junit.Test;

import com.jd.statistics.service.SystemService;

public class SystemServiceTest extends BaseTest{

	@Resource
	private SystemService systemService;
	
	@Test
	public void test(){
		System.out.println(systemService.queryAll());
	}
}
