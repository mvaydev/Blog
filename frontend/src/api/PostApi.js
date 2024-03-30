import {authHost, host} from '.'

export async function fetchPosts() {
    const { data } = await host.get('/post')

    return data
}

export async function create(title, content) {
    authHost.post('/post', {
        title, content
    })
}