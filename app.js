var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var knex = require('./utilities/knex');

var routes = require('./routes/index');
var login = require('./routes/login');

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

app.use('/', routes);
app.use('/login', login);

// Authentication
app.use(session({
   cookieName: 'session',
   secret: 'kjhsafweiqu43897&*9safhjkal',
   duration: 30 * 60 * 1000,
   activeDuration: 5 * 60 * 1000,
}));

app.use(function(req, res, next) {
   if (req.session && req.session.user) {
      knex('users').select().where({
         email: req.session.user.email
      }).then((user) => {
         if (user.length > 0) {
            req.user = user;
            delete req.user.password; // delete the password from the session
            req.session.user = user; // refresh the session value
            res.locals.user = user;
         }
         // finishing processing the middleware and run the route
         next();
      });
   } else {
      next();
   }
});

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
