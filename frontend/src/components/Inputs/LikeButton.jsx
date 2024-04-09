import { useState } from 'react'
import { like, unlike } from '../../api/PostApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default props => {
    const [likes, setLikes] = useState(props.likes)
    const [isLiked, setIsLiked] = useState(!!props.isLiked)

    const likeChangedHandler = () => {
        setIsLiked(!isLiked)

        if(!isLiked) {
            setLikes(likes + 1)
            like(props.postId)
        } else {
            setLikes(likes - 1)
            unlike(props.postId)
        }
    }

    return (
        <button
            className='rounded-full bg-stone-200 py-1.5 px-3 w-fit flex gap-1.5 items-center hover:bg-stone-300'
            onClick={likeChangedHandler}
        >
            <span className='text-stone-500'>{likes}</span>
            {
                !isLiked ?
                <FontAwesomeIcon icon='fa-regular fa-heart' className='text-xl text-rose-500' /> :
                <FontAwesomeIcon icon='fa-solid fa-heart' className='text-xl text-rose-500' />
            }
        </button>
    )
}