"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CarForm from "@/components/CarForm";
const UpdateCar = ({ params }) => {
  const router = useRouter();
  const [Submitting, setSubmitting] = useState(false);
  const [Car, setCar] = useState({
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
      console.log(data);
      setCar({
        name: data.name,
        description: data.description,
        image: data.image,
        price: data.price,
        phone_number: data.phone_number,
        year: data.year,
        make: data.make,
        model: data.model,
        mileage: data.mileage,
        transmission: data.transmission,
        type: data.type,
        doors: data.doors,
        color: data.color,
        fuel: data.fuel,
        region: data.region,
      });
    };

    if (params.carid) getCarDetails();
  }, [params.carid]);
  const updateCar = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/profile/edit-car`, {
        method: "PATCH",
        body: JSON.stringify({
          name: Car.name,
          description: Car.description,
          image: Car.image,
          price: Car.price,
          phone_number: Car.phone_number,
          year: Car.year,
          make: Car.make,
          model: Car.model,
          mileage: Car.mileage,
          transmission: Car.transmission,
          type: Car.type,
          doors: Car.doors,
          color: Car.color,
          fuel: Car.fuel,
          region: Car.region,
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
      car={Car}
      setCar={setCar}
      submitting={Submitting}
      handleSubmit={updateCar}
    ></CarForm>
  );
};

export default UpdateCar;
