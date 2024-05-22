// Reproducible.js
import React from 'react';

const Reproducible = ({ checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="reproducible"
        name="reproducible"
        checked= "true"
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <label
        htmlFor="reproducible"
        className="ml-2 text-sm font-medium text-gray-700"
      >
        Reproducible
      </label>
    </div>
  );
};

export default Reproducible;
