const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./auth-service/routes');
const productRoutes = require('./product-service/routes')

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || ""

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


// Connect to MongoDB
mongoose.connect(mongoUrl).then(
    () => {
        console.log("Connected to mongo db")
    },
    err => {
        console.log("Connection error")
    }
)

app.use('/auth', authRoutes);
app.use('/products', productRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app
