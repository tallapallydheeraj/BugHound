import React, { useState, useEffect, useRef } from "react";
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
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addFunctionalAreaByProgramId } from "../utils/areaSlice";

const UpdateForm = () => {
  const token = useSelector(store => store.user.loggedinUserDetails.jwt);
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const empName = useSelector(store => store.user.loggedinUserDetails.employeeName);
  const empNames = useSelector(store => store.user.empDetails);
  const location = useLocation();
  const {existingData} = location.state || {};
  console.log("ED"+JSON.stringify(existingData))

  async function getFunctionalAreaOptions(id) {

    const API_URL = "http://localhost:8080/area/program/" + id

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': "Bearer " + token
      }
    };

    const data = await fetch(API_URL, requestOptions);
    const json = await data.json();
    dispatch(addFunctionalAreaByProgramId(json))

  }

  const functional_Areas = useSelector(store => store.area.functionalAreas)
  const ref_program = useRef(null);
  const ref_report_type = useRef(null);
  const ref_severity = useRef(null);
  const ref_reproducible = useRef(false);
  const ref_problem_Summary = useRef(null);
  const ref_problem_description = useRef(null);
  const ref_suggested_fix = useRef(null);
  const ref_reported_by = useRef(null);
  const ref_date = useRef(null);
  const ref_fa_type = useRef(null)
  const ref_assigned_to = useRef(null)
  const ref_comments = useRef(null)
  const ref_status = useRef(null)
  const ref_priority = useRef(null)
  const ref_resolution = useRef(null)
  const ref_resolution_version = useRef(null)
  const ref_resolved_by = useRef(null)
  const ref_tested_by = useRef(null)
  const ref_resolved_date = useRef(null)
  const ref_tested_date = useRef(null)
  const ref_deffered = useRef(null)
  const ref_attachment = useRef(null)
  const [formData, setFormData] = useState({
    program:existingData.program.program_name+"/"+existingData.program.program_release+"/"+existingData.program.program_version,
    report_type: existingData.report_type,
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
  
  //const createOrUpdate = async () => {
    // Your createOrUpdate logic here

    // Update the form data with the newly entered values
    // For example:
    /*const updatedFormData = {
      ...formData,
      // Update fields with newly entered values
    };
    setFormData(updatedFormData);*/
  //};

  async function update(){

    console.log("00000"+ref_suggested_fix.current.value)
   /* const updateFormData = {
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
    }*/
    const updateFormData= {
      "program": {
        "programId": ref_program.current.value,
      },
      "report_type": ref_report_type.current.value,
      "severity": ref_severity.current.value,
      "problem_summary": ref_problem_Summary.current.value,
      "problem": ref_problem_description.current.value,
      "reproducible":"Yes",
      "suggested_fix": ref_suggested_fix.current.value,
      "reportedBy": {
        "emp_id": ref_reported_by.current.value,
      },
      "reported_date": ref_date.current.value,
      "functional_area": ref_fa_type.current.value,
      "assignedTo": {
        "emp_id": ref_assigned_to.current.value
      },
      "comments": ref_comments.current.value,
      "status": ref_status.current.value,
      "priority": ref_priority.current.value,
      "resolution": ref_resolution.current.value,
      "resolution_version": ref_resolution_version.current.value,
      "resolvedBy": {
        "emp_id": ref_resolved_by.current.value
      },
      "resolved_date": ref_resolved_date.current.value,
      "testedBy": {
        "emp_id": ref_tested_by.current.value
      },
      "tested_date": ref_tested_date.current.value,
      "treat_as_deferred": "Yes",
    }
    console.log("Update_data"+JSON.stringify(updateFormData))

    const putOptions = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
      },
      body: JSON.stringify(updateFormData)
  };
  const URL = "http://localhost:8080/bug/" + existingData.bug_id
        const response = await fetch(URL, putOptions);
        const json = await response.json();
        console.log("Updated JSON"+JSON.stringify(json))
        if (response.ok) {
          console.log(json);
          alert("Bug Report Creation Successful!");
          console.log(ref_attachment)
          if (ref_attachment.current.value!=="") {
            const attachmentform = new FormData();
            attachmentform.append('file', ref_attachment.current.files[0]);
            attachmentform.append('filename', ref_attachment.current.files[0].name);
            const requestOptions = {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer " + token,
              },
              body: attachmentform
            };
    
            let apiUrl = "http://localhost:8080/bug/attachment/" + existingData.bug_id;
            const result = await fetch(apiUrl, requestOptions);
            result.ok ? alert("File Upload Successful!") : alert("File Upload UnSuccessful!");
          }
          resetForm();
        }
  }
  const program_names = useSelector(store => store.tables.programTable_Data)
  const today = new Date().toLocaleDateString('en-US');
  const userrole = useSelector(store => store.user.loggedinUserDetails.role);
  const resetForm = () => {
    
    ref_program.current.value = "";
    ref_report_type.current.value = "";
    ref_severity.current.value = "";
    ref_reproducible.current.checked = false;
    ref_problem_Summary.current.value = "";
    ref_problem_description.current.value = "";
    ref_suggested_fix.current.value = "";
    ref_reported_by.current.value = empName;
    ref_date.current.value = today;

    if (userrole !== "ROLE_L1") {
      ref_fa_type.current.value = ""
      ref_assigned_to.current.value = ""
      ref_comments.current.value = ""
      ref_status.current.value = ""
      ref_priority.current.value = ""
      ref_resolution.current.value = ""
      ref_resolution_version.current.value = ""
      ref_resolved_by.current.value = ""
      ref_tested_by.current.value = ""
      ref_resolved_date.current.value = today
      ref_tested_date.current.value = today
      ref_deffered.current.value = ""
    }
    navigate(-1);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  console.log(existingData.reported_date);

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); update(); }}
        className="bg-slate-200 w-3/4 mx-auto p-6 rounded-lg shadow-lg space-y-6 relative top-16">
        <h1 className="text-2xl font-bold text-center text-gray-700">Update your Bug Here!</h1>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Program:</label>
            <select ref={ref_program} required onChange={(e) => { getFunctionalAreaOptions(e.target.value) }}  className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              
             {existingData.program!==null?<option value={existingData.program.programId} selected>{existingData.program.program_name}/ {existingData.program.program_release} /{existingData.program.program_version}</option>:<option value="" disabled selected>Select Program</option>}
              {program_names.map(program => <option value={program.programId}>{program.program_name}/ {program.program_release} /{program.program_version}</option>)}
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Report Type:</label>
            <select ref={ref_report_type} required className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            {existingData.report_type!==null?<option value={existingData.report_type} selected>{existingData.report_type}</option>:<option value="" disabled selected>Select Report type</option>}

              
              <option value="Coding Error">Coding Error</option>
              <option value="Design Issue">Design Issue</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Documentation">Documentation</option>
              <option value="Hardware">Hardware</option>
              <option value="Query">Query</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Severity:</label>
            <select ref={ref_severity} required className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {existingData.severity!==null ?<option value={existingData.severity}  selected>{existingData.severity}</option>:<option value="" disabled selected>Severity</option>}
              <option value="Fatal">Fatal</option>
              <option value="Serious">Serious</option>
              <option value="Minor">Minor</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="reproducible"
              name="reproducible"
              checked="false"
              
              className="form-checkbox h-5 w-5 text-blue-600"
              ref={ref_reproducible}
            />
            <label htmlFor="reproducible" className="ml-2 text-sm font-medium text-gray-700">
              Reproducible
            </label>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Problem Summary:</label>
              
           
            <textarea ref={ref_problem_Summary}
              className="form-textarea mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              placeholder="Enter problem summary here"
              defaultValue={existingData.problem_summary!==""?existingData.problem_summary:null}
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Problem:</label>
            <textarea ref={ref_problem_description}empNames
              className="form-textarea mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              placeholder="Enter problem here"
              defaultValue={existingData.problem!==""?existingData.problem:null}
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Suggested Fix:</label>
            <input defaultValue={existingData.suggested_fix!==""?existingData.suggested_fix:null} ref={ref_suggested_fix} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" placeholder="Enter your suggestion here" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Reported By:</label>
            {
              userrole === "ROLE_L3" || "ROLE_L2" ? <select ref={ref_reported_by} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
               {existingData.reportedBy!==null?<option value={existingData.reportedBy.emp_id} >{existingData.reportedBy.employee_name}</option>:<option value="" disabled selected></option>} 
                {empNames.map(emp => <option value={emp.emp_id}>{emp.employee_name}</option>)}
              </select>
                :
                <input ref={ref_reported_by} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" value={existingData.reported_date} />

            }

          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5"> Reported Date:</label>
            <input ref={ref_date} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="date" min="01-01-2000" max="12-12-2999" value={existingData.reported_date ? existingData.reported_date : ''} />
          </div>
        </div>
        {userrole === "ROLE_L1" ? null : <span className="relative top-5">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Functional Area:</label>
              <select ref={ref_fa_type} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {existingData.functional_area!==null?<option value="" selected>{existingData.functional_area}</option>:<option value="" disabled selected></option>}
                {functional_Areas && functional_Areas.map(fa => <option value={fa.area}>{fa.area}</option>)}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Assigned To:</label>
              <select ref={ref_assigned_to} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {existingData.assignedTo!==null?<option value="" selected>{existingData.assignedTo.employee_name}</option>:<option value="" disabled selected></option>}
    
                {empNames.map(emp => <option value={emp.emp_id}>{emp.employee_name}</option>)}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Comments:</label>
              <input defaultValue={existingData.comments!==null?existingData.comments:null} ref={ref_comments} type="text" placeholder="Provide your comments here..." className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Status:</label>
              <select ref={ref_status} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {existingData.status=="Open"?<option value="Open" selected>Open</option>:<option value="Closed" selected>Closed</option>}
                <option value="Open" selected>Open</option>
                <option value="Closed">Closed</option>

              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Priority:</label>
              <select ref={ref_priority} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {existingData.priority!==null?<option value="" selected>{existingData.priority}</option>:<option value="" disabled selected></option>}
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Resolution:</label>
              <select ref={ref_resolution} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {existingData.resolution!==null?<option value={existingData.resolution} selected>{existingData.resolution}</option>:<option value="" disabled selected></option>}
                
                
                <option>Pending</option>
                <option>Fixed</option>
                <option>Irreproducible</option>
                <option>Deffered</option>
                <option>As Designed</option>
                <option>Cant be fixed</option>
                <option>Withdrawn By Reporter</option>
                <option>Need more Info</option>
                <option>Disagree with Suggestion</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Resolution Version:</label>
              <input defaultValue={existingData.resolution_version!==null?existingData.resolution_version:null} ref={ref_resolution_version} type="text" className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Resolved By:</label>
              <select ref={ref_resolved_by} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {existingData.resolvedBy!==null?<option value={existingData.resolvedBy.emp_id} selected>{existingData.resolvedBy.employee_name}</option>:<option value="" disabled selected></option>}
                {empNames.map(emp => <option value={emp.emp_id}>{emp.employee_name}</option>)}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Resolved Date:</label>
              <input ref={ref_resolved_date} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="date" min="2020-01-01" max="2024-12-31" defaultValue={existingData.resolved_date!==null?existingData.resolved_date:null} />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Tested By:</label>
              <select ref={ref_tested_by} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {existingData.testedBy!==null?<option value={existingData.testedBy.emp_id}  selected>{existingData.testedBy.employee_name}</option>:<option value="" disabled selected></option>}
                
                {empNames.map(emp => <option value={emp.emp_id}>{emp.employee_name}</option>)}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Tested Date:</label>
              <input ref={ref_tested_date} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="date" min="2020-01-01" max="2024-12-31"  defaultValue={existingData.tested_date!==null?existingData.tested_date:null} />
            </div>



            <div className="flex items-center">
              <input
                type="checkbox"
                id="deffered"
                name="deffered"
                checked="false"
               
                className="form-checkbox h-5 w-5 text-blue-600"
                ref={ref_deffered}
              />
              <label htmlFor="reproducible" className="ml-2 text-sm font-medium text-gray-700">
                Deffered
              </label>
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Attachment:</label>
              <input type="file" ref={ref_attachment} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>

          </div>

          <div className="flex justify-center mt-6">
            <button className="px-2 text-slate-700 bg-slate-200 rounded-lg py-2 border-black border m-1 hover:bg-slate-300 font-bold">Update</button>
            <button onClick={resetForm} className="px-6 text-slate-700 bg-slate-200 rounded-lg py-2 border-black border m-1 hover:bg-slate-300 font-bold">Cancel</button>
          </div>
        </span>
        }

      </form>


    </div>  );
};

export default UpdateForm;
