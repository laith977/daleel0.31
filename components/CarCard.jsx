import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
const CarCard = ({
  data = [],
  handleEdit = () => {},
  handleDelete = () => {},
  handleTagClick = () => {},
}) => {
  const { data: session } = useSession();
  console.log("Data in CarCard:", data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-12 justify-around mx-4 sm:mx-8 lg:mx-32">
      {(Array.isArray(data) ? data : []).map((car) => (
        <div
          key={car?._id}
          className="bg-white p-4 rounded-lg text-center flex flex-col justify-around"
        >
          <div className="flex flex-col items-center">
            <Link href={`/profile/${car.creator}/car/${car._id}`}>
              <div className="relative w-64 h-32 sm:w-32 overflow-hidden rounded-md">
                <Image
                  src={car?.pictures[0] || ""}
                  alt="Car"
                  className="mx-auto object-cover w-full h-full"
                  width={200}
                  height={200}
                />
              </div>
            </Link>
          </div>

          <p className="text-black text-lg">{car?.name}</p>
          {session?.user?.id && car?.creator === session?.user?.id && (
            <div className="flex flex-col sm:flex-row justify-around mt-4">
              <button
                className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg mb-2 sm:mb-0"
                onClick={() => {
                  handleDelete(car?._id);
                }}
              >
                Delete
              </button>
              <Link href={`/profile/car/${car?._id}`}>
                <button className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg">
                  Edit
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
