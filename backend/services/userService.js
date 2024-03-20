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

        this.sendCode(newUser)

        return true
    },

    async sendCode(user) {
        if(user.verificationCode) 
            throw ApiError.BadRequest('Code has been sent')

        const verificationCode = generateCode()
        user.update({ verificationCode })

        mailService.sendVerificationMail(user.email, verificationCode)
    },

    async verify(id, code) {
        const user = await userModel.findOne({
            where: { id }
        })

        if(!user || !user.verificationCode)
            throw ApiError.BadRequest('User has not verification code')

        if(user.verificationCode != code) 
            throw ApiError.BadRequest('Invalid verification code')

        user.update({
            verificationCode: null,
            isVerify: true
        })

        return await tokenService.generateToken({ id })
    },

    async login(email, password) {
        const user = await userModel.findOne({
            where: { email }
        })

        if(!user) 
            throw ApiError.BadRequest('Invalid Email')

        else if(!bcrypt.compare(password, user.password)) 
            throw ApiError.BadRequest('Wrong password')

        if(!user.isVerify) 
            throw ApiError.BadRequest('Not verified')

        const token = await tokenService.generateToken({
            id: user.id,
        })

        return token
    }
}