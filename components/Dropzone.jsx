import React, { useState } from "react";

const Dropzone = ({ handleImageChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(null);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
      handleImageChange(filesArray);
    }
  };

  const handleSetPrimaryImage = (index) => {
    setPrimaryImageIndex(index);
    const updatedFiles = [...selectedFiles];
    if (index !== 0) {
      const fileToMove = updatedFiles.splice(index, 1)[0];
      updatedFiles.unshift(fileToMove);
    }
    setSelectedFiles(updatedFiles);
    handleImageChange(updatedFiles);
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    handleImageChange(updatedFiles);
    if (primaryImageIndex === index) {
      setPrimaryImageIndex(null);
    } else if (primaryImageIndex > index) {
      setPrimaryImageIndex(primaryImageIndex - 1);
    }
  };

  const renderImagePreview = (file, index) => {
    // Check if the file is an image
    if (file.type && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result;
        const imgElement = (
          <img
            src={imageDataURL}
            alt={file.name}
            className="car-col-pic"
            width={120}
            height={80}
          />
        );
        // Render the image element
        setSelectedFiles((prevSelectedFiles) => {
          const updatedFiles = [...prevSelectedFiles];
          updatedFiles[index] = imgElement;
          return updatedFiles;
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type:", file.type);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="images"
        className="block w-full h-32 rounded-md border border-gray-400 flex items-center justify-center cursor-pointer mb-4"
      >
        {selectedFiles.length === 0 ? (
          <span>أنقر لأضافة الصور </span>
        ) : (
          <span>Uploading {selectedFiles.length} files...</span>
        )}
      </label>
      <input
        type="file"
        id="images"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {selectedFiles.map((file, index) => (
          <div key={file.name} className=" relative flex items-center">
            {typeof file === "string" ? (
              // If file is a string, it's an already uploaded image
              <img
                src={file}
                alt={file.name}
                className="car-col-pic"
                width={120}
                height={80}
              />
            ) : (
              // Otherwise, it's a new image being uploaded
              <>
                {renderImagePreview(file, index)}
                <div className=" flex flex-row justify-end">
                  <button
                    type="button"
                    onClick={() => handleSetPrimaryImage(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs absolute top-0 left-0"
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md text-xs  absolute top-0"
                  >
                    X
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {primaryImageIndex !== null && selectedFiles[primaryImageIndex] && (
        <p className="mt-4">
          Primary Image: {selectedFiles[primaryImageIndex].name}
        </p>
      )}
    </div>
  );
};

export default Dropzone;
