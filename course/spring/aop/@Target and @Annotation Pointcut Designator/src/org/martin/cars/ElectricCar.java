package org.martin.cars;

import org.springframework.stereotype.Component;

@Component
public class ElectricCar {
	
	@Deprecated
	public void run() {
		System.out.println("Running electric car");
	}

}
