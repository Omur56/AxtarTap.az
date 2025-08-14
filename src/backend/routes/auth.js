const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Sadə yoxlamalar
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Bütün sahələr tələb olunur" });
    }
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ error: "E-poçt və ya istifadəçi adı artıq mövcuddur" });

    const user = await User.create({ username, email, password });
    res.json({ message: "Qeydiyyat uğurlu", user: user.toSafeJSON() });
  } catch (e) {
    res.status(500).json({ error: "Server xətası" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Email və ya şifrə səhvdir" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "1d" }
  );
  res.json({ token, user: user.toSafeJSON() });
});

// Müştərinin kimliyini təsdiqləmək üçün (refresh UI)
router.get("/me", auth, async (req, res) => {
  const me = await User.findById(req.user.id);
  if (!me) return res.status(404).json({ error: "İstifadəçi tapılmadı" });
  res.json({ user: me.toSafeJSON() });
});

module.exports = router;
