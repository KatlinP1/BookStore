const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const rootDirectory = require('./utilities/path');
const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');
const app = express();

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended: true}));
//kujunuds
app.use(express.static('public'));

app.use('/', homeRouter);

app.use('/admin', adminRouter.router); //admin- is a filter
//app use on handler- haldab kõiki http meetodid

app.use((req, res) =>{
    res.render('404.ejs', {pageTitle: "Page not found", path: ''});
    //res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'));
});

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
});