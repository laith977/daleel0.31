"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CarForm from "@/components/CarForm";
const CreateCar = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
  const createCar = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/profile/car`, {
        method: "POST",
        body: JSON.stringify({
          creator: session?.user?.id,
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
      type="Create"
      car={Car}
      setCar={setCar}
      submitting={Submitting}
      handleSubmit={createCar}
    ></CarForm>
  );
};

export default CreateCar;
