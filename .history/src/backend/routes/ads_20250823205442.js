import express from "express";
import multer from "multer";
import path from "path";
import Ad from "../models/Ad.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/ads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Yeni reklam əlavə
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const ad = new Ad({
      title: req.body.title,
      link: req.body.link,
      image: req.file.path.replace(/\\/g, "/"), // ✅ yol düzəldildi
    });
    await ad.save();
    res.json(ad);
  } catch (err) {
    console.error("❌ Reklam əlavə olunarkən xəta:", err);
    res.status(500).json({ error: err.message });
  }
});

// Reklamları gətir
router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
