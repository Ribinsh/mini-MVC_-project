// mongoDB connection 
const db = require('./config/connection');
db.connect((err) => {
    if (err) console.log('connection error' + err);
    else console.log('Database connected to port http://localhost:27017/');
});

const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');
const fileUpload = require('express-fileupload');

app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate');
    next();
});

const loginRoute = require('./routes/login');
const homepageRoute = require('./routes/home');
const adminRoute = require('./routes/admin');
const signupRoute = require('./routes/signup');

app.set('view engine', 'hbs');

// this is required for collecting data from form input and store it in database 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname+'/public')));
app.use(fileUpload());
app.use(session({ secret: 'key', cookie: { maxAge: 1200000 } }));
app.use('/', loginRoute);   //login/sign-up
app.use('/home', homepageRoute);
app.use('/admin', adminRoute)
app.use('/signup', signupRoute);

app.listen(3005, () => {
    console.log('Server running on port http://localhost:3005/');
});
