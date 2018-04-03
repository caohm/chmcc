package org.martin.cars;

import org.martin.object.Battery;
import org.springframework.stereotype.Component;

@Component
public class ElectricCar {
	
	public void run() {
		System.out.println("Running electric car");
	}

	public void recharge(Battery battery) {
		System.out.println("car got recharged");
	}

}
