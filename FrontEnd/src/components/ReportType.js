// ReportType.js
import React from 'react';

const ReportType = ({value, onChange }) => {
  console.log("Value"+value)
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Report Type:</label>
      <select
        onChange={onChange}
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {value!==null?<option value="" selected>
          {value}
        </option>:
        <option value="" disabled selected>
        Select a Report Type
      </option>}
        
        <option value="Coding Error">Coding Error</option>
        <option value="Design Issue">Design Issue</option>
        <option value="Suggestion">Suggestion</option>
        <option value="Documentation">Documentation</option>
        <option value="Hardware">Hardware</option>
        <option value="Query">Query</option>
      </select>
    </div>
  );
};

export default ReportType;
