// import express from "express";
// import multer from "multer";
// import path from "path";
// import Ad from "../models/Ad.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/ads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // Yeni reklam əlavə
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) throw new Error("Şəkil seçilməyib və ya upload qovluğu yoxdur");
//     const ad = new Ad({
//       title: req.body.title,
//       link: req.body.link,
//       image: req.file.path.replace(/\\/g, "/"), // Windows path düzəldildi
//     });
//     await ad.save();
//     res.json(ad);
//   } catch (err) {
//     console.error("❌ Reklam əlavə olunarkən xəta:", err);
//     res.status(500).json({ error: err.message });
//   }
// });


// // Reklamları gətir
// router.get("/", async (req, res) => {
//   try {
//     const ads = await Ad.find().sort({ createdAt: -1 });
//     res.json(ads);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;




import express from "express";
import multer from "multer";
import path from "path";
import Ad from "../models/Ad.js";
import fs from "fs";
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/ads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Yeni reklam əlavə et
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) throw new Error("Şəkil seçilməyib");
    const ad = new Ad({
      title: req.body.title,
      link: req.body.link,
      image: req.file.path.replace(/\\/g, "/"),
    });
    await ad.save();
    res.json(ad);
  } catch (err) {
    console.error("❌ Reklam əlavə olunarkən xəta:", err);
    res.status(500).json({ error: err.message });
  }
});

// Bütün reklamları gətir
router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }



  
});



export default router;
