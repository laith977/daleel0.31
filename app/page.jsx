"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Feed from "@/components/Feed";
import Link from "next/link";
import LoadingSkeleton from "./Loading";
const categories = [
  { image: "/images/gasoline.jpg", alt: "Gasoline", label: "وقود" },
  { image: "/images/electric.jpg", alt: "Electric", label: "كهربائية" },
  { image: "/images/pick-up.png", alt: "Pickup trucks", label: "البيك أب" },
  { image: "/images/hybrid.jpg", alt: "Hybrid", label: "هايبرد" },
  { image: "/images/bus.png", alt: "Buses", label: "باصات" },
  { image: "/images/lorry.jpg", alt: "Lorrys", label: "شاحنات نقل" },
];
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
    <div className="font-[Poppins]  bg-gray-900">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="text-center mt-56 lg:mt-32 flex flex-col items-center pt-8">
            <p className={`text-white text-2xl mb-8`}>
              شريكك للحصول على أقل الأسعار
            </p>
            <h2 className={`text-white text-7xl`}>
              موقع دليل الحرة لتجارة السيارات
            </h2>
            <div className="flex justify-center m-16">
              <Image
                className="cursor-pointer w-full lg:max-w-md mx-auto rounded-3xl  "
                src="/images/whitelogo.png"
                alt="Hero Image"
                width={1200}
                height={800}
                style={{ aspectRatio: "10/8" }}
              />
            </div>
            <p className="text-white text-4xl">تجارة، شراء، بيع السيارات</p>
          </div>
          <p className="text-white text-6xl text-center mt-12  bg-gray-900 ">
            الفئات
          </p>
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-8 lg:mx-32 md:mx-8 sm:mx-auto my-4 bg-gray-900 justify-between mx-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg text-center">
                <Link href={`/category/${getImageFileName(category.image)}`}>
                  <Image
                    src={category.image}
                    alt={category.alt}
                    className="mx-auto"
                    width={240}
                    height={300}
                  />
                  <p className="text-black text-2xl">{category.label}</p>
                </Link>
              </div>
            ))}
          </div>
          {/* <p className="text-white text-6xl text-center mt-12  bg-gray-900 ">
            Body Type
          </p>
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-8 mx-4 md:mx-8 lg:mx-32 my-4 bg-gray-900 justify-between">
            <div className="bg-white p-4 rounded-lg text-center ">
              <Link href={`/bodytype/${getImageFileName("/images/coupe.svg")}`}>
                <Image
                  src="/images/coupe.svg"
                  alt="Coupe"
                  className=" mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-lg md:text-2xl">Coupe</p>
              </Link>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/sedan.svg")}`}>
                <Image
                  src="/images/sedan.svg"
                  alt="Sedan"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-lg md:text-2xl">Sedan</p>
              </Link>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/hatch.svg")}`}>
                <Image
                  src="/images/hatch.svg"
                  alt="Hatch"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-lg md:text-2xl">Hatch</p>
              </Link>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/wagon.svg")}`}>
                <Image
                  src="/images/wagon.svg"
                  alt="Wagon"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-lg md:text-2xl">Wagon</p>
              </Link>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/suv.svg")}`}>
                <Image
                  src="/images/suv.svg"
                  alt="SUV"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-lg md:text-2xl">SUV</p>
              </Link>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg text-center">
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
                <p className="text-black text-lg md:text-2xl">Pickup</p>
              </Link>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg text-center">
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
                <p className="text-black text-lg md:text-2xl">Minivan</p>
              </Link>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg text-center">
              <Link href={`/bodytype/${getImageFileName("/images/other.svg")}`}>
                <Image
                  src="/images/other.svg"
                  alt="Other"
                  className="mx-auto"
                  width={240}
                  height={300}
                />
                <p className="text-black text-lg md:text-2xl">Other</p>
              </Link>
            </div>
          </div> */}
          <div className="flex flex-col mx-auto text-center pt-12">
            <p className="text-white text-6xl ">السيارات المعروضة</p>
          </div>

          <Feed />
        </>
      )}
    </div>
  );
};

export default Home;
