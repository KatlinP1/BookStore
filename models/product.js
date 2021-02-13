const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsfromfile = (cb) => {
    fs.readFile(filePath, (error, fileContent) =>{
        if(error){
           return cb ([]);
        }
        
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id, title, url, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = url;
        this.price = price;
        this.description = description;
    }

    save(){ //uue info salvestamine - save to products.json
        
        getProductsfromfile(products => {
            if(this.id){ // if product with this id exists 
                 const existingProductIndex = products.findIndex(product => product.id === this.id);
                 const updatedProducts = [...products]; //pull out existing products and store them in a new array - spreadoperator
                 updatedProducts [existingProductIndex] = this;
                 fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
                     console.log(error);
                 });
                } else {
                    this.id = Math.random().toString();
                    products.push(this);
                    fs.writeFile(filePath, JSON.stringify(products), (error) =>{
                    console.log(error);
                    }); 

                 }
            
        }); //faili maha lugemiseks- et kuvada eelnevat infot 

    }

    //cb- objekt mis salvest andmed mis toimub funktsiooni sees
    static fetchAll(cb){
       getProductsfromfile(cb);
    }

    static findById(id, cb){
        getProductsfromfile(products => {
            //filter a product by its id
            const product = products.find(p => p.id === id);
            cb(product);
        });

    }

}