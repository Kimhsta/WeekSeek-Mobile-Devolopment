const { body } = require('express-validator');

exports.createFilmValidator = [
  body('title').notEmpty().withMessage('Judul wajib diisi'),
  body('genre').notEmpty().withMessage('Genre wajib diisi'),
  body('release_year').isInt({ min: 1900 }).withMessage('Tahun rilis tidak valid'),
  body('duration').isInt({ min: 1 }).withMessage('Durasi wajib diisi dalam menit'),
];

exports.updateFilmValidator = [
  body('title').optional().notEmpty().withMessage('Judul tidak boleh kosong'),
  body('genre').optional().notEmpty().withMessage('Genre tidak boleh kosong'),
  body('release_year').optional().isInt().withMessage('Tahun rilis tidak valid'),
  body('duration').optional().isInt().withMessage('Durasi harus angka'),
];
