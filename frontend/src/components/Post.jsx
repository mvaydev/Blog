import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getFullCreatedAt } from '../utils/helpers'
import { deletePost } from '../api/PostApi'

import Block from '../layout/Block'
import Dropdown from './Dropdown'

import Like from '../assets/img/heart.svg'
import Liked from '../assets/img/heart_filled.svg'
import Comment from '../assets/img/comment.svg'
import Bin from '../assets/img/bin.svg'
import Edit from '../assets/img/edit.svg'

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
    const navigate = useNavigate()

    const handleDeletePost = () => {
        if(confirm('Вы уверены?')) deletePost(props.id).then(() => navigate('/'))
    }

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

                {
                    (props.isBelongsToUser && props.isPostPage) && (
                        <Dropdown>
                            <button className='text-stone-500 hover:text-stone-600 flex gap-1.5 items-center'>
                                <img src={Edit} />
                                Изменить
                            </button>
                            <hr />
                            <button
                                className='text-rose-500 hover:text-rose-600 flex gap-1.5 items-center'
                                onClick={handleDeletePost}
                            >
                                <img src={Bin} />
                                Удалить
                            </button>
                        </Dropdown>
                    )
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
