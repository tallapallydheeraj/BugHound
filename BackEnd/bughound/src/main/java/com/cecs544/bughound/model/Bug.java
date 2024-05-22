package com.cecs544.bughound.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="bug")
public class Bug {
	
	@Id
	@Column(name="bug_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int bug_id;
	@ManyToOne
	@JoinColumn(name="program_id")
	private Program program;
	@Column(name="report_type")
	private String report_type;
	@Column(name="severity")
	private String severity;
	@Column(name="problem_summary")
	private String problem_summary;
	@Column(name="problem")
	private String problem;
	@Column(name="reproducible")
	private String reproducible;
	@Column(name="suggested_fix")
	private String suggested_fix;
	@ManyToOne
	@JoinColumn(name="reported_by")
	private Employee reportedBy;
	@Column(name="reported_date")
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date reported_date;
	@Column(name="functional_area")
	private String functional_area;
	@ManyToOne
	@JoinColumn(name="assigned_to")
	private Employee assignedTo;
	@Column(name="comments")
	private String comments;
	@Column(name="status")
	private String status;
	@Column(name="priority")
	private String priority;
	@Column(name="resolution")
	private String resolution;
	@Column(name="resolution_version")
	private String resolution_version;
	@ManyToOne
	@JoinColumn(name="resolved_by")
	private Employee resolvedBy;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date resolved_date;
	@ManyToOne
	@JoinColumn(name="tested_by")
	private Employee testedBy;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date tested_date;
	@Column(name="treat_as_deferred")
	private String treat_as_deferred;
	@Column(name = "attachment")
	private byte[] attachment;
	@Column(name="attachmentfilename")
	private String attachmentfilename;
	
	
	@Override
	public String toString() {
		return "Bug [bug_id=" + bug_id + ", program=" + program + ", report_type=" + report_type + ", severity="
				+ severity + ", problem_summary=" + problem_summary + ", problem=" + problem + ", reproducible="
				+ reproducible + ", suggested_fix=" + suggested_fix + ", reported_by=" + reportedBy
				+ ", reported_date=" + reported_date + ", functional_area=" + functional_area + ", assigned_to="
				+ assignedTo + ", comments=" + comments + ", status=" + status + ", priority=" + priority
				+ ", resolution=" + resolution + ", resolution_version=" + resolution_version + ", resolved_by="
				+ resolvedBy + ", resolved_date=" + resolved_date + ", tested_by=" + testedBy + ", tested_date="
				+ tested_date + ", treat_as_deferred=" + treat_as_deferred + "]";
	}
	public Bug() {
		
	}
	
	public int getBug_id() {
		return bug_id;
	}
	public void setBug_id(int bug_id) {
		this.bug_id = bug_id;
	}
	public Program getProgram() {
		return program;
	}
	public void setProgram(Program program) {
		this.program = program;
	}
	public String getReport_type() {
		return report_type;
	}
	public void setReport_type(String report_type) {
		this.report_type = report_type;
	}
	public String getSeverity() {
		return severity;
	}
	public void setSeverity(String severity) {
		this.severity = severity;
	}
	public String getProblem_summary() {
		return problem_summary;
	}
	public void setProblem_summary(String problem_summary) {
		this.problem_summary = problem_summary;
	}
	public String getProblem() {
		return problem;
	}
	public void setProblem(String problem) {
		this.problem = problem;
	}
	public String getReproducible() {
		return reproducible;
	}
	public void setReproducible(String reproducible) {
		this.reproducible = reproducible;
	}
	public String getSuggested_fix() {
		return suggested_fix;
	}
	public void setSuggested_fix(String suggested_fix) {
		this.suggested_fix = suggested_fix;
	}
	public Employee getReportedBy() {
		return reportedBy;
	}
	public void setReportedBy(Employee reported_by) {
		this.reportedBy = reported_by;
	}
	public Date getReported_date() {
		return reported_date;
	}
	public void setReported_date(Date reported_date) {
		this.reported_date = reported_date;
	}
	public String getFunctional_area() {
		return functional_area;
	}
	public void setFunctional_area(String functional_area) {
		this.functional_area = functional_area;
	}
	public Employee getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(Employee assigned_to) {
		this.assignedTo = assigned_to;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getResolution() {
		return resolution;
	}
	public void setResolution(String resolution) {
		this.resolution = resolution;
	}
	public String getResolution_version() {
		return resolution_version;
	}
	public void setResolution_version(String resolution_version) {
		this.resolution_version = resolution_version;
	}
	public Employee getResolvedBy() {
		return resolvedBy;
	}
	public void setResolvedBy(Employee resolved_by) {
		this.resolvedBy = resolved_by;
	}
	public Date getResolved_date() {
		return resolved_date;
	}
	public void setResolved_date(Date resolved_date) {
		this.resolved_date = resolved_date;
	}
	public Employee getTestedBy() {
		return testedBy;
	}
	public void setTestedBy(Employee tested_by) {
		this.testedBy = tested_by;
	}
	public Date getTested_date() {
		return tested_date;
	}
	public void setTested_date(Date tested_date) {
		this.tested_date = tested_date;
	}
	public String getTreat_as_deferred() {
		return treat_as_deferred;
	}
	public void setTreat_as_deferred(String treat_as_deferred) {
		this.treat_as_deferred = treat_as_deferred;
	}
	public byte[] getAttachment() {
		return attachment;
	}
	public void setAttachment(byte[] attachment) {
		this.attachment = attachment;
	}
	public String getAttachmentfilename() {
		return attachmentfilename;
	}
	public void setAttachmentfilename(String attachmentfilename) {
		this.attachmentfilename = attachmentfilename;
	}
	
	

}
