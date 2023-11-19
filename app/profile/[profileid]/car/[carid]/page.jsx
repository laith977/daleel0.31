"use client";

import Car from "@/components/Car";

import { useEffect, useState } from "react";

const CarDetails = ({ params }) => {
  const [userPosts, setUserPosts] = useState({});

  const car = params.carid;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/profile/car/${car}`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (car) fetchPosts();
  }, [car]);

  return <Car data={userPosts} />;
};

export default CarDetails;
