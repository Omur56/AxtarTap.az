// src/backend/db.js

const mongoose = require("mongoose");

const uri = "mongodb+srv://Omur9696:elanlar123@cluster0.pyjgrvq.mongodb.net/elanlar?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB bağlantısı uğurludur");
  } catch (err) {
    console.error("❌ MongoDB bağlantı xətası:", err);
  }
}

module.exports = connectDB;
