import { useEffect, useState } from 'react'
import Post from '../components/Post'
import { fetchPost } from '../api/PostApi'
import { fetchAuthUser } from '../api/userApi'
import { useParams } from 'react-router'

export default () => {
    const [post, setPost] = useState(null)
    const [isBelongsToUser, setIsBelongsToUser] = useState(false)
    const [isUserFetched, setIsUserFetched] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        fetchPost(id)
        .then(resPost => {
            setPost(resPost)

            fetchAuthUser().then(resUser => {
                setIsBelongsToUser(resPost.userId === resUser.id)
                setIsUserFetched(true)
            })
        })
    }, [])

    return (
        <div className='w-full flex justify-center mt-4 my-12'>
            {
               (post && isUserFetched) && <Post {...post} isPostPage isBelongsToUser={isBelongsToUser} />
            }
        </div>
    )
}
