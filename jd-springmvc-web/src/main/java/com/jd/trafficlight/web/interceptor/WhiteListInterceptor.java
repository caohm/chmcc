package com.jd.trafficlight.web.interceptor;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.jd.common.web.LoginContext;
import com.jd.statistics.util.DevUtil;

/**
 * 白名单拦截器
 * 
 * @author liandahu
 * @date 2015-5-6 上午11:37:41
 * @email liandahu(a)jd.com
 *
 */
public class WhiteListInterceptor implements HandlerInterceptor {
	
	private static final Logger logger = LoggerFactory.getLogger(WhiteListInterceptor.class);

	@Override
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2) throws Exception {
		
		LoginContext loginContext = LoginContext.getLoginContext();
		
		String pin = loginContext.getPin();
		if(StringUtils.isNotBlank(pin)){
			if(!DevUtil.checkUserPrivilege(pin)){
				this.redirectErrorPage(response);
				return false;
			}
		}
		
		request.setAttribute("pin", pin);
		request.setAttribute("_user_name", StringUtils.isBlank(loginContext.getNick()) ? pin : loginContext.getNick());
		
		return true;
	}

	private void redirectErrorPage(HttpServletResponse response){
		try {
			response.sendRedirect("/privilegeError.html");
		} catch (IOException e) {
			logger.error("redirect error : " + e.getMessage() , e);
		}
	}
}
