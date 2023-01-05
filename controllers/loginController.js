const { response } = require('../app');
const express = require('express');
const app = express.Router();
const model = require('../models/userAuthModel');

module.exports = {
    loginPage: (req, res) => {
        if (req.session.loggedIn) {
            res.redirect('/home');
        }else if(req.session.adminlogin){
            res.redirect('/admin');
        } else {
            res.render('login', { loginErr: req.session.loginError });
        }
    },
    login: (req, res) => {
        let email = 'admin@gmail.com';
        let password = 'admin';
        if (req.body.password === password && req.body.email === email) {
            req.session.adminlogin = true;
            res.redirect('/admin');
        } else {
            model.doLogin(req.body).then((response) => {
                if (response.status) {
                    req.session.loggedIn = true;
                    req.session.user = response.user;
                    res.redirect('/home');
                } else {
                    req.session.loginError = "Invalid email or password";
                    res.redirect('/');
                }
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}