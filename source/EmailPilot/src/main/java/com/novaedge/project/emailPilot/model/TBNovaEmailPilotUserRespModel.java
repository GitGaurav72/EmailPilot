package com.novaedge.project.emailPilot.model;

public class TBNovaEmailPilotUserRespModel {
	
	public String token;
	public Long id;
	public String userName;
	public String Password;
	public String firstName;
	public String lastName;
	public String about;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
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
	
	public TBNovaEmailPilotUserRespModel(String token,Long id, String userName, String password, String firstName, String lastName, String about) {
		super();
		this.token = token;
		this.id = id;
		this.userName = userName;
		Password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.about = about;
	}
	
	
	public TBNovaEmailPilotUserRespModel() {
		super();
		// TODO Auto-generated constructor stub
	}
}
