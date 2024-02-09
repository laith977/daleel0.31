import React, { useState, useEffect } from "react";

export const PreviewFile = ({ file, children }) => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResult(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading the file:", error);
    };
    return () => {};
  }, [file]);

  return children(result);
};
const FileUpload = ({ handleImageChange }) => {
  
  return (
    <div className="mb-4">
      <label htmlFor="image" className="car-input-label">
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
