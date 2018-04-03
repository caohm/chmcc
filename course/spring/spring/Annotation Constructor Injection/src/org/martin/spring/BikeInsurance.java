package org.martin.spring;


public class BikeInsurance implements Insurance {

	Offer offer;
	
	public BikeInsurance(Offer offer) {
		this.offer = offer;
	}
	
	@Override
	public String showStatus() {
		return "Your bike is Insured";
	}

	public Offer getOffer() {
		return offer;
	}
	
	
}
