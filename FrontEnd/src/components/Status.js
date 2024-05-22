import React from 'react';

const Status = ({statusValue}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Status:</label>
      <select
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={statusValue || ""}
      >
        <option value="" disabled selected></option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
};

export default Status;
