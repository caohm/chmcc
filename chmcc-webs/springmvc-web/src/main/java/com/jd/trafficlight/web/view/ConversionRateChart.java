package com.jd.trafficlight.web.view;

import java.io.Serializable;

public class ConversionRateChart implements Serializable{
	private static final long serialVersionUID = 1L;

	private String convertDivId;

    private String convertTitle;

    private String system;

    private String firstUmpKey;
    
    private String secondUmpKey;
    
    private String name;
    
    
    
    public String getConvertDivId() {
		return convertDivId;
	}

	public void setConvertDivId(String convertDivId) {
		this.convertDivId = convertDivId;
	}

	public String getConvertTitle() {
		return convertTitle;
	}

	public void setConvertTitle(String convertTitle) {
		this.convertTitle = convertTitle;
	}

	public String getSystem() {
		return system;
	}

	public void setSystem(String system) {
		this.system = system;
	}

	public String getFirstUmpKey() {
		return firstUmpKey;
	}

	public void setFirstUmpKey(String firstUmpKey) {
		this.firstUmpKey = firstUmpKey;
	}

	public String getSecondUmpKey() {
		return secondUmpKey;
	}

	public void setSecondUmpKey(String secondUmpKey) {
		this.secondUmpKey = secondUmpKey;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	   
}
