import Car from "@/models/car";
import { connectToDatabase } from "@/utils/database";
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();
    const car = await Car.find({
      category: params.searchtype,
    });

    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
