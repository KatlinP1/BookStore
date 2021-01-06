const express = require('express');
const path = require('path');
const rootDirectory = require('./utilities/path');
const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');
const app = express();

//kujunuds
app.use(express.static('public'))

app.use('/', homeRouter);

app.use('/admin', adminRouter); //admin- is a filter
//app use on handler- haldab kõiki http meetodid

app.use((req, res) =>{
    res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'));
});

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
});