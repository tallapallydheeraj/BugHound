package com.cecs544.bughound.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cecs544.bughound.custom.RequestDTO;
import com.cecs544.bughound.model.Bug;
import com.cecs544.bughound.repo.BugRepository;
import com.cecs544.bughound.service.FilterSpecification;


@RestController
@CrossOrigin(origins = "*")
public class SearchAndFilteringController {

	@Autowired
    private BugRepository bugRepository;
	
	@Autowired
    private FilterSpecification<Bug> bugFilterSpecService;
	
	@PostMapping("/specification")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
    public ResponseEntity<Object> getBugs(@RequestBody RequestDTO requestDto) {
		
        try {
			Specification<Bug> searchSpecification = bugFilterSpecService
			        .getSearchSpecification(requestDto.getSearchRequestDto(), requestDto.getGlobalOperator());
			return ResponseEntity.status(HttpStatus.OK)
					.body(bugRepository.findAll(searchSpecification));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(e.getMessage());
		}
    }
	
}
