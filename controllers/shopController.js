//controller for all product - related logic 
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) =>{
    Product.fetchAll(products => {
        //const products = adminData.products;
        res.render('shop/product-list.ejs', {
        products: products,
        pageTitle: 'All products',
        path: '/products'
        });
        //res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
    });
};

//ühe raamatu info
exports.getProduct = (req, res) => {
    const productId = req.params.productId;

    Product.findById(productId, product => {
        res.render('shop/product-detail.ejs', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });

    });
 
}

exports.getCart = (req, res) =>{
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(cartProduct => cartProduct.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart.ejs', {
                path: '/cart',
                pageTitle: 'Your cart', 
                products: cartProducts
            });
        });
    });
}

exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
        res.redirect('/cart');

    });
    
}