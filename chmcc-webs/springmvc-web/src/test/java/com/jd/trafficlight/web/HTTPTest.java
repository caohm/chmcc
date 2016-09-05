package com.jd.trafficlight.web;

public class HTTPTest {

	public static void main(String[] args) {
		HttpGetUtil get = new HttpGetUtil();
		
		String url = "http://insales.360buy.com/product/listNew?cid1=&cid2=653&orgId=&priceMin=500&priceMax=2000&skey=&ikey=&specialRate=&pageSize=20&status=&pageNo=1&_=1432778111433";
		String refer = "\tinsales.360buy.com";
		String cookie = "insales_user=PXODMEUFAMLN2CVQXOF2PDBY2PXC3IOG4VR5OX2NAQHAIV5YB56P55OJ26WAKORRQYQ7EAVMSCZY5KI67IQZOGW5U2UV3UYJJN6HK5SOFWDR4VEDJA6ZS27T5OIVLVXK5LONKH3LIBDOC;erp1.360buy.com=3657FF78885F2C34763A10DA5996C6F4F40CB079843F22EC91EB393065815BAC1453C135C41CF485A61FF0DB43967D502802094A92AEF32FA20670B9954C54022F70B34ED954BAE2506063BA21A3AF8D";
		get.init();
		get.setCookie(cookie);
		get.setUrl(url);
		get.setRefer(refer);
		get.setUrl(url);
		
		String result = get.getValueFromRemote();
		if(result != null){
			if(result.contains("<div class=\"icon\"></div>")){
				System.out.println("true");
			}
		}
		
	}
}
