import React from 'react';

const Problem = ({prvalue, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Problem:</label>
      <textarea
        onChange={onChange}
        defaultValue={prvalue?prvalue:null}
        className="form-textarea mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        rows="3"
        placeholder="Enter problem here"
      ></textarea>
    </div>
  );
};

export default Problem;
