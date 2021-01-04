var createError = require('http-errors');
const passport = require('passport');
var express = require('express');
var cors = require('cors');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { SECRET, DB_URI, NODE_ENV } = require('./configs/env.config');

const isProduction = NODE_ENV === 'production';

var app = express();

app.use(passport.initialize());
// app.use(passport.session());

// Initial Setups
require('./models');
require('./configs/passport.config');

// Routes - Import
var indexRouter = require('./routes');

// Cross Origin Resource Sharing
app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Registration
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// connect to mongoose
mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
if (!isProduction) {
  mongoose.set('debug', true);
}

// Session Setup
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      secret: SECRET,
      autoRemove: 'disabled',
    }),
    secret: SECRET,
    cookie: { maxAge: 60000 }, // 10 mins
    resave: false,
    saveUninitialized: false,
  }),
);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(err);
});

module.exports = app;