var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var knex = require('./utilities/knex');
var login = require('./utilities/login');

var rIndex = require('./routes/index');
var rLogin = require('./routes/login');
var rLogout = require('./routes/logout');
var rDashboard = require('./routes/dashboard');
var rThread = require('./routes/thread');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Authentication
app.use(session({
	cookieName: 'session',
	secret: 'kjhsafweiqu43897&*9safhjkal', // Need to make more random and longer.
	duration: 30 * 60 * 1000, // Persist for 30 minutes
	activeDuration: 5 * 60 * 1000, // Increase duration by 5 minutes per load
   httpOnly: true,
   ephemeral: true
}));
app.use(login.checkLogin);

// Specify routes
app.use('/', rIndex);
app.use('/login', rLogin);
app.use('/logout', rLogout);
app.use('/dashboard', rDashboard);
app.use('/thread', rThread);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'local') {
   app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
         message: err.message,
         error: err
      });
   });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
      message: err.message,
      error: {}
   });
});


module.exports = app;
