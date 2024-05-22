import React from 'react';
import { useSelector } from 'react-redux';

const TestedBy = ({ onChange }) => {
  const empNames = useSelector((store) => store.user.empDetails);
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Tested By:</label>
      <select
        onChange={onChange}
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {empNames.map((emp) => (
          <option key={emp.emp_id} value={emp.emp_id}>
            {emp.employee_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TestedBy;
