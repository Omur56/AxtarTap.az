

// src/backend/models/Announcement.js

const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  category: String,
  brand: String,
  model: String,
  ban_type: String,
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

   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

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


},
{ timestamps: true }
);


module.exports = mongoose.model("Announcement", announcementSchema);
