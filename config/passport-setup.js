const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../models/user.model');
passport.use(
    new GoogleStrategy(
        {
            //options for the google start
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        (accessToken, refreshToken, profile, done) => {
            // passport callback function 
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((response) => {
                console.log("TCL: response", response)
            });
            console.log(profile._json);
            console.log(accessToken);
            console.log('done');
        }
    )
)