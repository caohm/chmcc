package org.martin.app;

import org.martin.cars.ElectricCar;
import org.martin.config.Config;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		ElectricCar car = contex.getBean("electricCar", ElectricCar.class);
		
		car.run();
		
		contex.close();
		
//		Output:
//		Test Advice
//		Running electric car
		
	}

}
