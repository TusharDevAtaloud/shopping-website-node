const express = require('express')
const router = express.Router()
const productController = require('./controllers/productController')
const authMiddleware = require('../auth/services/auth-service/middleware/authMiddleware')

router.get('/products', productController.getProducts)
router.post('/products', authMiddleware, productController.addProduct)

module.exports = router