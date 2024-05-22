import React from 'react';

const Deffered = ({ onChange }) => {
  return (
    <div className="flex items-center">
      <input
        onChange={onChange}
        type="checkbox"
        id="deffered"
        name="deffered"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked="true"
      />
      <label
        htmlFor="reproducible"
        className="ml-2 text-sm font-medium text-gray-700"
      >
        Deffered
      </label>
    </div>
  );
};

export default Deffered;
