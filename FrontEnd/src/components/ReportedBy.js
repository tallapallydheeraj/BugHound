import React from 'react';

const ReportedBy = ({ reportedbyvalue, empNames, userrole, empName }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Reported By:</label>
      {userrole === "ROLE_L3" || userrole === "ROLE_L2" ? (
        <select className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          {reportedbyvalue.employee_name!==null?<option selected>{reportedbyvalue.employee_name}</option>:null}
          {empNames.map((emp) => (
            <option key={emp.emp_id} value={emp.emp_id}>
              {emp.employee_name}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          value={empName}
          readOnly
        />
      )}
    </div>
  );
};

export default ReportedBy;
