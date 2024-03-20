const ApiError = require("../apiError")
const tokenService = require('../services/tokenService')

module.exports = function(req, res, next) {
    try {
        const header = req.headers.authorization
        if(!header) return next(ApiError.Unauthorized())

        const token = header.split(' ')[1]
        if(!token) return next(ApiError.Unauthorized())

        const userData = tokenService.verifyToken(token)
        if(!userData) return next(ApiError.Unauthorized())

        req.user = userData

        next()
    } catch (e) {
        return next(ApiError.Unauthorized())
    }
}