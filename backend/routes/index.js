const userRouter = require('./userRouter')
const postRouter = require('./postRouter')
const commentRouter = require('./commentRouter')
const router = new require('express').Router()

router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)

module.exports = router