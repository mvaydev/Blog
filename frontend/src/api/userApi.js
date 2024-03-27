import {authHost, host} from './'

export async function fetchAuthUser() {
    const response = await authHost.get('/user')

    return response.data
}

export async function fetchUser(id) {
    const { data } = await authHost.get('/user/' + id)

    return data
}

export async function login(email, password) {
    const { data } = await host.post('/user/login', {
        email, password
    })

    localStorage.token = data
}

export async function verify(id, code) {
    await host.post('/user/verify', {
        id, code
    })
}

export async function registrate(name, email, password) {
    host.post('/user', {
        name,
        email,
        password
    })
}

export async function changePassword(oldPassword, newPassword) {
    authHost.put('/user/change-password', {
        oldPassword, newPassword
    })
}

export async function changeEmail(oldEmail, newEmail) {
    authHost.put('/user/change-email', {
        oldEmail, newEmail
    })
}

export async function changeName(newName) {
    authHost.put('/user/change-name/' + newName)
}

export async function sendCode(id, email) {
    host.post('/user/send-code', {
        id, email
    })
}