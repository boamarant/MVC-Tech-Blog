// Import express router and post model
const router = require('express').Router();
const { Post } = require('../models');

// GET route for homepage
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
module.exports = router;