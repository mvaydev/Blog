const userRouter = require('./userRouter')
const postRouter = require('./postRouter')
const router = new require('express').Router()

router.use('/user', userRouter)
router.use('/post', postRouter)

module.exports = router