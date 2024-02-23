import React, { useState, useEffect } from "react";

const Dropzone = ({ handleImageChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [base64Previews, setBase64Previews] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(null);

  useEffect(() => {
    const fetchBase64Previews = async () => {
      const base64Array = await Promise.all(
        selectedFiles.map(async (file) => {
          try {
            const base64 = await getBase64(file);
            return base64;
          } catch (error) {
            console.error("Error converting file to base64:", error);
            return null;
          }
        })
      );
      setBase64Previews(base64Array);
    };

    fetchBase64Previews();
  }, [selectedFiles]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
      handleImageChange(filesArray);
    }
  };

  const handleSetPrimaryImage = (index) => {
    if (index !== 0) {
      const updatedFiles = [...selectedFiles];
      const fileToMove = updatedFiles.splice(index, 1)[0];
      updatedFiles.splice(0, 0, fileToMove);
      setSelectedFiles(updatedFiles);
      handleImageChange(updatedFiles);
    }
    setPrimaryImageIndex(0);
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
    // Set the next image as primary if it exists
    if (index === primaryImageIndex && updatedFiles.length > 0) {
      const newPrimaryIndex = index === updatedFiles.length ? index - 1 : index;
      setPrimaryImageIndex(newPrimaryIndex);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
        {base64Previews.map((base64, index) => (
          <div key={`image_${index}`} className=" relative flex items-center">
            <img
              onClick={() => handleSetPrimaryImage(index)}
              src={base64}
              alt={`Preview ${index}`}
              className="car-col-pic"
              width={120}
              height={80}
            />
            <div className=" flex flex-row justify-end">
              {index === 0 && (
                <button
                  type="button"
                  className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs absolute top-0 left-0"
                >
                  صورة الغلاف
                </button>
              )}
              <button
                type="button"
                onClick={() => handleDeleteImage(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md text-xs  absolute top-0"
              >
                X
              </button>
            </div>
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
