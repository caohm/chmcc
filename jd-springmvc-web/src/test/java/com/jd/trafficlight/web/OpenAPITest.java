package com.jd.trafficlight.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSON;
import com.jd.statistics.domain.ump.openapi.UmpOpenApiResult;
import com.jd.ump.profiler.CallerInfo;
import com.jd.ump.profiler.proxy.Profiler;

public class OpenAPITest{
	
	private static final Logger logger = LoggerFactory.getLogger(OpenAPITest.class);
	
	private static final String UMP_OPEN_API_REST_URL = "http://open.ump.jd.com/queryMonitorData";
	private static final String UMP_OPEN_API_TOKEN = "b4f35c3fd2213d8b9e2ec282ccee9a94";
	private RestTemplate restTemplate = new RestTemplate();

	private UmpOpenApiResult queryMonitorData(String params) {
		System.out.println(params);
		UmpOpenApiResult uoaResult = null;
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("token", UMP_OPEN_API_TOKEN);
		HttpEntity<String> entity = new HttpEntity<String>(params, headers);
		ResponseEntity<String> result = null;
		
		CallerInfo callerInfo = Profiler.registerInfo("jk.rpc.invokeUMPOpenAPI", true, true);
		try {
			result = restTemplate.postForEntity(UMP_OPEN_API_REST_URL, entity, String.class);
		} catch (Exception e) {
			logger.error("调用UMPOpenAPI接口异常：" + e.getMessage());
			Profiler.functionError(callerInfo);
		}finally{
			Profiler.registerInfoEnd(callerInfo);
		}
		
		if(result != null && result.getStatusCode() != null && result.getStatusCode().value() == 200){
			uoaResult = JSON.parseObject(result.getBody(), UmpOpenApiResult.class);
		}else{
			logger.error("调用UMPOpenAPI接口返回非200状态, 结果=" + (result == null ? "null" : result));
			throw new RuntimeException("调用UMP系统OpenAPI失败！");
		}
		return uoaResult;
	}
	
	public static void main(String[] args) {
		OpenAPITest test = new OpenAPITest();
		String params = "{\"dagaCycle\":\"hour\",\"dataType\":\"TP99,TotalCount,SuccessCount,FailCount,AvailRate\",\"endTime\":\"20150616110500\",\"monitorType\":\"Method\",\"scope\":\"Key\",\"scopeValues\":\"soporder_sdk_count.r.JdBeanRPCImpl.B28.getJingDou\",\"startTime\":\"20150616095900\"}"; 
		UmpOpenApiResult uoaResult = test.queryMonitorData(params);
		if(uoaResult != null && uoaResult.getResult() != null && uoaResult.getResult().size() > 0){
			System.out.println(uoaResult);
		}else{
			logger.error("调用UMPOpenAPI返回空：" + uoaResult);
		}
	}
}
