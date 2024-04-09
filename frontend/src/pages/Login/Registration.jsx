import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'
import { registrate, login } from '../../api/userApi'
import VerifyDialog from '../../components/Dialogs/VerifyDialog'
import LoginPage from '../../layout/LoginPage'
import Button from '../../components/Inputs/Button'
import TextInput from '../../components/Inputs/TextInput'

export default observer(() => {
    const { userStore } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [userId, setUserId] = useState(0)

    const handleRegistration = () => {
        registrate(name, email, password)
        .then(res => {
            userStore.isVerify = false
            setIsDialogOpen(true)
            setUserId(res.id)
        })
    }

    useEffect(() => {
        if(userStore.isVerify) {
            login(email, password).then(() => {
                userStore.isAuth = true
            })
        }
    }, [userStore.isVerify])

    return (
        <>
            {
                isDialogOpen && <VerifyDialog id={userId} />
            }
            <LoginPage header='Регистрация'>
                <div className='flex flex-col gap-1'>
                    <TextInput
                        label='Имя'
                        value={name}
                        onChangeHandler={setName}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <TextInput
                        label='Почта'
                        type='email'
                        value={email}
                        onChangeHandler={setEmail}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <TextInput
                        label='Пароль'
                        type='password'
                        value={password}
                        onChangeHandler={setPassword}
                    />
                </div>

                <Button onClickHandler={handleRegistration} isFullWidth>Зарегистрироваться</Button>

                <span className='text-center text-sm'>
                    Есть аккаунт?
                    {' '}
                    <Link to="/login" className='text-rose-500'>Войти</Link>
                </span>
            </LoginPage>
        </>
    )
})