const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");

// User-in elanları (auth token ilə)
router.get("/my-announcements", async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware token-dan istifadəçi ID alır
    const announcements = await Announcement.find({ user: userId });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Elanı silmək
router.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Elanı redaktə etmək
router.put("/:id", async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Announcement not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
