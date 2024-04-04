import Logo from '../assets/img/logo.svg'
import Settings from '../assets/img/settings.svg'
import Write from '../assets/img/write.svg'
import Profile from '../assets/img/profile.svg'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Button from './Button'

const IconLink = ({ link, imgSrc }) => {
    return (
        <Link to={link} className='hover:-translate-y-1'>
            <img src={imgSrc}/>
        </Link>
    )
}

export default observer(() => {
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
                            <IconLink link='/settings' imgSrc={Settings} />
                            <IconLink link='/profile' imgSrc={Profile} />
                        </div>
                    ) : (
                        <div className='flex gap-3 items-center'>
                            <Link to='/login'>
                                <Button>Войти</Button>
                            </Link>

                            <Link to='/registration'>
                                <Button isSecondary>Зарегистрироваться</Button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
})
