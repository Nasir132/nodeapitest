const express = require('express');
const mongose = require('mongoose')
const bodyparser = require('body-parser')
const app = express();

//middlewares
//body parser
app.use(bodyparser.json())

//import routes
const apiRoute = require('./routes/apiroutes')
app.use('/', apiRoute)
//setup database
const url = 'db+smongorv://Nasir:0555132999@cluster0.sepipgz.mongodb.net/?retryWrites=true&w=majority';
mongose.connect(url).then(() => {
    console.log('Database connected.......')
}).catch(err => console.log(err))





app.listen(3000, () => console.log('server connected'))