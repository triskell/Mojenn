var feathers = require('feathers'),
  	mongoose = require('mongoose'),
	passport = require('passport');

var config = require('./config'); //Server configuration file

 
mongoose.connect(config.dbUrl);  

require('./passport')(passport); //Set authentification

var app = feathers();

app.configure(function() {
  app.use(feathers.cookieParser());
  app.use(feathers.bodyParser());
  app.use(feathers.session({ secret: config.sessionSecret }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(feathers.static(__dirname + '/app'))
})

require('./routes.js')(app, passport); //Set routes

app.listen(config.port);
