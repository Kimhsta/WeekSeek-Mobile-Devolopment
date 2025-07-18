const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const validate = (validators) => [
  ...validators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file && req.file.destination && req.file.filename) {
        const filePath = path.join(req.file.destination, req.file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); 
        }
      }

      const formatted = {};
      errors.array().forEach((e) => (formatted[e.path] = e.msg));

      return res.status(400).json({
        message: 'Validasi gagal',
        errors: formatted,
      });
    }
    next();
  },
];

module.exports = validate;
