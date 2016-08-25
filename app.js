// app.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
var Strategy = require('passport-twitter').Strategy
var session = require('express-session')
var twitAuth = require('./config/auth').twitterAuth
var flash = require('connect-flash')

// database stuff
var mongoURL = require('./config/database').mongoURL || process.env.MONGOLAB_URI
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(mongoURL)
var User = require('./models/user')


// Configure the twitte Strategy for use by passport
passport.use(new Strategy({
  consumerKey: twitAuth.consumerKey || process.env.TWEET_API_KEY,
  consumerSecret: twitAuth.consumerSecret || process.env.TWEET_API_SEC,
  callbackURL: twitAuth.callbackURL || process.env.CALL_BACK_URL
},
function(token, tokenSecret, profile, done) {
  process.nextTick(function() {
    User.findOne({ 'username' : profile.username }, function(err, user) {
      if(err) {
        return done(err)
      }
      if(user) {
        return done(null, user)   // user found, return that user
      } else {
        // no user found, so create new one
        var newUser = new User()
        newUser.username = profile.username
        newUser.displayName = profile.displayName
        newUser.password = 'twitter'
        newUser.email = ''
        // save new user into database
        newUser.save(function(err, res) {
          if(err) throw err
          return done(null, newUser)
        })
      }
    })
  })
  
}))

// Configure passport authenticated persistence
passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})


// routes
var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware used
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'arduino123',
  resave: true,
  saveUninitialized: true
}))
// Initialize passport and restore authentication state, if any, from session
app.use(passport.initialize())
app.use(passport.session())     // equivalent to => app.use(passport.authenticate('session'));

// handle cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
//
app.use(flash())


// routes path
app.use('/', routes);
app.use('/api', api);

// error page
app.use('/error', function(req, res, next) {
  res.render('error')
})

app.get('/auth/twitter', passport.authenticate('twitter'))   // route middleware to authenticate requests

app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/error', successRedirect: '/' }))

// Logout
app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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
