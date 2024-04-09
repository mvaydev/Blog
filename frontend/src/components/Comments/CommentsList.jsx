import Block from '../../layout/Block'
import Comment from './Comment'
import { fetchComments } from '../../api/commentApi'
import { useEffect, useState } from 'react'

export default ({ postId }) => {
    const [comments, setComments] = useState(null)

    useEffect(() => {
        fetchComments(postId).then(res => setComments(res))
    }, [])

    return (
        <>
            {
                comments && (
                    <Block>
                        <h2 className='font-bold text-2xl' id='comments'>
                            Комментарии
                            <span className='text-stone-400'> {comments.length}</span>
                        </h2>

                        <div className='flex flex-col gap-4' >
                            {
                                comments.map(comment =>
                                    <Comment key={comment.id} {...comment} />
                                )
                            }
                        </div>
                    </Block>
                )
            }
        </>
    )
}
