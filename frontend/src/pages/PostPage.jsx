import { useContext, useEffect, useState } from 'react'
import { fetchPost, deletePost } from '../api/PostApi'
import { fetchAuthUser } from '../api/userApi'
import { useParams } from 'react-router'
import { useNavigate, Link } from 'react-router-dom'
import { getFullCreatedAt } from '../utils/helpers'
import { Context } from '../main'

import Block from '../layout/Block'
import Dropdown from '../components/Dropdown'
import LikeButton from '../components/LikeButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {
    const [post, setPost] = useState(null)
    const [isBelongsToUser, setIsBelongsToUser] = useState(false)
    const { userStore } = useContext(Context)
    const { id } = useParams()
    const navigate = useNavigate()

    const handleDeletePost = () => {
        if(confirm('Вы уверены?'))
            deletePost(post.id).then(() => navigate('/'))
    }

    const fetchPostData = async () => {
        try {
            const postData = await fetchPost(id, userStore.isAuth)
            setPost(postData)

            if(userStore.isAuth) {
                const userData = await fetchAuthUser()
                setIsBelongsToUser(userData.id === postData.userId)
            }
        } catch {
            navigate('/')
        }
    }

    useEffect(() => {
        fetchPostData()
    }, [])

    return (
        post && (
            <div className='w-full flex justify-center mt-8'>
                <Block>
                    <div className='flex gap-1.5 items-center w-full'>
                        <Link to={'/profile/' + post.userId} className='hover:underline'>{post.userName}</Link>
                        <p className='text-sm text-stone-500 '>{getFullCreatedAt(post.createdAt)}</p>
                    </div>

                    <div className='w-full flex gap-4'>
                        <h1 className='text-2xl font-bold w-full'>{post.title}</h1>

                        {
                            isBelongsToUser && (
                                <Dropdown>
                                    <Link
                                        to={'/edit/' + post.id}
                                        className='text-stone-500 hover:text-stone-700 flex gap-1.5 items-center'
                                    >
                                        <FontAwesomeIcon icon='fa-regular fa-pen-to-square' />
                                        Изменить
                                    </Link>

                                    <hr />

                                    <button
                                        className='text-rose-500 hover:text-rose-700 flex gap-1.5 items-center'
                                        onClick={handleDeletePost}
                                    >
                                        <FontAwesomeIcon icon='fa-regular fa-trash-can' />
                                        Удалить
                                    </button>
                                </Dropdown>
                            )
                        }
                    </div>

                    {post.introduction}
                    <div className='flex flex-col gap-2' dangerouslySetInnerHTML={{__html: post.contentHtml}}></div>

                    <div className='flex gap-2'>
                        <LikeButton likes={post.likes} isLiked={post.isLiked} postId={post.id} />

                        <div className='rounded-full bg-stone-200 py-1.5 px-3 w-fit flex gap-1.5 items-center'>
                            <span className='text-stone-500'>{post.comments}</span>
                            <FontAwesomeIcon icon='fa-regular fa-message' className='text-stone-500 text-xl' />
                        </div>
                    </div>
                </Block>
            </div>
        )
    )
}
