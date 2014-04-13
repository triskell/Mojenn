var TwitterStrategy  = require('passport-twitter').Strategy;

var User = require('./user'), //User model
    config = require('./config'); //server configurations


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new TwitterStrategy({
        consumerKey: config.consumerKey,
        consumerSecret: config.consumerSecret,
        callbackURL: "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {

        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                if (err)
                    return done(err); //if error, return error

                if (user) { //user exists
                    return done(null, user);
                } else {   //new user
                    var newUser = new User();

                    newUser.twitter.id = profile.id;
                    newUser.twitter.token  = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.grade = 'user';

                    //save user in database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

    });

    }));

};