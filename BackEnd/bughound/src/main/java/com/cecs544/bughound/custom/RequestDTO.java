package com.cecs544.bughound.custom;

import java.util.List;

public class RequestDTO {
	
	private List<SearchRequestDTO> searchRequestDto;
	
	private GlobalOperator globalOperator;
	
    public List<SearchRequestDTO> getSearchRequestDto() {
		return searchRequestDto;
	}

	public void setSearchRequestDto(List<SearchRequestDTO> searchRequestDto) {
		this.searchRequestDto = searchRequestDto;
	}

	public GlobalOperator getGlobalOperator() {
		return globalOperator;
	}

	public void setGlobalOperator(GlobalOperator globalOperator) {
		this.globalOperator = globalOperator;
	}

	public enum GlobalOperator{
        AND, OR;
    }
}
