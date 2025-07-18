const express = require('express');
const { createFilmValidator, updateFilmValidator } = require('../utils/validators/filmValidator');
const { createFilm, updateFilm, getAllFilms, getFilmById, deleteFilm } = require('../controllers/filmController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { uploadPoster } = require('../middlewares/uploads'); 

const router = express.Router();

router.post(
  '/',
  verifyToken,
  isAdmin,
  uploadPoster.single('poster'),        
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
  uploadPoster.single('poster'),
  validate(updateFilmValidator),
  updateFilm
);

module.exports = router;
