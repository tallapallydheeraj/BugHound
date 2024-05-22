package com.cecs544.bughound.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cecs544.bughound.model.Program;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Integer> {

}
