const express = require('express');
const router = express.Router();

const {
  createFilm,
  getAllFilms,
  getFilmById,
  updateFilm,
  deleteFilm
} = require('../controllers/filmController');

const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Semua user bisa lihat daftar film
router.get('/', getAllFilms);
router.get('/:id', getFilmById);

// Hanya admin bisa upload/edit/hapus
router.post('/', verifyToken, isAdmin, createFilm);
router.put('/:id', verifyToken, isAdmin, updateFilm);
router.delete('/:id', verifyToken, isAdmin, deleteFilm);

module.exports = router;
