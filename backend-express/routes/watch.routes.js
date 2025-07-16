const express = require('express');
const router = express.Router();

const {
  addToWatchLog,
  getWatchHistory
} = require('../controllers/watchController');

const { verifyToken } = require('../middlewares/authMiddleware');

// User menonton film = masuk ke watch log
router.post('/:filmId', verifyToken, addToWatchLog);
router.get('/', verifyToken, getWatchHistory);

module.exports = router;
