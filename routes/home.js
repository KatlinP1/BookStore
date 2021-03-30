//shop.ejs fileiga seotud 
//const path = require('path');
//const rootDirectory = require('../utilities/path');
const express = require('express');
//const adminData = require('./admin');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const shopController = require('../controllers/shopController'); //../controllers/products
//mini express app pluggable to another express app


router.get('/', shopController.getProducts);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart',isAuth, shopController.getCart);
router.post('/cart',isAuth, shopController.postCart);
router.post('/cart-delete-item',isAuth, shopController.postDeleteFromCart);
router.get('/orders',isAuth, shopController.getOrders);
router.post('/create-order',isAuth, shopController.postOrder);

module.exports = router;