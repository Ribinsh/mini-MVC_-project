const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.get('/', controller.admin);
router.get('/add-product', controller.addProductPage);
router.get('/edit-product/:id', controller.showProdEditInfo);
router.get('/delete-product/:id', controller.deleteProd);
router.get('/users', controller.user);
router.get('/edit-user/:id', controller.showUserEditInfo);
router.get('/delete-user/:id', controller.deleteUser);

router.post('/edit-user/:id', controller.editUser);
router.post('/edit-product/:id', controller.editProd);
router.post('/add-product', controller.addProd);

module.exports = router;