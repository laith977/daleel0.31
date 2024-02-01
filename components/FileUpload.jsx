import React from "react";

const FileUpload = ({ handleImageChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="image"
        className="car-input-label"
      >
        :رفع الصور
      </label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        className="file-upload"
        multiple
      />
    </div>
  );
};

export default FileUpload;
