const express = require('express');
//const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
//enne tuleb andmebaasiga ühendada kui route saada - käib mongoConnect kohta
//const mongoConnect = require('./utilities/db').mongoConnect; - pärast mongoosi paigaldamist pole vaja
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user');

//const rootDirectory = require('./utilities/path');
const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const app = express();

const store = new MongoDBStore({
    url: 'mongodb://localhost:27017/BookStoreDB',
    collection: 'sessions'

});

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended: true}));
//kujunuds
app.use(express.static('public'));


app.use(session({
    secret: 'my super-super secret secret', 
    resave: false,
    saveUninitialized: false, 
    store: store
}));

app.use((req, res, next) =>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        console.log(user); // callback on see .then()
        req.user = user;
        //req.user = new User(user.name, user.email, user.cart, user._id); mongoclineti puhul vaja
        next();
    })
    .catch(error =>{
        console.log(error);
    });
});


app.use('/', homeRouter);

app.use('/admin', adminRouter); //admin- is a filter
//app use on handler- haldab kõiki http meetodid

app.use(authRouter);

app.use((req, res) =>{
    res.render('404.ejs', {pageTitle: "Page not found", path: '', isAuthenticated: req.isLoggedIn});
    //res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'));
});

/* app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
}); - selle asemele tuleb mongoconnect

mongoConnect(() => {
    app.listen(3000, ()=> {
        console.log('Server is running on port 3000');
    });
}); */ 

mongoose.connect('mongodb://localhost:27017/BookStoreDB', {useUnifiedTopology: true})
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'John',
                email: 'john@gmail.com',
                cart:{
                    item: []
                }
            });
            user.save();
        }
    })
    app.listen(5000);
})
.catch(error => {
    console.log(error);
});