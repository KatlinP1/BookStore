//shop.ejs fileiga seotud 
//const path = require('path');
//const rootDirectory = require('../utilities/path');
const express = require('express');
//const adminData = require('./admin');
const router = express.Router();
const productController = require('../controllers/products');
//mini express app pluggable to another express app

router.get('/', productController.getProducts);
router.get('/products');
router.get('/cart');
router.get('/checkout');

module.exports = router;