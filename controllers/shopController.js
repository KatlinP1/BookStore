//controller for all product - related logic 
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
//const csurf = require('csurf');

exports.getProducts = (req, res) =>{
    Product.find()
    .then(products => {
        //const products = adminData.products;
        res.render('shop/product-list.ejs', {
        products: products,
        pageTitle: 'All products',
        path: '/products', 
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
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
            path: '/products', 
            isAuthenticated: req.session.isLoggedIn
        });
    });
 
}

exports.getCart = (req, res) =>{
    req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
        res.render('shop/cart.ejs', {
            path: '/cart',
            pageTitle: 'Your cart',
            products: products, 
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(error => {
        console.log(error);
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
        return req.user.addToCart(product);
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
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(i => {
            return {qty: i.qty, product: {...i.productId._doc}};
        });
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });

        return order.save();
    })
    .then(()=>{
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/orders');
    })
    .catch(error => {
        console.log(error);
    });

}

exports.getOrders = (req, res) => {
    Order.find({'user.userId': req.user._id})
    .then(orders => {
        res.render('shop/orders.ejs', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders, 
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(error => {
        console.log(error);
    });
}