import React from 'react';

const TestedDate = ({tested_date, defaultValue }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Tested Date:</label>
      <input
        defaultValue={defaultValue}
        type="date"
        min="2020-01-01"
        max="2024-12-31"
        className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={tested_date ? tested_date : null}
      />
    </div>
  );
};

export default TestedDate;
