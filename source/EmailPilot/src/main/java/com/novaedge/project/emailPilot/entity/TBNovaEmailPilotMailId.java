package com.novaedge.project.emailPilot.entity;



import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailGroup;

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
    
    @ManyToMany(mappedBy = "mailIds")
    private Set<TBNovaEmailPilotMailGroup> mailGroups = new HashSet<>();

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
    

    // Add getters and setters for mailGroups
    public Set<TBNovaEmailPilotMailGroup> getMailGroups() {
        return mailGroups;
    }

    public void setMailGroups(Set<TBNovaEmailPilotMailGroup> mailGroups) {
        this.mailGroups = mailGroups;
    }

	public TBNovaEmailPilotMailId(String mId, String mailId, String hrName, String cmpnyNm, String addByUser,
			Set<TBNovaEmailPilotMailGroup> mailGroups, LocalDateTime addTs, LocalDateTime updtTs) {
		super();
		this.mId = mId;
		this.mailId = mailId;
		this.hrName = hrName;
		this.cmpnyNm = cmpnyNm;
		this.addByUser = addByUser;
		this.mailGroups = mailGroups;
		this.addTs = addTs;
		this.updtTs = updtTs;
	}

	public TBNovaEmailPilotMailId() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}