// import jwt from "jsonwebtoken";


// function verifyToken(req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(401).json("Access denied");

//   jwt.verify(token, "SECRET_KEY", (err, decoded) => {
//     if (err) return res.status(403).json("Invalid token");
//     req.userId = decoded.id;
//     next();
//   });
// }

// export default verifyToken;
// verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json("You are not authenticated");

  // Bearer varsa ayır, yoxsa birbaşa token
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json("Token is invalid");
  }
};
