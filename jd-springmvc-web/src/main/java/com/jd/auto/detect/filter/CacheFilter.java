package com.jd.auto.detect.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import com.jd.data.redis.RedisUtils;
public class CacheFilter implements Filter, ApplicationContextAware {

	public static ApplicationContext ctx;
	private static final Logger logger = Logger.getLogger(CacheFilter.class);
	@Override
	public void destroy() {

	}

	private RedisUtils getRedisUtil() {
        
	    if(ctx==null){
	    	logger.error("ctx is null");
	    }
		RedisUtils redis = ctx.getBean("redisUtils", RedisUtils.class);
		return redis;

	}
	private String getHtmlFromRedis(String key){
		String rgyHtml=null;
		try {
			 rgyHtml = getRedisUtil().get(key);
		} catch (Exception e) {
			logger.error(e);
		}
		return rgyHtml;
	}
	private void  setHtmlFromRedis(String key,String value,int time){
		
		try {
			 getRedisUtil().set(key, value);
			 getRedisUtil().expire(key, time);
		} catch (Exception e) {
			logger.error(e);
		}
	
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpReq = (HttpServletRequest) req;
		HttpServletResponse httpRes = (HttpServletResponse) resp;
		String reqUrl = httpReq.getRequestURI();
		if (reqUrl.indexOf("rgy/index") < 0) {
			chain.doFilter(req, resp);
			return;
		}
		String key = "rgy-html";
		String rgyHtml="";
		try {
			 rgyHtml =getHtmlFromRedis(key);
			if (rgyHtml == null || rgyHtml.equals("")) {
				logger.error("init page-----");
				ResponseWrapper wrapper = new ResponseWrapper(httpRes);
				chain.doFilter(req, wrapper);
				rgyHtml = wrapper.getResult();
				setHtmlFromRedis(key,rgyHtml,30);
			}
			resp.setContentType("text/html; charset=utf-8");
			resp.getWriter().print(rgyHtml);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		CacheFilter.ctx = context;

	}

}
