//shop.ejs fileiga seotud 
const path = require('path');
const rootDirectory = require('../utilities/path');
const express = require('express');
const adminData = require('./admin');
const router = express.Router();

router.get('/', (req, res) =>{
    const products = adminData.products;
    
    res.render('shop.ejs', {
        productsMain: products,
        pageTitle: 'Main page',
        path: '/'
    });
    //res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
});

module.exports = router;