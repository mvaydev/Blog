const userController = require('../controllers/userController')
const router = new require('express').Router()
const { body, param } = require('express-validator')
const auth = require('../middleware/authMiddleware')

router.get('/', userController.getAll)

router.get('/login', 
    body('email').isEmail(), 
    body('password').isLength({
        min: 6,
        max: 16
    }), 
    userController.login
)

router.get('/verify/:id/:code',
    param('id').isInt(),
    param('code').isInt(),
    userController.verify
)

router.delete('/:id', 
    param('id').isInt(),
    userController.delete
)

router.get('/:id', 
    param('id').isInt(),
    userController.get
)

router.post('/', 
    body('email').isEmail(), 
    body('password').isLength({
        min: 6,
        max: 16
    }),
    userController.registrate
)

module.exports = router