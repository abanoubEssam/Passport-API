const express = require('express');
const authRoutes = require('./routes/auth.routes');
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');



mongoose.connect(keys.mongodb.dbURI , ()=> {
    try {
        console.log('connected to db: ' , keys.mongodb.dbURI);
    } catch (error) {
        console.log(error);
    }
})



// set up view engine
app.set('view engine', 'ejs');

// create home route 
app.get('/', (req, res) => {
    res.render("home")
})

// setup routes 
app.use('/auth', authRoutes)

app.listen(3000, () => {
    console.log('app listening on port 3000.......')
})