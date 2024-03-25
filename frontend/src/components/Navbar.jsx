import Logo from '../assets/img/logo.svg'
import Heart from '../assets/img/heart_filled.svg'
import Write from '../assets/img/write.svg'
import Profile from '../assets/img/profile.svg'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import { useContext } from 'react'

const IconLink = ({ link, imgSrc }) => {
    return (
        <Link to={link} className='hover:-translate-y-1'>
            <img src={imgSrc}/>
        </Link>
    )
}

export default () => {
    const {userStore} = useContext(Context)

    return (
        <div className='w-full flex justify-center shadow-md bg-white'>
            <div className='max-w-5xl w-full flex justify-between gap-16 items-center p-2.5'>
                <Link to='/'>
                    <img src={Logo} />
                </Link>

                {
                    userStore.isAuth ? (
                        <div className='flex gap-6 items-center'>
                            <IconLink link='/write' imgSrc={Write} />
                            <IconLink link='/likes' imgSrc={Heart} />
                            <IconLink link='/profile' imgSrc={Profile} />
                        </div>
                    ) : (
                        <div className='flex gap-3 items-center'>
                            <Link to='/login'>
                                <button className='bg-rose-500 py-1 px-4 w-fit rounded-md text-white hover:bg-rose-600'>
                                    Войти
                                </button>
                            </Link>

                            <Link to='/registration'>
                                <button className='bg-stone-500 py-1 px-4 w-fit rounded-md text-white hover:bg-stone-600'>
                                    Зарегистрироваться
                                </button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
