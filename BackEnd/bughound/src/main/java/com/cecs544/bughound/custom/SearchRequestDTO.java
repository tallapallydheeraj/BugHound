package com.cecs544.bughound.custom;

public class SearchRequestDTO {
	
	String column;
    String value;
    Operation operation;
    String joinTable;

    public enum Operation{
        EQUAL, LIKE, IN, GREATER_THAN, LESS_THAN, BETWEEN, JOIN;
    }

	public String getColumn() {
		return column;
	}

	public void setColumn(String column) {
		this.column = column;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Operation getOperation() {
		return operation;
	}

	public void setOperation(Operation operation) {
		this.operation = operation;
	}

	public String getJoinTable() {
		return joinTable;
	}

	public void setJoinTable(String joinTable) {
		this.joinTable = joinTable;
	}
    
    
    
    
}
