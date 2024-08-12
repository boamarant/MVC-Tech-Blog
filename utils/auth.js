const withAuth = (req, res, next) => {
    if (req.session.loggedIn) {
      // If logged in, proceed to the next route handler
      next();
    } else {
      // If not logged in, redirect to login page
      res.redirect('/login');
    }
  };
  
  module.exports = withAuth;