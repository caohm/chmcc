package org.martin.app;

import org.martin.config.Config;
import org.martin.service.Cars;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		Cars car = contex.getBean("cars", Cars.class);
		
		car.getPetrolCar().run(10, 60);
		car.getPetrolCar().run("Slow down");
		
		contex.close();
		
//		Output:
//		Test Advice
//		Running at: 10 for 60 KM
//		Test Advice
//		Slow down
		
	}

}
