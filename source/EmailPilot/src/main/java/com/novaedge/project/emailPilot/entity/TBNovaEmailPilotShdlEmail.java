package com.novaedge.project.emailPilot.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "TB_NOVA_EMAIL_PILOT_SHDL_EMAIL")

public class TBNovaEmailPilotShdlEmail {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "GROUP_ID", nullable = false)
    private String grpId;

    @Column(name = "EMAIL_TEMPLATE", nullable = false)
    private String emailTemp;

    @Column(name = "SCHEDULED_TIME", nullable = false)
    private LocalDateTime scheduledTime;

    @Column(name = "TIME_ZONE", nullable = false)
    private String timeZone;

    @CreatedDate
    @Column(name = "CREATED_TIME", updatable = false)
    private LocalDateTime crtTm;

    @LastModifiedDate
    @Column(name = "UPDATED_TIME")
    private LocalDateTime uptTm;

    @Column(name = "SCHEDULE_DAILY", length = 1)
    private String scheduleDaily;

    @Column(name = "SCHEDULE_DAILY_TIME")
    private LocalTime scheduleDailyTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getGrpId() {
		return grpId;
	}

	public void setGrpId(String grpId) {
		this.grpId = grpId;
	}

	public String getEmailTemp() {
		return emailTemp;
	}

	public void setEmailTemp(String emailTemp) {
		this.emailTemp = emailTemp;
	}

	public LocalDateTime getScheduledTime() {
		return scheduledTime;
	}

	public void setScheduledTime(LocalDateTime scheduledTime) {
		this.scheduledTime = scheduledTime;
	}

	public String getTimeZone() {
		return timeZone;
	}

	public void setTimeZone(String timeZone) {
		this.timeZone = timeZone;
	}

	public LocalDateTime getCrtTm() {
		return crtTm;
	}

	public void setCrtTm(LocalDateTime crtTm) {
		this.crtTm = crtTm;
	}

	public LocalDateTime getUptTm() {
		return uptTm;
	}

	public void setUptTm(LocalDateTime uptTm) {
		this.uptTm = uptTm;
	}

	public String getScheduleDaily() {
		return scheduleDaily;
	}

	public void setScheduleDaily(String scheduleDaily) {
		this.scheduleDaily = scheduleDaily;
	}

	public LocalTime getScheduleDailyTime() {
		return scheduleDailyTime;
	}

	public void setScheduleDailyTime(LocalTime scheduleDailyTime) {
		this.scheduleDailyTime = scheduleDailyTime;
	}

	public TBNovaEmailPilotShdlEmail(String id, String userId, String grpId, String emailTemp,
			LocalDateTime scheduledTime, String timeZone, LocalDateTime crtTm, LocalDateTime uptTm,
			String scheduleDaily, LocalTime scheduleDailyTime) {
		super();
		this.id = id;
		this.userId = userId;
		this.grpId = grpId;
		this.emailTemp = emailTemp;
		this.scheduledTime = scheduledTime;
		this.timeZone = timeZone;
		this.crtTm = crtTm;
		this.uptTm = uptTm;
		this.scheduleDaily = scheduleDaily;
		this.scheduleDailyTime = scheduleDailyTime;
	}

	public TBNovaEmailPilotShdlEmail() {
		super();
		// TODO Auto-generated constructor stub
	}

    // Getters and Setters
    
    
    
}