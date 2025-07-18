const express = require('express');
const multer = require('multer');
const { createFilmValidator, updateFilmValidator } = require('../utils/validators/filmValidator');
const { createFilm, updateFilm, getAllFilms, getFilmById, deleteFilm } = require('../controllers/filmController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate'); // 🔥 import dari file terpisah

const router = express.Router();

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.single('poster'),
  validate(createFilmValidator),
  createFilm
);

router.get('/', getAllFilms);
router.get('/:id', getFilmById);
router.delete('/:id', verifyToken, isAdmin, deleteFilm);

router.put(
  '/:id',
  verifyToken,
  isAdmin,
  upload.single('poster'),
  validate(updateFilmValidator),
  updateFilm
);

module.exports = router;
