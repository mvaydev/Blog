import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Block from '../../layout/Block'
import { getFullCreatedAt } from '../../utils/helpers'
import { fetchUser } from '../../api/userApi'

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
    )
}
