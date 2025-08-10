const mongoose = require("mongoose");

const ClothingSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
  images: [String],
  price: String,
  category: String,
  condition: String,
  size: String,
  color: String,
  brand: String,
  location: String,
  contact: {
    name: String,
    email: String,
    phone: String,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },

  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Clothing", ClothingSchema);
