const { body } = require("express-validator");

// ✅ Validator untuk Register
const registerValidator = [
  body("profile").notEmpty().withMessage("Profile is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Role must be 'admin' or 'user'"),
];

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
