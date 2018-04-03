package org.martin.app;

import org.martin.config.Config;
import org.martin.service.Cars;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		Cars car = contex.getBean("cars", Cars.class);
		
		car.getPetrolCar().run(100, "test msg");
		
		System.out.println("* * *");
		
		car.getPetrolCar().run(100);
		
		System.out.println("* * *");
		
		car.getPetrolCar().run(100, 150);
		contex.close();
		
//		Output:
//		Test Advice
//		100 test msg
//		* * *
//		Value received: 100
//		Running at: 100km/h
//		* * *
//		Test Advice
//		Values received: 100 150
//		Running at: 100 for 150 KM

		
	}

}
