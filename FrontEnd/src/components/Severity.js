// Severity.js
import React from 'react';

const Severity = ({ severityname, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Severity:</label>
      <select
        onChange={onChange}
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {severityname?
        <option value="" selected>
        {severityname}
        </option>:
        <option value="" selected>
        </option>}
        <option value="Fatal">Fatal</option>
        <option value="Serious">Serious</option>
        <option value="Minor">Minor</option>
      </select>
    </div>
  );
};

export default Severity;
