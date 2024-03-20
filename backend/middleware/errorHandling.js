const ApiError = require('../apiError')

module.exports = function (err, req, res, next) {
    console.error(err)

    if(err instanceof ApiError){
        res.status(err.status).json({ message: err.message })
        return
    }

    res.status(500).json({ message: 'Unexpected Error' })
}