"use client";
import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import Dropzone from "./Dropzone";

const CarForm = ({ type, car, setCar, submitting, handleSubmit, ppp }) => {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [DisableInput, setDisableInput] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  console.log(ppp);
  const carBrands = [
    {
      brand: "Alfa Romeo",
      models: ["Giulia", "Stelvio", "4C"],
    },
    {
      brand: "Aston Martin",
      models: ["DB11", "DBS Superleggera", "Vantage", "DBX"],
    },
    {
      brand: "Audi",
      models: [
        "A1",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "Q2",
        "Q3",
        "Q5",
        "Q7",
        "Q8",
        "e-Tron",
      ],
    },
    {
      brand: "BMW",
      models: [
        "1 Series",
        "2 Series",
        "3 Series",
        "4 Series",
        "5 Series",
        "6 Series",
        "7 Series",
        "X1",
        "X2",
        "X3",
        "X4",
        "X5",
        "X6",
        "X7",
        "Z4",
        "i3",
        "i4",
        "i3",
        "iX3",
      ],
    },
    {
      brand: "BYD",
      models: [
        "Han",
        "Tang",
        "Yuan",
        "Song",
        "e2",
        "e3",
        "e5",
        "e6",
        "Champion",
        "Seagull",
      ],
    },
    {
      brand: "Bentley",
      models: ["Bentayga", "Continental GT", "Flying Spur"],
    },
    {
      brand: "Bugatti",
      models: ["Chiron", "Veyron"],
    },
    {
      brand: "Buick",
      models: ["Encore", "Enclave", "Envision"],
    },
    {
      brand: "Cadillac",
      models: ["CT4", "CT5", "CT6", "Escalade", "XT4", "XT5", "XT6"],
    },
    {
      brand: "Changan",
      models: [
        "CS35 Plus",
        "CS55 Plus",
        "UNI-T",
        "Oshan X7",
        "Benben Mini",
        "E-Star",
        "Eado",
      ],
    },
    {
      brand: "Chevrolet",
      models: [
        "Camaro",
        "Corvette",
        "Equinox",
        "Malibu",
        "Silverado",
        "Suburban",
        "Tahoe",
        "Traverse",
        "Trax",
        "Minlo",
        "Spark",
        "Bolt",
      ],
    },
    {
      brand: "Chrysler",
      models: ["300", "Pacifica", "Voyager"],
    },
    {
      brand: "Citroën",
      models: ["C3", "C4", "C5", "Berlingo", "C3 Aircross", "C4 Cactus"],
    },
    {
      brand: "Dacia",
      models: ["Duster", "Sandero", "Logan"],
    },
    {
      brand: "Daihatsu",
      models: ["Copen", "Hijet", "Mira", "Terios"],
    },
    {
      brand: "Dodge",
      models: ["Challenger", "Charger", "Durango", "Journey", "RAM"],
    },
    {
      brand: "Ferrari",
      models: ["488 GTB", "488 Pista", "812 Superfast", "SF90 Stradale"],
    },
    {
      brand: "Fiat",
      models: ["500", "500X", "500L", "124 Spider", "Panda", "Tipo"],
    },
    {
      brand: "Ford",
      models: [
        "Bronco",
        "Escape",
        "Expedition",
        "Explorer",
        "F-150",
        "Maverick",
        "Mustang",
        "Ranger",
        "Fusion",
        "Focus",
      ],
    },
    {
      brand: "Genesis",
      models: ["G70", "G80", "G90"],
    },
    {
      brand: "Geely",
      models: ["Coolray", "Azkarra", "Emgrand", "Binrui", "Bo Rui", "Xing Yue"],
    },
    {
      brand: "GMC",
      models: ["Acadia", "Canyon", "Sierra", "Terrain", "Yukon"],
    },
    {
      brand: "Great Wall Motors",
      models: [
        "Haval H6",
        "Haval F7",
        "Wey VV5",
        "Wey VV7",
        "Ora Good Cat",
        "Ora R1",
      ],
    },
    {
      brand: "Honda",
      models: [
        "Accord",
        "Civic",
        "CR-V",
        "Fit",
        "HR-V",
        "Insight",
        "Odyssey",
        "Passport",
        "Pilot",
        "Ridgeline",
        "E-NS1",
        "E-NP1",
      ],
    },
    {
      brand: "Hyundai",
      models: [
        "Accent",
        "Elantra",
        "Kona",
        "Nexo",
        "Palisade",
        "Santa Fe",
        "Sonata",
        "Tucson",
        "Veloster",
        "Ioniq",
      ],
    },
    {
      brand: "Infiniti",
      models: ["Q50", "Q60", "QX50", "QX60", "QX80"],
    },
    {
      brand: "Isuzu",
      models: ["D-Max", "MUX"],
    },
    {
      brand: "Jaguar",
      models: ["E-PACE", "F-PACE", "I-PACE", "XE", "XF", "XJ", "F-Type"],
    },
    {
      brand: "Jeep",
      models: ["Cherokee", "Compass", "Grand Cherokee", "Renegade", "Wrangler"],
    },
    {
      brand: "Kia",
      models: [
        "Cadenza",
        "Forte",
        "k3",
        "K5",
        "Niro",
        "Cerato",
        "Optima",
        "Rio",
        "Seltos",
        "Soul",
        "Sportage",
        "Stinger",
        "Telluride",
        "EV6",
      ],
    },
    {
      brand: "Lamborghini",
      models: ["Aventador", "Huracan", "Urus"],
    },
    {
      brand: "Land Rover",
      models: [
        "Defender",
        "Discovery",
        "Discovery Sport",
        "Range Rover",
        "Range Rover Evoque",
        "Range Rover Sport",
        "Range Rover Velar",
      ],
    },
    {
      brand: "Leap Motors",
      models: ["T03"],
    },
    {
      brand: "Lexus",
      models: ["ES", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
    },
    {
      brand: "Lincoln",
      models: ["Aviator", "Corsair", "Nautilus", "Navigator", "MKZ", "MKX"],
    },
    {
      brand: "Lucid Motors",
      models: ["Air", "Gravity"],
    },
    {
      brand: "MAN",
      models: ["TGE", "TGX", "TGS"],
    },
    {
      brand: "Maserati",
      models: ["Ghibli", "Levante", "Quattroporte"],
    },
    {
      brand: "Mazda",
      models: [
        "CX-3",
        "CX-5",
        "CX-9",
        "Mazda2",
        "Mazda3",
        "Mazda6",
        "MX-5 Miata",
        "CX-30",
        "CX-50",
        "CX-70",
        "CX-90",
      ],
    },
    {
      brand: "McLaren",
      models: ["Artura", "570S", "600LT", "720S", "GT", "765LT"],
    },
    {
      brand: "Mercedes-Benz",
      models: [
        "A-Class",
        "C-Class",
        "E-Class",
        "S-Class",
        "CLA",
        "CLS",
        "GLA",
        "GLB",
        "GLC",
        "GLE",
        "GLS",
        "G-Class",
        "AMG GT",
        "EQC",
        "EQE",
        "EQS",
      ],
    },
    {
      brand: "MINI",
      models: ["Cooper", "Clubman", "Countryman", "Convertible", "Hardtop"],
    },
    {
      brand: "Mitsubishi",
      models: ["Eclipse Cross", "Outlander", "Outlander Sport"],
    },
    {
      brand: "Nissan",
      models: [
        "Altima",
        "Armada",
        "Frontier",
        "Kicks",
        "Leaf",
        "Maxima",
        "Murano",
        "Pathfinder",
        "Rogue",
        "Rogue Sport",
        "Titan",
        "Versa",
        "Slyphy",
      ],
    },
    {
      brand: "Opel",
      models: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland"],
    },
    {
      brand: "Pagani",
      models: ["Huayra", "Huayra Roadster", "Zonda"],
    },
    {
      brand: "Peugeot",
      models: ["208", "308", "508", "2008", "3008", "5008"],
    },
    {
      brand: "Porsche",
      models: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
    },
    {
      brand: "Renault",
      models: [
        "Clio",
        "Mégane",
        "Captur",
        "Kadjar",
        "Scénic",
        "Talisman",
        "Twingo",
        "ZOE",
      ],
    },
    {
      brand: "Rolls-Royce",
      models: ["Cullinan", "Dawn", "Ghost", "Phantom", "Wraith"],
    },
    {
      brand: "Smart",
      models: ["EQ ForTwo", "EQ ForFour"],
    },
    {
      brand: "Subaru",
      models: [
        "Ascent",
        "BRZ",
        "Crosstrek",
        "Forester",
        "Impreza",
        "Legacy",
        "Outback",
      ],
    },
    {
      brand: "Suzuki",
      models: ["Jimny", "Swift", "Vitara"],
    },
    {
      brand: "Tesla",
      models: [
        "Model S",
        "Model 3",
        "Model X",
        "Model Y",
        "Cybertruck",
        "Roadster",
      ],
    },
    {
      brand: "Toyota",
      models: [
        "Camry",
        "Corolla",
        "Prius",
        "RAV4",
        "Highlander",
        "Tacoma",
        "Tundra",
        "4Runner",
        "Land Cruiser",
        "Avalon",
        "Sienna",
        "Yaris",
        "C-HR",
        "Sequoia",
        "Supra",
        "BZ4",
        "BZ3",
      ],
    },
    {
      brand: "Volkswagen",
      models: [
        "Golf",
        "Passat",
        "Tiguan",
        "Atlas",
        "Arteon",
        "ID.4",
        "ID.6",
        "ID.3",
        "E-Golf",
        "E-Bora",
        "E-Lavida",
      ],
    },
    {
      brand: "Volvo",
      models: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
    },
  ];
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
    setCar({ ...car, category: selectedCategory });
    setDisableInput(selectedCategory === "كهربائية");
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
              2
            </option>
            <option value="2">4</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="car-input-label">
            :اللون
          </label>
          <select
            required
            value={car?.color}
            id="color"
            name="color"
            onChange={(e) => setCar({ ...car, color: e.target.value })}
            className="car-input-text"
          >
            <option value="White" defaultValue>
              {" "}
              ابيض{" "}
            </option>
            <option value="أسود">أسود</option>
            <option value="فضي">فضي</option>
            <option value="رمادي">رمادي</option>
            <option value="أسمنتي">أسمنتي</option>
            <option value="أحمر">أحمر</option>
            <option value="خمري">خمري</option>
            <option value="أصفر">أصفر</option>
            <option value="برتقالي">برتقالي</option>
            <option value="ذهبي">ذهبي</option>
            <option value="برونزي">برونزي</option>
            <option value="بني">بني</option>
            <option value="بيج">بيج</option>
            <option value="أزرق">أزرق</option>
            <option value="كحلي">كحلي</option>
            <option value="أزرق فاتح">أزرق فاتح</option>
            <option value="أخضر">أخضر</option>
            <option value="زيتي">زيتي</option>
            <option value="تركواز">تركواز</option>
            <option value="بترولي">بترولي</option>
            <option value="بنفسجي">بنفسجي</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="fuel" className="car-input-label">
            :نوع الوقود
          </label>
          <select
            required
            value={car.fuel}
            id="fuel"
            name="fuel"
            onChange={(e) => setCar({ ...car, fuel: e.target.value })}
            className="car-input-text"
            disabled={DisableInput}
          >
            {DisableInput ? (
              <option value="كهربائية">كهربائية</option>
            ) : (
              <>
                <option value="بنزين">بنزين</option>
                <option value="ديزل">ديزل</option>
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
