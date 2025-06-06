
const express = require('express');
const { getAllProducts, addToCart, getCartItems, removeFromCart } = require('../controller/sampleController');
const { auth } = require('../Middlewear/auth');
const sampleController = require('../controller/sampleController');

const router = express.Router();



router.get('/products', getAllProducts);

router.post('/cart', auth,sampleController.addToCart);
router.get('/cart', auth,sampleController.getCartItems);
router.delete('/cart/:productId', auth,sampleController.removeFromCart);

module.exports = router;
