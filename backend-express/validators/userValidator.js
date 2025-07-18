const { body } = require("express-validator");
const prisma = require("../prisma/client"); // Pastikan ini sesuai path

const registerValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .isEmail().withMessage("Valid email is required")
    .custom(async (email) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email ini sudah digunakan. Silakan gunakan email lain.");
      }
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Role must be 'admin' or 'user'"),
];

module.exports = { registerValidator };

// ✅ Validator untuk Login
const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = {
  registerValidator,
  loginValidator,
};
