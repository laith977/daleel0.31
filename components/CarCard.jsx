import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
const CarCard = ({
  data = [],
  handleEdit = () => {},
  handleDelete = () => {},
}) => {
  const { data: session } = useSession();
  const params = useParams();

  return (
    <div className=" car-cards-div">
      {(Array.isArray(data) ? data : []).map((car) => (
        <div className="card" key={car?._id}>
          <div className=" car-card-div card2  h-full">
            <Link href={`/profile/${car.creator}/car/${car._id}`}>
              <div className="car-card-link">
                <Image
                  unoptimized
                  src={car?.pictures[0] || ""}
                  alt="Car"
                  className="car-card-pic"
                  layout="fill"
                />
              </div>
            </Link>

            <p className="car-name ">{car?.name}</p>
            <div className="flex flex-row justify-around">
              <p className="car-price ">السعر: {car?.price}</p>
              <p className="car-price ">السنة: {car?.year}</p>
              <p className="car-price "> {car?.model}</p>
            </div>

            {session?.user?.id &&
              car?.creator === session?.user?.id &&
              params?.profileid !== undefined && (
                <div className="car-buttons">
                  <button
                    className="bg-red-700 text-white border border-b-4 font-medium relative px-4 py-2 rounded-md"
                    onClick={() => {
                      handleDelete(car?._id);
                    }}
                  >
                    حذف
                  </button>
                  <Link href={`/profile/car/${car?._id}`}>
                    <button
                      className="bg-green-700 text-white border border-b-4 font-medium relative px-4 py-2 rounded-md"
                      onClick={() => {
                        handleEdit(car?._id);
                      }}
                    >
                      تعديل
                    </button>
                  </Link>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarCard;
