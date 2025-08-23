const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String, // şəkilin yolu (uploads/ads/filename.jpg)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ad", AdSchema);
