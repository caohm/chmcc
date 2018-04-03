package org.martin.spring;


public class BikeInsurance implements Insurance {

	@Override
	public String showStatus() {
		return "Your bike is Insured";
	}
}
