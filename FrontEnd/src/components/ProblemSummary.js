// ProblemSummary.js
import React from 'react';

const ProblemSummary = ({ pvalue, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Problem Summary:</label>
      <textarea
        onChange={onChange}
        defaultValue={pvalue?pvalue:null}
        className="form-textarea mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        rows="3"
        placeholder="Enter problem summary here"
      ></textarea>
    </div>
  );
};

export default ProblemSummary;
