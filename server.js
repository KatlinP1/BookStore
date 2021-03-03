const express = require('express');
//const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
//enne tuleb andmebaasiga ühendada kui route saada - käib mongoConnect kohta
const mongoConnect = require('./utilities/db').mongoConnect;

const User = require('./models/user');

//const rootDirectory = require('./utilities/path');
const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');
const app = express();

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended: true}));
//kujunuds
app.use(express.static('public'));

app.use((req, res, next) =>{
    User.findById("603f6f28bb9e230154919cf0")
    .then(user => {
        console.log(user); // callback on see .then()
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(error =>{
        console.log(error);
    });
});

app.use('/', homeRouter);

app.use('/admin', adminRouter); //admin- is a filter
//app use on handler- haldab kõiki http meetodid

app.use((req, res) =>{
    res.render('404.ejs', {pageTitle: "Page not found", path: ''});
    //res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'));
});

/*app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
}); - selle asemele tuleb mongoconnect*/ 

mongoConnect(() => {
    app.listen(3000, ()=> {
        console.log('Server is running on port 3000');
    });

});