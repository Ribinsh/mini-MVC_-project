const products = require("../models/productsmodel");

module.exports = {
    home: (req, res) => {
        if (req.session.loggedIn) {
            products.getAllProducts().then((products) => {
                let user = req.session.user;
                console.log(user);
                res.render('home', { user, products });
            })
        } else {
            res.redirect('/');
        }
    }
}