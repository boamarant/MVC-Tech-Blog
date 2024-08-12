// Import requirements
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { sequelize, sessionStore, sess } = require('./config/config');
const routes = require('./controllers');
require('dotenv').config();

// Create express instance
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static public files
app.use(express.static('public'));

// Initializes session config
app.use(session(sess));

// Initializes handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Uses routes directory for routes
app.use(routes);

// Starts express server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});