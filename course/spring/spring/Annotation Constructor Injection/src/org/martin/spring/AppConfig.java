package org.martin.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

	@Bean
	public Offer currentOffer() {
		return new Offer();
	}
	
	@Bean("myInsurance")
	public BikeInsurance insurance() {
		return new BikeInsurance(currentOffer());
	}
}
