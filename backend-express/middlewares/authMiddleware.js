const jwt = require("jsonwebtoken");

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token not provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware hanya untuk admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

// Middleware hanya untuk user biasa
const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Akses hanya untuk user" });
  }
  next();
};

// Ekspor semua secara konsisten
module.exports = {
  verifyToken,
  isAdmin,
  isUser,
};
