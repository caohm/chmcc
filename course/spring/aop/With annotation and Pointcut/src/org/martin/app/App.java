package org.martin.app;

import org.martin.config.Config;
import org.martin.service.Cars;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		Cars car = contex.getBean("cars", Cars.class);
//		car.getElectricCar().run();
		try {
			car.getPetrolCar().run();
		} catch (Exception e) {
			System.out.println("Exception is: " + e.getMessage());
		}
		
		contex.close();
		
//		Output:
//		Around advice initial msg
//		running petrol car in run method
//		In aroundAdvice catch: What happend?
//		Around advice later message
		
	}

}
