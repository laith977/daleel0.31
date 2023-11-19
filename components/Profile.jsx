"use client";
import React from "react";
import Image from "next/image";
import CarCard from "@/components/CarCard";

const Profile = ({ data, handleEdit, handleDelete }) => {
  return (
    <>
      <div className="flex flex-col my-32 space-y-18 text-white">
        <p className="header text-center text-7xl pt-8">{data["user"]?.name}</p>
        <div className="flex flex-col py-8">
          <div className="flex flex-col mx-auto py-8 ">
            {data["user"]?.image && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
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
            <p className="font-mono text-orange-700 text-3xl p-5 text-center">
              {"Subscription: " + data["user"]?.subscription}
            </p>
            <p className="font-mono text-orange-700 text-3xl p-5 text-center">
              {"Number Of Cars: " + data["user"]?.number_of_cars}
            </p>
            {/* <p className="font-mono text-orange-700 text-3xl p-5 text-center">
              Type Of Organization
            </p> */}
          </div>

          <div className="flex flex-col py-8">
            <p className="text-xl italic p-24 md:text-md">
              {data["user"]?.bio}
            </p>
            <button className="bg-green-600 mx-auto rounded-md py-4 px-32 text-white">
              {data["user"]?.phoneNumber}
            </button>
          </div>
        </div>
        <CarCard
          data={data["cars"]}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default Profile;
