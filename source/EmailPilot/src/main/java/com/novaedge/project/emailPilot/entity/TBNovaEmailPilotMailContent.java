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
@Table(name = "TB_Nova_EmailPilot_MailContent")
public class TBNovaEmailPilotMailContent {
	
    @Id
    @Column(name = "ml_cntnt_id", unique = true)
    private String mlCntntId;

    @Column(name = "ml_cntnt")
    private String mlCntnt;
    
    @Column(name = "add_by_user")
    private String addByUser;
    
    
    @Column(name = "m_heading")
    private String title;

    @Column(name = "subject")
    private String subject;

    @Column(name = "m_file")
    private String file;

    @Column(name = "m_cc")
    private String cc;

    @Column(name = "m_bcc")
    private String bcc;

    @Column(name = "add_tm")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime addTm;

    @Column(name = "upt_tm")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime uptTm;

    // Getters and Setters

    
    
    public String getMlCntntId() {
        return mlCntntId;
    }

    public String getAddByUser() {
		return addByUser;
	}

	public void setAddByUser(String addByUser) {
		this.addByUser = addByUser;
	}


	public void setMlCntntId(String mlCntntId) {
        this.mlCntntId = mlCntntId;
    }

    public String getMlCntnt() {
        return mlCntnt;
    }

    public void setMlCntnt(String mlCntnt) {
        this.mlCntnt = mlCntnt;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getCc() {
        return cc;
    }

    public void setCc(String cc) {
        this.cc = cc;
    }

    public String getBcc() {
        return bcc;
    }

    public void setBcc(String bcc) {
        this.bcc = bcc;
    }

    public LocalDateTime getAddTm() {
        return addTm;
    }

    public void setAddTm(LocalDateTime addTm) {
        this.addTm = addTm;
    }

    public LocalDateTime getUptTm() {
        return uptTm;
    }

    public void setUptTm(LocalDateTime uptTm) {
        this.uptTm = uptTm;
    }
}