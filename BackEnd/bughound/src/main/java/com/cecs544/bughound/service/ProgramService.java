package com.cecs544.bughound.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cecs544.bughound.model.Program;
import com.cecs544.bughound.repo.ProgramRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProgramService {
	
	@Autowired
	private ProgramRepository programRepository;
	
	public Program findById(Integer id) {
		try {
			Optional<Program> program = programRepository.findById(id);
			return program.orElseThrow(()->{return new EntityNotFoundException("Program with "+id+" does not exist");});
		}catch (IllegalArgumentException e) {
			return null;
		}

	}

	public List<Program> getPrograms() {
		List<Program> programs = new ArrayList<>();
		programRepository.findAll().forEach(p->programs.add(p));
		return programs;
	}
	
	public Program createProgram(Program program) {
		program.setProgramId(-1);
        return programRepository.save(program);
    }
    
    public Program updateProgram(int id, Program programDetails) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Program not found with id " + id)); 
        if(!programDetails.getProgram_name().isBlank())
        	program.setProgram_name(programDetails.getProgram_name());
        if(!programDetails.getProgram_release().isBlank())
        	program.setProgram_release(programDetails.getProgram_release());
        if(!programDetails.getProgram_version().isBlank())
        	program.setProgram_version(programDetails.getProgram_version());
        return programRepository.save(program);
    }
    
    public void deleteProgram(int id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Program not found with id " + id));
        
        programRepository.delete(program);
    }
	
	
}
