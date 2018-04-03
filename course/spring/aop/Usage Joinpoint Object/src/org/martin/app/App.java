package org.martin.app;

import org.martin.config.Config;
import org.martin.service.Cars;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		Cars car = contex.getBean("cars", Cars.class);
		
		car.getPetrolCar().run(100);
		
		contex.close();
		
//		Output:
//		execution(void org.martin.cars.PetrolCar.run(int))
//		Test call to run method
//		Arg received: 100
//		Test Advice
//		Running at: 100km/h

		
		
	}

}
