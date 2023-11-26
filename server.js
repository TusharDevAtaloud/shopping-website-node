const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./auth-service/routes');
const productRoutes = require('./product-service/routes')

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || ""

app.use(bodyParser.json());

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
