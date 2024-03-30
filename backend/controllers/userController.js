const { userModel } = require('../models')
const userService = require('../services/userService')
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

        if(!user) return next(ApiError.NotFound())

        res.json({
            id: user.id,
            name: user.name,
            createdAt: user.createdAt
        })
    },

    async sendCode(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }
    
            await userService.sendCode(req.body.id, req.body.email)

            res.end()
        } catch(e) {
            next(e)
        }
    },

    async registrate(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const user = await userService.registrate(req.body)
            await userService.sendCode(user.id, user.email)

            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    },

    async verify(req, res, next) {
        try {
            console.log(req.body.code)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }
        
            await userService.verify(req.body.id, req.body.code)
            res.end()
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
        try {
            const user = await userService.delete(req.user.id, req.body.password)

            res.json(user)
        } catch (e) {
            next(e)
        }
    },

    async changePassword(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }
    
            await userService.changePassword(
                req.user.id, 
                req.body.oldPassword, 
                req.body.newPassword
            )

            res.end()
        } catch(e) {
            next(e)
        }
    },

    async changeEmail(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }
    
            await userService.changeEmail(
                req.body.oldEmail, 
                req.body.newEmail
            )

            res.end()
        } catch(e) {
            next(e)
        }
    },

    async changeName(req, res, next) {
        try {
            await userService.changeName(
                req.user.id,
                req.params.name
            )

            res.end()
        } catch(e) {
            next(e)
        }
    },
}