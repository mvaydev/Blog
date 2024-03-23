import { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export default () => {
    const { userStore } = useContext(Context)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        userStore.fetchAuthUser()
        .then(res => {
            setUser(res)
        })
    }, [])

    return (
        <>
            <Navbar />

            <div className='-w-full flex justify-center mt-8'>
                <div className='max-w-5xl w-full rounded-md flex flex-col gap-3 shadow-md p-4'>
                    {
                        user && (
                            <div className='flex flex-col gap-8'>
                                <h1 className='font-bold text-2xl'>Настройки</h1>

                                <div className='flex'>
                                    <div className='w-full flex gap-8'>
                                        <div className='flex flex-col gap-4'>
                                            <p>Имя:</p>
                                            <p>Почта:</p>
                                            <p>Пароль:</p>
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            <p className='text-stone-500'>{user.name}</p>
                                            <p className='text-stone-500'>{user.email}</p>
                                            <p className='text-stone-500'>* * * * *</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <Link to='/' className='text-rose-500'>Изменить</Link>
                                        <Link to='/' className='text-rose-500'>Изменить</Link>
                                        <Link to='/change-password' className='text-rose-500'>Изменить</Link>
                                    </div>
                                </div>

                                <div className='flex gap-2'>
                                    <button 
                                        className='bg-rose-500 py-1.5 px-6 w-fit rounded-md text-white hover:bg-rose-600'
                                        onClick={() => {
                                            userStore.logout()
                                            navigate('/login')
                                        }}
                                    >
                                        Выйти
                                    </button>

                                    <button 
                                        className='bg-stone-500 py-1.5 px-6 w-fit rounded-md text-white hover:bg-stone-600'
                                    >
                                        Удалить аккаунт
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
