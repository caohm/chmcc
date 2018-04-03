package org.martin.app;

import org.martin.config.Config;
import org.martin.service.Cars;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		Cars car = contex.getBean("cars", Cars.class);
		
		car.getElectricCar().run();
		car.getPetrolCar().run();
		
		contex.close();
		
//		Output:
//		Test Advice
//		Running electric car
//		Test Advice
//		Running petrol car
		
	}

}
