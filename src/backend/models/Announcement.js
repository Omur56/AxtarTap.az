

// src/backend/models/Announcement.js

const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  category: String,
  brand: String,
  model: String,
  year: String,
  price: String,
  location: String,
  images: [String],
  km: String,
  motor: String,
  transmission: String,
  engine: String,
  data: Date,
  description: String,
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
});


module.exports = mongoose.model("Announcement", announcementSchema);
