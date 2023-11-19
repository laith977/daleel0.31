import Car from "@/models/car";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/utils/database";
import path from "path";
import fs from "fs/promises";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

export const POST = async (req) => {
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

    let carPictures = [];

    if (image && image.length > 0) {
      // Process each picture in the array
      for (const picture of image) {
        const fileName = `${existingUser._id + Math.random()}_123456789.png`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);
        carPictures.push(`/uploads/${fileName}`);

        const imageData = Buffer.from(picture, "base64");

        // Write the image to the server
        await fs.writeFile(filePath, imageData);
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
      type,
      doors,
      color,
      fuel,
      region,
      pictures: carPictures,
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
