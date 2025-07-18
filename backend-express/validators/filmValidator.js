const { body } = require('express-validator');
const prisma = require('../prisma/client');

exports.createFilmValidator = [
  body('title')
    .notEmpty().withMessage('Judul wajib diisi')
    .isLength({ max: 100 }).withMessage('Judul maksimal 100 karakter')
    .custom(async (title) => {
      const existing = await prisma.film.findUnique({ where: { title } });
      if (existing) {
        throw new Error('Judul film sudah digunakan');
      }
    }),
  body('genre').notEmpty().withMessage('Genre wajib diisi'),
  body('release_year')
  .notEmpty().withMessage('Tahun rilis wajib diisi')
  .isInt({ min: 1900 }).withMessage('Tahun rilis tidak valid'),
  
  body('duration')
  .notEmpty().withMessage('Durasi wajib diisi')
  .isInt({ min: 1 }).withMessage('Durasi wajib diisi dalam menit'),
  body('trailerUrl')
  .optional()
  .matches(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//)
  .withMessage('Link trailer harus berupa tautan YouTube'),

];


exports.updateFilmValidator = [
  body('title')
    .optional()
    .notEmpty().withMessage('Judul tidak boleh kosong')
    .isLength({ max: 100 }).withMessage('Judul maksimal 100 karakter')
    .custom(async (title, { req }) => {
      const existing = await prisma.film.findUnique({ where: { title } });
      if (existing && existing.id !== parseInt(req.params.id)) {
        throw new Error('Judul film sudah digunakan');
      }
    }),
  body('genre')
    .optional()
    .notEmpty().withMessage('Genre tidak boleh kosong')
    .isLength({ max: 50 }).withMessage('Genre maksimal 50 karakter'),
  body('release_year')
    .optional()
    .isInt().withMessage('Tahun rilis tidak valid'),
  body('duration')
    .optional()
    .isInt().withMessage('Durasi harus angka'),
];

