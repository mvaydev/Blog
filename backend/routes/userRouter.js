const userController = require('../controllers/userController')
const router = new require('express').Router()

const auth = require('../middleware/authMiddleware')
const { body, param, check } = require('express-validator')

const ApiError = require('../apiError')

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

router.post('/send-code/:email', 
    param('email').isEmail(),
    userController.sendCode
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

router.put('/change-email', 
    auth,
    body('oldEmail').isEmail(),
    body('newEmail').isEmail(),
    userController.changeEmail
)

router.put('/change-name/:name', 
    auth,
    check('name').custom(name => {
        for(let char = 0; char < name.length; char++) {
            if( !validator.isAlpha(value[charIdx], 'en-US') && 
                !validator.isAlpha(value[charIdx], 'ru-RU')) {
                throw ApiError.BadRequest('Validation errors')
            }   
        }
  
        return true
    }),
    userController.changeName
)

router.delete('/', 
    auth,
    userController.delete
)

module.exports = router