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
    year: 2000,
    make: "",
    model: "",
    mileage: "zero",
    transmission: "normal",
    category: "gasoline",
    doors: "2",
    color: "White",
    // bodytype: "",
    fuel: "Electric",
    region: "الأردن",
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
          doors: Car.doors,
          color: Car.color,
          fuel: Car.fuel,
          region: "jordan",
          // bodytype: "", // Add bodytype to the payload
          category: Car.category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to create car:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating car:", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <CarForm
      type="انشئ الأعلان"
      car={Car}
      setCar={setCar}
      submitting={Submitting}
      handleSubmit={createCar}
    ></CarForm>
  );
};

export default CreateCar;
