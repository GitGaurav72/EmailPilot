package com.novaedge.project.emailPilot.entity;



import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "TB_Nova_EmailPilot_MailId")
public class TBNovaEmailPilotMailId {
	
	
    @Id
    @Column(name = "m_id")
    private String mId;

    @Column(name = "mail_id")
    private String mailId;

    @Column(name = "hr_name")
    private String hrName;

    @Column(name = "cmpny_nm")
    private String cmpnyNm;

    @Column(name = "add_by_user")
    private String addByUser;

    @Column(name = "add_to_group")
    private String addTogroup;

    @Column(name = "add_ts")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime addTs;

    @Column(name = "updt_ts")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updtTs;

    // Getters and Setters


    public String getmId() {
        return mId;
    }

    public void setmId(String mId) {
        this.mId = mId;
    }

    public String getMailId() {
        return mailId;
    }

    public void setMailId(String mailId) {
        this.mailId = mailId;
    }

    public String getHrName() {
        return hrName;
    }

    public void setHrName(String hrName) {
        this.hrName = hrName;
    }

    public String getCmpnyNm() {
        return cmpnyNm;
    }

    public void setCmpnyNm(String cmpnyNm) {
        this.cmpnyNm = cmpnyNm;
    }

    public String getAddByUser() {
        return addByUser;
    }

    public void setAddByUser(String addByUser) {
        this.addByUser = addByUser;
    }

    public String getAddTogroup() {
        return addTogroup;
    }

    public void setAddTogroup(String addTogroup) {
        this.addTogroup = addTogroup;
    }

    public LocalDateTime getAddTs() {
        return addTs;
    }

    public void setAddTs(LocalDateTime addTs) {
        this.addTs = addTs;
    }

    public LocalDateTime getUpdtTs() {
        return updtTs;
    }

    public void setUpdtTs(LocalDateTime updtTs) {
        this.updtTs = updtTs;
    }
}