package org.martin.spring;

import org.springframework.stereotype.Component;

@Component("myInsurance")
public class BikeInsurance implements Insurance {

	@Override
	public String showStatus() {
		return "Your bike is Insured";
	}
}
