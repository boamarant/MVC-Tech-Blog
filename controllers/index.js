// Import Route models
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');

// Use homeRoutes and postRoutes for requests
router.use('/', homeRoutes);
router.use('/posts', postRoutes);

// Exports
module.exports = router;