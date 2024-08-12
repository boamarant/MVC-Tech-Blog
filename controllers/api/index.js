const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

module.exports = router;