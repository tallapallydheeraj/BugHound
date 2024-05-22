package com.cecs544.bughound.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.cecs544.bughound.custom.RequestDTO;
import com.cecs544.bughound.custom.SearchRequestDTO;
import com.cecs544.bughound.model.Employee;
import com.cecs544.bughound.model.Program;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class FilterSpecification<T> {

    public Specification<T> getSearchSpecification(SearchRequestDTO searchRequestDto) {

        return new Specification<T>() {
            @Override
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(searchRequestDto.getColumn()), searchRequestDto.getValue());
            }
        };

    }

    public Specification<T> getSearchSpecification(List<SearchRequestDTO> searchRequestDtos, RequestDTO.GlobalOperator globalOperator) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            for(SearchRequestDTO requestDto : searchRequestDtos){

                switch (requestDto.getOperation()){

                case EQUAL:
                    if ("program_id".equals(requestDto.getColumn())) {
                        Join<T, Program> programJoin = root.join("program");
                        predicates.add(criteriaBuilder.equal(programJoin.get("programId"), Integer.parseInt(requestDto.getValue())));
                    } 
                    else if("reported_by".equals(requestDto.getColumn())){
                            Join<T, Employee> programJoin = root.join("reportedBy");
                            predicates.add(criteriaBuilder.equal(programJoin.get("emp_id"), Integer.parseInt(requestDto.getValue())));
                        
                    }
                    else if("assigned_to".equals(requestDto.getColumn())){
                        Join<T, Employee> programJoin = root.join("assignedTo");
                        predicates.add(criteriaBuilder.equal(programJoin.get("emp_id"), Integer.parseInt(requestDto.getValue())));
                    
                }
                    else if("resolved_by".equals(requestDto.getColumn())){
                        Join<T, Employee> programJoin = root.join("resolvedBy");
                        predicates.add(criteriaBuilder.equal(programJoin.get("emp_id"), Integer.parseInt(requestDto.getValue())));
                    
                }
                    else if("tested_by".equals(requestDto.getColumn())){
                        Join<T, Employee> programJoin = root.join("testedBy");
                        predicates.add(criteriaBuilder.equal(programJoin.get("emp_id"), Integer.parseInt(requestDto.getValue())));
                    
                }
                    else {
                        predicates.add(criteriaBuilder.equal(root.get(requestDto.getColumn()), requestDto.getValue()));
                    }
                    break;

                    case LIKE:
                        Predicate like = criteriaBuilder.like(root.get(requestDto.getColumn()), "%"+requestDto.getValue()+"%");
                        predicates.add(like);
                        break;

                    case IN:
                        String[] split = requestDto.getValue().split(",");
                        if ("program_id".equals(requestDto.getColumn())) {
                            Join<T, Program> programJoin = root.join("program");
                            List<Integer> programIds = Arrays.stream(split).map(Integer::parseInt).collect(Collectors.toList());
                            predicates.add(programJoin.get("programId").in(programIds));
                        } else if ("reported_by".equals(requestDto.getColumn())) {
                            Join<T, Employee> employeeJoin = root.join("reportedBy");
                            List<Integer> employeeIds = Arrays.stream(split).map(Integer::parseInt).collect(Collectors.toList());
                            predicates.add(employeeJoin.get("emp_id").in(employeeIds));
                        } else if ("assigned_to".equals(requestDto.getColumn())) {
                            Join<T, Employee> employeeJoin = root.join("assignedTo");
                            List<Integer> employeeIds = Arrays.stream(split).map(Integer::parseInt).collect(Collectors.toList());
                            predicates.add(employeeJoin.get("emp_id").in(employeeIds));
                        } else if ("resolved_by".equals(requestDto.getColumn())) {
                            Join<T, Employee> employeeJoin = root.join("resolvedBy");
                            List<Integer> employeeIds = Arrays.stream(split).map(Integer::parseInt).collect(Collectors.toList());
                            predicates.add(employeeJoin.get("emp_id").in(employeeIds));
                        } else if ("tested_by".equals(requestDto.getColumn())) {
                            Join<T, Employee> employeeJoin = root.join("testedBy");
                            List<Integer> employeeIds = Arrays.stream(split).map(Integer::parseInt).collect(Collectors.toList());
                            predicates.add(employeeJoin.get("emp_id").in(employeeIds));
                        } else {
                            predicates.add(root.get(requestDto.getColumn()).in(Arrays.asList(split)));
                        }
                        break;


                    case GREATER_THAN:
                        Predicate greaterThan = criteriaBuilder.greaterThan(root.get(requestDto.getColumn()), requestDto.getValue());
                        predicates.add(greaterThan);
                        break;

                    case LESS_THAN:
                        Predicate lessThan = criteriaBuilder.lessThan(root.get(requestDto.getColumn()), requestDto.getValue());
                        predicates.add(lessThan);
                        break;

                    case BETWEEN:
                        String[] split1 = requestDto.getValue().split(",");
                        Predicate between = criteriaBuilder.between(root.get(requestDto.getColumn()), Long.parseLong(split1[0]),Long.parseLong( split1[1]));
                        predicates.add(between);
                        break;

                    default:
                        throw new IllegalStateException("Unexpected value: " + "");
                }

            }

            if(globalOperator.equals(RequestDTO.GlobalOperator.AND)) {
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }else{
                return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
            }
        };
    }

}