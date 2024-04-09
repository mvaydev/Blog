const commentController = require('../controllers/commentController')
const router = new require('express').Router()
const auth = require('../middleware/authMiddleware')

router.get(
    '/',
    commentController.getAll
)

router.post(
    '/',
    auth,
    commentController.create
)

module.exports = router