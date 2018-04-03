package org.martin.spring;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class User {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext contex = new AnnotationConfigApplicationContext(AppConfig.class);
		
		Insurance status = contex.getBean("myInsurance", Insurance.class);
		System.out.println(status.showStatus());
		contex.close();		 
	}

}
