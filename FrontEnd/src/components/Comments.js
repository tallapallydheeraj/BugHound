import React from 'react';

const Comments = ({comments_value}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="md:w-1/5">Comments:</label>
      <input
        type="text"
        placeholder="Provide your comments here..."
        className="form-input mt-1 md:mt-0 md:ml-4 flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        defaultValue={comments_value && comments_value !== "" ? comments_value : ""}
      />
    </div>
  );
};

export default Comments;
