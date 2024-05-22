import React from 'react';

const Priority = ({ priorityValue, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Priority:</label>
      <select
        onChange={onChange}
        value={priorityValue || ""}
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="" disabled selected></option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  );
};

export default Priority;
