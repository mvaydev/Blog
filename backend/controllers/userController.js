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

            await userService.registrate(req.body)
            res.status(201).end()
        } catch (e) {
            next(e)
        }
    },

    async verify(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const token = await userService.verify(req.params.id, req.params.code)

            res.json(token)
        } catch(e) {
            next(e)
        }
    },

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const {email, password} = req.body
            const user = await userService.login(email, password)

            res.json(user)
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