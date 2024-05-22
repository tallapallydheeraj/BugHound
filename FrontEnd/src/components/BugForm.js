import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFunctionalAreaByProgramId } from "../utils/areaSlice";
import { storeBugs } from "../utils/bugsSlice";
import { useLocation } from "react-router-dom";

const BugForm = () => {
  //const location = useLocation();
  //const {bugDetails} = location.state || {};
  /* const ref_Program_Id = useRef();
  // const ref_Report_Type = useRef();
  // const ref_Problem_Summary = useRef();
   const  ref_Problem = useRef();
   const ref_Reproducible = useRef();
   const ref_Suggested_Fix = useRef();
   const ref_Reported_By = useRef();
   const  ref_Reported_Date = useRef();

   let bugIndex,pre;*/
  //const userdetails = useSelector(store=> store.user.loggedinUser);
  //const bugs = useSelector(store=> store.bugs.bugsArray);
  //console.log(userdetails);
  //const isDisabled = "ROLE_L1" == userdetails.userlevel?true:false;
  //console.log(isDisabled)
  //const index = useSelector(store => store.bugs.setBugIndex);
  /*if(index !== null)
  {
      bugIndex = index;
      pre={
          report_type: bugs[bugIndex].report_type,
          problem_summary:bugs[bugIndex].problem_summary,
          problem: bugs[bugIndex].problem,
          suggestedfix: bugs[bugIndex].suggested_fix,
          reported_date:bugs[bugIndex].reported_date,
          reported_by: bugs[bugIndex].reported_by
      }
      
  }
  else{
      bugIndex = null;
      pre={
          program: "",
          report_type: "",
          problem_summary:"",
          problem: "",
          suggestedfix:"",
          reported_date:"",
          reported_by: ""
      }
      
  }

  function sendJson(){
      const thisbug={
      //"bug_id": ref_Bug_id.current.value,
      //"program_id":ref_Program_Id.current.value,
      "report_type": ref_Report_Type.current.value,
      "problem_summary": ref_Problem_Summary.current.value,
      "problem": ref_Problem.current.value,
    //  "reproducible": ref_Producible.current.value,
      "suggested_fix": ref_Suggested_Fix.current.value,
      "reported_by": ref_Reported_By.current.value,
      "reported_date": ref_Reported_Date.current.value,
     // "functional_area": ref_Functional_Area.current.value,
     // "assigned_to": ref_Assigned_To.current.value,
     // "comments": ref_Comments.current.value,
     // "status": ref_Status.current.value,
     // "priority": ref_Priority.current.value,
     // "resolution": ref_Resolution.current.value,
     // "resolution_version": ref_Resolution_Version.current.value,
     // "resolved_by": ref_Resolved_By.current.value,
    //  "resolved_date": ref_Resolved_Date.current.value,
     // "tested_by": ref_Tested_By.current.value,
     // "tested_date": ref_Tested_Date.current.value,
    //  "treat_as_deferred": ref_Treat_As_Deffered.current.value,
      }
      console.log(thisbug)
  }*/
  const dispatch = useDispatch()
  const today = new Date().toLocaleDateString('en-US');
  const program_names = useSelector(store => store.tables.programTable_Data)
  const empName = useSelector(store => store.user.loggedinUserDetails.employeeName)

  const userrole = useSelector(store => store.user.loggedinUserDetails.role)
  const empNames = useSelector(store => store.user.empDetails)
  const token = useSelector(store => store.user.loggedinUserDetails.jwt);
  const bugDetails = useSelector(store => store.bugs.needUpdateBug)
  const isUpdateForm1 = useSelector(store => store.bugs.isUpdateForm)
  console.log(bugDetails)

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
  let u_pid;
  let u_severity = 0;


  const [thisreproducible, setReproducible] = useState(false)
  const [deffered, setDeffered] = useState(false)
  const [attachment, setAttachment] = useState(null);



  function handleDefferedChange() {
    setDeffered(!deffered);
  }

  function handleCheckboxChange() {
    setReproducible(!thisreproducible);

  }

  function handleDefferedCheckboxChange() {
    setDeffered(!deffered);
  }
  const createorupdate = async () => {
    let formData = new FormData();

    if (ref_suggested_fix == undefined) {
      ref_suggested_fix = null
    }
    if (ref_problem_description == undefined) {
      ref_problem_description = null
    }

    let emp_Id = empNames.reduce((acc, emp) => { if (emp.employee_name == empName) { acc = emp.emp_id; } return acc; }, -1)

    if (userrole === "ROLE_L1") {
      formData = {
        "program": {
          "programId": ref_program.current.value,
        },
        "report_type": ref_report_type.current.value,
        "severity": ref_severity.current.value,
        "problem_summary": ref_problem_Summary.current.value,
        "problem": ref_problem_description.current.value,
        "reproducible": thisreproducible ? "Yes" : "No",
        "suggested_fix": ref_suggested_fix.current.value,
        "reportedBy": {
          "emp_id": emp_Id,
        },
        "reported_date": ref_date.current.value,
      }
    } else {
      formData = {
        "program": {
          "programId": ref_program.current.value,
        },
        "report_type": ref_report_type.current.value,
        "severity": ref_severity.current.value,
        "problem_summary": ref_problem_Summary.current.value,
        "problem": ref_problem_description.current.value,
        "reproducible": thisreproducible ? "Yes" : "No",
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
        "treat_as_deferred": deffered ? "Yes" : "No",
      }


    }

    console.log(formData);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    let apiUrl = userrole !== "ROLE_L1" ? "http://localhost:8080/bug/create" : "http://localhost:8080/bug";
    const sendData = await fetch(apiUrl, requestOptions);
    const jsonData = await sendData.json();
    if (sendData.ok) {
      console.log(jsonData);
      alert("Bug Report Creation Successful!");
      if (userrole !== "ROLE_L1" && ref_attachment.current.value!=="") {
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

        let apiUrl = "http://localhost:8080/bug/attachment/" + jsonData.bug_id;
        const result = await fetch(apiUrl, requestOptions);
        result.ok ? alert("File Upload Successful!") : alert("File Upload UnSuccessful!");
      }
      resetForm();
    }
    else {
      alert("Oops! Bug Report Creation unsuccessful!")
    }
  }



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
  };

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


  useEffect(() => {
    const fetchData = async () => {

      const requestOptions1 = {
        method: 'GET',
        headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': 'application/json'
        }

      };
      const data1 = await fetch("http://localhost:8080/bug", requestOptions1);
      const json1 = await data1.json();
      //console.log(json1);
      // dispatch(storeBugs(json._embedded.bugs))
      dispatch(storeBugs(json1))
    };

    fetchData();
  }, [isUpdateForm1]);


  if (isUpdateForm1) {
    console.log("in If block")
    u_pid = bugDetails.program.program_name;
    console.log("in If block" + u_pid)
    //ref_report_type.current.value = bugDetails.report_type;
    u_severity = bugDetails.severity;
    setReproducible(bugDetails.reproducible === "Yes");
    //ref_problem_Summary.current.value = bugDetails.problem_summary;
    //ref_problem_description.current.value = bugDetails.problem;
    //ref_suggested_fix.current.value = bugDetails.suggested_fix;
    //ref_reported_by.current.value = bugDetails.reportedBy.emp_id;
    //ref_date.current.value = bugDetails.reported_date;
    //ref_fa_type.current.value = bugDetails.functional_area;
    //ref_assigned_to.current.value = bugDetails.assignedTo.emp_id;
    //ref_comments.current.value = bugDetails.comments;
    //ref_status.current.value = bugDetails.status;
    //ref_priority.current.value = bugDetails.priority;
    //ref_resolution.current.value = bugDetails.resolution;
    //ref_resolution_version.current.value = bugDetails.resolution_version;
    //ref_resolved_by.current.value = bugDetails.resolvedBy.emp_id;
    //ref_resolved_date.current.value = bugDetails.resolved_date;
    //ref_tested_by.current.value = bugDetails.testedBy.emp_id;
    //ref_tested_date.current.value = bugDetails.tested_date;
    setDeffered(bugDetails.treat_as_deferred === "Yes");

  }


  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); createorupdate(); }}
        className="bg-slate-200 w-3/4 mx-auto p-6 rounded-lg shadow-lg space-y-6 relative top-16">
        <h1 className="text-2xl font-bold text-center text-gray-700">Create your Bug Here!</h1>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Program:</label>
            <select ref={ref_program} required onChange={(e) => { getFunctionalAreaOptions(e.target.value) }} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">

              {bugDetails !== null ? <option value={u_pid} selected>{u_pid}</option> : <option value="" disabled selected>Select Program</option>}
              {program_names.map(program => <option value={program.programId}>{program.program_name}/ {program.program_release} /{program.program_version}</option>)}
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Report Type:</label>
            <select ref={ref_report_type} required className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="" disabled selected>Select a Report Type</option>
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
              {bugDetails !== null ? <option value="u_severity" selected>{u_severity}</option> : <option value="" disabled selected>Severity</option>}
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
              checked={thisreproducible}
              onChange={handleCheckboxChange}
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
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Problem:</label>
            <textarea ref={ref_problem_description}
              className="form-textarea mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              placeholder="Enter problem here"
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Suggested Fix:</label>
            <input ref={ref_suggested_fix} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" placeholder="Enter your suggestion here" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5">Reported By:</label>
            {
              userrole === "ROLE_L3" || "ROLE_L2" ? <select ref={ref_reported_by} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="" disabled selected></option>
                {empNames.map(emp => <option value={emp.emp_id}>{emp.employee_name}</option>)}
              </select>
                :
                <input ref={ref_reported_by} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" value={empName} />

            }

          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/5"> Reported Date:</label>
            <input ref={ref_date} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="date" min="2020-01-01" max="2024-12-31" defaultValue={today} />
          </div>
        </div>
        {userrole !== "ROLE_L1" ? "" :
          <span>
            <div className="flex justify-center mt-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Create / Update
              </button>
              <button onClick={resetForm} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
              </button>
            </div>
          </span>
        }
        {userrole === "ROLE_L1" ? null : <span className="relative top-5">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Functional Area:</label>
              <select ref={ref_fa_type} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="" disabled selected></option>
                {functional_Areas && functional_Areas.map(fa => <option value={fa.area}>{fa.area}</option>)}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Assigned To:</label>
              <select ref={ref_assigned_to} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="" disabled selected></option>
                {empNames.map(emp => <option value={emp.emp_id}>{emp.employee_name}</option>)}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Comments:</label>
              <input ref={ref_comments} type="text" placeholder="Provide your comments here..." className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Status:</label>
              <select ref={ref_status} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="Open" selected>Open</option>
                <option value="Closed">Closed</option>

              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Priority:</label>
              <select ref={ref_priority} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="" disabled selected></option>
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
                <option value="" disabled selected></option>
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
              <input ref={ref_resolution_version} type="number" className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Resolved By:</label>
              <select ref={ref_resolved_by} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="" disabled selected></option>
                {empNames.map(emp => <option value={emp.emp_id}>{emp.employee_name}</option>)}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Resolved Date:</label>
              <input ref={ref_resolved_date} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="date" min="2020-01-01" max="2024-12-31" value={today} />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Tested By:</label>
              <select ref={ref_tested_by} className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="" disabled selected></option>
                {empNames.map(emp => <option value={emp.emp_id}>{emp.employee_name}</option>)}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-1/5">Tested Date:</label>
              <input ref={ref_tested_date} className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="date" min="2020-01-01" max="2024-12-31" value={today} />
            </div>



            <div className="flex items-center">
              <input
                type="checkbox"
                id="deffered"
                name="deffered"
                checked={deffered}
                onChange={handleDefferedCheckboxChange}
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
            <button className="px-2 text-slate-700 bg-slate-200 rounded-lg py-2 border-black border m-1 hover:bg-slate-300 font-bold">Create / Update</button>
            <button onClick={resetForm} className="px-6 text-slate-700 bg-slate-200 rounded-lg py-2 border-black border m-1 hover:bg-slate-300 font-bold">Cancel</button>
          </div>
        </span>
        }

      </form>


    </div>
  )
}

export default BugForm;