package com.novaedge.project.emailPilot.model;

public class TBNovaEmailPilotUserReqModel {

	public String userName;
	public String Password;
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
	
	public TBNovaEmailPilotUserReqModel(String userName, String password) {
		super();
		this.userName = userName;
		Password = password;
	}
	
	
	public TBNovaEmailPilotUserReqModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	@Override
	public String toString() {
		return "TBNovaEmailPilotUserModel [userName=" + userName + ", Password=" + Password + "]";
	}
	
	
}
