package com.cecs544.bughound.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name="employee")
public class Employee {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="emp_id")
	private int emp_id;
	@NotBlank
	@Column(name="employee_name")
	private String employee_name;
	@NotBlank
	@Column(name="username")
	private String username;
	@NotBlank
	@Column(name="password")
	private String password;
	@Column(name="is_active")
	private int isActive;
	@NotBlank
	@Column(name="userlevel")
	private String userlevel;
	public Employee() {
		
	}
	public Employee(int emp_id, @NotBlank String employee_name, @NotBlank String username, @NotBlank String password,
			int isActive, @NotBlank String userlevel) {
		super();
		this.emp_id = emp_id;
		this.employee_name = employee_name;
		this.username = username;
		this.password = password;
		this.isActive = isActive;
		this.userlevel = userlevel;
	}
	public int getEmp_id() {
		return emp_id;
	}
	public void setEmp_id(int emp_id) {
		this.emp_id = emp_id;
	}
	public String getEmployee_name() {
		return employee_name;
	}
	public void setEmployee_name(String employee_name) {
		this.employee_name = employee_name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getIsActive() {
		return isActive;
	}
	public void setIsActive(int isActive) {
		this.isActive = isActive;
	}
	public String getUserlevel() {
		return userlevel;
	}
	public void setUserlevel(String userlevel) {
		this.userlevel = userlevel;
	}
	
}
