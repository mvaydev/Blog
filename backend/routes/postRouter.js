const postController = require('../controllers/postController')
const router = new require('express').Router()
const auth = require('../middleware/authMiddleware')
const { param } = require('express-validator')

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

router.put(
    '/:id',
    auth,
    param('id').isInt(),
    postController.update
)

router.delete(
    '/:id',
    auth,
    param('id').isInt(),
    postController.delete
)

router.post(
    '/like/:id',
    auth,
    param('id').isInt(),
    postController.like
)

router.post(
    '/unlike/:id',
    auth,
    param('id').isInt(),
    postController.unlike
)

module.exports = router

