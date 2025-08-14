const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
    id: {
    type: Number,
    unique: true,
  },
    title: String,
    brand: String,
    model: String,
    price: String,
    location: String,
    color: String,
    storage: String,
    rom: String,
    sim_card: String,
    images: [String],
    description: String,
    contact: {
        name: String,
        email: String,
        phone: String,
    },
    liked: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false },
    data: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Phone", phoneSchema);