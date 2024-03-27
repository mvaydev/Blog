import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import { 
    changeEmail, 
    fetchAuthUser, 
    sendCode, 
    changeName 
} from '../api/userApi'

import Navbar from '../components/Navbar'
import ChangeFieldInput from '../components/ChangeFieldInput'
import UserSettingsField from '../components/UserSettingsField'
import Block from '../components/Block'
import VerifyDialog from '../components/VerifyDialog'
import { observer } from 'mobx-react-lite'

export default observer(() => {
    const { userStore } = useContext(Context)
    const [user, setUser] = useState(null)
    const [newEmail, setNewEmail] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const navigate = useNavigate()

    const handleChangeEmail = email => { 
        setNewEmail(email)
        sendCode(user.id, email)

        userStore.isVerify = false
        setIsDialogOpen(true)
    }

    const handleChangeName = (newName) => {
        changeName(newName)
        location.reload()
    }

    const handleLogout = () => {
        userStore.logout()
        navigate('/login')
    }

    useEffect(() => {
        if(userStore.isVerify && isDialogOpen) {
            changeEmail(user.email, newEmail)
            setIsDialogOpen(false)
            location.reload()
        }
    }, [userStore.isVerify])

    useEffect(() => {
        fetchAuthUser()
        .then(res => setUser(res))
    }, [])

    return (
        <>
            <Navbar />

            {
                user && (isDialogOpen && <VerifyDialog id={user.id} />)
            }

            <div className='-w-full flex justify-center mt-8'>
                <Block>
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
                </Block>
            </div>
        </>
    )
})
