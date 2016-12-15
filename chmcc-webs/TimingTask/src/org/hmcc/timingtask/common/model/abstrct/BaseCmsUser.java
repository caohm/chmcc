package org.hmcc.timingtask.common.model.abstrct;


import org.hmcc.timingtask.common.model.CmsUser;

import java.io.Serializable;


/**
 * This is an object that contains data related to the jc_user table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class table="jc_user"
 */

public abstract class BaseCmsUser implements Serializable {


    private int hashCode = Integer.MIN_VALUE;
    // primary key
    private Integer id;
    // fields
    private String username;
    private String email;
    private java.util.Date registerTime;
    private String registerIp;
    private java.util.Date lastLoginTime;
    private String lastLoginIp;
    private Integer loginCount;
    private Integer rank;
    private Long uploadTotal;
    private Integer uploadSize;
    private java.sql.Date uploadDate;
    private Boolean admin;
    private Boolean selfAdmin;
    private Boolean disabled;
    // constructors
    public BaseCmsUser() {
        initialize();
    }
    /**
     * Constructor for primary key
     */
    public BaseCmsUser(Integer id) {
        this.setId(id);
        initialize();
    }
    /**
     * Constructor for required fields
     */
    public BaseCmsUser(
            Integer id,
            String username,
            java.util.Date registerTime,
            String registerIp,
            Integer loginCount,
            Integer rank,
            Long uploadTotal,
            Integer uploadSize,
            Boolean admin,
            Boolean viewonlyAdmin,
            Boolean selfAdmin,
            Boolean disabled) {

        this.setId(id);
        this.setUsername(username);
        this.setRegisterTime(registerTime);
        this.setRegisterIp(registerIp);
        this.setLoginCount(loginCount);
        this.setRank(rank);
        this.setUploadTotal(uploadTotal);
        this.setUploadSize(uploadSize);
        this.setAdmin(admin);
        this.setSelfAdmin(selfAdmin);
        this.setDisabled(disabled);
        initialize();
    }

    protected void initialize() {
    }

    /**
     * Return the unique identifier of this class
     *
     * @hibernate.id generator-class="assigned"
     * column="user_id"
     */
    public Integer getId() {
        return id;
    }

    /**
     * Set the unique identifier of this class
     *
     * @param id the new ID
     */
    public void setId(Integer id) {
        this.id = id;
        this.hashCode = Integer.MIN_VALUE;
    }


    /**
     * Return the value associated with the column: username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Set the value related to the column: username
     *
     * @param username the username value
     */
    public void setUsername(String username) {
        this.username = username;
    }


    /**
     * Return the value associated with the column: email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Set the value related to the column: email
     *
     * @param email the email value
     */
    public void setEmail(String email) {
        this.email = email;
    }


    /**
     * Return the value associated with the column: register_time
     */
    public java.util.Date getRegisterTime() {
        return registerTime;
    }

    /**
     * Set the value related to the column: register_time
     *
     * @param registerTime the register_time value
     */
    public void setRegisterTime(java.util.Date registerTime) {
        this.registerTime = registerTime;
    }


    /**
     * Return the value associated with the column: register_ip
     */
    public String getRegisterIp() {
        return registerIp;
    }

    /**
     * Set the value related to the column: register_ip
     *
     * @param registerIp the register_ip value
     */
    public void setRegisterIp(String registerIp) {
        this.registerIp = registerIp;
    }


    /**
     * Return the value associated with the column: last_login_time
     */
    public java.util.Date getLastLoginTime() {
        return lastLoginTime;
    }

    /**
     * Set the value related to the column: last_login_time
     *
     * @param lastLoginTime the last_login_time value
     */
    public void setLastLoginTime(java.util.Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }


    /**
     * Return the value associated with the column: last_login_ip
     */
    public String getLastLoginIp() {
        return lastLoginIp;
    }

    /**
     * Set the value related to the column: last_login_ip
     *
     * @param lastLoginIp the last_login_ip value
     */
    public void setLastLoginIp(String lastLoginIp) {
        this.lastLoginIp = lastLoginIp;
    }


    /**
     * Return the value associated with the column: login_count
     */
    public Integer getLoginCount() {
        return loginCount;
    }

    /**
     * Set the value related to the column: login_count
     *
     * @param loginCount the login_count value
     */
    public void setLoginCount(Integer loginCount) {
        this.loginCount = loginCount;
    }


    /**
     * Return the value associated with the column: rank
     */
    public Integer getRank() {
        return rank;
    }

    /**
     * Set the value related to the column: rank
     *
     * @param rank the rank value
     */
    public void setRank(Integer rank) {
        this.rank = rank;
    }


    /**
     * Return the value associated with the column: upload_total
     */
    public Long getUploadTotal() {
        return uploadTotal;
    }

    /**
     * Set the value related to the column: upload_total
     *
     * @param uploadTotal the upload_total value
     */
    public void setUploadTotal(Long uploadTotal) {
        this.uploadTotal = uploadTotal;
    }


    /**
     * Return the value associated with the column: upload_size
     */
    public Integer getUploadSize() {
        return uploadSize;
    }

    /**
     * Set the value related to the column: upload_size
     *
     * @param uploadSize the upload_size value
     */
    public void setUploadSize(Integer uploadSize) {
        this.uploadSize = uploadSize;
    }


    /**
     * Return the value associated with the column: upload_date
     */
    public java.sql.Date getUploadDate() {
        return uploadDate;
    }

    /**
     * Set the value related to the column: upload_date
     *
     * @param uploadDate the upload_date value
     */
    public void setUploadDate(java.sql.Date uploadDate) {
        this.uploadDate = uploadDate;
    }


    /**
     * Return the value associated with the column: is_admin
     */
    public Boolean getAdmin() {
        return admin;
    }

    /**
     * Set the value related to the column: is_admin
     *
     * @param admin the is_admin value
     */
    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    /**
     * Return the value associated with the column: is_self_admin
     */
    public Boolean getSelfAdmin() {
        return selfAdmin;
    }

    /**
     * Set the value related to the column: is_self_admin
     *
     * @param selfAdmin the is_self_admin value
     */
    public void setSelfAdmin(Boolean selfAdmin) {
        this.selfAdmin = selfAdmin;
    }


    /**
     * Return the value associated with the column: is_disabled
     */
    public Boolean getDisabled() {
        return disabled;
    }

    /**
     * Set the value related to the column: is_disabled
     *
     * @param disabled the is_disabled value
     */
    public void setDisabled(Boolean disabled) {
        this.disabled = disabled;
    }


    public boolean equals(Object obj) {
        if (null == obj) return false;
        if (!(obj instanceof CmsUser)) return false;
        else {
            CmsUser cmsUser = (CmsUser) obj;
            if (null == this.getId() || null == cmsUser.getId()) return false;
            else return (this.getId().equals(cmsUser.getId()));
        }
    }

    public int hashCode() {
        if (Integer.MIN_VALUE == this.hashCode) {
            if (null == this.getId()) return super.hashCode();
            else {
                String hashStr = this.getClass().getName() + ":" + this.getId().hashCode();
                this.hashCode = hashStr.hashCode();
            }
        }
        return this.hashCode;
    }


    public String toString() {
        return super.toString();
    }


}