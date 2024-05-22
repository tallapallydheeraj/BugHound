import React from 'react';

const Resolution = ({ resolutionValue, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Resolution:</label>
      <select
        onChange={onChange}
        value={resolutionValue || ""}
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="" disabled selected></option>
        <option>Pending</option>
        <option>Fixed</option>
        <option>Irreproducible</option>
        <option>Deferred</option>
        {/* Add other options */}
      </select>
    </div>
  );
};

export default Resolution;
