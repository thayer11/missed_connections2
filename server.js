'use strict'

var express          = require('express');
var app              = express();
var port             = process.env.PORT || 3000;
var bodyParser       = require('body-parser');
//for passport facebook auth
var User             = require('./back_end/models/user.js');
//var Message          similar to above
var db               = require('./back_end/models/message.js');
var passport         = require('passport');
var cookieParser     = require('cookie-parser');
var FacebookStrategy = require ('passport-facebook').Strategy;
// app.use(bodyParser());
// body parser commented out because used in auth
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
//use public frontend
app.use(express.static('./front_end/public')); //this serves up the public folder into the root directory

// app.get('/', function(req, res) { //since we’re doing the app.use express static above, this doesn’t do anything, so that’s why I’ve commented it out.  Serving up the index.html into the root folder means that’s going to default to what is shown at the root url
// res.send("You're Home!");
// });
//database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||
  "mongodb://localhost:27017/missed_connections2");



//Auth 

passport.use(new FacebookStrategy({
    clientID: '732111356929298',
    clientSecret: 'cdf230ff2a1e8ca4c34501be4ffcd878',
    callbackURL: "http://localhost:3000/login/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'facebook.id': profile.id}, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        user = new User();
          user.facebook.id    = profile.id;
          user.facebook.token = accessToken;
          user.facebook.name  = profile.displayName;
          user.facebook.email = profile.emails[0].value;
          user.facebook.photos = profile.photos ? profile.photos[0].value : 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
          user.recipes = [];

        user.save(function (err) {
          if (err) console.log(err);
          return done(err, user);
        });
      }
      else {
        return done(err, user);
      }
    });
  }
));

app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'abcabcdabchrhol',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//back_end routes

app.get('/api/profile', function (req, res) {
  var session = req.session;
  User.findById(session.passport.user, function (err, user) {
     res.json(user);   
  });
});

//routes setup
var routes = require('./back_end/routes/routes');
app.use(routes);

//facebook routes

app.get('/login/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_photos'] }));

app.get('/login/facebook/callback', passport.authenticate('facebook', { 
  successRedirect: '/#/profile',
  failureRedirect: '/',
})); 

// start server
app.listen(port, function() {
  console.log('Server started on', port); 
});   

