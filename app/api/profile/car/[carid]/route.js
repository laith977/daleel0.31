import Car from "@/models/car";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/utils/database";
import path from "path";
import fs from "fs/promises";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const car = await Car.findById(params.carid);

    const user = await User.findById(car?.creator);
    if (!car) {
      return new Response("Car not found", { status: 404 });
    }

    const responseData = {
      user: user ? user.toObject() : null,
      car: car ? car.toObject() : null,
    };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user and car", { status: 500 });
  }
};
//PATCH (update)
export const PATCH = async (req, { params }) => {
  try {
    const {
      name,
      description,
      image, // Assuming pictures is an array of base64-encoded images
      price,
      phone_number,
      year,
      make,
      model,
      mileage,
      transmission,
      type,
      doors,
      color,
      fuel,
      region,
    } = await req.json();

    await connectToDatabase();
    const session = await getServerSession(authOptions);
    const existingUser = await User.findById(session?.user.id);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    const existingCar = await Car.findById(params.carid);

    if (!existingCar) {
      return new Response("Car not found", { status: 404 });
    }

    // Check if the user is the creator of the existing car
    if (existingCar.creator.toString() !== session?.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    let carPictures = existingCar.pictures;

    if (image && image.length > 0) {
      carPictures = [];
      for (const picture of image) {
        const fileName = `${existingUser._id + Math.random()}_123456789.png`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);
        carPictures.push(`/uploads/${fileName}`);

        const imageData = Buffer.from(picture, "base64");

        // Write the new image to the server
        await fs.writeFile(filePath, imageData);
      }
    }

    // Update the car data
    existingCar.name = name;
    existingCar.description = description;
    existingCar.price = price;
    existingCar.phone_number = phone_number;
    existingCar.year = year;
    existingCar.make = make;
    existingCar.model = model;
    existingCar.mileage = mileage;
    existingCar.transmission = transmission;
    existingCar.type = type;
    existingCar.doors = doors;
    existingCar.color = color;
    existingCar.fuel = fuel;
    existingCar.region = region;
    existingCar.pictures = carPictures;

    await existingCar.save();

    return new Response(JSON.stringify(existingCar), {
      status: 200,
    });
  } catch (error) {
    console.error("Error editing car:", error);
    return new Response("Failed to edit car", {
      status: 500,
    });
  }
};

//DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();
    const car = await Car.findByIdAndDelete(params.carid);

    if (!car) {
      return new Response("Car not found", { status: 404 });
    }

    return new Response("Car deleted successfully", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete the car", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
