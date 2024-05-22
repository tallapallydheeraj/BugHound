package com.cecs544.bughound.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cecs544.bughound.model.Area;
import com.cecs544.bughound.model.Program;
import com.cecs544.bughound.repo.AreaRepository;
import com.cecs544.bughound.repo.ProgramRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AreaService {

	@Autowired
	private AreaRepository areaRepository;
	
	@Autowired
	private ProgramRepository programRepository;
	
	public Area findById(Integer id) {
		
		try {
			Optional<Area> area = this.areaRepository.findById(id);
			return area.orElseThrow(()->{return new EntityNotFoundException("Area with "+id+" does not exist");});
			
		}catch (IllegalArgumentException e) {
			return null;
		}
		
	}
	
	public List<Area> getAreas(){
		List<Area> area=new ArrayList<>();
		this.areaRepository.findAll().forEach(a->area.add(a));
		return area;
	}
	
	public List<Area> getAreaByProgramId(Integer id){
		List<Area> areas = areaRepository.findByProgramProgramId(id);
		return areas;
	}
	
	public Area createArea(Area area) {
	    // Check if the associated Program exists
	    Program program = programRepository.findById(area.getProgram().getProgramId())
	            .orElseThrow(() -> new EntityNotFoundException("Program not found with id " + area.getProgram().getProgramId()));
	    
	    area.setProgram(program);
	    return areaRepository.save(area);
	}
	
	public Area updateArea(int id, Area areaDetails) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Area not found with id " + id));
        
        if(!(areaDetails.getProgram()==null))
        	area.setProgram(areaDetails.getProgram());
        area.setArea(areaDetails.getArea());
        
        return areaRepository.save(area);
    }
	
	public void deleteArea(int id) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Area not found with id " + id));
        
        areaRepository.delete(area);
    }
}
