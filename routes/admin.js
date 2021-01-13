const path = require('path');
const rootDirectory = require('../utilities/path');
const express = require('express');
const { title } = require('process');
const router = express.Router();
const products = [];
//express = mini app pluggable to another express app

router.get('/add-product', (req, res) =>{
    res.render('add-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
         
    });
    //res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
    //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) =>{
    products.push({title: req.body.title});
    res.redirect('/');
    //koduleht on shop.html
});

exports.router = router;
exports.products = products;
//module.exports = router;