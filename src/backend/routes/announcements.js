const express = require("express");
const Announcement = require("../models/Announcement");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// List (hamıya açıq)
router.get("/", async (req, res) => {
  const items = await Announcement.find().populate("owner", "username");
  res.json(items);
});

// Detal (hamıya açıq)
router.get("/:id", async (req, res) => {
  const item = await Announcement.findById(req.params.id).populate("owner", "username");
  if (!item) return res.status(404).json({ error: "Elan tapılmadı" });
  res.json(item);
});

// Yarat (yalnız login)
router.post("/", auth, async (req, res) => {
  const payload = { ...req.body, owner: req.user.id };
  const created = await Announcement.create(payload);
  res.status(201).json(created);
});

// Yenilə (yalnız sahib)
router.put("/:id", auth, async (req, res) => {
  const item = await Announcement.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Elan tapılmadı" });
  if (item.owner.toString() !== req.user.id) {
    return res.status(403).json({ error: "İcazə yoxdur" });
  }
  Object.assign(item, req.body);
  await item.save();
  res.json(item);
});

// Sil (yalnız sahib)
router.delete("/:id", auth, async (req, res) => {
  const item = await Announcement.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Elan tapılmadı" });
  if (item.owner.toString() !== req.user.id) {
    return res.status(403).json({ error: "İcazə yoxdur" });
  }
  await item.deleteOne();
  res.json({ message: "Silindi" });
});

module.exports = router;
