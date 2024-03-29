import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Block from '../layout/Block'
import { getFullCreatedAt } from '../utils/helpers'
import { fetchUser } from '../api/userApi'

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
    const [userName, setUserName] = useState('')

    useEffect(() => {
        fetchUser(props.userId).then(({name}) => setUserName(name))
    }, [])

    return (
        <>
            <Block>
                <div className='flex gap-1.5 items-center w-full'>
                    <Link to={'/profile/' + props.userId}>{userName && userName}</Link>
                    <p className='text-sm text-stone-500 '>{getFullCreatedAt(props.createdAt)}</p>
                </div>

                <Link to={'/post/' + props.id}>
                    <h1 className='text-xl font-bold'>{props.title}</h1>
                </Link>

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
        </>
    )
}
