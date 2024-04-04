import { useEffect, useState } from 'react'
import { fetchPosts } from '../api/PostApi'
import Post from '../components/Post'

export default () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts().then(res => setPosts(res))
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