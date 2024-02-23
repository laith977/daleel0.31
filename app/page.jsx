"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Feed from "@/components/Feed";
import Link from "next/link";
import LoadingSkeleton from "./Loading";
import categories from "@/constants/categories";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getImageFileName = (src) => src.split("/").pop().split(".")[0];

  useEffect(() => {
    fetch(`/api/profile/car`, {
      method: "GET",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-body">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="big-text">
            {/* <p className={`text-white text-2xl mb-8`}>
              شريكك للحصول على أقل الأسعار
            </p> */}
            {/* <h2 className={`main-text max-sm:text-9xl`}>
              دليـــــل الحـــــرة
            </h2> */}
            <p className="text-8xl text-white">دليل الحرة</p>
            {/* <div className="wrapper text-5xl">
              <div className="bg"> دليـــــل الحـــــرة</div>
              <div className="fg"> دليـــــل الحـــــرة</div>
            </div> */}
            <div className="flex justify-center m-16">
              <Image
                className=" hero-pic"
                src="/images/whitelogo.png"
                alt="Hero Image"
                width={1200}
                height={800}
                style={{ aspectRatio: "10/8" }}
              />
            </div>
            {/* <p className="text-white text-4xl ">شريكك للحصول على اقل الأسعار</p> */}
            <div className="wrapper">
              <div className="bg"> شريكك للحصول على اقل الأسعار</div>
              <div className="fg"> شريكك للحصول على اقل الأسعار</div>
            </div>
          </div>
          <div className="text-effect mt-12">الفئـــات</div>
          {/* <h1 className="mt-24 max-sm:text-8xl">الفئات</h1> */}
          <div className="category-div">
            {categories.map((category, index) => (
              <div key={index} className="card">
                <div className="card2 h-full bg-white p-4 rounded-lg text-center">
                  <Link href={`/category/${getImageFileName(category.image)}`}>
                    <Image
                      src={category.image}
                      alt={category.alt}
                      className="mx-auto"
                      width={240}
                      height={300}
                    />
                    <p className="text-black text-2xl font-mono">
                      {category.label}
                    </p>
                  </Link>
                </div>
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
          <h1 className="text-effect my-24">السيارات المعروضة </h1>

          <Feed />
        </>
      )}
    </div>
  );
};

export default Home;
