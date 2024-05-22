package com.cecs544.bughound.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cecs544.bughound.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

	Optional<Employee> findByUsername(String username); 
}

