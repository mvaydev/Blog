import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import Navbar from '../components/Navbar'
import ChangeFieldInput from '../components/ChangeFieldInput'
import UserSettingsField from '../components/UserSettingsField'

export default () => {
    const { userStore } = useContext(Context)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        userStore.fetchAuthUser()
        .then(res => setUser(res))
    }, [])

    const handleLogout = () => {
        userStore.logout()
        navigate('/login')
    }

    const handleChangeEmail = (newEmail) => {
        userStore.sendCode(user.id, newEmail)
        userStore.id = user.id
        
        navigate('/verify', {
            state: {
                callbackName: userStore.changeEmail.name,
                callbackParams: [
                    user.email,
                    newEmail
                ]
            }
        })
    }

    const handleChangeName = (newName) => {
        userStore.changeName(newName)
        location.reload()
    }

    return (
        <>
            <Navbar />

            <div className='-w-full flex justify-center mt-8'>
                <div className='max-w-5xl w-full rounded-md flex flex-col gap-3 shadow-md p-4'>
                    {
                        user && (
                            <div className='flex flex-col gap-8'>
                                <h1 className='font-bold text-2xl'>Настройки</h1>

                                <div className='flex flex-col w-full gap-4'>
                                    <UserSettingsField label='Имя' valueToDisplay={user.name}>
                                        <ChangeFieldInput 
                                            defaultValue=''
                                            inputType='text'
                                            placeholder='Введите новое имя'
                                            clickHandler={handleChangeName}
                                        />
                                    </UserSettingsField>

                                    <UserSettingsField label='Почта' valueToDisplay={user.email}>
                                        <ChangeFieldInput 
                                            defaultValue=''
                                            inputType='email'
                                            placeholder='Введите новую почту'
                                            clickHandler={handleChangeEmail}
                                        />
                                    </UserSettingsField>

                                    <div className='flex w-full gap-4 justify-between'>
                                        <p>Пароль:</p>
                                        <div className='text-stone-500 w-full'>* * * * *</div>
                                        <Link to='/change-password' className='text-rose-500'>Изменить</Link>
                                    </div>
                                </div>

                                <div className='flex gap-2'>
                                    <button 
                                        className='bg-rose-500 py-1.5 px-6 w-fit rounded-md text-white hover:bg-rose-600'
                                        onClick={handleLogout}> 
                                        Выйти
                                    </button>

                                    <button 
                                        className='bg-stone-500 py-1.5 px-6 w-fit rounded-md text-white hover:bg-stone-600'>
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
