module.exports = class ApiError extends Error {
    constructor(status, message) {
        super(message)

        this.status = status
    }

    static BadRequest(message) {
        return new ApiError(400, message)
    }

    static NotFound() {
        return new ApiError(404, 'Not Found')
    }

    static Unauthorized() {
        return new ApiError(401, 'Unauthorized')
    }

    static Forbidden() {
        return new ApiError(403, 'Forbidden')
    }
}