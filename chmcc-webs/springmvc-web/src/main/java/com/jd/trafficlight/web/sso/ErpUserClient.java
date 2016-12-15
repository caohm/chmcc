package com.jd.trafficlight.web.sso;

import com.jd.common.hrm.ws.DeptWebServiceSoap;
import com.jd.common.web.LoginContext;

import org.apache.log4j.Logger;

import java.util.Arrays;
import java.util.List;

/**
 * 构造当前登录用户信息
 */
public class ErpUserClient {
	
	private static Logger logger = Logger.getLogger(ErpUserClient.class);
	
	private DeptWebServiceSoap deptWebServiceSoap;
	
	/**
	 * 获取当前登录用户完整信息
	 * @return
	 */
	public ErpUser getCurrentUser() throws Exception{
		
		ErpUser erpUser = ErpUserContext.getErpUser();

		if(null != erpUser){
			return erpUser;	
		}
		
		erpUser = getCurrentUserFromLoginContext();

		
		ErpUserContext.setErpUser(erpUser);
		return erpUser;
	}


	/**
	 * 获取当前登录用户信息（从登陆cookie中获取）
	 * @author suihonghua
	 * @return
	 */
	public ErpUser getCurrentUserFromLoginContext(){
    	
		LoginContext loginContext = LoginContext.getLoginContext();
		if (loginContext == null) {
			logger.warn("getCurrentUserFromLoginContext,loginContext is null! return null...");
			return null;
		}
		ErpUser erpUser = new ErpUser();
		erpUser.setUserId((int) loginContext.getUserId());
		erpUser.setUserCode(loginContext.getPin());
		erpUser.setUserName(loginContext.getNick());
		erpUser.setOrganizationId(loginContext.getOrgId());

		return erpUser;
	}
	/**
	 * 
	 * [获取当前用户信息]
	 * @return
	 * @throws Exception
	 */
	public ErpUser getAbstractUser() throws Exception{
		ErpUser erpUser = getCurrentUserFromLoginContext();

		return erpUser;
	}
	
	public List<String> getAuthCodes(){
		LoginContext loginContext = LoginContext.getLoginContext();
		if(null == loginContext){
			return null;
		}
		String str = deptWebServiceSoap.resourceNames(loginContext.getPin());
		if(null != str && str.length() > 0){
			List<String> list = Arrays.asList(str.split(","));
			return list;
		}
		return null;
	}


	public void setDeptWebServiceSoap(DeptWebServiceSoap deptWebServiceSoap) {
		this.deptWebServiceSoap = deptWebServiceSoap;
	}
}
