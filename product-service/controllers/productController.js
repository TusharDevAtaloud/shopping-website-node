const Product = require('../models/Product')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            data: products
        })
    } catch (err) {
        console.log({ err })
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

exports.addProduct = async (req, res) => {
    try {
        const {
            brand,
            name,
            description,
            category,
            gender,
            price,
            catelogueUrls,
            ageGroup

        } = req.body

        const userId = req.user.userId

        const product = new Product({
            name: name,
            brand: brand,
            description: description,
            category: category,
            gender: gender,
            price: price,
            catelogueUrls: catelogueUrls,
            ageGroup: ageGroup
        })

        await product.save()

        res.status(200).json({
            message: 'Product added successfully'
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ errors: validationErrors?.[0] });
        }

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}