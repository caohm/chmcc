package org.martin.config;

import org.martin.cars.ElectricCar;
import org.martin.cars.PetrolCar;
import org.martin.diagnosis.Diagnose;
import org.martin.service.Cars;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
public class Config {
	
	@Bean("electricCar")
	public ElectricCar electricCar() {
		return new ElectricCar();
	}

	@Bean("petrolCar")
	public PetrolCar petrolCar() {
		return new PetrolCar();
	}
	
	@Bean("cars")
	public Cars cars() {
		return new Cars();
	}
	
	@Bean("diagnose")
	public Diagnose diagnose() {
		return new Diagnose();
	}
}
