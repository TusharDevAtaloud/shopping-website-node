const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    console.log({token})

    if (!token) {
        return res.status(402).json({
            error: 'Unauthorized'
        })
    }
    jwt.verify(token, process.env.JWT_SECRET || '10', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: 'Token expired',
                errorMessage: err
            })
        }

        req.user = {
            userId: decoded.userId
        }
        next()
    })
}

module.exports = authMiddleware