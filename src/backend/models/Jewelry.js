const mongoose = require("mongoose");

const jewelrySchema = new mongoose.Schema({
    id: {
    type: Number,
    unique: true,
  },
    title: String,
    cateqory: String,
   type_of_goods: String,
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
    data: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Jewelry", jewelrySchema);
