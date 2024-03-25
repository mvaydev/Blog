const bcrypt = require('bcrypt')
const ApiError = require('../apiError')
const { userModel } = require('../models')
const tokenService = require('./tokenService')
const mailService = require('./mailService')

const CODE_EXPIRATION_TIME = 1000 * 60 * 15 // 15 min

module.exports = {
    generateCode() {
        const MIN = 0
        const MAX = 9
        const LENGTH = 6
    
        let code = ''
    
        for(let i = 0; i < LENGTH; i++) {
            code += Math.floor(Math.random() * (MAX - MIN)) + MIN;
        }
    
        return code;
    },

    async registrate(userData) {
        const candidate = await userModel.findOne({
            where: {
                email: userData.email
            }
        })

        if(candidate) throw ApiError.BadRequest('User exists')

        const hashPassword = await bcrypt.hash(userData.password, 10)

        const newUser = await userModel.create({
            name: userData.name,
            email: userData.email,
            password: hashPassword,
        })

        return newUser
    },

    async sendCode(email) {
        const user = await userModel.findOne({
            where: { email }
        })

        if (!user) {
            return next(ApiError.BadRequest('Invalid email'))
        }

        const verificationCode = this.generateCode()

        mailService.sendVerificationMail(email, verificationCode)

        user.update({ verificationCode })
    },

    async verify(id, code) {
        const user = await userModel.findByPk(id)

        if(!user || !user.verificationCode)
            throw ApiError.BadRequest('User has not verification code')

        else if(user.verificationCode != code) 
            throw ApiError.BadRequest('Invalid verification code')

        else if(user.updatedAt + CODE_EXPIRATION_TIME > Date.now()) 
            throw new ApiError(408, 'Code expiration time over')

        user.update({
            verificationCode: null,
            isVerify: true
        })
    },

    async login(email, password) {
        const user = await userModel.findOne({
            where: { email }
        })

        if(!user) 
            throw ApiError.BadRequest('Invalid Email')

        if(!user.isVerify)
            throw ApiError.BadRequest('Not verified')

        const compareResult = await bcrypt.compare(password, user.password)

        if(!compareResult) 
            throw ApiError.BadRequest('Wrong password')

        const token = await tokenService.generateToken({
            id: user.id,
        })

        return token
    },

    async changePassword(id, oldPassword, newPassword) {
        const user = await userModel.findByPk(id)

        if(!user) throw ApiError.NotFound()

        const compareResult = await bcrypt.compare(oldPassword, user.password)

        if(!compareResult)
            throw ApiError.BadRequest('Wrong password')

        user.update({
            password: await bcrypt.hash(newPassword, 10)
        })
    },

    async changeEmail(oldEmail, newEmail) {
        const user = await userModel.findOne({
            where: {email: oldEmail}
        })

        if(!user) throw ApiError.NotFound()
        if(user.verificationCode) throw ApiError.BadRequest('Not verified')

        user.update({
            email: newEmail
        })
    },

    async changeName(id ,newName) {
        const user = await userModel.findByPk(id)

        if(!user) throw ApiError.Unauthorized()

        user.update({
            name: newName
        })
    }
}