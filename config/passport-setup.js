const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user.model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("TCL: profile", profile)
        // check if user already exists in our own db
        await User.findOne({ googleId: profile.id }).then(async (currentUser) => {
            if (currentUser) {
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                const newUser = await User.create({
                    googleId: profile.id,
                    username: profile.displayName
                })
                done(null, newUser)
                // new User({
                //     googleId: profile.id,
                //     username: profile.displayName
                // }).save().then((newUser) => {
                //     console.log('created new user: ', newUser);
                //     done(null, newUser);
                // });
            }
        });
    })
);