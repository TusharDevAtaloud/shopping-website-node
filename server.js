const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./auth-service/routes');
const productRoutes = require('./product-service/routes')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login-api').then(
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
