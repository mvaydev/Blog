const userController = require('../controllers/userController')
const router = new require('express').Router()
const { body, param } = require('express-validator')
const auth = require('../middleware/authMiddleware')

router.get('/:id', 
    param('id').isInt(),
    userController.get
)

router.get('/', 
    auth,
    userController.authGet
)

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
    userController.verify
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

router.put('/change-password', 
    auth,
    body('oldPassword').notEmpty(),
    body('newPassword').isLength({
        min: 6,
        max: 16
    }),
    userController.changePassword
)

router.delete('/', 
    auth,
    userController.delete
)

module.exports = router