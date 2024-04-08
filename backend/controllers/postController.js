const postService = require('../services/postService')
const tokenService = require('../services/tokenService')
const {validationResult } = require('express-validator')
const ApiError = require('../apiError')

module.exports = {
    async getAll(req, res, next) {
        try {
            const header = req.headers.authorization
            let token = ''
            let userId = null
            let posts = null

            if(header) token = header.split(' ')[1]
            if(token) userId = tokenService.verifyToken(token)?.id

            posts = userId ?
                await postService.getAll(req.params.id, userId) :
                await postService.getAll(req.params.id)

            res.json(posts)
        } catch (e) {
            next(e)
        }
    },

    async get(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const header = req.headers.authorization
            let token = ''
            let userId = null
            let post = null

            if(header) token = header.split(' ')[1]
            if(token) userId = tokenService.verifyToken(token)?.id

            post = userId ?
                await postService.get(req.params.id, userId) :
                await postService.get(req.params.id)

            res.json(post)
        } catch (e) {
            next(e)
        }
    },

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const post = await postService.create(req.user.id, req.body)

            res.status(201).json(post)
        } catch (e) {
            next(e)
        }
    },

    async update(req, res, next) {
        try {
            const post = await postService.update(req.params.id, req.body)

            res.json(post)
        } catch (e) {
            next(e)
        }
    },

    async delete(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const post = await postService.delete(req.params.id)

            res.json(post)
        } catch (e) {
            next(e)
        }
    },

    async like(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            await postService.like(req.params.id, req.user.id)

            res.end()
        } catch (e) {
            next(e)
        }
    },

    async unlike(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            await postService.unlike(req.params.id, req.user.id)

            res.end()
        } catch (e) {
            next(e)
        }
    },
}