import Car from "@/models/car";
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    // Fetch user data
    const user = await User.findOne({ _id: params.profileid });

    // Fetch cars associated with the user
    const cars = await Car.find({ creator: params.profileid });

    // Create an object that includes both user and cars data
    const responseData = {
      user: user ? user.toObject() : null, // Convert user to plain JavaScript object, or null if user not found
      cars: cars.map((car) => car.toObject()), // Convert each car to plain JavaScript object
    };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user and cars", { status: 500 });
  }
};
