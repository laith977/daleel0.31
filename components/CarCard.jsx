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
    <div className=" car-cards-div">
      {(Array.isArray(data) ? data : []).map((car) => (
        <div
          key={car?._id}
          className=" car-card-div "
        >
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

          <p className="car-name">
            {car?.name}
          </p>
          <p className="car-price">
            السعر: {car?.price}
          </p>

          {session?.user?.id &&
            car?.creator === session?.user?.id &&
            params?.profileid !== undefined && (
              <div className="car-buttons">
                <button
                  className="del-button"
                  onClick={() => {
                    handleDelete(car?._id);
                  }}
                >
                  حذف
                </button>
                <Link href={`/profile/car/${car?._id}`}>
                  <button
                    className="edit-button"
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
