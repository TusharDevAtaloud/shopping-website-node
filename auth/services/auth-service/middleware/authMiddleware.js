const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(402).json({
            error: 'Unauthorized'
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: 'Token expired'
            })
        }

        req.user = {
            userId: decoded.userId
        }
        next()
    })
}

module.exports = authMiddleware