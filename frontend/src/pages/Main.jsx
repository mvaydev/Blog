import Navbar from '../components/Navbar'
import Post from '../components/Post'

const POSTS = [
    {
        userId: 18,
        createdAt: '12.09.2024 в 12:07',
        title: 'Монитор ASUS GM807:  лучший варинат для геймеров',
        content: 'Самый современный представитель игровых 4К IPS-решений в крупном размере. Правда, анонсирован он был на выставке CES в начале января 2021 года, а появился в реальной продаже ближе к лету того же года. Основной акцент в ASUS сделали, конечно, на скоростной 144-Гц UHD-панели и наличии HDMI 2.1, крайне актуальных для обладателей современных игровых приставок.',
        likes: 12,
        comments: 3
    },
]

export default () => {
    return (
        <>
            <Navbar />
            <div className='flex flex-col gap-8 w-full items-center my-8'>
                

                {
                    POSTS.map((post, index) => 
                        <Post 
                            key={index} 
                            userId={post.userId} 
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