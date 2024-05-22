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

import com.cecs544.bughound.model.Area;
import com.cecs544.bughound.service.AreaService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/area")
public class AreaController {

	@Autowired
	private AreaService areaService;
	
	@GetMapping("{id}")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<Object> getArea(@PathVariable Integer id) {
		try {
			Area area=this.areaService.findById(id);
			return ResponseEntity.status(HttpStatus.OK)
					.body(area);
		}
		catch (EntityNotFoundException e) {
			System.out.println("error");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Area not found");
		}
	}
	
	@GetMapping
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<List<Area>> getAreas(){
			return ResponseEntity.status(HttpStatus.OK)
					.body(areaService.getAreas());
	}
	
	@GetMapping("/program/{id}")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<Object> getAreasByProgramId(@PathVariable Integer id){
		try {
			List<Area> areas = areaService.getAreaByProgramId(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(areas);
		}
		catch (EntityNotFoundException e) {
			System.out.println("error");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Areas/Programs not found with the given id:"+id);
		}
	}
	
	@PostMapping
	@PreAuthorize("hasRole('ROLE_L3')")
    public ResponseEntity<Area> createArea(@RequestBody Area area) {
        Area createdArea = areaService.createArea(area);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArea);
    }
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_L3')")
    public ResponseEntity<Object> updateArea(@PathVariable(value="id") int id, @RequestBody Area areaDetails) {
        try {
			Area updatedArea = areaService.updateArea(id, areaDetails);
			return ResponseEntity.ok().body(updatedArea);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Error creating Area!");
		}
    }
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_L3')")
    public ResponseEntity<?> deleteArea(@PathVariable(value="id") int id) {
        areaService.deleteArea(id);
        return ResponseEntity.ok().build();
    }
}
