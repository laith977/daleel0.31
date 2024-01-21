import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
const CarCard = ({
  data = [],
  handleEdit = () => {},
  handleDelete = () => {},
  handleTagClick = () => {},
}) => {
  const { data: session } = useSession();
  const params = useParams();

  return (
    <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-12 sm:gap-6 lg:gap-12 mx-auto justify-center ">
      {(Array.isArray(data) ? data : []).map((car) => (
        <div
          key={car?._id}
          className=" bg-white p-2 w-36 rounded-lg text-center flex flex-col justify-between border border-gray-200 shadow-md"
        >
          <Link href={`/profile/${car.creator}/car/${car._id}`}>
            <div className="relative overflow-hidden rounded-md h-40 sm:h-48">
              <Image
                unoptimized
                src={car?.pictures[0] || ""}
                alt="Car"
                className="object-cover w-full h-full"
                layout="fill"
              />
            </div>
          </Link>

          <p className="text-black text-xl max-sm:text-sm mt-2 font-satoshi">
            {car?.name}
          </p>
          <p className="text-black text-xl max-sm:text-sm mt-2 font-satoshi">
            السعر: {car?.price}
          </p>

          {session?.user?.id &&
            car?.creator === session?.user?.id &&
            params?.profileid !== undefined && (
              <div className="flex flex-col sm:flex-row justify-around mt-4">
                <button
                  className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg mb-2 sm:mb-0"
                  onClick={() => {
                    handleDelete(car?._id);
                  }}
                >
                  حذف
                </button>
                <Link href={`/profile/car/${car?._id}`}>
                  <button
                    className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg"
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
      ))}
    </div>
  );
};

export default CarCard;
