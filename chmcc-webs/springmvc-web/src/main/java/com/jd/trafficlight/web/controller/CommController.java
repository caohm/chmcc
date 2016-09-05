package com.jd.trafficlight.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jd.statistics.domain.db.ChannelDomain;
import com.jd.statistics.service.ChannelService;

@Controller
@RequestMapping(value = "/comm")
public class CommController {
	
	@Resource
	private ChannelService channelService;

	@RequestMapping(value = "/queryChannelBySystemId")
	@ResponseBody
	public Map<String, Object> queryChannelBySystemId(@RequestParam Integer systemId){
		Map<String, Object> result = new HashMap<String, Object>();
		List<ChannelDomain> channelList = this.channelService.queryChannelBySystemId(systemId);
		if(channelList == null){
			channelList = new ArrayList<ChannelDomain>();
		}
		result.put("channelList", channelList);
		return result;
	}
}
