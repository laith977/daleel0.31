import Car from "@/models/car";
import User from "@/models/user";

import { connectToDatabase } from "@/utils/database";
//GET (read)

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

  try {
    await connectToDatabase();
    const car = await Car.findById(params.id);

    if (!car) {
      return new Response("Car not found", { status: 404 });
    }

    // Update car properties
    car.name = name || car.name;
    car.description = description || car.description;

    // Assuming 'image' is an array, update it accordingly
    if (image && image.length > 0) {
      // Process each image in the array
      const carImages = car.pictures || []; // Assuming 'pictures' is the field in the Car model

      for (const picture of image) {
        const fileName = `${car.creator + Math.random()}_123456789.png`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);
        carImages.push(`/uploads/${fileName}`);

        const imageData = Buffer.from(picture, "base64");

        // Write the image to the server
        await fs.writeFile(filePath, imageData);
      }

      car.pictures = carImages;
    }

    car.price = price || car.price;
    car.phone_number = phone_number || car.phone_number;
    car.year = year || car.year;
    car.make = make || car.make;
    car.model = model || car.model;
    car.mileage = mileage || car.mileage;
    car.transmission = transmission || car.transmission;
    car.type = type || car.type;
    car.doors = doors || car.doors;
    car.color = color || car.color;
    car.fuel = fuel || car.fuel;
    car.region = region || car.region;

    // Save the updated car
    await car.save();

    return new Response(JSON.stringify(car), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating car:", error);
    return new Response(`Failed to update car. Error: ${error.message}`, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

//DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();
    const car = await Car.findByIdAndDelete(params.id);

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
