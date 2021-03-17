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
    //null was deleted -> const product = new Product(null,req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    //const product = new Product(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    const product = new Product ({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.user._id
    });
    
    product.save()
    .then(result => {
        console.log("Product saved");
        res.redirect('/admin/products');
    })
    .catch(error => {
        console.log("Failed to save");
        res.redirect('/');
        //koduleht on shop.html
    });
};

exports.getEditProduct = (req, res) =>{
    const editMode = req.query.edit;
    const productId = req.params.productId;

    /*Product.findById(productId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Edit Product',path: '/admin/edit-product',editing: editMode,product: product
        });
    });*/

    Product.findById(productId)
    .then(product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Edit product',
            path: 'admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(error => {
        console.log(error);
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

    //const updatedProduct = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDescription, productId);
    //updatedProduct.save(); 

    Product.findById(productId).then(product => {
        product.title = updatedTitle;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;

        return product.save();
    })
    .then(result => {
        console.log('Product data updated');
        res.redirect('/admin/products');
    })
    .catch(error => {
        console.log(error);
    });

};

exports.getProducts = (req, res) => {
    Product.find()
    .then(products => {
        res.render('admin/products.ejs',
            {
                products: products, 
                pageTitle: 'Admin Products',
                path: '/admin/products'
            }
        );
    })
    .catch(error => {
        console.log('Failed to fetch all for admin controller');
    });
};

exports.postDeleteProduct = (req, res) =>{
    const productId = req.body.productId;
    Product.findByIdAndDelete(productId)
    .then(() => {
        res.redirect('/admin/products');
    });
    
}