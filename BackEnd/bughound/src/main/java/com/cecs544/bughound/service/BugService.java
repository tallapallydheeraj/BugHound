package com.cecs544.bughound.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cecs544.bughound.model.Bug;
import com.cecs544.bughound.model.Employee;
import com.cecs544.bughound.repo.BugRepository;
import com.cecs544.bughound.repo.EmployeeRepository;
import com.cecs544.bughound.repo.ProgramRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BugService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private BugRepository bugRepository;
	
	@Autowired
	private ProgramRepository programRepository;
	
	public Bug findById(Integer id) {
		try {
			Optional<Bug> bug = bugRepository.findById(id);
			return bug.orElseThrow(()->{return new EntityNotFoundException("Bug with "+id+" does not exist");});
		}catch (IllegalArgumentException e) {
			return null;
		}

	}

	public List<Bug> findByAssignedTo(String assignedTo){
		Optional<Employee> employee = employeeRepository.findByUsername(assignedTo);
		if(Optional.of(employee).isPresent()) {
			return bugRepository.findByAssignedTo(employee.get());
		}
		return null;
	}
	
	public List<Bug> findByReportedBy(String reportedBy){
		Optional<Employee> employee = employeeRepository.findByUsername(reportedBy);
		if(Optional.of(employee).isPresent()) {
			return bugRepository.findByReportedBy(employee.get());
		}
		return null;
	}
	
	public List<Bug> getBugs() {
		List<Bug> bugs = new ArrayList<>();
		bugRepository.findAll().forEach(b->bugs.add(b));
		return bugs;
	}
	
	public Bug createBugPart1(Bug bug) {
		Bug newBug = new Bug();
		newBug.setProgram(programRepository.findById(bug.getProgram().getProgramId()).get());
		newBug.setReport_type(bug.getReport_type());
		newBug.setSeverity(bug.getSeverity());
		newBug.setProblem_summary(bug.getProblem_summary());
		newBug.setProblem(bug.getProblem());
		newBug.setReproducible(bug.getReproducible());
		newBug.setSuggested_fix(bug.getSuggested_fix());
		newBug.setReportedBy(employeeRepository.findById(bug.getReportedBy().getEmp_id()).get());
		if(!Objects.isNull(bug.getReported_date()))
		newBug.setReported_date(new Date(bug.getReported_date().toString()));
        return bugRepository.save(bug);
    }
	
	/*public Bug createBugPart2(Bug bug) {
		Bug newBug = new Bug();
		newBug.setProgram(programRepository.findById(bug.getProgram().getProgramId()).get());
		newBug.setReport_type(bug.getReport_type());
		newBug.setSeverity(bug.getSeverity());
		newBug.setProblem_summary(bug.getProblem_summary());
		newBug.setProblem(bug.getProblem());
		newBug.setReproducible(bug.getReproducible());
		newBug.setSuggested_fix(bug.getSuggested_fix());
		newBug.setReportedBy(employeeRepository.findById(bug.getReportedBy().getEmp_id()).get());
		if(!Objects.isNull(bug.getReported_date()))
			newBug.setReported_date(new Date(bug.getReported_date().toString()));
		newBug = fillBugDetails(bug, newBug);
		if(bug.getAttachment()!=null) {
		newBug.setAttachment(Base64.getDecoder().decode(bug.getAttachment()));
        newBug.setAttachmentfilename(bug.getAttachmentfilename());}
        return bugRepository.save(newBug);
    }*/
	
	public Bug createBugPart2(Bug bug) {
		Bug newBug = new Bug();
		newBug.setProgram(programRepository.findById(bug.getProgram().getProgramId()).get());
		newBug.setReport_type(bug.getReport_type());
		newBug.setSeverity(bug.getSeverity());
		newBug.setProblem_summary(bug.getProblem_summary());
		newBug.setProblem(bug.getProblem());
		newBug.setReproducible(bug.getReproducible());
		newBug.setSuggested_fix(bug.getSuggested_fix());
		newBug.setReportedBy(employeeRepository.findById(bug.getReportedBy().getEmp_id()).get());
		if(null != bug.getReported_date())
			newBug.setReported_date(new Date(bug.getReported_date().toString()));
		newBug = fillBugDetails(bug, newBug);
        return bugRepository.save(newBug);
    }

    
    public Bug updateBug(int id, Bug bugDetails) {
        Bug oldBug = bugRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bug not found with id " + id)); 
        Bug newBug = oldBug;
        newBug.setBug_id(oldBug.getBug_id());
        newBug.setReportedBy(oldBug.getReportedBy());
        newBug.setReported_date(oldBug.getReported_date());
        newBug = fillBugDetails(bugDetails, newBug);
        return bugRepository.save(newBug);
    }
    
    public void deleteBug(int id) {
        Bug bug = bugRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bug not found with id " + id));
        
        bugRepository.delete(bug);
    }
    
    public Bug fillBugDetails(Bug newBug, Bug bugDetails){
    	bugDetails.setFunctional_area(newBug.getFunctional_area());
    	bugDetails.setComments(newBug.getComments());
    	bugDetails.setStatus(newBug.getStatus());
    	bugDetails.setPriority(newBug.getPriority());
    	bugDetails.setSuggested_fix(newBug.getSuggested_fix());
    	if(newBug.getReportedBy()!=null && newBug.getReportedBy().getEmp_id()!=0)
    		bugDetails.setReportedBy(employeeRepository.findById(newBug.getReportedBy().getEmp_id()).get());
    	if(null != newBug.getResolution())
    		bugDetails.setResolution(newBug.getResolution());
    	if(null != newBug.getResolution_version())
    		bugDetails.setResolution_version(newBug.getResolution_version());
    	if(newBug.getResolvedBy()!=null && newBug.getResolvedBy().getEmp_id()!=0)
    		bugDetails.setResolvedBy(employeeRepository.findById(newBug.getResolvedBy().getEmp_id()).get());
    	if(null != newBug.getResolved_date())
    		bugDetails.setResolved_date(new Date(newBug.getResolved_date().toString()));
    	bugDetails.setTreat_as_deferred(newBug.getTreat_as_deferred());
    	if(newBug.getAssignedTo()!=null && newBug.getAssignedTo().getEmp_id()!=0)
    		bugDetails.setAssignedTo(employeeRepository.findById(newBug.getAssignedTo().getEmp_id()).get());
    	if(newBug.getTestedBy()!=null && newBug.getTestedBy().getEmp_id()!=0)
    		bugDetails.setTestedBy(employeeRepository.findById(newBug.getTestedBy().getEmp_id()).get());
    	if(null != newBug.getTested_date())
    		bugDetails.setTested_date(new Date(newBug.getTested_date().toString()));
    	return bugDetails;
    }
    //
    public Object upload(int id, MultipartFile file, String filename) {
        Bug bug = bugRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bug not found with id " + id));
        try {
        	if(file!=null) {
            bug.setAttachment(file.getBytes());
            bug.setAttachmentfilename(filename);
        	}
        } catch (IOException e) {
            return "File upload unsuccessful!";
        }
        return bugRepository.save(bug);
    }
	//
}
