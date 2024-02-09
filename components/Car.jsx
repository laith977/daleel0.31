import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSkeleton from "@/app/Loading";

const Car = ({ data }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowFullScreen(true);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % data["car"]?.pictures?.length
    );
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? data["car"]?.pictures?.length - 1 : prevIndex - 1
    );
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  const infoRows = [
    { label: "السنة", value: data["car"]?.year },
    { label: "المصنع", value: data["car"]?.make },
    { label: "الموديل", value: data["car"]?.model },
    { label: "عدد الكيلومترات", value: `${data["car"]?.mileage} ` + "" },
    { label: "ناقل الحركة", value: data["car"]?.transmission },
    { label: "الفئة", value: data["car"]?.category },
    { label: "عدد الأبواب", value: data["car"]?.doors },
    { label: "اللون", value: data["car"]?.color },
    { label: "نوع الوقود", value: data["car"]?.fuel },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="car-div">
            <div className="car-col-container">
              {data["car"]?.pictures?.map((element, index) => (
                <div
                  key={index}
                  className="car-col-pic-div"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    unoptimized
                    src={element}
                    alt={`Car Picture ${index + 1}`}
                    className="car-col-pic"
                    width={80}
                    height={60}
                  />
                </div>
              ))}
            </div>
            <div className="car-info-container">
              <p className="car-col-price">
                السعر:
                {` ${data["car"]?.price} `}
                دينار
              </p>
              <button
                className="car-col-call"
                onClick={() =>
                  (window.location.href = `tel:${data["user"]?.phoneNumber}`)
                }
              >
                أتصل بالتاجر
              </button>
              <button
                className="car-col-msg"
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
                <div key={index} className="car-info-div">
                  <span className="car-info-label1">{info.label}</span>
                  <span className="car-info-label">{info.value}</span>
                </div>
              ))}
            </div>
          </div>
          {showFullScreen && (
            <>
              <div className="modal-overlay" onClick={handleCloseFullScreen} />
              <div className="fullscreen-modal">
                <div className="modal-content">
                  <button
                    className="navigation-button left"
                    onClick={handlePreviousImage}
                  >
                    {"<"}
                  </button>
                  <div className="image-container">
                    <button
                      className="close-button"
                      onClick={handleCloseFullScreen}
                    >
                      X
                    </button>
                    <Image
                      src={data["car"]?.pictures[selectedImageIndex]}
                      alt={`Car Picture ${selectedImageIndex + 1}`}
                      width={800}
                      height={600}
                      objectFit="contain"
                    />
                  </div>
                  <button
                    className="navigation-button right"
                    onClick={handleNextImage}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <div className="car-desc-div1 ">
        {" "}
        <div className="car-desc-div2">
          {" "}
          <div className="car-desc-div3">
            {" "}
            <Link href={`/profile/${data["car"]?.creator}`}>
              {" "}
              {data["user"]?.image && (
                <div className="car-user-pic">
                  {" "}
                  <Image
                    unoptimized
                    className="object-cover w-full h-full"
                    src={data["user"]?.image}
                    alt="User Image"
                    width={160}
                    height={160}
                  />{" "}
                </div>
              )}{" "}
            </Link>{" "}
            <div className="flex flex-col my-auto text-center ">
              {" "}
              <p className="car-user-name">{data["user"]?.name}</p>{" "}
              <p className="car-region">{data["car"]?.region}</p>{" "}
            </div>{" "}
          </div>{" "}
          <br /> <p className="car-desc">{data["car"]?.description}</p>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default Car;
