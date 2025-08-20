import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: String,
  brand: String,
  model: String,
  price: String,
  location: String,
  images: [String],
  description: String,
  contact: {
    name: String,
    email: String,
    phone: String,
  },
  liked: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  data: { type: Date, default: Date.now }
});

const Accessory = mongoose.model("Accessory", accessorySchema);
export default Accessory;
