package com.cecs544.bughound.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cecs544.bughound.model.Program;
import com.cecs544.bughound.service.ProgramService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/program")
@CrossOrigin("*")
public class ProgramController {
	
	@Autowired
	private ProgramService programService;
	
	@GetMapping("{id}")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<Object> getProgram(@PathVariable Integer id) {
		try {
			Program program=this.programService.findById(id);
			return ResponseEntity.status(HttpStatus.OK)
					.body(program);
		}
		catch (EntityNotFoundException e) {
			System.out.println("error");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Program not found");
		}
	} 
	
	@GetMapping
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public List<Program> getPrograms(){
		return this.programService.getPrograms();
	}
	
	@PostMapping
	@PreAuthorize("hasRole('ROLE_L3')")
    public ResponseEntity<Program> createProgram(@RequestBody Program program) {
        Program createdProgram = programService.createProgram(program);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProgram);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_L3')")
    public ResponseEntity<Program> updateProgram(@PathVariable(value="id") int id, @RequestBody Program programDetails) {
        Program updatedProgram = programService.updateProgram(id, programDetails);
        return ResponseEntity.ok().body(updatedProgram);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_L3')")
    public ResponseEntity<?> deleteProgram(@PathVariable(value="id") int id) {
        programService.deleteProgram(id);
        return ResponseEntity.ok().build();
    }
	
}
