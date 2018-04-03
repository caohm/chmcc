package org.martin.service;

import org.martin.cars.ElectricCar;
import org.martin.cars.PetrolCar;
import org.springframework.beans.factory.annotation.Autowired;

public class Cars {
	
	@Autowired
	private ElectricCar electricCar;
	@Autowired
	private PetrolCar petrolCar;
	
//	@Autowired
//	public Cars(ElectricCar electricCar, PetrolCar petrolCar) {
//		this.electricCar = electricCar;
//		this.petrolCar = petrolCar;
//	}
	
	public ElectricCar getElectricCar() {
		return electricCar;
	}
	public void setElectricCar(ElectricCar electricCar) {
		this.electricCar = electricCar;
	}
	public PetrolCar getPetrolCar() {
		return petrolCar;
	}
	public void setPetrolCar(PetrolCar petrolCar) {
		this.petrolCar = petrolCar;
	}
	
	

}
