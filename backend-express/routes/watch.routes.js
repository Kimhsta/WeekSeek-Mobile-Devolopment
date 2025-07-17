const express = require('express');
const router = express.Router();

const {
  addToWatchLog,
  getWatchHistory,
  deleteWatchLog,
  clearWatchHistory
} = require('../controllers/watchController');

const { verifyToken, isUser } = require('../middlewares/authMiddleware');

// User menonton film = masuk ke watch log
router.post('/:filmId', verifyToken, isUser, addToWatchLog);
router.get('/', verifyToken, isUser, getWatchHistory);
router.delete('/:filmId', verifyToken, isUser, deleteWatchLog);
router.delete('/', verifyToken, isUser, clearWatchHistory);
module.exports = router;/*  */
