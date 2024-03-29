import { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { login } from '../api/userApi'
import LoginPage from '../layout/LoginPage'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

export default observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const { userStore } = useContext(Context)

    const handleLogin = () => {
        login(email, password)
        .then(() => userStore.isAuth = true)
        .catch(() => setIsError(true))
    }

    useEffect(() => {
        if(isError) setTimeout(() => setIsError(false), 3000)
    }, [isError])

    return (
        <LoginPage header='Вход'>
            <div className='flex flex-col gap-1'>
                <TextInput 
                    label='Логин'
                    type='email'
                    value={email}
                    onChangeHandler={setEmail}
                    isFullWidth
                />
            </div>

            <div className='flex flex-col gap-1'>
                <TextInput 
                    label='Пароль'
                    type='password'
                    value={password}
                    onChangeHandler={setPassword}
                    isFullWidth
                />
            </div>

            {
                isError && <p className='text-red-500 text-sm'>* Неправильный пароль или почта</p>
            }

            <Button onClickHandler={handleLogin} isFullWidth>Войти</Button>

            <span className='text-center text-sm'>
                Нет аккаунта? 
                {' '}
                <Link to="/registration" className='text-rose-500'>Зарегистрироваться</Link>
            </span>
        </LoginPage>
    )
})