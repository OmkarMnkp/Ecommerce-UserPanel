
const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { isAdmin } = require('../Middlewear/isAdmin');
const { auth } = require('../Middlewear/auth');

router.get('/getAllProducts', auth, productController.getAllProducts);
router.get('/getProductByID/:id', auth, productController.getProductByID);
router.post('/createProducts', auth, isAdmin, productController.createProducts);
router.put('/updateProduct/:id', auth, isAdmin, productController.updateProducts);
router.delete('/deleteProduct/:id', auth, isAdmin, productController.deleteProducts);

module.exports = router;
