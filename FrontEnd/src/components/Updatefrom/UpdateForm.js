import React, { useState, useEffect } from "react";
import Program from "./Program";
import ReportType from "./ReportType";
import Severity from "./Severity";
import Reproducible from "./Reproducible";
import ProblemSummary from "./ProblemSummary";
import Problem from "./Problem";
import SuggestedFix from "./SuggestedFix";

import ReportedBy from "./ReportedBy";
import ReportedDate from "./ReportedDate";
import FunctionalArea from "./FunctionalArea";
import AssignedTo from "./AssignedTo";
import Comments from "./Comments";
import Status from "./Status";

import Priority from "./Priority";
import Resolution from "./Resolution";
import ResolutionVersion from "./ResolutionVersion";
import ResolvedBy from "./ResolvedBy";
import ResolvedDate from "./ResolvedDate";
import TestedBy from "./TestedBy";
import TestedDate from "./TestedDate";

import Deffered from "./Deffered";
import AttachFile from "./AttachFile";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const UpdateForm = () => {
  const location = useLocation();
  const {existingData} = location.state || {};
  console.log("ED"+JSON.stringify(existingData))
  const [formData, setFormData] = useState({
    program:existingData.program.program_name+"/"+existingData.program.program_release+"/"+existingData.program.program_version,
    report_type: "",
    severity: existingData.severity,
    problem_summary: existingData ? existingData.problem_summary : "",
    problem: existingData ? existingData.problem : "",
    reproducible: existingData ? existingData.reproducible : "",
    suggested_fix: existingData ? existingData.suggested_fix : "",
    reportedBy: existingData ? existingData.reportedBy : "",
    reported_date: existingData ? existingData.reported_date : "",
    functional_area: existingData ? existingData.functional_area : "",
    assignedTo: existingData ? existingData.assignedTo : "",
    comments: existingData ? existingData.comments : "",
    status: existingData ? existingData.status : "",
    priority: existingData ? existingData.priority : "",
    resolution: existingData ? existingData.resolution : "",
    resolution_version: existingData ? existingData.resolution_version : "",
    resolvedBy: existingData ? existingData.resolvedBy : "",
    resolved_date: existingData ? existingData.resolved_date : "",
    testedBy: existingData ? existingData.testedBy : "",
    tested_date: existingData ? existingData.tested_date : "",
    treat_as_deferred: existingData ? existingData.treat_as_deferred : "",
  });

  console.log("FOrmData"+ JSON.stringify(formData))

  /*useEffect(() => {
    if (existingData) {
      setFormData(existingData);
      console.log("FOrmData"+ JSON.stringify(formData))
      
      //console.log(JSON.stringify(myObject));
    }
  }, []);*/
  
  const createOrUpdate = async () => {
    // Your createOrUpdate logic here

    // Update the form data with the newly entered values
    // For example:
    const updatedFormData = {
      ...formData,
      // Update fields with newly entered values
    };
    setFormData(updatedFormData);
  };

  function update(){
    const updateFormData = {
      "program": {
        "programId": existingData.program.programId,
      },
      "report_type": existingData.report_type,
      "severity": existingData.severity,
      "problem_summary": existingData.problem_summary,
      "problem": existingData.problem,
      "reproducible": existingData.reproducible,
      "suggested_fix": existingData.suggested_fix,
      "reportedBy": {
        
        "emp_id": existingData.reportedBy.emp_id,
      },
      "reported_date": existingData.reported_date,
      "functional_area": existingData.functional_area,
      "assignedTo": {
        
        "emp_id": existingData.assignedTo!==null?existingData.assignedTo.emp_id:null
      },
      "comments": existingData.comments,
      "status": existingData.status,
      "priority": existingData.priority,
      "resolution": existingData.resolution,
      "resolution_version": existingData.resolution_version,
      "resolvedBy": {
        "emp_id": existingData.resolvedBy!==null?existingData.resolvedBy.emp_id:null
      },
      "resolved_date": existingData.resolved_date,
      "testedBy": {
        "emp_id": existingData.testedBy!==null?existingData.testedBy.emp_id:null
      },
      "tested_date": existingData.tested_date,
      "treat_as_deferred": existingData.deffered,
    }
    console.log(updateFormData)
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-8">Bug Report Form</h1>
      <Program programNames={formData.program} />
      <ReportType value={formData.report_type} />
      <Severity severityname={formData.severity}/>
      <Reproducible value={formData.reproducible}/>
      <ProblemSummary pvalue={formData.problem_summary} />
      <Problem prvalue={formData.problem}/>
      <SuggestedFix value={formData.suggested_fix}/>
      <ReportedBy reportedbyvalue={formData.reportedBy} userrole={useSelector(store=>store.user.loggedinUserDetails.role)} empNames ={ useSelector((store) => store.user.empDetails)}/>
      <ReportedDate reporteddate={formData.reported_date}/>
      <FunctionalArea fun_area_value={formData.functional_area}/>
      <AssignedTo assignedTo_value={formData.assignedTo}/>
      <Comments comments_value={formData.comments}/>
      <Status statusValue={formData.status}/>
      <Priority priorityValue={formData.priority}/>
      <Resolution resolutionValue={formData.resolution}/>
      <ResolutionVersion resolutionVersionValue={formData.resolution_version}/>
      <ResolvedBy resolvedByValue={formData.resolvedBy} />
      <ResolvedDate resolved_date={formData.resolved_date}/>
      <TestedBy value={formData.testedBy}/>
      <TestedDate tested_date={formData.tested_date}/>
      <Deffered value={formData.treat_as_deferred}/>
      <AttachFile />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        onClick={update}
      >
         Update
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        //onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateForm;
