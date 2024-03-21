import { makeAutoObservable } from 'mobx'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/user'

class UserStore {
    _token = ''
    isAuth = false
    user = {}

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

    async login(email, password) {
        try {
            const response = await axios.post(API_URL + '/login', {
                email,
                password
            })

            this.isAuth = true
            this.token = response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async verify(code) {
        try {
            await axios.post(API_URL + '/verify', {
                params: {
                    id: this.user.id,
                    verificationCode: code
                }
            })
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registrate(name, email, password) {
        try {
            const response = await axios.post(API_URL, {
                data: {
                    name,
                    email,
                    password
                }
            })

            this.user = response.data.user
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    logout() {
        delete localStorage.token
        this.isAuth = false
    } 
}

export default new UserStore