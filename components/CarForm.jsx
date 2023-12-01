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
          Post name:
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
          Year:
        </label>
        <select
          value={car?.year || 2000} // Set default value to "gasoline"
          id="year"
          name="year"
          onChange={(e) => setCar({ ...car, transmission: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          {Array.from({ length: 24 }, (_, index) => {
            const year = 2000 + index;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
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
        <select
          value={car?.mileage || "gasoline"} // Set default value to "gasoline"
          id="mileage"
          name="mileage"
          onChange={(e) => setCar({ ...car, mileage: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          {Array.from({ length: 25 }, (_, index) => {
            const diff = 5000 + index * 5000;
            return (
              <option
                key={`${diff - 5000}-${diff}`}
                value={`${diff - 5000}-${diff}`}
              >
                {`${diff - 5000}-${diff}`}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="transmission"
          className="block text-sm font-medium text-gray-600"
        >
          Transmission:
        </label>
        <select
          value={car?.transmission || "gasoline"} // Set default value to "gasoline"
          id="transmission"
          name="transmission"
          onChange={(e) => setCar({ ...car, transmission: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="normal" selected>
            Normal
          </option>
          <option value="automatic">Automatic</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-600"
        >
          Category:
        </label>
        <select
          value={car?.category || "gasoline"} // Set default value to "gasoline"
          id="category"
          name="category"
          onChange={(e) => setCar({ ...car, category: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="gasoline" selected>
            Gasoline
          </option>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
          <option value="pick-up">Pick-Up Trucks</option>
          <option value="bus">Buses</option>
          <option value="lorry">Lorries</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="bodytype"
          className="block text-sm font-medium text-gray-600"
        >
          Body Type:
        </label>
        <select
          value={car?.bodytype || "coupe"} // Set default value to "coupe"
          id="bodytype"
          name="bodytype"
          onChange={(e) => setCar({ ...car, bodytype: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="coupe" selected>
            {" "}
            Coupe
          </option>
          <option value="sedan">Sedan</option>
          <option value="hatch">Hatch</option>
          <option value="wagon">Wagon</option>
          <option value="suv selected">SUV</option>
          <option value="pick-up">Pick-up</option>
          <option value="minivan">Minivan</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="doors"
          className="block text-sm font-medium text-gray-600"
        >
          Doors:
        </label>
        <select
          value={car?.doors} // Set default value to "coupe"
          id="doors"
          name="doors"
          onChange={(e) => setCar({ ...car, doors: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-600"
        >
          Color:
        </label>
        <select
          value={car?.color} // Set default value to "coupe"
          id="color"
          name="color"
          onChange={(e) => setCar({ ...car, color: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="White" selected>
            {" "}
            White{" "}
          </option>
          <option value="Black">Black </option>
          <option value="Silver"> Silver </option>
          <option value="Blue">Blue</option>
          <option value="Red"> Red </option>
          <option value="Green">Green </option>
          <option value="Yellow">Yellow </option>
          <option value="Gold">Gold </option>
          <option value="Beige">Beige </option>
          <option value="Brown">Brown </option>
          <option value="Orange">Orange </option>
          <option value="Gray">Gray </option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="fuel"
          className="block text-sm font-medium text-gray-600"
        >
          fuel:
        </label>
        <select
          value={car?.fuel} // Set default value to "coupe"
          id="fuel"
          name="fuel"
          onChange={(e) => setCar({ ...car, fuel: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="Electric"> Electric</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Gasoline"> Gasoline</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="region"
          className="block text-sm font-medium text-gray-600"
        >
          region:
        </label>
        <input
          value={/*car?.region*/ "jordan" || ""}
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
