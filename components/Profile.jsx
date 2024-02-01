"use client";
import React from "react";
import Image from "next/image";
import CarCard from "@/components/CarCard";
import LoadingSkeleton from "@/app/Loading";
<<<<<<< HEAD
import { useState ,useEffect} from "react";
=======
import {useState} from "react";
>>>>>>> 9dd1c2f (dwq)
const Profile = ({ user, cars, handleDelete }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <>
      {
          isLoading?
          (<LoadingSkeleton/>)
          :
          (<div className="profile-div">
          <p className="profile-name">{user?.name}</p>
          <div className="flex flex-col py-8">
            <div className="flex flex-col mx-auto py-8 ">
              {user?.image && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <Image
                    unoptimized
                    style={{ borderRadius: "50%", width: "75%", height: "80%" }}
                    src={user?.image}
                    alt="Decoded Image"
                    width={500}
                    height={500}
                  />
                </div>
              )}
              <p className="profile-info2">
                {user?.subscription + ":الأشتراك"}
              </p>
              <p className="profile-info2">
                {cars?.length + ":عدد السيارات"}
              </p>
              {/* <p className="font-mono text-orange-700 text-3xl p-5 text-center">
                Type Of Organization
              </p> */}
            </div>
  
            <div className="profile-stats">
              <p className="profile-bio">{user?.bio}</p>
              <button className="profile-phone-button" onClick={() =>
              (window.location.href = `tel:${user?.phoneNumber}`)
            }>
                
                {user?.phoneNumber + "      :رقم الهاتف"}
              </button>
            </div>
          </div>
          <CarCard data={cars} handleDelete={handleDelete} />
        </div>)
      }
    </>
  );
};

export default Profile;
