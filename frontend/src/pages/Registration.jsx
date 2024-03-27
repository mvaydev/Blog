import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../main'
import { registrate, login } from '../api/userApi'
import VerifyDialog from '../components/VerifyDialog'
import Widget from '../components/Widget'

export default observer(() => {
    const { userStore } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleRegistration = () => {
        registrate(name, email, password).then(() => {    
            userStore.isVerify = false
            setIsDialogOpen(true)
        })
    }

    useEffect(() => {
        if(userStore.isVerify && isDialogOpen) {
            login(email, password)
        }
    }, [])

    return (
        <>
            {
                isDialogOpen && <VerifyDialog />
            }
            <Widget header='Регистрация'>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-stone-800'>Имя</label>
                    <input 
                        type='text' 
                        className='border border-stone-400 rounded-md text-base p-1'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-stone-800'>Почта</label>
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
                    onClick={handleRegistration}  
                >
                    Зарегистрироваться
                </button>

                <span className='text-center text-sm'>
                    Есть аккаунт? 
                    {' '}
                    <Link to="/login" className='text-rose-500'>Войти</Link>
                </span>
            </Widget>
        </>
    )
})