package org.martin.spring;

import java.util.Map;

public class BikeInsurance implements Insurance {

	private Map<String, String> members;
	
	@Override
	public String showStatus() {
		return "Your bike is Insured";
	}

	public Map<String, String> getMembers() {
		return members;
	}

	public void setMembers(Map<String, String> members) {
		this.members = members;
	}

	@Override
	public String toString() {
		return "BikeInsurance [members=" + members + "]";
	}
	
	

}
