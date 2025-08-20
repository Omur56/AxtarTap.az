// const mongoose = require("mongoose");

// const RealEstateSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     unique: true,
//   },
//   title_type: String,
//   type_building: String,
//   field: String,
//   number_of_rooms: String,
//   location: String,
//   city: String,
//   price: String,
//   data: Date,
//   description: String,
//   contact: {
//     name: String,
//     email: String,
//     phone: String,
//     liked: Boolean,
//     favorite: Boolean,
//     data: Date,
//   },
//   images: [String] // çoxlu şəkil saxlayır
// });

// module.exports = mongoose.model("RealEstate", RealEstateSchema);


import mongoose from "mongoose";

const RealEstateSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title_type: String,
  type_building: String,
  field: String,
  number_of_rooms: String,
  location: String,
  city: String,
  price: String,
  data: Date,
  description: String,
  contact: {
    name: String,
    email: String,
    phone: String,
    liked: Boolean,
    favorite: Boolean,
    data: Date,
  },
  images: [String], // çoxlu şəkil saxlayır
});

const RealEstate = mongoose.model("RealEstate", RealEstateSchema);
export default RealEstate;
