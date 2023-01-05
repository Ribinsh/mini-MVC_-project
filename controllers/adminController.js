const products = require("../models/productsmodel");
const model = require("../models/userAuthModel");
const { response } = require('../app');
const express = require('express');
const app = express.Router();

module.exports = {
    admin: (req, res) => {
        if (req.session.adminlogin) {
            products.getAllProducts().then((products) => {
                res.render('admin', { products });
            })
        } else {
            res.redirect('/');
        }
    },
    deleteProd: (req, res) => {
        let proId = req.params.id
        console.log(proId);
        products.deleteProduct(proId).then((response) => {
            res.redirect('/admin');
        })
    },
    addProductPage: (req, res) => {
        if (req.session.adminlogin) {
            res.render('add-product');
        } else {
            res.redirect('/');
        }
    },
    addProd: (req, res) => {

        console.log('reached here at post add product');
        console.log(req.body);
        console.log(req.files.Image);

        products.addProduct(req.body, (id) => {
            let image = req.files.Image;
            image.mv('/home/majr/Programming/Project01/public/' + id + '.jpg', (err, done) => {
                if (!err) {

                    res.redirect('/admin');

                    console.log('New product added');
                } else {
                    console.log(err);
                }
            });
        });
    },
    showProdEditInfo: async (req, res) => {
        if (req.session.adminlogin) {
            let product = await products.getProductDetails(req.params.id);
            console.log(product);
            res.render('edit-product', { product });
        } else {
            res.redirect('/');
        }
    },
    editProd: (req, res) => {
        let id = req.params.id;
        products.updateProduct(id, req.body).then(() => {
            res.redirect('/admin');
            if (req.files) {
                let image = req.files.Image;
                image.mv('/home/majr/Programming/Project01/public/' + id + '.jpg');
            }
        })
    },
    user: (req, res) => {
        if (req.session.adminlogin) {
            products.getAllUsers().then((users) => {
                res.render('users', { users });
            })
        } else {
            res.redirect('/');
        }
    },
    showUserEditInfo: async (req, res) => {
        if (req.session.adminlogin) {
            let user = await products.getUserDetails(req.params.id);
            console.log(user);
            res.render('edit-user', { user });
        } else {
            res.redirect('/');
        }
    },
    editUser: (req, res) => {
        let id = req.params.id;
        products.updateUser(id, req.body).then(() => {
            res.redirect('/admin/users');
        })
    },
    deleteUser: (req, res) => {
        let userId = req.params.id
        console.log(userId);
        products.deleteUser(userId).then((response) => {
            res.redirect('/admin/users');
        })
    }
}
