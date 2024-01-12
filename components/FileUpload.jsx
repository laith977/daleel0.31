import React from "react";

const FileUpload = ({ handleImageChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-600"
      >
        :رفع الصور
      </label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        multiple
      />
    </div>
  );
};

export default FileUpload;
