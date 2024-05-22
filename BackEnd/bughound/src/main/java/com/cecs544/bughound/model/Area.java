package com.cecs544.bughound.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name="area")
public class Area {
	
	@Id
	@Column(name="area_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int area_id;
	@ManyToOne
	@JoinColumn(name="program_id")
	private Program program;
	@NotBlank
	@Column(name="area")
	private String area;
	
	public Area() {

	}
	public Area(int area_id, Program program, String area) {
		this.area_id = area_id;
		this.program = program;
		this.area = area;
	}
	public int getArea_id() {
		return area_id;
	}
	public void setArea_id(int area_id) {
		this.area_id = area_id;
	}
	
	public Program getProgram() {
		return program;
	}
	public void setProgram(Program program) {
		this.program = program;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	@Override
	public String toString() {
		return "Area [area_id=" + area_id + ", program=" + program + ", area=" + area + "]";
	}
	
	
}
