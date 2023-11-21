import { Schema, model, models } from "mongoose";

const carSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  pictures: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  doors: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  bodytype: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Car = models.Car || model("Car", carSchema);

export default Car;
