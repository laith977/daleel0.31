import React from "react";
import Image from "next/image";
import Link from "next/link";
const Car = ({ data }) => {
  const infoRows = [
    { label: "السنة", value: data["car"]?.year },
    { label: "المصنع", value: data["car"]?.make },
    { label: "الموديل", value: data["car"]?.model },
    { label: "عدد الكيلومترات", value: `${data["car"]?.mileage} ` + "" },
    { label: "ناقل الحركة", value: data["car"]?.transmission },
    // { label: "Body Type", value: data["car"]?.bodytype },
    { label: "الفئة", value: data["car"]?.category },
    { label: "عدد الأبواب", value: data["car"]?.doors },
    { label: "اللون", value: data["car"]?.color },
    { label: "نوع الوقود", value: data["car"]?.fuel },
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mx-4 sm:mx-8 lg:mx-32 my-8 pt-32 space-y-4 md:space-y-0 gap-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data["car"]?.pictures?.map((element, index) => (
            <div key={index} className="relative overflow-hidden rounded-md">
              <Image
                unoptimized
                src={element}
                alt={`Car Picture ${index + 1}`}
                className="object-cover w-full h-24 sm:h-32 md:h-40 lg:h-48"
                width={80}
                height={60}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col bg-gray-100 border-8 rounded-md border-amber-700 p-6 sm:p-8 lg:p-12 mt-8">
          <p className="text-orange-400 text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
            السعر:
            {` ${data["car"]?.price} `}
            دينار
          </p>
          <button
            className="bg-green-600 text-white rounded-md py-2 px-6 mb-4 md:mb-6"
            onClick={() =>
              (window.location.href = `tel:${data["user"]?.phoneNumber}`)
            }
          >
            أتصل بالتاجر
          </button>

          <button
            className="bg-amber-600 text-white rounded-md py-2 px-6 mb-6 md:mb-8"
            onClick={() => {
              const phoneNumber = data["user"]?.phoneNumber;
              if (phoneNumber) {
                const message = encodeURIComponent("مرحبا");
                const whatsappWebURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
                window.open(whatsappWebURL, "_blank");
              }
            }}
          >
            مراسلة التاجر
          </button>

          {infoRows.map((info, index) => (
            <div key={index} className="mb-8 flex justify-between gap-8">
              <span className="text-black font-bold text-lg md:text-xl lg:text-2xl mb-1">
                {info.label}
              </span>
              <span className="text-black text-base md:text-lg lg:text-xl">
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mx-auto px-24 ">
        <div className="bg-gray-200 flex-col flex m-4 sm:m-8 lg:m-12 mt-8 border border-amber-700 p-4 sm:p-8 lg:p-12 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <Link href={`/profile/${data["car"]?.creator}`}>
              {data["user"]?.image && (
                <div className="rounded-full overflow-hidden h-20 w-20 md:h-32 md:w-32 lg:h-40 lg:w-40">
                  <Image
                    unoptimized
                    className="object-cover w-full h-full"
                    src={data["user"]?.image}
                    alt="User Image"
                    width={160}
                    height={160}
                  />
                </div>
              )}
            </Link>
            <div className="flex flex-col my-auto text-center ">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-400">
                {data["user"]?.name}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-black-500 mt-2 md:mt-4 lg:mt-6">
                {data["car"]?.region}
              </p>
            </div>
          </div>
          <br />
          <p className="text-base md:text-lg lg:text-xl leading-relaxed mt-4">
            {data["car"]?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default Car;
