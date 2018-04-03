package org.martin.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

	@Bean
	// or if method has different name use: @Bean("myInsurance")
	public BikeInsurance myInsurance() {
		return new BikeInsurance();
	}
}
