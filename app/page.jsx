"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Feed from "@/components/Feed";
import Link from "next/link";
import LoadingSkeleton from "./Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getImageFileName = (src) => src.split("/").pop().split(".")[0];

  useEffect(() => {
    fetch(`/api/profile/car`, {
      method: "GET",
    });
  }, []);
  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      // Simulating an API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="font-[Poppins]  bg-gray-900 h-screen">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
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
              <Link
                href={`/category/${getImageFileName("/images/gasoline.jpg")}`}
              >
                <Image
                  src="/images/gasoline.jpg"
                  alt="Gasoline"
                  className=" mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Gasoline</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link
                href={`/category/${getImageFileName("/images/electric.jpg")}`}
              >
                <Image
                  src="/images/electric.jpg"
                  alt="Electric"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Electric</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link
                href={`/category/${getImageFileName("/images/pick-up.png")}`}
              >
                <Image
                  src="/images/pick-up.png"
                  alt="Pickup trucks"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Pickup trucks</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center w-auto">
              <Link
                href={`/category/${getImageFileName("/images/hybrid.jpg")}`}
              >
                <Image
                  src="/images/hybrid.jpg"
                  alt="Hybrid"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Hybrid</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link href={`/category/${getImageFileName("/images/bus.png")}`}>
                <Image
                  src="/images/bus.png"
                  alt="Buses"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Buses</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link href={`/category/${getImageFileName("/images/lorry.jpg")}`}>
                <Image
                  src="/images/lorry.jpg"
                  alt="Lorrys"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl pt-8">Lorrys</p>
              </Link>
            </div>
          </div>
          <p className="text-white text-6xl text-center mt-12  bg-gray-900 ">
            Body Type
          </p>
          <div className=" grid grid-cols-8 gap-8 lg:mx-32 md:mx-8 xs:mx-auto my-4 bg-gray-900 justify-between">
            <div className="bg-white p-4 rounded-lg text-center ">
              <Link href={`/bodytype/${getImageFileName("/images/coupe.svg")}`}>
                <Image
                  src="/images/coupe.svg"
                  alt="Coupe"
                  className=" mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Coupe</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/sedan.svg")}`}>
                <Image
                  src="/images/sedan.svg"
                  alt="Sedan"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Sedan</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/hatch.svg")}`}>
                <Image
                  src="/images/hatch.svg"
                  alt="Hatch"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Hatch</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center w-auto">
              <Link href={`/bodytype/${getImageFileName("/images/wagon.svg")}`}>
                <Image
                  src="/images/wagon.svg"
                  alt="Wagon"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Wagon</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/suv.svg")}`}>
                <Image
                  src="/images/suv.svg"
                  alt="SUV"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">SUV</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link
                href={`/bodytype/${getImageFileName("/images/pick-up.svg")}`}
              >
                <Image
                  src="/images/pick-up.svg"
                  alt="Pickup"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Pickup</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link
                href={`/bodytype/${getImageFileName("/images/minivan.svg")}`}
              >
                <Image
                  src="/images/minivan.svg"
                  alt="Minivan"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Minivan</p>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/other.svg")}`}>
                <Image
                  src="/images/other.svg"
                  alt="Other"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-2xl">Other</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col mx-auto text-center">
            <p className="text-white text-6xl ">Latest Cars</p>
          </div>

          <Feed />
        </>
      )}
    </div>
  );
};

export default Home;
