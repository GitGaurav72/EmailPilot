package com.novaedge.project.emailPilot.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.*;

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
    
    @ManyToMany
    @JsonIgnoreProperties
    @JoinTable(name = "TB_Nova_EmailPilot_Group_Mail_Mapping", joinColumns = @JoinColumn (name = "m_grp_id"), inverseJoinColumns = @JoinColumn(name = "m_id"))
    private Set<TBNovaEmailPilotMailId> mailIds = new HashSet<>();

    @Column(name = "add_ts")
    @CreatedDate
    private LocalDateTime addTs;

    @Column(name = "updt_ts")
    @LastModifiedDate
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
    
    public Set<TBNovaEmailPilotMailId> getMailIds() {
        return mailIds;
    }

    public void setMailIds(Set<TBNovaEmailPilotMailId> mailIds) {
        this.mailIds = mailIds;
    }

	public TBNovaEmailPilotMailGroup(String mGrpId, String mGrpNm, String adedUsr, Set<TBNovaEmailPilotMailId> mailIds,
			LocalDateTime addTs, LocalDateTime updtTs) {
		super();
		this.mGrpId = mGrpId;
		this.mGrpNm = mGrpNm;
		this.adedUsr = adedUsr;
		this.mailIds = mailIds;
		this.addTs = addTs;
		this.updtTs = updtTs;
	}

	public TBNovaEmailPilotMailGroup() {
		super();
		// TODO Auto-generated constructor stub
	}
    
	public void addMailId(TBNovaEmailPilotMailId mailId) {
	    mailIds.add(mailId);
	    mailId.getMailGroups().add(this);
	}

	public void removeMailId(TBNovaEmailPilotMailId mailId) {
	    mailIds.remove(mailId);
	    mailId.getMailGroups().remove(this);
	}
}