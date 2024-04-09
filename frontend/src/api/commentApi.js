import {authHost, host} from '.'

export async function fetchComments(postId) {
    const comments = await host.get('/comment', {
        params: { postId }
    })

    return comments.data
}

export async function create(postId, content) {
    authHost.post('/comment', {
        postId, content
    })
}