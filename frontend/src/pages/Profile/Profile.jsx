import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFullCreatedAt } from '../../utils/helpers'
import { fetchAuthUser } from '../../api/userApi'
import { fetchUsersPosts } from '../../api/PostApi'

import Block from '../../layout/Block'
import Post from '../../components/Post'

export default () => {
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState(null)
    const paramUserId = useParams().id

    const fetchPosts = async () => {
        let userData = null
        let isAuth = !paramUserId

        userData = !paramUserId ?
            await fetchAuthUser() :
            await fetchUser(paramUserId)

        setUser(userData)

        if(userData)
            setPosts(await fetchUsersPosts(userData.id, isAuth))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className='-w-full flex items-center mt-8 gap-6 flex-col'>
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

            <div className='flex flex-col gap-6 w-full items-center'>
                <Block>
                    <h2 className='font-bold text-2xl'>
                        Публикации
                        <span className='text-stone-400'> {posts && posts.length}</span>
                    </h2>
                </Block>
                {
                    posts ?
                    posts.map(post => <Post {...post} key={post.id} />) :
                    <p className='text-center'>У пользователя нет постов</p>
                }
            </div>
        </div>
    )
}
