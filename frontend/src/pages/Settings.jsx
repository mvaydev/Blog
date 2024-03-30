import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'
import { 
    changeEmail, 
    fetchAuthUser, 
    sendCode, 
    changeName,
    deleteUser,
    changePassword
} from '../api/userApi'

import Navbar from '../components/Navbar'
import ChangeFieldInput from '../components/ChangeFieldInput'
import Block from '../layout/Block'
import VerifyDialog from '../components/VerifyDialog'
import PasswordDialog from '../components/PasswordDialog'
import Button from '../components/Button'

export default observer(() => {
    const { userStore } = useContext(Context)
    const [user, setUser] = useState(null)

    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [isDeleteUser, setIsDeleteUser] = useState(false)
    const navigate = useNavigate()

    const handleChangeEmail = email => { 
        setNewEmail(email)
        sendCode(user.id, email)

        userStore.isVerify = false
        setIsVerifyDialogOpen(true)
    }

    const handleChangeName = newName => {
        changeName(newName)
        location.reload()
    }

    const handleChangePassword = password => {
        setNewPassword(password)
        setIsChangePassword(true)
    }

    const handleDeleteUser = () => {
        setIsDeleteUser(true)
    }

    const handleLogout = () => {
        userStore.logout()
        navigate('/login')
    }

    const onChangePassword = oldPassword => {
        changePassword(oldPassword, newPassword)
        location.reload()
    }

    const onDeleteUser = password => {
        if(password) {
            deleteUser(password).then(handleLogout)
        }
    }

    useEffect(() => {
        if(userStore.isVerify && isVerifyDialogOpen) {
            changeEmail(user.email, newEmail)
            setIsVerifyDialogOpen(false)
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
                user && (isVerifyDialogOpen && <VerifyDialog id={user.id} />)
            }

            {
                isChangePassword && <PasswordDialog handlePassword={onChangePassword} />
            }

            {
                isDeleteUser && <PasswordDialog handlePassword={onDeleteUser} />
            }

            <div className='-w-full flex justify-center mt-8'>
                <Block>
                    {
                        user && (
                            <div className='flex flex-col gap-8'>
                                <h1 className='font-bold text-2xl'>Настройки</h1>

                                <div className='flex gap-6'>
                                    <div className='flex flex-col gap-4 justify-around'>
                                        <label>Имя: </label>
                                        <label>Почта: </label>
                                        <label>Пароль: </label>
                                    </div>

                                    <div className='flex flex-col w-full gap-4'>
                                        <ChangeFieldInput 
                                            defaultValue={user.name}
                                            inputType='text'
                                            placeholder='Введите новое имя'
                                            onClickHandler={handleChangeName}
                                        />

                                        <ChangeFieldInput 
                                            defaultValue={user.email}
                                            inputType='email'
                                            placeholder='Введите новую почту'
                                            onClickHandler={handleChangeEmail}
                                        />

                                        <ChangeFieldInput 
                                            defaultValue=''
                                            inputType='password'
                                            placeholder='Новый пароль'
                                            onClickHandler={handleChangePassword}
                                        />
                                    </div>
                                </div>

                                <hr />

                                <div className='flex gap-2'>
                                    <Button onClickHandler={handleLogout}>Выйти</Button>
                                    <Button onClickHandler={handleDeleteUser} isSecondary>Удалить аккаунт</Button>
                                </div>
                            </div>
                        )
                    }
                </Block>
            </div>
        </>
    )
})
