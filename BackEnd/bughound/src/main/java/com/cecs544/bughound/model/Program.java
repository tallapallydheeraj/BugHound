package com.cecs544.bughound.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name="program")
public class Program {
	
	@Id
	@Column(name="program_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int programId;
	@NotBlank
	@Column(name="program_name")
	private String program_name;
	@NotBlank
	@Column(name="program_release")
	private String program_release;
	@NotBlank
	@Column(name="program_version")
	private String program_version;
	public Program() {
		
	}
	public Program(int program_id, @NotBlank String program_name, @NotBlank String program_release,
			@NotBlank String program_version) {
		super();
		this.programId = program_id;
		this.program_name = program_name;
		this.program_release = program_release;
		this.program_version = program_version;
	}
	public int getProgramId() {
		return programId;
	}
	public void setProgramId(int program_id) {
		this.programId = program_id;
	}
	public String getProgram_name() {
		return program_name;
	}
	public void setProgram_name(String program_name) {
		this.program_name = program_name;
	}
	public String getProgram_release() {
		return program_release;
	}
	public void setProgram_release(String program_release) {
		this.program_release = program_release;
	}
	public String getProgram_version() {
		return program_version;
	}
	public void setProgram_version(String program_version) {
		this.program_version = program_version;
	}
	@Override
	public String toString() {
		return "Program [program_id=" + programId + ", program_name=" + program_name + ", program_release="
				+ program_release + ", program_version=" + program_version + "]";
	}
	
	
}
