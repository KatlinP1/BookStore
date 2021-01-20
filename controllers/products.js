//controller for all product - related logic 
const Product = require('../models/product');

exports.getAddProduct = (req, res) =>{
    res.render('admin/add-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
//res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
//res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
};    

exports.postAddProduct = (req, res) =>{
    const product = new Product(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    product.save();
    res.redirect('/');
    //koduleht on shop.html
};

exports.getProducts = (req, res) =>{
    Product.fetchAll(products => {
        //const products = adminData.products;
        res.render('shop/index.ejs', {
        products: products,
        pageTitle: 'Main page',
        path: '/'
        });
        //res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
    });
};