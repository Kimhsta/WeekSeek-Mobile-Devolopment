const express = require('express');
const multer = require('multer');
const { validationResult } = require('express-validator');
const { createFilmValidator, updateFilmValidator } = require('../utils/validators/filmValidator');
const { createFilm, updateFilm, getAllFilms,getFilmById,deleteFilm } = require('../controllers/filmController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Middleware validasi global
const validate = (validators) => [
  ...validators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// === ROUTES ===

// CREATE FILM (admin only)
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.single('poster'),
  validate(createFilmValidator),
  createFilm
);

// Ambil semua films
router.get('/', getAllFilms);

//Mengambil berdasarkan ID
router.get('/:id',getFilmById);

// Hapus
router.delete('/:id', verifyToken, isAdmin, deleteFilm)

// UPDATE FILM
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  upload.single('poster'),
  validate(updateFilmValidator),
  updateFilm
);


module.exports = router;
