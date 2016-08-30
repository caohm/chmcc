package com.jd.trafficlight.web.sso;


import com.jd.common.web.DotnetAuthenticationTicket;
import com.jd.common.web.DotnetAuthenticationUtil;

import java.io.File;


public class Main {

	private static String cookieValue = "A644689C016E3413A96551FA08E2BF3CA15652D7F072E5CC4C0460D3601495B9D0A92E6A9E65E9D557F0AA64048F71AE5F00AD2B7CC570446003DD0062C7B2532AE21D1CD142FE3EC052E35F3211A489";

	
	public static void main(String[] args) {
		 
		//测试
		testCookie();
		//线上
//		publicCookie();
		
		//删除SVN项目中lock文件
//		deleteSVNLock("D:/C/wms2");
//		deleteSVNLock("D:/C/wms2/toOut_interface/wmsBackBranch/branch2/wms-back-worker/wms-back-web/src/main/webapp/");
		
		//System.out.println(System.getProperty("java.library.path"));
		
	}
	
	static void testCookie(){
		try{
			DotnetAuthenticationTicket ticket = DotnetAuthenticationUtil.getFormsAuthenticationTicket(cookieValue, "8B6697227CBCA902B1A0925D40FAA00B353F2DF4359D2099");
		
			System.err.println(ticket.getUsername());
			
		}catch (Exception e) {
			System.err.println(e);
		}
	}
	
	static void publicCookie(){
		try{
			DotnetAuthenticationTicket ticket = DotnetAuthenticationUtil.getFormsAuthenticationTicket(cookieValue, "C602924B0D1090D931E3771D74ABBF9733A8C3545CFE1810");
		
			System.err.println(ticket.getUsername());
			//System.err.println(DateUtil.format(ticket.getExpires(),DateUtil.FORMAT_DATE_TIME));
			
		}catch (Exception e) {
			System.err.println(e);
		}
	}
	
	static void deleteSVNLock(String path){
		File rootFile = new File(path);
		File[] allFiles = rootFile.listFiles();
		if(null != allFiles && allFiles.length > 0){
			for(File file : allFiles){
				if(".svn".equalsIgnoreCase(file.getName())){
					File[] childFiles = file.listFiles();
					for(File child : childFiles){
						if("lock".equalsIgnoreCase(child.getName())){
							System.err.println(child.getPath());
							child.delete();
						}
					}
				}else{
					deleteSVNLock(file.getPath());
				}
			}
		}
	}
}
