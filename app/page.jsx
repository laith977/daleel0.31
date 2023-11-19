"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Feed from "@/components/Feed";
const Home = () => {
  useEffect(() => {
    fetch(`/api/profile/car`, {
      method: "GET",
    });
  }, []);

  return (
    <div className="font-[Poppins]  bg-gray-900 h-screen">
      <div className="text-center mt-24 flex flex-col items-center">
        <p className={`text-white text-2xl`}>Get the help you need</p>
        <h2 className={`text-white text-7xl`}>Daleel AlHurra For Cars</h2>
        <div className="flex justify-center m-16">
          <Image
            className="cursor-pointer min-w-xs lg:max-w-md"
            src="/images/whitelogo.png"
            alt="..."
            width={720}
            height={720}
          ></Image>
        </div>
        <p className="text-white text-4xl">Trade, Buy, Sell Cars Online.</p>
      </div>
      <p className="text-white text-6xl text-center mt-12  bg-gray-900 ">
        Categories
      </p>
      <div className=" grid grid-cols-3 gap-8 lg:mx-32 md:mx-8 xs:mx-auto my-4 bg-gray-900 justify-between">
        <div className="bg-white p-4 rounded-lg text-center ">
          <Image
            src="/images/gasoline.jpg"
            alt="Gasoline"
            className=" mx-auto"
            width={240}
            height={300}
          />
          <p className="text-black text-2xl">Gasoline</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center">
          <Image
            src="/images/electric.jpg"
            alt="Electric"
            className=" mx-auto"
            width={240}
            height={300}
          />
          <p className="text-black text-2xl">Electric</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center">
          <Image
            src="/images/pickup.png"
            alt="Pickup trucks"
            className=" mx-auto"
            width={240}
            height={300}
          />
          <p className="text-black text-2xl">Pickup trucks</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center w-auto">
          <Image
            src="/images/hybrid.jpg"
            alt="Hybrid"
            className=" mx-auto"
            width={240}
            height={300}
          />
          <p className="text-black text-2xl">Hybrid</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center">
          <Image
            src="/images/bus.png"
            alt="Buses"
            className=" mx-auto"
            width={240}
            height={300}
          />
          <p className="text-black text-2xl">Buses</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center">
          <Image
            src="/images/lorry.jpg"
            alt="Lorrys"
            className=" mx-auto"
            width={240}
            height={300}
          />
          <p className="text-black text-2xl pt-8">Lorrys</p>
        </div>
      </div>

      <div className="flex flex-col mx-auto text-center">
        <p className="text-white text-6xl ">Latest Cars</p>
      </div>
      <Feed />
    </div>
  );
};

export default Home;
