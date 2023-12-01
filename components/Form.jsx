"use client";
import React, { useState } from "react";

const Form = ({ onInputChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    year: "",
    make: "",
    model: "",
    mileage: "",
    transmission: "",
    category: "",
    color: "",
    bodyType: "",
    fuel: "",
  });

  const handleInputChange = (e) => {
    const updatedFormData = {
      name: e.target.name.value,
      price: e.target.price.value,
      year: e.target.year.value,
      make: e.target.make.value,
      model: e.target.model.value,
      mileage: e.target.mileage.value,
      transmission: e.target.transmission.value,
      category: e.target.category.value,
      color: e.target.color.value,
      bodyType: e.target.bodyType.value,
      fuel: e.target.fuel.value,
    };

    // Pass the updated form data to the parent component
    onInputChange(updatedFormData);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onChange={handleInputChange}
      className="flex flex-col text-white bg-black mt-32 w-96 ml-32 p-12"
    >
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label>name</label> <input type="text" name="name" id="name" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label> price</label>
        <input type="number" name="price" id="price" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label>year</label> <input type="number" name="year" id="year" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label>make</label> <input type="text" name="make" id="make" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label>model </label>
        <input type="text" name="model" id="model" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label> mileage</label>
        <input type="number" name="mileage" id="mileage" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label>transmission </label>
        <input type="text" name="transmission" id="transmission" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label>category</label>{" "}
        <input type="text" name="category" id="category" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label>color </label>
        <input type="text" name="color" id="color" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label>body-type </label>
        <input type="text" name="body-type" id="body-type" />
      </div>
      <div className="flex flex-row my-2 justify-between gap-4">
        {" "}
        <label> fuel</label>
        <input type="text" name="fuel" id="fuel" />
      </div>
    </form>
  );
};

export default Form;
