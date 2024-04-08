import { useEffect, useState, useContext } from 'react'
import { fetchPosts } from '../api/PostApi'
import { Context } from '../main'
import Post from '../components/Post'

export default () => {
    const [posts, setPosts] = useState([])
    const { userStore } = useContext(Context)

    const fetchPostsData = async () => {
        const postsData = await fetchPosts(userStore.isAuth)
        setPosts(postsData)
    }

    useEffect(() => {
        fetchPostsData()
    }, [])

    return (
        <div className='flex flex-col gap-8 w-full items-center my-8'>
            {
                posts && posts.map(post =>
                    <Post {...post} key={post.id} />
                )
            }
        </div>
    )
}