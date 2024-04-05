import Like from '../assets/img/heart.svg'
import Liked from '../assets/img/heart_filled.svg'
import { useState } from 'react'

export default props => {
    const [likes, setLikes] = useState(props.likes)
    const [isLikesChanged, setIsLikesChanged] = useState(false)

    return (
        <button
            className='rounded-full bg-stone-200 py-1.5 px-3 w-fit flex gap-1.5 hover:bg-stone-300'
            onClick={() => {
                setIsLikesChanged(!isLikesChanged)
                !isLikesChanged ? setLikes(likes + 1) : setLikes(likes - 1)
            }}
        >
            <span className='text-stone-500'>{likes}</span>
            {
                !isLikesChanged ?
                <img src={Like} /> :
                <img src={Liked} />
            }
        </button>
    )
}