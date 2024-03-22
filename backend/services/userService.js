const bcrypt = require('bcrypt')

const ApiError = require('../apiError')

const { userModel } = require('../models')
const tokenService = require('./tokenService')
const mailService = require('./mailService')

function generateCode() {
    const MIN = 0
    const MAX = 9
    const LENGTH = 6

    let code = ''

    for(let i = 0; i < LENGTH; i++) {
        code += Math.floor(Math.random() * (MAX - MIN)) + MIN;
    }

    return Number(code);
}

const CODE_EXPIRATION_TIME = 1000 * 60 * 15 // 15 min

module.exports = {
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

    async verifyEmail(id, code) {
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

        if(!bcrypt.compare(password, user.password)) 
            throw ApiError.BadRequest('Wrong password')

        const token = await tokenService.generateToken({
            id: user.id,
        })

        return token
    }
}