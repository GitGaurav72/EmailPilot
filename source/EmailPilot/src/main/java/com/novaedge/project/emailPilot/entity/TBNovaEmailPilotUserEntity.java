package com.novaedge.project.emailPilot.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Table(name = "TB_Nova_EmailPilot_User")
@Entity
public class TBNovaEmailPilotUserEntity {

	@Id
	@Column(name="ID")
	public String id;
	
	@Column(name="USER_NAME")
	public String userName;
	
	@Column(name="FIRST_NAME")
	public String firstName;
	
	@Column(name="LAST_NAME")
	public String lastName;
	
	@Column(name="ABOUT")
	public String about;
	
	@Column(name= "EMAIL", unique = true)
	public String email;
	
	@Column(name= "PASSWORD")
	public String password;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CRT_TS")
	public LocalDateTime crtAt;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPDT_TS")
	public LocalDateTime updtdBy;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}
	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	public LocalDateTime getCrtAt() {
		return crtAt;
	}

	public void setCrtAt(LocalDateTime crtAt) {
		this.crtAt = crtAt;
	}

	public LocalDateTime getUpdtdBy() {
		return updtdBy;
	}

	public void setUpdtdBy(LocalDateTime updtdBy) {
		this.updtdBy = updtdBy;
	}

	public TBNovaEmailPilotUserEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TBNovaEmailPilotUserEntity(String id, String userName, String firstName, String lastName, String about,
			String email, String password, LocalDateTime crtAt, LocalDateTime updtdBy) {
		super();
		this.id = id;
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.about = about;
		this.email = email;
		this.password = password;
		this.crtAt = crtAt;
		this.updtdBy = updtdBy;
	}

	@Override
	public String toString() {
		return "TBNovaEmailPilotUserEntity [id=" + id + ", userName=" + userName + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", about=" + about + ", email=" + email + ", password=" + password
				+ ", crtAt=" + crtAt + ", updtdBy=" + updtdBy + "]";
	}

	
	
	
}
