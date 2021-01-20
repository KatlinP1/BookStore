//const path = require('path');
//const rootDirectory = require('../utilities/path');
const express = require('express');
//const { title } = require('process');
const router = express.Router();
const productController = require('../controllers/products');
//express = mini app pluggable to another express app

router.get('/add-product', productController.getAddProduct); //sisu products.js failist
router.get('/products');

router.post('/add-product',productController.postAddProduct);

module.exports = router; //enne oli -> exports.router = router;
//exports.products = products;
//module.exports = router;