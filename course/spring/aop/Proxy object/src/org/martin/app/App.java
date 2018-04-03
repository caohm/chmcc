package org.martin.app;

import org.martin.cars.PetrolCar;
import org.martin.config.Config;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		PetrolCar car = contex.getBean("petrolCar", PetrolCar.class);
		
		car.run();
		
		contex.close();
		
//		Output:
//		Test Advice
//		Running petrol car
	}
}
