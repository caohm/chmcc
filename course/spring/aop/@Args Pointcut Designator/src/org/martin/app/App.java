package org.martin.app;

import org.martin.cars.ElectricCar;
import org.martin.config.Config;
import org.martin.object.Battery;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext contex = 
				new AnnotationConfigApplicationContext(Config.class);
		
		ElectricCar car = contex.getBean("electricCar", ElectricCar.class);
		
		car.recharge(new Battery());
		
		contex.close();
		
//		Output:
//		Test Advice for @args
//		car got recharged
		
	}

}
