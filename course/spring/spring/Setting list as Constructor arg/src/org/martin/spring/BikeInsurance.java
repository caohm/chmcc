package org.martin.spring;

import java.util.List;

public class BikeInsurance implements Insurance {

	public BikeInsurance(List<String> members) {
		System.out.println("List of members under insurance: ");
		for(String member : members) {
			System.out.println(member);
		}
	}
	
	@Override
	public String showStatus() {
		return "Your bike is Insured";
	}
	

}
