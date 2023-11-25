const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide Product Name']
    },
    description: {
        type: String,
        required: [true, 'Please provide Product Description'],
        validate: {
            validator: function (value) {
                return value.length <= 500
            },
            message: "Description exceeds the maximum allowed length of 500 characters"
        }
    },
    brand: {
        type: String,
        required: [true, 'Please provide the brand'],
    },
    category: {
        type: String,
        required: [true, 'Please provide proper product category'],
        enum: [
            'Top Wear',
            'Bottom Wear',
            'Foot Wear',
            'Accessories',
            'Jewellery',
            'Inner Wear'
        ],
    },
    gender: {
        type: String,
        required: [true, 'Please select a Gender for the product'],
        enum: [
            'Male',
            'Female',
            'Unisex'
        ]
    },
    ageGroup: {
        type: String,
        required: [true, 'Please select the age group of the product'],
        enum: [
            'Kids',
            'Teenagers',
            'Adults'
        ]
    },
    price: {
        type: Number,
        required: [true, 'Please mention the price of the product'],
    },
    catelogueUrls: {
        type: [String],
        required: [true, 'Please provide some product images and videos'],
    }
})

module.exports = mongoose.model('Product', productSchema)