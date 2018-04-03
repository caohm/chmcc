package org.martin.spring;

public class BikeInsurance implements Insurance {

	@Override
	public String showStatus() {
		return "Your bike is Insured";
	}
	
	public void start() {
		System.out.println("Started");
	}
	
	public void end() {
		System.out.println("Ended");
	}

}
