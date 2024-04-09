import { Link } from 'react-router-dom'
import { Context } from '../main'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Button from './Inputs/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../assets/img/logo.svg'

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
                        <div className='flex gap-8 items-center p-1'>
                            <Link to='/write' replace>
                                <FontAwesomeIcon icon='fa-solid fa-pen' className='text-stone-700 text-xl hover:text-rose-500' />
                            </Link>

                            <Link to='/settings' replace>
                            <   FontAwesomeIcon icon='fa-solid fa-gear' className='text-stone-700 text-xl hover:text-rose-500' />
                            </Link>

                            <Link to='/profile' replace>
                                <FontAwesomeIcon icon='fa-solid fa-circle-user' className='text-stone-700 text-3xl hover:text-rose-500' />
                            </Link>
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
