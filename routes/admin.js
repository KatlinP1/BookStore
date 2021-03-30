//const path = require('path');
//const rootDirectory = require('../utilities/path');
const express = require('express');
//const { title } = require('process');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const adminController = require('../controllers/adminController'); //../controllers/products
//express = mini app pluggable to another express app

router.get('/add-product',isAuth, adminController.getAddProduct); //sisu products.js failist
router.get('/products',isAuth, adminController.getProducts);
router.post('/add-product',isAuth, adminController.postAddProduct);
router.get('/edit-product/:productId',isAuth, adminController.getEditProduct);
router.post('/edit-product',isAuth, adminController.postEditProduct);
router.post('/delete-product',isAuth, adminController.postDeleteProduct);

//router.post('/add-product',adminController.postAddProduct);- see juba eksisteerib

module.exports = router; //enne oli -> exports.router = router;
//exports.products = products;
//module.exports = router;