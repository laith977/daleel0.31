import Car from "@/models/car";
import { connectToDatabase } from "@/utils/database";
import categories from "@/constants/categories";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const carobject = categories.find((type) => type.alt === params.searchtype);
    if (!carobject) {
      return new Response("Invalid search type", { status: 400 });
    }

    const car = await Car.find({
      $or: [{ category: carobject.alt }, { category: carobject.label }],
    });

    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
