package com.cecs544.bughound.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.cecs544.bughound.model.Bug;
import com.cecs544.bughound.model.Employee;

@Repository
public interface BugRepository extends JpaRepository<Bug, Integer>, JpaSpecificationExecutor<Bug> {

	List<Bug> findByAssignedTo(Employee assignedTo);

    List<Bug> findByReportedBy(Employee reportedBy);
}
