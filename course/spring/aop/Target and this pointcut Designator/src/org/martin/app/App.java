package org.martin.app;

import org.martin.cars.Machine;
import org.martin.config.Config;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		Machine car = contex.getBean("petrolCar", Machine.class);
		
		car.run();
		
		contex.close();
		
//		Output:
//		Target Advice
//		This Advice
//		Running petrol car
	}
}
