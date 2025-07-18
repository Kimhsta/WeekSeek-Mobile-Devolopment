const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const filmRoutes = require('./film.routes');

router.use('/auth', authRoutes);
router.use('/films', filmRoutes);

module.exports = router;
