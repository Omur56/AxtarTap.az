

const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
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


module.exports = mongoose.model("Accessory", accessorySchema);