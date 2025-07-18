const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const validate = (validators) => [
  ...validators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Jika ada file yang diunggah dan validasi gagal, hapus file
      if (req.file) {
        const filePath = path.join(__dirname, '../uploads', req.file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Format error ke bentuk object yang lebih user-friendly
      const formattedErrors = {};
      errors.array().forEach((err) => {
        formattedErrors[err.path] = err.msg;
      });

      return res.status(400).json({
        message: 'Validasi gagal',
        errors: formattedErrors,
      });
    }
    next();
  },
];

module.exports = validate;
