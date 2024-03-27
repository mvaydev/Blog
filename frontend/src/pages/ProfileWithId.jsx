import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import Block from '../components/Block'
import { getFullCreatedAt } from '../utils/helpers'
import { fetchUser } from '../api/userApi'

export default () => {
    const navigate = useNavigate()
    const paramUserId = useParams().id
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetchUser(paramUserId)
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
                            </>
                        )
                    }
                </Block>
            </div>
        </>
    )
}
