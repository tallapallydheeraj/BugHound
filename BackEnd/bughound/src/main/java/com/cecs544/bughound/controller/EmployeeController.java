package com.cecs544.bughound.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cecs544.bughound.custom.AuthenticationRequest;
import com.cecs544.bughound.custom.AuthenticationResponse;
import com.cecs544.bughound.model.Area;
import com.cecs544.bughound.model.Employee;
import com.cecs544.bughound.service.EmployeeService;
import com.cecs544.bughound.service.JwtService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "*")
public class EmployeeController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping("/employee/{id}")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<Object> getEmployee(@PathVariable Integer id) {
		try {
			Employee employee=this.employeeService.findById(id);
			return ResponseEntity.status(HttpStatus.OK)
					.body(employee);
		}
		catch (EntityNotFoundException e) {
			System.out.println("error");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Employee not found");
		}
	} 
	
	@GetMapping("/employee")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public List<Employee> getEmployees(){
		return this.employeeService.getEmployees();
		
	}
	
	
	@PostMapping("/addEmployee")
	@PreAuthorize("hasRole('ROLE_L3')")
    public String addNewUser(@RequestBody Employee employee) { 
        return employeeService.addUser(employee); 
    } 	
	
	@PutMapping("/employee/{id}")
	@PreAuthorize("hasRole('ROLE_L3')")
    public ResponseEntity<Employee> updateEmployee(@PathVariable(value="id") int id, @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        return ResponseEntity.ok().body(updatedEmployee);
    }
	
	 @PostMapping("/authenticate")
	 @PreAuthorize("permitAll()")
	    public ResponseEntity<Object> authenticateAndGetToken(@RequestBody AuthenticationRequest authenticationRequest) { 
	        try {
				Authentication authentication = authenticationManager
						.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), 
								authenticationRequest.getPassword())); 
				if (authentication.isAuthenticated()) { 
					AuthenticationResponse response = new AuthenticationResponse(jwtService.generateToken(authenticationRequest.getUsername()), authenticationRequest.getUsername(), employeeService.findEmployeeByUserName(authenticationRequest.getUsername()).getUserlevel(),employeeService.findEmployeeByUserName(authenticationRequest.getUsername()).getEmployee_name());
				    return ResponseEntity.status(HttpStatus.OK)
				    		.body(response); 
				} else { 
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				    		.body("Bad Credentials"); 
				}
			} catch (AuthenticationException e) {
				
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			    		.body("Bad Credentials");
			} 
	    } 
}
