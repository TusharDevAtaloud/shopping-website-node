const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const secretKey = process.env.JWT_SECRET || 10


exports.register = async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            username: username,
            password: hashedPassword,
            email: email,
            phone: phone
        })
        await user.save()
        res.status(201).json({
            message: "User regisrered successfully"
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Passwords do not match'
            })
        }

        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h'
        })

        res.status(200).json({ token: token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}