const userRouter = require('./userRouter')
const router = new require('express').Router()

router.use('/user', userRouter)

module.exports = router