//controller for all product - related logic 
const Product = require('../models/product');

exports.getAddProduct = (req, res) =>{
    res.render('admin/edit-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
//res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
//res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
};    

exports.postAddProduct = (req, res) =>{
    const product = new Product(null,req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    product.save();
    res.redirect('/');
    //koduleht on shop.html
};

exports.getEditProduct = (req, res) =>{
    const editMode = req.query.edit;
    const productId = req.params.productId;

    Product.findById(productId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });

    });

//res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
//res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
}; 

exports.postEditProduct = (req, res) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    res.redirect('/admin/products');

};

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products.ejs',
        {
            products: products, 
            pageTitle: 'Admin Products',
            path: '/admin/products'
        }
        );
    });
};