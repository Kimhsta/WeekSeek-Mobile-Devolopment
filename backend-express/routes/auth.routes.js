const express = require("express");
const multer = require("multer");
const { registerValidator, loginValidator } = require("../utils/validators/userValidator");
const validateRequest = require("../middlewares/validateRequest");
const { register, login } = require("../controllers/authController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post(
  "/register",
  upload.single("profile"),             
  registerValidator,                   
  validateRequest,                    
  register                             
);

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

module.exports = router;
