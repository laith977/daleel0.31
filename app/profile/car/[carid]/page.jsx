"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CarForm from "@/components/CarForm";
const UpdateCar = ({ params }) => {
  const router = useRouter();
  const [Submitting, setSubmitting] = useState(false);
  const [car, setCar] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    phone_number: "",
    year: "",
    make: "",
    model: "",
    mileage: "",
    transmission: "",
    type: "",
    doors: "",
    color: "",
    fuel: "",
    region: "",
  });
  useEffect(() => {
    const getCarDetails = async () => {
      const response = await fetch(`/api/profile/car/${params.carid}`);
      const data = await response.json();
      console.log(data["car"]);

      setCar({
        name: data["car"].name,
        description: data["car"].description,
        image: data["car"].image,
        price: data["car"].price,
        phone_number: data["car"].phone_number,
        year: data["car"].year,
        make: data["car"].make,
        model: data["car"].model,
        mileage: data["car"].mileage,
        transmission: data["car"].transmission,
        type: data["car"].type,
        doors: data["car"].doors,
        color: data["car"].color,
        fuel: data["car"].fuel,
        region: data["car"].region,
      });
    };

    if (params.carid) getCarDetails();
  }, [params.carid]);
  const updateCar = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/profile/car/${params.carid}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: car.name,
          description: car.description,
          image: car.image,
          price: car.price,
          phone_number: car.phone_number,
          year: car.year,
          make: car.make,
          model: car.model,
          mileage: car.mileage,
          transmission: car.transmission,
          type: car.type,
          doors: car.doors,
          color: car.color,
          fuel: car.fuel,
          region: car.region,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <CarForm
      type="Update"
      car={car}
      setCar={setCar}
      submitting={Submitting}
      handleSubmit={updateCar}
    ></CarForm>
  );
};

export default UpdateCar;
