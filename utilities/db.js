const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; //_ - the variable is used to internally only 

//kogu fail loodud andmebaasi jaoks ainult

const mongoConnect = (cb) => {
    MongoClient.connect('mongodb://localhost:27017/BookStoreDB', {useUnifiedTopology: true})
    .then(client => {
        console.log('connected');
        _db = client.db();
        cb(); //callback 
    })
    .catch(error => {
        throw error;
    });
}

const getDb = () => {
    if(_db){
        return _db; //returns the connection
    }
    throw "no db found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;