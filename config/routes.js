var routeMiddleware = {
  checkAuthentication: function(req, res, next) {
    if (!req.user) {
      res.render('result');
    }
    else {
     return next();
    }
  },

  checkIdentity: function(req, res, next){
    if (req.user.id != req.params.id) {
      res.render('home', {message: "Action illegal, please sign in as correct user"});
    } else {
    return next();
  }
},

  preventLoginSignup: function(req, res, next) {
    if (req.user) {
      res.redirect('/');
    }
    else {
     return next();
    }
  }
};
module.exports = routeMiddleware;