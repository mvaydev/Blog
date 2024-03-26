const postController = require('../controllers/postController')
const router = new require('express').Router()
const auth = require('../middleware/authMiddleware')
const { body, param } = require('express-validator')

router.get(
    '/',  
    postController.getAll
)

router.get(
    '/:id',
    param('id').isInt(),
    postController.get
)

router.post(
    '/', 
    auth, 
    postController.create
)

router.delete(
    '/:id',
    auth,
    param('id').isInt(),
    postController.delete
)

module.exports = router

