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
  const [car, setCar] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    phone_number: "",
    year: 2000,
    make: "",
    model: "",
    mileage: "Zero",
    transmission: "أوتوماتيك",
    category: "وقود",
    doors: "4",
    color: "ابيض",
    // bodytype: "",
    fuel: "بنزين",
    region: "الأردن",
  });

  const createCar = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("creator", session?.user?.id);
      formData.append("name", car.name);
      formData.append("description", car.description);
      formData.append("price", car.price);
      formData.append("phone_number", car.phone_number);
      formData.append("year", car.year);
      formData.append("make", car.make);
      formData.append("model", car.model);
      formData.append("mileage", car.mileage);
      formData.append("transmission", car.transmission);
      formData.append("doors", car.doors);
      formData.append("color", car.color);
      formData.append("fuel", car.fuel);
      formData.append("region", "jordan");
      // formData.append('bodytype', ''); // Add bodytype to the payload
      formData.append("category", car.category);

      // Append each image file separately
      car.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(`/api/profile/car`, {
        method: "POST",
        body: formData,
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
      car={car}
      setCar={setCar}
      submitting={Submitting}
      handleSubmit={createCar}
    />
  );
};

export default CreateCar;
