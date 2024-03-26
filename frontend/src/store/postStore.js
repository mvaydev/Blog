import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { POST_API_URL } from '../utils/consts'

export default class PostStore {
    constructor() {
        makeAutoObservable(this)
    }

    async fetchPosts() {
        try {
            return (await axios.get(POST_API_URL)).data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}