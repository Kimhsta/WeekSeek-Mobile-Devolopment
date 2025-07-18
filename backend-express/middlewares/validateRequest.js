const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file && req.file.destination && req.file.filename) {
      const filePath = path.join(req.file.destination, req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const firstError = errors.array()[0];
    return res.status(400).json({
      status: false,
      message: firstError.msg,
    });
  }

  next();
};

module.exports = validateRequest;
