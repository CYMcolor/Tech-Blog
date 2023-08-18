// dependecies---------------
// express stuff
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// other files
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// sequelize stuff
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// end of dependecies---------------

//create app and port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine and custom helpers
//i think this allows the helpers.js to ineteract with hadlebars
const hbs = exphbs.create({ helpers });

//create seesion
const sess = {

};

