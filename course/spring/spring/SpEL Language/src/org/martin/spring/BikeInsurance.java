package org.martin.spring;


public class BikeInsurance implements Insurance {

	String currentOffer;
	
	@Override
	public String showStatus() {
		return "Your bike is Insured";
	}

	public String getCurrentOffer() {
		return currentOffer;
	}

	public void setCurrentOffer(String currentOffer) {
		this.currentOffer = currentOffer;
	}

	

	
	

}
