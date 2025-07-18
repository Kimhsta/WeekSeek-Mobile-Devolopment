const express = require("express");
const { registerValidator, loginValidator } = require("../validators/userValidator");
const validateRequest = require("../middlewares/validateRequest");
const { register, login } = require("../controllers/authController");
const { uploadProfile } = require("../middlewares/uploads"); 

const router = express.Router();

router.post(
  "/register",
  uploadProfile.single("profile"),     
  registerValidator,                  
  validateRequest,                     
  register                            
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  login
);

module.exports = router;
