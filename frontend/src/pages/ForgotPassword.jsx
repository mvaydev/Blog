import Input from '../ui/Input.jsx'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    return (
        <>
            <h1 className='text-2xl font-bold text-center'>Забыли пароль</h1>
            <Input type='email' label='Почта' />
            <button className='bg-rose-500 py-1.5 rounded-md text-white hover:bg-rose-600'>Отправить</button>
            <span className='text-center text-sm'>
                Есть аккаунт? 
                {' '}
                <Link to="/login" className='text-rose-500'>Войти</Link>
            </span>
        </>
    )
}