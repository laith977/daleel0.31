import React from "react";
import FileUpload from "./FileUpload";

const CarForm = ({ type, car, setCar, submitting, handleSubmit }) => {
  const handleImageChange = async (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const imagesArray = [];

      for (const file of files) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          imagesArray.push(base64String);
        };

        reader.readAsDataURL(file);
      }

      setCar({ ...car, image: imagesArray });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-32 p-4 bg-white rounded-md shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Name:
        </label>
        <input
          value={car?.name || ""}
          type="text"
          id="name"
          name="name"
          onChange={(e) => setCar({ ...car, name: e.target.value })}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <FileUpload handleImageChange={handleImageChange} />
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600"
        >
          Description:
        </label>
        <textarea
          type="textarea"
          rows="6"
          id="description"
          name="description"
          value={car?.description || ""}
          onChange={(e) => setCar({ ...car, description: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 "
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-600"
        >
          Price:
        </label>
        <input
          value={car?.price || ""}
          type="text"
          id="price"
          name="price"
          onChange={(e) => setCar({ ...car, price: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-600"
        >
          phone number:
        </label>
        <input
          value={car?.phone_number || ""}
          type="text"
          id="phone_number"
          name="phone_number"
          onChange={(e) => setCar({ ...car, phone_number: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-600"
        >
          year:
        </label>
        <input
          value={car?.year || ""}
          type="text"
          id="year"
          name="year"
          onChange={(e) => setCar({ ...car, year: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="make"
          className="block text-sm font-medium text-gray-600"
        >
          make:
        </label>
        <input
          value={car?.make || ""}
          type="text"
          id="make"
          name="make"
          onChange={(e) => setCar({ ...car, make: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-600"
        >
          model:
        </label>
        <input
          value={car?.model || ""}
          type="text"
          id="model"
          name="model"
          onChange={(e) => setCar({ ...car, model: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="mileage"
          className="block text-sm font-medium text-gray-600"
        >
          mileage:
        </label>
        <input
          value={car?.mileage || ""}
          type="text"
          id="mileage"
          name="mileage"
          onChange={(e) => setCar({ ...car, mileage: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="transmission"
          className="block text-sm font-medium text-gray-600"
        >
          transmission:
        </label>
        <input
          value={car?.transmission || ""}
          type="text"
          id="transmission"
          name="transmission"
          onChange={(e) => setCar({ ...car, transmission: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-600"
        >
          type:
        </label>
        <input
          value={car?.type || ""}
          type="text"
          id="type"
          name="type"
          onChange={(e) => setCar({ ...car, type: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="doors"
          className="block text-sm font-medium text-gray-600"
        >
          doors:
        </label>
        <input
          value={car?.doors || ""}
          type="text"
          id="doors"
          name="doors"
          onChange={(e) => setCar({ ...car, doors: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-600"
        >
          color:
        </label>
        <input
          value={car?.color || ""}
          type="text"
          id="color"
          name="color"
          onChange={(e) => setCar({ ...car, color: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="fuel"
          className="block text-sm font-medium text-gray-600"
        >
          fuel:
        </label>
        <input
          value={car?.fuel || ""}
          type="text"
          id="fuel"
          name="fuel"
          onChange={(e) => setCar({ ...car, fuel: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="region"
          className="block text-sm font-medium text-gray-600"
        >
          region:
        </label>
        <input
          value={car?.region || ""}
          type="text"
          id="region"
          name="region"
          onChange={(e) => setCar({ ...car, region: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
        >
          {submitting ? `${type}ing...` : type}
        </button>
      </div>
    </form>
  );
};

export default CarForm;
