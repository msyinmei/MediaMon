//REQUIRES
var express = require("express"),
  app = express(),
  methodOverride = require('method-override'),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  cookieParser = require("cookie-parser"),
  session = require("cookie-session"),
  db = require("./models/index"),
  flash = require("connect-flash");

//MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'dywtbbbbbbb',
  name:'mm',
  //this is in milliseconds
  maxage: 10000000
  })//close session
);//close app.use

//my passport initiators
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//prepare our serialize functions
passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.User.find({
      where: {
        id: id
      }
    })
    .done(function(error, user){
      done(error, user);
    });
});

//Home
app.get('/', function(req, res){
  res.render('home');
});

//404
app.get('*', function(req, res){
  res.render('404');
});


//3000
app.listen(3000, function(){
  "Server is listening on port 3000";
});