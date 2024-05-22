import React from 'react';

const FunctionalArea = ({ functionalAreas }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Functional Area:</label>
      <select
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="" disabled selected></option>
        {functionalAreas &&
          functionalAreas.map((fa) => (
            <option key={fa.area} value={fa.area}>
              {fa.area}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FunctionalArea;
