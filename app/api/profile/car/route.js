import Car from "@/models/car";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import path from "path";
import fs from "fs/promises";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

const randomKey = () => (Math.random() + 1).toString(36).substring(7);

export const GET = async (request) => {
  try {
    await connectToDatabase();

    const filter = {};

    const cars = await Car.find(filter)
      .populate("name")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch cars", { status: 500 });
  }
};
export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const car = {};
    for (const [key, value] of formData.entries()) {
      if (car[key]) {
        car[key] = [car[key], value];
      } else {
        car[key] = value;
      }
    }
    car.images = formData.getAll("images") || [];
    const {
      name,
      description,
      images,
      price,
      phone_number,
      year,
      make,
      model,
      mileage,
      transmission,
      category,
      doors,
      color,
      fuel,
      region,
      bodytype,
    } = car;

    await connectToDatabase();
    const session = await getServerSession(authOptions);
    const existingUser = await User.findById(session?.user.id);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    let carPictures = [];

    if (images && images.length > 0) {
      // Process each picture in the array
      for (const file of images) {
        const fileName = `${
          existingUser._id + Math.random()
        }_${randomKey()}.png`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);
        carPictures.push(`/uploads/${fileName}`);

        await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
      }
    }

    const newCarData = {
      creator: session?.user?.id,
      name,
      description,
      price,
      phone_number,
      year,
      make,
      model,
      mileage,
      transmission,
      category,
      doors,
      color,
      fuel,
      region,
      pictures: carPictures,
      bodytype: "dqw",
    };

    const newCar = new Car(newCarData);
    await newCar.save();

    return new Response(JSON.stringify(newCar), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating new car:", error);
    return new Response("Failed to create new car", {
      status: 500,
    });
  }
};
