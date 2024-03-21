const { userModel } = require('../models')
const userService = require('../services/userService')
const mailService = require('../services/mailService')
const { validationResult } = require('express-validator')
const ApiError = require('../apiError')

module.exports = {
    async getAll(req, res, next) {
        try {
            const users = await userModel.findAll()

            res.json(users)
        } catch (e) {
            next(e)
        }
    },

    async get(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation errors'))
        }

        const user = await userModel.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!user) {
            res.status(404).send({message: 'Not Found'})
            return
        }

        res.json(user)
    },

    async registrate(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const user = await userService.registrate(req.body)
            const verificationCode = userService.generateCode()

            mailService.sendVerificationMail(user.email, verificationCode)

            res.status(201).json(user)

            user.update({ verificationCode })
        } catch (e) {
            next(e)
        }
    },

    async verifyEmail(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            await userService.verifyEmail(req.params.id, req.params.code)
        } catch(e) {
            next(e)
        }
    },

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return next(ApiError.BadRequest('Validation errors'))

            const { email, password } = req.body

            const token = await userService.login(email, password)

            res.json(token)
        } catch(e) {
            next(e)
        }
    },

    async delete(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation errors'))
        }

        const user = await userModel.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!user) res.status(404).send({message: 'Not Found'})

        await user.destroy()

        res.json(user)
    },
}