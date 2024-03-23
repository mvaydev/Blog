const userController = require('../controllers/userController')
const router = new require('express').Router()
const { body, param } = require('express-validator')
const auth = require('../middleware/authMiddleware')

router.post('/login', 
    body('email').isEmail(), 
    body('password').isLength({
        min: 6,
        max: 16
    }), 
    userController.login
)

router.post('/verify',
    body('id').isInt(),
    body('code').isInt(),
    userController.verifyEmail
)

router.delete('/:id', 
    param('id').isInt(),
    userController.delete
)

router.get('/:id', 
    param('id').isInt(),
    userController.get
)

router.get('/', 
    auth,
    userController.authGet
)

router.post('/', 
    body('name').notEmpty(),
    body('email').isEmail(), 
    body('password').isLength({
        min: 6,
        max: 16
    }),
    userController.registrate
)

module.exports = router