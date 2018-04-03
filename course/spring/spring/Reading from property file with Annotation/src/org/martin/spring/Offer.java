package org.martin.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

public class Offer {
	@Value("${offers.USA}")
	public String currentOffer = "No Offers";

	public String getCurrentOffer() {
		return currentOffer;
	}

	public void setCurrentOffer(String currentOffer) {
		this.currentOffer = currentOffer;
	}
	
//	Via setter is necessary use @Autowired
/////////////////
	
//	@Autowired
//	public void setCurrentOffer(@Value("${offers.USA}") String currentOffer) {
//		this.currentOffer = currentOffer;
//	}

}
