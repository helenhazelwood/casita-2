const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db: db });
const port = process.env.PORT || 5000;
module.exports = app;
//console log that server is running
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sessionStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'raisinets are not candy',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//PASSPORT REGISTRATION
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

//ROUTES
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

//ERROR HANDLING: Keep at end
app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});
