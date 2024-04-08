import {authHost, host} from '.'

export async function fetchPosts(isAuth = false) {
    const { data } = isAuth ?
        await authHost.get('/post') :
        await host.get('/post')

    return data
}

export async function fetchUsersPosts(userId, isAuth = false) {
    const { data } = isAuth ?
        await authHost.get('/post', {
            params: { userId }
        }) :
        await host.get('/post', {
            params: { userId }
        })

    return data
}

export async function fetchPost(id, isAuth = false) {
    const { data } = isAuth ?
        await authHost.get('/post/' + id) :
        await host.get('/post/' + id)

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

export async function like(id) {
    authHost.post('/post/like/' + id)
}

export async function unlike(id) {
    authHost.post('/post/unlike/' + id)
}