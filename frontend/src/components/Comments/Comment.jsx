import { Link } from 'react-router-dom'
import { getFullCreatedAt } from '../../utils/helpers'

export default props => {
    return (
        <>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 w-full'>
                    <Link to={'/profile/' + props.userId} className='font-medium hover:text-rose-500'>{props.userName}</Link>
                    <p className='text-sm text-stone-500 '>{getFullCreatedAt(props.createdAt)}</p>
                </div>

                <p className='leading-normal'>
                    {props.content}
                </p>
            </div>

            <hr />
        </>
    )
}