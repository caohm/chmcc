package org.martin.spring;

public class CarInsurance implements Insurance {

	@Override
	public String showStatus() {
		
		return "Your car is insured";
	}

}
