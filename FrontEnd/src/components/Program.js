// Program.js
import React from 'react';
import { useSelector } from 'react-redux';

const Program = ({ programNames, onChange }) => {
  const program_names = useSelector((store) => store.tables.programTable_Data);
  console.log(programNames)
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Program:</label>
      <select
        onChange={onChange}
        className="form-select mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="" selected>
          {programNames}
        </option>
        {program_names.map((program) => (
          <option key={program.programId} value={program.programId}>
            {program.program_name}/ {program.program_release} /
            {program.program_version}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Program;
