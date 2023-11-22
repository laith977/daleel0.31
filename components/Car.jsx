import React from "react";
import Image from "next/image";
import Link from "next/link";
const Car = ({ data }) => {
  return (
    <>
      <div className="flex flex-col items-center md:flex-row justify-between my-32 mx-4 sm:mx-8 lg:mx-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data["car"]?.pictures?.map((element, index) => (
            <Image
              key={index}
              src={element}
              alt={`Car Picture ${index + 1}`}
              className="rounded-lg"
              width={250}
              height={250}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-4 bg-gray-100 border-8 rounded-md border-amber-700 p-4 sm:p-8 lg:p-12 pb-0 mt-4 md:mt-0">
          <p className="text-orange-300 text-3xl">
            Price: {data["car"]?.price} JOD
          </p>
          <button className="bg-green-600 mx-auto rounded-md py-2 px-6 text-white">
            Call Seller
          </button>
          <button className="bg-amber-600 mx-auto rounded-md py-2 px-6 text-white">
            Message Seller
          </button>
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <div className="flex justify-between">
              <span className="text-black font-bold">Year</span>
              <span className="text-black font-bold">{data["car"]?.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Make</span>
              <span className="text-black font-bold">{data["car"]?.make}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Model</span>
              <span className="text-black font-bold">{data["car"]?.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Mileage</span>
              <span className="text-black font-bold">
                {data["car"]?.mileage}km
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Transmission</span>
              <span className="text-black font-bold">
                {data["car"]?.transmission}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Body Type</span>
              <span className="text-black font-bold">
                {data["car"]?.bodytype}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Category</span>
              <span className="text-black font-bold">
                {data["car"]?.category}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Doors</span>
              <span className="text-black font-bold">{data["car"]?.doors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Color</span>
              <span className="text-black font-bold">{data["car"]?.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Fuel</span>
              <span className="text-black font-bold">{data["car"]?.fuel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto bg-gray-200 flex-col flex max-w-screen-md m-4 sm:m-8 lg:m-12 mt-8 border border-amber-700 p-4 sm:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          <Link href={`/profile/${data["car"]?.creator}`}>
            {data["user"]?.image && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <Image
                  style={{ borderRadius: "50%", width: "75%", height: "80%" }}
                  src={data["user"]?.image}
                  alt="Decoded Image"
                  width={500}
                  height={500}
                />
              </div>
            )}
          </Link>
          <div className="flex flex-col my-auto text-center md:text-left">
            <p className="text-xl font-bold text-orange-400">
              {data["user"]?.name}
            </p>
            <p className="text-xl font-bold text-black-500">
              {data["car"]?.region}
            </p>
          </div>
        </div>
        <br />
        <p className="text-lg leading-relaxed">{data["car"]?.description}</p>
      </div>
    </>
  );
};

export default Car;
