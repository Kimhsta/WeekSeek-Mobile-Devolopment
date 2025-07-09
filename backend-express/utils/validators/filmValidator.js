// routes/film.routes.js
const express = require('express');
const multer = require('multer');
const { validationResult } = require('express-validator');
const {
  createFilmValidator,
  updateFilmValidator,
} = require('../utils/validators/filmValidator');

const router = express.Router();

// Storage multer (optional: bisa disesuaikan dengan cloud upload, dsb)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// CREATE FILM
router.post('/', upload.single('poster'), createFilmValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // req.file.path -> bisa kamu simpan ke field 'posterUrl' di database
  // lanjut ke controller
});

// UPDATE FILM
router.put('/:id', upload.single('poster'), updateFilmValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // bisa cek apakah req.file ada, lalu update poster-nya
});

module.exports = router;
