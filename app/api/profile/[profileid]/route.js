import Car from "@/models/car";
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";
// import { getSession } from "next-auth/react";

// export const POST = async (req) => {
//   const { name, bio, subscription, type, number_of_cars, phoneNumber } =
//     await req.json();

//   const session = await getSession({ req });

//   try {
//     await connectToDatabase();
//     const user = await User.findOne({
//       _id: session?.user?.id,
//     });
//     user.name = name;
//     user.bio = bio;
//     user.subscription = subscription;
//     user.type = type;
//     user.number_of_cars = number_of_cars;
//     user.phoneNumber = phoneNumber;
//     await user.save();

//     return new Response(JSON.stringify(user), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to save profile", {
//       status: 500,
//     });
//   }
// };

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();
    console.log("fetch user and cars");

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

// export const PATCH = async (req) => {
//   const { name, bio, subscription, type, number_of_cars, phoneNumber } =
//     await req.json();

//   const session = await getSession({ req });

//   try {
//     await connectToDatabase();
//     const user = await User.findOne({
//       _id: session?.user?.id,
//     });

//     // Update user properties only if they are provided in the request
//     if (name) user.name = name;
//     if (bio) user.bio = bio;
//     if (subscription) user.subscription = subscription;
//     if (type) user.type = type;
//     if (number_of_cars) user.number_of_cars = number_of_cars;
//     if (phoneNumber) user.phoneNumber = phoneNumber;

//     await user.save();

//     return new Response(JSON.stringify(user), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to update profile", {
//       status: 500,
//     });
//   }
// };
