package org.martin.spring;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {

	public static void main(String[] args) {
		
		ClassPathXmlApplicationContext context =  new ClassPathXmlApplicationContext("Bean.xml");
		App app = context.getBean("app", App.class);
		
		app.later();
		
		
		context.close();
	}

	public void later() {
		System.out.println("This message should get printed later");
	}
}
