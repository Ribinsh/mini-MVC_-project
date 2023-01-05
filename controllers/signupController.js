const { response } = require('../app');
const express = require('express');
const app = express.Router();
const model = require('../models/userAuthModel');
const loginController = require('./loginController');

module.exports = {
    signupPage: (req, res) => {
        if (req.session.loggedIn) {
            res.redirect('/home');
        } else {
            res.render('signup');
        }
},
    signup: (req, res) => {
        console.log('---------------------------------reached signupController.js----------------------------');
        console.log(req.body);

        model.doSignup(req.body).then((response) => {
            console.log(response);
            res.redirect('/home');
        })
    }
}