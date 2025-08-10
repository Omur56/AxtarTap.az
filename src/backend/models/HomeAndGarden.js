
const mongoose = require("mongoose");

const HomeAndGardenSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  brand: String,
  price: String,
  image: String, // Tam URL saxlayacağıq
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

module.exports = mongoose.model("HomeAndGarden", HomeAndGardenSchema);
