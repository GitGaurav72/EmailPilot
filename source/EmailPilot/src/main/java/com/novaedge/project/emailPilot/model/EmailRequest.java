package com.novaedge.project.emailPilot.model;




public class EmailRequest {
    private String accessToken;
    private String toEmail;
    private String subject;
    private String body;
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public String getToEmail() {
		return toEmail;
	}
	public void setToEmail(String toEmail) {
		this.toEmail = toEmail;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public EmailRequest(String accessToken, String toEmail, String subject, String body) {
		super();
		this.accessToken = accessToken;
		this.toEmail = toEmail;
		this.subject = subject;
		this.body = body;
	}

   
}