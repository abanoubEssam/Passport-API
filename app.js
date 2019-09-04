const express = require('express');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const passport = require('passport')
const keys = require('./config/keys');
const cookieSession = require('cookie-session');



mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true} ,() => {
    try {
        console.log('connected to db: ', keys.mongodb.dbURI);
    } catch (error) {
        console.log(error);
    }
})



// set up view engine
app.set('view engine', 'ejs');


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.session.cookieKey]
}))


//initialize passport 
app.use(passport.initialize())
app.use(passport.session())

// create home route 
app.get('/', (req, res) => {
    res.render("home")
})

// setup routes 
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.listen(3000, () => {
    console.log('app listening on port 3000.......')
})