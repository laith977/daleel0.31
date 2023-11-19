import User from "@/models/user";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/utils/database";
import path from "path";
import fs from "fs/promises";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

export const GET = async () => {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id);
    if (!user) return new Response("User not found", { status: 404 });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch user", { status: 500 });
  }
};

export const PATCH = async (req) => {
  const { bio, subscription, number_of_cars, phoneNumber, name, image } =
    await req.json();

  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    const existingUser = await User.findById(session?.user.id);
    if (!existingUser) return new Response("User not found", { status: 404 });

    if (image) {
      const imageData = Buffer.from(image, "base64");
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      const fileName = `${existingUser._id}_123456789.png`;
      const filePath = path.join(uploadsDir, fileName);

      // Write the image to the server
      await fs.writeFile(filePath, imageData);

      // Update the user's images field with the local path
      existingUser.image = `/uploads/${fileName}`;
    }

    existingUser.name = name;
    existingUser.bio = bio;
    existingUser.subscription = subscription;
    existingUser.phoneNumber = phoneNumber;
    existingUser.number_of_cars = number_of_cars;

    await existingUser.save();

    return new Response(JSON.stringify(existingUser), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update profile", {
      status: 500,
    });
  }
};
