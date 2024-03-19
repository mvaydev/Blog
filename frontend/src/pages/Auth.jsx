import React from 'react'
import Logo from '../assets/img/logo.svg'
import Input from '../ui/Input.jsx'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

function Login() {
    return (
        <>
            <h1 className='text-2xl font-bold text-center'>Вход</h1>
            <Input type='email' label='Логин' />
            <Input type='password' label='Пароль' />
            <button className='bg-rose-500 py-1.5 rounded-md text-white hover:bg-rose-600'>Войти</button>
            <span className='text-center text-sm'>
                Нет аккаунта? 
                {' '}
                <Link to="/registration" className='text-rose-500'>Зарегистрироваться</Link>
            </span>
            <Link to="/forgot-password" className='text-rose-500 text-center text-sm'>Забыли пароль</Link>
        </>
    )
}

function Registration() {
    return (
        <>
            <h1 className='text-2xl font-bold text-center'>Регистрация</h1>
            <Input type='text' label='Имя' />
            <Input type='email' label='Логин' />
            <Input type='password' label='Пароль' />
            <button className='bg-rose-500 py-1.5 rounded-md text-white hover:bg-rose-600'>Зарегистрироваться</button>
            <span className='text-center text-sm'>
                Есть аккаунт? 
                {' '}
                <Link to="/login" className='text-rose-500'>Войти</Link>
            </span>
        </>
    )
}

function ForgotPassword() {
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

export default function Auth() {
    return (
        <BrowserRouter>
            <div className='w-full h-screen bg-stone-100 flex justify-center items-center'>
                <div className='p-4 rounded-md bg-white shadow-lg flex justify-center flex-col gap-5'>
                    <div className='flex justify-center'>
                        <img src={Logo} />
                    </div>
                    <Routes>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/registration" element={<Registration />}></Route>
                        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}
