"use client";
import React, { useState, useEffect } from "react";
// import FileUpload from "./FileUpload";
import Dropzone from "./Dropzone";
const carBrands = require("../constants/carBrands");
const colors = require("../constants/colors");
const CarForm = ({ type, car, setCar, submitting, handleSubmit, ppp }) => {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [DisableInput, setDisableInput] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const handleColorSelection = (colorName) => {
    setCar({ ...car, color: colorName });
    setShowColorOptions(false);
  };
  function getColorClass(background) {
    switch (background) {
      case "bg-white":
        return "bg-white";
      case "bg-black":
        return "bg-black";
      case "bg-gray-200":
        return "bg-gray-200";
      case "bg-gray-400":
        return "bg-gray-400";
      case "bg-gray-500":
        return "bg-gray-500";
      case "bg-red-500":
        return "bg-red-500";
      case "bg-red-600":
        return "bg-red-600";
      case "bg-yellow-500":
        return "bg-yellow-500";
      case "bg-orange-500":
        return "bg-orange-500";
      case "bg-yellow-300":
        return "bg-yellow-300";
      case "bg-yellow-600":
        return "bg-yellow-600";
      case "bg-amber-950":
        return "bg-amber-950";
      case "bg-yellow-200":
        return "bg-yellow-200";
      case "bg-blue-500":
        return "bg-blue-500";
      case "bg-blue-700":
        return "bg-blue-700";
      case "bg-blue-300":
        return "bg-blue-300";
      case "bg-green-500":
        return "bg-green-500";
      case "bg-green-600":
        return "bg-green-600";
      case "bg-teal-500":
        return "bg-teal-500";
      case "bg-teal-600":
        return "bg-teal-600";
      case "bg-purple-500":
        return "bg-purple-500";
      default:
        return "";
    }
  }

  useEffect(() => {
    if (car) {
      setSelectedMake(car.make);
      setSelectedModel(car.model);
    }
  }, [car]);
  const handleMakeChange = (make) => {
    setSelectedMake(make);
    setSelectedModel("");
    setCar({ ...car, make: make, model: "" });
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setCar({ ...car, model: model });
  };

  const handleImageChange = (files) => {
    setCar({ ...car, images: [...files] });
  };
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log(selectedCategory);
    if (selectedCategory === "كهربائية") {
      setDisableInput(true);
    } else {
      setDisableInput(false);
    }
    setCar({ ...car, category: selectedCategory, fuel: selectedCategory });
  };

  return (
    <>
      {/* <p className=" text-white py-8 px-12 mt-64  bg-orange-600 mx-auto w-fit text-6xl rounded-full   ">أضف سيارة</p> */}
      <form onSubmit={handleSubmit} className="car-form">
        {ppp ? (
          <></>
        ) : (
          <div className="mb-4 col-span-3 max-sm:col-span-1">
            <Dropzone handleImageChange={handleImageChange} />
          </div>
        )}

        <div className="mb-4 col-span-3 max-sm:col-span-1">
          <label htmlFor="name" className="car-input-label">
            :اسم الاعلان
          </label>
          <input
            value={car?.name || ""}
            type="text"
            id="name"
            name="name"
            onChange={(e) => setCar({ ...car, name: e.target.value })}
            required
            className="car-input-text"
          />
        </div>
        {/* <FileUpload handleImageChange={handleImageChange} /> */}
        <div className="mb-4 xl:w-96">
          <label htmlFor="description" className="car-input-label">
            :صندوق الوصف
          </label>
          <textarea
            required
            type="textarea"
            rows="6"
            id="description"
            name="description"
            value={car?.description || ""}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            className="car-input-text "
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="car-input-label">
            :السعر
          </label>
          <input
            required
            value={car?.price || ""}
            type="number"
            id="price"
            name="price"
            onChange={(e) => setCar({ ...car, price: e.target.value })}
            className="car-input-text"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="car-input-label ">
            :الرقم الهاتفي
          </label>
          <input
            required
            value={car?.phone_number || ""}
            type="text"
            id="phone_number"
            name="phone_number"
            onChange={(e) => setCar({ ...car, phone_number: e.target.value })}
            className="car-input-text "
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="car-input-label">
            :سنة الصنع
          </label>
          <select
            required
            value={car?.year}
            id="year"
            name="year"
            onChange={(e) => setCar({ ...car, year: e.target.value })}
            className="car-input-text"
          >
            {Array.from({ length: 26 }, (_, index) => {
              const year = 2000 + index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <div className="mb-4">
            <label htmlFor="make" className="car-input-label">
              :المصنع
            </label>
            <select
              required
              value={selectedMake}
              onChange={(e) => handleMakeChange(e.target.value)}
              className="car-input-text"
            >
              {carBrands.map((car) => (
                <option key={car.brand} value={car.brand} id={car?.brand}>
                  {car.brand}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="model" className="car-input-label">
              :الموديل
            </label>
            <select
              required
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="car-input-text"
              disabled={!selectedMake}
            >
              <option value="">اختر موديل</option>
              {selectedMake &&
                carBrands
                  .find((car) => car.brand === selectedMake)
                  ?.models.map((model) => (
                    <option key={model} value={model} id={model}>
                      {model}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="mileage" className="car-input-label">
            :ممشى
          </label>
          <select
            required
            value={car?.mileage || "gasoline"}
            id="mileage"
            name="mileage"
            onChange={(e) => setCar({ ...car, mileage: e.target.value })}
            className="car-input-text"
          >
            <option key={`zero`} value={`zero`}>
              {`Zero`}
            </option>
            {Array.from({ length: 20 }, (_, index) => {
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
            <option key={`100k`} value={`100k+`}>
              {`100000+`}
            </option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="transmission" className="car-input-label">
            :ناقل الحركة
          </label>
          <select
            required
            value={car?.transmission || "gasoline"}
            id="transmission"
            name="transmission"
            onChange={(e) => setCar({ ...car, transmission: e.target.value })}
            className="car-input-text"
          >
            <option value="اوتوماتيك" defaultValue>
              اوتوماتيك{" "}
            </option>
            <option value="ناقل يدوي">ناقل يدوي</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="car-input-label">
            :الفئة
          </label>
          <select
            required
            value={car.category}
            id="category"
            name="category"
            onChange={handleCategoryChange}
            className="car-input-text"
          >
            <option value="وقود">وقود</option>
            <option value="كهربائية">كهربائية</option>
            <option value="هايبرد">هايبرد</option>
            <option value="بيك اب"> بيك اب</option>
            <option value="باصات">باصات</option>
            <option value=">شاحنات نقل">شاحنات نقل</option>
          </select>
        </div>

        {/* <div className="mb-4">
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
          <option value="coupe" defaultValue>
            {" "}
            Coupe
          </option>
          <option value="sedan">Sedan</option>
          <option value="hatch">Hatch</option>
          <option value="wagon">Wagon</option>
          <option value="suv">SUV</option>
          <option value="pick-up">Pick-up</option>
          <option value="minivan">Minivan</option>
          <option value="other">Other</option>
        </select>
      </div> */}
        <div className="mb-4">
          <label htmlFor="doors" className="car-input-label">
            :عدد الابواب
          </label>
          <select
            required
            value={car?.doors}
            id="doors"
            name="doors"
            onChange={(e) => setCar({ ...car, doors: e.target.value })}
            className="car-input-text"
          >
            <option value="4" defaultValue>
              4
            </option>
            <option value="2">2</option>
          </select>
        </div>

        <div className="mb-4 relative">
          <label htmlFor="color" className="car-input-label">
            :اللون
          </label>
          <div
            id="color"
            name="color"
            className="car-input-text"
            onClick={() => setShowColorOptions(!showColorOptions)}
          >
            <div
              className={` rounded-full w-4  mr-2 ${car.color.background}`}
            ></div>
            {car.color || "اختر اللون"}
            {showColorOptions && (
              <div className="color-options absolute top-full left-0 mt-1 w-full">
                {colors.map((colorOption, index) => (
                  <div
                    key={index}
                    className="flex items-center py-1 px-2 cursor-pointer"
                    onClick={() => handleColorSelection(colorOption.name)}
                  >
                    <div
                      className={`rounded-full w-4 h-4 mr-2 ${getColorClass(
                        colorOption.background
                      )}`}
                    ></div>
                    {colorOption.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="fuel" className="car-input-label">
            :نوع الوقود
          </label>
          <select
            required
            value={car.fuel || "بنزين"}
            id="fuel"
            name="fuel"
            onChange={(e) => setCar({ ...car, fuel: e.target.value })}
            className="car-input-text"
            readOnly={DisableInput}
          >
            {DisableInput ? (
              <option value="كهربائية">كهربائية</option>
            ) : (
              <>
                <option value="بنزين">بنزين</option>
                <option value="ديزل">ديزل</option>
                {car.category === "بيك اب" && (
                  <option value="كهربائية">كهربائية</option>
                )}
              </>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="region" className="car-input-label">
            :المنطقة
          </label>
          <input
            value={car.region}
            type="text"
            id="region"
            name="region"
            readOnly
            className="car-input-text"
          />
        </div>
        <div className="mb-4 max-sm:mb-0"></div>
        <div className="mb-4 mx-auto xl:mt-6     ">
          <button type="submit" disabled={submitting} className="submit-button">
            {type}
          </button>
        </div>
      </form>
    </>
  );
};

export default CarForm;
