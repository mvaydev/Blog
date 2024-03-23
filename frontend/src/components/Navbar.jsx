import Logo from '../assets/img/logo.svg'
import Heart from '../assets/img/heart.svg'
import Write from '../assets/img/write.svg'
import Profile from '../assets/img/profile.svg'
import { Link } from 'react-router-dom'

const IconLink = ({ link, imgSrc }) => {
    return (
        <Link to={link} className='hover:-translate-y-1'>
            <img src={imgSrc}/>
        </Link>
    )
}

export default () => {
    return (
        <div className='w-full flex justify-center shadow-md'>
            <div className='max-w-5xl w-full flex justify-between gap-16 items-center p-2.5'>
                <Link to='/'>
                    <img src={Logo} />
                </Link>

                <div className='flex gap-6 items-center'>
                    <IconLink link='/write' imgSrc={Write} />
                    <IconLink link='/likes' imgSrc={Heart} />
                    <IconLink link='/profile' imgSrc={Profile} />
                </div>
            </div>
        </div>
    )
}
