package com.jd.trafficlight.web;

import javax.annotation.Resource;

import org.junit.Test;

import com.jd.order.purchase.config.client.xmlext.service.XmlConfigService;
import com.jd.statistics.domain.config.SuperUmpConfig;
import com.jd.statistics.domain.config.SystemAndChannelConfigs;
import com.jd.statistics.util.config.ConfigUtil;

public class ConfigTest  extends BaseTest{
	
	@Resource
    private XmlConfigService configService;

	@Test
	public void test(){
		//SystemAndChannelConfigs sacc = configService.getConfigByTypeId(ConfigUtil.CONFIG_TYPE_ID, SystemAndChannelConfigs.class);
		SuperUmpConfig suc = this.configService.getConfigByTypeId(10086101, SuperUmpConfig.class);
		System.out.println(suc);
		System.out.println();
	}
}
