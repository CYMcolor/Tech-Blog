// dependecies---------------
const path = require('path');
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
//allows the helpers.js to ineteract with hadlebars
const hbs = exphbs.create({ helpers });

//create seesion
const sess = {
    secret: 'Super secret secret',
    cookie: {
        // milliseconds * seconds * minutes * hours == 1000 * 60 * 60 * 24
        //expires in 1 hour
        maxAge: 1000 * 60 * 60,
        // store session cookieswhen connected to http server
        httpOnly: true,
        //must exucute protcal in https
        secure: false,
        //must be from the same domain
        sameSite: 'strict',
    },
    // prevenst session being saved back into session store
    resave: false,
    // save a session when it is new
    saveUninitialized: true,
    // Sets up session store with sequelize
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// init app session
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app connect to routes
app.use(routes);

// sync with database first then listen
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
  