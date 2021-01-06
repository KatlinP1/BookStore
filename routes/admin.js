const path = require('path');
const rootDirectory = require('../utilities/path');
const express = require('express');
const router = express.Router();
//express = mini app pluggable to another express app

router.get('/add-product', (req, res) =>{
    res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
    //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) =>{
    res.redirect('/');
    //koduleht on shop.html
});

module.exports = router;