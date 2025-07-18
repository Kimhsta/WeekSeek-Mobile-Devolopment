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

    if (!user) {
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...userData } = user;

    return res.json({
      message: 'Login berhasil',
      token,
      user: userData,
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan saat login',
    });
  }
};

module.exports = {
  register,
  login,
};
