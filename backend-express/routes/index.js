const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const filmRoutes = require('./film.routes');
const watchRoutes = require('./watch.routes');

router.use('/auth', authRoutes);
router.use('/films', filmRoutes);
router.use('/watch', watchRoutes);

module.exports = router;
