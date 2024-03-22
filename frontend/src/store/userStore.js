import { makeAutoObservable } from 'mobx'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/user'

export default class UserStore {
    _token = ''
    _isAuth = false

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
            this._isAuth = isAuth
        }

        return this._isAuth
    }

    set isAuth(value) {
        this._isAuth = value
        localStorage.isAuth = value
    }

    async fetchUser() {
        try {
            const response = await axios.get(API_URL + '/data', {
                headers: {
                    Authorization: "Bearer " + this.token
                }
            })

            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(API_URL + '/login', {
                email,
                password
            })

            this.isAuth = true
            this.token = response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async verify(code) {
        try {
            const response = await axios.post(API_URL + '/verify', {
                id: this.id,
                code
            })

            this.isAuth = true
            this.token = response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registrate(name, email, password) {
        try {
            const response = await axios.post(API_URL, {
                name,
                email,
                password
            })

            this.id = response.data

            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    logout() {
        delete localStorage.token
        this.token = null
        this.isAuth = false
    } 
}