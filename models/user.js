const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        //embedded document
        items: [{
            productId: { 
                type: Schema.Types.ObjectId,
                ref: 'Product', 
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function(product){
     const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIndex >= 0){ //if product exists update its qty
        newQty = this.cart.items[cartProductIndex].qty + 1;
        updatedCartItems[cartProductIndex].qty = newQty;
    } else { //add the product if it is not in the cart yet
        updatedCartItems.push({productId: product._id, qty: newQty});
    }

    //save the product to cart and update database
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.deleteItemFromCart = function(productId){
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });

    this.cart.items = updatedCartItems;
    return this.save();

}

userSchema.methods.clearCart = function() {
    this.cart = { items: []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
