// Import requirements
const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to view a single post by ID
router.get('/post/:id', async (req, res) => {
  try {
    // Find post by primary key
    const post = await Post.findByPk(req.params.id, {
      include: [Comment],
    });

    // If post not found, send an error
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new post
router.post('/post', withAuth, async (req, res) => {
  try {
    // Create a new post with data from submission request
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.redirect('/dashboard');
    // Error handling
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route to update an existing post
router.put('/post/:id', withAuth, async (req, res) => {
  try {
    // Find post by primary key
    const post = await Post.findByPk(req.params.id);

    // If not found, send an error
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    // Checking for user authorization
    if (post.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'Not authorized to update this post' });
      return;
    }
    // Send update
    await post.update(req.body);
    res.redirect('/dashboard');
    // Error handling
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete a post
router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    // Find post by pk
    const post = await Post.findByPk(req.params.id);

    // Error handling
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'Not authorized to delete this post' });
      return;
    }

    // Delete post
    await post.destroy();
    res.redirect('/dashboard');
    // Error handling
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to add a comment to a post
router.post('/post/:id/comment', withAuth, async (req, res) => {
  try {
    // Creates new comment with form submission info
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });
    // Redirects to posts page
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;