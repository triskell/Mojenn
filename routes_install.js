module.exports = function(app, passport) {

    // Services
    var InstallService = require('./services/install');

    // Routes
    app.use('/installator', new InstallService());


    // Twitter authentification path
    app .get('/auth/twitter', passport.authenticate('twitter'))
        .get('/auth/twitter/callback', passport.authenticate('twitter', 
        { 
            successRedirect: '/success',
            failureRedirect: '/install'
        }));
};
    