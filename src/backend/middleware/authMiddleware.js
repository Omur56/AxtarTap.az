const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Giriş tələb olunur" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, iat, exp }
    next();
  } catch {
    return res.status(401).json({ error: "Token etibarsız və ya vaxtı bitib" });
  }
}

module.exports = authMiddleware;
