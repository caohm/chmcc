package org.martin.cars;

public class PetrolCar {

	public void run() throws Exception {
		System.out.println("running petrol car in exception");
		throw new Exception("What happend?");
	}
}
