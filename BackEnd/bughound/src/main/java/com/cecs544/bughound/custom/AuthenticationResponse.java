package com.cecs544.bughound.custom;

public class AuthenticationResponse {

	private final String jwt;

	private String role;
	
	private String username; 
	
	private String employeeName;
	
	public AuthenticationResponse(String jwt, String username, String role, String employeeName) {
		this.jwt = jwt;
		this.role = role;
		this.username = username;
		this.employeeName = employeeName;
		
	}


	public String getUsername() {
		return username;
	}


	public String getRole() {
		return role;
	}


	public String getJwt() {
		return jwt;
	}


	public String getEmployeeName() {
		return employeeName;
	}
	
}