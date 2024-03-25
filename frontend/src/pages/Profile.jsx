import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Context } from '../main'
import Navbar from '../components/Navbar'
import Block from '../components/Block'
import { getFullCreatedAt } from '../helpers'

export default () => {
    const { userStore } = useContext(Context)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        userStore.fetchAuthUser()
        .then(res => setUser(res))
        .catch(() => navigate('/'))
    }, [])

    return (
        <>
            <Navbar />

            <div className='-w-full flex justify-center mt-8'>
                <Block>
                    {
                        user && (
                            <>
                                <h3 className='font-bold text-xl'>{user.name}</h3>
                                <span className='text-stone-500'>
                                    Дата регистрации: 
                                    {' '}
                                    {getFullCreatedAt(user.createdAt)}
                                </span>

                                <Link to='/settings' className='text-rose-500'>Настройки</Link>
                            </>
                        )
                    }
                </Block>
            </div>
        </>
    )
}
