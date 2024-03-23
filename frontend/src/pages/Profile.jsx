import { useContext, useEffect, useState, useeffect } from 'react'
import { Context } from '../main'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

function getRegistrationDate(user) {
    const userCreatedAtTimestamp = new Date(user.createdAt)
    return new Intl.DateTimeFormat("ru", {dateStyle: "long"}).format(userCreatedAtTimestamp)
}

function getRegistrationTime(user) {
    const userCreatedAtTimestamp = new Date(user.createdAt)
    return new Intl.DateTimeFormat("ru", {timeStyle: "short"}).format(userCreatedAtTimestamp);
}

export default () => {
    const { userStore } = useContext(Context)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        userStore.fetchAuthUser()
        .then(res => {
            setUser(res)
        })
        .catch(() => {
            navigate('/')
        })
    }, [])

    return (
        <>
            <Navbar />

            <div className='-w-full flex justify-center mt-8'>
                <div className='max-w-5xl w-full rounded-md flex flex-col gap-3 shadow-md p-4'>
                    {
                        user && (
                            <>
                                <h3 className='font-bold text-xl'>{user.name}</h3>
                                <span className='text-stone-500'>
                                    Дата регистрации: 
                                    {' '}
                                    {getRegistrationDate(user)} в
                                    {' '}
                                    {getRegistrationTime(user)}
                                </span>

                                <Link to='/settings' className='text-rose-500'>Настройки</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
