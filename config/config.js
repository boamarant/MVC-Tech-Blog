// Import requirements
const Sequelize = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

// Create new sequelize instance
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

// Initialize the sequelize session
const sessionStore = new SequelizeStore({
  db: sequelize,
});

// Define the session
const sess = {
  secret: process.env.SESSION_SECRET || 'supersecret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
};

// Exports
module.exports = { sequelize, sessionStore, sess };