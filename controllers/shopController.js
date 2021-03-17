//controller for all product - related logic 
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) =>{
    Product.fetchAll()
    .then(products => {
        //const products = adminData.products;
        res.render('shop/product-list.ejs', {
        products: products,
        pageTitle: 'All products',
        path: '/products'
        });
        //res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
    })
    .catch(error => {
        console.log('Failed to fetch for shop controller')
    });
};

//ühe raamatu info
exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then(product => {
        res.render('shop/product-detail.ejs', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });
 
}

exports.getCart = (req, res) =>{
    req.user.getCart()
    .then(products => {
        res.render('shop/cart.ejs', {
            path: '/cart', 
            pageTitle: 'Your cart', 
            products: products
        });
    })
    .catch(error =>{
        console.log('Failed to fetch the cart');
    });

    /*Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(cartProduct => cartProduct.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart.ejs', {path: '/cart', pageTitle: 'Your cart', products: cartProducts});
        });
    }); */
}

exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product => {
        req.user.addToCart(product);
    })
    .then(result => {
        console.log("product saved to cart");
        res.redirect('/cart');
    });
    
}

exports.postDeleteFromCart = (req, res) =>{
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
    .then(result =>{
        res.redirect('/cart');
    })
    .catch(error => {
        console.log('Failed to delete an item from cart');
    });
}

exports.postOrder = (req, res) => {
    req.user.addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(error => {
        console.log(error);
    });

}

exports.getOrders = (req, res) => {
    req.user.getOrders()
    .then(orders => {
        res.render('shop/orders.ejs', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
    .catch(error => {
        console.log(error);
    });
}