var feathers = require('feathers'),
    mongoose = require('mongoose'),
	passport = require('passport');

var config = require('./config'); //Server configuration file

console.log('[INFO] Connecting to database...');
mongoose.connect(config.dbUrl, function(err){
	if (err) { 
        console.log('[ERR] Can\'t connect to database : ' + err); 
	}
	else {
        console.log('[INFO] Connected to database.');
	}
});

if(config.show_installer === true){ //Install mode
    console.log("[INFO] INSTALL server launched.");
    
    require('./passport_install')(passport); //Set authentification
    
    var app = feathers();
    
    app.configure(function() {
        app.use(feathers.cookieParser());
        app.use(feathers.bodyParser());
        app.use(feathers.session({ secret: config.sessionSecret }));
        app.use(passport.initialize());
        app.use(passport.session());
    
        app.use(feathers.static(__dirname + '/install'));
        require('./routes_install.js')(app, passport); //Set routes
    });
    
    app.listen(config.port);
    
}
else{
    console.log("[INFO] WEBSITE server launched.");
    
    require('./passport')(passport); //Set authentification
    
    var app = feathers();
    
    app.configure(function() {
        app.use(feathers.cookieParser());
        app.use(feathers.bodyParser());
        app.use(feathers.session({ secret: config.sessionSecret }));
        app.use(passport.initialize());
        app.use(passport.session());
    

        app.use(feathers.static(__dirname + '/app'));
        require('./routes.js')(app, passport); //Set routes
    });
    
    app.listen(config.port);
    
}


