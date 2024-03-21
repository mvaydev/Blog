import React from 'react'
import Logo from '../assets/img/logo.svg'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './Login.jsx'
import Registration from './Registration.jsx'
import ForgotPassword from './ForgotPassword.jsx'

export default function Auth() {
    return (
        <BrowserRouter>
            <div className='w-full h-screen bg-stone-100 flex justify-center items-center'>
                <div className='p-4 rounded-md bg-white shadow-lg flex justify-center flex-col gap-5'>
                    <div className='flex justify-center'>
                        <img src={Logo} />
                    </div>
                    <Routes>
                        <Route path="/login" element={ <Login /> }></Route>
                        <Route path="/registration" element={ <Registration /> }></Route>
                        <Route path="/forgot-password" element={ <ForgotPassword /> }></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}
