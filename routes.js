module.exports = function(app, passport) {

	// Services
	var PageService = require('./services/pages'),
		BlogService = require('./services/blog'),
		AdminService = require('./services/admin');

	// Routes
	app	.use('/pages', new PageService())
		.use('/blog', new BlogService())
		.use(function(req,res,next){
			if(req.isAuthenticated()){
				next();
			} else {
				res.send(401, 'Not Authorized');
			}
		})
		//Everything below need authetification
		.use('/admin', new AdminService());


	// Twitter authentification path
	app .get('/auth/twitter', passport.authenticate('twitter'))
		.get('/auth/twitter/callback', passport.authenticate('twitter', 
		  { 
		    successRedirect: '/',
		    failureRedirect: '/login' 
		  }))
		};
		