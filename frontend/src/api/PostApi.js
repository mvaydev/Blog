import {authHost, host} from '.'

export async function fetchPosts() {
    const { data } = await host.get('/post')

    return data
}

export async function fetchUsersPosts(userId) {
    const { data } = await host.get('/post', {
        params: { userId }
    })

    return data
}

export async function fetchPost(id) {
    const { data } = await host.get('/post/' + id)

    return data
}

export async function create(title, content) {
    authHost.post('/post', {
        title, content
    })
}

export async function deletePost(id) {
    authHost.delete('/post/' + id)
}