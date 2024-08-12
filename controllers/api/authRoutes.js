const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route for user signup
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData || !userData.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route for user logout
router.post('/logout', withAuth, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;