package org.martin.service;

import org.martin.cars.PetrolCar;
import org.springframework.beans.factory.annotation.Autowired;

public class Cars {

	@Autowired
	private PetrolCar petrolCar;

	public PetrolCar getPetrolCar() {
		return petrolCar;
	}
	public void setPetrolCar(PetrolCar petrolCar) {
		this.petrolCar = petrolCar;
	}
	
	

}
