import { useContext, useEffect, useState } from 'react'
import { Context } from '../main';

export default () => {
    const { store } = useContext(Context)
    const [user, setUser] = useState(null)

    useEffect(() => {
        store.fetchUser().then(res => {
            setUser(res)
        })
    }, [])

    return (
        <h1>
            Hello! { user && user.email }
        </h1>
    )
}