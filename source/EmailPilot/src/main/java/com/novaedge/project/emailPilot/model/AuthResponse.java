package com.novaedge.project.emailPilot.model;

public class AuthResponse {
    private String token;
    
    private String id;
	
	private String firstname;
	
	private String lastname;

    private String username;

    private String email;

    public AuthResponse(String token, String id, String firstname, String lastname, String username, String email) {
		super();
		this.token = token;
		this.id=id;
		this.firstname=firstname;
		this.lastname = lastname;
		this.username = username;
	
	}

    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
