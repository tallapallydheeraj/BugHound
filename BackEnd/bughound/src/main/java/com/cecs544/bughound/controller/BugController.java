package com.cecs544.bughound.controller;

import java.net.URLConnection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cecs544.bughound.model.Bug;
import com.cecs544.bughound.repo.BugRepository;
import com.cecs544.bughound.service.BugService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/bug")
public class BugController {

	@Autowired
	private BugService bugService;
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<Object> getBug(@PathVariable Integer id) {
		try {
			Bug bug=this.bugService.findById(id);
			return ResponseEntity.status(HttpStatus.OK)
					.body(bug);
		}
		catch (EntityNotFoundException e) {
			System.out.println("error");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Bug not found");
		}
	}
	
	@GetMapping("/assignedTo/{username}")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<Object> getBugsByAssignedTo(@PathVariable String username) {
		try {
			List<Bug> bugs=this.bugService.findByAssignedTo(username);
			if(!bugs.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(bugs);
			}
			else {
				return ResponseEntity.status(HttpStatus.OK)
						.body("There are no assigned bugs.");
			}
		}
		catch (EntityNotFoundException e) {
			System.out.println("error");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Bugs not found");
		}
	}
	
	@GetMapping("/reportedBy/{username}")
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<Object> getBugsByReportedBy(@PathVariable String username) {
		try {
			List<Bug> bugs=this.bugService.findByReportedBy(username);
			if(!bugs.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(bugs);
			}
			else {
				return ResponseEntity.status(HttpStatus.OK)
						.body("You did not report any bugs yet.");
			}
		}
		catch (EntityNotFoundException e) {
			System.out.println("error");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Bugs not found");
		}
	}
	
	@GetMapping
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public List<Bug> getBugs(){
		return this.bugService.getBugs();
	}
	
	@PostMapping
	@PreAuthorize("hasRole('ROLE_L1') or hasRole('ROLE_L2') or hasRole('ROLE_L3')")
    public ResponseEntity<Bug> createBugPart1(@RequestBody Bug bug) {
        Bug createdBug = bugService.createBugPart1(bug);
        return ResponseEntity.status(HttpStatus.OK).body(createdBug);
    }
	
	@PostMapping("/create")
	@PreAuthorize("hasRole('ROLE_L2') or hasRole('ROLE_L3')")
    public ResponseEntity<Bug> createBugPart2(@RequestBody Bug bug) {
        try {
			Bug createdBug = bugService.createBugPart2(bug);
			return ResponseEntity.status(HttpStatus.OK).body(createdBug);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
    }
	
	//

	
	@PutMapping("/attachment/{id}")
	@PreAuthorize("hasRole('ROLE_L2') or hasRole('ROLE_L3')")
	public ResponseEntity<Object> uploadAttachment(@PathVariable(value="id") int id,
	                                                @RequestParam("file") MultipartFile file,
	                                                @RequestParam("filename") String filename) {
	    try {
	        Object obj =  bugService.upload(id, file, filename);
	        return ResponseEntity.status(HttpStatus.OK).body(obj);
	    } catch(Exception e) {
	        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
	    }
	}
	
	@Autowired
	private BugRepository bugRepository;
	@GetMapping("/attachment/{id}")
	@PreAuthorize("permitAll()")
	public ResponseEntity<Object> downloadFile(@PathVariable int id) {
	    Bug bug = bugRepository.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Bug not found with id " + id));
	    if (bug == null || bug.getAttachment() == null) {
	        return ResponseEntity.notFound().build();
	    }

	    byte[] fileData = bug.getAttachment();
	    String fileName = "file";
	    String contentType = "application/octet-stream";

	    // Set the file name and content type based on the file's extension
	    if (bug.getAttachment() != null) {
	        fileName = bug.getAttachmentfilename();
	        contentType = URLConnection.guessContentTypeFromName(fileName);
	        if (contentType == null) {
	            contentType = "application/octet-stream";
	        }
	    }

	    ByteArrayResource resource = new ByteArrayResource(fileData);

	    return ResponseEntity.ok()
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
	            .contentType(MediaType.parseMediaType(contentType))
	            .body(resource);
	}

	//
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_L2') or hasRole('ROLE_L3')")
    public ResponseEntity<Bug> updateBug(@PathVariable(value="id") int id, @RequestBody Bug bugDetails) {
        Bug updatedBug = bugService.updateBug(id, bugDetails);
        return ResponseEntity.ok().body(updatedBug);
    }
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_L3')")
    public ResponseEntity<?> deleteBug(@PathVariable(value="id") int id) {
        bugService.deleteBug(id);
        return ResponseEntity.ok().build();
    }
	
}
