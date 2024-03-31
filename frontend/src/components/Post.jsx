import { useState } from 'react'
import { getFullCreatedAt } from '../utils/helpers'

import Block from '../layout/Block'

import Like from '../assets/img/heart.svg'
import Liked from '../assets/img/heart_filled.svg'
import Comment from '../assets/img/comment.svg'

function LikeButton(props) {
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

export default (props) => {


    return (
        <Block>
            <div className='flex gap-1.5 items-center w-full'>
                <Link to={'/profile/' + props.userId}>{props.userName}</Link>
                <p className='text-sm text-stone-500 '>{getFullCreatedAt(props.createdAt)}</p>
            </div>

            <div className='w-full flex gap-4'>
                {
                    props.isPostPage ? 
                    <h1 className='text-2xl font-bold w-full'>
                        {props.title}
                    </h1> :
                    <Link to={'/post/' + props.id} className='text-xl font-bold'>
                        {props.title}
                    </Link>
                }

            </div>

            <p>{props.content}</p>

            <div className='flex gap-2'>
                <LikeButton likes={props.likes} />

                <Link 
                    to={'/post/' + props.id + '/#comments'}
                    className='rounded-full bg-stone-200 py-1.5 px-3 w-fit flex gap-1.5 hover:bg-stone-300'
                >
                    <span className='text-stone-500'>{props.comments}</span>
                    <img src={Comment} />
                </Link>
            </div>
        </Block>
    )
}
