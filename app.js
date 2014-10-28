//REQUIRES
var express = require("express"),
  app = express(),
  request = require('request');
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
  secret: 'supersecretkey',
  name:'chocolate',
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


/////////ROUTES AND FUNCTIONS//////////

//Home
app.get('/', function(req, res){
  res.render('home');
});

//Public Search Page
app.get('/search', function(req, res){
  //grab the
  var searchTerm = req.query.keyword;
  var articleTemp = {};
  var articleList = [];
  //
  var guardianUrl = "http://content.guardianapis.com/search?api-key=fv7j8zaj9h52wmtkd6s77bxc&order-by=newest&q=" + searchTerm;
  var nytimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=1878509ebcc1080b029ef031ea085599%3A0%3A70065346";

  //call THE GUARDIAN API searching for search query-related articles
  request(guardianUrl, function(error, response, body){
    console.log("GUARDIAN SEARCH");
    articleList = [];
    if (!error && response.statusCode == 200){
      var guardianResult = (JSON.parse(body)).response.results;
      console.log(guardianResult);
      guardianResult.forEach(function(article){
        articleTemp = {};
        articleTemp.title = article.webTitle;
        articleTemp.url = article.webUrl;
        articleTemp.date = article.webPublicationDate;
        articleTemp.source = "The Guardian";
        articleList.push(articleTemp);
      });
      console.log(articleList.length);
      console.log(guardianResult.length);
      console.log(articleList);
      console.log("GUARDIAN SUCCESS");

  //call THe NY TIMES API searching for search query-related articles
  request(nytimesUrl, function(error, response, body){
    console.log("NYTIMES SEARCH");

      if (!error && response.statusCode === 200){
        var nytimesResult = JSON.parse(body).response.docs;
        console.log(nytimesResult);
        nytimesResult.forEach(function(article){
                articleTemp = {};
                articleTemp.title = article.headline.main;
                articleTemp.url = article.web_url;
                articleTemp.date = article.pub_date;
                articleTemp.summary = article.snippet;
                articleTemp.source = article.source;
                articleTemp.imgurl = "https://nytimes.com/" + (article.multimedia[0].url);
                console.log("MULTIMEDIA URL");
                articleList.push(articleTemp);
              });
        console.log(articleList.length);
        console.log(guardianResult.length);
        console.log(articleList);
        console.log("NYTIMES SUCCESS");



        // res.send(guardianResult)
       //SORT articleList

      res.render("results", { articleList: articleList
      });
    }//inner if
    });//second request (the new york times)
  }//outer if
  });//first request(the guardian)
});

//


//


//Login


//Signup




//404
app.get('*', function(req, res){
  res.render('404');
});


//3000
app.listen(3000, function(){
  "Server is listening on port 3000";
});