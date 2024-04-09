import { Link } from 'react-router-dom'
import { getFullCreatedAt } from '../utils/helpers'
import Block from '../layout/Block'
import LikeButton from './Inputs/LikeButton'
import Button from './Inputs/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
    return (
        <Block>
            <div className='flex gap-1.5 items-center w-full'>
                <Link to={'/profile/' + props.userId} className='hover:underline'>{props.userName}</Link>
                <p className='text-sm text-stone-500 '>{getFullCreatedAt(props.createdAt)}</p>
            </div>

            <Link to={'/post/' + props.id} className='text-xl font-bold hover:text-rose-500'>
                {props.title}
            </Link>

            <div>{props.introduction}</div>

            <Link  to={'/post/' + props.id} className='w-fit'>
                <Button>Читать далее...</Button>
            </Link>

            <div className='flex gap-2'>
                <LikeButton likes={props.likes} isLiked={props.isLiked} postId={props.id} />

                <Link
                    to={'/post/' + props.id + '/#comments'}
                    className='rounded-full bg-stone-200 py-1.5 px-3 w-fit flex gap-1.5 hover:bg-stone-300 items-center'
                >
                    <span className='text-stone-500'>{props.comments}</span>
                    <FontAwesomeIcon icon='fa-regular fa-message' className='text-stone-500 text-xl' />
                </Link>
            </div>
        </Block>
    )
}
