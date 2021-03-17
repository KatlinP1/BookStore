const mongodb = require('mongodb');
const getDb = require('../utilities/db').getDb; //import db connection 

//andmebaasi jaoks on loodud kogu see  "product.js "fail 

class Product{
    constructor(title, imageUrl, price, description, id){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save(){
        //save meetod otsib üles ja salvestab juurde 
        const db = getDb(); //connect to mongod db and save product 
        let dbOperation;

        if(this._id){
            dbOperation = db.collection('products').updateOne({_id: this._id}, {$set: this}); //salvestab olemasolevat objekti
        }else {
            dbOperation = db.collection('products').insertOne(this); //loob uue id ja objekti salvestades
        }

        return dbOperation.then(result => {
            console.log("success");
        })
        .catch(error => {
            console.log('failed');
        });
    }

    static fetchAll() {
        const db = getDb();

        return db.collection('products').find().toArray()
        .then(products => {
            return products;
        }) 
        .catch(error => {
            console.log('Failed to fetch all the products');
        });
    }

    static findById(productId){
        const db = getDb();
        return db.collection('products').find({_id: new mongodb.ObjectId(productId)}).next()
        .then(product => {
            return product;
        })
        .catch(error => {
            console.log('failed to fetch the product details');
        });
    }

    static deleteById(productId){
        const db = getDb();
        //id on seotud objektiga
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)})
        .then(result => {
            console.log('Item deleted');
        })
        .catch(error => {
            console.log('Failed to delete an item');
        });
    }


}
module.exports = Product;