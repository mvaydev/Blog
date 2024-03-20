const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = {
    generateToken(data) {
        try {
            return jwt.sign(data, process.env.JWT_SECRET_KEY)
        } catch (e) {
            return null
        }
    },

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch (e) {
            return null
        }
    }
}