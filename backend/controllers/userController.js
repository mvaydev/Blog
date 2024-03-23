const { userModel } = require('../models')

const userService = require('../services/userService')
const mailService = require('../services/mailService')
const tokenService = require('../services/tokenService')

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

    async authGet(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation errors'))
        }

        const user = await userModel.findOne({
            where: {
                id: req.user.id
            }
        })

        if(!user) {
            return next(ApiError.NotFound())
        }

        res.json(user)
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
            return next(ApiError.NotFound())
        }

        res.json({
            name: user.name,
            createdAt: user.createdAt
        })
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
            user.update({ verificationCode })

            res.status(201).json(user.id)
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

            userService.verifyEmail(req.body.id, req.body.code)

            const token = await tokenService.generateToken({
                id: req.body.id
            })

            res.json(token)
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