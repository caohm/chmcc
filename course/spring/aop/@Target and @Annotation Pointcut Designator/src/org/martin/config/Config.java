package org.martin.config;

import org.martin.aspects.Diagnose;
import org.martin.cars.ElectricCar;
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
	
	@Bean("diagnose")
	public Diagnose diagnose() {
		return new Diagnose();
	}
}
