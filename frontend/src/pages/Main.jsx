import Navbar from '../components/Navbar'
import Post from '../components/Post'

const POSTS = [
    {
        author: 'Maksim Vaysbekker',
        createdAt: '12.09.2024 в 12:07',
        title: 'Пост №1',
        content: 'Lorem ipsum dolor sit amet',
        likes: 12,
        comments: 3
    },
    {
        author: 'Maksim Vaysbekker',
        createdAt: '12.09.2024 в 12:07',
        title: 'Пост №2',
        content: 'Lorem ipsum dolor sit amet',
        likes: 12,
        comments: 3
    },
    {
        author: 'Maksim Vaysbekker',
        createdAt: '12.09.2024 в 12:07',
        title: 'Пост №3',
        content: 'Lorem ipsum dolor sit amet',
        likes: 12,
        comments: 3
    },
    {
        author: 'Maksim Vaysbekker',
        createdAt: '12.09.2024 в 12:07',
        title: 'Пост №4',
        content: 'Lorem ipsum dolor sit amet',
        likes: 12,
        comments: 3
    },
    {
        author: 'Maksim Vaysbekker',
        createdAt: '12.09.2024 в 12:07',
        title: 'Пост №5',
        content: 'Lorem ipsum dolor sit amet',
        likes: 12,
        comments: 3
    },
    {
        author: 'Maksim Vaysbekker',
        createdAt: '12.09.2024 в 12:07',
        title: 'Пост №6',
        content: 'Lorem ipsum dolor sit amet',
        likes: 12,
        comments: 3
    },
]

export default () => {
    return (
        <>
            <Navbar />
            <div className='flex flex-col gap-8 w-full items-center mt-8'>
                

                {
                    POSTS.map((post, index) => 
                        <Post 
                            key={index} 
                            author={post.author} 
                            createdAt={post.createdAt} 
                            title={post.title} 
                            content={post.content} 
                            likes={post.likes} 
                            comments={post.comments} 
                            id={index}
                        />
                    )
                }
            </div>
        </>
    )
}