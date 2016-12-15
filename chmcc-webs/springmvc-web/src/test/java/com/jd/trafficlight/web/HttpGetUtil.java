package com.jd.trafficlight.web;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.params.CoreConnectionPNames;

public class HttpGetUtil {
	private final static Log logger = LogFactory.getLog(HttpGetUtil.class);

	private PoolingClientConnectionManager cm;
	private String url;
	private String refer;
	private String cookie;

	public void init() {
		SchemeRegistry schemeRegistry = new SchemeRegistry();
		schemeRegistry.register(new Scheme("http", 80, PlainSocketFactory.getSocketFactory()));
		cm = new PoolingClientConnectionManager(schemeRegistry);
		cm.setMaxTotal(500);
		cm.setDefaultMaxPerRoute(300);
	}

	public void destroy() {
		cm.shutdown();
	}

	public String getValueFromRemote() {
		HttpClient httpClient = new DefaultHttpClient(cm);
		httpClient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 10000);
		httpClient.getParams().setParameter(CoreConnectionPNames.SO_KEEPALIVE,true);
		httpClient.getParams().setParameter(CoreConnectionPNames.SOCKET_BUFFER_SIZE, 2 * 1024);
		httpClient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT,5000);
		httpClient.getParams().setParameter(CoreConnectionPNames.SO_LINGER, -1);
		HttpGet httpGet = new HttpGet(url);

		if (StringUtils.isNotBlank(refer)) {
			httpGet.setHeader("Refer", refer);
		}
		if (StringUtils.isNotBlank(cookie)) {
			httpGet.setHeader("Cookie", cookie);
		}
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		String responseBody = null;
		try {
			responseBody = httpClient.execute(httpGet, responseHandler);
		} catch (IOException e) {
			logger.error("调用httpclient获取info时出错!param=" + url	+ " ;", e);
			httpGet.abort();
			return null;
		}
		// 删除返回结果前后的小括号
		return responseBody;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setRefer(String refer) {
		this.refer = refer;
	}

	public void setCookie(String cookie) {
		this.cookie = cookie;
	}
}
