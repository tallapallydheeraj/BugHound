import React from 'react';
import { useSelector } from 'react-redux';

const ResolvedBy = ({ resolvedByValue,onChange }) => {
  console.log("Value"+resolvedByValue)
  const empNames = useSelector((store) => store.user.empDetails);
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Resolved By:</label>
      <select
        onChange={onChange}
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {resolvedByValue !== null ? (
          <option selected>{resolvedByValue.employee_name}</option>
        ) : null}
        {empNames.map((emp) => (
          <option key={emp.emp_id} value={emp.emp_id}>
            {resolvedByValue && resolvedByValue.emp_id === emp.emp_id
              ? resolvedByValue.employee_name // Display resolvedByValue if it matches current emp
              : emp.employee_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResolvedBy;
