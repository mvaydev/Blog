import { useContext, useState } from 'react'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { login } from '../api/userApi'
import Widget from '../components/Widget'


export default observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { userStore } = useContext(Context)

    const handleLogin = () => {
        login(email, password).then(() => {
            userStore.isAuth = true
        })
    }

    return (
        <Widget header='Вход'>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-stone-800'>Логин</label>
                <input 
                    type='email' 
                    className='border border-stone-400 rounded-md text-base p-1'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-stone-800'>Пароль</label>
                <input 
                    type='password' 
                    className='border border-stone-400 rounded-md text-base p-1'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <button 
                className='bg-rose-500 py-1.5 rounded-md text-white hover:bg-rose-600'
                onClick={handleLogin}  
            >
                Войти
            </button>

            <span className='text-center text-sm'>
                Нет аккаунта? 
                {' '}
                <Link to="/registration" className='text-rose-500'>Зарегистрироваться</Link>
            </span>
        </Widget>
    )
})