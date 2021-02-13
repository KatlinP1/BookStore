//shop.ejs fileiga seotud 
//const path = require('path');
//const rootDirectory = require('../utilities/path');
const express = require('express');
//const adminData = require('./admin');
const router = express.Router();
const shopController = require('../controllers/shopController'); //../controllers/products
//mini express app pluggable to another express app

router.get('/', shopController.getProducts);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/checkout');

module.exports = router;