const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const profile = req.file ? req.file.filename : null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        profile,
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    res.status(201).json({
      status: true,
      message: "User registered",
      user: newUser,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      status: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
