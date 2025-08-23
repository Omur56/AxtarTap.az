import express from "express";
import multer from "multer";
import path from "path";
import Ad from "../models/Ad.js"; // Reklam modeli

const router = express.Router();

// Upload ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/ads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Reklam əlavə et
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const ad = new Ad({
      title: req.body.title,
      link: req.body.link,
      image: req.file.path,
    });
    await ad.save();
    res.json(ad);
  } catch (err) {
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

// Reklam sil
router.delete("/:id", async (req, res) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    res.json({ message: "Reklam silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
