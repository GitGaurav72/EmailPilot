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
@Table(name = "TB_Nova_EmailPilot_MailGroup")
public class TBNovaEmailPilotMailGroup {
    @Id
    @Column(name = "m_grp_id", unique = true)
    private String mGrpId;

    @Column(name = "m_grp_nm")
    private String mGrpNm;

    @Column(name = "aded_usr")
    private String adedUsr;

    @Column(name = "shdl_tm")
    private String shdlTm;

    @Column(name = "mail_cntnt")
    private String mailCntnt;

    @Column(name = "add_ts")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime addTs;

    @Column(name = "updt_ts")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updtTs;

    // Getters and Setters


    public String getmGrpId() {
        return mGrpId;
    }

    public void setmGrpId(String mGrpId) {
        this.mGrpId = mGrpId;
    }

    public String getmGrpNm() {
        return mGrpNm;
    }

    public void setmGrpNm(String mGrpNm) {
        this.mGrpNm = mGrpNm;
    }

    public String getAdedUsr() {
        return adedUsr;
    }

    public void setAdedUsr(String adedUsr) {
        this.adedUsr = adedUsr;
    }

    public String getShdlTm() {
        return shdlTm;
    }

    public void setShdlTm(String shdlTm) {
        this.shdlTm = shdlTm;
    }

    public String getMailCntnt() {
        return mailCntnt;
    }

    public void setMailCntnt(String mailCntnt) {
        this.mailCntnt = mailCntnt;
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