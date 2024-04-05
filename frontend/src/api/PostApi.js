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

export async function create(title, content, introduction) {
    authHost.post('/post', {
        title, content, introduction
    })
}

export async function edit(id, title, content, introduction) {
    authHost.put('/post/' + id, {
        title, content, introduction
    })
}

export async function deletePost(id) {
    authHost.delete('/post/' + id)
}