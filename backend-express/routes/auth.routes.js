const express = require("express");
const router = express.Router();

const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/userValidator");

const validateRequest = require("../middlewares/validateRequest");
const { register, login } = require("../controllers/authController");

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

module.exports = router;
