"use client";

import Profile from "@/components/Profile";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
const UserProfile = ({ params }) => {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [cars, setCars] = useState([]);

  const username = params.profileid;

  const handleDelete = async (carid) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/profile/car/${carid}`, { method: "DELETE" });
        setCars((cars) => {
          return cars.filter((c) => c._id !== carid);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/profile/${username}`);
      const data = await response.json();
      setUser(data.user);
      setCars(data.cars);
    };

    if (username) fetchData();
  }, [username]);
  return (
    <>
      <Profile user={user} cars={cars} handleDelete={handleDelete} />
    </>
  );
};

export default UserProfile;
