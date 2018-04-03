package org.martin.cars;

public class PetrolCar {

	public void run() throws Exception {
		System.out.println("running petrol car in run method");
		throw new Exception("What happend?");
	}
}
