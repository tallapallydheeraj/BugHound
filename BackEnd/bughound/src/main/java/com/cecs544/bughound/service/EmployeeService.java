package com.cecs544.bughound.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cecs544.bughound.model.Area;
import com.cecs544.bughound.model.Employee;
import com.cecs544.bughound.model.UserInfoDetails;
import com.cecs544.bughound.repo.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EmployeeService implements UserDetailsService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Employee> userDetail = employeeRepository.findByUsername(username); 
		  
        // Converting userDetail to UserDetails 
        return userDetail.map(UserInfoDetails::new) 
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
	}

	public Employee findEmployeeByUserName(String username) {
		try {
			Optional<Employee> employee = this.employeeRepository.findByUsername(username);
			return employee.orElseThrow(()->{return new EntityNotFoundException("Employee with "+username+" does not exist");});
			
		}catch (IllegalArgumentException e) {
			return null;
		}
	}
	
	public String addUser(Employee employee) { 
		
		try {
			if(!employeeRepository.findAll().stream().anyMatch(e->e.getUsername().equalsIgnoreCase(employee.getUsername()))) {
				employee.setEmp_id(0);
				//employee.setPassword(passwordEncoder.encode(employee.getPassword()));
				
				employee.setIsActive(1);
				employee.setPassword(passwordEncoder.encode("password"));
				
				employeeRepository.save(employee); 
				return "Employee Added Successfully"; 
			}
			else {
				return "Employee already exists!";
			}
		} catch (Exception e) {
			return "Something went Wrong!";
		}
    }

	public Employee findById(Integer id) {
		try {
			Optional<Employee> employee = employeeRepository.findById(id);
			return employee.orElseThrow(()->{return new EntityNotFoundException("Employee with "+id+" does not exist");});
		}catch (IllegalArgumentException e) {
			return null;
		}

	}
	
	public List<Employee> getEmployees() {
		List<Employee> employees = new ArrayList<>();
		employeeRepository.findAll().forEach(e->employees.add(e));
		return employees;
	}

	public Employee updateEmployee(int id, Employee employeeDetails) {
		Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id " + id));
        
		if(!employeeDetails.getEmployee_name().isBlank())
			employee.setEmployee_name(employeeDetails.getEmployee_name());
        if(!employeeDetails.getUsername().isBlank())
        	employee.setUsername(employeeDetails.getUsername());
        if(!employeeDetails.getUsername().isBlank())
        	employee.setUserlevel(employeeDetails.getUserlevel());
        
        return employeeRepository.save(employee);
	} 
	
}
