package com.cecs544.bughound.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cecs544.bughound.model.Area;

@Repository
public interface AreaRepository extends JpaRepository<Area, Integer> {
		
	List<Area> findByProgramProgramId(int program_id);
}
