package com.jd.trafficlight.web.view;

import java.io.Serializable;


public class UmpHighChart implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String tpDivId;

    private String tpTitle;

    private String invokeDivId;

    private String invokeTitle;

    private String system;

    private String umpKey;

    private String convertDivId;

    private String convertTitle;
    
    private String yesterdayConvertDivId;
    
    private String yesterdayConvertTitle;
    
    
    public String getUmpKey() {
        return umpKey;
    }

    public void setUmpKey(String umpKey) {
        this.umpKey = umpKey;
    }

    public String getTpDivId() {
        return tpDivId;
    }

    public void setTpDivId(String tpDivId) {
        this.tpDivId = tpDivId;
    }

    public String getTpTitle() {
        return tpTitle;
    }

    public void setTpTitle(String tpTitle) {
        this.tpTitle = tpTitle;
    }

    public String getInvokeDivId() {
        return invokeDivId;
    }

    public void setInvokeDivId(String invokeDivId) {
        this.invokeDivId = invokeDivId;
    }

    public String getInvokeTitle() {
        return invokeTitle;
    }

    public void setInvokeTitle(String invokeTitle) {
        this.invokeTitle = invokeTitle;
    }

    public String getSystem() {
        return system;
    }

    public void setSystem(String system) {
        this.system = system;
    }

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

	public String getYesterdayConvertDivId() {
		return yesterdayConvertDivId;
	}

	public void setYesterdayConvertDivId(String yesterdayConvertDivId) {
		this.yesterdayConvertDivId = yesterdayConvertDivId;
	}

	public String getYesterdayConvertTitle() {
		return yesterdayConvertTitle;
	}

	public void setYesterdayConvertTitle(String yesterdayConvertTitle) {
		this.yesterdayConvertTitle = yesterdayConvertTitle;
	}
    
	
    
}
