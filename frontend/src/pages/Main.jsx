import { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import Navbar from '../components/Navbar'
import Post from '../components/Post'


export default () => {
    const {postStore} = useContext(Context)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        postStore.fetchPosts().then(res => setPosts(res))
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex flex-col gap-8 w-full items-center my-8'>
                {
                    posts && [...posts].reverse().map(post => 
                        <Post 
                            key={post.id} 
                            userId={post.userId} 
                            createdAt={post.createdAt} 
                            title={post.title} 
                            content={post.content} 
                            likes={post.likes} 
                            comments={post.comments} 
                            id={post.id}
                        />
                    )
                }
            </div>
        </>
    )
}