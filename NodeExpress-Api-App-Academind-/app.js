// IMORTING THE EXPRESS API
const express = require('express');
// Importing the morgan API
const morgan = require('morgan');
// Importing the body parser
const bodyParser = require('body-parser')
// Importing mongoose
const mongoose = require('mongoose');



// OBJECTS HERE
const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-0o3re.mongodb.net/MyApiData?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Handling CORS issues
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});

//-----------------------------CUSTOM------------------------------------------------
//-----------------------------------------------------------------------------------

// IMPORTING THE ROUTING LIBRARIES FROM THE /api/routes folder
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

//-----------------------------MIDDLE WARES------------------------------------------
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Routing for the products resource /api/routes/products
app.use('/products', productRoutes);

// Routing for the orders resource /api/routes/orders
app.use('/orders', orderRoutes);

app.use('/users', userRoutes);


// ERROR HANDLING PROCEDURE
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
});


//--------------------EXPORTING THE MAIN APP MODULE TO RUN--------------------------------------------
//----------------------------------------------------------------------------------------------------
module.exports = app;