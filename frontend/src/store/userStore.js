import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { USER_API_URL } from '../utils/consts' 

export default class UserStore {
    _token = ''
    _isAuth = false
    _isVerify = false

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

    logout() {
        delete localStorage.token
        this.token = null
        this.isAuth = false
    } 
}