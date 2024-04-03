import { makeAutoObservable } from 'mobx'

export default class UserStore {
    _token = ''
    _isAuth = false
    _isVerify = false
    _id

    constructor(){
        makeAutoObservable(this)
    }

    get token() {
        if(!this._token) {
            let token = localStorage.token
            this._token = token
        }

        return this._token
    }

    set token(value) {
        this._token = value
        localStorage.token = value
    }

    get isAuth() {
        if(!this._isAuth) {
            let isAuth = localStorage.isAuth
            this._isAuth = isAuth === 'true'
        }

        return this._isAuth
    }

    set isAuth(value) {
        this._isAuth = value
        localStorage.isAuth = value
    }

    set isVerify(value) {
        this._isVerify = value
    }

    get isVerify() {
        return this._isVerify
    }

    async getId() {
        if(!this._id )
            this._id = await this.fetchAuthUser().id

        return this._id
    }

    logout() {
        delete localStorage.token
        delete localStorage.isAuth
        this.token = null
        this.isAuth = false
    }
}
